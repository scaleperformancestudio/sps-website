"use client";

/**
 * Mini onboarding form — intentionally short.
 *
 * Philosophy: zero friction on the website side. We ask for only the 4 things
 * we need to reach back out (name, email, brand, a sense of what they want)
 * plus one optional website field. Everything else — product research, brand
 * assets, target audience, competitors, restrictions — gets captured AFTER
 * onboarding, through a creative-request flow or a support conversation.
 *
 * Speed > completeness at this stage. The goal is "get them to hit submit",
 * not "have a complete brief on day zero".
 */

import { useState } from "react";
import { z } from "zod";

const GOAL_OPTIONS = [
  { value: "just_creative", label: "Creative production only" },
  { value: "creative_media", label: "Creative + media buying" },
  { value: "not_sure", label: "Not sure yet — want to talk" },
] as const;

const miniSchema = z.object({
  name: z.string().min(2, "Your name please"),
  email: z.string().email("A valid email"),
  company: z.string().min(2, "Your brand / company name"),
  website: z.string().url("Must be a full URL (https://...)").or(z.literal("")).optional(),
  goal: z.enum(["just_creative", "creative_media", "not_sure"], {
    errorMap: () => ({ message: "Pick one" }),
  }),
  message: z.string().max(500, "Keep it brief").optional(),
});

type MiniInput = z.infer<typeof miniSchema>;

const emptyForm: MiniInput = {
  name: "",
  email: "",
  company: "",
  website: "",
  goal: "just_creative",
  message: "",
};

export function IntakeForm() {
  const [form, setForm] = useState<MiniInput>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string[] | undefined>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  function update<K extends keyof MiniInput>(key: K, value: MiniInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);

    const parsed = miniSchema.safeParse(form);
    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || "Something went wrong");
      }
      setSubmitted(true);
    } catch (e) {
      setServerError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-brand-bright/30 bg-brand-bright/[0.04] p-10 text-center">
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-brand-bright/15">
          <svg className="h-6 w-6 text-brand-bright" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-ink">You&apos;re on the list.</h2>
        <p className="mx-auto mt-4 max-w-md text-ink-dim">
          We&apos;ll reach out within <span className="text-ink">24 hours</span> to start your onboarding. From there you can brief your first creative request and we produce within your subscription&apos;s turnaround.
        </p>
        <p className="mt-6 text-xs text-ink-dim/60">
          Check your inbox — and your spam folder just in case.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {serverError && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-400">
          {serverError}
        </div>
      )}

      {/* Row 1: name + email */}
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Your name" error={errors.name?.[0]}>
          <input
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Jane Doe"
            className="w-full rounded-lg border border-white/10 bg-bg-card px-4 py-3 text-ink placeholder-ink-dim/40 focus:border-brand-bright/60 focus:outline-none"
            required
          />
        </Field>
        <Field label="Email" error={errors.email?.[0]}>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="jane@yourbrand.com"
            className="w-full rounded-lg border border-white/10 bg-bg-card px-4 py-3 text-ink placeholder-ink-dim/40 focus:border-brand-bright/60 focus:outline-none"
            required
          />
        </Field>
      </div>

      {/* Row 2: brand + website */}
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Brand / company" error={errors.company?.[0]}>
          <input
            type="text"
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
            placeholder="VYTA Beauty"
            className="w-full rounded-lg border border-white/10 bg-bg-card px-4 py-3 text-ink placeholder-ink-dim/40 focus:border-brand-bright/60 focus:outline-none"
            required
          />
        </Field>
        <Field label="Website (optional)" error={errors.website?.[0]}>
          <input
            type="url"
            value={form.website}
            onChange={(e) => update("website", e.target.value)}
            placeholder="https://yourbrand.com"
            className="w-full rounded-lg border border-white/10 bg-bg-card px-4 py-3 text-ink placeholder-ink-dim/40 focus:border-brand-bright/60 focus:outline-none"
          />
        </Field>
      </div>

      {/* Goal — single choice */}
      <Field label="What do you need?" error={errors.goal?.[0]}>
        <div className="grid gap-3 md:grid-cols-3">
          {GOAL_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => update("goal", opt.value)}
              className={`rounded-lg border px-4 py-3 text-left text-sm transition-all ${
                form.goal === opt.value
                  ? "border-brand-bright/60 bg-brand-bright/[0.08] text-ink"
                  : "border-white/10 bg-bg-card text-ink-dim hover:border-white/20"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </Field>

      {/* Optional message */}
      <Field label="Anything we should know? (optional)" error={errors.message?.[0]}>
        <textarea
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="e.g. launching a new line in 3 weeks, or just explored agencies before"
          rows={3}
          className="w-full resize-none rounded-lg border border-white/10 bg-bg-card px-4 py-3 text-ink placeholder-ink-dim/40 focus:border-brand-bright/60 focus:outline-none"
        />
      </Field>

      <button
        type="submit"
        disabled={submitting}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-bright px-8 py-4 text-base font-semibold text-ink transition-all duration-300 hover:bg-brand hover:shadow-[0_0_30px_rgba(46,127,6,0.4)] disabled:opacity-50 md:w-auto"
      >
        {submitting ? "Sending..." : "Send — we'll reach out within 24h"}
      </button>

      <p className="text-xs text-ink-dim/60">
        We reach out personally within 24 hours with onboarding details and your first creative brief.
        No autoresponders, no 10-person Slack threads.
      </p>
    </form>
  );
}

/* Small labelled field wrapper */
function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-ink-dim">{label}</span>
      {children}
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </label>
  );
}
