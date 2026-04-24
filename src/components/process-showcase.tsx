"use client";

/**
 * Process showcase — 4 large animated cards replacing the static grid.
 * Inspired by extuitive.com/#product but in SPS brand (black + three greens).
 *
 * Each scene is self-contained with continuous looping CSS animations
 * (no one-shot timers, no JS state) so hover/view stays alive.
 */

import Image from "next/image";
import { FadeIn } from "@/components/fade-in";

export function ProcessShowcase() {
  return (
    <section
      id="process"
      className="container-content scroll-mt-20 py-24 lg:py-32"
    >
      <FadeIn>
        <div className="mb-16 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-bright">
            Process
          </p>
          <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-bold tracking-tight text-ink md:text-5xl">
            From{" "}
            <span className="bg-gradient-to-r from-[#4ca50a] via-[#2e7f06] to-[#266604] bg-clip-text font-serif font-normal italic text-transparent">
              brief to results
            </span>{" "}
            in 4 steps.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-ink-dim">
            A closed-loop system. Every step feeds the next — research sharpens
            strategy, strategy shapes production, production fuels scale.
          </p>
        </div>
      </FadeIn>

      <div className="grid gap-6 lg:grid-cols-2">
        <FadeIn delay={0}>
          <ProcessCard
            number="01"
            title="Intelligence"
            description="Deep product, audience, and competitor research. We scan the ad library, extract winning hooks, angles, and proof patterns — before a single creative gets made."
            scene={<IntelligenceScene />}
          />
        </FadeIn>
        <FadeIn delay={120}>
          <ProcessCard
            number="02"
            title="Strategy"
            description="Map winning angles, hooks, and formats. Score every concept against research data, define what to test first, and set the creative frameworks for the batch."
            scene={<StrategyScene />}
          />
        </FadeIn>
        <FadeIn delay={240}>
          <ProcessCard
            number="03"
            title="Production"
            description="AI-powered creative engine produces statics, video, and UGC at scale. Higgsfield, Nano Banana Pro, and our in-house workflows turn briefs into batches in days."
            scene={<ProductionScene />}
          />
        </FadeIn>
        <FadeIn delay={360}>
          <ProcessCard
            number="04"
            title="Scale"
            description="Launch, optimize daily, iterate weekly. Winners compound and get scaled, losers get cut. Performance data loops back into research and strategy."
            scene={<ScaleScene />}
          />
        </FadeIn>
      </div>

      {/* Shared keyframes for all scenes */}
      <style jsx global>{`
        /* ── 01 Intelligence ── */
        @keyframes sps-scan-vertical {
          0% { transform: translateY(-10%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(110%); opacity: 0; }
        }
        @keyframes sps-ad-scroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes sps-tag-pop {
          0%, 100% { opacity: 0; transform: translateY(4px); }
          15%, 75% { opacity: 1; transform: translateY(0); }
        }

        /* ── 02 Strategy ── */
        @keyframes sps-angle-cycle {
          0%, 100% {
            border-color: rgba(255,255,255,0.06);
            background: rgba(255,255,255,0.02);
          }
          30% {
            border-color: rgba(46,127,6,0.4);
            background: rgba(46,127,6,0.04);
            box-shadow: 0 0 16px rgba(46,127,6,0.12);
          }
          60%, 85% {
            border-color: rgba(46,127,6,0.7);
            background: rgba(46,127,6,0.08);
            box-shadow: 0 0 22px rgba(46,127,6,0.22);
          }
        }
        @keyframes sps-check-appear {
          0%, 55% { opacity: 0; transform: scale(0.4); }
          65%, 100% { opacity: 1; transform: scale(1); }
        }
        @keyframes sps-progress-grow {
          0% { width: 0%; }
          100% { width: 85%; }
        }

        /* ── 03 Production ── */
        @keyframes sps-tile-reveal {
          0%, 8% { opacity: 0; transform: scale(0.92); }
          18%, 82% { opacity: 1; transform: scale(1); }
          92%, 100% { opacity: 0; transform: scale(0.92); }
        }
        @keyframes sps-tile-sparkle {
          0%, 15% { opacity: 0; transform: scale(0.3); }
          22% { opacity: 1; transform: scale(1.1); }
          35%, 100% { opacity: 0; transform: scale(1.4); }
        }
        @keyframes sps-counter-tick {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }

        /* ── 04 Scale ── */
        @keyframes sps-chart-draw {
          0% { stroke-dashoffset: 1000; }
          45%, 100% { stroke-dashoffset: 0; }
        }
        @keyframes sps-chart-fill {
          0%, 35% { opacity: 0; }
          55%, 100% { opacity: 1; }
        }
        @keyframes sps-winner-ping {
          0%, 60% { opacity: 0; transform: scale(0.5); }
          70% { opacity: 1; transform: scale(1.1); }
          100% { opacity: 0; transform: scale(2.2); }
        }
        @keyframes sps-winner-dot {
          0%, 60% { opacity: 0; }
          70%, 100% { opacity: 1; }
        }
        @keyframes sps-stat-rise {
          0%, 20% { opacity: 0; transform: translateY(8px); }
          40%, 100% { opacity: 1; transform: translateY(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .sps-scene * { animation: none !important; }
        }
      `}</style>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────── */
/*  Wrapper card                                                 */
/* ──────────────────────────────────────────────────────────── */

function ProcessCard({
  number,
  title,
  description,
  scene,
}: {
  number: string;
  title: string;
  description: string;
  scene: React.ReactNode;
}) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/[0.07] bg-[#0a0a0a] p-7 transition-all duration-500 hover:border-brand-bright/30 hover:shadow-[0_0_50px_rgba(46,127,6,0.1)] md:p-9">
      {/* Ambient corner glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-brand-bright/[0.06] blur-3xl transition-opacity duration-700 group-hover:opacity-[1.6]" />

      {/* Top section: number + title + desc */}
      <div className="relative">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand-bright/50">
            Step {number}
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-brand-bright/30 to-transparent" />
        </div>
        <h3 className="mt-4 text-2xl font-bold tracking-tight text-ink md:text-3xl">
          {title}
        </h3>
        <p className="mt-3 max-w-md text-sm text-ink-dim/80 md:text-base">
          {description}
        </p>
      </div>

      {/* Scene */}
      <div className="sps-scene relative mt-7 h-[260px] overflow-hidden rounded-2xl border border-white/[0.06] bg-[#070707] md:h-[300px]">
        {scene}
      </div>
    </article>
  );
}

/* ──────────────────────────────────────────────────────────── */
/*  01 Intelligence — Competitor Ad Scanner                      */
/* ──────────────────────────────────────────────────────────── */

function IntelligenceScene() {
  const ads = [
    { brand: "NORTHMADE", category: "Skincare", hue: "#1a2b0c" },
    { brand: "Velora", category: "Wellness", hue: "#0c1a2a" },
    { brand: "HELIX", category: "Beauty", hue: "#2a0c1a" },
    { brand: "FORM+CO", category: "Supplements", hue: "#0c2a22" },
    { brand: "axis.", category: "Fashion", hue: "#1a0c2a" },
    { brand: "TERRA", category: "Home", hue: "#2a1a0c" },
  ];
  const doubled = [...ads, ...ads];

  return (
    <div className="relative h-full w-full">
      {/* Left: scrolling ad thumbnails */}
      <div className="absolute left-5 top-0 h-full w-[44%] overflow-hidden">
        <div
          className="flex flex-col gap-3 py-6"
          style={{
            animation: "sps-ad-scroll 18s linear infinite",
          }}
        >
          {doubled.map((ad, i) => (
            <div
              key={i}
              className="relative flex h-20 shrink-0 items-end overflow-hidden rounded-lg border border-white/5"
              style={{ background: `linear-gradient(135deg, ${ad.hue}, #050505)` }}
            >
              {/* Fake ad content silhouette */}
              <div className="absolute right-3 top-3 h-2.5 w-10 rounded-full bg-white/15" />
              <div className="absolute right-3 top-7 h-1.5 w-8 rounded-full bg-white/10" />
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-[10px] font-bold tracking-[0.2em] text-ink/90">
                  {ad.brand}
                </p>
                <p className="text-[9px] text-ink-dim/50">{ad.category}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Vertical scan line sweeping over the ads */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-16"
          style={{ animation: "sps-scan-vertical 3.2s ease-in-out infinite" }}
        >
          <div className="h-full w-full bg-gradient-to-b from-transparent via-[#2e7f06]/70 to-transparent blur-sm" />
          <div className="absolute left-0 right-0 top-1/2 h-px bg-[#2e7f06] shadow-[0_0_10px_rgba(46,127,6,0.9)]" />
        </div>

        {/* Edge masks */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-[#070707] to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-[#070707] to-transparent" />
      </div>

      {/* Right: insights panel */}
      <div className="absolute right-5 top-6 flex w-[48%] flex-col gap-2.5">
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-brand-bright shadow-[0_0_8px_rgba(46,127,6,0.8)]" />
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-ink-dim/60">
            Insights extracted
          </p>
        </div>

        {[
          { tag: "HOOK", text: "\"The 14-day reveal\"", delay: "0s" },
          { tag: "ANGLE", text: "Time-saving benefit", delay: "0.6s" },
          { tag: "PROOF", text: "UGC testimonials", delay: "1.2s" },
          { tag: "TRIGGER", text: "Limited release", delay: "1.8s" },
          { tag: "CTA", text: "\"Try risk-free\"", delay: "2.4s" },
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2 rounded-md border border-brand-bright/20 bg-brand-bright/[0.06] px-2.5 py-1.5"
            style={{
              animation: `sps-tag-pop 4s ease-in-out infinite`,
              animationDelay: item.delay,
            }}
          >
            <span className="text-[9px] font-bold tracking-[0.2em] text-brand-bright">
              {item.tag}
            </span>
            <span className="truncate text-[11px] text-ink-dim/85">
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────── */
/*  02 Strategy — Angle Testing Matrix                           */
/* ──────────────────────────────────────────────────────────── */

function StrategyScene() {
  const angles = [
    "Before / After reveal",
    "Pain-point agitation",
    "Founder story POV",
    "Product-in-action demo",
    "UGC testimonial cut",
    "Time-urgency offer",
  ];

  return (
    <div className="relative h-full w-full p-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-ink-dim/60">
          Angle testing matrix
        </p>
        <p className="text-[10px] font-semibold tracking-wide text-brand-bright">
          6 / 18 winners
        </p>
      </div>

      {/* 3x2 grid */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        {angles.map((angle, i) => (
          <div
            key={i}
            className="relative flex h-[72px] flex-col justify-between rounded-lg border border-white/5 bg-white/[0.02] p-2.5"
            style={{
              animation: `sps-angle-cycle 6s ease-in-out infinite`,
              animationDelay: `${i * 0.35}s`,
            }}
          >
            <p className="text-[10px] font-semibold leading-tight text-ink/85">
              {angle}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex gap-0.5">
                {Array.from({ length: 3 }).map((_, s) => (
                  <div
                    key={s}
                    className="h-1 w-3 rounded-full bg-brand-bright/40"
                  />
                ))}
              </div>
              {/* Check mark appearing when "winner" state */}
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5 text-brand-bright"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  animation: `sps-check-appear 6s ease-in-out infinite`,
                  animationDelay: `${i * 0.35}s`,
                }}
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-dim/60">
            Validation progress
          </p>
          <p className="text-[10px] text-brand-bright">85%</p>
        </div>
        <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#1c5102] via-[#266604] to-[#2e7f06] shadow-[0_0_8px_rgba(46,127,6,0.5)]"
            style={{
              animation: "sps-progress-grow 4s ease-in-out infinite alternate",
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────── */
/*  03 Production — AI Creative Engine Grid                      */
/* ──────────────────────────────────────────────────────────── */

function ProductionScene() {
  const creatives = [
    "/creatives/product-shot.png",
    "/creatives/lifestyle.png",
    "/creatives/infographic.png",
    "/creatives/before-after.png",
    "/creatives/ugc-selfie.png",
    "/creatives/product-shot-v1.png",
    "/creatives/infographic-v1.png",
    "/creatives/lifestyle.png",
    "/creatives/product-shot.png",
  ];

  return (
    <div className="relative h-full w-full p-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-ink-dim/60">
          Creative batch engine
        </p>
        <div className="flex items-center gap-1.5">
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-bright shadow-[0_0_8px_rgba(46,127,6,0.8)]" />
          <p className="text-[10px] font-semibold text-brand-bright">
            Generating
          </p>
        </div>
      </div>

      {/* 3x3 grid of tiles */}
      <div className="mt-3 grid grid-cols-3 gap-1.5">
        {creatives.map((src, i) => (
          <div
            key={i}
            className="relative aspect-[9/14] overflow-hidden rounded-md border border-white/[0.06] bg-[#0d0d0d]"
          >
            {/* Dark placeholder shimmer always visible underneath */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#111] to-[#060606]" />

            {/* Image that reveals in a staggered loop */}
            <div
              className="absolute inset-0"
              style={{
                animation: `sps-tile-reveal 9s ease-in-out infinite`,
                animationDelay: `${i * 0.55}s`,
              }}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>

            {/* Sparkle at moment of reveal */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-bright/60 blur-xl"
              style={{
                animation: `sps-tile-sparkle 9s ease-in-out infinite`,
                animationDelay: `${i * 0.55}s`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Bottom stat bar */}
      <div className="mt-4 flex items-center justify-between rounded-lg border border-brand-bright/20 bg-brand-bright/[0.04] px-3 py-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-dim/70">
          Generated this batch
        </p>
        <div className="flex items-baseline gap-1">
          <span className="text-base font-bold text-brand-bright">48</span>
          <span className="text-[10px] text-ink-dim/60">creatives</span>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────── */
/*  04 Scale — Performance Dashboard Chart                       */
/* ──────────────────────────────────────────────────────────── */

function ScaleScene() {
  return (
    <div className="relative h-full w-full p-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-ink-dim/60">
            Blended ROAS — last 30 days
          </p>
          <div className="mt-1.5 flex items-baseline gap-2">
            <span
              className="text-2xl font-bold tracking-tight text-ink"
              style={{
                animation: "sps-stat-rise 5s ease-in-out infinite",
              }}
            >
              4.8x
            </span>
            <span className="text-[11px] font-semibold text-brand-bright">
              +32% MoM
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-1.5">
            <div className="h-[2px] w-4 rounded bg-[#2e7f06]" />
            <span className="text-[10px] text-ink-dim/70">ROAS</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-[2px] w-4 rounded bg-[#266604]/60 opacity-50" />
            <span className="text-[10px] text-ink-dim/50">Spend</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="relative mt-4 h-[160px] w-full">
        <svg
          viewBox="0 0 400 160"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <defs>
            <linearGradient id="sps-chart-fill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2e7f06" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#2e7f06" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="sps-chart-line" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#266604" />
              <stop offset="100%" stopColor="#2e7f06" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[40, 80, 120].map((y) => (
            <line
              key={y}
              x1="0"
              x2="400"
              y1={y}
              y2={y}
              stroke="rgba(255,255,255,0.04)"
              strokeDasharray="2 4"
            />
          ))}

          {/* Area fill under ROAS line */}
          <path
            d="M0,130 L20,120 L50,115 L80,105 L110,100 L140,90 L170,85 L200,70 L230,65 L260,55 L290,45 L320,38 L350,30 L380,22 L400,18 L400,160 L0,160 Z"
            fill="url(#sps-chart-fill)"
            style={{
              animation: "sps-chart-fill 5s ease-in-out infinite",
            }}
          />

          {/* Spend line (background reference, subtle dashed) */}
          <path
            d="M0,140 L40,135 L80,130 L120,120 L160,115 L200,105 L240,100 L280,90 L320,82 L360,75 L400,68"
            stroke="#266604"
            strokeWidth="1.5"
            strokeDasharray="3 4"
            strokeOpacity="0.4"
            fill="none"
          />

          {/* ROAS line (foreground, solid green) */}
          <path
            d="M0,130 L20,120 L50,115 L80,105 L110,100 L140,90 L170,85 L200,70 L230,65 L260,55 L290,45 L320,38 L350,30 L380,22 L400,18"
            stroke="url(#sps-chart-line)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="1000"
            strokeDashoffset="1000"
            style={{
              animation: "sps-chart-draw 5s ease-in-out infinite",
              filter: "drop-shadow(0 0 4px rgba(46,127,6,0.5))",
            }}
          />

          {/* Winner dots at peaks */}
          {[
            { x: 200, y: 70, delay: "1.8s" },
            { x: 290, y: 45, delay: "2.8s" },
            { x: 380, y: 22, delay: "3.8s" },
          ].map((pt, i) => (
            <g key={i}>
              <circle
                cx={pt.x}
                cy={pt.y}
                r="8"
                fill="#2e7f06"
                style={{
                  animation: "sps-winner-ping 5s ease-in-out infinite",
                  animationDelay: pt.delay,
                  transformOrigin: `${pt.x}px ${pt.y}px`,
                }}
              />
              <circle
                cx={pt.x}
                cy={pt.y}
                r="3.5"
                fill="#2e7f06"
                stroke="#070707"
                strokeWidth="1.5"
                style={{
                  animation: "sps-winner-dot 5s ease-in-out infinite",
                  animationDelay: pt.delay,
                }}
              />
            </g>
          ))}
        </svg>
      </div>

      {/* Stats row */}
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[
          { label: "Winners", value: "12", delay: "0.4s" },
          { label: "Spend", value: "€84K", delay: "0.6s" },
          { label: "New CAC", value: "€19", delay: "0.8s" },
        ].map((stat, i) => (
          <div
            key={i}
            className="rounded-lg border border-white/5 bg-white/[0.02] px-2.5 py-1.5"
            style={{
              animation: "sps-stat-rise 5s ease-in-out infinite",
              animationDelay: stat.delay,
            }}
          >
            <p className="text-[9px] uppercase tracking-[0.2em] text-ink-dim/50">
              {stat.label}
            </p>
            <p className="text-sm font-bold text-ink">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
