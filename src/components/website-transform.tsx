"use client";

import { useEffect, useState } from "react";

/**
 * Website transformation demo — hero animation for the /websites funnel.
 *
 * Phase 0  old site holds       — red issue chips pop in one by one
 * Phase 1  scan sweeps down     — green line wipes; new site revealed behind it
 * Phase 2  new site holds       — booking button pulses, "live in ~7 days" badge
 * Phase 3  scan sweeps back up  — returns to the old site
 *
 * Then loops seamlessly. Reveal is a wipe (morph), never a cross-fade;
 * timing is monotonic; ambient float keeps continuous motion.
 */

export interface WebsiteTransformLabels {
  issues: [string, string, string];
  liveBadge: string;
  before: string;
  after: string;
}

type Phase = 0 | 1 | 2 | 3;
const PHASE_MS: Record<Phase, number> = { 0: 2600, 1: 2200, 2: 3400, 3: 2200 };

export function WebsiteTransform({ labels }: { labels: WebsiteTransformLabels }) {
  const [phase, setPhase] = useState<Phase>(0);

  useEffect(() => {
    const t = setTimeout(
      () => setPhase((p) => ((p + 1) % 4) as Phase),
      PHASE_MS[phase],
    );
    return () => clearTimeout(t);
  }, [phase]);

  // New site revealed while sweeping down (1) and holding (2)
  const revealed = phase === 1 || phase === 2;
  const sweeping = phase === 1 || phase === 3;
  const isNew = phase === 2;
  const isOld = phase === 0;

  const wipeTransition = "clip-path 2000ms cubic-bezier(0.4, 0, 0.2, 1)";
  const lineTransition = "top 2000ms cubic-bezier(0.4, 0, 0.2, 1)";

  return (
    <div className="relative mx-auto w-[280px] select-none sm:w-[300px]">
      <style>{`
        @keyframes wt-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes wt-pulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(46,127,6,0.45); } 50% { box-shadow: 0 0 0 8px rgba(46,127,6,0); } }
      `}</style>

      {/* Ambient glow */}
      <div className="pointer-events-none absolute -inset-10 rounded-full bg-brand-bright/10 blur-3xl" />

      {/* Phase chip */}
      <div className="absolute -top-3 left-1/2 z-20 -translate-x-1/2">
        <span
          className={`inline-flex whitespace-nowrap rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors duration-700 ${
            revealed
              ? "border-brand-bright/60 bg-brand-bright text-white"
              : "border-white/20 bg-[#1a1a1a] text-ink-dim"
          }`}
        >
          {revealed ? labels.after : labels.before}
        </span>
      </div>

      {/* Phone frame */}
      <div
        className="relative rounded-[38px] border-2 border-white/10 bg-[#111] p-2.5 shadow-2xl"
        style={{ animation: "wt-float 7s ease-in-out infinite" }}
      >
        <div className="relative h-[520px] overflow-hidden rounded-[28px]">
          {/* ─── OLD SITE (base layer) ─── */}
          <div className="absolute inset-0 bg-[#e8e8e8] font-serif">
            <div className="bg-[#5a3e7a] px-2 py-1.5 text-center text-[8px] tracking-wide text-[#e9defd]">
              Home&ensp;|&ensp;Services&ensp;|&ensp;About&ensp;|&ensp;Contact
            </div>
            <p className="py-2 text-center text-lg font-bold text-[#6a4b8a]">
              Salon Lina
            </p>
            <div className="bg-[#2aa9a0] px-2 py-1.5 text-center">
              <p className="text-[9px] font-bold text-white">
                WELCOME TO OUR WEBSITE!
              </p>
            </div>
            <div className="flex gap-2 p-3">
              <div className="h-16 w-20 shrink-0 border-2 border-[#b9926a] bg-[#cbb8a0]" />
              <div className="flex-1 space-y-1.5 pt-1">
                <div className="h-1.5 w-full bg-[#bbb]" />
                <div className="h-1.5 w-full bg-[#bbb]" />
                <div className="h-1.5 w-4/5 bg-[#bbb]" />
                <div className="h-1.5 w-full bg-[#bbb]" />
              </div>
            </div>
            <div className="mx-3 border-2 border-[#b96a12] bg-[#e08a2a] py-1.5 text-center font-sans text-[10px] font-bold text-white">
              ☎ CALL: 020 - 1234 567
            </div>
            <div className="space-y-1.5 p-3">
              <div className="h-1.5 w-2/3 bg-[#ccc]" />
              <div className="h-1.5 w-1/2 bg-[#ccc]" />
            </div>
            <div className="mx-3 border border-dashed border-[#999] py-1 text-center font-sans text-[8px] text-[#777]">
              You are visitor number 014823
            </div>
            <div className="absolute bottom-0 w-full bg-[#909090] py-1.5 text-center font-sans text-[7px] text-[#eee]">
              © 2011 · Best viewed in Internet Explorer
            </div>

            {/* Issue chips */}
            {(
              [
                ["top-[26%]", "-left-1", 0],
                ["top-[46%]", "-right-1", 1],
                ["top-[64%]", "left-2", 2],
              ] as const
            ).map(([top, side, i]) => (
              <span
                key={i}
                className={`absolute ${top} ${side} z-10 rounded-md bg-[#e24b4a] px-2 py-1 font-sans text-[9px] font-semibold text-white shadow-lg transition-all duration-500 ${
                  isOld ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
                }`}
                style={{ transitionDelay: isOld ? `${300 + i * 380}ms` : "0ms" }}
              >
                ✕ {labels.issues[i]}
              </span>
            ))}
          </div>

          {/* ─── NEW SITE (revealed by wipe) ─── */}
          <div
            className="absolute inset-0 bg-[#faf7f2]"
            style={{
              clipPath: revealed ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
              transition: wipeTransition,
            }}
          >
            <div className="flex items-center justify-between px-4 pt-3 pb-2">
              <p className="font-serif text-[15px] font-semibold text-[#1f3b2a]">
                Salon Lina
              </p>
              <div className="space-y-[3px]">
                <div className="h-[2px] w-4 rounded bg-[#1f3b2a]" />
                <div className="h-[2px] w-4 rounded bg-[#1f3b2a]" />
                <div className="h-[2px] w-4 rounded bg-[#1f3b2a]" />
              </div>
            </div>
            {/* Hero */}
            <div className="relative mx-0 h-[220px] overflow-hidden bg-gradient-to-br from-[#cbb6a3] via-[#b89b85] to-[#8a6d5c]">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
              <div className="absolute bottom-3 left-4 right-4">
                <p className="font-serif text-xl font-semibold leading-tight text-white">
                  Beautiful hair,
                  <br />
                  zero hassle.
                </p>
                <span
                  className="mt-2.5 inline-block rounded-lg bg-[#1f3b2a] px-3.5 py-2 text-[11px] font-semibold text-white"
                  style={
                    isNew
                      ? { animation: "wt-pulse 1.8s ease-in-out infinite" }
                      : undefined
                  }
                >
                  Book online →
                </span>
              </div>
            </div>
            {/* Reviews */}
            <div className="flex items-center gap-2 px-4 pt-3">
              <span className="text-[12px] tracking-wider text-[#e0a020]">
                ★★★★★
              </span>
              <span className="font-sans text-[9px] text-[#6b6b6b]">
                4.9 · 200+ clients
              </span>
            </div>
            {/* Service cards */}
            <div className="flex gap-2 px-4 pt-2.5">
              {["Cuts", "Colour", "Styling"].map((s) => (
                <div
                  key={s}
                  className="flex-1 rounded-lg border border-[#ece5da] bg-white py-2 text-center"
                >
                  <p className="font-sans text-[9px] font-semibold text-[#1f3b2a]">
                    {s}
                  </p>
                </div>
              ))}
            </div>
            {/* Booking bar */}
            <div className="mx-4 mt-2.5 flex items-center justify-between rounded-lg bg-[#10210a] px-3 py-2">
              <span className="font-sans text-[8px] text-[#dff0d0]">
                Free today: 14:30 · 16:00
              </span>
              <span className="font-sans text-[8px] font-semibold text-white">
                Reserve →
              </span>
            </div>

            {/* Live badge */}
            <div
              className={`absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand-bright px-3 py-1.5 font-sans text-[10px] font-bold text-white shadow-lg shadow-brand-bright/40 transition-all duration-500 ${
                isNew ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              }`}
              style={{ transitionDelay: isNew ? "600ms" : "0ms" }}
            >
              ✓ {labels.liveBadge}
            </div>
          </div>

          {/* ─── Scan line ─── */}
          <div
            className="absolute left-0 right-0 z-10 h-[2px]"
            style={{
              top: revealed ? "100%" : "0%",
              transition: lineTransition,
              opacity: sweeping ? 1 : 0,
              background:
                "linear-gradient(90deg, transparent, #2e7f06 30%, #4ca50a 50%, #2e7f06 70%, transparent)",
              boxShadow: "0 0 14px 2px rgba(46,127,6,0.7)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
