import "server-only";
import { cache } from "react";
import { headers } from "next/headers";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdmin } from "./auth";
import type { AdminClient, AdminData } from "./types";

export interface AdminDataProvider {
  mode: "production";
  getDashboard(scope?: AdminDataScope): Promise<AdminData>;
  search(query: string, types?: string[]): Promise<{ type: string; id: string; label: string }[]>;
}

export type AdminDataScope = "all" | "dashboard" | "clients" | "onboarding" | "requests" | "tasks" | "reports" | "integrations" | "team";

type Row = Record<string, any>;
const label = (value: string) => value.split("_").map((part) => part[0]?.toUpperCase() + part.slice(1)).join(" ");
const rows = (result: { data: unknown }) => (result.data || []) as Row[];

class SupabaseAdminProvider implements AdminDataProvider {
  mode = "production" as const;

  getDashboard = cache(async (requestedScope?: AdminDataScope): Promise<AdminData> => {
    await requireAdmin("view_clients");
    const db = createSupabaseServerClient();
    const route = headers().get("x-du-route") || "";
    const inferredScope: AdminDataScope = route.startsWith("/admin/clients/") ? "all" : route.includes("/onboarding") ? "onboarding" : route.includes("/requests") ? "requests" : route.includes("/tasks") ? "tasks" : route.includes("/reports") ? "reports" : route.includes("/integrations") ? "integrations" : route.includes("/team") ? "team" : route.includes("/clients") ? "clients" : route === "/admin" ? "dashboard" : "all";
    const scope = requestedScope || inferredScope;
    const wants = (...scopes: AdminDataScope[]) => scope === "all" || scopes.includes(scope);
    const empty = () => Promise.resolve({ data: [], error: null });
    const results = await Promise.all([
      wants("dashboard","clients","onboarding","requests","tasks","reports","team") ? db.from("profiles").select("*") : empty(),
      wants("dashboard","clients","onboarding","requests","tasks","reports","integrations","team") ? db.from("organizations").select("*") : empty(),
      wants("dashboard","clients","onboarding","requests","tasks","reports","integrations","team") ? db.from("businesses").select("*") : empty(),
      wants("clients","team") ? db.from("organization_members").select("*") : empty(),
      wants("dashboard","clients","integrations") ? db.from("locations").select("*") : empty(),
      wants("dashboard","clients") ? db.from("services").select("*") : empty(),
      wants("dashboard","clients") ? db.from("client_services").select("*") : empty(),
      wants("dashboard","clients") ? db.from("service_delivery_items").select("*") : empty(),
      wants("onboarding") ? db.from("onboarding_records").select("*") : empty(),
      wants("onboarding") ? db.from("onboarding_items").select("*") : empty(),
      wants("dashboard","requests") ? db.from("requests").select("*") : empty(),
      wants("dashboard","tasks","team") ? db.from("tasks").select("*") : empty(),
      wants("dashboard","reports") ? db.from("reports").select("*") : empty(),
      wants("reports") ? db.from("report_blocks").select("*") : empty(),
      wants("dashboard","clients","integrations") ? db.from("integration_connections").select("id,organization_id,business_id,location_id,integration_id,account_identifier,scopes,status,sync_status,error_code,connected_at,last_sync_at,next_sync_at,created_at,updated_at") : empty(),
      wants("dashboard","integrations") ? db.from("integrations").select("id,display_name") : empty(),
      wants("clients","team") ? db.from("team_assignments").select("*") : empty(),
      wants("requests") ? db.from("notes").select("*").limit(500) : empty(),
      wants("dashboard") ? db.from("audit_logs").select("*").order("created_at", { ascending: false }).limit(100) : empty(),
      wants("dashboard") ? db.from("notifications").select("*").order("created_at", { ascending: false }).limit(100) : empty(),
    ]);
    const failure = results.find((result) => result.error);
    if (failure?.error) throw failure.error;
    const [profiles, orgs, businesses, memberships, locations, serviceCatalog, clientServices, delivery, onboarding, onboardingItems, requests, tasks, reports, blocks, connections, integrationCatalog, assignments, notes, audit, notifications] = results.map(rows);

    const clients: AdminClient[] = orgs.map((org) => {
      const orgBusinesses = businesses.filter((business) => business.organization_id === org.id);
      const orgLocations = locations.filter((location) => orgBusinesses.some((business) => business.id === location.business_id));
      return {
        id: org.id,
        name: org.name,
        industry: orgBusinesses[0]?.industry || "Not specified",
        primaryContact: org.primary_contact_name || "Not provided",
        contactEmail: org.primary_contact_email || "Not provided",
        accountManagerId: org.account_manager_id || "",
        locations: orgLocations.map((location) => ({
          id: location.id,
          name: location.name,
          address: typeof location.address === "object" && location.address ? Object.values(location.address).filter(Boolean).join(", ") : "",
          phone: location.phone || "",
          website: location.website || undefined,
          googleBusinessId: location.google_business_identifier || undefined,
          crmLocationId: location.crm_location_identifier || undefined,
          serviceArea: location.service_area || "",
          timezone: location.timezone,
          status: label(location.status),
        })),
        services: clientServices.filter((service) => service.organization_id === org.id).map((service) => ({
          id: service.id,
          type: serviceCatalog.find((item) => item.id === service.service_id)?.name || "Service",
          status: label(service.status),
          startDate: service.start_date || "",
          ownerId: service.owner_id || "",
          plan: service.plan || "",
          notes: service.notes || undefined,
          reportingEnabled: service.reporting_enabled,
          integrations: connections.filter((connection) => connection.organization_id === org.id).map((connection) => connection.id),
          delivery: delivery.filter((item) => item.client_service_id === service.id).map((item) => ({ id: item.id, label: item.label, status: label(item.status) })),
        })),
        status: label(org.status),
        health: label(org.health),
        healthReasons: org.health_reasons || [],
        lastActivity: org.updated_at,
        createdAt: org.created_at,
      } as AdminClient;
    });

    return {
      users: profiles.map((profile) => ({ id: profile.id, name: profile.full_name, email: profile.email || "", role: profile.role, status: label(profile.status) })),
      clients,
      onboarding: onboarding.map((record) => ({ id: record.id, clientId: record.organization_id, ownerId: record.owner_id || "", startedAt: record.started_at || "", targetDate: record.target_date || "", items: onboardingItems.filter((item) => item.onboarding_id === record.id).map((item) => ({ id: item.id, label: item.label, status: label(item.status) })) })),
      requests: requests.map((request) => ({ id: request.id, clientId: request.organization_id, type: request.request_type, title: request.title, priority: label(request.priority), assigneeId: request.assigned_to || "", created: request.created_at, dueDate: request.due_at || "", status: request.status === "submitted" ? "New" : label(request.status), internalNotes: notes.filter((note) => note.related_type === "request" && note.related_id === request.id).length })),
      tasks: tasks.map((task) => ({ id: task.id, title: task.title, clientId: task.organization_id, locationId: task.location_id || undefined, relatedEntity: task.request_id ? { type: "request", id: task.request_id } : undefined, assigneeId: task.assignee_id || "", priority: label(task.priority), dueDate: task.due_at || "", status: task.status === "to_do" || task.status === "pending" ? "Pending" : task.status === "blocked" ? "Review" : label(task.status), category: label(task.category), notes: task.description || undefined })),
      reports: reports.map((report) => ({ id: report.id, clientId: report.organization_id, title: report.title, periodType: label(report.period_type), period: `${report.period_start} – ${report.period_end}`, status: label(report.status), ownerId: report.owner_id || "", updated: report.updated_at, blocks: blocks.filter((block) => block.report_id === report.id).map((block) => ({ id: block.id, type: block.block_type, title: block.title, source: block.data_source || undefined })) })),
      integrations: connections.map((connection) => ({ id: connection.id, clientId: connection.organization_id, locationId: connection.location_id || undefined, provider: integrationCatalog.find((item) => item.id === connection.integration_id)?.display_name || "Other", accountIdentifier: connection.account_identifier || "Not assigned", connectedAt: connection.connected_at || undefined, lastSync: connection.last_sync_at || undefined, nextSync: connection.next_sync_at || undefined, status: label(connection.status), scopes: connection.scopes || [], syncStatus: label(connection.sync_status) })),
      assignments: [
        ...assignments.map((assignment) => ({ id: assignment.id, clientId: assignment.organization_id, userId: assignment.user_id, responsibility: assignment.responsibility })),
        ...memberships.filter((membership) => membership.status === "active" && !assignments.some((assignment) => assignment.organization_id === membership.organization_id && assignment.user_id === membership.user_id)).map((membership) => ({ id: membership.id, clientId: membership.organization_id, userId: membership.user_id, responsibility: label(membership.role) })),
      ],
      notes: notes.map((note) => ({ id: note.id, clientId: note.organization_id, authorId: note.author_id, timestamp: note.created_at, content: note.content, related: note.related_type && note.related_id ? { type: note.related_type, id: note.related_id } : undefined })),
      audit: audit.map((event) => ({ id: String(event.id), actorId: event.actor_id || "", action: event.action, entity: { type: event.entity_type, id: event.entity_id }, timestamp: event.created_at, metadata: event.metadata || {} })),
      notifications: notifications.map((notification) => ({ id: notification.id, type: notification.notification_type, title: notification.title, clientId: notification.organization_id || undefined, created: notification.created_at, read: Boolean(notification.read_at), severity: notification.severity })),
    } as AdminData;
  });

  async search(query: string) {
    await requireAdmin("view_clients");
    const db = createSupabaseServerClient();
    const { data, error } = await db.from("organizations").select("id,name").ilike("name", `%${query.slice(0, 80)}%`).limit(20);
    if (error) throw error;
    return (data || []).map((item) => ({ type: "client", id: item.id, label: item.name }));
  }
}

export const adminDataProvider: AdminDataProvider = new SupabaseAdminProvider();
