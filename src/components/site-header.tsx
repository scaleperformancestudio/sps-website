"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Layers,
  Workflow,
  Cpu,
  CreditCard,
  ArrowUpRight,
} from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  caption: string;
  icon: React.ComponentType<{ className?: string }>;
}

const nav: NavItem[] = [
  {
    href: "/#services",
    label: "Services",
    caption: "What we do",
    icon: Layers,
  },
  {
    href: "/#process",
    label: "Process",
    caption: "How we work",
    icon: Workflow,
  },
  {
    href: "/#team",
    label: "The Engine",
    caption: "Our AI agents",
    icon: Cpu,
  },
  {
    href: "/pricing",
    label: "Pricing",
    caption: "Plans & credits",
    icon: CreditCard,
  },
];

// Local (NL) world — shown on /websites so visitors stay in the local funnel
// instead of falling into the e-com (ad production / media buying) site.
const localNav: NavItem[] = [
  { href: "/websites#websites", label: "Websites", caption: "Onze pakketten", icon: Layers },
  { href: "/websites#social", label: "Social", caption: "Content & beheer", icon: Workflow },
  { href: "/websites#hoe-het-werkt", label: "Hoe het werkt", caption: "Van audit tot live", icon: Cpu },
];

const WHATSAPP_AUDIT =
  "https://wa.me/31611727850?text=Hi%20SPS%2C%20ik%20wil%20graag%20een%20gratis%20website-audit%20voor%20mijn%20zaak.";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isLocal = pathname?.startsWith("/websites") ?? false;
  const navItems = isLocal ? localNav : nav;
  const ctaHref = isLocal ? WHATSAPP_AUDIT : "/start";
  const ctaLabel = isLocal ? "Gratis audit" : "Get started";

  // Lock body scroll when the mobile menu is open
  useEffect(() => {
    if (isOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-md">
      <div className="container-content flex h-16 items-center justify-between">
        <Link
          href={isLocal ? "/websites" : "/"}
          className="flex items-center"
          onClick={() => setIsOpen(false)}
        >
          <Image
            src="/logo-greenwhite.svg"
            alt="Scale Performance Studio"
            width={64}
            height={64}
            priority
            className="h-14 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-ink-dim transition-all duration-300 hover:text-brand-bright"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side: CTA + mobile menu trigger */}
        <div className="flex items-center gap-3">
          {isLocal ? (
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-full border border-brand-bright/40 bg-brand-bright/10 px-4 py-2 text-xs font-semibold text-ink transition-all duration-300 hover:border-brand-bright hover:bg-brand-bright/20 hover:shadow-[0_0_20px_rgba(46,127,6,0.2)] hover:scale-[1.03] active:scale-[0.98] sm:px-5 sm:text-sm"
              onClick={() => setIsOpen(false)}
            >
              {ctaLabel}
            </a>
          ) : (
            <Link
              href={ctaHref}
              className="group rounded-full border border-brand-bright/40 bg-brand-bright/10 px-4 py-2 text-xs font-semibold text-ink transition-all duration-300 hover:border-brand-bright hover:bg-brand-bright/20 hover:shadow-[0_0_20px_rgba(46,127,6,0.2)] hover:scale-[1.03] active:scale-[0.98] sm:px-5 sm:text-sm"
              onClick={() => setIsOpen(false)}
            >
              {ctaLabel}
            </Link>
          )}

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((v) => !v)}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-ink-dim transition-all duration-300 hover:border-brand-bright/40 hover:text-ink lg:hidden"
          >
            <span
              className={`absolute transition-all duration-300 ${
                isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
              }`}
            >
              <Menu className="h-5 w-5" />
            </span>
            <span
              className={`absolute transition-all duration-300 ${
                isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
              }`}
            >
              <X className="h-5 w-5" />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile dropdown panel */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-out lg:hidden ${
          isOpen ? "max-h-[100vh]" : "max-h-0"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="relative border-t border-white/5 bg-gradient-to-b from-[#0a0a0a] via-black to-black backdrop-blur-md">
          {/* Ambient glow */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 left-1/2 h-80 w-[500px] -translate-x-1/2 rounded-full bg-brand-bright/[0.08] blur-[100px]" />
          </div>

          <nav className="container-content relative flex flex-col gap-2 py-6">
            {navItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-3.5 transition-all duration-300 hover:border-brand-bright/30 hover:bg-brand-bright/[0.04]"
                  style={{
                    transitionDelay: isOpen ? `${i * 60}ms` : "0ms",
                    transform: isOpen ? "translateY(0)" : "translateY(8px)",
                    opacity: isOpen ? 1 : 0,
                    transitionProperty: "opacity, transform, border-color, background-color",
                    transitionDuration: "500ms",
                    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  {/* Hover sweep */}
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-brand-bright/[0.06] to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                  <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-bright/20 bg-gradient-to-br from-brand-bright/[0.08] to-transparent text-brand-bright transition-all duration-300 group-hover:border-brand-bright/50 group-hover:shadow-[0_0_18px_rgba(46,127,6,0.25)]">
                    <Icon className="h-4 w-4" />
                  </span>

                  <div className="relative flex min-w-0 flex-1 flex-col">
                    <span className="text-sm font-semibold text-ink transition-colors duration-300 group-hover:text-brand-bright">
                      {item.label}
                    </span>
                    <span className="text-[11px] text-ink-dim/60">
                      {item.caption}
                    </span>
                  </div>

                  <ArrowUpRight className="relative h-4 w-4 shrink-0 text-ink-dim/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-bright" />
                </Link>
              );
            })}

            {/* Footer CTA inside the panel */}
            <div className="mt-3 flex items-center justify-between rounded-2xl border border-brand-bright/30 bg-gradient-to-br from-brand-bright/[0.10] to-brand-bright/[0.02] px-4 py-3">
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-bright">
                  {isLocal ? "Gratis" : "Ready?"}
                </span>
                <span className="text-sm font-semibold text-ink">
                  {isLocal ? "Vraag een audit aan" : "Start your project"}
                </span>
              </div>
              {isLocal ? (
                <a
                  href={ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-brand-bright px-4 py-2 text-xs font-semibold text-ink transition-all duration-300 hover:bg-brand hover:shadow-[0_0_20px_rgba(46,127,6,0.4)] active:scale-[0.97]"
                >
                  {ctaLabel}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              ) : (
                <Link
                  href={ctaHref}
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-brand-bright px-4 py-2 text-xs font-semibold text-ink transition-all duration-300 hover:bg-brand hover:shadow-[0_0_20px_rgba(46,127,6,0.4)] active:scale-[0.97]"
                >
                  {ctaLabel}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
