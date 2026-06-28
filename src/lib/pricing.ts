/**
 * Website pricing adapter.
 *
 * This file is a THIN ADAPTER that reads the canonical pricing data from
 * ../../../shared/pricing.ts and formats it into display-ready shapes for
 * the Next.js pricing page.
 *
 * DO NOT edit pricing values here. Edit them in:
 *     /SPS AI Creative Engine/shared/pricing.ts
 *
 * Then run `npm run build:docs` (from sps-website root) to regenerate
 * the PDFs and the pricing-rubric.md.
 */

import {
  packages as rawPackages,
  formats,
  addons,
  copyDeliverables,
  iteration,
  topUps as rawTopUps,
  paidAddOns,
  mediaBuyingTiers as rawMediaBuyingTiers,
  mediaBuyingIncludes,
  mediaBuyingRequirements,
  faqs as rawFaqs,
  TIER_ACCENTS as SHARED_TIER_ACCENTS,
  formatEuros,
  type Package,
  type CreativeFormat,
  type Addon,
  type CopyDeliverable,
} from "./shared-pricing";

/* Re-export the tier accent palette so the page can use it directly. */
export const TIER_ACCENTS = SHARED_TIER_ACCENTS;

/* ───────────── Display shapes (what the page consumes) ───────────── */

export interface PackageTier {
  name: string;
  tagline: string;
  credits: string;
  price: string;
  priceLabel: string;
  features: string[];
  cta: string;
  /** Optional CTA target. Defaults to "/start" in PackageCard; external http(s) URLs open in a new tab. */
  ctaHref?: string;
  popular?: boolean;
  accent: string;
}

export interface CreditRow {
  label: string;
  desc: string;
  credits: string;
}

export interface CreditSection {
  title: string;
  items: CreditRow[];
}

export interface TopUp {
  credits: string;
  price: string;
  accent: string;
}

export interface AddOn {
  name: string;
  price: string;
  description: string;
}

export interface MediaBuyingTier {
  spend: string;
  fee: string;
}

export interface ComparisonRow {
  label: string;
  values: (string | boolean)[];
}

export type Faq = { q: string; a: string };

/* ───────────── Derived (display-formatted) data ───────────── */

/** Format credits value for display (e.g. 1 → "1 credit", 2 → "2 credits", 0.5 → "0.5 credits"). */
const creditsLabel = (n: number, prefix = ""): string =>
  `${prefix}${n} credit${n === 1 ? "" : "s"}`;

export const packages: PackageTier[] = rawPackages.map((p: Package) => ({
  name: p.name,
  tagline: p.tagline,
  credits:
    p.billingCycle === "one_time"
      ? `${p.credits} Credits`
      : `${p.credits} Credits / mo`,
  price: formatEuros(p.priceEuros),
  priceLabel: p.billingCycle === "one_time" ? "one-time" : "per month",
  features: p.features,
  cta: p.cta,
  popular: p.popular,
  accent: p.accent,
}));

// ── Website redesign packages (fixed-price) ──
export const websitePackages: PackageTier[] = [
  {
    name: "Launch",
    tagline: "Snel online en makkelijk bereikbaar — klaar in een week.",
    credits: "Eenmalig project",
    price: "€375",
    priceLabel: "vast bedrag",
    features: [
      "Werkt vlekkeloos op mobiel — waar de meeste klanten kijken",
      "Klanten boeken, reserveren of bellen je direct vanaf de site",
      "Telefoon, adres en openingstijden meteen in beeld",
      "Goed vindbaar in Google, zodat mensen jouw zaak vinden",
      "Snel geladen en professioneel — klaar in ~7 dagen",
    ],
    cta: "Vraag een gratis audit aan",
    ctaHref:
      "https://wa.me/31611727850?text=Hi%20SPS%2C%20ik%20wil%20graag%20een%20gratis%20website-audit%20voor%20mijn%20zaak.",
    popular: false,
    accent: "#2e7f06",
  },
  {
    name: "Studio",
    tagline: "Je complete uitstraling, fris en professioneel.",
    credits: "Eenmalig project",
    price: "€750",
    priceLabel: "vast bedrag",
    features: [
      "Alles uit Launch",
      "Frisse uitstraling: logo, kleuren en stijl die bij je passen",
      "Meerdere pagina's — aanbod, over jou, contact en meer",
      "Klantreviews prominent in beeld, voor extra vertrouwen",
      "Wervende teksten die bezoekers omzetten in klanten",
    ],
    cta: "Plan een kennismaking",
    ctaHref:
      "https://wa.me/31611727850?text=Hi%20SPS%2C%20ik%20heb%20interesse%20in%20het%20Studio-pakket.%20Kunnen%20we%20kennismaken%3F",
    popular: true,
    accent: "#2e7f06",
  },
  {
    name: "Care",
    tagline: "Wij houden je site snel, veilig en up-to-date.",
    credits: "Doorlopend",
    price: "€50",
    priceLabel: "per maand",
    features: [
      "Snelle, veilige hosting — altijd online",
      "Updates en back-ups, automatisch geregeld",
      "Tekst, foto's of openingstijden wijzigen? Wij doen het",
      "Snel geholpen als er iets moet gebeuren",
    ],
    cta: "Voeg toe aan je site",
    ctaHref:
      "https://wa.me/31611727850?text=Hi%20SPS%2C%20ik%20heb%20interesse%20in%20het%20Care-onderhoudspakket.",
    popular: false,
    accent: "#266604",
  },
];

// ── Social media management packages (monthly) ──
export const socialPackages: PackageTier[] = [
  {
    name: "Starter",
    tagline: "Consistente content die je merk laat groeien.",
    credits: "Content & beheer",
    price: "€495",
    priceLabel: "per maand",
    features: [
      "12 posts per maand",
      "2 kanalen naar keuze",
      "Maandelijks contentplan",
      "Captions & hashtags",
      "Maandrapport",
    ],
    cta: "Plan een kennismaking",
    ctaHref:
      "https://wa.me/31611727850?text=Hi%20SPS%2C%20ik%20heb%20interesse%20in%20het%20Starter%20social-pakket.%20Kunnen%20we%20kennismaken%3F",
    popular: false,
    accent: "#266604",
  },
  {
    name: "Growth",
    tagline: "Meer volume, reels en strategie — voor échte groei.",
    credits: "Content & beheer",
    price: "€995",
    priceLabel: "per maand",
    features: [
      "20 posts per maand, incl. reels",
      "3 kanalen",
      "Contentplan + community-management",
      "Maandelijkse strategiecall",
      "Maandrapport",
    ],
    cta: "Plan een kennismaking",
    ctaHref:
      "https://wa.me/31611727850?text=Hi%20SPS%2C%20ik%20heb%20interesse%20in%20het%20Growth%20social-pakket.%20Kunnen%20we%20kennismaken%3F",
    popular: true,
    accent: "#2e7f06",
  },
  {
    name: "Performance",
    tagline: "Premium content + UGC-video + ad-creatives.",
    credits: "Content & beheer",
    price: "€1.950",
    priceLabel: "per maand · vanaf",
    features: [
      "30+ assets per maand, incl. UGC-video",
      "Alle relevante kanalen",
      "Volledig contentplan + community",
      "Ad-creatives voor je campagnes",
      "Dedicated strateeg",
    ],
    cta: "Plan een kennismaking",
    ctaHref:
      "https://wa.me/31611727850?text=Hi%20SPS%2C%20ik%20heb%20interesse%20in%20het%20Performance%20social-pakket.%20Kunnen%20we%20kennismaken%3F",
    popular: false,
    accent: "#2e7f06",
  },
];

export const creditCostSections: CreditSection[] = [
  {
    title: "Statics",
    items: formats
      .filter((f) => f.category === "static")
      .map((f: CreativeFormat) => ({
        label: f.label,
        desc: f.description,
        credits: creditsLabel(f.credits),
      })),
  },
  {
    title: "Video formats",
    items: formats
      .filter((f) => f.category === "video")
      .map((f: CreativeFormat) => ({
        label: f.label,
        desc: f.description,
        credits: creditsLabel(f.credits),
      })),
  },
  {
    title: "Add-ons (layered on top of any video)",
    items: addons.map((a: Addon) => ({
      label: a.label,
      desc: a.description,
      credits: creditsLabel(a.creditsAdded, "+"),
    })),
  },
  {
    title: "Ad copy (standalone or stacked with any creative)",
    items: copyDeliverables.map((c: CopyDeliverable) => ({
      label: c.label,
      desc: c.description,
      credits: creditsLabel(c.credits),
    })),
  },
  {
    title: "Iteration",
    items: [
      {
        label: "Re-hook a winner",
        desc: "A new version of your best-performing ad with a different hook or angle.",
        credits: `${iteration.winnerVideoMultiplier * 100}% of original`,
      },
    ],
  },
];

export const topUps: TopUp[] = rawTopUps.map((t) => ({
  credits: String(t.credits),
  price: formatEuros(t.priceEuros),
  accent: t.accent,
}));

export const addOns: AddOn[] = paidAddOns.map((a) => ({
  name: a.name,
  price: a.priceLabel,
  description: a.description,
}));

export const mediaBuyingTiers: MediaBuyingTier[] = rawMediaBuyingTiers.map((t) => ({
  spend: t.spendLabel,
  fee: t.feeLabel,
}));

export { mediaBuyingIncludes, mediaBuyingRequirements };

/* ───────────── Package comparison table (derived from canonical package data) ───────────── */

export const comparisonRows: ComparisonRow[] = (() => {
  const pkgList = rawPackages;
  // Resolve the credit cost of each format dynamically so this table stays
  // correct if the credit-per-format values change in shared/pricing.ts.
  const creditsFor = (key: string) =>
    formats.find((f) => f.key === key)?.credits ?? 1;
  const staticCr = creditsFor("static");
  const ugcCr = creditsFor("voice_of_customer");
  const miniCr = creditsFor("mini_commercial");
  const brandCr = creditsFor("brand_story");
  return [
    {
      label: "Credits",
      values: pkgList.map((p) =>
        p.billingCycle === "one_time" ? String(p.credits) : `${p.credits}/mo`
      ),
    },
    {
      label: "Price",
      values: pkgList.map((p) =>
        p.billingCycle === "one_time"
          ? formatEuros(p.priceEuros)
          : `${formatEuros(p.priceEuros)}/mo`
      ),
    },
    { label: "Research included", values: pkgList.map((p) => p.includesResearch) },
    {
      label: "Statics (approx.)",
      values: pkgList.map((p) => String(Math.floor(p.credits / staticCr))),
    },
    {
      label: "UGC videos (approx.)",
      values: pkgList.map((p) => String(Math.floor(p.credits / ugcCr))),
    },
    {
      label: "Mini commercials (approx.)",
      values: pkgList.map((p) => String(Math.floor(p.credits / miniCr))),
    },
    {
      label: "Brand stories (approx.)",
      values: pkgList.map((p) => String(Math.floor(p.credits / brandCr))),
    },
    {
      label: "Revisions",
      values: pkgList.map(() => "1 / creative"),
    },
    { label: "Turnaround", values: pkgList.map((p) => p.turnaround) },
    {
      label: "Performance review",
      values: pkgList.map((p) => p.performanceReview ?? "—"),
    },
    {
      label: "Access to the founder",
      values: pkgList.map((p) => p.accessToFounder),
    },
  ];
})();

/* ───────────── FAQ ───────────── */

export const faqs: Faq[] = rawFaqs;

/* ───────────── Re-export canonical primitives (for scripts that want numbers) ───────────── */

export {
  formats,
  addons,
  copyDeliverables,
  iteration,
  paidAddOns,
  mediaBuyingMinSpendEuros,
  getPackageByKey,
  getFormatByKey,
  getAddonByKey,
  getCopyByKey,
  formatEuros,
  type Package,
  type CreativeFormat,
  type Addon,
  type CopyDeliverable,
  type CopyKey,
} from "./shared-pricing";
