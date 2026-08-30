import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { takeChatRateLimit } from "@/lib/chat/rate-limit";
import { emitNotificationSafe } from "@/lib/notifications/service";

export const runtime = "nodejs";
const clean = (value: unknown, max = 180) => typeof value === "string" ? value.trim().slice(0, max) : "";

export async function POST(request: NextRequest) {
  const address = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  const rate = takeChatRateLimit(`audit:${address}`, 5, 15 * 60 * 1000);
  if (!rate.allowed) return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  let body: Record<string, unknown>; try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  const name = clean(body.name), business = clean(body.business_name), phone = clean(body.phone, 30), city = clean(body.city), website = clean(body.website), service = clean(body.service);
  if (!name || !business || !phone || !city || !service) return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
  const db = createSupabaseAdminClient();
  const { data: staff, error: staffError } = await db.from("profiles").select("id,role").eq("status", "active").in("role", ["super_admin", "admin", "account_manager"]).order("created_at");
  if (staffError || !staff?.length) { console.error("Growth audit owner lookup failed", { code: staffError?.code }); return NextResponse.json({ error: "We could not save your request. Please contact us on WhatsApp." }, { status: 503 }); }
  const owner = staff.find(person => person.role === "account_manager") || staff[0];
  const { data: lead, error } = await db.from("leads").insert({ name, business_name: business, phone, website: website || null, location: city, lead_source: "Website Growth Audit", notes: `Required service: ${service}`, status: "new_lead", pipeline_value: 0, sales_owner_id: owner.id, created_by: owner.id }).select("id").single();
  if (error) { console.error("Growth audit lead creation failed", { code: error.code, message: error.message }); return NextResponse.json({ error: "We could not save your request. Please contact us on WhatsApp." }, { status: 500 }); }
  await Promise.all([
    db.from("lead_activities").insert({ lead_id: lead.id, actor_id: owner.id, activity_type: "note", summary: `Free growth audit requested for ${service}` }),
    emitNotificationSafe({ event: "lead_created", recipientIds: Array.from(new Set(staff.map(person => person.id))), title: `Growth audit: ${business}`, body: `${name} requested help with ${service}.` })
  ]);
  return NextResponse.json({ ok: true });
}
