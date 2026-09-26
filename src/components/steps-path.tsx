"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Drie stappen met een lijn die zich tekent zodra het blok in beeld komt,
 * badges die na elkaar groen worden, en daarna een lichtpunt dat over de
 * lijn blijft lopen. Horizontaal op desktop, verticaal op mobiel.
 */
export function StepsPath({
  steps,
  notDo,
}: {
  steps: { title: string; body: string }[];
  notDo: string;
}) {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const ease = "cubic-bezier(0.4, 0, 0.2, 1)";

  return (
    <div ref={ref} className="relative">
      <style>{`
        @keyframes sp-travel-x { 0% { left: 0%; opacity: 0; } 8% { opacity: 1; } 92% { opacity: 1; } 100% { left: 100%; opacity: 0; } }
        @keyframes sp-travel-y { 0% { top: 0%; opacity: 0; } 8% { opacity: 1; } 92% { opacity: 1; } 100% { top: 100%; opacity: 0; } }
      `}</style>

      {/* Lijn: verticaal op mobiel */}
      <div className="pointer-events-none absolute left-[27px] top-6 bottom-6 w-px bg-white/[0.08] md:hidden">
        <div
          className="absolute inset-0 origin-top bg-brand-bright"
          style={{ transform: active ? "scaleY(1)" : "scaleY(0)", transition: `transform 1400ms ${ease}` }}
        />
        {active && (
          <span
            className="absolute -left-[3px] h-[7px] w-[7px] rounded-full bg-brand-bright shadow-[0_0_12px_rgba(46,127,6,0.9)]"
            style={{ animation: "sp-travel-y 4.5s linear 1.4s infinite" }}
          />
        )}
      </div>
      {/* Lijn: horizontaal op desktop */}
      <div className="pointer-events-none absolute left-[16%] right-[16%] top-7 hidden h-px bg-white/[0.08] md:block">
        <div
          className="absolute inset-0 origin-left bg-brand-bright"
          style={{ transform: active ? "scaleX(1)" : "scaleX(0)", transition: `transform 1400ms ${ease}` }}
        />
        {active && (
          <span
            className="absolute -top-[3px] h-[7px] w-[7px] rounded-full bg-brand-bright shadow-[0_0_12px_rgba(46,127,6,0.9)]"
            style={{ animation: "sp-travel-x 4.5s linear 1.4s infinite" }}
          />
        )}
      </div>

      <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
        {steps.map((s, i) => {
          const on = active;
          const delay = 350 + i * 450;
          return (
            <li key={s.title} className="flex gap-5 md:flex-col md:items-center md:text-center">
              <span
                className="relative z-10 flex h-14 w-14 flex-none items-center justify-center rounded-full border bg-black font-mono text-lg font-bold"
                style={{
                  borderColor: on ? "#2e7f06" : "rgba(255,255,255,0.12)",
                  color: on ? "#f2f2f2" : "rgba(210,210,210,0.6)",
                  boxShadow: on ? "0 0 0 6px rgba(46,127,6,0.12), 0 0 28px rgba(46,127,6,0.25)" : "none",
                  transition: `border-color 500ms ${ease} ${delay}ms, color 500ms ${ease} ${delay}ms, box-shadow 700ms ${ease} ${delay}ms`,
                }}
              >
                {i + 1}
              </span>
              <div
                className="pt-1 md:max-w-xs"
                style={{
                  opacity: on ? 1 : 0,
                  transform: on ? "translateY(0)" : "translateY(14px)",
                  transition: `opacity 600ms ${ease} ${delay + 120}ms, transform 600ms ${ease} ${delay + 120}ms`,
                }}
              >
                <h3 className="text-xl font-bold text-ink md:text-2xl">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-dim">{s.body}</p>
              </div>
            </li>
          );
        })}
      </ol>

      <p
        className="mt-12 text-center text-sm font-semibold text-ink"
        style={{ opacity: active ? 1 : 0, transition: `opacity 600ms ${ease} 1900ms` }}
      >
        {notDo}
      </p>
    </div>
  );
}
