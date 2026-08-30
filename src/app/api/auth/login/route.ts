import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const staffRoles = ["super_admin", "admin", "account_manager", "specialist"];

export async function POST(request: Request) {
  const form = await request.formData();
  const email = String(form.get("email") || "").trim();
  const password = String(form.get("password") || "");
  const destination = String(form.get("destination")) === "admin" ? "admin" : "portal";
  const loginPath = destination === "admin" ? "/admin/login" : "/login";
  if (!email || !password) return NextResponse.redirect(new URL(`${loginPath}?error=missing`, request.url), 303);

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !data.user) return NextResponse.redirect(new URL(`${loginPath}?error=invalid`, request.url), 303);
  const { data: profile } = await supabase.from("profiles").select("role,status").eq("id", data.user.id).single();
  const forbidden = !profile || profile.status !== "active" || (destination === "admin" && !staffRoles.includes(profile.role));
  if (forbidden) {
    await supabase.auth.signOut();
    return NextResponse.redirect(new URL(`${loginPath}?error=forbidden`, request.url), 303);
  }
  return NextResponse.redirect(new URL(destination === "admin" ? "/admin" : "/portal/overview", request.url), 303);
}
