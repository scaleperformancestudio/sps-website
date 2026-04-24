import { NextRequest } from "next/server";
import { intakeSchema } from "@/lib/intake-schema";
import { createServerSupabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = intakeSchema.safeParse(body);
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
      company: data.company,
      name: data.name,
      email: data.email,
      website: data.website,
      business_type: data.business_type,
      product_description: data.product_description,
      target_audience: data.target_audience || null,
      monthly_budget: data.monthly_budget || null,
      platforms: data.platforms,
      creative_package: data.creative_package,
      media_buying: data.media_buying,
      media_buying_tier: data.media_buying_tier || null,
      sub_niche: data.sub_niche || null,
      usp: data.usp || null,
      brand_voice: data.brand_voice || null,
      brand_colors: data.brand_colors || null,
      brand_fonts: data.brand_fonts || null,
      productfeed_url: data.productfeed_url || null,
      productfeed_type: data.productfeed_type || null,
      competitors: data.competitors || null,
      baseline_roas: data.baseline_roas || null,
      baseline_cpa: data.baseline_cpa || null,
      baseline_notes: data.baseline_notes || null,
      restrictions: data.restrictions || null,
      client_hypotheses: data.client_hypotheses || null,
      notes: data.notes || null,
      status: "new",
      source: "website",
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
