import type { PackageTier } from "@/lib/pricing";

/**
 * i18n content for the /websites local-business funnel ONLY.
 *
 * This is deliberately self-contained (it does NOT read from the shared
 * canonical pricing in ../../lib/pricing, which stays NL and feeds the PDFs).
 * Adding a new language = add one entry to `content` below. Nothing else
 * needs to change — the route, switcher and header pick it up automatically.
 */

export const locales = ["en", "nl"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const localeNames: Record<Locale, string> = {
  en: "English",
  nl: "Nederlands",
};

export function isLocale(v: string | undefined): v is Locale {
  return !!v && (locales as readonly string[]).includes(v);
}

const wa = (msg: string) =>
  `https://wa.me/31611727850?text=${encodeURIComponent(msg)}`;
const CALENDLY =
  "https://calendly.com/admin-scaleperformancestudio/kennismaking-15-min";

interface NavLabels {
  websites: { label: string; caption: string };
  social: { label: string; caption: string };
  how: { label: string; caption: string };
  ctaShort: string; // e.g. "Free audit"
  ctaReady: string; // mobile panel eyebrow, e.g. "Free"
  ctaLine: string; // mobile panel line, e.g. "Request an audit"
}

export interface WebsitesContent {
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    titlePre: string;
    titleHighlight: string;
    titlePost: string;
    body: string;
    ctaAudit: string;
    ctaCall: string;
    ctaPackages: string;
  };
  heroAnim: {
    issues: [string, string, string];
    liveBadge: string;
    before: string;
    after: string;
  };
  websites: {
    eyebrow: string;
    titlePre: string;
    titleHighlight: string;
    titlePost: string;
    body: string;
    popularLabel: string;
  };
  social: {
    eyebrow: string;
    titlePre: string;
    titleHighlight: string;
    titlePost: string;
    body: string;
    popularLabel: string;
  };
  how: {
    eyebrow: string;
    title: string;
    steps: { n: string; title: string; body: string }[];
  };
  ctaBand: { title: string; body: string; ctaAudit: string; ctaCall: string };
  nav: NavLabels;
  websitePackages: PackageTier[];
  socialPackages: PackageTier[];
}

/* ───────────────────────── Nederlands ───────────────────────── */
const nl: WebsitesContent = {
  meta: {
    title: "Websites & Social voor lokale bedrijven — Scale Performance Studio",
    description:
      "Een nieuwe, snelle website die converteert — vast bedrag, klaar in een week. Plus social media op autopilot. Voor lokale bedrijven.",
  },
  hero: {
    eyebrow: "Websites & Social · voor lokale bedrijven",
    titlePre: "Een nieuwe site die ",
    titleHighlight: "converteert",
    titlePost: ". Klaar in een week.",
    body: "Voor lokale bedrijven met een verouderde of trage website. Vast bedrag, mobiel-first, met online boeken erin — en daarna social media en advertenties als je wilt groeien.",
    ctaAudit: "Vraag een gratis audit aan",
    ctaCall: "Plan een kennismaking",
    ctaPackages: "Bekijk de pakketten",
  },
  heroAnim: {
    issues: ["Traag op mobiel", "Geen online boeken", "Geen reviews"],
    liveBadge: "Live in ~7 dagen",
    before: "Voor",
    after: "Na",
  },
  websites: {
    eyebrow: "Websites",
    titlePre: "Een site die klanten ",
    titleHighlight: "binnenbrengt",
    titlePost: ".",
    body: "Vast bedrag, klaar in een week — online boeken inbegrepen.",
    popularLabel: "Meest gekozen",
  },
  social: {
    eyebrow: "Social media",
    titlePre: "Content & beheer, op ",
    titleHighlight: "autopilot",
    titlePost: ".",
    body: "Wij maken het contentplan, produceren de posts en reels, en beheren je kanalen — zodat jij je op je zaak kunt richten.",
    popularLabel: "Meest gekozen",
  },
  how: {
    eyebrow: "Hoe het werkt",
    title: "Van audit tot live in een week.",
    steps: [
      {
        n: "01",
        title: "Gratis audit",
        body: "Je stuurt ons je huidige site. Wij laten zien wat beter kan — en bouwen alvast een voorbeeld van de nieuwe versie.",
      },
      {
        n: "02",
        title: "Plan & prijs",
        body: "Eén vast bedrag, geen verrassingen. Je weet vooraf precies wat je krijgt en wanneer het klaar is.",
      },
      {
        n: "03",
        title: "Bouwen in ~7 dagen",
        body: "Wij bouwen de nieuwe site met jouw content en online boeken erin. Jij hoeft niets technisch te regelen.",
      },
      {
        n: "04",
        title: "Live & groeien",
        body: "We zetten 'm live. Daarna kunnen we je social media en advertenties verzorgen om klanten binnen te halen.",
      },
    ],
  },
  ctaBand: {
    title: "Benieuwd hoe jouw site eruit kan zien?",
    body: "Stuur ons je huidige website — je krijgt gratis een voorbeeld van de nieuwe versie. Geen verplichting.",
    ctaAudit: "Vraag een gratis audit aan via WhatsApp",
    ctaCall: "Of plan een kennismaking",
  },
  nav: {
    websites: { label: "Websites", caption: "Onze pakketten" },
    social: { label: "Social", caption: "Content & beheer" },
    how: { label: "Hoe het werkt", caption: "Van audit tot live" },
    ctaShort: "Gratis audit",
    ctaReady: "Gratis",
    ctaLine: "Vraag een audit aan",
  },
  websitePackages: [
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
      ctaHref: wa(
        "Hi SPS, ik wil graag een gratis website-audit voor mijn zaak.",
      ),
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
      ctaHref: CALENDLY,
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
      ctaHref: wa("Hi SPS, ik heb interesse in het Care-onderhoudspakket."),
      popular: false,
      accent: "#266604",
    },
  ],
  socialPackages: [
    {
      name: "Starter",
      tagline: "Consistente content die je merk laat groeien.",
      credits: "Content & beheer",
      price: "€250",
      priceLabel: "per maand",
      features: [
        "12 posts per maand",
        "2 kanalen naar keuze",
        "Maandelijks contentplan",
        "Captions & hashtags",
        "Maandrapport",
      ],
      cta: "Plan een kennismaking",
      ctaHref: CALENDLY,
      popular: false,
      accent: "#266604",
    },
    {
      name: "Growth",
      tagline: "Meer volume, reels en strategie — voor échte groei.",
      credits: "Content & beheer",
      price: "€500",
      priceLabel: "per maand",
      features: [
        "20 posts per maand, incl. reels",
        "3 kanalen",
        "Contentplan + community-management",
        "Maandelijkse strategiecall",
        "Maandrapport",
      ],
      cta: "Plan een kennismaking",
      ctaHref: CALENDLY,
      popular: true,
      accent: "#2e7f06",
    },
    {
      name: "Performance",
      tagline: "Dagelijkse content, AI-video én advertenties op Meta.",
      credits: "Content & beheer",
      price: "€1.500",
      priceLabel: "per maand · vanaf",
      features: [
        "Elke dag posten",
        "Alle relevante kanalen",
        "Volledig contentplan + community",
        "AI UGC-video + ad-creatives",
        "Adverteren op Meta (Facebook & Instagram)",
        "Dedicated strateeg",
      ],
      cta: "Plan een kennismaking",
      ctaHref: CALENDLY,
      popular: false,
      accent: "#2e7f06",
    },
  ],
};

/* ───────────────────────── English ───────────────────────── */
const en: WebsitesContent = {
  meta: {
    title: "Websites & Social for local businesses — Scale Performance Studio",
    description:
      "A new, fast website that converts — fixed price, live in a week. Plus social media on autopilot. For local businesses.",
  },
  hero: {
    eyebrow: "Websites & Social · for local businesses",
    titlePre: "A new site that ",
    titleHighlight: "converts",
    titlePost: ". Live in a week.",
    body: "For local businesses with an outdated or slow website. Fixed price, mobile-first, with online booking built in — plus social media and ads when you're ready to grow.",
    ctaAudit: "Request a free audit",
    ctaCall: "Book an intro call",
    ctaPackages: "View the packages",
  },
  heroAnim: {
    issues: ["Slow on mobile", "No online booking", "No reviews"],
    liveBadge: "Live in ~7 days",
    before: "Before",
    after: "After",
  },
  websites: {
    eyebrow: "Websites",
    titlePre: "A site that wins you ",
    titleHighlight: "customers",
    titlePost: ".",
    body: "Fixed price, live in a week — online booking included.",
    popularLabel: "Most popular",
  },
  social: {
    eyebrow: "Social media",
    titlePre: "Content & management, on ",
    titleHighlight: "autopilot",
    titlePost: ".",
    body: "We create the content plan, produce the posts and reels, and manage your channels — so you can focus on your business.",
    popularLabel: "Most popular",
  },
  how: {
    eyebrow: "How it works",
    title: "From audit to live in a week.",
    steps: [
      {
        n: "01",
        title: "Free audit",
        body: "You send us your current site. We show what can be better — and build a preview of the new version up front.",
      },
      {
        n: "02",
        title: "Plan & price",
        body: "One fixed price, no surprises. You know exactly what you get and when it's ready.",
      },
      {
        n: "03",
        title: "Built in ~7 days",
        body: "We build the new site with your content and online booking built in. You handle nothing technical.",
      },
      {
        n: "04",
        title: "Live & growing",
        body: "We put it live. After that we can handle your social media and ads to bring customers in.",
      },
    ],
  },
  ctaBand: {
    title: "Curious what your site could look like?",
    body: "Send us your current website — you'll get a free preview of the new version. No obligation.",
    ctaAudit: "Request a free audit on WhatsApp",
    ctaCall: "Or book an intro call",
  },
  nav: {
    websites: { label: "Websites", caption: "Our packages" },
    social: { label: "Social", caption: "Content & management" },
    how: { label: "How it works", caption: "From audit to live" },
    ctaShort: "Free audit",
    ctaReady: "Free",
    ctaLine: "Request an audit",
  },
  websitePackages: [
    {
      name: "Launch",
      tagline: "Online fast and easy to reach — ready in a week.",
      credits: "One-off project",
      price: "€375",
      priceLabel: "fixed price",
      features: [
        "Works flawlessly on mobile — where most customers look",
        "Customers book, reserve or call you straight from the site",
        "Phone, address and opening hours front and centre",
        "Easy to find on Google, so people find your business",
        "Fast-loading and professional — ready in ~7 days",
      ],
      cta: "Request a free audit",
      ctaHref: wa("Hi SPS, I'd like a free website audit for my business."),
      popular: false,
      accent: "#2e7f06",
    },
    {
      name: "Studio",
      tagline: "Your complete look, fresh and professional.",
      credits: "One-off project",
      price: "€750",
      priceLabel: "fixed price",
      features: [
        "Everything in Launch",
        "A fresh look: logo, colours and style that fit you",
        "Multiple pages — services, about you, contact and more",
        "Customer reviews front and centre, for extra trust",
        "Persuasive copy that turns visitors into customers",
      ],
      cta: "Book an intro call",
      ctaHref: CALENDLY,
      popular: true,
      accent: "#2e7f06",
    },
    {
      name: "Care",
      tagline: "We keep your site fast, secure and up to date.",
      credits: "Ongoing",
      price: "€50",
      priceLabel: "per month",
      features: [
        "Fast, secure hosting — always online",
        "Updates and backups, handled automatically",
        "Need text, photos or opening hours changed? We do it",
        "Quick help whenever something needs doing",
      ],
      cta: "Add to your site",
      ctaHref: wa("Hi SPS, I'm interested in the Care maintenance package."),
      popular: false,
      accent: "#266604",
    },
  ],
  socialPackages: [
    {
      name: "Starter",
      tagline: "Consistent content that grows your brand.",
      credits: "Content & management",
      price: "€250",
      priceLabel: "per month",
      features: [
        "12 posts per month",
        "2 channels of your choice",
        "Monthly content plan",
        "Captions & hashtags",
        "Monthly report",
      ],
      cta: "Book an intro call",
      ctaHref: CALENDLY,
      popular: false,
      accent: "#266604",
    },
    {
      name: "Growth",
      tagline: "More volume, reels and strategy — for real growth.",
      credits: "Content & management",
      price: "€500",
      priceLabel: "per month",
      features: [
        "20 posts per month, incl. reels",
        "3 channels",
        "Content plan + community management",
        "Monthly strategy call",
        "Monthly report",
      ],
      cta: "Book an intro call",
      ctaHref: CALENDLY,
      popular: true,
      accent: "#2e7f06",
    },
    {
      name: "Performance",
      tagline: "Daily content, AI video and ads on Meta.",
      credits: "Content & management",
      price: "€1,500",
      priceLabel: "per month · from",
      features: [
        "Post every day",
        "All relevant channels",
        "Full content plan + community",
        "AI UGC video + ad creatives",
        "Advertising on Meta (Facebook & Instagram)",
        "Dedicated strategist",
      ],
      cta: "Book an intro call",
      ctaHref: CALENDLY,
      popular: false,
      accent: "#2e7f06",
    },
  ],
};

export const content: Record<Locale, WebsitesContent> = { en, nl };
