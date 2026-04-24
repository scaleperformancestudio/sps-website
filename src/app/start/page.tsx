import { IntakeForm } from "@/components/intake-form";

export const metadata = {
  title: "Start a project — Scale Performance Studio",
  description:
    "30 seconds. We'll reach out within 24 hours with onboarding + your first creative request.",
};

export default function StartPage() {
  return (
    <section className="container-content max-w-2xl pt-24 pb-32 lg:pt-32">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-bright">
        Start a project
      </p>
      <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight text-ink md:text-6xl">
        30 seconds to get started.
      </h1>
      <p className="mt-6 text-lg text-ink-dim">
        Just the essentials to reach back out. We handle product details,
        angles and creative brief together over the first onboarding call —
        nothing for you to prep here.
      </p>

      <div className="mt-12">
        <IntakeForm />
      </div>
    </section>
  );
}
