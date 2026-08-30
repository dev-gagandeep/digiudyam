import "server-only";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { headers } from "next/headers";
import { requireAdmin } from "./auth";
import { emitNotificationSafe } from "@/lib/notifications/service";

export type ClientOnboardingInput = {
  organizationName: string;
  primaryContactName: string;
  clientEmail: string;
  businessName: string;
  industry?: string;
  locationName: string;
  city?: string;
  timezone?: string;
  serviceIds: string[];
  accountManagerId?: string;
  specialistIds: string[];
  targetDate?: string;
};

const slugify = (value: string) => `${value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}-${crypto.randomUUID().slice(0, 8)}`;

export async function onboardClient(input: ClientOnboardingInput) {
  const actor = await requireAdmin("edit_clients");
  const db = createSupabaseServerClient();
  const authAdmin = createSupabaseAdminClient();
  if (!input.serviceIds.length) {
    const { count } = await db.from("services").select("id", { count: "exact", head: true }).eq("active", true);
    if (count) throw new Error("Select at least one active service");
  }

  const { data: organization, error: organizationError } = await db.from("organizations").insert({
    name: input.organizationName,
    slug: slugify(input.organizationName),
    status: "onboarding",
    primary_contact_name: input.primaryContactName,
    primary_contact_email: input.clientEmail,
    account_manager_id: input.accountManagerId || actor.userId,
  }).select().single();
  if (organizationError) throw organizationError;

  const { data: business, error: businessError } = await db.from("businesses").insert({
    organization_id: organization.id,
    name: input.businessName,
    industry: input.industry || null,
    status: "setup",
  }).select().single();
  if (businessError) throw businessError;

  const { error: locationError } = await db.from("locations").insert({
    business_id: business.id,
    name: input.locationName,
    address: input.city ? { city: input.city } : {},
    timezone: input.timezone || "Asia/Kolkata",
    status: "setup",
  });
  if (locationError) throw locationError;

  const { data: invitation, error: invitationError } = await authAdmin.auth.admin.inviteUserByEmail(input.clientEmail, {
    data: { full_name: input.primaryContactName },
    redirectTo: `${headers().get("origin") || "http://localhost:3000"}/login`,
  });
  if (invitationError || !invitation.user) throw invitationError || new Error("Client invitation failed");

  const [membershipResult, assignmentResult, onboardingResult] = await Promise.all([
    db.from("organization_members").insert({ organization_id: organization.id, user_id: invitation.user.id, role: "client_owner", status: "active" }),
    db.from("team_assignments").insert({ organization_id: organization.id, user_id: input.accountManagerId || actor.userId, responsibility: "Account Manager" }),
    db.from("onboarding_records").insert({ organization_id: organization.id, owner_id: input.accountManagerId || actor.userId, status: "in_progress", started_at: new Date().toISOString().slice(0, 10), target_date: input.targetDate || null }).select().single(),
  ]);
  if (input.specialistIds.length) {
    const { error } = await db.from("team_assignments").insert(input.specialistIds.map((userId) => ({ organization_id: organization.id, user_id: userId, responsibility: "Specialist" })));
    if (error) throw error;
  }
  const serviceResult = input.serviceIds.length ? await db.from("client_services").insert(input.serviceIds.map((serviceId, index) => ({ organization_id: organization.id, business_id: business.id, service_id: serviceId, owner_id: input.specialistIds.length ? input.specialistIds[index % input.specialistIds.length] : input.accountManagerId || actor.userId, status: "setup" as const, reporting_enabled: true }))) : null;
  const writeError = membershipResult.error || assignmentResult.error || onboardingResult.error || serviceResult?.error;
  if (writeError) throw writeError;

  const onboardingId = (onboardingResult.data as { id: string }).id;
  const checklist = ["Confirm business details", "Confirm service scope", "Collect required access", "Verify location details", "Schedule kickoff"];
  const { error: checklistError } = await db.from("onboarding_items").insert(checklist.map((label, position) => ({ onboarding_id: onboardingId, label, position, status: "not_started" })));
  if (checklistError) throw checklistError;
  await Promise.all([
    emitNotificationSafe({event:"invitation_sent",recipientIds:[invitation.user.id],organizationId:organization.id,title:`Welcome to ${organization.name}`,body:"Your secure DigiUdyam client portal invitation has been sent.",email:{recipients:[input.clientEmail],actionLabel:"Open DigiUdyam",actionUrl:`${headers().get("origin")||"http://localhost:3000"}/login`}}),
    emitNotificationSafe({event:"client_created",recipientIds:[input.accountManagerId||actor.userId],organizationId:organization.id,title:`Client created: ${organization.name}`,body:`Onboarding started with ${input.serviceIds.length} assigned service${input.serviceIds.length===1?"":"s"}.`}),
    ...(input.serviceIds.length?[emitNotificationSafe({event:"service_assigned",recipientIds:[invitation.user.id],organizationId:organization.id,title:"Services assigned",body:`${input.serviceIds.length} service${input.serviceIds.length===1?" is":"s are"} ready for onboarding.`})]:[]),
  ]);
  return { organizationId: organization.id, businessId: business.id, invitedUserId: invitation.user.id };
}

export async function getOnboardingOptions() {
  await requireAdmin("edit_clients");
  const db = createSupabaseServerClient();
  const [{ data: services, error: servicesError }, { data: staff, error: staffError }] = await Promise.all([
    db.from("services").select("id,name").eq("active", true).order("name"),
    db.from("profiles").select("id,full_name,role").in("role", ["super_admin", "admin", "account_manager", "specialist"]).eq("status", "active").order("full_name"),
  ]);
  if (servicesError || staffError) throw servicesError || staffError;
  return { services: services || [], staff: staff || [] };
}

export async function getServiceManagementData() {
  await requireAdmin("manage_services");
  const db = createSupabaseServerClient();
  const { data, error } = await db.from("services").select("id,code,name,category,description,active,created_at,updated_at").order("name");
  if (error) throw error;
  return data || [];
}
