import "server-only";
import { cache } from "react";
import { createSupabaseServerClient } from "./server";
import type { Tables } from "./database.types";

export type AuthContext = { userId: string; profile: Tables<"profiles">; organizationIds: string[] };

export const getAuthContext = cache(async (): Promise<AuthContext | null> => {
  const supabase = createSupabaseServerClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;
  const [{ data: profile }, { data: memberships }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    supabase.from("organization_members").select("organization_id").eq("user_id", user.id).eq("status", "active"),
  ]);
  if (!profile) return null;
  return { userId: user.id, profile, organizationIds: (memberships || []).map((item) => item.organization_id) };
});
