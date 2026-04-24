import Image from "next/image";
import Link from "next/link";

const nav = [
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/#team", label: "Team" },
  { href: "/pricing", label: "Pricing" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-md">
      <div className="container-content flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-greenwhite.svg"
            alt="Scale Performance Studio"
            width={64}
            height={64}
            priority
            className="h-14 w-auto"
          />
        </Link>
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
        <Link
          href="/start"
          className="group rounded-full border border-brand-bright/40 bg-brand-bright/10 px-5 py-2 text-sm font-semibold text-ink transition-all duration-300 hover:border-brand-bright hover:bg-brand-bright/20 hover:shadow-[0_0_20px_rgba(46,127,6,0.2)] hover:scale-[1.03] active:scale-[0.98]"
        >
          Get started
        </Link>
      </div>
    </header>
  );
}
