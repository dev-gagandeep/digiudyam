"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Bell, Briefcase, Buildings, ChartBar, ChatCircleDots, ClipboardText, FileText, Gear, Link as LinkIcon, List, MagnifyingGlass, SignOut, UsersThree, Wrench, X } from "@phosphor-icons/react";
import { NotificationBell } from "@/components/NotificationBell";

const nav = [
  { label: "OVERVIEW", links: [{ n: "Dashboard", h: "/admin", i: ChartBar }] },
  { label: "CRM", links: [{ n: "Leads", h: "/admin/crm", i: UsersThree }, { n: "Pipeline", h: "/admin/crm/pipeline", i: ChartBar }, { n: "AI Chatbot", h: "/admin/crm/chatbot", i: ChatCircleDots }] },
  { label: "CLIENTS", links: [{ n: "Clients", h: "/admin/clients", i: Buildings }, { n: "Onboarding", h: "/admin/onboarding", i: ClipboardText }, { n: "Requests", h: "/admin/requests", i: FileText }] },
  { label: "OPERATIONS", links: [{ n: "Services", h: "/admin/services", i: Wrench }, { n: "Delivery", h: "/admin/delivery", i: Briefcase }, { n: "Tasks", h: "/admin/tasks", i: Wrench }, { n: "Reports", h: "/admin/reports", i: ChartBar }, { n: "Integrations", h: "/admin/integrations", i: LinkIcon }] },
  { label: "TEAM", links: [{ n: "Team", h: "/admin/team", i: UsersThree }] },
  { label: "SYSTEM", links: [{ n: "Settings", h: "/admin/settings", i: Gear }] },
];

export function AdminChrome({ children, user, role, notifications }: { children: React.ReactNode; user: string; role: string; notifications:{unread:number;latest:{id:string;title:string;body:string|null}|null} }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [navigating, setNavigating] = useState(false);
  useEffect(() => { setNavigating(false); return undefined; }, [path]);
  return <div className="admin-shell">
    <aside className={open ? "open" : ""}>
      <div className="admin-brand"><Image src="/digiudyam-logo.png" alt="DigiUdyam" width={2172} height={724}/><small>ADMIN</small><button onClick={() => setOpen(false)} aria-label="Close admin navigation"><X/></button></div>
      <nav>{nav.map((group) => <div key={group.label}><span>{group.label}</span>{group.links.map((item) => <Link key={item.h} href={item.h} className={path === item.h || !["/admin","/admin/crm"].includes(item.h) && path.startsWith(item.h) ? "active" : ""} onClick={() => { setOpen(false); if (path !== item.h) setNavigating(true); }}><item.i/><b>{item.n}</b></Link>)}</div>)}</nav>
      <div className="admin-person"><span>AD</span><div><b>{user}</b><small>{role}</small></div></div>
      <form action="/api/auth/admin-logout" method="post"><button><SignOut/> Sign out</button></form>
    </aside>
    <div className="admin-workspace">{navigating && <div className="admin-route-progress" role="progressbar" aria-label="Loading page"/>}<header><button className="admin-menu" onClick={() => setOpen(true)} aria-label="Open admin navigation"><List/></button><form className="admin-search" action="/admin/search"><MagnifyingGlass/><input name="q" aria-label="Search admin records" placeholder="Search clients, leads, tasks, requests…"/></form><div className="admin-demo"><i/> LIVE DATA</div><NotificationBell href="/admin/notifications" unread={notifications.unread} latest={notifications.latest}/></header><main>{children}</main></div>
    {open && <button className="admin-scrim" onClick={() => setOpen(false)} aria-label="Close navigation overlay"/>}
  </div>;
}
