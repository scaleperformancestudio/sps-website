"use client";

import { useState } from "react";
import type { WebsitesContent, Locale } from "@/app/websites/content";

type Labels = WebsitesContent["lekCheck"]["form"];

const INPUT =
  "w-full rounded-lg border border-white/10 bg-bg-card px-4 py-3 text-ink placeholder-ink-dim/40 focus:border-brand-bright/60 focus:outline-none";

export function LekCheckForm({
  labels,
  locale,
  via,
  whatsappHref,
  whatsappCta,
}: {
  labels: Labels;
  locale: Locale;
  via?: string;
  whatsappHref: string;
  whatsappCta: string;
}) {
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    city: "",
    message: "",
    consent: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.consent) return;
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/lek-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, via, locale }),
      });
      if (!res.ok) throw new Error(labels.error);
      setDone(true);
    } catch {
      setError(labels.error);
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-brand-bright/30 bg-brand-bright/[0.04] p-8 text-center">
        <h3 className="text-xl font-bold text-ink">{labels.successTitle}</h3>
        <p className="mx-auto mt-3 max-w-md text-sm text-ink-dim">{labels.successBody}</p>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center justify-center rounded-full border border-brand-bright/40 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-brand-bright/10"
        >
          {whatsappCta}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <h3 className="text-lg font-semibold text-ink">{labels.title}</h3>
      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <input className={INPUT} placeholder={labels.name} value={form.name} onChange={(e) => set("name", e.target.value)} required minLength={2} autoComplete="name" />
        <input className={INPUT} placeholder={labels.company} value={form.company} onChange={(e) => set("company", e.target.value)} required minLength={2} autoComplete="organization" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <input className={INPUT} type="tel" placeholder={labels.phone} value={form.phone} onChange={(e) => set("phone", e.target.value)} required minLength={8} autoComplete="tel" />
        <input className={INPUT} type="email" placeholder={labels.email} value={form.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" />
      </div>
      <input className={INPUT} placeholder={labels.city} value={form.city} onChange={(e) => set("city", e.target.value)} autoComplete="address-level2" />
      <textarea
        className={`${INPUT} resize-none`}
        rows={3}
        placeholder={labels.messagePlaceholder}
        aria-label={labels.message}
        value={form.message}
        onChange={(e) => set("message", e.target.value)}
        maxLength={600}
      />
      <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-white/10 bg-bg-card px-4 py-3">
        <input
          type="checkbox"
          checked={form.consent}
          onChange={(e) => set("consent", e.target.checked)}
          required
          className="mt-1 h-4 w-4 accent-[#2e7f06]"
        />
        <span className="text-sm text-ink">
          {labels.consent}
          <span className="mt-1 block text-xs text-ink-dim">{labels.consentHint}</span>
        </span>
      </label>
      <button
        type="submit"
        disabled={submitting || !form.consent}
        className="inline-flex w-full items-center justify-center rounded-full bg-brand-bright px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-brand hover:shadow-[0_0_20px_rgba(46,127,6,0.35)] disabled:opacity-50"
      >
        {submitting ? labels.sending : labels.submit}
      </button>
    </form>
  );
}
