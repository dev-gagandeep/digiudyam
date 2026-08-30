import "server-only";
import { headers } from "next/headers";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdmin } from "./auth";

export async function getTeamManagementData() {
  await requireAdmin("manage_team");
  const db = createSupabaseServerClient();
  const [profiles, organizations, assignments, services, clientServices, tasks, audit] = await Promise.all([
    db.from("profiles").select("id,full_name,email,role,status,created_at").in("role", ["super_admin", "admin", "account_manager", "specialist"]).order("full_name"),
    db.from("organizations").select("id,name,account_manager_id,status").order("name"),
    db.from("team_assignments").select("id,organization_id,user_id,responsibility"),
    db.from("services").select("id,name").order("name"),
    db.from("client_services").select("id,organization_id,service_id,owner_id,status"),
    db.from("tasks").select("id,organization_id,assignee_id,status"),
    db.from("audit_logs").select("id,organization_id,actor_id,action,entity_type,entity_id,created_at").order("created_at", { ascending: false }).limit(100),
  ]);
  const failure = [profiles, organizations, assignments, services, clientServices, tasks, audit].find((result) => result.error);
  if (failure?.error) throw failure.error;
  return { profiles: profiles.data || [], organizations: organizations.data || [], assignments: assignments.data || [], services: services.data || [], clientServices: clientServices.data || [], tasks: tasks.data || [], audit: audit.data || [] };
}

export async function inviteStaff(input: { email: string; name: string; role: "admin" | "account_manager" | "specialist" }) {
  await requireAdmin("manage_team");
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin.auth.admin.inviteUserByEmail(input.email, { data: { full_name: input.name }, redirectTo: `${headers().get("origin") || "http://localhost:3000"}/admin/login` });
  if (error || !data.user) throw error || new Error("Invitation failed");
  const { error: profileError } = await admin.from("profiles").update({ full_name: input.name, email: input.email, role: input.role, status: "active" }).eq("id", data.user.id);
  if (profileError) throw profileError;
}

export async function updateStaff(input: { userId: string; role: "admin" | "account_manager" | "specialist"; active: boolean }) {
  const actor = await requireAdmin("manage_team");
  if (actor.userId === input.userId && !input.active) throw new Error("You cannot deactivate your own account");
  const admin = createSupabaseAdminClient();
  const { error } = await admin.from("profiles").update({ role: input.role, status: input.active ? "active" : "disabled" }).eq("id", input.userId);
  if (error) throw error;
}

export async function assignClientTeam(input: { organizationId: string; accountManagerId: string; specialistIds: string[]; serviceOwners: Record<string, string> }) {
  await requireAdmin("manage_team");
  const db = createSupabaseServerClient();
  const { error: organizationError } = await db.from("organizations").update({ account_manager_id: input.accountManagerId || null }).eq("id", input.organizationId);
  if (organizationError) throw organizationError;
  const { error: removeError } = await db.from("team_assignments").delete().eq("organization_id", input.organizationId);
  if (removeError) throw removeError;
  const assignmentRows = [
    ...(input.accountManagerId ? [{ organization_id: input.organizationId, user_id: input.accountManagerId, responsibility: "Account Manager" }] : []),
    ...input.specialistIds.map((userId) => ({ organization_id: input.organizationId, user_id: userId, responsibility: "Specialist" })),
  ];
  if (assignmentRows.length) {
    const { error } = await db.from("team_assignments").insert(assignmentRows);
    if (error) throw error;
  }
  await Promise.all(Object.entries(input.serviceOwners).filter(([, ownerId]) => ownerId).map(([clientServiceId, ownerId]) => db.from("client_services").update({ owner_id: ownerId }).eq("id", clientServiceId).eq("organization_id", input.organizationId)));
}
