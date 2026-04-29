/**
 * SPS Pricing — Canonical Single Source of Truth
 *
 * This file is the ONE place that defines every SPS price, format, credit cost,
 * top-up, add-on, and media-buying tier. Every consumer (sps-website, sps-dashboard,
 * PDF generator, rubric generator, future billing logic) imports from here.
 *
 * Thin adapter files live at:
 *   - sps-website/src/lib/pricing.ts    (derives display strings for the Next.js pricing page)
 *   - sps-dashboard/src/lib/packages.ts (derives dashboard shape + DB types for credits logic)
 *
 * Rules of engagement:
 *   1. NEVER hardcode a price, credit count, or format anywhere else in the codebase.
 *   2. When you change pricing, update this file → run `npm run build:docs` in sps-website
 *      → commit → both projects auto-pick up the change on next build.
 *   3. Values are numeric where they represent amounts (priceEuros, credits) so both
 *      display (website) and math (dashboard billing) consumers work without parsing.
 */

/* ───────────── Keys & enums ───────────── */

export const PACKAGE_KEYS = ["trial", "launch", "growth", "scale", "elite"] as const;
export type PackageKey = (typeof PACKAGE_KEYS)[number];

/**
 * Format keys drive both display (website) and billing (dashboard).
 * Adding a new video format? Add it here, update the formats array below,
 * and it flows through everywhere.
 */
export const FORMAT_KEYS = [
  "static",
  "product_shot",
  "voice_of_customer",
  "mini_commercial",
  "brand_story",
  "premium_cinematic",
] as const;
export type FormatKey = (typeof FORMAT_KEYS)[number];

export const ADDON_KEYS = [
  "voice_over",
  "custom_music",
  "cinematic_color_grade",
  "platform_resize",
] as const;
export type AddonKey = (typeof ADDON_KEYS)[number];

export const COPY_KEYS = ["ad_copy", "ad_copy_pack"] as const;
export type CopyKey = (typeof COPY_KEYS)[number];

export const BILLING_CYCLES = ["one_time", "monthly"] as const;
export type BillingCycle = (typeof BILLING_CYCLES)[number];

/* ───────────── Tier accent palette (metal progression) ───────────── */

export const TIER_ACCENTS = {
  steel: "#8a8a8a",
  bronze: "#cd7f32",
  silver: "#b8c0c8",
  gold: "#d4af37",
  platinum: "#e8e6dc",
} as const;

/* ───────────── Packages ───────────── */

export interface Package {
  key: PackageKey;
  name: string;
  tagline: string;
  credits: number;
  priceEuros: number;
  billingCycle: BillingCycle;
  turnaround: string;
  performanceReview: string | null;
  /** Additional human features listed on both website + dashboard */
  features: string[];
  cta: string;
  popular: boolean;
  accent: string;
  includesResearch: boolean;
  accessToFounder: boolean;
}

export const packages: Package[] = [
  {
    key: "trial",
    name: "Trial",
    tagline: "Entry point to experience our creative production.",
    credits: 10,
    priceEuros: 30,
    billingCycle: "one_time",
    turnaround: "48h",
    performanceReview: null,
    features: [
      "~20 statics or ~3 UGC videos",
      "Research included",
      "48h turnaround",
      "1 revision per creative",
    ],
    cta: "Start trial",
    popular: false,
    accent: TIER_ACCENTS.steel,
    includesResearch: true,
    accessToFounder: false,
  },
  {
    key: "launch",
    name: "Launch",
    tagline: "For brands beginning their creative testing journey.",
    credits: 30,
    priceEuros: 150,
    billingCycle: "monthly",
    turnaround: "48h",
    performanceReview: null,
    features: [
      "~60 statics or ~10 UGC videos",
      "Research included",
      "48h turnaround",
      "1 revision per creative",
    ],
    cta: "Get started",
    popular: false,
    accent: TIER_ACCENTS.bronze,
    includesResearch: true,
    accessToFounder: false,
  },
  {
    key: "growth",
    name: "Growth",
    tagline: "Optimized for consistent testing and scaling.",
    credits: 80,
    priceEuros: 350,
    billingCycle: "monthly",
    turnaround: "24–48h",
    performanceReview: "Monthly",
    features: [
      "~160 statics or ~16 mini commercials",
      "Research included",
      "24–48h turnaround",
      "Monthly performance review",
      "1 revision per creative",
    ],
    cta: "Get started",
    popular: true,
    accent: TIER_ACCENTS.silver,
    includesResearch: true,
    accessToFounder: false,
  },
  {
    key: "scale",
    name: "Scale",
    tagline: "For aggressive testing and rapid iteration.",
    credits: 200,
    priceEuros: 750,
    billingCycle: "monthly",
    turnaround: "24h",
    performanceReview: "Bi-weekly",
    features: [
      "~400 statics or ~40 mini commercials",
      "Research included",
      "24h turnaround",
      "Bi-weekly performance review",
    ],
    cta: "Get started",
    popular: false,
    accent: TIER_ACCENTS.gold,
    includesResearch: true,
    accessToFounder: false,
  },
  {
    key: "elite",
    name: "Elite",
    tagline: "Maximum output for scaling brands.",
    credits: 500,
    priceEuros: 1500,
    billingCycle: "monthly",
    turnaround: "Same-day",
    performanceReview: "Weekly",
    features: [
      "~1000 statics or ~62 brand stories",
      "Research included",
      "Same-day turnaround",
      "Weekly performance review",
      "Access to the founder",
    ],
    cta: "Get started",
    popular: false,
    accent: TIER_ACCENTS.platinum,
    includesResearch: true,
    accessToFounder: true,
  },
];

/* ───────────── Creative formats (credits are numeric, not strings!) ───────────── */

export interface CreativeFormat {
  key: FormatKey;
  label: string;
  description: string;
  credits: number;
  category: "static" | "video";
}

export const formats: CreativeFormat[] = [
  {
    key: "static",
    label: "Static image ad",
    description: "A single image ad ready for Meta or TikTok.",
    credits: 0.5,
    category: "static",
  },
  {
    key: "product_shot",
    label: "Product shot",
    description: "Your product in motion — zoom, turn, subtle animation. One scene.",
    credits: 2,
    category: "video",
  },
  {
    key: "voice_of_customer",
    label: "Voice-of-customer",
    description: "Someone on camera talking about your product — UGC testimonial style.",
    credits: 3,
    category: "video",
  },
  {
    key: "mini_commercial",
    label: "Mini commercial",
    description: "Short ad with 2–4 scenes: product in use, reaction shots, call-to-action.",
    credits: 5,
    category: "video",
  },
  {
    key: "brand_story",
    label: "Brand story",
    description: "Full narrative ad — people, locations, product moments, music, transitions.",
    credits: 8,
    category: "video",
  },
  {
    key: "premium_cinematic",
    label: "Premium cinematic",
    description: "Top-tier production with complex camera moves, VFX and multi-scene storytelling.",
    credits: 12,
    category: "video",
  },
];

/* ───────────── Add-ons (layered on top of a video format) ───────────── */

export interface Addon {
  key: AddonKey;
  label: string;
  description: string;
  /** Credits added ON TOP of the base format credits. */
  creditsAdded: number;
}

export const addons: Addon[] = [
  {
    key: "voice_over",
    label: "Voice-over",
    description: "A person narrating the video.",
    creditsAdded: 1,
  },
  {
    key: "custom_music",
    label: "Custom music / sound design",
    description: "Licensed track or bespoke SFX.",
    creditsAdded: 0.5,
  },
  {
    key: "cinematic_color_grade",
    label: "Cinematic color grade",
    description: "Film-grade color treatment.",
    creditsAdded: 0.5,
  },
  {
    key: "platform_resize",
    label: "Extra platform resize",
    description: "Adapt an existing ad to an additional 9:16, 1:1 or 16:9 format.",
    creditsAdded: 0.25,
  },
];

/* ───────────── Ad copy deliverables (standalone or stacked with any creative) ───────────── */

export interface CopyDeliverable {
  key: CopyKey;
  label: string;
  description: string;
  credits: number;
  /** Number of distinct copy variants (hook + body + CTA sets) produced. */
  variants: number;
}

export const copyDeliverables: CopyDeliverable[] = [
  {
    key: "ad_copy",
    label: "Ad copy",
    description:
      "One research-backed ad copy set: hook + primary text + CTA. Can be ordered standalone or stacked with any static or video.",
    credits: 0.1,
    variants: 1,
  },
  {
    key: "ad_copy_pack",
    label: "Ad copy pack (5 variants)",
    description:
      "Five copy variants for A/B testing: different hooks, angles, or value propositions against the same visual.",
    credits: 0.25,
    variants: 5,
  },
];

/* ───────────── Iteration rules ───────────── */

export const iteration = {
  winnerVideoMultiplier: 0.5, // 50% of original video credits
  winnerStaticCredits: 0.25, // 50% of a static's 0.5 credit cost
  extraRevisionStaticCredits: 0.25,
  extraRevisionVideoMultiplier: 0.5,
} as const;

/* ───────────── Top-up credit packs ───────────── */

export interface TopUp {
  credits: number;
  priceEuros: number;
  accent: string;
}

export const topUps: TopUp[] = [
  { credits: 10, priceEuros: 40, accent: TIER_ACCENTS.steel },
  { credits: 25, priceEuros: 90, accent: TIER_ACCENTS.bronze },
  { credits: 50, priceEuros: 170, accent: TIER_ACCENTS.silver },
  { credits: 100, priceEuros: 320, accent: TIER_ACCENTS.gold },
  { credits: 200, priceEuros: 600, accent: TIER_ACCENTS.platinum },
];

/* ───────────── Fixed-price add-on services (euros, not credits) ───────────── */

export interface PaidAddOn {
  key: string;
  name: string;
  priceLabel: string;
  description: string;
}

export const paidAddOns: PaidAddOn[] = [
  {
    key: "brand_kit_setup",
    name: "Brand kit setup",
    priceLabel: "€150 one-time",
    description: "Brand kit with colors, fonts, logo, and templates.",
  },
  {
    key: "competitor_analysis",
    name: "Competitor analysis",
    priceLabel: "€100",
    description: "In-depth competitor ad strategy analysis.",
  },
  {
    key: "extra_revision",
    name: "Extra revision",
    priceLabel: "0.5 cr / 50% video",
    description: "Additional revision round beyond the one included.",
  },
  {
    key: "platform_resize_standalone",
    name: "Platform resize",
    priceLabel: "0.25 credits",
    description: "Resize existing creative to an additional platform format.",
  },
  {
    key: "performance_report",
    name: "Performance report",
    priceLabel: "From Growth",
    description: "Creative performance analysis report.",
  },
];

/* ───────────── Media buying (spend-based fees) ───────────── */

export interface MediaBuyingTier {
  minSpend: number;
  maxSpend: number | null;
  spendLabel: string;
  feeType: "fixed" | "percentage";
  feeEuros?: number;
  feePercent?: number;
  feeLabel: string;
}

export const mediaBuyingTiers: MediaBuyingTier[] = [
  {
    minSpend: 15000,
    maxSpend: 30000,
    spendLabel: "€15k – €30k / month",
    feeType: "fixed",
    feeEuros: 1000,
    feeLabel: "€1,000 / month",
  },
  {
    minSpend: 30000,
    maxSpend: 75000,
    spendLabel: "€30k – €75k / month",
    feeType: "percentage",
    feePercent: 4,
    feeLabel: "4% of ad spend",
  },
  {
    minSpend: 75000,
    maxSpend: null,
    spendLabel: "€75k+ / month",
    feeType: "percentage",
    feePercent: 3,
    feeLabel: "3% of ad spend",
  },
];

export const mediaBuyingMinSpendEuros = 15000;

export const mediaBuyingIncludes: string[] = [
  "Campaign setup and account structure",
  "Daily monitoring and optimization",
  "Scaling strategies based on performance data",
  "Creative testing framework integration",
  "Data feedback loop into creative production",
];

export const mediaBuyingRequirements = [
  { label: "Min. ad spend", value: "€500/day (€15k/month)" },
  { label: "Stable budget", value: "No frequent pausing" },
  { label: "Creative production", value: "Must use our system" },
  { label: "Account access", value: "Ad accounts & tracking" },
] as const;

/* ───────────── FAQ ───────────── */

export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  {
    q: "How do credits work?",
    a: "Every creative asset costs a number of credits based on the format. A static image ad is 1 credit; video ads range from 2 credits for a simple product shot up to 12 credits for a premium cinematic ad. You pick a monthly package and redeem credits across any formats you need. Re-hooking a winner — a new version of an already-performing ad with a different hook — costs only 50% of the original. That's how compounding happens month over month.",
  },
  {
    q: "Do unused credits roll over?",
    a: "Credits are valid for 60 days from the date of purchase. Unused credits after 60 days expire and are non-refundable — this keeps our production pipeline predictable. Most clients run out of credits before the window closes.",
  },
  {
    q: "Can I change plans or cancel?",
    a: "Yes. You can upgrade, downgrade, or cancel at any time. There are no long-term contracts. When you upgrade mid-cycle, the difference is prorated. Downgrades take effect at the next billing cycle.",
  },
  {
    q: "Are revisions included?",
    a: "Yes — one revision round per creative is included in every package. If you need more, additional revisions cost 0.5 credits per static or 50% of the original video's credit cost.",
  },
  {
    q: "Can I buy extra credits mid-month?",
    a: "Yes. Top-up packs are available in 10, 25, 50, 100, and 200 credit bundles. Top-ups are added to your account instantly and follow the same 60-day validity rule.",
  },
  {
    q: "Is media buying included in these packages?",
    a: "No — media buying is a separate service. These packages cover creative production only. If you want SPS to run your paid media as well, see the media buying section below. Media buying requires a minimum of €500/day in ad spend (€15k/month).",
  },
  {
    q: "What if I need more than 500 credits per month?",
    a: "Volume above Elite is handled as a custom engagement. Get in touch and we'll build a package around your production volume, turnaround, and strategist needs.",
  },
];

/* ───────────── Helpers ───────────── */

export const formatEuros = (n: number): string =>
  "€" + n.toLocaleString("en-US");

export const getPackageByKey = (key: PackageKey): Package | undefined =>
  packages.find((p) => p.key === key);

export const getFormatByKey = (key: FormatKey): CreativeFormat | undefined =>
  formats.find((f) => f.key === key);

export const getAddonByKey = (key: AddonKey): Addon | undefined =>
  addons.find((a) => a.key === key);

export const getCopyByKey = (key: CopyKey): CopyDeliverable | undefined =>
  copyDeliverables.find((c) => c.key === key);
