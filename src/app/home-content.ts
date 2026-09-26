// Teksten van de homepage (resultaatmodel), Nederlands en Engels.
// De e-commerce-homepage van vóór 26 september 2026 staat ongewijzigd op
// /ecommerce; deze pagina vervangt hem op / omdat het lokale aanbod
// ("je betaalt pas als het werkt") nu het hoofdaanbod is.
import type { Locale } from "./websites/content";

export interface HomeContent {
  meta: { title: string; description: string };
  nav: { leaks: string; how: string; pricing: string; who: string; cta: string; ctaHref: string };
  hero: {
    eyebrow: string;
    titlePre: string;
    titleHighlight: string;
    titlePost: string;
    body: string;
    ctaPrimary: string;
    ctaSecondary: string;
    trust: string[];
  };
  report: {
    title: string;
    month: string;
    live: string;
    rows: { kind: string; when: string }[];
    became: string;
    noCustomer: string;
    perCustomer: string;
    totalLabel: string;
    zeroNote: string;
  };
  leaks: {
    eyebrow: string;
    titlePre: string;
    titleHighlight: string;
    titlePost: string;
    body: string;
    items: { q: string; a: string }[];
  };
  how: {
    eyebrow: string;
    titlePre: string;
    titleHighlight: string;
    titlePost: string;
    steps: { title: string; body: string }[];
    notDo: string;
  };
  measure: {
    eyebrow: string;
    title: string;
    pillars: { title: string; body: string }[];
    rule: string;
  };
  pricing: {
    eyebrow: string;
    titlePre: string;
    titleHighlight: string;
    titlePost: string;
    body: string;
    rows: { branche: string; price: string; note: string }[];
    extras: string[];
    websiteTitle: string;
    websiteBody: string;
  };
  transform: { eyebrow: string; title: string; body: string };
  who: {
    eyebrow: string;
    title: string;
    body: string[];
    people: { name: string; role: string; image: string | null; initial: string }[];
    facts: string[];
  };
  faq: { eyebrow: string; title: string; items: { question: string; answer: string }[] };
  cta: { title: string; body: string; primary: string; secondary: string };
}

export const WHATSAPP_NUMBER = "31611727850";

export const whatsappHref = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

const nl: HomeContent = {
  meta: {
    title: "Je betaalt pas als het werkt — Scale Performance Studio, Nijmegen",
    description:
      "Meer klanten via Google, een site die boekt, reviews die binnenkomen. Twee broers uit Nijmegen zetten alles op; je betaalt alleen per klant die via ons bij jou heeft betaald.",
  },
  nav: {
    leaks: "Waar lekt het",
    how: "Zo werkt het",
    pricing: "Prijzen",
    who: "Wie wij zijn",
    cta: "Gratis lek-check",
    ctaHref: "/lek-check",
  },
  hero: {
    eyebrow: "Voor ondernemers in Nijmegen en omgeving",
    titlePre: "Je betaalt pas als het ",
    titleHighlight: "werkt",
    titlePost: ".",
    body: "Meer klanten via Google, een site die boekt, reviews die binnenkomen. Wij zetten alles op. Jij betaalt alleen per klant die via ons bij jou heeft betaald. Geen abonnement vooraf, geen uurtje-factuurtje.",
    ctaPrimary: "Gratis lek-check",
    ctaSecondary: "App Emre",
    trust: ["Twee broers uit Nijmegen", "Niets vooraf"],
  },
  report: {
    title: "Maandrapport",
    month: "oktober",
    live: "live",
    rows: [
      { kind: "Telefoontje via je nieuwe nummer", when: "di 14:02" },
      { kind: "Aanvraag via het formulier", when: "wo 09:41" },
      { kind: "Boeking via de link", when: "do 18:20" },
      { kind: "Telefoontje via je nieuwe nummer", when: "vr 11:15" },
    ],
    became: "werd klant",
    noCustomer: "geen klant",
    perCustomer: "€ 15 per nieuwe klant met een bon van € 50 tot € 150",
    totalLabel: "Jij betaalt deze maand",
    zeroNote: "Aanvragen zonder klant: € 0",
  },
  leaks: {
    eyebrow: "Herken je dit?",
    titlePre: "Acht dingen waar bijna elke ondernemer ",
    titleHighlight: "tegenaan loopt",
    titlePost: ".",
    body: "Kies degene die jou het meest raakt. Daar beginnen we, en je betaalt pas als het je klanten oplevert.",
    items: [
      { q: "Op stille dagen heeft mijn agenda gaten.", a: "Dinsdagmiddag leeg, zaterdag overvol. Wij zorgen dat wie nu zoekt jou vindt en meteen kan boeken, ook voor die stille uren. Je betaalt per klant die komt." },
      { q: "Ik draai bijna alleen op mond-tot-mond.", a: "Mooi, tot het even stilvalt. Wij zetten er een tweede aanvoer naast via Google, zodat je niet meer afhangt van wie toevallig over je praat." },
      { q: "Concurrenten staan boven mij in Google.", a: "Wie 'kapper Nijmegen' googelt, ziet drie zaken. Wij zorgen dat jij daartussen staat, met foto's, reviews en een knop om te bellen." },
      { q: "Ik heb geen tijd voor marketing.", a: "Je staat de hele dag in de zaak. Wij zetten alles op en houden het bij. Jij vinkt één keer per maand af wie klant werd, meer niet." },
      { q: "Ik mis telefoontjes als ik aan het werk ben.", a: "Handen in het haar, op de steiger, achter de bar. Wij zetten een nummer en een boekingslink neer waar mensen ook 's avonds terechtkunnen. Een gemiste oproep is dan geen gemiste klant." },
      { q: "Mijn reviews zijn oud, of het zijn er te weinig.", a: "Mensen kijken eerst naar sterren, dan pas naar jou. Wij zetten een vaste reviewroute op: QR aan de balie, berichtje na de afspraak. Zit erbij, kost niets extra." },
      { q: "Ik werk hard, maar het groeit niet meer.", a: "Zelfde omzet als drie jaar geleden, meer uren. In de lek-check zoeken we waar klanten afhaken tussen zoeken en boeken, en pakken het grootste lek aan." },
      { q: "Ik ben net begonnen en niemand kent me nog.", a: "Site, Bedrijfsprofiel, reviews en een eerste campagne in één keer. Jij betaalt niets vooraf, en daarna alleen per klant die via ons komt." },
    ],
  },
  how: {
    eyebrow: "Zo werkt het",
    titlePre: "Drie stappen, en geld komt pas bij de ",
    titleHighlight: "derde",
    titlePost: ".",
    steps: [
      { title: "Gratis lek-check", body: "30 minuten in je zaak of online. We kijken mee met wat een klant ziet als hij je zoekt, en zeggen eerlijk of we iets voor je kunnen doen." },
      { title: "Wij zetten alles op", body: "Eén ingreep, geen pakket van alles. Bedrijfsprofiel, site, nummer, formulier, reviewroute. Jij betaalt niets." },
      { title: "Jij ziet de cijfers, dan pas betalen", body: "Elke maand een overzicht van aanvragen. Jij vinkt af wie klant werd. Alleen daarvoor krijg je een factuur." },
    ],
    notDo: "Wat wij niet doen: geld vragen voordat je iets hebt gezien.",
  },
  measure: {
    eyebrow: "Eerlijk meten",
    title: "Alleen wat via onze kanalen binnenkomt, telt.",
    pillars: [
      { title: "Eigen nummer", body: "Een telefoonnummer dat vóór ons niet bestond. Belt iemand daarop, dan kwam hij via ons. Je oude nummer blijft overal staan." },
      { title: "Eigen formulier en boekingslink", body: "Elke aanvraag komt bij jou en bij ons tegelijk binnen. Geen discussie over waar iemand vandaan kwam." },
      { title: "Maandrapport dat jij aftekent", body: "Eén pagina met alle aanvragen. Jij vinkt af wie klant werd en betaalde. Pas daarna een factuur, nooit eerder." },
    ],
    rule: "Wat wij niet zelf kunnen zien, verkopen wij niet op resultaat.",
  },
  pricing: {
    eyebrow: "Prijzen",
    titlePre: "Per betaalde klant. Niet per uur, niet ",
    titleHighlight: "vooraf",
    titlePost: ".",
    body: "Eén bedrag per nieuwe klant die via onze kanalen kwam en bij jou heeft betaald. De hoogte volgt uit wat die klant de eerste keer uitgaf, niet uit je branche. Altijd tussen 5 en 25 procent van zijn bon, met een plafond per maand dat je vooraf kent.",
    rows: [
      { branche: "Eerste bon tot € 50", price: "€ 5", note: "per nieuwe klant" },
      { branche: "Eerste bon € 50 tot € 150", price: "€ 15", note: "per nieuwe klant" },
      { branche: "Eerste bon € 150 tot € 500", price: "€ 35", note: "per nieuwe klant" },
      { branche: "Eerste bon € 500 tot € 2.000", price: "€ 75", note: "per nieuwe klant" },
      { branche: "Eerste bon vanaf € 2.000", price: "€ 150", note: "per nieuwe klant" },
    ],
    extras: [
      "Werkt in elke branche: kapper, garage, tandarts, rijschool, winkel. Jij kiest de trede, wij hoeven je bon niet te zien.",
      "Alleen de eerste keer telt. Herhaalbezoek is van jou, daar betaal je niets over.",
      "Plafond per maand, vooraf afgesproken.",
      "Advertentiebudget betaal je zelf, rechtstreeks aan Google of Meta.",
      "Reviews, logo en domein zitten erbij. Geen aparte factuur.",
    ],
    websiteTitle: "Een site erbij?",
    websiteBody: "Launch of Studio, per maand of per jaar. Het bedrag start pas in de maand na je eerste betaalde klant via de site. Tot die dag € 0.",
  },
  transform: {
    eyebrow: "Verouderde site?",
    title: "Van niet te vinden naar direct boeken.",
    body: "We bouwen eerst, jij kijkt mee, en het maandbedrag begint pas als de site je een klant heeft opgeleverd. Niet tevreden, dan betaal je niets en houden wij het werk.",
  },
  who: {
    eyebrow: "Wie wij zijn",
    title: "Emre en Emin, uit Nijmegen.",
    body: [
      "Je krijgt waarschijnlijk elke week berichten van bureaus die je iets willen verkopen. Wij snappen dat je die wegklikt: je weet niet wie erachter zit.",
      "Bij ons wel. Wij zijn twee broers, we komen zelf langs, en we verdienen pas als jij verdient. Bel of app ons gerust, ook als je alleen een vraag hebt en nog nergens aan toe bent.",
    ],
    people: [
      { name: "Emre Balıkoç", role: "Bouwt je site, richt de meting in, beheert de campagnes", image: "/emre.jpg", initial: "E" },
      { name: "Emin Balıkoç", role: "Komt langs, plant de lek-check, blijft je aanspreekpunt", image: null, initial: "E" },
    ],
    facts: ["Nijmegen", "06 1172 7850"],
  },
  faq: {
    eyebrow: "Vragen",
    title: "Wat ondernemers ons eerst vragen.",
    items: [
      { question: "Is het echt gratis in het begin?", answer: "Ja. De lek-check, het opzetten en de eerste maanden kosten niets. Je krijgt pas een factuur voor nieuwe klanten die via onze kanalen kwamen en bij jou hebben betaald, en dan één bedrag per klant op basis van zijn eerste bon. Alleen advertentiebudget betaal je zelf, rechtstreeks aan Google of Meta." },
      { question: "Hoe weten jullie welke klant via jullie kwam?", answer: "Alles loopt via kanalen die wij aanmaken: een nieuw nummer, een formulier, een boekingslink. Wat daar binnenkomt, kwam via ons. Wat via je oude nummer of via mond-tot-mond komt, tellen we niet. Jij vinkt elke maand af welke aanvragen klant werden." },
      { question: "Wat als het niet werkt?", answer: "Dan stoppen wij zelf, na twee maandrapporten zonder vooruitgang. Geen factuur. Jij houdt je domein en je eigen nummer, wij houden wat wij bouwden." },
      { question: "Van wie is de site?", answer: "Tot de eerste betaling van ons, daarna van jou. Je domeinnaam staat altijd op jouw naam. Wil je de site eerder overnemen, dan kan dat voor een vast bedrag." },
      { question: "Hoelang zit ik eraan vast?", answer: "Eerst drie maanden proef, die begint zodra de meting live staat. Na je eerste betaalde klant nog zes maanden, daarna maandelijks opzegbaar." },
      { question: "Werken jullie ook buiten Nijmegen?", answer: "In de regio Arnhem-Nijmegen komen we langs. Verder weg werken we online; dan begint het met een videogesprek in plaats van een bezoek." },
    ],
  },
  cta: {
    title: "Benieuwd waar het bij jou lekt?",
    body: "Een lek-check duurt 30 minuten en kost niets. Daarna weet je precies waar klanten afhaken, ook als je verder niets met ons doet.",
    primary: "Plan een gratis lek-check",
    secondary: "App Emre op WhatsApp",
  },
};

const en: HomeContent = {
  meta: {
    title: "You only pay when it works — Scale Performance Studio, Nijmegen",
    description:
      "More customers through Google, a site that books, reviews that come in. Two brothers from Nijmegen set everything up; you only pay per customer who came through us and paid you.",
  },
  nav: {
    leaks: "Where it leaks",
    how: "How it works",
    pricing: "Pricing",
    who: "Who we are",
    cta: "Free leak check",
    ctaHref: "/leak-check",
  },
  hero: {
    eyebrow: "For business owners in and around Nijmegen",
    titlePre: "You only pay when it ",
    titleHighlight: "works",
    titlePost: ".",
    body: "More customers through Google, a site that books, reviews that come in. We set everything up. You only pay per customer who came through us and paid you. No subscription up front, no hourly invoices.",
    ctaPrimary: "Free leak check",
    ctaSecondary: "Message Emre",
    trust: ["Two brothers from Nijmegen", "Nothing up front"],
  },
  report: {
    title: "Monthly report",
    month: "October",
    live: "live",
    rows: [
      { kind: "Call via your new number", when: "Tue 14:02" },
      { kind: "Enquiry via the form", when: "Wed 09:41" },
      { kind: "Booking via the link", when: "Thu 18:20" },
      { kind: "Call via your new number", when: "Fri 11:15" },
    ],
    became: "became a customer",
    noCustomer: "no customer",
    perCustomer: "€15 per new customer with a bill of €50 to €150",
    totalLabel: "You pay this month",
    zeroNote: "Enquiries without a customer: €0",
  },
  leaks: {
    eyebrow: "Sound familiar?",
    titlePre: "Eight things almost every business owner ",
    titleHighlight: "runs into",
    titlePost: ".",
    body: "Pick the one that hits closest to home. That is where we start, and you only pay once it brings you customers.",
    items: [
      { q: "On quiet days my diary has gaps.", a: "Tuesday afternoon empty, Saturday overbooked. We make sure whoever is searching right now finds you and can book straight away, for those quiet hours too. You pay per customer who shows up." },
      { q: "I run almost entirely on word of mouth.", a: "Great, until it goes quiet. We put a second supply next to it through Google, so you no longer depend on who happens to mention you." },
      { q: "Competitors rank above me on Google.", a: "Whoever googles 'hairdresser Nijmegen' sees three businesses. We make sure you are one of them, with photos, reviews and a button to call." },
      { q: "I have no time for marketing.", a: "You are in the business all day. We set everything up and keep it running. Once a month you tick who became a customer, nothing more." },
      { q: "I miss calls while I am working.", a: "Hands in someone's hair, up a ladder, behind the bar. We put down a number and a booking link people can use in the evening too. A missed call is no longer a missed customer." },
      { q: "My reviews are old, or there are too few.", a: "People look at the stars first, then at you. We set up a fixed review route: a QR at the counter, a message after the appointment. Included, no extra charge." },
      { q: "I work hard, but it has stopped growing.", a: "Same revenue as three years ago, more hours. In the leak check we find where customers drop off between searching and booking, and fix the biggest leak." },
      { q: "I have just started and nobody knows me yet.", a: "Site, Business Profile, reviews and a first campaign in one go. You pay nothing up front, and afterwards only per customer who comes through us." },
    ],
  },
  how: {
    eyebrow: "How it works",
    titlePre: "Three steps, and money only comes at the ",
    titleHighlight: "third",
    titlePost: ".",
    steps: [
      { title: "Free leak check", body: "30 minutes at your business or online. We look at what a customer sees when searching for you, and tell you honestly whether we can help." },
      { title: "We set everything up", body: "One fix, not a bundle of everything. Business Profile, site, number, form, review route. You pay nothing." },
      { title: "You see the numbers, then you pay", body: "Every month an overview of enquiries. You tick who became a customer. That is all you are invoiced for." },
    ],
    notDo: "What we do not do: ask for money before you have seen anything.",
  },
  measure: {
    eyebrow: "Honest measurement",
    title: "Only what comes in through our channels counts.",
    pillars: [
      { title: "Own number", body: "A phone number that did not exist before us. If someone calls it, they came through us. Your old number stays everywhere else." },
      { title: "Own form and booking link", body: "Every enquiry reaches you and us at the same time. No argument about where someone came from." },
      { title: "A monthly report you sign off", body: "One page with every enquiry. You tick who became a customer and paid. Only then an invoice, never earlier." },
    ],
    rule: "What we cannot see ourselves, we do not sell on results.",
  },
  pricing: {
    eyebrow: "Pricing",
    titlePre: "Per paying customer. Not per hour, not ",
    titleHighlight: "up front",
    titlePost: ".",
    body: "One amount per new customer who came through our channels and paid you. The amount follows what that customer spent the first time, not your trade. Always between 5 and 25 percent of their bill, with a monthly cap you know in advance.",
    rows: [
      { branche: "First bill up to €50", price: "€5", note: "per new customer" },
      { branche: "First bill €50 to €150", price: "€15", note: "per new customer" },
      { branche: "First bill €150 to €500", price: "€35", note: "per new customer" },
      { branche: "First bill €500 to €2,000", price: "€75", note: "per new customer" },
      { branche: "First bill from €2,000", price: "€150", note: "per new customer" },
    ],
    extras: [
      "Works in every trade: hairdresser, garage, dentist, driving school, shop. You pick the tier, we never need to see your receipts.",
      "Only the first time counts. Repeat visits are yours, you pay nothing on those.",
      "Monthly cap, agreed in advance.",
      "Ad budget you pay yourself, directly to Google or Meta.",
      "Reviews, logo and domain are included. No separate invoice.",
    ],
    websiteTitle: "Need a site too?",
    websiteBody: "Launch or Studio, monthly or yearly. The fee only starts in the month after your first paying customer through the site. Until then, €0.",
  },
  transform: {
    eyebrow: "Outdated site?",
    title: "From nowhere to be found to booked in one tap.",
    body: "We build first, you look, and the monthly fee only starts once the site has brought you a customer. Not happy, you pay nothing and we keep the work.",
  },
  who: {
    eyebrow: "Who we are",
    title: "Emre and Emin, from Nijmegen.",
    body: [
      "You probably get messages every week from agencies trying to sell you something. We understand why you delete them: you have no idea who is behind them.",
      "With us you do. We are two brothers, we come by in person, and we only earn when you earn. Call or message us any time, even if you only have a question and are not ready for anything yet.",
    ],
    people: [
      { name: "Emre Balıkoç", role: "Builds your site, sets up the measurement, runs the campaigns", image: "/emre.jpg", initial: "E" },
      { name: "Emin Balıkoç", role: "Comes by, plans the leak check, stays your point of contact", image: null, initial: "E" },
    ],
    facts: ["Nijmegen", "+31 6 1172 7850"],
  },
  faq: {
    eyebrow: "Questions",
    title: "What business owners ask us first.",
    items: [
      { question: "Is it really free at the start?", answer: "Yes. The leak check, the setup and the first months cost nothing. You are only invoiced for new customers who came through our channels and paid you, one amount per customer based on their first bill. Only ad budget you pay yourself, directly to Google or Meta." },
      { question: "How do you know which customer came through you?", answer: "Everything runs through channels we create: a new number, a form, a booking link. What comes in there came through us. What comes through your old number or word of mouth, we do not count. You tick every month which enquiries became customers." },
      { question: "What if it does not work?", answer: "Then we stop ourselves, after two monthly reports without progress. No invoice. You keep your domain and your own number, we keep what we built." },
      { question: "Who owns the site?", answer: "Until the first payment it is ours, after that yours. Your domain name is always in your name. If you want to take the site over earlier, you can, for a fixed amount." },
      { question: "How long am I tied in?", answer: "First a three-month trial, which starts once the measurement is live. After your first paying customer another six months, then monthly." },
      { question: "Do you work outside Nijmegen?", answer: "In the Arnhem-Nijmegen region we come by in person. Further away we work online; then it starts with a video call instead of a visit." },
    ],
  },
  cta: {
    title: "Curious where it leaks for you?",
    body: "A leak check takes 30 minutes and costs nothing. Afterwards you know exactly where customers drop off, even if you never work with us.",
    primary: "Book a free leak check",
    secondary: "Message Emre on WhatsApp",
  },
};

export const homeContent: Record<Locale, HomeContent> = { nl, en };

export const homeWhatsapp: Record<Locale, string> = {
  nl: whatsappHref("Hoi Emre, ik wil graag een gratis lek-check voor mijn bedrijf."),
  en: whatsappHref("Hi Emre, I would like a free leak check for my business."),
};
