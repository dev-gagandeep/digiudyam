import { CalendarBlank, CheckCircle, FileText } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import type { PortalServiceDelivery } from "@/lib/portal/types";

const labels = { healthy: "Healthy", needs_attention: "Needs attention", delayed: "Delayed" };
const date = (value: string | null) => value ? new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short" }).format(new Date(value)) : "Scheduled next";

export function ServiceDeliveryOverview({ services }: { services: PortalServiceDelivery[] }) {
  if (!services.length) return <section className="portal-service-empty"><CheckCircle/><h2>No active services yet</h2><p>Your active services and delivery progress will appear here once onboarding is complete.</p></section>;
  return <section className="portal-service-overview"><header><div><span>SERVICE DELIVERY</span><h2>Your active work and what comes next.</h2></div><Link href="/portal/reports">View all reports</Link></header><div>{services.map((service) => <article key={service.id} className={`portal-service-card service-health-${service.health}`}>
    <div className="portal-service-title"><span>{service.status}</span><h3>{service.name}</h3><b><i/>{labels[service.health]}</b></div>
    <div className="portal-service-progress"><div><span>PROGRESS</span><strong>{service.progress}%</strong></div><i><em style={{ width: `${service.progress}%` }}/></i><small>{service.completed} completed / {service.total} total</small></div>
    <div className="portal-service-work"><span><CheckCircle/>COMPLETED WORK</span>{service.completedWork.length ? service.completedWork.slice(0, 3).map((work) => <p key={work}>{work}</p>) : <p>Completed milestones will appear here.</p>}</div>
    <div className="portal-service-upcoming"><span><CalendarBlank/>UPCOMING</span>{service.upcomingTasks.length ? service.upcomingTasks.slice(0, 3).map((task) => <p key={task.id}><b>{task.title}</b><time>{date(task.dueAt)}</time></p>) : <p>Nothing currently scheduled.</p>}</div>
    {service.latestReport && <Link className="portal-service-report" href="/portal/reports"><FileText/><span><small>LATEST REPORT</small><b>{service.latestReport.title}</b></span></Link>}
  </article>)}</div></section>;
}
