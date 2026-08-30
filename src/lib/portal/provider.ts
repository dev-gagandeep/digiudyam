import "server-only";
import { cache } from "react";
import { headers } from "next/headers";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getPortalSession } from "./auth";
import type { DashboardData } from "./types";
import { completionProgress, isOverdue } from "@/lib/delivery-intelligence";

const requestStatus = (status: string) => status === "submitted" ? "Submitted" : status === "in_progress" ? "In Progress" : status === "waiting_on_client" ? "Waiting for Client" : status === "completed" ? "Completed" : "In Review";

export const getPortalData = cache(async (): Promise<DashboardData> => {
  const session = await getPortalSession();
  if (!session) throw new Error("UNAUTHORIZED");
  const db = createSupabaseServerClient();
  const organizationId = session.organizationId;
  const route = headers().get("x-du-route") || "/portal/overview";
  const overview = route === "/portal" || route.includes("/overview");
  const requestsPage = route.includes("/requests");
  const reportsPage = route.includes("/reports");
  const settingsPage = route.includes("/settings");
  const empty = () => Promise.resolve({ data: [], error: null });
  const [orgResult, businessesResult, locationsResult, servicesResult, clientServicesResult, deliveryResult, tasksResult, requestsResult, reportsResult, notificationsResult, connectionsResult, integrationsResult] = await Promise.all([
    db.from("organizations").select("id,name").eq("id", organizationId).single(),
    db.from("businesses").select("id,name,industry").eq("organization_id", organizationId).order("name"),
    db.from("locations").select("id,business_id,name,address").order("name"),
    overview ? db.from("services").select("id,name") : empty(),
    overview ? db.from("client_services").select("id,service_id,status,plan,start_date").eq("organization_id", organizationId) : empty(),
    overview ? db.from("service_delivery_items").select("id,client_service_id,label,status,due_at,completed_at,updated_at").order("position") : empty(),
    overview ? db.rpc("client_task_summaries", { target_org: organizationId }) : empty(),
    overview || requestsPage ? db.from("requests").select("id,title,request_type,priority,status,updated_at").eq("organization_id", organizationId).order("updated_at", { ascending: false }).limit(30) : empty(),
    overview || reportsPage ? db.from("reports").select("id,title,period_start,period_end,status,executive_summary,updated_at").eq("organization_id", organizationId).eq("status", "published").order("period_end", { ascending: false }).limit(20) : empty(),
    overview ? db.from("notifications").select("id,notification_type,title,body,severity,read_at,created_at").eq("user_id", session.user.id).order("created_at", { ascending: false }).limit(30) : empty(),
    overview || settingsPage ? db.from("integration_connections").select("id,integration_id,status,last_sync_at").eq("organization_id", organizationId) : empty(),
    overview || settingsPage ? db.from("integrations").select("id,display_name") : empty(),
  ]);
  const failure = [orgResult, businessesResult, locationsResult, servicesResult, clientServicesResult, deliveryResult, tasksResult, requestsResult, reportsResult, notificationsResult, connectionsResult, integrationsResult].find((result) => result.error);
  if (failure?.error || !orgResult.data) throw failure?.error || new Error("Organization unavailable");

  const businesses = businessesResult.data || [];
  const locations = locationsResult.data || [];
  const services = servicesResult.data || [];
  const clientServices = clientServicesResult.data || [];
  const deliveryItems = deliveryResult.data || [];
  const tasks = tasksResult.data || [];
  const requests = requestsResult.data || [];
  const reports = reportsResult.data || [];
  const notifications = notificationsResult.data || [];
  const connections = connectionsResult.data || [];
  const integrations = integrationsResult.data || [];
  const activeServices = clientServices.filter((item) => item.status === "active");
  const openTasks = tasks.filter((item) => item.status !== "completed");
  const openRequests = requests.filter((item) => item.status !== "completed" && item.status !== "cancelled");
  const serviceDelivery = activeServices.map((item) => {
    const work = deliveryItems.filter((delivery) => delivery.client_service_id === item.id);
    const progress = completionProgress(work);
    const overdue = work.some((delivery) => isOverdue(delivery));
    const needsAttention = work.some((delivery) => delivery.status === "scheduled" && delivery.due_at);
    const latestReport = reports[0];
    return { id: item.id, name: services.find((service) => service.id === item.service_id)?.name || "Service", status: item.status, health: overdue ? "delayed" as const : needsAttention ? "needs_attention" as const : "healthy" as const, progress: progress.percent, completed: progress.completed, total: progress.total, completedWork: work.filter((delivery) => delivery.status === "completed").map((delivery) => delivery.label), upcomingTasks: work.filter((delivery) => delivery.status !== "completed").slice(0, 4).map((delivery) => ({ id: delivery.id, title: delivery.label, dueAt: delivery.due_at })), latestReport: latestReport ? { id: latestReport.id, title: latestReport.title, period: `${latestReport.period_start} – ${latestReport.period_end}` } : undefined };
  });

  return {
    organization: { id: orgResult.data.id, name: orgResult.data.name, businesses: businesses.map((business) => ({ id: business.id, name: business.name, industry: business.industry || "", locations: locations.filter((location) => location.business_id === business.id).map((location) => ({ id: location.id, name: location.name, city: typeof location.address === "object" && location.address && "city" in location.address ? String(location.address.city || "") : "" })) })) },
    user: session.user,
    metrics: [
      { id: "services", label: "Active services", value: String(activeServices.length), trend: [] },
      { id: "tasks", label: "Open tasks", value: String(openTasks.length), trend: [] },
      { id: "reports", label: "Published reports", value: String(reports.length), trend: [] },
      { id: "requests", label: "Open requests", value: String(openRequests.length), trend: [] },
    ],
    pulse: serviceDelivery.map((item) => ({ id: item.id, label: item.name, status: item.health === "needs_attention" ? "attention" : item.health, explanation: item.total ? `${item.progress}% complete · ${item.completed} of ${item.total} delivery items finished.` : "Delivery is active; milestones will appear when scheduled." })),
    attention: [
      ...notifications.filter((item) => !item.read_at).map((item) => ({ id: item.id, priority: item.severity === "critical" ? "high" : item.severity === "warning" ? "medium" : "low", title: item.title, explanation: item.body || "A new account update is available.", action: "Review", href: item.notification_type === "report_due" ? "/portal/reports" : "/portal/overview" })),
      ...openTasks.filter((item) => item.status === "blocked").map((item) => ({ id: item.id, priority: "high" as const, title: item.title, explanation: "This task is currently blocked.", action: "View requests", href: "/portal/requests" })),
    ],
    journey: [],
    activity: [
      ...tasks.slice(0, 5).map((item) => ({ id: `task-${item.id}`, type: "task", title: item.title, detail: `Task is ${item.status.replaceAll("_", " ")}`, time: item.updated_at })),
      ...requests.slice(0, 5).map((item) => ({ id: `request-${item.id}`, type: "request", title: item.title, detail: requestStatus(item.status), time: item.updated_at })),
      ...reports.slice(0, 3).map((item) => ({ id: `report-${item.id}`, type: "report", title: item.title, detail: "Published report", time: item.updated_at })),
    ].sort((a, b) => b.time.localeCompare(a.time)).slice(0, 8),
    serviceDelivery,
    leads: [], reviews: [], campaigns: [], automations: [],
    reports: reports.map((item) => ({ id: item.id, title: item.title, period: `${item.period_start} – ${item.period_end}`, status: "Ready", summary: item.executive_summary || "Published report" })),
    requests: requests.map((item) => ({ id: item.id, title: item.title, type: item.request_type, priority: item.priority === "high" || item.priority === "urgent" ? "High" : "Normal", status: requestStatus(item.status), updated: item.updated_at })),
    integrations: connections.map((item) => ({ id: item.id, name: integrations.find((integration) => integration.id === item.integration_id)?.display_name || "Integration", status: item.status === "connected" ? "Connected" : item.status === "action_required" ? "Action Required" : "Not Connected", description: item.last_sync_at ? `Last synced ${item.last_sync_at}` : "Not synced yet" })),
  } as DashboardData;
});

export const portalDataProvider = { mode: "production" as const, getDashboard: async (_organizationId?: string, _businessId?: string) => getPortalData() };
