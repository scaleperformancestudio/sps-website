import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  MessageCircle,
  Search,
  Clock,
  PhoneMissed,
  Star,
  TrendingDown,
  Rocket,
  Phone,
  FileText,
  ClipboardCheck,
} from "lucide-react";
import { FadeIn } from "@/components/fade-in";
import { HeroWaves } from "@/components/hero-waves";
import { PayWhenItWorks } from "@/components/pay-when-it-works";
import { StepsPath } from "@/components/steps-path";
import { SwipeCarousel } from "@/components/swipe-carousel";
import { WebsiteTransform } from "@/components/website-transform";
import { BillingSwitch } from "@/components/billing-switch";
import { FaqAccordion } from "@/components/faq-accordion";
import { LanguageSwitcher } from "@/components/language-switcher";
import { homeContent, homeWhatsapp } from "@/app/home-content";
import { content as websitesContent, type Locale } from "@/app/websites/content";

/**
 * De homepage sinds 26 september 2026: het resultaatmodel ("je betaalt pas
 * als het werkt") voor lokale ondernemers. Zelfde stijl als de rest van de
 * site: zwart, Inter, Instrument Serif cursief voor het accentwoord, drie
 * groenen, golfjes-lijnen tussen de secties. De e-commerce-homepage staat
 * ongewijzigd op /ecommerce.
 */

const HIGHLIGHT =
  "bg-gradient-to-r from-[#4ca50a] via-[#2e7f06] to-[#266604] bg-clip-text font-serif font-normal italic text-transparent";
const LEAK_ICONS = [CalendarDays, MessageCircle, Search, Clock, PhoneMissed, Star, TrendingDown, Rocket];
const MEASURE_ICONS = [Phone, FileText, ClipboardCheck];
const PRIMARY =
  "group inline-flex items-center gap-2 rounded-full bg-brand-bright px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-brand hover:shadow-[0_0_30px_rgba(46,127,6,0.4)] hover:scale-[1.03] active:scale-[0.98]";
const SECONDARY =
  "group inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-ink transition-all duration-300 hover:border-brand-bright/60 hover:bg-brand-bright/5";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.1-.471-.15-.67.148-.197.297-.767.966-.94 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.15-.174.198-.298.298-.497.1-.199.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488" />
    </svg>
  );
}

function SectionHead({
  eyebrow,
  pre,
  highlight,
  post,
  body,
}: {
  eyebrow: string;
  pre: string;
  highlight?: string;
  post?: string;
  body?: string;
}) {
  return (
    <div className="mb-12 text-center sm:mb-16">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-bright">{eyebrow}</p>
      <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">
        {pre}
        {highlight && <span className={HIGHLIGHT}>{highlight}</span>}
        {post}
      </h2>
      {body && <p className="mx-auto mt-4 max-w-2xl text-sm text-ink-dim sm:text-base">{body}</p>}
    </div>
  );
}

export function LocalHome({ locale }: { locale: Locale }) {
  const t = homeContent[locale];
  const w = websitesContent[locale];
  const wa = homeWhatsapp[locale];
  const ctaHref = t.nav.ctaHref;

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -left-40 -top-40 h-[600px] w-[600px] animate-pulse-slow rounded-full bg-brand-dark/20 blur-[120px]" />
          <div className="absolute -right-20 top-1/3 h-[500px] w-[500px] animate-pulse-slow rounded-full bg-brand-bright/15 blur-[100px]" style={{ animationDelay: "2s" }} />
        </div>
        <HeroWaves />
        <div className="grain pointer-events-none absolute inset-0" />

        <div className="container-content relative grid grid-cols-[minmax(0,1fr)] items-center gap-14 pt-20 pb-16 sm:pt-24 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16 lg:pt-32 lg:pb-24">
          <div className="min-w-0">
            <FadeIn delay={100}>
              <div className="flex items-start justify-between gap-4">
                <p className="inline-flex items-center gap-2 rounded-full border border-brand-bright/30 bg-brand-bright/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-bright">
                  {t.hero.eyebrow}
                </p>
                <LanguageSwitcher current={locale} hrefFor={(loc) => (loc === "nl" ? "/" : "/en")} />
              </div>
            </FadeIn>
            <FadeIn delay={250}>
              <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl md:leading-[1.05] lg:text-6xl">
                {t.hero.titlePre}
                <span className={HIGHLIGHT}>{t.hero.titleHighlight}</span>
                {t.hero.titlePost}
              </h1>
            </FadeIn>
            <FadeIn delay={400}>
              <p className="mt-6 max-w-2xl text-base text-ink-dim sm:text-lg md:text-xl">{t.hero.body}</p>
            </FadeIn>
            <FadeIn delay={550}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href={ctaHref} className={PRIMARY}>
                  {t.hero.ctaPrimary}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <a href={wa} target="_blank" rel="noopener noreferrer" className={SECONDARY}>
                  <WhatsAppIcon className="h-4 w-4 text-brand-bright" />
                  {t.hero.ctaSecondary}
                </a>
              </div>
            </FadeIn>
            <FadeIn delay={700}>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-ink-dim/70">
                {t.hero.trust.map((s) => (
                  <li key={s} className="inline-flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-bright shadow-[0_0_6px_rgba(46,127,6,0.8)]" />
                    {s}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
          <FadeIn delay={500} direction="up" distance={40} className="min-w-0">
            <PayWhenItWorks labels={t.report} />
          </FadeIn>
        </div>
        <div className="wave-divider" />
      </section>

      {/* ─── WAAR LEKT HET ─── */}
      <section id="oplossen" className="container-content scroll-mt-20 py-16 sm:py-24 lg:py-32">
        <FadeIn>
          <SectionHead eyebrow={t.leaks.eyebrow} pre={t.leaks.titlePre} highlight={t.leaks.titleHighlight} post={t.leaks.titlePost} body={t.leaks.body} />
        </FadeIn>
        <SwipeCarousel gridClass="md:grid-cols-2 lg:grid-cols-4" gapClass="gap-4 md:gap-5">
          {t.leaks.items.map((item, i) => {
            const Icon = LEAK_ICONS[i];
            return (
              <FadeIn key={item.q} delay={i * 80} className="h-full">
                <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-bg-card p-6 transition-all duration-500 hover:border-brand-bright/40 hover:shadow-[0_0_40px_rgba(46,127,6,0.08)]">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-bright/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="inline-flex w-fit rounded-xl border border-brand-bright/20 bg-brand-bright/10 p-2.5 text-brand-bright">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-5 font-serif text-2xl italic leading-snug text-ink">{item.q}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-dim">{item.a}</p>
                  <div className="mt-auto pt-6">
                    <div className="h-px w-full bg-white/[0.06]">
                      <div className="h-px w-0 bg-brand-bright transition-all duration-700 ease-out group-hover:w-full" />
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </SwipeCarousel>
      </section>

      <div className="wave-divider" />

      {/* ─── ZO WERKT HET ─── */}
      <section id="zo-werkt-het" className="container-content scroll-mt-20 py-16 sm:py-24 lg:py-32">
        <FadeIn>
          <SectionHead eyebrow={t.how.eyebrow} pre={t.how.titlePre} highlight={t.how.titleHighlight} post={t.how.titlePost} />
        </FadeIn>
        <StepsPath steps={t.how.steps} notDo={t.how.notDo} />
      </section>

      <div className="wave-divider" />

      {/* ─── EERLIJK METEN ─── */}
      <section id="meten" className="container-content scroll-mt-20 py-16 sm:py-24 lg:py-32">
        <FadeIn>
          <SectionHead eyebrow={t.measure.eyebrow} pre={t.measure.title} />
        </FadeIn>
        <SwipeCarousel gridClass="md:grid-cols-3" gapClass="gap-4 md:gap-5">
          {t.measure.pillars.map((p, i) => {
            const Icon = MEASURE_ICONS[i];
            return (
              <FadeIn key={p.title} delay={i * 120} className="h-full">
                <div className="group relative h-full overflow-hidden rounded-3xl border border-white/[0.07] bg-[#0a0a0a] p-7 transition-all duration-500 hover:border-brand-bright/30 md:p-8">
                  <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-brand-bright/[0.05] blur-3xl" />
                  <div className="relative">
                    <div className="inline-flex rounded-xl border border-brand-bright/20 bg-brand-bright/10 p-2.5 text-brand-bright">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-xl font-bold text-ink">{p.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-dim">{p.body}</p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </SwipeCarousel>
        <FadeIn delay={300}>
          <p className="mx-auto mt-10 max-w-2xl text-center font-serif text-2xl italic text-ink">{t.measure.rule}</p>
        </FadeIn>
      </section>

      <div className="wave-divider" />

      {/* ─── PRIJZEN ─── */}
      <section id="prijzen" className="container-content scroll-mt-20 py-16 sm:py-24 lg:py-32">
        <FadeIn>
          <SectionHead eyebrow={t.pricing.eyebrow} pre={t.pricing.titlePre} highlight={t.pricing.titleHighlight} post={t.pricing.titlePost} body={t.pricing.body} />
        </FadeIn>
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <FadeIn>
            <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0a0a0a]">
              <ul className="divide-y divide-white/[0.06]">
                {t.pricing.rows.map((r) => (
                  <li key={r.branche} className="flex items-center justify-between gap-4 px-6 py-5 transition-colors hover:bg-white/[0.02] md:px-8">
                    <span className="text-sm text-ink md:text-base">{r.branche}</span>
                    <span className="text-right">
                      <span className="font-mono text-2xl font-bold text-brand-bright md:text-3xl">{r.price}</span>
                      <span className="block text-[11px] uppercase tracking-wider text-ink-dim/60">{r.note}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
          <FadeIn delay={150}>
            <div className="h-full rounded-3xl border border-brand-bright/25 bg-brand-bright/[0.04] p-7 md:p-8">
              <ul className="space-y-4">
                {t.pricing.extras.map((e) => (
                  <li key={e} className="flex items-start gap-3 text-sm text-ink-muted">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-bright" />
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>

        <FadeIn>
          <div className="mt-20 text-center">
            <h3 className="text-2xl font-bold text-ink md:text-3xl">{t.pricing.websiteTitle}</h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-ink-dim sm:text-base">{t.pricing.websiteBody}</p>
          </div>
        </FadeIn>
        <div className="mt-10">
          <BillingSwitch packages={w.websitePackages} labels={w.billing} popularLabel={w.websites.popularLabel} />
        </div>
      </section>

      <div className="wave-divider" />

      {/* ─── VEROUDERDE SITE (bestaande voor/na-animatie) ─── */}
      <section className="container-content py-16 sm:py-24 lg:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_auto] lg:gap-20">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-bright">{t.transform.eyebrow}</p>
            <h2 className="mt-3 max-w-xl text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">{t.transform.title}</h2>
            <p className="mt-5 max-w-xl text-ink-dim">{t.transform.body}</p>
            <Link href={ctaHref} className={`${PRIMARY} mt-8`}>
              {t.hero.ctaPrimary}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </FadeIn>
          <FadeIn delay={200} className="pt-8">
            <WebsiteTransform labels={w.heroAnim} />
          </FadeIn>
        </div>
      </section>

      <div className="wave-divider" />

      {/* ─── WIE WIJ ZIJN ─── */}
      <section id="wie" className="container-content scroll-mt-20 py-16 sm:py-24 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-bright">{t.who.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">{t.who.title}</h2>
            {t.who.body.map((line) => (
              <p key={line.slice(0, 20)} className="mt-5 text-ink-dim">{line}</p>
            ))}
            <ul className="mt-8 flex flex-wrap gap-2">
              {t.who.facts.map((f) => (
                <li key={f} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-semibold text-ink-dim">{f}</li>
              ))}
            </ul>
          </FadeIn>
          <div className="grid gap-5 sm:grid-cols-2">
            {t.who.people.map((p, i) => (
              <FadeIn key={p.name} delay={i * 150} className="h-full">
                <div className="group h-full rounded-3xl border border-white/[0.08] bg-[#0a0a0a] p-5 transition-all duration-500 hover:border-brand-bright/30">
                  {p.image ? (
                    <img src={p.image} alt={p.name} width={720} height={720} loading="lazy" className="aspect-square w-full rounded-2xl object-cover" />
                  ) : (
                    <div className="flex aspect-square w-full items-center justify-center rounded-2xl border border-brand-bright/20 bg-gradient-to-br from-[#1c5102] via-[#0f2a04] to-[#0a0a0a] font-serif text-7xl italic text-ink/90">
                      {p.initial}
                    </div>
                  )}
                  <p className="mt-5 text-lg font-bold text-ink">{p.name}</p>
                  <p className="mt-1 text-sm text-ink-dim">{p.role}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <div className="wave-divider" />

      {/* ─── VRAGEN ─── */}
      <section id="faq" className="container-content scroll-mt-20 py-16 sm:py-24 lg:py-32">
        <FadeIn>
          <SectionHead eyebrow={t.faq.eyebrow} pre={t.faq.title} />
        </FadeIn>
        <FadeIn delay={200}>
          <div className="mx-auto max-w-3xl">
            <FaqAccordion items={t.faq.items} />
          </div>
        </FadeIn>
      </section>

      <div className="wave-divider" />

      {/* ─── CTA ─── */}
      <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 animate-pulse-slow rounded-full bg-brand/20 blur-[100px]" />
        </div>
        <FadeIn>
          <div className="container-content relative mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-6xl">{t.cta.title}</h2>
            <p className="mt-5 text-base text-ink-dim sm:mt-6 sm:text-lg">{t.cta.body}</p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link href={ctaHref} className={PRIMARY}>
                {t.cta.primary}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <a href={wa} target="_blank" rel="noopener noreferrer" className={SECONDARY}>
                <WhatsAppIcon className="h-4 w-4 text-brand-bright" />
                {t.cta.secondary}
              </a>
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
