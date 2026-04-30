"use client";

/**
 * EnginePipeline — six specialist AI teams running as one production pipeline.
 *
 * Each team has one lead agent and three sub-agents that coordinate inside
 * the team. Output flows team → team along the main pipeline rail. Performance
 * signals at the end loop back to research at the start, so the engine
 * compounds with every cycle.
 *
 * Layout: U-shape on desktop (3 teams top row, 3 teams bottom row reversed),
 * vertical stack on mobile. Twenty-four agents total — read as a working
 * collective, not six isolated boxes.
 */

interface Team {
  /** Stage in the pipeline, e.g. "01" */
  stage: string;
  /** Functional name shown above the cluster, e.g. "Research Unit" */
  name: string;
  /** Lead agent — larger tile at top of cluster */
  lead: { codename: string; glyph: string };
  /** Three specialist sub-agents below the lead */
  members: Array<{ codename: string; glyph: string }>;
  /** Tailwind gradient for the lead tile */
  gradient: string;
  /** Tailwind gradient (darker) for sub tiles — stays in same colour family */
  subGradient: string;
  /** What this team passes downstream to the next team */
  output: string;
}

const teams: Team[] = [
  {
    stage: "01",
    name: "Research Unit",
    lead: { codename: "ATLAS", glyph: "△" },
    members: [
      { codename: "CORTEX", glyph: "◬" },
      { codename: "BEACON", glyph: "◊" },
      { codename: "PROBE",  glyph: "◇" },
    ],
    gradient:    "from-[#1c5102] to-[#2e7f06]",
    subGradient: "from-[#0f2a01] to-[#1c5102]",
    output: "angles",
  },
  {
    stage: "02",
    name: "Strategy Unit",
    lead: { codename: "HELIOS", glyph: "◎" },
    members: [
      { codename: "AXIS",   glyph: "✕" },
      { codename: "FORGE",  glyph: "▲" },
      { codename: "VECTOR", glyph: "→" },
    ],
    gradient:    "from-[#2c1c4a] to-[#4a2c7a]",
    subGradient: "from-[#1c0f33] to-[#2c1c4a]",
    output: "test plan",
  },
  {
    stage: "03",
    name: "Copy Unit",
    lead: { codename: "CIPHER", glyph: "Σ" },
    members: [
      { codename: "QUILL", glyph: "✎" },
      { codename: "GIST",  glyph: "¶" },
      { codename: "PUNCH", glyph: "!" },
    ],
    gradient:    "from-[#12243a] to-[#1a3450]",
    subGradient: "from-[#08182a] to-[#12243a]",
    output: "scripts",
  },
  {
    stage: "04",
    name: "Production Unit",
    lead: { codename: "VEGA", glyph: "✦" },
    members: [
      { codename: "LUMEN",  glyph: "☀" },
      { codename: "REEL",   glyph: "▶" },
      { codename: "RENDER", glyph: "▣" },
    ],
    gradient:    "from-[#3a1a2c] to-[#5a2a4c]",
    subGradient: "from-[#240f1c] to-[#3a1a2c]",
    output: "creatives",
  },
  {
    stage: "05",
    name: "Media Unit",
    lead: { codename: "ONYX", glyph: "◆" },
    members: [
      { codename: "TIDE",   glyph: "≈" },
      { codename: "FLUX",   glyph: "ϟ" },
      { codename: "ROAM",   glyph: "○" },
    ],
    gradient:    "from-[#1c2a2c] to-[#2c4a4c]",
    subGradient: "from-[#0e1a1c] to-[#1c2a2c]",
    output: "live data",
  },
  {
    stage: "06",
    name: "Performance Unit",
    lead: { codename: "SENTRY", glyph: "◐" },
    members: [
      { codename: "PULSE",    glyph: "♥" },
      { codename: "COMPOUND", glyph: "∞" },
      { codename: "ECHO",     glyph: "⟲" },
    ],
    gradient:    "from-[#3a2a1c] to-[#5a4a3c]",
    subGradient: "from-[#241a0e] to-[#3a2a1c]",
    output: "signals",
  },
];

// ── SVG canvas geometry (desktop U-shape) ───────────────────────────────────
const VB_W = 1400;
const VB_H = 760;
// Cluster centers (where the team lead tile sits)
const CLUSTER_R = 100;        // radius from cluster center used for path offsets
const TOP_Y = 170;
const BOT_Y = 590;
const COL_X = [180, 700, 1220];

const CENTERS: Array<{ x: number; y: number }> = [
  { x: COL_X[0], y: TOP_Y }, // 0 RESEARCH    — top left
  { x: COL_X[1], y: TOP_Y }, // 1 STRATEGY    — top mid
  { x: COL_X[2], y: TOP_Y }, // 2 COPY        — top right
  { x: COL_X[2], y: BOT_Y }, // 3 PRODUCTION  — bottom right
  { x: COL_X[1], y: BOT_Y }, // 4 MEDIA       — bottom mid
  { x: COL_X[0], y: BOT_Y }, // 5 PERFORMANCE — bottom left
];

// Visible bright flow rails — between cluster edges so they don't cut through tiles
const FLOW_PATH = `
  M ${CENTERS[0].x + CLUSTER_R} ${CENTERS[0].y}
  L ${CENTERS[1].x - CLUSTER_R} ${CENTERS[1].y}
  M ${CENTERS[1].x + CLUSTER_R} ${CENTERS[1].y}
  L ${CENTERS[2].x - CLUSTER_R} ${CENTERS[2].y}
  M ${CENTERS[2].x} ${CENTERS[2].y + CLUSTER_R}
  L ${CENTERS[3].x} ${CENTERS[3].y - CLUSTER_R}
  M ${CENTERS[3].x - CLUSTER_R} ${CENTERS[3].y}
  L ${CENTERS[4].x + CLUSTER_R} ${CENTERS[4].y}
  M ${CENTERS[4].x - CLUSTER_R} ${CENTERS[4].y}
  L ${CENTERS[5].x + CLUSTER_R} ${CENTERS[5].y}
`.trim();

// Continuous full path the pulses ride along
const PULSE_PATH = `
  M ${CENTERS[0].x} ${CENTERS[0].y}
  L ${CENTERS[1].x} ${CENTERS[1].y}
  L ${CENTERS[2].x} ${CENTERS[2].y}
  L ${CENTERS[3].x} ${CENTERS[3].y}
  L ${CENTERS[4].x} ${CENTERS[4].y}
  L ${CENTERS[5].x} ${CENTERS[5].y}
`.trim();

const LOOP_PATH = `
  M ${CENTERS[5].x} ${CENTERS[5].y - CLUSTER_R}
  L ${CENTERS[0].x} ${CENTERS[0].y + CLUSTER_R}
`.trim();

const LABELS: Array<{ text: string; x: number; y: number; anchor?: "start" | "middle" | "end" }> = [
  { text: teams[0].output, x: (CENTERS[0].x + CENTERS[1].x) / 2, y: TOP_Y - 28 },
  { text: teams[1].output, x: (CENTERS[1].x + CENTERS[2].x) / 2, y: TOP_Y - 28 },
  { text: teams[2].output, x: COL_X[2] + 26, y: (TOP_Y + BOT_Y) / 2, anchor: "start" },
  { text: teams[3].output, x: (CENTERS[3].x + CENTERS[4].x) / 2, y: BOT_Y + 36 },
  { text: teams[4].output, x: (CENTERS[4].x + CENTERS[5].x) / 2, y: BOT_Y + 36 },
];

export function EnginePipeline() {
  return (
    <div className="relative mx-auto w-full max-w-[1400px]">
      {/* ── Desktop U-shape (≥md) ── */}
      <div className="hidden md:block">
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="h-auto w-full"
          aria-hidden="true"
        >
          {/* Faint full guide rail */}
          <path
            d={PULSE_PATH}
            fill="none"
            stroke="rgba(76, 165, 10, 0.10)"
            strokeWidth={1.5}
            strokeLinecap="round"
          />

          {/* Bright flow rails between cluster edges */}
          <path
            d={FLOW_PATH}
            fill="none"
            stroke="rgba(76, 165, 10, 0.40)"
            strokeWidth={1.5}
            strokeLinecap="round"
          />

          {/* Loop-back rail */}
          <path
            d={LOOP_PATH}
            fill="none"
            stroke="rgba(76, 165, 10, 0.18)"
            strokeWidth={1.2}
            strokeDasharray="3 6"
          />

          {/* Primary travelling pulses along main flow — more frequent for life */}
          {[0, 0.75, 1.5, 2.25, 3, 3.75, 4.5, 5.25].map((delay, i) => (
            <circle key={`pulse-${i}`} r={5} fill="#4ca50a" opacity={0}>
              <animateMotion
                dur="6s"
                repeatCount="indefinite"
                begin={`${delay}s`}
                path={PULSE_PATH}
              />
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                keyTimes="0;0.05;0.95;1"
                dur="6s"
                repeatCount="indefinite"
                begin={`${delay}s`}
              />
            </circle>
          ))}

          {/* Trailing secondary particles — smaller, slightly faster, follow each main pulse */}
          {[0.15, 0.9, 1.65, 2.4, 3.15, 3.9, 4.65, 5.4].map((delay, i) => (
            <circle key={`trail-${i}`} r={2.5} fill="#7ed321" opacity={0}>
              <animateMotion
                dur="6s"
                repeatCount="indefinite"
                begin={`${delay}s`}
                path={PULSE_PATH}
              />
              <animate
                attributeName="opacity"
                values="0;0.55;0.55;0"
                keyTimes="0;0.05;0.95;1"
                dur="6s"
                repeatCount="indefinite"
                begin={`${delay}s`}
              />
            </circle>
          ))}

          {/* Loop-back pulses (two staggered) */}
          {[1, 2.4].map((delay, i) => (
            <circle key={`loop-${i}`} r={3} fill="#2e7f06" opacity={0}>
              <animateMotion
                dur="3.6s"
                repeatCount="indefinite"
                begin={`${delay}s`}
                path={LOOP_PATH}
              />
              <animate
                attributeName="opacity"
                values="0;0.7;0.7;0"
                keyTimes="0;0.1;0.9;1"
                dur="3.6s"
                repeatCount="indefinite"
                begin={`${delay}s`}
              />
            </circle>
          ))}

          {/* Cluster arrival flash — a bright halo blooms at each cluster center as the
              pulse passes. Times are spaced roughly 1s apart along the 6s flow path. */}
          {CENTERS.map((c, i) => (
            <circle
              key={`arrival-${i}`}
              cx={c.x}
              cy={c.y}
              r={CLUSTER_R * 0.45}
              fill="rgba(76, 165, 10, 0)"
              stroke="rgba(76, 165, 10, 0.8)"
              strokeWidth={1.2}
              opacity={0}
            >
              <animate
                attributeName="r"
                values={`${CLUSTER_R * 0.45};${CLUSTER_R * 0.95}`}
                dur="1.2s"
                repeatCount="indefinite"
                begin={`${i * 1.0}s`}
              />
              <animate
                attributeName="opacity"
                values="0;0.55;0"
                keyTimes="0;0.4;1"
                dur="1.2s"
                repeatCount="indefinite"
                begin={`${i * 1.0}s`}
              />
            </circle>
          ))}

          {/* Output labels */}
          {LABELS.map((l) => (
            <text
              key={l.text + l.x}
              x={l.x}
              y={l.y}
              textAnchor={l.anchor ?? "middle"}
              className="font-mono"
              fontSize={12}
              letterSpacing="0.18em"
              fill="rgba(255,255,255,0.50)"
              style={{ textTransform: "uppercase" }}
            >
              → {l.text}
            </text>
          ))}

          {/* Loop-back label */}
          <text
            x={CENTERS[0].x - 26}
            y={(TOP_Y + BOT_Y) / 2}
            textAnchor="end"
            className="font-mono"
            fontSize={11}
            letterSpacing="0.18em"
            fill="rgba(255,255,255,0.32)"
            style={{ textTransform: "uppercase" }}
          >
            ↺ feedback loop
          </text>
        </svg>

        {/* Team clusters layered on top of the SVG */}
        <div className="pointer-events-none absolute inset-0">
          {teams.map((team, i) => (
            <TeamCluster
              key={team.stage}
              team={team}
              index={i}
              left={`${(CENTERS[i].x / VB_W) * 100}%`}
              top={`${(CENTERS[i].y / VB_H) * 100}%`}
              labelAbove={i < 3}
            />
          ))}
        </div>
      </div>

      {/* ── Mobile: vertical stack ── */}
      <div className="space-y-1 md:hidden">
        {teams.map((team, i) => (
          <div key={team.stage}>
            <MobileCluster team={team} index={i} />
            {i < teams.length - 1 && (
              <div className="flex flex-col items-center py-2">
                <div className="h-6 w-px bg-gradient-to-b from-brand-bright/50 to-transparent" />
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink-dim/50">
                  → {team.output}
                </span>
                <div className="mt-1 h-6 w-px bg-gradient-to-b from-transparent to-brand-bright/50" />
              </div>
            )}
          </div>
        ))}
        <p className="pt-3 text-center font-mono text-[9px] uppercase tracking-[0.22em] text-ink-dim/40">
          ↺ signals loop back to research
        </p>
      </div>

      {/* Agent count — total across the engine */}
      <p className="pt-12 text-center font-mono text-[10px] uppercase tracking-[0.32em] text-ink-dim/40">
        24 specialist agents · 6 coordinated units · 1 production engine
      </p>
    </div>
  );
}

/* ── Desktop team cluster (positioned absolutely on the SVG) ─────────────── */
function TeamCluster({
  team,
  index,
  left,
  top,
  labelAbove,
}: {
  team: Team;
  index: number;
  left: string;
  top: string;
  labelAbove: boolean;
}) {
  // Sequential active state — each team activates 1s apart along the 6s loop.
  const activeDelay = `${index * 1}s`;

  return (
    <div
      className="pointer-events-auto absolute flex flex-col items-center"
      style={{ left, top, transform: "translate(-50%, -50%)" }}
    >
      {labelAbove && <ClusterLabel team={team} />}

      {/* Cluster body — lead + connectors + sub agents */}
      <div className="relative flex flex-col items-center">
        {/* Lead tile + active-state pulse ring */}
        <div className="relative">
          {/* Outer ring that swells when this team is the active one */}
          <span
            className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-brand-bright animate-engine-active-ring"
            style={{ animationDelay: activeDelay }}
            aria-hidden="true"
          />
          <div
            className={`relative flex h-[68px] w-[68px] items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br ${team.gradient} animate-engine-active transition-transform duration-500 hover:scale-110`}
            style={{ animationDelay: activeDelay }}
          >
            <span className="text-2xl font-bold text-white/95">{team.lead.glyph}</span>
            <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-bright opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full border border-black bg-brand-bright" />
            </span>
          </div>
        </div>

        {/* Lead codename below tile */}
        <p className="mt-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink">
          {team.lead.codename}
        </p>

        {/* Faint connector lines from lead down to each sub */}
        <div className="relative h-3 w-[140px]">
          <svg
            viewBox="0 0 140 12"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            <line x1="70" y1="0" x2="20"  y2="12" stroke="rgba(76, 165, 10, 0.30)" strokeWidth="1" />
            <line x1="70" y1="0" x2="70"  y2="12" stroke="rgba(76, 165, 10, 0.30)" strokeWidth="1" />
            <line x1="70" y1="0" x2="120" y2="12" stroke="rgba(76, 165, 10, 0.30)" strokeWidth="1" />
          </svg>
        </div>

        {/* 3 sub tiles in a row */}
        <div className="flex items-start gap-3">
          {team.members.map((m, i) => (
            <SubTile
              key={m.codename}
              codename={m.codename}
              glyph={m.glyph}
              gradient={team.subGradient}
              delay={i * 0.5}
            />
          ))}
        </div>
      </div>

      {!labelAbove && <ClusterLabel team={team} below />}
    </div>
  );
}

/* ── Cluster label (stage + name) ────────────────────────────────────────── */
function ClusterLabel({ team, below }: { team: Team; below?: boolean }) {
  return (
    <div className={`flex flex-col items-center ${below ? "mt-3" : "mb-3"}`}>
      <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.28em] text-ink-dim/55">
        {team.stage}
      </span>
      <span className="font-mono text-[12px] font-bold uppercase tracking-[0.22em] text-ink">
        {team.name}
      </span>
    </div>
  );
}

/* ── Sub agent tile (small, with codename below) ─────────────────────────── */
function SubTile({
  codename,
  glyph,
  gradient,
  delay,
}: {
  codename: string;
  glyph: string;
  gradient: string;
  delay: number;
}) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`relative flex h-[34px] w-[34px] items-center justify-center rounded-lg border border-white/10 bg-gradient-to-br ${gradient} shadow-[0_0_10px_rgba(46,127,6,0.14)] transition-transform duration-500 hover:scale-110`}
      >
        <span className="text-sm text-white/85">{glyph}</span>
        {/* Subtle staggered live-dot */}
        <span
          className="absolute -bottom-0.5 -right-0.5 inline-block h-1.5 w-1.5 rounded-full border border-black bg-brand-bright"
          style={{ animation: `pulse 2.4s ${delay}s infinite` }}
        />
      </div>
      <span className="mt-1 font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-ink-dim/60">
        {codename}
      </span>
    </div>
  );
}

/* ── Mobile cluster card (compact) ────────────────────────────────────────── */
function MobileCluster({ team, index }: { team: Team; index: number }) {
  const activeDelay = `${index * 1}s`;
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#0a0a0a] p-4">
      <div className="flex items-center gap-2">
        <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-ink-dim/55">
          {team.stage}
        </span>
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink">
          {team.name}
        </span>
      </div>

      <div className="mt-3 flex items-center gap-3">
        {/* Lead with sequential active pulse */}
        <div className="relative shrink-0">
          <span
            className="pointer-events-none absolute inset-0 rounded-xl border-2 border-brand-bright animate-engine-active-ring"
            style={{ animationDelay: activeDelay }}
            aria-hidden="true"
          />
          <div
            className={`relative flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br ${team.gradient} animate-engine-active`}
            style={{ animationDelay: activeDelay }}
          >
            <span className="text-lg font-bold text-white/90">{team.lead.glyph}</span>
            <span className="absolute -bottom-1 -right-1 flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-bright opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full border border-black bg-brand-bright" />
            </span>
          </div>
        </div>
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-ink">
          {team.lead.codename}
        </span>
        <span className="ml-auto text-ink-dim/40">+</span>

        {/* Sub agents row */}
        <div className="flex items-center gap-1.5">
          {team.members.map((m) => (
            <div
              key={m.codename}
              className={`flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-gradient-to-br ${team.subGradient}`}
              title={m.codename}
            >
              <span className="text-[11px] text-white/80">{m.glyph}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
