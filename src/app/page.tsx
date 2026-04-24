"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, ArrowRight, Zap, BarChart3, Layers, Target, Star, Mail } from "lucide-react";
import { CountUp } from "@/components/count-up";
import { FadeIn } from "@/components/fade-in";
import { PhoneCarousel } from "@/components/phone-carousel";
import { HeroWaves } from "@/components/hero-waves";
import { LogoMarquee } from "@/components/logo-marquee";
import { CreativeMarquee } from "@/components/creative-marquee";
import { TestimonialsMarquee } from "@/components/testimonials-marquee";
import { ProcessShowcase } from "@/components/process-showcase";
import { FaqAccordion } from "@/components/faq-accordion";

/* ── Team roster (front-facing on the homepage) ── */
type TeamMember = {
  name: string;
  role: string;
  initial: string;
  gradient: string;
  /** Path in /public once a photo exists, e.g. "/team/emre.jpg" */
  image?: string;
};

const team: TeamMember[] = [
  {
    name: "Emre Balıkoç",
    role: "Founder & Strategy Lead",
    initial: "E",
    gradient: "from-[#1c5102] to-[#2e7f06]",
    image: "/team/emre.jpg",
  },
  {
    name: "Fenna Reitsma",
    role: "Head of Research",
    initial: "F",
    gradient: "from-[#3a2a1c] to-[#5a4a3c]",
    image: "/team/fenna.jpg",
  },
  {
    name: "Sahar Moradi",
    role: "Creative Strategist",
    initial: "S",
    gradient: "from-[#3a1a2c] to-[#5a2a4c]",
    image: "/team/sahar.jpg",
  },
  {
    name: "Joren Vandeven",
    role: "Scripts & Copy",
    initial: "J",
    gradient: "from-[#12243a] to-[#1a3450]",
    image: "/team/joren.jpg",
  },
  {
    name: "Milo Janssens",
    role: "AI Production Lead",
    initial: "M",
    gradient: "from-[#1a2a1c] to-[#2a4a2c]",
    image: "/team/milo.jpg",
  },
  {
    name: "Indira Choudhury",
    role: "Media Buying",
    initial: "I",
    gradient: "from-[#3a1a1c] to-[#5a2a2c]",
    image: "/team/indira.jpg",
  },
  {
    name: "Klaas-Jan Bruinsma",
    role: "Performance Analyst",
    initial: "K",
    gradient: "from-[#1c2a2c] to-[#2c4a4c]",
    image: "/team/klaas-jan.jpg",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden">
        {/* Subtle pulse blobs (kept, reduced so they sit beneath the waves) */}
        <div className="absolute inset-0">
          <div className="absolute -left-40 -top-40 h-[600px] w-[600px] animate-pulse-slow rounded-full bg-brand-dark/20 blur-[120px]" />
          <div
            className="absolute -right-20 top-1/3 h-[500px] w-[500px] animate-pulse-slow rounded-full bg-brand-bright/15 blur-[100px]"
            style={{ animationDelay: "2s" }}
          />
        </div>

        {/* Two flowing wave strokes — SPS logo motif, 15% opacity cap */}
        <HeroWaves />

        <div className="grain pointer-events-none absolute inset-0" />

        <div className="container-content relative pt-28 pb-12 text-center lg:pt-36">
          <FadeIn delay={100}>
            <p className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-brand-bright/30 bg-brand-bright/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-bright">
              <Zap className="h-3 w-3" />
              AI-Powered Performance Creative
            </p>
          </FadeIn>

          <FadeIn delay={250}>
            <h1 className="mx-auto max-w-5xl text-5xl font-bold leading-[1.05] tracking-tight text-ink md:text-6xl lg:text-7xl">
              AI-powered{" "}
              <span className="bg-gradient-to-r from-[#4ca50a] via-[#2e7f06] to-[#266604] bg-clip-text font-serif font-normal italic text-transparent">
                creative engines
              </span>{" "}
              that scale ecommerce brands past their plateau.
            </h1>
          </FadeIn>

          <FadeIn delay={400}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-ink-dim md:text-xl">
              Performance creative production and media buying for ecommerce
              brands. AI-accelerated workflows, human-led strategy. No fluff,
              only output that moves numbers.
            </p>
          </FadeIn>

          <FadeIn delay={550}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/start"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-brand-bright px-7 py-3.5 text-sm font-semibold text-ink transition-all duration-300 hover:bg-brand hover:shadow-[0_0_30px_rgba(46,127,6,0.4)] hover:scale-[1.03] active:scale-[0.98]"
              >
                Get started
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </FadeIn>
        </div>

        {/* Phone carousel */}
        <FadeIn delay={700} direction="up" distance={50}>
          <div className="relative mt-4 pb-16">
            <PhoneCarousel />
          </div>
        </FadeIn>

        <div className="wave-divider" />
      </section>

      {/* ─── SOCIAL PROOF MARQUEE ─── */}
      <section className="py-12">
        <FadeIn>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-ink-dim/40">
            Trusted by ecommerce brands who need results
          </p>
          <LogoMarquee />
        </FadeIn>
      </section>

      <div className="wave-divider" />

      {/* ─── SERVICES / FEATURES ─── */}
      <section
        id="services"
        className="container-content scroll-mt-20 py-24 lg:py-32"
      >
        <FadeIn>
          <div className="mb-16 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-bright">
              What we do
            </p>
            <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-bold tracking-tight text-ink md:text-5xl">
              Two services. Built to{" "}
              <span className="bg-gradient-to-r from-[#4ca50a] via-[#2e7f06] to-[#266604] bg-clip-text font-serif font-normal italic text-transparent">
                compound
              </span>
              .
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-ink-dim">
              Creative production and media buying working as one engine. Each
              feed powers the other — winning creative informs media strategy,
              performance data shapes the next creative batch.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-2">
          <FadeIn delay={0}>
            <FeatureCard
              icon={<Layers className="h-6 w-6" />}
              title="Performance Creative"
              description="Statics, video, and UGC engineered to stop scroll and convert. Research-driven angles, AI-accelerated production, mobile-first for Meta and TikTok."
              points={[
                "Ad research + competitor intelligence",
                "Creative strategy and angle frameworks",
                "Higgsfield + Nano Banana Pro production",
                "Winning ad iteration and scaling",
              ]}
            />
          </FadeIn>
          <FadeIn delay={150}>
            <FeatureCard
              icon={<Target className="h-6 w-6" />}
              title="Media Buying"
              description="From launch to scale. Campaign structure, audience architecture, budget strategy, and daily optimization across Meta and TikTok."
              points={[
                "Account audits and structure rebuilds",
                "Audience architecture and testing plans",
                "Daily optimization and scaling",
                "Weekly performance reporting",
              ]}
            />
          </FadeIn>
        </div>
      </section>

      <div className="wave-divider" />

      {/* ─── STATS / PROOF ─── */}
      <section className="container-content py-24 lg:py-32">
        <FadeIn>
          <div className="mb-14 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-bright">
              By the numbers
            </p>
            <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-bold tracking-tight text-ink md:text-5xl">
              Numbers that{" "}
              <span className="bg-gradient-to-r from-[#4ca50a] via-[#2e7f06] to-[#266604] bg-clip-text font-serif font-normal italic text-transparent">
                actually mean
              </span>{" "}
              something.
            </h2>
          </div>
        </FadeIn>

        <div className="grid gap-5 md:grid-cols-3">
          <FadeIn delay={0}>
            <StatCard
              icon={<BarChart3 className="h-5 w-5" />}
              value={<CountUp end={2.4} decimals={1} suffix="M+" duration={2200} prefix="€" />}
              label="Ad spend managed"
              context="Across 40+ active ecommerce brands"
            />
          </FadeIn>
          <FadeIn delay={150}>
            <StatCard
              icon={<Target className="h-5 w-5" />}
              value={<CountUp end={4.8} decimals={1} suffix="x" duration={2000} />}
              label="Avg. blended ROAS"
              context="Industry average sits at ~2.1x"
            />
          </FadeIn>
          <FadeIn delay={300}>
            <StatCard
              icon={<Zap className="h-5 w-5" />}
              value={<CountUp end={5} suffix=" days" duration={1800} />}
              label="From kickoff to first creative batch"
              context="vs. 14–21 days industry standard"
            />
          </FadeIn>
        </div>
      </section>

      <div className="wave-divider" />

      {/* ─── MEET THE TEAM ─── */}
      <section
        id="team"
        className="container-content scroll-mt-20 py-24 lg:py-32"
      >
        <FadeIn>
          <div className="mb-14 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-bright">
              Who runs it
            </p>
            <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-bold tracking-tight text-ink md:text-5xl">
              Meet the{" "}
              <span className="bg-gradient-to-r from-[#4ca50a] via-[#2e7f06] to-[#266604] bg-clip-text font-serif font-normal italic text-transparent">
                team
              </span>
              .
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-ink-dim">
              A specialist per stage of the engine — research, strategy,
              scripts, AI production, media buying, analytics — and every
              operator is paired with a dedicated AI agent. Human judgment on
              top, AI speed and volume underneath. You talk directly to the
              operator doing the work, not a layer of account managers.
            </p>
          </div>
        </FadeIn>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, i) => {
            const isLast = i === team.length - 1;
            return (
              <FadeIn
                key={member.name}
                delay={i * 80}
                className={isLast ? "lg:col-start-2" : ""}
              >
                <TeamCard {...member} />
              </FadeIn>
            );
          })}
        </div>
      </section>

      <div className="wave-divider" />

      {/* ─── TESTIMONIALS MARQUEE ─── */}
      <TestimonialsMarquee />

      <div className="wave-divider" />

      {/* ─── HOW IT WORKS (animated showcase) ─── */}
      <ProcessShowcase />

      <div className="wave-divider" />

      {/* ─── CREATIVE MARQUEE (above FAQ) ─── */}
      <CreativeMarquee />

      <div className="wave-divider" />

      {/* ─── FAQ ─── */}
      <section className="container-content py-24 lg:py-32">
        <FadeIn>
          <div className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-bright">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink md:text-5xl">
              Common{" "}
              <span className="bg-gradient-to-r from-[#4ca50a] via-[#2e7f06] to-[#266604] bg-clip-text font-serif font-normal italic text-transparent">
                questions
              </span>
              .
            </h2>
          </div>
        </FadeIn>
        <FadeIn delay={200}>
          <div className="mx-auto max-w-3xl">
            <FaqAccordion />
          </div>
        </FadeIn>
      </section>

      <div className="wave-divider" />

      {/* ─── BOTTOM CTA ─── */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 animate-pulse-slow rounded-full bg-brand/20 blur-[100px]" />
        </div>
        <FadeIn>
          <div className="container-content relative mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-bold tracking-tight text-ink md:text-6xl">
              Ready to{" "}
              <span className="bg-gradient-to-r from-[#4ca50a] via-[#2e7f06] to-[#266604] bg-clip-text font-serif font-normal italic text-transparent">
                scale
              </span>
              ?
            </h2>
            <p className="mt-6 text-lg text-ink-dim">
              Tell us about your brand. We&apos;ll come back with a creative and
              media plan within 48 hours. No commitment, no generic decks.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/start"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-brand-bright px-8 py-4 text-sm font-semibold text-ink transition-all duration-300 hover:bg-brand hover:shadow-[0_0_30px_rgba(46,127,6,0.4)] hover:scale-[1.03] active:scale-[0.98]"
              >
                Start a project
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <a
                href="mailto:admin@scaleperformancestudio.com"
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-4 text-sm font-semibold text-ink transition-all duration-300 hover:border-brand-bright/60 hover:bg-brand-bright/5"
              >
                <Mail className="h-4 w-4 text-brand-bright" aria-hidden="true" />
                Email us directly
                <ArrowRight className="h-4 w-4 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
              </a>
              <a
                href="https://wa.me/31611727850?text=Hi%20SPS%20team%2C%20I%27d%20like%20to%20talk%20about%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-4 text-sm font-semibold text-ink transition-all duration-300 hover:border-brand-bright/60 hover:bg-brand-bright/5"
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

            {/* Trust badge — avatar stack + 5 stars + stores line */}
            <div className="mt-12 flex flex-col items-center gap-3">
              <div className="flex -space-x-3">
                <TrustAvatar
                  image="/testimonials/jamy.jpg"
                  fallbackLetter="J"
                  fallbackBg="bg-gradient-to-br from-[#2a1a0c] to-[#3a2a1c]"
                />
                <TrustAvatar
                  image="/testimonials/maya.jpg"
                  fallbackLetter="M"
                  fallbackBg="bg-gradient-to-br from-[#12243a] to-[#1a3450]"
                />
                <TrustAvatar
                  image="/testimonials/viktor.jpg"
                  fallbackLetter="V"
                  fallbackBg="bg-gradient-to-br from-[#1c5102] to-[#2e7f06]"
                />
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-sm text-ink-dim/80">
                Trusted by{" "}
                <span className="font-semibold text-brand-bright">500+ stores</span>
                ,{" "}
                <span className="font-semibold text-brand-bright">
                  $150M+ generated
                </span>
              </p>
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  );
}

/* ── Stat Card (By the numbers section) ── */
function StatCard({
  icon,
  value,
  label,
  context,
}: {
  icon: React.ReactNode;
  value: React.ReactNode;
  label: string;
  context: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/[0.07] bg-[#0a0a0a] p-7 transition-all duration-500 hover:border-brand-bright/30 hover:shadow-[0_0_50px_rgba(46,127,6,0.1)] md:p-9">
      {/* Ambient corner glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-brand-bright/[0.05] blur-3xl transition-opacity duration-700 group-hover:opacity-[1.8]" />

      {/* Fine top highlight on hover */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-bright/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative">
        {/* Icon chip */}
        <div className="inline-flex rounded-xl border border-brand-bright/20 bg-brand-bright/10 p-2.5 text-brand-bright">
          {icon}
        </div>

        {/* Value */}
        <p className="mt-6 text-5xl font-bold tracking-tight text-ink md:text-6xl">
          {value}
        </p>

        {/* Label */}
        <p className="mt-3 text-sm text-ink-dim/80">{label}</p>

        {/* Context badge */}
        <div className="mt-6 border-t border-white/[0.06] pt-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-bright/20 bg-brand-bright/[0.04] px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-bright shadow-[0_0_6px_rgba(46,127,6,0.8)]" />
            <span className="text-[11px] font-medium text-ink-dim/80">
              {context}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Trust Avatar (CTA trust badge) — uses uploaded photo, falls back to initial letter ── */
function TrustAvatar({
  image,
  fallbackLetter,
  fallbackBg,
}: {
  image: string;
  fallbackLetter: string;
  fallbackBg: string;
}) {
  const [imageOk, setImageOk] = useState(true);

  if (imageOk) {
    return (
      <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-black shadow-[0_0_12px_rgba(46,127,6,0.15)]">
        <Image
          src={image}
          alt=""
          fill
          sizes="40px"
          className="object-cover"
          onError={() => setImageOk(false)}
        />
      </div>
    );
  }

  return (
    <div
      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-black ${fallbackBg} text-sm font-semibold text-ink shadow-[0_0_12px_rgba(46,127,6,0.15)]`}
    >
      {fallbackLetter}
    </div>
  );
}

/* ── Team Card (Meet the team section) ── */
function TeamCard({ name, role, initial, gradient, image }: TeamMember) {
  const [imageOk, setImageOk] = useState(Boolean(image));

  return (
    <div className="group flex h-full items-center gap-4 rounded-2xl border border-white/[0.07] bg-[#0a0a0a] p-5 transition-all duration-500 hover:border-brand-bright/30 hover:shadow-[0_0_40px_rgba(46,127,6,0.1)]">
      {imageOk && image ? (
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-black shadow-[0_0_12px_rgba(46,127,6,0.15)]">
          <Image
            src={image}
            alt={name}
            fill
            sizes="56px"
            className="object-cover grayscale"
            onError={() => setImageOk(false)}
          />
        </div>
      ) : (
        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-black bg-gradient-to-br ${gradient} text-lg font-semibold text-ink shadow-[0_0_12px_rgba(46,127,6,0.15)]`}
        >
          {initial}
        </div>
      )}
      <div className="min-w-0">
        <p className="truncate text-base font-semibold text-ink">{name}</p>
        <p className="truncate text-sm text-ink-dim">{role}</p>
      </div>
    </div>
  );
}

/* ── Feature Card ── */
function FeatureCard({
  icon,
  title,
  description,
  points,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  points: string[];
}) {
  return (
    <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-bg-card p-8 transition-all duration-500 hover:border-brand-bright/40 hover:shadow-[0_0_40px_rgba(46,127,6,0.08)]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-bright/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-bright/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative">
        <div className="mb-4 inline-flex rounded-xl border border-brand-bright/20 bg-brand-bright/10 p-3 text-brand-bright">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-ink md:text-3xl">{title}</h3>
        <p className="mt-4 text-ink-dim">{description}</p>
        <ul className="mt-6 space-y-3 border-t border-white/5 pt-6">
          {points.map((p) => (
            <li
              key={p}
              className="flex items-start gap-3 text-sm text-ink-muted"
            >
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-bright" />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
