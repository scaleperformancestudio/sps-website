"use client";

/**
 * Infinite scrolling logo marquee with varied brand wordmark styles.
 * Fictional ecommerce brand placeholders — each uses distinct typography so the row
 * reads as a collection of different logos rather than the same text repeated.
 * Replace with real client SVG logos when available.
 */

interface Brand {
  name: string;
  className: string;
  prefix?: string;
  suffix?: string;
}

const brands: Brand[] = [
  { name: "NORTHMADE", className: "text-lg font-bold tracking-[0.28em]" },
  { name: "axis.", className: "text-3xl font-bold italic tracking-tight" },
  { prefix: "◆ ", name: "LUNA", className: "text-sm font-light tracking-[0.45em]" },
  { name: "FORM+CO", className: "text-2xl font-black tracking-tight" },
  { name: "Prima", className: "text-3xl font-serif italic" },
  { name: "HELIX", className: "text-lg font-black tracking-[0.18em]", suffix: " ●" },
  { name: "TERRA GOODS", className: "text-xs font-bold uppercase tracking-[0.35em]" },
  { name: "Velora", className: "text-3xl font-serif italic" },
  { prefix: "✦ ", name: "HALO", className: "text-xs font-thin tracking-[0.55em] uppercase" },
  { name: "STRATA", className: "text-xl font-black tracking-tight" },
  { name: "orbit.", className: "text-2xl font-semibold tracking-tight" },
  { name: "MAVEN", className: "text-lg font-extrabold tracking-[0.32em]" },
];

export function LogoMarquee() {
  // Double the brands for seamless infinite scroll
  const doubled = [...brands, ...brands];

  return (
    <div className="relative overflow-hidden py-8">
      {/* Left fade */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-black to-transparent" />
      {/* Right fade */}
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-black to-transparent" />

      <div className="animate-marquee flex items-center gap-16">
        {doubled.map((brand, i) => (
          <div
            key={i}
            className="flex h-12 shrink-0 items-center"
          >
            <span
              className={`whitespace-nowrap text-ink-dim/45 transition-colors duration-300 hover:text-ink-dim/75 ${brand.className}`}
            >
              {brand.prefix}
              {brand.name}
              {brand.suffix}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
