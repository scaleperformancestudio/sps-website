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
    perCustomer: "€ 15 per betaalde klant",
    totalLabel: "Jij betaalt deze maand",
    zeroNote: "Aanvragen zonder klant: € 0",
  },
  leaks: {
    eyebrow: "Waar lekt het?",
    titlePre: "Acht dingen die ondernemers ons ",
    titleHighlight: "vragen",
    titlePost: ".",
    body: "Bijna elke vraag komt neer op hetzelfde lek: iemand zoekt je, vindt je niet of haakt af voordat hij boekt. Dit is wat we eraan doen, en wanneer je betaalt.",
    items: [
      { q: "Mensen vinden me niet op Google.", a: "Bedrijfsprofiel op orde, lokale pagina's, foto's en posts. Jij betaalt per klant die belt of boekt." },
      { q: "Mijn site is verouderd.", a: "Nieuwe site die boekt en belt in één tik. Het maandbedrag start pas na je eerste klant erdoor." },
      { q: "Ik wil meer reviews.", a: "Reviewroute met een QR aan de balie en een berichtje na de afspraak. Zit bij zichtbaarheid, kost niets extra." },
      { q: "Ik wil meer aanvragen.", a: "Eigen nummer, eigen formulier, landingspagina. Elke aanvraag zie jij tegelijk met ons." },
      { q: "Mijn omzet daalt en ik weet niet waardoor.", a: "Lek-check van 30 minuten: waar haken klanten af tussen zoeken en boeken? Rapport van één pagina." },
      { q: "Ik wil adverteren op Google of Meta.", a: "Wij beheren, jij betaalt het budget zelf. Onze vergoeding komt uit de klanten die het oplevert." },
      { q: "Ik wil online boeken of bestellen.", a: "Nieuw kanaal erbij. Alles wat daar binnenkomt is nieuw, dus dat is de enige maat." },
      { q: "Ik start net.", a: "Site, Bedrijfsprofiel, reviews en eerste campagne in één keer. Elke klant is er één." },
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
    body: "Een vast bedrag per nieuwe klant die via onze kanalen kwam en bij jou heeft betaald. Altijd ruim onder wat die klant de eerste keer uitgaf, met een plafond per maand dat je vooraf kent.",
    rows: [
      { branche: "Salon, kapper, beauty", price: "€ 15", note: "per betaalde klant" },
      { branche: "Horeca", price: "€ 10", note: "per betaalde gast" },
      { branche: "Praktijk: fysio, tandarts, therapie", price: "€ 25", note: "per betaalde klant" },
      { branche: "Vakman, klus vanaf € 500", price: "€ 50", note: "per betaalde klus" },
      { branche: "Vakman, klus vanaf € 2.000", price: "€ 100", note: "per betaalde klus" },
    ],
    extras: [
      "Herhaalbezoek is van jou, daar betaal je niets over.",
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
      { question: "Is het echt gratis in het begin?", answer: "Ja. De lek-check, het opzetten en de eerste maanden kosten niets. Je krijgt pas een factuur voor klanten die via onze kanalen kwamen en bij jou hebben betaald. Alleen advertentiebudget betaal je zelf, rechtstreeks aan Google of Meta." },
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
    perCustomer: "€15 per paying customer",
    totalLabel: "You pay this month",
    zeroNote: "Enquiries without a customer: €0",
  },
  leaks: {
    eyebrow: "Where does it leak?",
    titlePre: "Eight things business owners ",
    titleHighlight: "ask us",
    titlePost: ".",
    body: "Almost every question comes down to the same leak: someone searches for you, cannot find you, or drops off before booking. Here is what we do about it, and when you pay.",
    items: [
      { q: "People cannot find me on Google.", a: "Business Profile in order, local pages, photos and posts. You pay per customer who calls or books." },
      { q: "My site is outdated.", a: "A new site that books and calls in one tap. The monthly fee only starts after your first customer through it." },
      { q: "I want more reviews.", a: "A review route with a QR at the counter and a message after the appointment. Part of visibility, no extra charge." },
      { q: "I want more enquiries.", a: "Own number, own form, landing page. You see every enquiry the moment we do." },
      { q: "Revenue is dropping and I do not know why.", a: "A 30-minute leak check: where do customers drop off between searching and booking? One-page report." },
      { q: "I want to advertise on Google or Meta.", a: "We manage, you pay the budget yourself. Our fee comes out of the customers it brings." },
      { q: "I want online booking or ordering.", a: "A new channel. Everything that comes in there is new, so that is the only measure." },
      { q: "I am just starting.", a: "Site, Business Profile, reviews and a first campaign in one go. Every customer counts." },
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
    body: "A fixed amount per new customer who came through our channels and paid you. Always well below what that customer spent the first time, with a monthly cap you know in advance.",
    rows: [
      { branche: "Salon, hairdresser, beauty", price: "€15", note: "per paying customer" },
      { branche: "Hospitality", price: "€10", note: "per paying guest" },
      { branche: "Practice: physio, dentist, therapy", price: "€25", note: "per paying customer" },
      { branche: "Tradesperson, job from €500", price: "€50", note: "per paid job" },
      { branche: "Tradesperson, job from €2,000", price: "€100", note: "per paid job" },
    ],
    extras: [
      "Repeat visits are yours, you pay nothing on those.",
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
      { question: "Is it really free at the start?", answer: "Yes. The leak check, the setup and the first months cost nothing. You are only invoiced for customers who came through our channels and paid you. Only ad budget you pay yourself, directly to Google or Meta." },
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
