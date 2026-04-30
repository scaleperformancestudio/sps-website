"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check, ChevronDown, Mail, Minus } from "lucide-react";
import { FadeIn } from "@/components/fade-in";
import { SwipeCarousel } from "@/components/swipe-carousel";
import {
  PackageTier,
  packages,
  creditCostSections,
  comparisonRows,
  topUps,
  addOns,
  mediaBuyingTiers,
  faqs,
} from "@/lib/pricing";

/* ───────────────────────────────────────── */

export default function PricingPage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="container-content pt-24 pb-12 lg:pt-32">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-bright">
            Pricing
          </p>
          <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight text-ink md:text-6xl">
            Pricing built to{" "}
            <span className="bg-gradient-to-r from-[#4ca50a] via-[#2e7f06] to-[#266604] bg-clip-text font-serif font-normal italic text-transparent">
              scale
            </span>{" "}
            with you.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-dim">
            Credit-based, no long-term lock-ins. Pick a monthly pack, redeem
            credits on statics and video, iterate your winners for half the
            cost. Research is included on every package.
          </p>
        </FadeIn>
      </section>

      {/* ─── Package grid ─── */}
      <section className="container-content pb-20">
        <SwipeCarousel
          gridClass="md:grid-cols-2 lg:grid-cols-5"
          gapClass="gap-4 md:gap-5"
        >
          {packages.map((pkg, i) => (
            <FadeIn key={pkg.name} delay={i * 60} className="h-full">
              <PackageCard pkg={pkg} />
            </FadeIn>
          ))}
        </SwipeCarousel>
      </section>

      {/* ─── Credit system ─── */}
      <section className="container-content border-t border-white/5 py-20">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-bright">
            Credit system
          </p>
          <h2 className="mt-6 max-w-3xl text-3xl font-bold tracking-tight text-ink md:text-4xl">
            How credits translate into creative.
          </h2>
          <p className="mt-4 max-w-2xl text-ink-dim">
            One static image = 1 credit. Video pricing is based on format,
            not length — a simple product shot is 2 credits, a scripted brand
            story is 8, a premium cinematic ad is 12. Re-hooking a winner
            (same ad, new angle) costs half — that&apos;s how compounding
            happens.
          </p>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="mt-12 space-y-4">
            {creditCostSections.map((section) => (
              <div
                key={section.title}
                className="overflow-hidden rounded-xl border border-white/[0.06] bg-[#0a0a0a]"
              >
                <div className="border-b border-white/5 bg-white/[0.02] px-5 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-bright">
                    {section.title}
                  </p>
                </div>
                {section.items.map((item, i) => (
                  <div
                    key={item.label}
                    className={`flex items-start justify-between gap-4 px-5 py-4 ${
                      i !== 0 ? "border-t border-white/5" : ""
                    }`}
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-ink md:text-base">
                        {item.label}
                      </p>
                      <p className="mt-0.5 text-xs text-ink-dim/80 md:text-sm">
                        {item.desc}
                      </p>
                    </div>
                    <span className="shrink-0 whitespace-nowrap font-mono text-sm text-brand-bright md:text-base">
                      {item.credits}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={150}>
          <div className="mt-10">
            <SwipeCarousel gridClass="md:grid-cols-3" gapClass="gap-4 md:gap-4">
              <div className="h-full">
                <ExampleCard
                  headline="80 statics"
                  detail="Test a wide range of product images, headlines and value propositions."
                />
              </div>
              <div className="h-full">
                <ExampleCard
                  headline="16 mini commercials"
                  detail="Scripted 2–4 scene ads with product, reaction and call-to-action."
                />
              </div>
              <div className="h-full">
                <ExampleCard
                  headline="A smart mix"
                  detail="Example: 30 statics + 10 UGC videos + 4 mini commercials = 80 credits."
                />
              </div>
            </SwipeCarousel>
          </div>
          <p className="mt-6 text-sm text-ink-dim/70">
            Example shown is based on the 80-credit <span className="text-ink-dim">Growth</span> package. Mix and match as you need.
          </p>
        </FadeIn>
      </section>

      {/* ─── Comparison table ─── */}
      <section className="container-content border-t border-white/5 py-20">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-bright">
            Compare packages
          </p>
          <h2 className="mt-6 max-w-3xl text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Every feature, side by side.
          </h2>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="mt-12 overflow-x-auto rounded-xl border border-white/[0.06] bg-[#0a0a0a]">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-ink-dim/60">
                    Feature
                  </th>
                  {packages.map((pkg) => (
                    <th
                      key={pkg.name}
                      className={`px-4 py-4 text-xs font-semibold uppercase tracking-wider ${
                        pkg.popular ? "text-brand-bright" : "text-ink-dim/60"
                      }`}
                    >
                      {pkg.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, rowIdx) => (
                  <tr
                    key={row.label}
                    className={rowIdx !== 0 ? "border-t border-white/5" : ""}
                  >
                    <td className="px-5 py-3.5 font-medium text-ink">
                      {row.label}
                    </td>
                    {row.values.map((val, i) => (
                      <td
                        key={i}
                        className={`px-4 py-3.5 ${
                          packages[i]?.popular
                            ? "text-ink"
                            : "text-ink-dim"
                        }`}
                      >
                        {typeof val === "boolean" ? (
                          val ? (
                            <Check className="h-4 w-4 text-brand-bright" />
                          ) : (
                            <Minus className="h-4 w-4 text-ink-dim/30" />
                          )
                        ) : (
                          val
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>
      </section>

      {/* ─── Top-ups ─── */}
      <section className="container-content border-t border-white/5 py-20">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-bright">
            Top-ups
          </p>
          <h2 className="mt-6 max-w-3xl text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Need more credits mid-month?
          </h2>
          <p className="mt-4 max-w-2xl text-ink-dim">
            Add credits to your account at any time. Instantly available, same
            60-day validity.
          </p>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="mt-12">
            <SwipeCarousel
              gridClass="md:grid-cols-2 lg:grid-cols-5"
              gapClass="gap-4 md:gap-5"
            >
              {topUps.map((t) => (
                <div
                  key={t.credits}
                  className="relative flex h-full w-full min-h-[300px] flex-col items-center justify-center overflow-hidden rounded-xl border bg-[#0d0d0d] p-8 pt-10 text-center transition-all duration-300 hover:bg-[#111]"
                  style={{ borderColor: `${t.accent}55` }}
                >
                  {/* Colored top accent stroke — same treatment as package cards */}
                  <div
                    className="pointer-events-none absolute inset-x-4 top-0 h-[3px] rounded-b-full"
                    style={{ background: t.accent, opacity: 0.9 }}
                  />

                  {/* Big number */}
                  <p className="text-6xl font-bold tracking-tight text-ink">
                    {t.credits}
                  </p>
                  <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-dim/60">
                    Credits
                  </p>

                  {/* Divider */}
                  <span
                    className="mt-6 block h-px w-12"
                    style={{ background: t.accent, opacity: 0.4 }}
                  />

                  {/* Price */}
                  <p
                    className="mt-5 text-3xl font-bold tracking-tight"
                    style={{ color: t.accent }}
                  >
                    {t.price}
                  </p>
                </div>
              ))}
            </SwipeCarousel>
          </div>
        </FadeIn>
      </section>

      {/* ─── Add-ons ─── */}
      <section className="container-content border-t border-white/5 py-20">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-bright">
            Add-ons
          </p>
          <h2 className="mt-6 max-w-3xl text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Extras when you need them.
          </h2>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="mt-12 overflow-hidden rounded-xl border border-white/[0.06] bg-[#0a0a0a]">
            {addOns.map((a, i) => (
              <div
                key={a.name}
                className={`grid grid-cols-1 gap-1 px-5 py-5 md:grid-cols-[1fr_180px_1.4fr] md:gap-6 md:items-center ${
                  i !== 0 ? "border-t border-white/5" : ""
                }`}
              >
                <p className="font-semibold text-ink">{a.name}</p>
                <p className="font-mono text-sm text-brand-bright">
                  {a.price}
                </p>
                <p className="text-sm text-ink-dim">{a.description}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ─── Media buying ─── */}
      <section className="container-content border-t border-white/5 py-20">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-bright">
            Media buying
          </p>
          <h2 className="mt-6 max-w-3xl text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Optional: we run your{" "}
            <span className="bg-gradient-to-r from-[#4ca50a] via-[#2e7f06] to-[#266604] bg-clip-text font-serif font-normal italic text-transparent">
              paid media
            </span>{" "}
            too.
          </h2>
          <p className="mt-4 max-w-2xl text-ink-dim">
            Media buying is priced separately from creative production. It's
            built for brands that have proven budgets and want the full loop:
            campaigns continuously fed by research-backed creative, optimized
            daily, scaled fast.
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <FadeIn delay={100}>
            <div className="rounded-xl border border-white/[0.06] bg-[#0a0a0a] p-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-ink-dim/60">
                What&apos;s included
              </p>
              <ul className="mt-5 space-y-3 text-ink">
                {[
                  "Campaign setup and account structure",
                  "Daily monitoring and optimization",
                  "Scaling strategies based on performance data",
                  "Creative testing framework integration",
                  "Data feedback loop into creative production",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-bright" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-8 text-sm font-semibold uppercase tracking-wider text-ink-dim/60">
                Requirements
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Requirement
                  label="Min. ad spend"
                  value="€500/day (€15k/month)"
                />
                <Requirement
                  label="Stable budget"
                  value="No frequent pausing"
                />
                <Requirement
                  label="Creative production"
                  value="Must use our system"
                />
                <Requirement
                  label="Account access"
                  value="Ad accounts & tracking"
                />
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={150}>
            <div className="rounded-xl border border-white/[0.06] bg-[#0a0a0a] p-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-ink-dim/60">
                Management fee
              </p>
              <p className="mt-3 text-sm text-ink-dim">
                Automatically adjusts based on total monthly ad spend.
              </p>

              <div className="mt-6 space-y-3">
                {mediaBuyingTiers.map((tier, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg border border-white/[0.04] bg-[#111] px-4 py-3.5"
                  >
                    <span className="text-sm text-ink">{tier.spend}</span>
                    <span className="font-mono text-sm text-brand-bright">
                      {tier.fee}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-xs text-ink-dim/60">
                Creatives are <span className="text-ink-dim">not</span>{" "}
                included in media buying fees. You need an active creative
                package to run media buying.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="container-content border-t border-white/5 py-20">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-bright">
            FAQ
          </p>
          <h2 className="mt-6 max-w-3xl text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Questions, answered.
          </h2>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="mt-10 divide-y divide-white/5">
            {faqs.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="container-content border-t border-white/5 py-20 pb-32">
        <FadeIn>
          <div className="rounded-2xl border border-brand-bright/20 bg-gradient-to-br from-brand-bright/[0.08] via-transparent to-transparent p-10 md:p-14">
            <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-ink md:text-4xl">
              Ready to{" "}
              <span className="bg-gradient-to-r from-[#4ca50a] via-[#2e7f06] to-[#266604] bg-clip-text font-serif font-normal italic text-transparent">
                scale
              </span>{" "}
              your creative production?
            </h2>
            <p className="mt-4 max-w-xl text-ink-dim">
              Pick a package, brief us on your product, launch ads within days.
              Or reach out and we&apos;ll help you find the right fit.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/start"
                className="group rounded-full bg-brand-bright px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-brand hover:shadow-[0_0_30px_rgba(46,127,6,0.35)] hover:scale-[1.03] active:scale-[0.98]"
              >
                Start a project
              </Link>
              <a
                href="mailto:admin@scaleperformancestudio.com"
                className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-ink transition-all duration-300 hover:border-brand-bright/60 hover:bg-brand-bright/5"
              >
                <Mail className="h-4 w-4 text-brand-bright" aria-hidden="true" />
                Email us directly
                <ArrowRight className="h-4 w-4 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
              </a>
              <a
                href="https://wa.me/31611727850?text=Hi%20SPS%2C%20I%27d%20like%20to%20talk%20about%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-ink transition-all duration-300 hover:border-brand-bright/60 hover:bg-brand-bright/5"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4 text-brand-bright"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.1-.471-.15-.67.148-.197.297-.767.966-.94 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.15-.174.198-.298.298-.497.1-.199.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488" />
                </svg>
                WhatsApp us
                <ArrowRight className="h-4 w-4 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={120}>
          <div className="mt-12 grid gap-4 rounded-xl border border-white/5 bg-[#0a0a0a] p-6 text-sm text-ink-dim/70 md:grid-cols-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-dim/60 md:col-span-2">
              Terms
            </p>
            <p>Credits are valid for 60 days from date of purchase.</p>
            <p>One revision per creative included; extras priced per credit.</p>
            <p>Briefings must be complete before production begins.</p>
            <p>All creatives remain the property of the client upon delivery.</p>
          </div>
        </FadeIn>
      </section>
    </>
  );
}

/* ─── Package card ─── */
function PackageCard({ pkg }: { pkg: PackageTier }) {
  const { popular, accent } = pkg;

  return (
    <div
      className={`relative flex h-full flex-col rounded-xl border bg-[#0d0d0d] p-6 pt-8 transition-all duration-300 ${
        popular
          ? "border-brand-bright/50 shadow-[0_0_40px_rgba(46,127,6,0.15)]"
          : "border-white/[0.06] hover:border-white/15"
      }`}
      style={
        popular
          ? {
              backgroundImage: `linear-gradient(to bottom, rgba(46,127,6,0.10), #0d0d0d 55%)`,
            }
          : undefined
      }
    >
      {/* Metal tier accent — top stroke inset from rounded corners */}
      <div
        className="pointer-events-none absolute inset-x-4 top-0 h-[3px] rounded-b-full"
        style={{ background: accent, opacity: 0.9 }}
      />

      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex whitespace-nowrap rounded-full border border-brand-bright/60 bg-brand-bright px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg shadow-brand-bright/40">
            Most popular
          </span>
        </div>
      )}

      <div>
        <p
          className="text-xs font-semibold uppercase tracking-[0.2em]"
          style={{ color: accent }}
        >
          {pkg.name}
        </p>
        <p className="mt-2 text-[13px] text-ink-dim">{pkg.credits}</p>
      </div>

      <div className="mt-5">
        <p className="text-4xl font-bold tracking-tight text-ink">
          {pkg.price}
        </p>
        <p className="mt-1 text-xs text-ink-dim/70">{pkg.priceLabel}</p>
      </div>

      <p className="mt-5 min-h-[40px] text-sm text-ink-dim">{pkg.tagline}</p>

      <ul className="mt-6 flex-1 space-y-2.5">
        {pkg.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-[13px] text-ink">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-bright" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <Link
        href="/start"
        className={`mt-8 inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
          popular
            ? "bg-brand-bright text-white hover:bg-brand hover:shadow-[0_0_20px_rgba(46,127,6,0.35)]"
            : "border border-white/10 text-ink hover:border-brand-bright/40 hover:bg-brand-bright/5"
        }`}
      >
        {pkg.cta}
      </Link>
    </div>
  );
}

/* ─── Example card (credit system) ─── */
function ExampleCard({ headline, detail }: { headline: string; detail: string }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#0d0d0d] p-6">
      <p className="text-xl font-bold text-ink">{headline}</p>
      <p className="mt-3 text-sm text-ink-dim">{detail}</p>
    </div>
  );
}

/* ─── Requirement chip (media buying) ─── */
function Requirement({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/[0.04] bg-[#111] px-4 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-dim/60">
        {label}
      </p>
      <p className="mt-1 text-sm text-ink">{value}</p>
    </div>
  );
}

/* ─── FAQ accordion item ─── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="group">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-6 text-left transition-opacity duration-300"
      >
        <span
          className={`text-lg font-semibold transition-colors duration-300 md:text-xl ${
            open ? "text-ink" : "text-ink-dim group-hover:text-ink"
          }`}
        >
          {q}
        </span>
        <ChevronDown
          className={`ml-4 h-5 w-5 shrink-0 text-ink-dim transition-transform duration-300 ${
            open ? "rotate-180 text-brand-bright" : ""
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ${
          open ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="max-w-3xl text-ink-dim/80">{a}</p>
        </div>
      </div>
    </div>
  );
}
