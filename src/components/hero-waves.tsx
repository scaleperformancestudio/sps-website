"use client";

/**
 * Animated flowing wave strokes inspired by the SPS logo's dual-wave motif.
 * Lives BEHIND hero content — pointer-events disabled.
 * Animations are defined inline via <style jsx> so they don't depend on the
 * Tailwind JIT picking up fresh config on dev-server restart.
 *
 * Three SVG path layers translate horizontally at different speeds + vertical drift,
 * producing continuous ambient motion. Opacity capped so content overlay stays legible.
 */

export function HeroWaves() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Ambient radial tint */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(46,127,6,0.10)_0%,rgba(28,81,2,0.04)_45%,rgba(0,0,0,0)_75%)]" />

        {/* ── Wave 1 — slow, largest amplitude, brightest ── */}
        <div className="hero-wave-drift-a absolute inset-x-0 top-[4%] h-[52%]">
          <svg
            className="hero-wave-flow-slow block h-full w-[200%]"
            viewBox="0 0 2400 400"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="sps-wave-a" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2e7f06" stopOpacity="0" />
                <stop offset="12%" stopColor="#2e7f06" stopOpacity="1" />
                <stop offset="50%" stopColor="#2e7f06" stopOpacity="1" />
                <stop offset="88%" stopColor="#266604" stopOpacity="1" />
                <stop offset="100%" stopColor="#266604" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Seamless repeating wave — 2 full identical cycles so translateX(-50%) loops cleanly */}
            <path
              d="M0,200 C200,80 400,320 600,200 C800,80 1000,320 1200,200 C1400,80 1600,320 1800,200 C2000,80 2200,320 2400,200"
              stroke="url(#sps-wave-a)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              opacity="0.9"
            />
            {/* Glow echo */}
            <path
              d="M0,200 C200,80 400,320 600,200 C800,80 1000,320 1200,200 C1400,80 1600,320 1800,200 C2000,80 2200,320 2400,200"
              stroke="url(#sps-wave-a)"
              strokeWidth="18"
              fill="none"
              strokeLinecap="round"
              opacity="0.35"
              style={{ filter: "blur(14px)" }}
            />
          </svg>
        </div>

        {/* ── Wave 2 — faster, opposite phase, mid green ── */}
        <div className="hero-wave-drift-b absolute inset-x-0 top-[10%] h-[44%]">
          <svg
            className="hero-wave-flow-fast block h-full w-[200%]"
            viewBox="0 0 2400 400"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="sps-wave-b" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1c5102" stopOpacity="0" />
                <stop offset="15%" stopColor="#266604" stopOpacity="1" />
                <stop offset="50%" stopColor="#2e7f06" stopOpacity="1" />
                <stop offset="85%" stopColor="#266604" stopOpacity="1" />
                <stop offset="100%" stopColor="#1c5102" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Wave with peaks where wave 1 has troughs (phase-inverted) */}
            <path
              d="M0,200 C200,320 400,80 600,200 C800,320 1000,80 1200,200 C1400,320 1600,80 1800,200 C2000,320 2200,80 2400,200"
              stroke="url(#sps-wave-b)"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              opacity="0.85"
            />
            <path
              d="M0,200 C200,320 400,80 600,200 C800,320 1000,80 1200,200 C1400,320 1600,80 1800,200 C2000,320 2200,80 2400,200"
              stroke="url(#sps-wave-b)"
              strokeWidth="14"
              fill="none"
              strokeLinecap="round"
              opacity="0.3"
              style={{ filter: "blur(10px)" }}
            />
          </svg>
        </div>

        {/* ── Wave 3 — thin, very slow, subtle third layer for depth ── */}
        <div className="hero-wave-drift-a absolute inset-x-0 top-[20%] h-[28%]">
          <svg
            className="hero-wave-flow-slower block h-full w-[300%]"
            viewBox="0 0 3600 400"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="sps-wave-c" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2e7f06" stopOpacity="0" />
                <stop offset="20%" stopColor="#2e7f06" stopOpacity="0.7" />
                <stop offset="80%" stopColor="#266604" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#266604" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0,200 C300,130 600,270 900,200 C1200,130 1500,270 1800,200 C2100,130 2400,270 2700,200 C3000,130 3300,270 3600,200"
              stroke="url(#sps-wave-c)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Overall opacity cap — keep content readable */}
        <div className="pointer-events-none absolute inset-0 bg-black/0" />

        {/* Top & bottom fades blend waves into page */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/70 to-transparent" />
      </div>

      {/* Keyframes inlined — independent of Tailwind config compilation */}
      <style jsx global>{`
        @keyframes sps-hero-wave-flow-slow {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        @keyframes sps-hero-wave-flow-fast {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        @keyframes sps-hero-wave-flow-slower {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-33.333%, 0, 0);
          }
        }
        @keyframes sps-hero-wave-drift-a {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, -18px, 0);
          }
        }
        @keyframes sps-hero-wave-drift-b {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, 14px, 0);
          }
        }

        .hero-wave-flow-slow {
          animation: sps-hero-wave-flow-slow 26s linear infinite;
          will-change: transform;
          opacity: 0.15;
        }
        .hero-wave-flow-fast {
          animation: sps-hero-wave-flow-fast 16s linear infinite;
          will-change: transform;
          opacity: 0.14;
        }
        .hero-wave-flow-slower {
          animation: sps-hero-wave-flow-slower 44s linear infinite;
          will-change: transform;
          opacity: 0.1;
        }
        .hero-wave-drift-a {
          animation: sps-hero-wave-drift-a 11s ease-in-out infinite;
          will-change: transform;
        }
        .hero-wave-drift-b {
          animation: sps-hero-wave-drift-b 9s ease-in-out infinite;
          animation-delay: -3s;
          will-change: transform;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-wave-flow-slow,
          .hero-wave-flow-fast,
          .hero-wave-flow-slower,
          .hero-wave-drift-a,
          .hero-wave-drift-b {
            animation: none;
          }
        }
      `}</style>
    </>
  );
}
