import type { Metadata } from "next";
import { FadeIn } from "@/components/fade-in";
import { SwipeCarousel } from "@/components/swipe-carousel";
import { PackageCard } from "@/components/package-card";
import { websitePackages, socialPackages } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Websites & Social voor lokale bedrijven — Scale Performance Studio",
  description:
    "Een nieuwe, snelle website die converteert — vast bedrag, klaar in een week. Plus social media op autopilot. Voor lokale bedrijven in Nederland.",
};

const WHATSAPP_AUDIT =
  "https://wa.me/31611727850?text=Hi%20SPS%2C%20ik%20wil%20graag%20een%20gratis%20website-audit%20voor%20mijn%20zaak.";

const steps = [
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
];

export default function WebsitesPage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="container-content pt-24 pb-12 lg:pt-32">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-bright">
            Websites &amp; Social · voor lokale bedrijven
          </p>
          <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight text-ink md:text-6xl">
            Een nieuwe site die{" "}
            <span className="bg-gradient-to-r from-[#4ca50a] via-[#2e7f06] to-[#266604] bg-clip-text font-serif font-normal italic text-transparent">
              converteert
            </span>
            . Klaar in een week.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-dim">
            Voor lokale bedrijven met een verouderde of trage website. Vast
            bedrag, mobiel-first, met online boeken erin — en daarna social media
            en advertenties als je wilt groeien.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={WHATSAPP_AUDIT}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-brand-bright px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-brand hover:shadow-[0_0_20px_rgba(46,127,6,0.35)]"
            >
              Vraag een gratis audit aan
            </a>
            <a
              href="#websites"
              className="inline-flex items-center justify-center rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-ink transition-all duration-300 hover:border-brand-bright/40 hover:bg-brand-bright/5"
            >
              Bekijk de pakketten
            </a>
          </div>
        </FadeIn>
      </section>

      {/* ─── Website packages ─── */}
      <section
        id="websites"
        className="container-content border-t border-white/5 py-20"
      >
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-bright">
            Websites
          </p>
          <h2 className="mt-6 max-w-3xl text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Een site die klanten{" "}
            <span className="bg-gradient-to-r from-[#4ca50a] via-[#2e7f06] to-[#266604] bg-clip-text font-serif font-normal italic text-transparent">
              binnenbrengt
            </span>
            .
          </h2>
          <p className="mt-4 max-w-2xl text-ink-dim">
            Vast bedrag, klaar in een week — online boeken inbegrepen.
          </p>
        </FadeIn>
        <div className="mt-12">
          <SwipeCarousel gridClass="md:grid-cols-3" gapClass="gap-4 md:gap-5">
            {websitePackages.map((pkg, i) => (
              <FadeIn key={pkg.name} delay={i * 60} className="h-full">
                <PackageCard pkg={pkg} popularLabel="Meest gekozen" />
              </FadeIn>
            ))}
          </SwipeCarousel>
        </div>
      </section>

      {/* ─── Social packages ─── */}
      <section className="container-content border-t border-white/5 py-20">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-bright">
            Social media
          </p>
          <h2 className="mt-6 max-w-3xl text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Content &amp; beheer, op{" "}
            <span className="bg-gradient-to-r from-[#4ca50a] via-[#2e7f06] to-[#266604] bg-clip-text font-serif font-normal italic text-transparent">
              autopilot
            </span>
            .
          </h2>
          <p className="mt-4 max-w-2xl text-ink-dim">
            Wij maken het contentplan, produceren de posts en reels, en beheren
            je kanalen — zodat jij je op je zaak kunt richten.
          </p>
        </FadeIn>
        <div className="mt-12">
          <SwipeCarousel gridClass="md:grid-cols-3" gapClass="gap-4 md:gap-5">
            {socialPackages.map((pkg, i) => (
              <FadeIn key={pkg.name} delay={i * 60} className="h-full">
                <PackageCard pkg={pkg} popularLabel="Meest gekozen" />
              </FadeIn>
            ))}
          </SwipeCarousel>
        </div>
      </section>

      {/* ─── Hoe het werkt ─── */}
      <section className="container-content border-t border-white/5 py-20">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-bright">
            Hoe het werkt
          </p>
          <h2 className="mt-6 max-w-3xl text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Van audit tot live in een week.
          </h2>
        </FadeIn>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <FadeIn key={s.n} delay={i * 60} className="h-full">
              <div className="flex h-full flex-col rounded-xl border border-white/[0.06] bg-[#0d0d0d] p-6">
                <p className="font-serif text-3xl italic text-brand-bright">
                  {s.n}
                </p>
                <p className="mt-3 text-base font-semibold text-ink">
                  {s.title}
                </p>
                <p className="mt-2 text-sm text-ink-dim">{s.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ─── CTA band ─── */}
      <section className="container-content border-t border-white/5 py-20">
        <FadeIn>
          <div className="relative overflow-hidden rounded-2xl border border-brand-bright/30 bg-[#0d0d0d] p-10 text-center">
            <div
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 50% 0%, rgba(46,127,6,0.18), transparent 60%)",
              }}
            />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-ink md:text-4xl">
                Benieuwd hoe jouw site eruit kan zien?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-ink-dim">
                Stuur ons je huidige website — je krijgt gratis een voorbeeld van
                de nieuwe versie. Geen verplichting.
              </p>
              <div className="mt-8 flex justify-center">
                <a
                  href={WHATSAPP_AUDIT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-brand-bright px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-brand hover:shadow-[0_0_20px_rgba(46,127,6,0.35)]"
                >
                  Vraag een gratis audit aan via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
