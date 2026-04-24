"use client";

import { useState } from "react";
import {
  intakeSchema,
  type IntakeInput,
  PLATFORM_OPTIONS,
  BUSINESS_TYPES,
  CREATIVE_PACKAGES,
  MEDIA_BUYING_OPTIONS,
  MEDIA_BUYING_TIERS,
} from "@/lib/intake-schema";

const emptyForm: IntakeInput = {
  company: "",
  name: "",
  email: "",
  website: "",
  business_type: "",
  product_description: "",
  target_audience: "",
  monthly_budget: "",
  platforms: [],
  creative_package: "",
  media_buying: "",
  media_buying_tier: "",
  sub_niche: "",
  usp: "",
  brand_voice: "",
  brand_colors: "",
  brand_fonts: "",
  productfeed_url: "",
  productfeed_type: "",
  competitors: "",
  baseline_roas: "",
  baseline_cpa: "",
  baseline_notes: "",
  restrictions: "",
  client_hypotheses: "",
  notes: "",
};

export function IntakeForm() {
  const [form, setForm] = useState<IntakeInput>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string[] | undefined>>(
    {}
  );
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  function update<K extends keyof IntakeInput>(key: K, value: IntakeInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function togglePlatform(p: string) {
    setForm((prev) => {
      const has = prev.platforms.includes(p);
      return {
        ...prev,
        platforms: has
          ? prev.platforms.filter((x) => x !== p)
          : [...prev.platforms, p],
      };
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);

    const parsed = intakeSchema.safeParse(form);
    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors);
      // Scroll to first error
      const first = Object.keys(parsed.error.flatten().fieldErrors)[0];
      if (first) {
        document.getElementById(first)?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
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
        const body = await res.json().catch(() => ({}));
        setServerError(
          body.error || "Something went wrong. Please try again."
        );
        setSubmitting(false);
        return;
      }

      setSubmitted(true);
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Unknown error"
      );
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-12 text-center">
        <h2 className="text-3xl font-bold text-white">Thanks. Message received.</h2>
        <p className="mt-4 text-neutral-400">
          We&apos;ll review your brand and come back within 48 hours with a
          first read on creative direction and media strategy.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-16">
      {/* BASICS */}
      <FormSection
        title="The basics"
        subtitle="Who you are and what we'll be working on."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Field
            id="company"
            label="Company"
            value={form.company}
            onChange={(v) => update("company", v)}
            error={errors.company?.[0]}
            required
          />
          <Field
            id="name"
            label="Your name"
            value={form.name}
            onChange={(v) => update("name", v)}
            error={errors.name?.[0]}
            required
          />
          <Field
            id="email"
            label="Email"
            type="email"
            value={form.email}
            onChange={(v) => update("email", v)}
            error={errors.email?.[0]}
            required
          />
          <Field
            id="website"
            label="Website"
            placeholder="https://"
            value={form.website}
            onChange={(v) => update("website", v)}
            error={errors.website?.[0]}
            required
          />
          <SelectField
            id="business_type"
            label="Business type"
            value={form.business_type}
            onChange={(v) => update("business_type", v)}
            options={BUSINESS_TYPES}
            error={errors.business_type?.[0]}
            required
          />
          <Field
            id="monthly_budget"
            label="Monthly ad budget (EUR)"
            placeholder="e.g. 25000"
            value={form.monthly_budget || ""}
            onChange={(v) => update("monthly_budget", v)}
          />
        </div>

        <TextareaField
          id="product_description"
          label="What do you sell?"
          placeholder="Describe your product or service in 1-3 sentences."
          value={form.product_description}
          onChange={(v) => update("product_description", v)}
          error={errors.product_description?.[0]}
          required
        />

        <TextareaField
          id="target_audience"
          label="Who is it for?"
          placeholder="Age, gender, geography, psychographics. Be specific."
          value={form.target_audience || ""}
          onChange={(v) => update("target_audience", v)}
        />

        <div>
          <label className="mb-3 block text-sm font-medium text-white">
            Platforms you want to run on <span className="text-brand-bright">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {PLATFORM_OPTIONS.map((p) => {
              const active = form.platforms.includes(p);
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => togglePlatform(p)}
                  className={
                    "rounded-full border px-4 py-2 text-sm transition-colors " +
                    (active
                      ? "border-brand-bright bg-brand-bright/20 text-ink"
                      : "border-white/15 text-ink-dim hover:border-brand-bright/40 hover:bg-brand-bright/5")
                  }
                >
                  {p}
                </button>
              );
            })}
          </div>
          {errors.platforms?.[0] && (
            <p className="mt-2 text-sm text-red-400">{errors.platforms[0]}</p>
          )}
        </div>
      </FormSection>

      {/* SERVICES */}
      <FormSection
        title="What you need from us"
        subtitle="Pick a creative package and let us know if you'd like us to run your media too."
      >
        {/* Creative package selector */}
        <div>
          <label className="mb-3 block text-sm font-medium text-white">
            Creative package <span className="text-brand-bright">*</span>
          </label>
          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {CREATIVE_PACKAGES.map((pkg) => {
              const active = form.creative_package === pkg.key;
              const isUnsure = pkg.key === "unsure";
              return (
                <button
                  key={pkg.key}
                  type="button"
                  onClick={() => update("creative_package", pkg.key)}
                  className={
                    "group relative flex flex-col items-start rounded-xl border px-4 py-3.5 text-left transition-all duration-300 " +
                    (active
                      ? "border-brand-bright bg-brand-bright/10 shadow-[0_0_20px_rgba(46,127,6,0.15)]"
                      : "border-white/10 bg-bg-card hover:border-brand-bright/40 hover:bg-brand-bright/[0.04]")
                  }
                >
                  {"popular" in pkg && pkg.popular && !active && (
                    <span className="absolute right-3 top-3 rounded-full border border-brand-bright/40 bg-brand-bright/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-brand-bright">
                      Popular
                    </span>
                  )}
                  {active && (
                    <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-brand-bright">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-3 w-3 text-black"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                  )}
                  <p
                    className={
                      "text-sm font-semibold " +
                      (active ? "text-ink" : "text-ink")
                    }
                  >
                    {pkg.name}
                  </p>
                  <div className="mt-1.5 flex items-baseline gap-1">
                    <span className="text-lg font-bold text-brand-bright">
                      {pkg.price}
                    </span>
                    {pkg.priceLabel && (
                      <span className="text-[11px] text-ink-dim/70">
                        {pkg.priceLabel}
                      </span>
                    )}
                  </div>
                  <p
                    className={
                      "mt-1 text-[11px] " +
                      (isUnsure ? "text-ink-dim/80" : "text-ink-dim/60")
                    }
                  >
                    {pkg.credits}
                  </p>
                </button>
              );
            })}
          </div>
          {errors.creative_package?.[0] && (
            <p className="mt-2 text-sm text-red-400">
              {errors.creative_package[0]}
            </p>
          )}
          <p className="mt-3 text-xs text-ink-dim/50">
            Not sure which fits? Pick the closest match or &quot;Not sure
            yet&quot; — we&apos;ll recommend one in our reply.
          </p>
        </div>

        {/* Media buying interest */}
        <div>
          <label className="mb-3 block text-sm font-medium text-white">
            Do you also want us to run your media buying?{" "}
            <span className="text-brand-bright">*</span>
          </label>
          <div className="grid gap-2 sm:grid-cols-3">
            {MEDIA_BUYING_OPTIONS.map((opt) => {
              const active = form.media_buying === opt.key;
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => {
                    update("media_buying", opt.key);
                    // Clear tier if switching away from "yes"
                    if (opt.key !== "yes") {
                      update("media_buying_tier", "");
                    }
                  }}
                  className={
                    "rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-300 " +
                    (active
                      ? "border-brand-bright bg-brand-bright/10 text-ink shadow-[0_0_18px_rgba(46,127,6,0.12)]"
                      : "border-white/10 bg-bg-card text-ink-dim hover:border-brand-bright/40 hover:bg-brand-bright/[0.04]")
                  }
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
          {errors.media_buying?.[0] && (
            <p className="mt-2 text-sm text-red-400">
              {errors.media_buying[0]}
            </p>
          )}
        </div>

        {/* Media buying spend tier — shown only when "yes" */}
        {form.media_buying === "yes" && (
          <div className="rounded-2xl border border-brand-bright/20 bg-brand-bright/[0.03] p-5">
            <label className="mb-1 block text-sm font-medium text-white">
              Monthly ad spend band
            </label>
            <p className="mb-4 text-xs text-ink-dim/60">
              Media buying requires a minimum of €15k / month in ad spend. We
              price by band.
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {MEDIA_BUYING_TIERS.map((tier) => {
                const active = form.media_buying_tier === tier.key;
                const belowMin = tier.key === "below-15k";
                return (
                  <button
                    key={tier.key}
                    type="button"
                    onClick={() => update("media_buying_tier", tier.key)}
                    className={
                      "rounded-xl border px-4 py-3 text-left text-sm transition-all duration-300 " +
                      (active
                        ? belowMin
                          ? "border-yellow-500/60 bg-yellow-500/10 text-yellow-200"
                          : "border-brand-bright bg-brand-bright/15 text-ink shadow-[0_0_18px_rgba(46,127,6,0.15)]"
                        : "border-white/10 bg-bg-card text-ink-dim hover:border-brand-bright/40")
                    }
                  >
                    {tier.label}
                  </button>
                );
              })}
            </div>
            {form.media_buying_tier === "below-15k" && (
              <p className="mt-3 text-xs text-yellow-200/80">
                Heads up: below €15k / month doesn&apos;t meet our media buying
                minimum. We can still help with creative production — tell us
                more in the notes at the bottom.
              </p>
            )}
          </div>
        )}
      </FormSection>

      {/* BRAND */}
      <FormSection
        title="Brand & positioning"
        subtitle="How you show up in the market. Optional — fill what applies."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Field
            id="sub_niche"
            label="Sub-niche"
            placeholder="e.g. clean skincare for sensitive skin"
            value={form.sub_niche || ""}
            onChange={(v) => update("sub_niche", v)}
          />
          <Field
            id="usp"
            label="Unique selling point"
            placeholder="What makes you different?"
            value={form.usp || ""}
            onChange={(v) => update("usp", v)}
          />
          <Field
            id="brand_voice"
            label="Brand voice"
            placeholder="e.g. playful, confident, clinical"
            value={form.brand_voice || ""}
            onChange={(v) => update("brand_voice", v)}
          />
          <Field
            id="brand_colors"
            label="Brand colors"
            placeholder="Hex codes if you have them"
            value={form.brand_colors || ""}
            onChange={(v) => update("brand_colors", v)}
          />
          <Field
            id="brand_fonts"
            label="Brand fonts"
            value={form.brand_fonts || ""}
            onChange={(v) => update("brand_fonts", v)}
          />
        </div>
      </FormSection>

      {/* PRODUCT FEED */}
      <FormSection
        title="Product catalog"
        subtitle="If you have a product feed we can pull from."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Field
            id="productfeed_url"
            label="Product feed URL"
            placeholder="https://yourstore.com/products.json"
            value={form.productfeed_url || ""}
            onChange={(v) => update("productfeed_url", v)}
          />
          <Field
            id="productfeed_type"
            label="Feed type"
            placeholder="shopify / woocommerce / csv"
            value={form.productfeed_type || ""}
            onChange={(v) => update("productfeed_type", v)}
          />
        </div>
      </FormSection>

      {/* COMPETITORS */}
      <FormSection
        title="Competitive landscape"
        subtitle="Who are you fighting for attention and spend?"
      >
        <TextareaField
          id="competitors"
          label="Known competitors"
          placeholder="List 3-5 brands you compete with on Meta / TikTok ads."
          value={form.competitors || ""}
          onChange={(v) => update("competitors", v)}
        />
      </FormSection>

      {/* PERFORMANCE */}
      <FormSection
        title="Current performance"
        subtitle="Where are you today? Helps us set realistic targets."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Field
            id="baseline_roas"
            label="Current blended ROAS"
            placeholder="e.g. 2.1"
            value={form.baseline_roas || ""}
            onChange={(v) => update("baseline_roas", v)}
          />
          <Field
            id="baseline_cpa"
            label="Current CPA (EUR)"
            placeholder="e.g. 28"
            value={form.baseline_cpa || ""}
            onChange={(v) => update("baseline_cpa", v)}
          />
        </div>
        <TextareaField
          id="baseline_notes"
          label="Historical performance notes"
          placeholder="What's worked, what hasn't, seasonal patterns, anything we should know."
          value={form.baseline_notes || ""}
          onChange={(v) => update("baseline_notes", v)}
        />
      </FormSection>

      {/* CONSTRAINTS + HYPOTHESES */}
      <FormSection
        title="Constraints & hypotheses"
        subtitle="What's off-limits and what you suspect works."
      >
        <TextareaField
          id="restrictions"
          label="Restrictions"
          placeholder="Legal, brand, or category constraints. Claims you can't make, imagery you can't use, etc."
          value={form.restrictions || ""}
          onChange={(v) => update("restrictions", v)}
        />
        <TextareaField
          id="client_hypotheses"
          label="Your own hypotheses"
          placeholder="Angles, hooks or creative directions you think will work — we'll test them alongside our own."
          value={form.client_hypotheses || ""}
          onChange={(v) => update("client_hypotheses", v)}
        />
      </FormSection>

      {/* FREE TEXT */}
      <FormSection
        title="Anything else?"
        subtitle="Something that didn't fit above."
      >
        <TextareaField
          id="notes"
          label="Notes"
          value={form.notes || ""}
          onChange={(v) => update("notes", v)}
        />
      </FormSection>

      {/* SUBMIT */}
      <div className="border-t border-white/5 pt-10">
        {serverError && (
          <p className="mb-4 text-sm text-red-400">{serverError}</p>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-brand-bright px-8 py-4 text-sm font-semibold text-ink transition-colors hover:bg-brand disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? "Sending..." : "Send my brief"}
        </button>
        <p className="mt-4 text-xs text-neutral-500">
          We read every submission. Expect a reply within 48 hours.
        </p>
      </div>
    </form>
  );
}

// ── Primitives ───────────────────────────────────────────────────────────

function FormSection({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-6 border-t border-white/5 pt-10">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
          {title}
        </h2>
        <p className="mt-2 text-neutral-500">{subtitle}</p>
      </div>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
  required,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-white">
        {label} {required && <span className="text-brand-bright">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-white/10 bg-bg-card px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:border-brand-bright focus:outline-none"
      />
      {error && <p className="mt-1.5 text-sm text-red-400">{error}</p>}
    </div>
  );
}

function TextareaField({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
  required,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-white">
        {label} {required && <span className="text-brand-bright">*</span>}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="w-full rounded-lg border border-white/10 bg-bg-card px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:border-brand-bright focus:outline-none"
      />
      {error && <p className="mt-1.5 text-sm text-red-400">{error}</p>}
    </div>
  );
}

function SelectField({
  id,
  label,
  value,
  onChange,
  options,
  error,
  required,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  error?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-white">
        {label} {required && <span className="text-brand-bright">*</span>}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-white/10 bg-bg-card px-4 py-3 text-sm text-white focus:border-brand-bright focus:outline-none"
      >
        <option value="">Select...</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {error && <p className="mt-1.5 text-sm text-red-400">{error}</p>}
    </div>
  );
}
