import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/fade-in";
import { SwipeCarousel } from "@/components/swipe-carousel";
import { PackageCard } from "@/components/package-card";
import { LanguageSwitcher } from "@/components/language-switcher";
import { WebsiteTransform } from "@/components/website-transform";
import { content, locales, isLocale, type Locale } from "../content";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  if (!isLocale(params.locale)) return {};
  const { meta } = content[params.locale];
  return { title: meta.title, description: meta.description };
}

const HIGHLIGHT =
  "bg-gradient-to-r from-[#4ca50a] via-[#2e7f06] to-[#266604] bg-clip-text font-serif font-normal italic text-transparent";

export default function WebsitesLocalePage({
  params,
}: {
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const t = content[locale];

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="container-content pt-24 pb-12 lg:pt-28">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_auto] lg:gap-20">
          <FadeIn>
            <div className="flex items-start justify-between gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-bright">
                {t.hero.eyebrow}
              </p>
              <LanguageSwitcher current={locale} />
            </div>
            <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight text-ink md:text-6xl">
              {t.hero.titlePre}
              <span className={HIGHLIGHT}>{t.hero.titleHighlight}</span>
              {t.hero.titlePost}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-ink-dim">{t.hero.body}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={t.websitePackages[0].ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-brand-bright px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-brand hover:shadow-[0_0_20px_rgba(46,127,6,0.35)]"
              >
                {t.hero.ctaAudit}
              </a>
              <a
                href="https://calendly.com/admin-scaleperformancestudio/kennismaking-15-min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-brand-bright/40 px-6 py-3 text-sm font-semibold text-ink transition-all duration-300 hover:border-brand-bright hover:bg-brand-bright/5"
              >
                {t.hero.ctaCall}
              </a>
              <a
                href="#websites"
                className="inline-flex items-center justify-center rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-ink transition-all duration-300 hover:border-brand-bright/40 hover:bg-brand-bright/5"
              >
                {t.hero.ctaPackages}
              </a>
            </div>
          </FadeIn>
          <FadeIn delay={150} className="hidden justify-self-center md:block">
            <WebsiteTransform labels={t.heroAnim} />
          </FadeIn>
        </div>
      </section>

      {/* ─── Website packages ─── */}
      <section
        id="websites"
        className="container-content scroll-mt-20 border-t border-white/5 py-20"
      >
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-bright">
            {t.websites.eyebrow}
          </p>
          <h2 className="mt-6 max-w-3xl text-3xl font-bold tracking-tight text-ink md:text-4xl">
            {t.websites.titlePre}
            <span className={HIGHLIGHT}>{t.websites.titleHighlight}</span>
            {t.websites.titlePost}
          </h2>
          <p className="mt-4 max-w-2xl text-ink-dim">{t.websites.body}</p>
        </FadeIn>
        <div className="mt-12">
          <SwipeCarousel gridClass="md:grid-cols-3" gapClass="gap-4 md:gap-5">
            {t.websitePackages.map((pkg, i) => (
              <FadeIn key={pkg.name} delay={i * 60} className="h-full">
                <PackageCard pkg={pkg} popularLabel={t.websites.popularLabel} />
              </FadeIn>
            ))}
          </SwipeCarousel>
        </div>
      </section>

      {/* ─── Social packages ─── */}
      <section
        id="social"
        className="container-content scroll-mt-20 border-t border-white/5 py-20"
      >
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-bright">
            {t.social.eyebrow}
          </p>
          <h2 className="mt-6 max-w-3xl text-3xl font-bold tracking-tight text-ink md:text-4xl">
            {t.social.titlePre}
            <span className={HIGHLIGHT}>{t.social.titleHighlight}</span>
            {t.social.titlePost}
          </h2>
          <p className="mt-4 max-w-2xl text-ink-dim">{t.social.body}</p>
        </FadeIn>
        <div className="mt-12">
          <SwipeCarousel gridClass="md:grid-cols-3" gapClass="gap-4 md:gap-5">
            {t.socialPackages.map((pkg, i) => (
              <FadeIn key={pkg.name} delay={i * 60} className="h-full">
                <PackageCard pkg={pkg} popularLabel={t.social.popularLabel} />
              </FadeIn>
            ))}
          </SwipeCarousel>
        </div>
      </section>

      {/* ─── How it works ─── */}
      <section
        id="how-it-works"
        className="container-content scroll-mt-20 border-t border-white/5 py-20"
      >
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-bright">
            {t.how.eyebrow}
          </p>
          <h2 className="mt-6 max-w-3xl text-3xl font-bold tracking-tight text-ink md:text-4xl">
            {t.how.title}
          </h2>
        </FadeIn>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.how.steps.map((s, i) => (
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
                {t.ctaBand.title}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-ink-dim">
                {t.ctaBand.body}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a
                  href={t.websitePackages[0].ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-brand-bright px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-brand hover:shadow-[0_0_20px_rgba(46,127,6,0.35)]"
                >
                  {t.ctaBand.ctaAudit}
                </a>
                <a
                  href="https://calendly.com/admin-scaleperformancestudio/kennismaking-15-min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-brand-bright/40 px-6 py-3 text-sm font-semibold text-ink transition-all duration-300 hover:border-brand-bright hover:bg-brand-bright/5"
                >
                  {t.ctaBand.ctaCall}
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
