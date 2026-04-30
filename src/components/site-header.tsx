"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const nav = [
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/#team", label: "Team" },
  { href: "/pricing", label: "Pricing" },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-md">
      <div className="container-content flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
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
          {nav.map((item) => (
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
          <Link
            href="/start"
            className="group rounded-full border border-brand-bright/40 bg-brand-bright/10 px-4 py-2 text-xs font-semibold text-ink transition-all duration-300 hover:border-brand-bright hover:bg-brand-bright/20 hover:shadow-[0_0_20px_rgba(46,127,6,0.2)] hover:scale-[1.03] active:scale-[0.98] sm:px-5 sm:text-sm"
            onClick={() => setIsOpen(false)}
          >
            Get started
          </Link>

          {/* Mobile menu button — hidden on desktop */}
          <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-ink-dim transition-colors hover:border-brand-bright/40 hover:text-ink lg:hidden"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown panel */}
      {isOpen && (
        <div className="border-t border-white/5 bg-black/95 backdrop-blur-md lg:hidden">
          <nav className="container-content flex flex-col py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="border-b border-white/[0.04] py-3 text-base text-ink-dim transition-colors hover:text-brand-bright"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
