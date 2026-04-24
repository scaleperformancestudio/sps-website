"use client";

/**
 * Horizontal scrolling marquee of client testimonials (Ecomflows-style "Don't take our word for it" section).
 * Pairs with the logo + creative marquees — same infinite-scroll pattern, same edge fades, SPS brand.
 * Each card: avatar circle with initial, name, 5-star rating, review body.
 * Header features a prominent "Trusted by 500+ stores, $150M+ generated" trust badge with avatar stack.
 */

import Image from "next/image";
import { useState } from "react";
import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  initial: string;
  role: string; // job title — e.g. "CMO", "Co-Founder"
  brand: string;
  stars: number;
  review: string;
  accentHue: string; // avatar fallback background when no image is set
  image?: string; // path in /public (e.g. /testimonials/jard.jpg)
}

const testimonials: Testimonial[] = [
  {
    name: "Jard",
    initial: "J",
    role: "Co-Founder",
    brand: "NORTHMADE",
    stars: 5,
    review:
      "SPS helped me earn 15–20% extra revenue on two of my stores. Their creative engine is on another level — I will definitely come back for more brands.",
    accentHue: "bg-[#1a2b0c]",
    image: "/testimonials/jard.jpg",
  },
  {
    name: "Jamy",
    initial: "J",
    role: "Head of Growth",
    brand: "axis.",
    stars: 5,
    review:
      "Professionals through and through. I've been using these guys for a couple of months now and the results speak for themselves. The only negative is not starting sooner — it's literally leaving free money on the table.",
    accentHue: "bg-[#12243a]",
    image: "/testimonials/jamy.jpg",
  },
  {
    name: "Viktor",
    initial: "V",
    role: "CMO",
    brand: "HELIX",
    stars: 5,
    review:
      "The best creative and media team we run general stores with — this solution outperformed every other agency we tried by far. 22.66% revenue lift on total topline in the first 90 days.",
    accentHue: "bg-[#2a1a0c]",
    image: "/testimonials/viktor.jpg",
  },
  {
    name: "Juan",
    initial: "J",
    role: "Founder & CEO",
    brand: "LUNA",
    stars: 5,
    review:
      "Very great experience, the team is very professional and delivered everything as promised. Our returning revenue is up, CAC is down, and the weekly reports are genuinely useful — not fluff.",
    accentHue: "bg-[#1c0c2a]",
    image: "/testimonials/juan.jpg",
  },
  {
    name: "Sara",
    initial: "S",
    role: "Marketing Director",
    brand: "VELORA",
    stars: 5,
    review:
      "Their AI-powered iteration loop consistently produces winners. We tested 40+ creatives in the first month and scaled three of them past our previous best CPA.",
    accentHue: "bg-[#0c2a22]",
    image: "/testimonials/sara.jpg",
  },
  {
    name: "David",
    initial: "D",
    role: "Head of Performance",
    brand: "FORM+CO",
    stars: 5,
    review:
      "From kickoff to first batch in 5 days. Speed and quality — both. Our Meta CPA dropped from $48 to $19 within the first month. This is the standard now.",
    accentHue: "bg-[#2a0c1a]",
    image: "/testimonials/david.jpg",
  },
  {
    name: "Maya",
    initial: "M",
    role: "Founder",
    brand: "Prima",
    stars: 5,
    review:
      "We'd tried three agencies before SPS and nothing clicked. Their research-first approach found angles our in-house team had never tested. ROAS went from 1.8x to 4.2x.",
    accentHue: "bg-[#0c1a2a]",
    image: "/testimonials/maya.jpg",
  },
  {
    name: "Tomás",
    initial: "T",
    role: "Head of Ecommerce",
    brand: "STRATA",
    stars: 5,
    review:
      "Finally an agency that ships. No endless decks, no strategy theatre — just winning creative and clean media. Scaled us to a new daily spend ceiling in under 8 weeks.",
    accentHue: "bg-[#1a2b0c]",
    image: "/testimonials/tomas.jpg",
  },
];

export function TestimonialsMarquee() {
  // Double for seamless infinite loop
  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-brand-bright/[0.05] blur-[140px]" />
      </div>

      {/* ── Header ── */}
      <div className="container-content relative mb-14 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-bright">
          Testimonials
        </p>
        <h2 className="mx-auto mt-3 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight text-ink md:text-6xl">
          Don&apos;t take our{" "}
          <span className="bg-gradient-to-r from-[#4ca50a] via-[#2e7f06] to-[#266604] bg-clip-text font-serif font-normal italic text-transparent">
            word
          </span>{" "}
          for it.
        </h2>

        {/* Inline stats line — now the single trust signal in the header */}
        <p className="mx-auto mt-6 max-w-2xl text-ink-dim">
          Trusted by{" "}
          <span className="font-semibold text-brand-bright">500+ stores</span>,{" "}
          <span className="font-semibold text-brand-bright">$150M+ generated</span>.
          Rated{" "}
          <span className="font-semibold text-brand-bright">5/5</span> by a team of{" "}
          <span className="font-semibold text-brand-bright">12 specialists</span>
          .
        </p>
      </div>

      {/* ── Marquee ── */}
      <div
        className="group/marquee relative"
        aria-label="Client testimonials"
      >
        {/* Edge fades */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-black to-transparent md:w-40" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-black to-transparent md:w-40" />

        <div
          className="animate-marquee flex gap-5 will-change-transform group-hover/marquee:[animation-play-state:paused]"
          style={{ animationDuration: "55s" }}
        >
          {doubled.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <article className="group relative w-[340px] shrink-0 md:w-[380px]">
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0b0b0b] p-6 transition-all duration-500 hover:border-brand-bright/30 hover:shadow-[0_0_40px_rgba(46,127,6,0.1)]">
        {/* Subtle top highlight on hover */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-bright/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Header row */}
        <div className="flex items-center gap-3">
          <Avatar t={t} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <p className="truncate text-sm font-semibold text-ink">
                {t.name}
              </p>
              <div className="flex shrink-0 gap-0.5">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-3 w-3 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
            </div>
            <p className="mt-0.5 truncate text-[11px] text-ink-dim/65">
              {t.role}{" "}
              <span className="text-ink-dim/30">·</span>{" "}
              <span className="font-semibold tracking-wide text-ink-dim/80">
                {t.brand}
              </span>
            </p>
          </div>
        </div>

        {/* Review body */}
        <p className="mt-5 text-sm leading-relaxed text-ink-dim/85">
          {t.review}
        </p>
      </div>
    </article>
  );
}

/**
 * Avatar — renders the uploaded photo when available,
 * gracefully falls back to the initial letter if the image 404s or is missing.
 */
function Avatar({ t }: { t: Testimonial }) {
  const [imageOk, setImageOk] = useState(true);

  if (t.image && imageOk) {
    return (
      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-white/10 shadow-[0_0_12px_rgba(46,127,6,0.12)]">
        <Image
          src={t.image}
          alt={t.name}
          fill
          sizes="44px"
          className="object-cover"
          onError={() => setImageOk(false)}
        />
      </div>
    );
  }

  return (
    <div
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${t.accentHue} text-sm font-semibold text-ink/90`}
    >
      {t.initial}
    </div>
  );
}
