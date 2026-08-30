import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { completionProgress, isOpenStatus, isOverdue, nextAction, serviceHealth } from "@/lib/delivery-intelligence";
import { requireAdmin } from "./auth";

export async function getServiceDeliveryIntelligence() {
  await requireAdmin("view_clients");
  const db = createSupabaseServerClient();
  const [organizations, services, subscriptions, profiles, assignments, tasks, requests, reports, audit] = await Promise.all([
    db.from("organizations").select("id,name,status").in("status", ["active", "onboarding", "paused"]).order("name"),
    db.from("services").select("id,name"),
    db.from("client_services").select("id,organization_id,service_id,owner_id,status,start_date,updated_at").eq("status", "active"),
    db.from("profiles").select("id,full_name"),
    db.from("team_assignments").select("organization_id,user_id,responsibility"),
    db.from("tasks").select("id,organization_id,client_service_id,assignee_id,title,status,due_at,updated_at"),
    db.from("requests").select("id,organization_id,title,status,due_at,updated_at"),
    db.from("reports").select("id,organization_id,title,status,period_end,updated_at"),
    db.from("audit_logs").select("id,organization_id,action,created_at").order("created_at", { ascending: false }).limit(250),
  ]);
  const results = [organizations, services, subscriptions, profiles, assignments, tasks, requests, reports, audit];
  const failed = results.find((result) => result.error);
  if (failed?.error) throw failed.error;
  const serviceRows = subscriptions.data || [];
  const taskRows = tasks.data || [];
  const requestRows = requests.data || [];
  const reportRows = reports.data || [];
  const profileRows = profiles.data || [];
  const serviceCatalog = services.data || [];

  const clientServices = serviceRows.map((subscription) => {
    const relatedTasks = taskRows.filter((task) => task.client_service_id === subscription.id);
    const organizationRequests = requestRows.filter((request) => request.organization_id === subscription.organization_id && isOpenStatus(request.status));
    const organizationReports = reportRows.filter((report) => report.organization_id === subscription.organization_id && report.status === "published");
    const latestActivity = [subscription.updated_at, ...relatedTasks.map((task) => task.updated_at), ...organizationRequests.map((request) => request.updated_at), ...organizationReports.map((report) => report.updated_at)].filter(Boolean).sort().at(-1) || null;
    const progress = completionProgress(relatedTasks);
    const upcoming = relatedTasks.filter((task) => isOpenStatus(task.status) && task.due_at).sort((a, b) => String(a.due_at).localeCompare(String(b.due_at)));
    return {
      id: subscription.id,
      organizationId: subscription.organization_id,
      organizationName: (organizations.data || []).find((organization) => organization.id === subscription.organization_id)?.name || "Client",
      serviceName: serviceCatalog.find((service) => service.id === subscription.service_id)?.name || "Service",
      status: subscription.status,
      owner: profileRows.find((profile) => profile.id === subscription.owner_id)?.full_name || "Unassigned",
      progress,
      health: serviceHealth(relatedTasks, organizationRequests.length, latestActivity),
      openRequests: organizationRequests.length,
      overdueTasks: relatedTasks.filter((task) => isOverdue(task)).length,
      pendingTasks: relatedTasks.filter((task) => isOpenStatus(task.status)).length,
      upcomingDeadline: upcoming[0]?.due_at || null,
      latestActivity,
      nextAction: nextAction(relatedTasks, organizationRequests),
      publishedReports: organizationReports.length,
    };
  });

  return {
    clientServices,
    summary: {
      active: clientServices.filter((service) => service.status === "active").length,
      delayed: clientServices.filter((service) => service.health === "delayed").length,
      pendingTasks: clientServices.reduce((sum, service) => sum + service.pendingTasks, 0),
      upcomingDeadlines: clientServices.filter((service) => service.upcomingDeadline).length,
    },
    assignments: assignments.data || [],
    activity: audit.data || [],
  };
}
