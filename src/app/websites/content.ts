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
  // Het gezicht achter het aanbod. Beide reacties die de koude campagne ooit
  // kreeg gingen over geloofwaardigheid ("sieht aus wie ChatGPT", "dacht dat
  // het oplichting was"), niet over prijs of product. Een naam en een foto
  // zijn het enige antwoord daarop.
  person: {
    eyebrow: string;
    title: string;
    body: string[];
    name: string;
    role: string;
    alt: string;
  };
  ctaBand: { title: string; body: string; ctaAudit: string; ctaCall: string };
  // De pagina achter de flyer en de QR. Het vinkje in het formulier is de
  // wettelijke toestemming om een eenmanszaak te mogen bellen (Tw 11.7).
  lekCheck: {
    meta: { title: string; description: string };
    eyebrow: string;
    title: string;
    body: string;
    viaLine: string; // {name} wordt vervangen door wie langs was
    whatsapp: { title: string; body: string; cta: string; prefill: string };
    form: {
      title: string;
      name: string;
      company: string;
      phone: string;
      email: string;
      city: string;
      message: string;
      messagePlaceholder: string;
      consent: string;
      consentHint: string;
      submit: string;
      sending: string;
      successTitle: string;
      successBody: string;
      error: string;
    };
    steps: { title: string; body: string }[];
    notDo: string;
  };
  nav: NavLabels;
  billing: {
    legend: string;
    once: string;
    monthly: string;
    yearly: string;
    yearlyBadge: string;
  };
  websitePackages: PackageTier[];
  socialPackages: PackageTier[];
}

/* ───────────────────────── Nederlands ───────────────────────── */
const nl: WebsitesContent = {
  meta: {
    title: "Websites & Social voor lokale bedrijven — Scale Performance Studio",
    description:
      "Een nieuwe, snelle website die converteert, klaar in een week. Je betaalt per maand, per jaar of in één keer. Plus social media op autopilot. Voor lokale bedrijven.",
  },
  hero: {
    eyebrow: "Websites & Social · voor lokale bedrijven",
    titlePre: "Een nieuwe site die ",
    titleHighlight: "converteert",
    titlePost: ". Klaar in een week.",
    body: "Voor lokale bedrijven met een verouderde of trage website. Mobiel-first, met online boeken erin, en jij kiest zelf of je per maand betaalt of in één keer — en daarna social media en advertenties als je wilt groeien.",
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
    body: "Klaar in een week, online boeken inbegrepen. Jij kiest hoe je betaalt.",
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
        body: "Je kiest per maand, per jaar of in één keer. Geen verrassingen: je weet vooraf precies wat je krijgt en wanneer het klaar is.",
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
  person: {
    eyebrow: "Wie je aan de lijn krijgt",
    title: "Wij zijn Emre en Emin, en we doen het zelf.",
    body: [
      "Je krijgt waarschijnlijk elke week berichten van mensen die je een website willen verkopen. Ik snap goed dat je die wegklikt, want je weet niet wie erachter zit.",
      "Bij ons weet je dat wel. Wij zijn twee broers uit Nijmegen: ik bouw je site zelf, mijn broer Emin en ik blijven allebei je aanspreekpunt als er later iets is. Bel of app ons gerust, ook als je alleen een vraag hebt en nog nergens aan toe bent.",
    ],
    name: "Emre en Emin Balıkoç",
    role: "Scale Performance Studio · Nijmegen",
    alt: "Emre Balıkoç aan zijn werktafel in Nijmegen",
  },
  lekCheck: {
    meta: {
      title: "Gratis lek-check voor je bedrijf — Scale Performance Studio",
      description:
        "Waar verlies jij klanten tussen zoeken en boeken? Gratis lek-check door Emre en Emin uit Nijmegen. Je betaalt pas als je er zelf klanten aan overhoudt.",
    },
    eyebrow: "Gratis lek-check",
    title: "Waar verlies jij klanten tussen zoeken en boeken?",
    body: "We kijken naar je zichtbaarheid op Google, je site, je reviews en hoe makkelijk iemand bij je kan boeken of bellen. Je krijgt één pagina met wat er lekt en drie dingen die we eraan kunnen doen. Gratis, en ook daarna betaal je niets totdat je er zelf klanten aan overhoudt.",
    viaLine: "{name} was bij je langs. Fijn dat je even kijkt.",
    whatsapp: {
      title: "Het snelst: stuur een appje",
      body: "Dan hebben we meteen contact en plannen we een moment dat jou uitkomt, in je zaak of via de telefoon.",
      cta: "App Emre op WhatsApp",
      prefill: "Hoi Emre, ik wil graag een gratis lek-check voor mijn bedrijf.",
    },
    form: {
      title: "Of laat je gegevens achter",
      name: "Je naam",
      company: "Naam van je bedrijf",
      phone: "06-nummer",
      email: "E-mail (mag leeg)",
      city: "Plaats",
      message: "Wat speelt er? (mag leeg)",
      messagePlaceholder: "Bijvoorbeeld: mensen vinden me niet op Google, of mijn site is verouderd",
      consent: "Jullie mogen mij bellen of appen over deze lek-check.",
      consentHint: "Zonder dit vinkje mogen we een eenmanszaak wettelijk niet bellen.",
      submit: "Vraag de lek-check aan",
      sending: "Versturen...",
      successTitle: "Dank je, we nemen contact op.",
      successBody: "Binnen twee werkdagen appt of belt Emre of Emin je om een moment af te spreken. Wil je niet wachten, stuur dan zelf even een appje.",
      error: "Er ging iets mis. Probeer het nog eens, of app ons direct.",
    },
    steps: [
      { title: "Lek-check", body: "30 minuten, in je zaak of online. We kijken mee met wat een klant ziet als hij je zoekt." },
      { title: "Eén ingreep", body: "We pakken het grootste lek aan en zetten alles op. Jij betaalt niets." },
      { title: "Jij ziet de cijfers", body: "Elke maand een overzicht van aanvragen. Jij vinkt af wie klant werd, en alleen daarvoor betaal je." },
    ],
    notDo: "Wat we niet doen: geld vragen voordat je iets hebt gezien.",
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
  billing: {
    legend: "Hoe wil je betalen?",
    once: "Eenmalig",
    monthly: "Per maand",
    yearly: "Per jaar",
    yearlyBadge: "2 maanden gratis",
  },
  websitePackages: [
    {
      name: "Launch",
      tagline: "Snel online en makkelijk bereikbaar — klaar in een week.",
      credits: "Eenmalig project",
      price: "€300",
      priceLabel: "vast bedrag",
      prices: {
        once: { price: "€300", priceLabel: "vast bedrag", credits: "Eenmalig project", note: "Daarna is de site van jou. Onderhoud los bij te boeken." },
        monthly: { price: "€24,95", priceLabel: "per maand", credits: "Doorlopend, alles inbegrepen", note: "Bouw, hosting en onderhoud in één bedrag. Start pas in de maand na je eerste klant via de site." },
        yearly: { price: "€249", priceLabel: "per jaar", credits: "Doorlopend, alles inbegrepen", note: "Je betaalt tien maanden en krijgt er twaalf." },
      },
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
      prices: {
        once: { price: "€750", priceLabel: "vast bedrag", credits: "Eenmalig project", note: "Daarna is de site van jou. Onderhoud los bij te boeken." },
        monthly: { price: "€59,95", priceLabel: "per maand", credits: "Doorlopend, alles inbegrepen", note: "Bouw, hosting en onderhoud in één bedrag. Start pas in de maand na je eerste klant via de site." },
        yearly: { price: "€599", priceLabel: "per jaar", credits: "Doorlopend, alles inbegrepen", note: "Je betaalt tien maanden en krijgt er twaalf." },
      },
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
      price: "€14,95",
      priceLabel: "per maand",
      prices: {
        once: { price: "€14,95", priceLabel: "per maand", credits: "Doorlopend", note: "Bij te boeken bij een eenmalig project." },
        monthly: { price: "Inbegrepen", priceLabel: "bij Launch en Studio", credits: "Zit in je maandbedrag", note: "Hosting, updates en wijzigingen zitten er al in." },
        yearly: { price: "Inbegrepen", priceLabel: "bij Launch en Studio", credits: "Zit in je jaarbedrag", note: "Hosting, updates en wijzigingen zitten er al in." },
      },
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
      prices: {
        monthly: { price: "€250", priceLabel: "per maand", note: "Maandelijks opzegbaar." },
        yearly: { price: "€2.500", priceLabel: "per jaar", note: "Je betaalt tien maanden en krijgt er twaalf." },
      },
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
      prices: {
        monthly: { price: "€500", priceLabel: "per maand", note: "Maandelijks opzegbaar." },
        yearly: { price: "€5.000", priceLabel: "per jaar", note: "Je betaalt tien maanden en krijgt er twaalf." },
      },
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
      prices: {
        monthly: { price: "€1.500", priceLabel: "per maand · vanaf", note: "Maandelijks opzegbaar. Advertentiebudget komt er los bij." },
        yearly: { price: "€15.000", priceLabel: "per jaar · vanaf", note: "Je betaalt tien maanden en krijgt er twaalf. Advertentiebudget komt er los bij." },
      },
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
      "A new, fast website that converts, live in a week. Pay monthly, yearly or once. Plus social media on autopilot. For local businesses.",
  },
  hero: {
    eyebrow: "Websites & Social · for local businesses",
    titlePre: "A new site that ",
    titleHighlight: "converts",
    titlePost: ". Live in a week.",
    body: "For local businesses with an outdated or slow website. Mobile-first, with online booking built in, and you choose whether to pay monthly or in one go — plus social media and ads when you're ready to grow.",
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
    body: "Live in a week, online booking included. You choose how you pay.",
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
        body: "You choose monthly, yearly or one-off. No surprises: you know exactly what you get and when it's ready.",
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
  person: {
    eyebrow: "Who you will be dealing with",
    title: "We are Emre and Emin, and we do it ourselves.",
    body: [
      "You probably get messages every week from people wanting to sell you a website. I understand why you delete them, because you have no idea who is behind them.",
      "With us you do. We are two brothers from Nijmegen: I build your site myself, and my brother Emin and I both stay your point of contact afterwards. Call or message us any time, even if you only have a question and are not ready for anything yet.",
    ],
    name: "Emre and Emin Balıkoç",
    role: "Scale Performance Studio · Nijmegen",
    alt: "Emre Balikoc at his desk in Nijmegen",
  },
  lekCheck: {
    meta: {
      title: "Free leak check for your business — Scale Performance Studio",
      description:
        "Where do you lose customers between searching and booking? Free leak check by Emre and Emin from Nijmegen. You only pay once it brings you paying customers.",
    },
    eyebrow: "Free leak check",
    title: "Where do you lose customers between searching and booking?",
    body: "We look at your visibility on Google, your site, your reviews and how easy it is to book or call you. You get one page with what is leaking and three things we can do about it. Free, and afterwards you still pay nothing until it brings you paying customers.",
    viaLine: "{name} stopped by your business. Thanks for taking a look.",
    whatsapp: {
      title: "Fastest: send a WhatsApp",
      body: "Then we are in touch right away and pick a moment that suits you, at your business or by phone.",
      cta: "Message Emre on WhatsApp",
      prefill: "Hi Emre, I would like a free leak check for my business.",
    },
    form: {
      title: "Or leave your details",
      name: "Your name",
      company: "Business name",
      phone: "Mobile number",
      email: "Email (optional)",
      city: "Town",
      message: "What is going on? (optional)",
      messagePlaceholder: "For example: people cannot find me on Google, or my site is outdated",
      consent: "You may call or message me about this leak check.",
      consentHint: "Without this box ticked, Dutch law does not allow us to call a sole trader.",
      submit: "Request the leak check",
      sending: "Sending...",
      successTitle: "Thank you, we will be in touch.",
      successBody: "Within two working days Emre or Emin will message or call you to set a time. If you would rather not wait, send us a WhatsApp yourself.",
      error: "Something went wrong. Please try again, or message us directly.",
    },
    steps: [
      { title: "Leak check", body: "30 minutes, at your business or online. We look at what a customer sees when they search for you." },
      { title: "One fix", body: "We tackle the biggest leak and set everything up. You pay nothing." },
      { title: "You see the numbers", body: "Every month an overview of enquiries. You tick who became a customer, and that is all you pay for." },
    ],
    notDo: "What we do not do: ask for money before you have seen anything.",
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
  billing: {
    legend: "How would you like to pay?",
    once: "One-off",
    monthly: "Monthly",
    yearly: "Yearly",
    yearlyBadge: "2 months free",
  },
  websitePackages: [
    {
      name: "Launch",
      tagline: "Online fast and easy to reach — ready in a week.",
      credits: "One-off project",
      price: "€300",
      priceLabel: "fixed price",
      prices: {
        once: { price: "€300", priceLabel: "fixed price", credits: "One-off project", note: "The site is yours afterwards. Maintenance available separately." },
        monthly: { price: "€24.95", priceLabel: "per month", credits: "Ongoing, everything included", note: "Build, hosting and maintenance in one figure. Only starts the month after your first customer through the site." },
        yearly: { price: "€249", priceLabel: "per year", credits: "Ongoing, everything included", note: "You pay for ten months and get twelve." },
      },
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
      prices: {
        once: { price: "€750", priceLabel: "fixed price", credits: "One-off project", note: "The site is yours afterwards. Maintenance available separately." },
        monthly: { price: "€59.95", priceLabel: "per month", credits: "Ongoing, everything included", note: "Build, hosting and maintenance in one figure. Only starts the month after your first customer through the site." },
        yearly: { price: "€599", priceLabel: "per year", credits: "Ongoing, everything included", note: "You pay for ten months and get twelve." },
      },
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
      price: "€14.95",
      priceLabel: "per month",
      prices: {
        once: { price: "€14.95", priceLabel: "per month", credits: "Ongoing", note: "Add it to a one-off project." },
        monthly: { price: "Included", priceLabel: "with Launch and Studio", credits: "Part of your monthly fee", note: "Hosting, updates and changes are already in there." },
        yearly: { price: "Included", priceLabel: "with Launch and Studio", credits: "Part of your yearly fee", note: "Hosting, updates and changes are already in there." },
      },
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
      prices: {
        monthly: { price: "€250", priceLabel: "per month", note: "Cancel any month." },
        yearly: { price: "€2,500", priceLabel: "per year", note: "You pay for ten months and get twelve." },
      },
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
      prices: {
        monthly: { price: "€500", priceLabel: "per month", note: "Cancel any month." },
        yearly: { price: "€5,000", priceLabel: "per year", note: "You pay for ten months and get twelve." },
      },
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
      prices: {
        monthly: { price: "€1,500", priceLabel: "per month · from", note: "Cancel any month. Ad budget is billed separately." },
        yearly: { price: "€15,000", priceLabel: "per year · from", note: "You pay for ten months and get twelve. Ad budget is billed separately." },
      },
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
