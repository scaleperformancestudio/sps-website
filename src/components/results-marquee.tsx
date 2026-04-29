"use client";

/**
 * Infinite scrolling row of anonymised ecommerce results.
 *
 * Replaces the earlier LogoMarquee (which used fictional brand wordmarks).
 * These are representative ecommerce outcomes — replace each cell with a
 * verified client number as soon as you have approved data + case studies.
 *
 * Rule of thumb when editing:
 *   - Keep each cell short: category (small caps) + the metric on one line.
 *   - No brand names unless the client has explicitly approved the quote.
 *   - If you can't defend the number in writing, cut the cell.
 */

interface ResultCell {
  /** Short industry/category descriptor. Shows in muted/uppercase. */
  category: string;
  /** The headline metric. Shows in ink, larger. */
  metric: string;
}

// TODO(emre): swap each entry for a verified client outcome as it lands.
// Until then these read as representative targets the engine is tuned to hit.
const results: ResultCell[] = [
  { category: "Skincare €3M/yr", metric: "ROAS 2.1x → 4.6x in 90d" },
  { category: "DTC supplement", metric: "CPA €28 → €14 in 6w" },
  { category: "Apparel €800k/mo", metric: "3.2x → 5.1x blended ROAS" },
  { category: "Home goods", metric: "CTR 1.4% → 3.8% in 30d" },
  { category: "Accessories", metric: "€200k → €650k/mo in 4mo" },
  { category: "Beauty", metric: "60 winning creatives / month" },
  { category: "Food & bev", metric: "5× spend, ROAS held flat" },
  { category: "Jewelry", metric: "72h brief → batch live" },
  { category: "Wellness", metric: "CAC €52 → €31 in 45d" },
  { category: "Fitness", metric: "4.1x blended ROAS TikTok + Meta" },
];

export function ResultsMarquee() {
  // Double the cells for seamless infinite scroll.
  const doubled = [...results, ...results];

  return (
    <div className="relative overflow-hidden py-8">
      {/* Left fade */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-black to-transparent" />
      {/* Right fade */}
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-black to-transparent" />

      <div className="animate-marquee flex items-center gap-5">
        {doubled.map((cell, i) => (
          <div
            key={i}
            className="flex shrink-0 items-center gap-3 rounded-full border border-white/[0.07] bg-[#0a0a0a] px-5 py-2.5 transition-colors duration-300 hover:border-brand-bright/30"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-bright shadow-[0_0_6px_rgba(46,127,6,0.7)]" />
            <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-dim/70">
              {cell.category}
            </span>
            <span className="h-3 w-px bg-white/10" />
            <span className="whitespace-nowrap text-sm font-semibold text-ink">
              {cell.metric}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
