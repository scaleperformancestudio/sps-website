"use client";

import Image from "next/image";

/**
 * Horizontal scrolling marquee of ad creatives with performance metrics.
 * Ecomflows-style "Where design meets performance" section, reskinned in SPS brand.
 * Uses the existing creative PNGs (product shot, lifestyle, before/after, UGC, infographic, v1 variants)
 * cycled with varied metrics so each card reads as a distinct winner.
 */

interface CreativeCard {
  image: string;
  brand: string;
  category: string;
  metric: string;
  metricLabel: string;
}

const cards: CreativeCard[] = [
  { image: "/creatives/product-shot.png", brand: "VELORA", category: "Wellness", metric: "+32%", metricLabel: "Click Rate" },
  { image: "/creatives/before-after.png", brand: "NORTHMADE", category: "Skincare", metric: "+4.2x", metricLabel: "ROAS" },
  { image: "/creatives/lifestyle.png", brand: "Prima", category: "Apparel", metric: "+21%", metricLabel: "Revenue Growth" },
  { image: "/creatives/infographic.png", brand: "VELORA", category: "Supplements", metric: "+45%", metricLabel: "Click Rate" },
  { image: "/creatives/ugc-selfie.png", brand: "HELIX", category: "Beauty", metric: "+28%", metricLabel: "Email-driven Rev." },
  { image: "/creatives/product-shot-v1.png", brand: "TERRA", category: "Home & Living", metric: "+19%", metricLabel: "Revenue Growth" },
  { image: "/creatives/infographic-v1.png", brand: "HALO", category: "Wellness", metric: "+37%", metricLabel: "Click Rate" },
  { image: "/creatives/before-after.png", brand: "MAVEN", category: "Grooming", metric: "+3.8x", metricLabel: "ROAS" },
  { image: "/creatives/lifestyle.png", brand: "axis.", category: "Fashion", metric: "+26%", metricLabel: "Revenue Growth" },
  { image: "/creatives/ugc-selfie.png", brand: "STRATA", category: "Fitness", metric: "+41%", metricLabel: "Click Rate" },
  { image: "/creatives/product-shot.png", brand: "orbit.", category: "Tech", metric: "+23%", metricLabel: "Revenue Growth" },
  { image: "/creatives/infographic.png", brand: "FORM+CO", category: "Supplements", metric: "+5.1x", metricLabel: "ROAS" },
];

export function CreativeMarquee() {
  // Double the cards for seamless infinite scroll
  const doubled = [...cards, ...cards];

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-bright/[0.04] blur-[120px]" />
      </div>

      {/* Heading */}
      <div className="container-content relative mb-14 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-bright">
          Performance creative
        </p>
        <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-bold tracking-tight text-ink md:text-5xl">
          Where creative meets{" "}
          <span className="bg-gradient-to-r from-[#4ca50a] via-[#2e7f06] to-[#266604] bg-clip-text font-serif font-normal italic text-transparent">
            performance
          </span>
          .
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-ink-dim">
          A selection of recent winners produced inside our engine — each one scored, iterated, and scaled against real performance data.
        </p>
      </div>

      {/* Marquee */}
      <div className="relative">
        {/* Edge fades */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-black to-transparent md:w-48" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-black to-transparent md:w-48" />

        <div className="animate-marquee flex gap-5">
          {doubled.map((card, i) => (
            <CreativeCardItem key={i} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CreativeCardItem({ card }: { card: CreativeCard }) {
  return (
    <div className="group relative w-[240px] shrink-0 md:w-[280px]">
      {/* Card */}
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0d0d0d] transition-all duration-500 hover:border-brand-bright/30 hover:shadow-[0_0_40px_rgba(46,127,6,0.12)]">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={card.image}
            alt={`${card.brand} — ${card.category}`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 240px, 280px"
          />
          {/* Subtle vignette */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>

        {/* Info row */}
        <div className="flex items-center justify-between gap-3 px-4 py-4">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-ink">{card.brand}</p>
            <p className="truncate text-xs text-ink-dim/60">{card.category}</p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-sm font-bold text-brand-bright">{card.metric}</p>
            <p className="text-[10px] uppercase tracking-wider text-ink-dim/60">
              {card.metricLabel}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
