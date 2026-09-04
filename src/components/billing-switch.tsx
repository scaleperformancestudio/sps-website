"use client";

import { useState } from "react";
import { SwipeCarousel } from "./swipe-carousel";
import { PackageCard } from "./package-card";
import type { PackageTier, BillingMode } from "@/lib/pricing";

export interface BillingLabels {
  legend: string;
  once: string;
  monthly: string;
  yearly: string;
  yearlyBadge: string;
}

/**
 * Betaalvorm-schakelaar boven de websitepakketten.
 *
 * Staat standaard op "per maand": dat is de laagste drempel om te beginnen en
 * het enige model dat een doorlopende band met de klant oplevert, en die band
 * is precies wat er ontbreekt bij een eenmalige verkoop aan een vreemde.
 */
export function BillingSwitch({
  packages,
  labels,
  popularLabel,
  defaultMode = "monthly",
  modes = ["monthly", "yearly", "once"],
}: {
  packages: PackageTier[];
  labels: BillingLabels;
  popularLabel?: string;
  defaultMode?: BillingMode;
  /** Welke standen de schakelaar toont. Social kent geen eenmalig: doorlopende
   *  content stopt met leveren zodra je stopt met betalen, dus die knop zou een
   *  belofte doen die het pakket niet waarmaakt. */
  modes?: BillingMode[];
}) {
  const [mode, setMode] = useState<BillingMode>(defaultMode);

  const alle: { key: BillingMode; label: string; badge?: string }[] = [
    { key: "monthly", label: labels.monthly },
    { key: "yearly", label: labels.yearly, badge: labels.yearlyBadge },
    { key: "once", label: labels.once },
  ];
  const opties = alle.filter((o) => modes.includes(o.key));

  return (
    <div>
      <div
        role="radiogroup"
        aria-label={labels.legend}
        className="mt-8 inline-flex flex-wrap items-center gap-1 rounded-full border border-white/10 bg-[#0d0d0d] p-1"
      >
        {opties.map((o) => {
          const actief = mode === o.key;
          return (
            <button
              key={o.key}
              type="button"
              role="radio"
              aria-checked={actief}
              onClick={() => setMode(o.key)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-bright ${
                actief
                  ? "bg-brand-bright text-white"
                  : "text-ink-dim hover:text-ink"
              }`}
            >
              {o.label}
              {o.badge && (
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    actief
                      ? "bg-white/20 text-white"
                      : "bg-brand-bright/15 text-brand-bright"
                  }`}
                >
                  {o.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-8">
        <SwipeCarousel gridClass="md:grid-cols-3" gapClass="gap-4 md:gap-5">
          {packages.map((pkg) => (
            <div key={pkg.name} className="h-full">
              <PackageCard pkg={pkg} popularLabel={popularLabel} mode={mode} />
            </div>
          ))}
        </SwipeCarousel>
      </div>
    </div>
  );
}
