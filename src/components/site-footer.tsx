import Image from "next/image";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-white/5 bg-bg-soft">
      <div className="wave-divider" />

      {/* Top section: brand + get in touch */}
      <div className="container-content grid gap-12 py-16 md:grid-cols-2 md:gap-16">
        {/* Brand */}
        <div>
          <Image
            src="/logo-greenwhite.svg"
            alt="Scale Performance Studio"
            width={180}
            height={56}
            className="h-14 w-auto"
          />
          <p className="mt-6 max-w-sm text-sm text-ink-dim/70">
            An AI-driven creative engine. Performance creative and media
            buying for ecommerce brands that need results.
          </p>
        </div>

        {/* Get in touch */}
        <div className="md:justify-self-end">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-dim/60">
            Get in touch
          </p>
          <div className="mt-5 space-y-3">
            <a
              href="mailto:admin@scaleperformancestudio.com"
              className="group flex items-center gap-3 text-sm text-ink transition-colors hover:text-brand-bright md:text-base"
            >
              <Mail className="h-4 w-4 text-ink-dim/60 transition-colors group-hover:text-brand-bright" />
              admin@scaleperformancestudio.com
            </a>
            <a
              href="tel:+31611727850"
              className="group flex items-center gap-3 text-sm text-ink transition-colors hover:text-brand-bright md:text-base"
            >
              <Phone className="h-4 w-4 text-ink-dim/60 transition-colors group-hover:text-brand-bright" />
              +31 6 1172 7850
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/5" />

      {/* Bottom bar: nav + copyright */}
      <div className="container-content flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-dim/60">
          <Link href="/process" className="transition-colors hover:text-brand-bright">
            Process
          </Link>
          <Link href="/pricing" className="transition-colors hover:text-brand-bright">
            Pricing
          </Link>
          <Link href="/start" className="transition-colors hover:text-brand-bright">
            Start a project
          </Link>
        </div>
        <p className="text-xs text-ink-dim/40">
          © {new Date().getFullYear()} Scale Performance Studio · KvK 73801658
        </p>
      </div>
    </footer>
  );
}
