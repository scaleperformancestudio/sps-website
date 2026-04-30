import { z } from "zod";

export const PLATFORM_OPTIONS = [
  "Meta",
  "TikTok",
  "YouTube",
  "Pinterest",
  "Snapchat",
  "LinkedIn",
  "Google",
] as const;

export const BUSINESS_TYPES = [
  "E-commerce",
  "SaaS",
  "Service",
  "App",
  "B2B",
  "Other",
] as const;

// Creative production packages — mirrors the pricing page tiers
export const CREATIVE_PACKAGES = [
  {
    key: "trial",
    name: "Trial",
    price: "€30",
    priceLabel: "one-time",
    credits: "10 credits",
  },
  {
    key: "launch",
    name: "Launch",
    price: "€150",
    priceLabel: "/mo",
    credits: "30 credits / mo",
  },
  {
    key: "growth",
    name: "Growth",
    price: "€350",
    priceLabel: "/mo",
    credits: "80 credits / mo",
    popular: true,
  },
  {
    key: "scale",
    name: "Scale",
    price: "€750",
    priceLabel: "/mo",
    credits: "200 credits / mo",
  },
  {
    key: "elite",
    name: "Elite",
    price: "€1,500",
    priceLabel: "/mo",
    credits: "500 credits / mo",
  },
  {
    key: "unsure",
    name: "Not sure yet",
    price: "Let's talk",
    priceLabel: "",
    credits: "We'll recommend a package",
  },
] as const;

export const CREATIVE_PACKAGE_KEYS = CREATIVE_PACKAGES.map((p) => p.key) as [
  string,
  ...string[],
];

export const MEDIA_BUYING_OPTIONS = [
  { key: "yes", label: "Yes — run our paid media" },
  { key: "no", label: "No — creative only" },
  { key: "unsure", label: "Not sure yet" },
] as const;

export const MEDIA_BUYING_TIERS = [
  { key: "15-30k", label: "€15k – €30k / month ad spend" },
  { key: "30-75k", label: "€30k – €75k / month ad spend" },
  { key: "75k+", label: "€75k+ / month ad spend" },
  { key: "below-15k", label: "Below €15k / month (doesn't meet minimum)" },
  { key: "unsure", label: "Not sure yet" },
] as const;

// Mirror of the dashboard client intake fields — every field the engine needs
// to start producing creative and media plans.
export const intakeSchema = z.object({
  // — Basics —
  company: z.string().min(1, "Company name is required"),
  name: z.string().min(1, "Your name is required"),
  email: z.string().email("Valid email required"),
  website: z.string().min(1, "Website is required"),
  business_type: z.string().min(1, "Pick a business type"),
  product_description: z
    .string()
    .min(10, "A short description of what you sell helps us a lot"),
  target_audience: z.string().optional(),
  monthly_budget: z.string().optional(),
  platforms: z.array(z.string()).min(1, "Pick at least one platform"),

  // — Services selection —
  creative_package: z
    .string()
    .min(1, "Pick a creative package (or 'Not sure yet')"),
  media_buying: z
    .string()
    .min(1, "Let us know if you also want media buying"),
  media_buying_tier: z.string().optional(),

  // — Brand / niche —
  sub_niche: z.string().optional(),
  usp: z.string().optional(),
  brand_voice: z.string().optional(),
  brand_colors: z.string().optional(),
  brand_fonts: z.string().optional(),

  // — Product feed —
  productfeed_url: z.string().optional(),
  productfeed_type: z.string().optional(),

  // — Competitors —
  competitors: z.string().optional(),

  // — Performance baseline —
  baseline_roas: z.string().optional(),
  baseline_cpa: z.string().optional(),
  baseline_notes: z.string().optional(),

  // — Constraints —
  restrictions: z.string().optional(),

  // — Client hypotheses —
  client_hypotheses: z.string().optional(),

  // — Free text —
  notes: z.string().optional(),
});

export type IntakeInput = z.infer<typeof intakeSchema>;
