import { NextRequest } from "next/server";
import { z } from "zod";
import { createServerSupabase } from "@/lib/supabase";

/**
 * Lek-check-aanvraag vanaf /websites/<locale>/lek-check (de pagina achter de
 * flyer). Landt direct in de CRM (web_prospects + een notitie), niet in de
 * e-commerce-leads-tabel: dit zijn lokale prospects die Emre en Emin zelf
 * opvolgen. Het vinkje `consent` is de toestemming om te mogen bellen of
 * appen (Telecommunicatiewet 11.7); zonder dat vinkje wordt niets opgeslagen.
 */

const schema = z.object({
  name: z.string().min(2).max(80),
  company: z.string().min(2).max(120),
  phone: z.string().min(8).max(20),
  email: z.string().email().or(z.literal("")).optional(),
  city: z.string().max(80).optional(),
  message: z.string().max(600).optional(),
  consent: z.literal(true),
  via: z.string().max(20).optional(),
  locale: z.enum(["nl", "en"]).default("nl"),
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const d = parsed.data;
  const via = d.via === "emre" || d.via === "emin" ? d.via : null;
  const when = new Date().toISOString();

  try {
    const sb = createServerSupabase();
    const { data: prospect, error } = await sb
      .from("web_prospects")
      .insert({
        business_name: d.company.trim(),
        niche: "lek-check",
        city: (d.city || "Nijmegen").trim(),
        country: "nl",
        phone: d.phone.trim(),
        email: d.email ? d.email.trim() : null,
        contact_name: d.name.trim(),
        status: "new",
        preferred_channel: "whatsapp",
        owner: via,
        notes: `Lek-check-aanvraag via de site (${d.locale})${via ? `, ${via} was langs` : ""}. Toestemming bellen/appen gegeven op ${when}.`,
      })
      .select("id")
      .single();
    if (error || !prospect) {
      console.error("[lek-check] insert failed:", error?.message);
      return Response.json({ error: "Database error" }, { status: 500 });
    }

    const lines = [
      `📥 Lek-check aangevraagd via /lek-check (${d.locale})${via ? `, langs geweest: ${via}` : ""}.`,
      `Contact: ${d.name.trim()}, ${d.phone.trim()}${d.email ? `, ${d.email.trim()}` : ""}.`,
      `Toestemming om te bellen/appen: JA, ${when}.`,
      d.message?.trim() ? `Wat speelt er: ${d.message.trim()}` : null,
    ].filter(Boolean);
    const { error: actErr } = await sb.from("web_prospect_activities").insert({
      prospect_id: prospect.id,
      type: "note",
      channel: "website",
      body: lines.join("\n"),
      created_by: "website",
    });
    if (actErr) console.error("[lek-check] activity failed:", actErr.message);

    return Response.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("[lek-check] unexpected:", msg);
    return Response.json({ error: msg }, { status: 500 });
  }
}
