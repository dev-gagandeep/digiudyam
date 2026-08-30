"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/auth";
import { adminRepository } from "@/lib/admin/repository";
import { onboardClient } from "@/lib/admin/onboarding-service";
import { assignClientTeam, inviteStaff, updateStaff } from "@/lib/admin/team-service";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { emitNotificationSafe } from "@/lib/notifications/service";

const value = (form: FormData, key: string) => String(form.get(key) || "").trim();
const required = (form: FormData, key: string) => {
  const result = value(form, key);
  if (!result) throw new Error(`Missing ${key}`);
  return result;
};

export async function onboardClientAction(form: FormData) {
  const result = await onboardClient({
    organizationName: required(form, "organization_name"),
    primaryContactName: required(form, "primary_contact_name"),
    clientEmail: required(form, "client_email"),
    businessName: required(form, "business_name"),
    industry: value(form, "industry"),
    locationName: required(form, "location_name"),
    city: value(form, "city"),
    timezone: value(form, "timezone"),
    serviceIds: form.getAll("service_ids").map(String).filter(Boolean),
    accountManagerId: value(form, "account_manager_id"),
    specialistIds: form.getAll("specialist_ids").map(String).filter(Boolean),
    targetDate: value(form, "target_date"),
  });
  revalidatePath("/admin/clients");
  revalidatePath("/admin/onboarding");
  void result;
}

export async function updateOrganizationAction(form: FormData) {
  await requireAdmin("edit_clients");
  const id = required(form, "id");
  await adminRepository.updateOrganization(id, {
    name: required(form, "name"),
    primary_contact_name: value(form, "primary_contact_name") || null,
    primary_contact_email: value(form, "primary_contact_email") || null,
  });
  revalidatePath(`/admin/clients/${id}`);
}

export async function updateRequestAction(form: FormData) {
  await requireAdmin("manage_requests");
  await adminRepository.updateRequest(required(form, "id"), {
    status: required(form, "status") as "submitted" | "assigned" | "in_progress" | "waiting_on_client" | "completed" | "cancelled",
    assigned_to: value(form, "assigned_to") || null,
    due_at: value(form, "due_at") || null,
  });
  revalidatePath("/admin/requests");
}

export async function createTaskAction(form: FormData) {
  const actor = await requireAdmin("manage_requests");
  const task = await adminRepository.createTask({
    organization_id: required(form, "organization_id"),
    title: required(form, "title"),
    category: value(form, "category") || "Client Support",
    priority: value(form, "priority") || "normal",
    status: "pending",
    assignee_id: value(form, "assignee_id") || actor.userId,
    due_at: value(form, "due_at") || null,
  });
  await emitNotificationSafe({event:"task_assigned",recipientIds:[task.assignee_id||actor.userId],organizationId:task.organization_id,title:`Task assigned: ${task.title}`,body:task.due_at?`Due ${new Date(task.due_at).toLocaleDateString("en-IN")}.`:"No deadline has been set."});
  revalidatePath("/admin/tasks");
}

export async function updateTaskAction(form: FormData) {
  await requireAdmin("manage_requests");
  const db=createSupabaseServerClient();
  const id=required(form,"id");
  const {data:before,error:readError}=await db.from("tasks").select("id,title,organization_id,status,assignee_id").eq("id",id).single();
  if(readError)throw readError;
  const status = required(form, "status");
  const assigneeId=value(form,"assignee_id")||null;
  await adminRepository.updateTask(id, { status, assignee_id: assigneeId, due_at: value(form, "due_at") || null, description: value(form, "notes") || null, completed_at: status === "completed" ? new Date().toISOString() : null });
  if(assigneeId&&assigneeId!==before.assignee_id)await emitNotificationSafe({event:"task_assigned",recipientIds:[assigneeId],organizationId:before.organization_id,title:`Task assigned: ${before.title}`,body:"This delivery task is now assigned to you."});
  if(status==="completed"&&before.status!=="completed"){const {data:members}=await db.from("organization_members").select("user_id").eq("organization_id",before.organization_id).eq("status","active");await emitNotificationSafe({event:"task_completed",recipientIds:(members||[]).map(member=>member.user_id),organizationId:before.organization_id,title:`Completed: ${before.title}`,body:"A delivery task for your account has been completed."});}
  revalidatePath("/admin/tasks");
}

export async function createReportAction(form: FormData) {
  const actor = await requireAdmin("manage_reports");
  await adminRepository.createReport({
    organization_id: required(form, "organization_id"),
    owner_id: actor.userId,
    title: required(form, "title"),
    period_type: required(form, "period_type") as "monthly" | "quarterly" | "custom",
    period_start: required(form, "period_start"),
    period_end: required(form, "period_end"),
    status: "draft",
  });
  revalidatePath("/admin/reports");
}

export async function markNotificationReadAction(id: string) {
  const actor = await requireAdmin();
  await adminRepository.markNotificationRead(id, actor.userId);
  revalidatePath("/admin");
}

export async function createServiceAction(form: FormData) {
  await requireAdmin("manage_services");
  await adminRepository.createService({
    code: required(form, "code").toLowerCase().replace(/[^a-z0-9]+/g, "_"),
    name: required(form, "name"),
    category: required(form, "category") as "build" | "get_found" | "get_customers" | "automate_grow",
    description: value(form, "description") || null,
    active: true,
  });
  revalidatePath("/admin/services");
  revalidatePath("/admin/clients");
}

export async function updateServiceAction(form: FormData) {
  await requireAdmin("manage_services");
  await adminRepository.updateService(required(form, "id"), {
    name: required(form, "name"),
    category: required(form, "category") as "build" | "get_found" | "get_customers" | "automate_grow",
    description: value(form, "description") || null,
  });
  revalidatePath("/admin/services");
}

export async function toggleServiceAction(form: FormData) {
  await requireAdmin("manage_services");
  await adminRepository.updateService(required(form, "id"), { active: value(form, "active") !== "true" });
  revalidatePath("/admin/services");
  revalidatePath("/admin/clients");
}

export async function inviteStaffAction(form: FormData) {
  await inviteStaff({ email: required(form, "email"), name: required(form, "name"), role: required(form, "role") as "admin" | "account_manager" | "specialist" });
  revalidatePath("/admin/team");
}

export async function updateStaffAction(form: FormData) {
  await updateStaff({ userId: required(form, "user_id"), role: required(form, "role") as "admin" | "account_manager" | "specialist", active: value(form, "status") !== "active" });
  revalidatePath("/admin/team");
}

export async function assignClientTeamAction(form: FormData) {
  const serviceOwners = Object.fromEntries(Array.from(form.entries()).filter(([key]) => key.startsWith("service_owner_")).map(([key, entry]) => [key.replace("service_owner_", ""), String(entry)]));
  await assignClientTeam({ organizationId: required(form, "organization_id"), accountManagerId: value(form, "account_manager_id"), specialistIds: form.getAll("specialist_ids").map(String).filter(Boolean), serviceOwners });
  revalidatePath("/admin/team");
  revalidatePath("/admin/clients");
}
