import Link from "next/link";
import { Check } from "lucide-react";
import { PackageTier } from "@/lib/pricing";

/* ─── Package card ─── */
export function PackageCard({
  pkg,
  popularLabel = "Most popular",
}: {
  pkg: PackageTier;
  popularLabel?: string;
}) {
  const { popular, accent } = pkg;
  const ctaHref = pkg.ctaHref ?? "/start";
  const ctaExternal = ctaHref.startsWith("http");
  const ctaClass = `mt-8 inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
    popular
      ? "bg-brand-bright text-white hover:bg-brand hover:shadow-[0_0_20px_rgba(46,127,6,0.35)]"
      : "border border-white/10 text-ink hover:border-brand-bright/40 hover:bg-brand-bright/5"
  }`;

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
            {popularLabel}
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

      {ctaExternal ? (
        <a
          href={ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className={ctaClass}
        >
          {pkg.cta}
        </a>
      ) : (
        <Link href={ctaHref} className={ctaClass}>
          {pkg.cta}
        </Link>
      )}
    </div>
  );
}
