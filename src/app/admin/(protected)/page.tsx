import Link from "next/link";
import { ArrowRight, Briefcase, CalendarCheck, ChartBar, CheckCircle, Clock, Link as LinkIcon, UsersThree } from "@phosphor-icons/react/dist/ssr";
import { AdminHeading, OpsAttention } from "@/components/admin/AdminUI";
import { adminDataProvider } from "@/lib/admin/provider";
import { getAdminSession } from "@/lib/admin/auth";
import { hasPermission } from "@/lib/admin/permissions";
import { getCrmMetrics } from "@/lib/admin/crm-metrics";
import "./dashboard-enhanced.css";
import "./crm-dashboard.css";

export const metadata = { title: "Operations Dashboard" };
const notificationHref: Record<string, string> = { integration_failure: "/admin/integrations", overdue_request: "/admin/requests", report_due: "/admin/reports", onboarding_blocker: "/admin/onboarding", client_response: "/admin/requests" };

function EmptyWidget({ icon: Icon, title, copy, href, action }: { icon: typeof Briefcase; title: string; copy: string; href: string; action: string }) {
  return <div className="widget-empty"><Icon/><h3>{title}</h3><p>{copy}</p><Link href={href}>{action}<ArrowRight/></Link></div>;
}

export default async function AdminDashboard() {
  const session = await getAdminSession();
  const [data,crm] = await Promise.all([adminDataProvider.getDashboard("dashboard"),session&&hasPermission(session.role,"manage_leads")?getCrmMetrics():Promise.resolve(null)]);
  const openTasks = data.tasks.filter((task) => task.status !== "Completed");
  const activeServices = data.clients.flatMap((client) => client.services).filter((service) => service.status === "Active" || service.status === "Setup");
  const attention = data.notifications.filter((item) => !item.read).map((item) => ({ severity: item.severity, title: item.title, copy: `Created ${item.created}`, href: notificationHref[item.type] || "/admin/clients" }));
  const stats = [
    { label: "Active clients", value: data.clients.filter((client) => client.status === "Active").length, detail: `${data.clients.length} total`, icon: UsersThree, href: "/admin/clients" },
    { label: "Services in delivery", value: activeServices.length, detail: `${activeServices.filter((service) => service.status === "Setup").length} in setup`, icon: Briefcase, href: "/admin/services" },
    { label: "Open requests", value: data.requests.filter((request) => request.status !== "Completed").length, detail: `${data.requests.filter((request) => request.status === "Overdue").length} overdue`, icon: Clock, href: "/admin/requests" },
    { label: "Pending tasks", value: openTasks.length, detail: `${openTasks.filter((task) => task.status === "Review").length} in review`, icon: CheckCircle, href: "/admin/tasks" },
    { label: "Reports due", value: data.reports.filter((report) => report.status !== "Published").length, detail: `${data.reports.filter((report) => report.status === "Published").length} published`, icon: CalendarCheck, href: "/admin/reports" },
  ];
  const statusCounts = ["Lead", "Onboarding", "Active", "Paused", "Archived"].map((status) => ({ status, count: data.clients.filter((client) => client.status === status).length }));
  const delivery = activeServices.slice(0, 6).map((service) => ({ service, completed: service.delivery.filter((item) => item.status === "Completed").length, total: service.delivery.length }));

  return <div className="admin-page admin-dashboard-v2">
    <AdminHeading label="OVERVIEW / LIVE OPERATIONS" title="Agency operations control room." copy="A focused view of client health, delivery progress and the work requiring attention."/>
    <section className="dashboard-kpis" aria-label="Key performance indicators">{stats.map((stat) => <Link href={stat.href} key={stat.label}><stat.icon/><span>{stat.label}</span><strong>{stat.value}</strong><small>{stat.detail}</small></Link>)}</section>
    {attention.length ? <OpsAttention items={attention}/> : <section className="all-clear"><CheckCircle weight="fill"/><div><b>No urgent notifications</b><span>Everything currently requiring attention has been reviewed.</span></div></section>}
    {crm && <section className="crm-dashboard-widget"><header><span>CRM / SALES PIPELINE</span><Link href="/admin/crm">Open CRM <ArrowRight/></Link></header><div><article><span>Total leads</span><strong>{crm.total}</strong></article><article><span>Open pipeline</span><strong>{crm.pipelineCount}</strong></article><article><span>Conversion rate</span><strong>{crm.conversionRate}%</strong></article><article><span>Pipeline value</span><strong>₹{crm.pipelineValue.toLocaleString("en-IN")}</strong></article><article><span>Follow-ups due</span><strong>{crm.followUpsDue}</strong></article></div>{crm.activities.length?<aside>{crm.activities.map(activity=><p key={activity.id}><b>{activity.activity_type.replaceAll("_"," ")}</b><span>{activity.summary}</span><time>{activity.occurred_at}</time></p>)}</aside>:<aside className="crm-dashboard-empty">Recent sales activity will appear here.</aside>}</section>}

    <div className="dashboard-widget-grid">
      <section className="dashboard-widget client-status-widget"><header><span>CLIENT STATUS OVERVIEW</span><Link href="/admin/clients">View clients <ArrowRight/></Link></header>{data.clients.length ? <div>{statusCounts.map((item) => <article key={item.status}><b>{item.count}</b><span>{item.status}</span><i><em style={{ width: `${data.clients.length ? item.count / data.clients.length * 100 : 0}%` }}/></i></article>)}</div> : <EmptyWidget icon={UsersThree} title="No clients yet" copy="Create your first client to start managing services and delivery." href="/admin/clients" action="Create first client"/>}</section>

      <section className="dashboard-widget pending-widget"><header><span>PENDING TASKS</span><Link href="/admin/tasks">All tasks <ArrowRight/></Link></header>{openTasks.length ? <div>{openTasks.slice(0, 5).map((task) => <article key={task.id}><i className={`task-${task.priority.toLowerCase()}`}/><div><b>{task.title}</b><span>{data.clients.find((client) => client.id === task.clientId)?.name || "Internal"}</span></div><time>{task.dueDate || "No due date"}</time></article>)}</div> : <EmptyWidget icon={CheckCircle} title="No pending tasks" copy="New client delivery tasks will appear here when assigned." href="/admin/tasks" action="Open task board"/>}</section>

      <section className="dashboard-widget service-progress-widget"><header><span>SERVICE DELIVERY PROGRESS</span><Link href="/admin/services">Manage services <ArrowRight/></Link></header>{delivery.length ? <div>{delivery.map(({ service, completed, total }) => <article key={service.id}><div><b>{service.type}</b><span>{service.status}</span></div><strong>{total ? Math.round(completed / total * 100) : 0}%</strong><i><em style={{ width: `${total ? completed / total * 100 : 0}%` }}/></i></article>)}</div> : <EmptyWidget icon={Briefcase} title="No active service delivery" copy="Assign services during client onboarding to track delivery here." href="/admin/services" action="Manage service catalog"/>}</section>

      <section className="dashboard-widget upcoming-widget"><header><span>UPCOMING ACTIONS</span><Link href="/admin/tasks">Open workspace <ArrowRight/></Link></header>{openTasks.length || data.requests.length ? <div>{[...openTasks.slice(0, 3).map((task) => ({ id: task.id, label: task.title, meta: task.dueDate || "Task", type: "TASK" })), ...data.requests.filter((request) => request.status !== "Completed").slice(0, 2).map((request) => ({ id: request.id, label: request.title, meta: request.dueDate || request.created, type: "REQUEST" }))].map((item) => <article key={`${item.type}-${item.id}`}><span>{item.type}</span><b>{item.label}</b><time>{item.meta}</time></article>)}</div> : <EmptyWidget icon={CalendarCheck} title="Nothing upcoming" copy="Deadlines and client requests will appear here automatically." href="/admin/onboarding" action="Review onboarding"/>}</section>
    </div>

    <section className="dashboard-widget activity-timeline"><header><span>RECENT ACTIVITY</span><b>LIVE AUDIT TRAIL</b></header>{data.audit.length ? <div>{data.audit.slice(0, 8).map((event) => <article key={event.id}><i/><time>{event.timestamp}</time><div><b>{data.users.find((user) => user.id === event.actorId)?.name || "System"}</b><p>{event.action.replaceAll("_", " ").replace(".", " · ")}</p><span>{event.entity.type} / {event.entity.id}</span></div></article>)}</div> : <EmptyWidget icon={ChartBar} title="No activity recorded yet" copy="Changes made by staff will appear here as an auditable timeline." href="/admin/clients" action="Open clients"/>}</section>
  </div>;
}
