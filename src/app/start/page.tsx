import { IntakeForm } from "@/components/intake-form";

export const metadata = {
  title: "Start a project — Scale Performance Studio",
  description:
    "Tell us about your brand. We'll come back within 48 hours with a first read on creative direction and media strategy.",
};

export default function StartPage() {
  return (
    <section className="container-content max-w-3xl pt-24 pb-32 lg:pt-32">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-bright">
        Start a project
      </p>
      <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight text-ink md:text-6xl">
        Tell us about your brand.
      </h1>
      <p className="mt-6 text-lg text-ink-dim">
        This is the same intake we use for every client. The more detail you
        give us here, the faster we can come back with a real plan instead of
        generic agency fluff.
      </p>

      <div className="mt-16">
        <IntakeForm />
      </div>
    </section>
  );
}
