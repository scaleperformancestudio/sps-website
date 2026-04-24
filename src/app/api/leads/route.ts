import { NextRequest } from "next/server";
import { z } from "zod";
import { createServerSupabase } from "@/lib/supabase";

/**
 * Mini intake endpoint — accepts the short 4-field onboarding from /start.
 * All heavy intake fields (product description, competitors, audience, etc.)
 * are collected post-onboarding via the dashboard's creative request flow.
 */

const miniSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(2),
  website: z.string().url().or(z.literal("")).optional(),
  goal: z.enum(["just_creative", "creative_media", "not_sure"]),
  message: z.string().max(500).optional(),
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = miniSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      {
        error: "Validation failed",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const data = parsed.data;

  try {
    const supabase = createServerSupabase();
    const { error } = await supabase.from("leads").insert({
      name: data.name,
      email: data.email,
      company: data.company,
      website: data.website || null,
      // Map goal to existing columns for backward compat with the leads table
      creative_package: data.goal === "just_creative" ? "not_sure_yet" : null,
      media_buying: data.goal === "creative_media" ? "yes" : data.goal === "just_creative" ? "no" : null,
      notes: data.message || null,
      status: "new",
      source: "website_mini_intake",
    });

    if (error) {
      console.error("[leads] insert failed:", error.message);
      return Response.json(
        { error: "Database error", detail: error.message },
        { status: 500 }
      );
    }

    return Response.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("[leads] unexpected error:", msg);
    return Response.json({ error: msg }, { status: 500 });
  }
}
