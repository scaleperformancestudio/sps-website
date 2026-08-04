#!/usr/bin/env python3
"""SPS Instagram + Facebook publisher.

Reads queue.json, publishes any post whose publish_at is due, marks it done.
Token is read from ~/.sps-meta.env (META_SYSTEM_USER_TOKEN=...) and never printed.

When the config contains "fb_page_id", every post is also cross-posted to that
Facebook page. FB failures never block the IG publish: they are logged and
retried via --fb-backfill.

Usage:
  python3 publish.py                # publish everything that is due now
  python3 publish.py --dry-run      # show what would happen, call no publish endpoints
  python3 publish.py --now ID       # publish one post immediately regardless of schedule
  python3 publish.py --fb-backfill  # cross-post already-published posts to FB, backdated

Designed to be idempotent: statuses are written back to queue.json after each
successful publish, so re-runs never double-post.
"""

import argparse
import json
import os
import sys
import time
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

GRAPH = "https://graph.facebook.com/v21.0"
QUEUE_PATH = Path(__file__).parent / "queue.json"
LOG_PATH = Path(__file__).parent / "publish.log"
ENV_PATH = Path.home() / ".sps-meta.env"


def log(msg: str) -> None:
    line = f"[{datetime.now().isoformat(timespec='seconds')}] {msg}"
    print(line)
    with open(LOG_PATH, "a") as f:
        f.write(line + "\n")


def load_token() -> str:
    env_token = os.environ.get("META_SYSTEM_USER_TOKEN", "").strip()
    if env_token:
        return env_token
    if ENV_PATH.exists():
        for raw in ENV_PATH.read_text().splitlines():
            if raw.startswith("META_SYSTEM_USER_TOKEN="):
                return raw.split("=", 1)[1].strip()
    raise SystemExit("META_SYSTEM_USER_TOKEN not set (env var or ~/.sps-meta.env)")


def api(path: str, params: dict, token: str) -> dict:
    """POST to the Graph API; token goes in the body, never in logs."""
    params = {**params, "access_token": token}
    data = urllib.parse.urlencode(params).encode()
    req = urllib.request.Request(f"{GRAPH}/{path}", data=data)
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        raise RuntimeError(f"Graph API error on {path}: {body}") from e


def api_get(path: str, params: dict, token: str) -> dict:
    qs = urllib.parse.urlencode({**params, "access_token": token})
    try:
        with urllib.request.urlopen(f"{GRAPH}/{path}?{qs}", timeout=60) as r:
            return json.loads(r.read())
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        raise RuntimeError(f"Graph API error on {path}: {body}") from e


_page_token_cache: dict = {}


def page_token(page_id: str, token: str) -> str:
    """Posting to a page requires its page access token, not the user token."""
    if page_id not in _page_token_cache:
        _page_token_cache[page_id] = api_get(
            page_id, {"fields": "access_token"}, token)["access_token"]
    return _page_token_cache[page_id]


def crosspost_fb(post: dict, cfg: dict, token: str, backdate: str = "") -> None:
    """Publish the same images + caption to the Facebook page."""
    page = cfg["fb_page_id"]
    ptok = page_token(page, token)
    base = cfg["base_url"].rstrip("/")
    urls = [f"{base}/{img}" for img in post["images"]]
    extra = {"backdated_time": backdate} if backdate else {}

    if len(urls) == 1:
        r = api(f"{page}/photos", {
            "url": urls[0], "message": post["caption"], **extra}, ptok)
        fb_id = r.get("post_id") or r.get("id", "")
    else:  # multi-image: upload unpublished, then attach to one feed post
        media = []
        for u in urls:
            r = api(f"{page}/photos", {"url": u, "published": "false"}, ptok)
            media.append(r["id"])
        params = {"message": post["caption"], **extra}
        for i, mid in enumerate(media):
            params[f"attached_media[{i}]"] = json.dumps({"media_fbid": mid})
        fb_id = api(f"{page}/feed", params, ptok).get("id", "")

    post["fb_status"] = "published"
    post["fb_post_id"] = fb_id
    log(f"FB CROSSPOST {post['id']} -> {fb_id}")


def wait_until_ready(container_id: str, token: str, tries: int = 20) -> None:
    """Poll container status until FINISHED (IG processes media async)."""
    for _ in range(tries):
        qs = urllib.parse.urlencode(
            {"fields": "status_code", "access_token": token})
        with urllib.request.urlopen(f"{GRAPH}/{container_id}?{qs}", timeout=60) as r:
            status = json.loads(r.read()).get("status_code")
        if status == "FINISHED":
            return
        if status == "ERROR":
            raise RuntimeError(f"container {container_id} returned ERROR")
        time.sleep(5)
    raise RuntimeError(f"container {container_id} not ready after {tries} polls")


def publish_post(post: dict, cfg: dict, token: str, dry: bool) -> None:
    ig = cfg["ig_user_id"]
    base = cfg["base_url"].rstrip("/")
    urls = [f"{base}/{img}" for img in post["images"]]

    if dry:
        log(f"DRY RUN would publish {post['id']}: {len(urls)} image(s)")
        return

    if post["type"] == "single":
        c = api(f"{ig}/media", {
            "image_url": urls[0], "caption": post["caption"]}, token)
        wait_until_ready(c["id"], token)
        creation_id = c["id"]
    else:  # carousel
        children = []
        for u in urls:
            c = api(f"{ig}/media", {
                "image_url": u, "is_carousel_item": "true"}, token)
            wait_until_ready(c["id"], token)
            children.append(c["id"])
        c = api(f"{ig}/media", {
            "media_type": "CAROUSEL",
            "children": ",".join(children),
            "caption": post["caption"],
        }, token)
        wait_until_ready(c["id"], token)
        creation_id = c["id"]

    result = api(f"{ig}/media_publish", {"creation_id": creation_id}, token)
    post["status"] = "published"
    post["published_media_id"] = result.get("id", "")
    post["published_at_actual"] = datetime.now(timezone.utc).isoformat()
    log(f"PUBLISHED {post['id']} -> media {post['published_media_id']}")

    if cfg.get("fb_page_id"):
        try:
            crosspost_fb(post, cfg, token)
        except Exception as e:  # FB must never block or retry the IG publish
            post["fb_status"] = "error"
            post["fb_last_error"] = str(e)[:500]
            log(f"FB ERROR {post['id']} (IG stond al live): {e}")


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--now", metavar="POST_ID",
                    help="publish this post id immediately")
    ap.add_argument("--fb-backfill", action="store_true",
                    help="cross-post already-published posts to FB, backdated")
    args = ap.parse_args()

    cfg = json.loads(QUEUE_PATH.read_text())
    token = load_token()
    now = datetime.now(timezone.utc)
    changed = False

    if args.fb_backfill:
        if not cfg.get("fb_page_id"):
            raise SystemExit("fb_page_id ontbreekt in queue.json")
        todo = [p for p in cfg["posts"] if p["status"] == "published"
                and p.get("fb_status") != "published"]
        log(f"FB-backfill: {len(todo)} posts")
        for post in todo:
            try:
                crosspost_fb(post, cfg, token,
                             backdate=post.get("published_at_actual"))
            except Exception as e:
                post["fb_status"] = "error"
                post["fb_last_error"] = str(e)[:500]
                log(f"FB ERROR {post['id']}: {e}")
            QUEUE_PATH.write_text(json.dumps(cfg, indent=2, ensure_ascii=False))
            time.sleep(3)
        return

    for post in cfg["posts"]:
        if post["status"] != "pending":
            continue
        due = datetime.fromisoformat(post["publish_at"]) <= now
        forced = args.now == post["id"]
        if not (due or forced):
            continue
        try:
            publish_post(post, cfg, token, dry=args.dry_run)
            changed = not args.dry_run
        except Exception as e:  # keep the queue alive; log and continue
            post["retries"] = post.get("retries", 0) + 1
            post["last_error"] = str(e)[:500]
            if post["retries"] >= 3:
                post["status"] = "error"
                log(f"ERROR publishing {post['id']}: giving up after "
                    f"{post['retries']} attempts: {e}")
            else:
                log(f"ERROR publishing {post['id']}: attempt "
                    f"{post['retries']}/3, retrying next run: {e}")
            changed = True
        if changed:
            QUEUE_PATH.write_text(json.dumps(cfg, indent=2, ensure_ascii=False))

    if not changed and not args.dry_run:
        log("nothing due")


if __name__ == "__main__":
    main()
