"use client";

/**
 * EngineNetwork — abstract visualization of the SPS AI engine.
 *
 * Twelve anonymized agent nodes arranged in a dodecagon around a central core,
 * connected by pulsing data lines. No role labels, no claims, no descriptions —
 * the engine is shown as a working machine without exposing what each agent does.
 */

interface Node {
  codename: string;
  glyph: string;
  gradient: string;
  /** Angle in degrees on the perimeter (0° = right, 90° = bottom) */
  angle: number;
}

// Ordered clockwise starting from top (270°), one node every 30°.
const nodes: Node[] = [
  { codename: "ATLAS",  glyph: "△", gradient: "from-[#1c5102] to-[#2e7f06]", angle: 270 },
  { codename: "NOVA",   glyph: "✸", gradient: "from-[#3a2c1c] to-[#5a4c2c]", angle: 300 },
  { codename: "HELIOS", glyph: "◎", gradient: "from-[#2c1c4a] to-[#4a2c7a]", angle: 330 },
  { codename: "NEXUS",  glyph: "⬡", gradient: "from-[#1c1c3a] to-[#2c2c5a]", angle: 0   },
  { codename: "VEGA",   glyph: "✦", gradient: "from-[#3a1a2c] to-[#5a2a4c]", angle: 30  },
  { codename: "PRISM",  glyph: "◇", gradient: "from-[#1a3a3a] to-[#2a5a5a]", angle: 60  },
  { codename: "SENTRY", glyph: "◐", gradient: "from-[#3a2a1c] to-[#5a4a3c]", angle: 90  },
  { codename: "KAIROS", glyph: "Φ", gradient: "from-[#3a1c3a] to-[#5a2c5a]", angle: 120 },
  { codename: "ONYX",   glyph: "◆", gradient: "from-[#1c2a2c] to-[#2c4a4c]", angle: 150 },
  { codename: "ORION",  glyph: "✧", gradient: "from-[#3a2c1a] to-[#5a4c3a]", angle: 180 },
  { codename: "CIPHER", glyph: "Σ", gradient: "from-[#12243a] to-[#1a3450]", angle: 210 },
  { codename: "AXIOM",  glyph: "Ω", gradient: "from-[#2a1c3a] to-[#4a2c5a]", angle: 240 },
];

// SVG geometry — uses viewBox so the SVG scales down on mobile naturally,
// while node tiles use responsive sizes via Tailwind classes.
const SIZE = 560;
const CENTER = SIZE / 2;
const RADIUS = 215;

function pos(angle: number) {
  const rad = (angle * Math.PI) / 180;
  return {
    x: CENTER + RADIUS * Math.cos(rad),
    y: CENTER + RADIUS * Math.sin(rad),
  };
}

export function EngineNetwork() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[340px] sm:max-w-[440px] md:max-w-[560px]">
      {/* SVG layer for spokes, perimeter, and animated pulses */}
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          {/* Core radial glow */}
          <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4ca50a" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#4ca50a" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#4ca50a" stopOpacity="0" />
          </radialGradient>

          {/* Outer ambient glow */}
          <radialGradient id="ambient-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2e7f06" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#2e7f06" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient outer glow */}
        <circle cx={CENTER} cy={CENTER} r={SIZE / 2} fill="url(#ambient-glow)" />

        {/* Concentric guide rings — faint */}
        {[70, 140, 215].map((r) => (
          <circle
            key={r}
            cx={CENTER}
            cy={CENTER}
            r={r}
            fill="none"
            stroke="rgba(76, 165, 10, 0.06)"
            strokeWidth={1}
            strokeDasharray="2 4"
          />
        ))}

        {/* Perimeter (faint dashed lines connecting adjacent nodes) */}
        {nodes.map((n, i) => {
          const a = pos(n.angle);
          const next = nodes[(i + 1) % nodes.length];
          const b = pos(next.angle);
          return (
            <line
              key={`edge-${i}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="rgba(76, 165, 10, 0.16)"
              strokeWidth={1}
              strokeDasharray="2 5"
            />
          );
        })}

        {/* Spokes (center → each node) with traveling pulses */}
        {nodes.map((n, i) => {
          const p = pos(n.angle);
          // Stagger pulse timings across 4 buckets so it never feels synchronized
          const dur = 2.4 + (i % 4) * 0.35;
          const delay = (i * 0.32).toFixed(2);
          return (
            <g key={`spoke-${n.codename}`}>
              <line
                x1={CENTER}
                y1={CENTER}
                x2={p.x}
                y2={p.y}
                stroke="rgba(76, 165, 10, 0.2)"
                strokeWidth={1}
              />
              {/* Outbound pulse — core to node */}
              <circle r="3.5" fill="#4ca50a" opacity="0">
                <animateMotion
                  dur={`${dur}s`}
                  repeatCount="indefinite"
                  begin={`${delay}s`}
                  path={`M${CENTER},${CENTER} L${p.x},${p.y}`}
                />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  keyTimes="0;0.15;0.85;1"
                  dur={`${dur}s`}
                  repeatCount="indefinite"
                  begin={`${delay}s`}
                />
              </circle>
              {/* Inbound pulse — node to core (offset half cycle) */}
              <circle r="2.5" fill="#2e7f06" opacity="0">
                <animateMotion
                  dur={`${dur + 0.3}s`}
                  repeatCount="indefinite"
                  begin={`${(parseFloat(delay) + dur / 2).toFixed(2)}s`}
                  path={`M${p.x},${p.y} L${CENTER},${CENTER}`}
                />
                <animate
                  attributeName="opacity"
                  values="0;0.8;0.8;0"
                  keyTimes="0;0.15;0.85;1"
                  dur={`${dur + 0.3}s`}
                  repeatCount="indefinite"
                  begin={`${(parseFloat(delay) + dur / 2).toFixed(2)}s`}
                />
              </circle>
            </g>
          );
        })}

        {/* Core glow halo */}
        <circle cx={CENTER} cy={CENTER} r={100} fill="url(#core-glow)" />
      </svg>

      {/* Central core — the engine */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-brand-bright/40 bg-gradient-to-br from-[#1c5102] via-[#2e7f06] to-[#266604] shadow-[0_0_50px_rgba(46,127,6,0.45)] sm:h-16 sm:w-16 sm:rounded-2xl md:h-20 md:w-20">
          {/* Pulsing ring around the core */}
          <span className="absolute inset-0 rounded-xl border border-brand-bright/40 animate-ping-slow sm:rounded-2xl" />
          <span className="font-mono text-[8px] font-bold uppercase tracking-[0.22em] text-white sm:text-[10px] md:text-[11px]">
            SPS
          </span>
          {/* Live dot */}
          <span className="absolute -bottom-1 -right-1 flex h-2.5 w-2.5 sm:h-3 sm:w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-bright opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full border border-black bg-brand-bright sm:h-3 sm:w-3" />
          </span>
        </div>
      </div>

      {/* Agent nodes */}
      {nodes.map((n) => {
        const p = pos(n.angle);
        // Label position: above for top half (angles 180–330), below for bottom half (0–150)
        const isUpper = n.angle >= 180 && n.angle <= 330;
        return (
          <div
            key={n.codename}
            className="absolute flex flex-col items-center"
            style={{
              left: `${(p.x / SIZE) * 100}%`,
              top: `${(p.y / SIZE) * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {isUpper && (
              <p className="mb-1 font-mono text-[7px] font-bold uppercase tracking-[0.18em] text-ink-dim/80 sm:mb-2 sm:text-[9px] md:text-[10px] md:tracking-[0.2em]">
                {n.codename}
              </p>
            )}
            <div
              className={`group relative flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-gradient-to-br ${n.gradient} shadow-[0_0_18px_rgba(46,127,6,0.18)] transition-transform duration-500 hover:scale-110 sm:h-10 sm:w-10 sm:rounded-lg md:h-12 md:w-12 md:rounded-xl`}
            >
              <span className="text-[11px] font-bold text-white/90 sm:text-base md:text-lg">{n.glyph}</span>
              {/* Live dot */}
              <span className="absolute -bottom-0.5 -right-0.5 flex h-1.5 w-1.5 sm:h-2 sm:w-2 md:-bottom-1 md:-right-1 md:h-2.5 md:w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-bright opacity-75" />
                <span className="relative inline-flex h-full w-full rounded-full border border-black bg-brand-bright" />
              </span>
            </div>
            {!isUpper && (
              <p className="mt-1 font-mono text-[7px] font-bold uppercase tracking-[0.18em] text-ink-dim/80 sm:mt-2 sm:text-[9px] md:text-[10px] md:tracking-[0.2em]">
                {n.codename}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
