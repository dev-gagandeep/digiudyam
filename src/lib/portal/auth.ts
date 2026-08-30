import "server-only";
import { cache } from "react";
import { getAuthContext } from "@/lib/supabase/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { PortalUser } from "./types";

export type PortalSession = { user: PortalUser; organizationId: string; businessId: string };

export const getPortalSession = cache(async (): Promise<PortalSession | null> => {
  const context = await getAuthContext();
  if (!context || !["client_owner", "client_staff"].includes(context.profile.role)) return null;
  const db = createSupabaseServerClient();
  const { data: membership } = await db.from("organization_members").select("organization_id,role").eq("user_id", context.userId).eq("status", "active").limit(1).maybeSingle();
  if (!membership) return null;
  const { data: business } = await db.from("businesses").select("id").eq("organization_id", membership.organization_id).in("status", ["setup", "active"]).order("created_at").limit(1).maybeSingle();
  return {
    user: { id: context.userId, name: context.profile.full_name, email: context.profile.email || "", role: membership.role === "client_owner" ? "client_owner" : "client_staff", organizationId: membership.organization_id },
    organizationId: membership.organization_id,
    businessId: business?.id || "",
  };
});
