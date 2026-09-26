import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/fade-in";
import { LanguageSwitcher } from "@/components/language-switcher";
import { LekCheckForm } from "@/components/lek-check-form";
import { content, locales, isLocale, type Locale } from "../../content";

// De pagina achter de flyer en de QR-code. Bereikbaar als
// scaleperformancestudio.com/lek-check (doorgestuurd in next.config).
// ?van=emre of ?van=emin zet de naam van wie langs was bovenaan.

const WHATSAPP = "31611727850";
const NAMES: Record<string, string> = { emre: "Emre", emin: "Emin" };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const { meta } = content[params.locale].lekCheck;
  return { title: meta.title, description: meta.description };
}

export default function LekCheckPage({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams: { van?: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const t = content[locale].lekCheck;
  const via = searchParams?.van && NAMES[searchParams.van] ? searchParams.van : undefined;
  const whatsappHref = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(t.whatsapp.prefill)}`;

  return (
    <>
      <section className="container-content pt-24 pb-10 lg:pt-28">
        <FadeIn>
          <div className="flex items-start justify-between gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-bright">{t.eyebrow}</p>
            <LanguageSwitcher current={locale} />
          </div>
          {via && (
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-brand-bright/30 bg-brand-bright/[0.06] px-4 py-1.5 text-sm text-ink">
              <img src="/emre.jpg" alt="" width={24} height={24} className="h-6 w-6 rounded-full object-cover" />
              {t.viaLine.replace("{name}", NAMES[via])}
            </p>
          )}
          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-ink md:text-5xl">{t.title}</h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-dim">{t.body}</p>
        </FadeIn>
      </section>

      <section className="container-content pb-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
          <FadeIn>
            <div className="rounded-2xl border border-brand-bright/30 bg-[#0d0d0d] p-8">
              <h2 className="text-xl font-bold text-ink">{t.whatsapp.title}</h2>
              <p className="mt-3 text-sm text-ink-dim">{t.whatsapp.body}</p>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-bright px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-brand hover:shadow-[0_0_20px_rgba(46,127,6,0.35)]"
              >
                {t.whatsapp.cta}
              </a>
              <ol className="mt-10 space-y-5">
                {t.steps.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-brand-bright/40 text-sm font-semibold text-brand-bright">{i + 1}</span>
                    <div>
                      <p className="font-semibold text-ink">{s.title}</p>
                      <p className="mt-1 text-sm text-ink-dim">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="mt-8 text-sm font-semibold text-ink">{t.notDo}</p>
            </div>
          </FadeIn>
          <FadeIn delay={120}>
            <div className="rounded-2xl border border-white/10 bg-bg-card/40 p-8">
              <LekCheckForm labels={t.form} locale={locale} via={via} whatsappHref={whatsappHref} whatsappCta={t.whatsapp.cta} />
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
