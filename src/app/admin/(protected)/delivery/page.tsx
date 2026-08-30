import { ArrowRight, Briefcase, CalendarBlank, CheckCircle, Clock, WarningCircle } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { AdminHeading } from "@/components/admin/AdminUI";
import { getServiceDeliveryIntelligence } from "@/lib/admin/delivery-service";
import "./delivery.css";

export const metadata = { title: "Service Delivery" };
const healthLabel = { healthy: "Healthy", needs_attention: "Needs attention", delayed: "Delayed" } as const;
const date = (value: string | null) => value ? new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(new Date(value)) : "Not scheduled";

export default async function DeliveryPage() {
  const data = await getServiceDeliveryIntelligence();
  return <div className="admin-page delivery-dashboard">
    <AdminHeading label="OPERATIONS / SERVICE DELIVERY" title="Delivery intelligence." copy="Live service progress, delivery health and the next work requiring attention."/>
    <section className="delivery-summary">
      <article><Briefcase/><span>Active services</span><strong>{data.summary.active}</strong></article>
      <article><WarningCircle/><span>Delayed services</span><strong>{data.summary.delayed}</strong></article>
      <article><Clock/><span>Pending tasks</span><strong>{data.summary.pendingTasks}</strong></article>
      <article><CalendarBlank/><span>Upcoming deadlines</span><strong>{data.summary.upcomingDeadlines}</strong></article>
    </section>
    {data.clientServices.length ? <section className="delivery-service-list"><header><span>ACTIVE CLIENT SERVICES</span><b>{data.clientServices.length} SERVICES</b></header>{data.clientServices.map((service) => <article key={service.id} className={`delivery-service-row health-${service.health}`}>
      <div className="delivery-service-name"><span>{service.organizationName}</span><h2>{service.serviceName}</h2><small>{service.status.replaceAll("_", " ")} · Owner: {service.owner}</small></div>
      <div className="delivery-health"><span>HEALTH</span><b><i/>{healthLabel[service.health]}</b><small>{service.overdueTasks ? `${service.overdueTasks} overdue task${service.overdueTasks === 1 ? "" : "s"}` : `${service.openRequests} open request${service.openRequests === 1 ? "" : "s"}`}</small></div>
      <div className="delivery-service-progress"><div><span>TASK PROGRESS</span><b>{service.progress.percent}%</b></div><i><em style={{ width: `${service.progress.percent}%` }}/></i><small>{service.progress.completed} completed / {service.progress.total} total</small></div>
      <div className="delivery-next"><span>NEXT ACTION</span><b>{service.nextAction.label}</b><small>{service.nextAction.dueAt ? `Due ${date(service.nextAction.dueAt)}` : `Latest activity ${date(service.latestActivity)}`}</small></div>
      <Link href={`/admin/clients/${service.organizationId}`} aria-label={`Open ${service.organizationName}`}><ArrowRight/></Link>
    </article>)}</section> : <section className="admin-rich-empty"><CheckCircle/><h2>No active client services</h2><p>Assigned services will appear here once client delivery begins.</p><Link href="/admin/clients">Open client directory <ArrowRight/></Link></section>}
  </div>;
}
