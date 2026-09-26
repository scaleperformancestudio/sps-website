"use client";

import { useEffect, useRef, useState } from "react";
import { Phone, FileText, CalendarCheck } from "lucide-react";
import type { HomeContent } from "@/app/home-content";

/**
 * Hero-animatie van de homepage: één maandrapport zoals de klant het krijgt.
 *
 * tick 0-4     lege kaart, alleen de kop
 * tick 6-33    vier aanvragen schuiven één voor één binnen
 * tick 46-70   de eigenaar vinkt drie aanvragen af als klant; per vinkje
 *              morpht "€ 0" naar "€ 15" en loopt het totaal op
 * tick 80      de tweede aanvraag krijgt "geen klant": daar betaalt hij niets voor
 * tick 104-111 alles schuift weg, daarna begint de maand opnieuw
 *
 * Alles is monotoon (geen overshoot), rijen morphen in plaats van cross-faden,
 * en de kaart zweeft en glanst continu zodat hij nooit stilstaat.
 */

type Labels = HomeContent["report"];

const TICK_MS = 100;
const LOOP = 112;
const ROW_AT = [6, 15, 24, 33];
const CHECK_AT = [46, -1, 58, 70];
const NO_AT = 80;
const RESET_AT = 104;
const PER = 15;
const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";
const ICONS = [Phone, FileText, CalendarCheck, Phone];

function useTween(target: number, ms = 700) {
  const [value, setValue] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    const start = performance.now();
    const begin = from.current;
    let raf = 0;
    const step = (now: number) => {
      const p = Math.min((now - start) / ms, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = begin + (target - begin) * eased;
      setValue(v);
      if (p < 1) raf = requestAnimationFrame(step);
      else from.current = target;
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return value;
}

export function PayWhenItWorks({ labels }: { labels: Labels }) {
  const [tick, setTick] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [running, setRunning] = useState(false);
  const prev = useRef(0);
  const ref = useRef<HTMLDivElement>(null);

  // Alleen animeren als de kaart in beeld is.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setRunning(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setTick((t) => (t + 1) % LOOP), TICK_MS);
    return () => clearInterval(id);
  }, [running]);

  // Nieuwe maand: de rijen krijgen een nieuwe key zodat ze zonder
  // omgekeerde transitie weer verborgen starten.
  useEffect(() => {
    if (tick === 0 && prev.current > 0) setCycle((c) => c + 1);
    prev.current = tick;
  }, [tick]);

  const resetting = tick >= RESET_AT;
  const checked = CHECK_AT.map((at) => at >= 0 && tick >= at && !resetting);
  const count = checked.filter(Boolean).length;
  const total = useTween(count * PER);
  const showNo = tick >= NO_AT && !resetting;

  return (
    <div ref={ref} className="relative mx-auto w-full min-w-0 max-w-[380px] select-none">
      <style>{`
        @keyframes pw-float { 0%, 100% { transform: translateY(0) rotate(-0.4deg); } 50% { transform: translateY(-7px) rotate(0.4deg); } }
        @keyframes pw-sheen { 0% { transform: translateX(-130%) skewX(-18deg); } 100% { transform: translateX(230%) skewX(-18deg); } }
        @keyframes pw-live { 0%, 100% { box-shadow: 0 0 0 0 rgba(46,127,6,0.55); } 70% { box-shadow: 0 0 0 7px rgba(46,127,6,0); } }
      `}</style>

      <div className="pointer-events-none absolute -inset-8 rounded-full bg-brand-bright/10 blur-3xl" />

      <div
        className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0a0a0a] p-5 shadow-2xl sm:p-6"
        style={{ animation: "pw-float 8s ease-in-out infinite" }}
      >
        {/* Continue glans over de kaart */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/[0.035] to-transparent"
          style={{ animation: "pw-sheen 7s linear infinite" }}
        />

        {/* Kop */}
        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-dim/60">{labels.title}</p>
            <p className="mt-1 font-serif text-xl italic text-ink">{labels.month}</p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-bright/30 bg-brand-bright/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-bright">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-bright" style={{ animation: "pw-live 2.4s ease-out infinite" }} />
            {labels.live}
          </span>
        </div>

        {/* Rijen */}
        <div key={cycle} className="relative mt-5 space-y-2.5">
          {labels.rows.map((row, i) => {
            const shown = tick >= ROW_AT[i] && !resetting;
            const isChecked = checked[i];
            const isNo = i === 1 && showNo;
            const Icon = ICONS[i];
            return (
              <div
                key={row.kind + i}
                className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5"
                style={{
                  opacity: shown ? 1 : 0,
                  transform: shown ? "translateY(0)" : "translateY(10px)",
                  transition: `opacity 500ms ${EASE}, transform 500ms ${EASE}, border-color 500ms ${EASE}`,
                  borderColor: isChecked ? "rgba(46,127,6,0.45)" : undefined,
                }}
              >
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-lg border border-white/[0.08] bg-[#111] text-ink-dim">
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] text-ink">{row.kind}</p>
                  <p className="text-[11px] text-ink-dim/60">
                    {row.when}
                    <span
                      className={`ml-2 ${isChecked ? "text-brand-bright" : "text-ink-dim/50"}`}
                      style={{ opacity: isChecked || isNo ? 1 : 0, transition: `opacity 400ms ${EASE}` }}
                    >
                      {isChecked ? labels.became : labels.noCustomer}
                    </span>
                  </p>
                </div>
                {/* Vinkje */}
                <span
                  className="flex h-5 w-5 flex-none items-center justify-center rounded-md border"
                  style={{
                    borderColor: isChecked ? "#2e7f06" : "rgba(255,255,255,0.18)",
                    background: isChecked ? "#2e7f06" : "transparent",
                    transition: `background 350ms ${EASE}, border-color 350ms ${EASE}`,
                  }}
                >
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path
                      d="M3 8.5l3.2 3L13 4.5"
                      style={{
                        strokeDasharray: 20,
                        strokeDashoffset: isChecked ? 0 : 20,
                        transition: `stroke-dashoffset 420ms ${EASE} 120ms`,
                      }}
                    />
                  </svg>
                </span>
                {/* Bedrag: € 0 morpht omhoog naar € 15 */}
                <span className="relative h-5 w-12 flex-none overflow-hidden text-right font-mono text-[13px]">
                  <span
                    className="absolute inset-x-0 top-0 flex flex-col"
                    style={{ transform: isChecked ? "translateY(-50%)" : "translateY(0)", transition: `transform 450ms ${EASE}` }}
                  >
                    <span className="h-5 text-ink-dim/50">€ 0</span>
                    <span className="h-5 text-brand-bright">€ {PER}</span>
                  </span>
                </span>
              </div>
            );
          })}
        </div>

        {/* Totaal */}
        <div
          className="relative mt-5 rounded-2xl border p-4"
          style={{
            borderColor: count > 0 ? "rgba(46,127,6,0.5)" : "rgba(255,255,255,0.08)",
            boxShadow: count > 0 ? "0 0 32px rgba(46,127,6,0.14)" : "none",
            transition: `border-color 600ms ${EASE}, box-shadow 600ms ${EASE}`,
          }}
        >
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-dim/60">{labels.totalLabel}</p>
              <p className="mt-1 text-[11px] text-ink-dim/50">{labels.perCustomer}</p>
            </div>
            <p className="font-mono text-3xl font-bold tracking-tight text-ink">
              € {Math.round(total)}
            </p>
          </div>
          <p
            className="mt-3 border-t border-white/[0.06] pt-3 text-[11px] text-ink-dim/60"
            style={{ opacity: showNo ? 1 : 0.35, transition: `opacity 500ms ${EASE}` }}
          >
            {labels.zeroNote}
          </p>
        </div>
      </div>
    </div>
  );
}
