import Link from "next/link";
import { locales, localeNames, type Locale } from "@/app/websites/content";

/**
 * Language switcher for the /websites funnel.
 * Server component — renders one link per available locale. Adding a language
 * to content.ts makes it appear here automatically.
 */
export function LanguageSwitcher({ current }: { current: Locale }) {
  return (
    <div
      className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1"
      role="group"
      aria-label="Language"
    >
      {locales.map((loc) => {
        const active = loc === current;
        return (
          <Link
            key={loc}
            href={`/websites/${loc}`}
            aria-current={active ? "true" : undefined}
            className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide transition-all duration-300 ${
              active
                ? "bg-brand-bright text-white"
                : "text-ink-dim hover:text-ink"
            }`}
            title={localeNames[loc]}
          >
            {loc}
          </Link>
        );
      })}
    </div>
  );
}
