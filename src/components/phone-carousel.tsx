"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

/**
 * SPS Creative Engine Demo — multi-phase hero animation
 *
 * Phase 0  "Uploading creatives"     — cards slide in one by one
 * Phase 1  "AI scanning creatives"   — scan lines sweep across all cards
 * Phase 2  "Winners detected"        — 2 winners glow, 3 losers dim + "Low CTR" badge
 * Phase 3  "Scaling winners"         — winners expand, analytics panel appears with ROAS chart
 * Phase 4  "AI generating iterations"— new iteration cards morph in, ROAS climbs higher
 *
 * Then loops seamlessly.
 */

/* ─── Data ─── */
interface Creative {
  id: number;
  src: string;
  /** Optional "iterated v2" image — shown in phase 4 to visualize the AI improving the winner.
   *  Only set on winners. The card cross-fades from src → iteratedSrc when entering phase 4. */
  iteratedSrc?: string;
  label: string;
  type: string;
  ctr: string;
  percentile: number;
  isWinner: boolean;
}

const creatives: Creative[] = [
  {
    id: 1,
    src: "/creatives/product-shot-v1.png",
    iteratedSrc: "/creatives/product-shot.png",
    label: "Product Shot",
    type: "Static",
    ctr: "4.2%",
    percentile: 92,
    isWinner: true,
  },
  { id: 2, src: "/creatives/lifestyle.png", label: "Lifestyle", type: "Static", ctr: "3.8%", percentile: 89, isWinner: false },
  { id: 3, src: "/creatives/before-after.png", label: "Before / After", type: "Static", ctr: "3.3%", percentile: 78, isWinner: false },
  { id: 4, src: "/creatives/ugc-selfie.png", label: "UGC Selfie", type: "UGC", ctr: "2.9%", percentile: 72, isWinner: false },
  {
    id: 5,
    src: "/creatives/infographic-v1.png",
    iteratedSrc: "/creatives/infographic.png",
    label: "Infographic",
    type: "Static",
    ctr: "4.0%",
    percentile: 90,
    isWinner: true,
  },
];

type Phase = 0 | 1 | 2 | 3 | 4;
const PHASE_MS: Record<Phase, number> = { 0: 2800, 1: 4200, 2: 3500, 3: 4000, 4: 4500 };

/* ─── Root ─── */
export function PhoneCarousel() {
  const [phase, setPhase] = useState<Phase>(0);
  const [visible, setVisible] = useState(0); // cards visible (phase 0 stagger)

  // Phase timer
  useEffect(() => {
    const t = setTimeout(() => setPhase((p) => ((p + 1) % 5) as Phase), PHASE_MS[phase]);
    return () => clearTimeout(t);
  }, [phase]);

  // Phase 0: stagger card entry
  useEffect(() => {
    if (phase === 0) {
      setVisible(0);
      let i = 0;
      const t = setInterval(() => {
        i++;
        setVisible(i);
        if (i >= creatives.length) clearInterval(t);
      }, 400);
      return () => clearInterval(t);
    } else {
      setVisible(creatives.length);
    }
  }, [phase]);

  return (
    <div className="relative mx-auto w-full max-w-[1100px]">
      {/* Outer dashboard frame */}
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0b0b0b]">

        {/* Subtle background decoration */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-bright/[0.03] blur-3xl" />
          <div className="absolute -left-32 bottom-0 h-64 w-64 rounded-full bg-brand-bright/[0.02] blur-3xl" />
        </div>

        {/* Header bar */}
        <div className="relative flex items-center justify-between border-b border-white/[0.04] px-5 py-3 md:px-7">
          <PhaseLabel phase={phase} />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-dim/25">
            SPS Creative Engine
          </span>
        </div>

        {/* Main content area — unified flex layout for all phases.
            Winners persist as the same DOM elements across phase 2→3, while losers collapse
            and the analytics panel grows in from the right. This gives a seamless morph. */}
        <div className="relative min-h-[420px] p-4 md:min-h-[480px] md:p-6">
          <div className="flex items-start gap-3 md:gap-4">
            {creatives.map((c, i) => {
              const isCollapsed = phase >= 3 && !c.isWinner;
              return (
                <div
                  key={c.id}
                  className="relative min-w-0 ease-out"
                  style={{
                    flexGrow: isCollapsed ? 0 : 1,
                    flexShrink: 1,
                    flexBasis: 0,
                    // Collapsed losers pull themselves into their left gap so winners close up
                    marginLeft: i > 0 && isCollapsed ? "-1rem" : "0",
                    opacity: isCollapsed ? 0 : 1,
                    pointerEvents: isCollapsed ? "none" : "auto",
                    // Flex-grow + margin share the SAME timing as the analytics panel,
                    // so the space freed by losers is always exactly balanced by the
                    // space taken by analytics — winners grow monotonically, no overshoot.
                    // Opacity fades faster so losers visually disappear before their shell
                    // is fully collapsed.
                    transition: [
                      "flex-grow 750ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                      "margin-left 750ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                      `opacity ${isCollapsed ? "350ms" : "500ms"} ease-out 0ms`,
                      "transform 700ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                      "filter 700ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                    ].join(", "),
                  }}
                >
                  <CreativeCard
                    creative={c}
                    phase={phase}
                    isVisible={i < visible}
                    scanDelay={i * 0.15}
                  />
                </div>
              );
            })}

            {/* Analytics panel — grows in from right, synchronized with loser collapse */}
            <div
              className="relative min-w-0 ease-out"
              style={{
                flexGrow: phase >= 3 ? 1.8 : 0,
                flexShrink: 1,
                flexBasis: 0,
                // When collapsed, pull into left gap so the cards-only layout has no trailing space
                marginLeft: phase >= 3 ? "0" : "-1rem",
                opacity: phase >= 3 ? 1 : 0,
                pointerEvents: phase >= 3 ? "auto" : "none",
                overflow: "hidden",
                // Same flex-grow timing as losers → no "extra space" gap that winners
                // would grab briefly. Opacity is slightly delayed so the panel appears
                // only once some loser ink has cleared.
                transition: [
                  "flex-grow 750ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                  "margin-left 750ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                  "opacity 500ms ease-out 150ms",
                ].join(", "),
              }}
            >
              <AnalyticsPanel phase={phase} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Phase label with animated dot ─── */
function PhaseLabel({ phase }: { phase: Phase }) {
  const config: Record<Phase, { label: string; color: string }> = {
    0: { label: "Uploading creatives", color: "#6b7280" },
    1: { label: "AI scanning creatives", color: "#d97706" },
    2: { label: "Winners detected", color: "#2e7f06" },
    3: { label: "Analyzing creatives", color: "#3b82f6" },
    4: { label: "AI generating iterations", color: "#8b5cf6" },
  };
  const { label, color } = config[phase];

  return (
    <div className="flex items-center gap-2.5">
      <span className="relative flex h-2 w-2">
        <span
          className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
          style={{ backgroundColor: color }}
        />
        <span
          className="relative inline-flex h-2 w-2 rounded-full"
          style={{ backgroundColor: color }}
        />
      </span>
      <span
        className="text-[12px] font-semibold tracking-wide transition-all duration-700"
        style={{ color }}
      >
        {label}
      </span>
    </div>
  );
}

/* ─── Single creative card ─── */
function CreativeCard({
  creative,
  phase,
  isVisible,
  scanDelay,
}: {
  creative: Creative;
  phase: Phase;
  isVisible: boolean;
  scanDelay: number;
}) {
  const isWinner = creative.isWinner;
  const isScanning = phase === 1;
  const isJudged = phase === 2;
  const isScaled = phase >= 3 && isWinner; // phase 3+ enhanced winner layout
  const isIterating = phase === 4;
  const isDimmed = isJudged && !isWinner;
  const isHighlighted = isJudged && isWinner;

  // Opacity for phase 0-2 behaviour (dim losers, full winners)
  const opacity = !isVisible ? 0 : isDimmed ? 0.35 : 1;
  const transform = !isVisible
    ? "translateY(30px) scale(0.9)"
    : isDimmed
    ? "scale(0.95)"
    : isHighlighted
    ? "scale(1.03)"
    : "scale(1)";

  return (
    <div
      className="relative ease-out"
      style={{
        opacity,
        transform,
        filter: isDimmed ? "grayscale(0.6)" : "none",
        transitionProperty: "opacity, transform, filter",
        transitionDuration: "700ms",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Winner badge — sits above the card, fully visible */}
      {isHighlighted && (
        <div className="pointer-events-none absolute left-1/2 -top-2.5 z-30 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 rounded-full border border-brand-bright/70 bg-brand-bright/90 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-lg shadow-brand-bright/30 backdrop-blur-md">
            <TrophyIcon /> Winner
          </span>
        </div>
      )}

      {/* Low CTR badge — sits above the card, fully visible */}
      {isDimmed && (
        <div className="pointer-events-none absolute left-1/2 -top-2.5 z-30 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 rounded-full border border-red-500/60 bg-red-500/90 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-lg shadow-red-500/20 backdrop-blur-md">
            Low CTR
          </span>
        </div>
      )}

      <div
        className={`group relative overflow-hidden rounded-xl border transition-all duration-700 ${
          isHighlighted || isScaled
            ? "border-brand-bright/50 shadow-lg shadow-brand-bright/20"
            : "border-white/[0.06]"
        } bg-[#111]`}
      >
        {/* Phase 3+ header: label + "Live on Meta" / "Iterating v2" badge */}
        {isScaled && (
          <div className="flex items-center justify-between px-3 pt-3 pb-1.5">
            <span className="text-[11px] font-semibold text-ink-muted">
              {creative.label}
            </span>
            <span
              className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold"
              style={{
                backgroundColor: isIterating
                  ? "rgba(139,92,246,0.15)"
                  : "rgba(46,127,6,0.15)",
                color: isIterating ? "#8b5cf6" : "#2e7f06",
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full animate-pulse"
                style={{
                  backgroundColor: isIterating ? "#8b5cf6" : "#2e7f06",
                }}
              />
              {isIterating ? "Iterating v2" : "Analyzing"}
            </span>
          </div>
        )}

        {/* Image — margin + rounded corners grow in smoothly in phase 3+. 1:1 aspect matches source creatives. */}
        <div
          className={`relative aspect-square overflow-hidden transition-all duration-700 ${
            isScaled ? "mx-2.5 mb-2 rounded-lg" : ""
          }`}
        >
          {/* v1 (starting) image — shown through phase 0-3, fades out in phase 4 for iterated winners */}
          <Image
            src={creative.src}
            alt={creative.label}
            fill
            className="object-cover transition-opacity duration-[1100ms] ease-out"
            style={{
              opacity: isIterating && creative.iteratedSrc ? 0 : 1,
            }}
            sizes="(max-width: 768px) 25vw, 260px"
          />

          {/* v2 (iterated) image — cross-fades in during phase 4, only for winners with iteratedSrc */}
          {creative.iteratedSrc && (
            <Image
              src={creative.iteratedSrc}
              alt={`${creative.label} — iterated`}
              fill
              className="object-cover transition-opacity duration-[1100ms] ease-out"
              style={{
                opacity: isIterating ? 1 : 0,
              }}
              sizes="(max-width: 768px) 25vw, 260px"
            />
          )}

          {/* Scan overlay — glow band + bright leading line */}
          {isScanning && (
            <>
              {/* Subtle darken for pre-scan mood */}
              <div className="pointer-events-none absolute inset-0 bg-black/15" />

              {/* Soft green glow band (body of the scan) */}
              <div
                className="pointer-events-none absolute left-0 right-0 h-[55%] animate-scan-glow"
                style={{
                  top: "-55%",
                  background:
                    "linear-gradient(to bottom, rgba(46,127,6,0) 0%, rgba(46,127,6,0.10) 40%, rgba(46,127,6,0.28) 75%, rgba(46,127,6,0.42) 100%)",
                  animationDelay: `${scanDelay}s`,
                  mixBlendMode: "screen",
                }}
              />

              {/* Bright leading-edge line */}
              <div
                className="pointer-events-none absolute left-0 right-0 h-[2px] animate-scan bg-gradient-to-r from-transparent via-brand-bright to-transparent"
                style={{
                  top: "-4%",
                  animationDelay: `${scanDelay}s`,
                  boxShadow:
                    "0 0 10px rgba(46,127,6,0.9), 0 0 24px rgba(46,127,6,0.55), 0 0 40px rgba(46,127,6,0.3)",
                }}
              />
            </>
          )}

          {/* Green check overlay for winners in phase 2 */}
          {isHighlighted && (
            <div className="absolute inset-0 flex items-center justify-center bg-brand-bright/10">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-bright/20 backdrop-blur-sm">
                <CheckIcon />
              </div>
            </div>
          )}

          {/* Iteration shimmer (phase 4 winners) — subtle continuous effect */}
          {isIterating && isWinner && (
            <div className="pointer-events-none absolute inset-0 animate-pulse bg-gradient-to-b from-violet-500/10 via-transparent to-violet-500/10" />
          )}

          {/* Iteration sparkle burst — plays once when phase 4 begins */}
          {isIterating && isWinner && <IterationSparkles />}
        </div>

        {/* Bottom section — phase 3+ shows stats row, phase 0-2 shows simple info bar */}
        {isScaled ? (
          <div className="flex items-center justify-center gap-4 px-3 pb-3">
            <Stat label="CTR" value={creative.ctr} />
            <Stat
              label="ROAS"
              value={isIterating ? "5.1x" : "4.2x"}
              highlight={isIterating}
            />
            <Stat label="Spend" value={isIterating ? "€8.2K" : "€4.5K"} />
          </div>
        ) : (
          <div className="flex items-center justify-between px-2.5 py-2">
            <div>
              <p className="text-[10px] font-semibold text-ink-muted leading-tight">
                {creative.label}
              </p>
              <p className="text-[8px] text-ink-dim/40">{creative.type}</p>
            </div>
            {(isScanning || isJudged) && (
              <div className="text-right">
                <p className="text-[10px] font-bold text-ink-muted">
                  {creative.ctr}
                </p>
                <p
                  className="text-[8px] font-semibold"
                  style={{
                    color:
                      creative.percentile >= 90
                        ? "#2e7f06"
                        : creative.percentile >= 80
                        ? "#d97706"
                        : "#ef4444",
                  }}
                >
                  Top {100 - creative.percentile}%
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Analytics panel (phases 3–4) ─── */
/* Only the right-hand panel. Winner cards are now rendered in the main flex container
   so they can persist across phase 2→3 for a seamless morph. */
function AnalyticsPanel({ phase }: { phase: Phase }) {
  const isIterating = phase === 4;

  return (
    <div className="flex h-full flex-col rounded-xl border border-white/[0.06] bg-[#0a0a0a] p-4">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ChartIcon />
          <span className="text-[13px] font-semibold text-ink-muted">
            Campaign Performance
          </span>
        </div>
        <span className="rounded-full bg-white/[0.04] px-2 py-0.5 text-[9px] text-ink-dim/40">
          Last 8 weeks
        </span>
      </div>

      {/* KPI row */}
      <div className="mb-4 grid grid-cols-3 gap-2">
        <KpiBox label="Total ROAS" value={isIterating ? "5.1x" : "4.2x"} change={isIterating ? "+21%" : "+12%"} />
        <KpiBox label="CTR avg" value={isIterating ? "5.8%" : "4.6%"} change={isIterating ? "+26%" : "+18%"} />
        <KpiBox label="CPA" value={isIterating ? "€8.40" : "€11.20"} change={isIterating ? "-25%" : "-14%"} good />
      </div>

      {/* ROAS chart */}
      <div className="flex-1 min-h-[140px] md:min-h-[180px]">
        <RoasChart phase={phase} />
      </div>

      {/* Phase 4: iteration message */}
      {isIterating && (
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-violet-500/20 bg-violet-500/[0.05] px-3 py-2">
          <SparkleIcon />
          <span className="text-[11px] text-violet-300">
            AI generated new iterations based on winning hooks — ROAS climbing
          </span>
        </div>
      )}
    </div>
  );
}

/* ─── ROAS Chart ─── */
function RoasChart({ phase }: { phase: Phase }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    const t = setInterval(() => setProgress((p) => Math.min(p + 2, 100)), 50);
    return () => clearInterval(t);
  }, [phase]);

  const isIterating = phase === 4;
  const dashLen = 800;
  const offset = dashLen - (dashLen * progress) / 100;

  // Base ROAS line
  const basePath = "M 40 150 C 80 148 120 140 160 125 C 200 110 240 90 280 75 C 320 60 360 50 400 45";
  // Extended line for iteration phase — shoots up
  const iterPath = basePath + " C 420 35 440 20 460 8";
  // Normal end
  const normalEnd = basePath + " C 420 42 440 40 460 38";

  return (
    <svg viewBox="0 0 480 170" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
      {/* Grid */}
      {[150, 120, 90, 60, 30].map((y, i) => (
        <g key={i}>
          <line x1="40" y1={y} x2="460" y2={y} stroke="white" strokeOpacity="0.04" strokeWidth="0.5" />
          <text x="12" y={y + 3} fill="white" fillOpacity="0.15" fontSize="8" fontFamily="monospace">
            {i + 1}x
          </text>
        </g>
      ))}

      {/* ROAS line */}
      <path
        d={isIterating ? iterPath : normalEnd}
        fill="none"
        stroke={isIterating ? "#8b5cf6" : "#2e7f06"}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray={dashLen}
        strokeDashoffset={offset}
      />

      {/* Glow behind line */}
      <path
        d={isIterating ? iterPath : normalEnd}
        fill="none"
        stroke={isIterating ? "#8b5cf6" : "#2e7f06"}
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={dashLen}
        strokeDashoffset={offset}
        opacity="0.15"
      />

      {/* Baseline reference */}
      <line x1="40" y1="150" x2="460" y2="150" stroke="white" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="4 4" />
      <text x="462" y="153" fill="white" fillOpacity="0.15" fontSize="7" fontFamily="monospace">baseline</text>

      {/* End dot */}
      {progress > 90 && (
        <circle
          cx={460}
          cy={isIterating ? 8 : 38}
          r="4"
          fill={isIterating ? "#8b5cf6" : "#2e7f06"}
          className="animate-pulse"
        />
      )}

      {/* Labels */}
      <text x="230" y="168" fill="white" fillOpacity="0.12" fontSize="8" fontFamily="monospace" textAnchor="middle">
        WEEKS
      </text>
    </svg>
  );
}

/* ─── Small components ─── */

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="text-center">
      <span className="block text-[8px] uppercase tracking-wider text-ink-dim/40">{label}</span>
      <span className={`text-[13px] font-bold ${highlight ? "text-violet-400" : "text-ink-muted"}`}>
        {value}
      </span>
    </div>
  );
}

function KpiBox({ label, value, change, good }: { label: string; value: string; change: string; good?: boolean }) {
  const isPositiveChange = change.startsWith("+") || change.startsWith("-");
  const changeColor = change.startsWith("-")
    ? good ? "text-brand-bright" : "text-red-400"
    : "text-brand-bright";

  return (
    <div className="rounded-lg border border-white/[0.04] bg-white/[0.02] px-2 py-2.5 text-center">
      <span className="block text-[7px] uppercase tracking-wider text-ink-dim/35">{label}</span>
      <span className="text-[16px] font-bold text-ink">{value}</span>
      <span className={`block text-[9px] font-semibold ${changeColor}`}>{change}</span>
    </div>
  );
}

function TrophyIcon() {
  return (
    <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
      <path d="M5 3h14c.6 0 1 .4 1 1v2c0 2.2-1.8 4-4 4h-1v2h2c.6 0 1 .4 1 1v1H6v-1c0-.6.4-1 1-1h2v-2H8c-2.2 0-4-1.8-4-4V4c0-.6.4-1 1-1z" />
      <path d="M9 16h6v2H9zM7 20h10v1H7z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2e7f06" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-ink-dim">
      <path d="M3 3v18h18" />
      <path d="M18 17V9" />
      <path d="M13 17V5" />
      <path d="M8 17v-3" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#8b5cf6">
      <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
    </svg>
  );
}

/* ─── Iteration sparkle burst (phase 4 entry animation) ─── */
/* Plays once when the card enters phase 4. A central magic pulse fires a radial glow,
   then sparkle particles twinkle across the card in staggered bursts. Fully drives the
   "AI is generating a better version right now" moment synced with the v1→v2 crossfade. */
const SPARKLE_POSITIONS = [
  { x: 18, y: 22, size: 14, delay: 0.05 },
  { x: 72, y: 14, size: 16, delay: 0.2 },
  { x: 48, y: 34, size: 11, delay: 0.12 },
  { x: 84, y: 44, size: 18, delay: 0.32 },
  { x: 22, y: 58, size: 13, delay: 0.24 },
  { x: 62, y: 66, size: 14, delay: 0.4 },
  { x: 32, y: 82, size: 12, delay: 0.46 },
  { x: 76, y: 80, size: 16, delay: 0.3 },
  { x: 10, y: 44, size: 10, delay: 0.38 },
  { x: 92, y: 28, size: 11, delay: 0.44 },
  { x: 54, y: 18, size: 13, delay: 0.16 },
  { x: 40, y: 72, size: 10, delay: 0.52 },
];

function IterationSparkles() {
  return (
    <>
      {/* Central magic pulse — radial violet glow that expands outward */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <div
          className="h-[140%] w-[140%] animate-magic-pulse rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.55) 0%, rgba(139,92,246,0.25) 35%, rgba(139,92,246,0) 70%)",
            mixBlendMode: "screen",
          }}
        />
      </div>

      {/* Sparkle particles — 4-point stars that twinkle across the card */}
      {SPARKLE_POSITIONS.map((s, i) => (
        <div
          key={i}
          className="pointer-events-none absolute animate-sparkle"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            marginLeft: -s.size / 2,
            marginTop: -s.size / 2,
            animationDelay: `${s.delay}s`,
            filter:
              "drop-shadow(0 0 4px rgba(139,92,246,0.9)) drop-shadow(0 0 8px rgba(255,255,255,0.6))",
          }}
        >
          <svg viewBox="0 0 24 24" width={s.size} height={s.size} fill="white">
            <path d="M12 0l1.8 8.4L22 12l-8.2 3.6L12 24l-1.8-8.4L2 12l8.2-3.6z" />
          </svg>
        </div>
      ))}
    </>
  );
}
