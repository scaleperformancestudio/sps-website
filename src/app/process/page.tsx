"use client";

import { FadeIn } from "@/components/fade-in";

const steps = [
  {
    number: "01",
    title: "Intelligence",
    description:
      "We run deep product, audience and competitor research. The output is a master brief that powers every creative and media decision going forward.",
  },
  {
    number: "02",
    title: "Strategy",
    description:
      "We map the winning angles, hooks and formats. For each angle we define what to test first, what success looks like, and what we'll cut.",
  },
  {
    number: "03",
    title: "Production",
    description:
      "We produce statics, short video and UGC inside our AI creative engine. No stock photos, no generic promos. Every asset is engineered for your brand.",
  },
  {
    number: "04",
    title: "Media buying",
    description:
      "We launch campaigns structured for learning, not vanity metrics. We optimize daily, scale what works, and kill what doesn't within 72 hours.",
  },
  {
    number: "05",
    title: "Iteration",
    description:
      "Weekly we review what won, what lost, and why. Winners get iterated on. Losers get replaced. The engine keeps compounding.",
  },
];

export default function ProcessPage() {
  return (
    <section className="container-content pt-24 pb-32 lg:pt-32">
      <FadeIn>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-bright">
          Process
        </p>
        <h1 className="mt-6 max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight text-ink md:text-6xl">
          How we work.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-ink-dim">
          One creative engine, running on AI-powered workflows and human-led
          strategy. Here&apos;s what the first 30 days look like.
        </p>
      </FadeIn>

      <div className="mt-20 space-y-12">
        {steps.map((step, i) => (
          <FadeIn key={step.number} delay={i * 100}>
            <div className="grid gap-4 border-t border-white/5 pt-12 md:grid-cols-[140px_1fr]">
              <p className="text-sm font-semibold tracking-widest text-brand-bright">
                {step.number}
              </p>
              <div>
                <h3 className="text-3xl font-bold tracking-tight text-ink md:text-4xl">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-2xl text-ink-dim">
                  {step.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
