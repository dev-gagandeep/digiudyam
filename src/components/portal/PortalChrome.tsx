"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Bell, CaretDown, ChartLineUp, CirclesFour, Gear, GoogleLogo, List, Megaphone, Question, Robot, SignOut, Star, UsersThree, X, FileText, ChatCircleDots } from "@phosphor-icons/react";
import { NotificationBell } from "@/components/NotificationBell";

const groups=[{label:"OVERVIEW",links:[{n:"Overview",h:"/portal/overview",i:CirclesFour}]},{label:"GROWTH",links:[{n:"Leads",h:"/portal/leads",i:UsersThree},{n:"SEO & Search",h:"/portal/seo",i:ChartLineUp},{n:"Google Presence",h:"/portal/google",i:GoogleLogo},{n:"Reviews",h:"/portal/reviews",i:Star},{n:"Advertising",h:"/portal/ads",i:Megaphone}]},{label:"SYSTEM",links:[{n:"Automations",h:"/portal/automation",i:Robot},{n:"Reports",h:"/portal/reports",i:FileText}]},{label:"ACCOUNT",links:[{n:"Requests",h:"/portal/requests",i:ChatCircleDots},{n:"Settings",h:"/portal/settings",i:Gear}]}];

export function PortalChrome({children,business,user,notifications}:{children:React.ReactNode;business:string;user:string;notifications:{unread:number;latest:{id:string;title:string;body:string|null}|null}}) {
  const path=usePathname();const [open,setOpen]=useState(false);const [collapsed,setCollapsed]=useState(false);
  return <div className={`portal-shell ${collapsed?"sidebar-collapsed":""}`}>
    <aside className={`portal-sidebar ${open?"open":""}`}><div className="portal-brand"><Image src="/digiudyam-logo.png" alt="DigiUdyam" width={2172} height={724}/><button onClick={()=>setOpen(false)} aria-label="Close navigation"><X/></button><small>GROWTH HUB</small></div><nav aria-label="Portal navigation">{groups.map(group=><div key={group.label}><span>{group.label}</span>{group.links.map(item=><Link href={item.h} key={item.h} className={path===item.h?"active":""} onClick={()=>setOpen(false)} title={item.n}><item.i weight={path===item.h?"fill":"regular"}/><b>{item.n}</b></Link>)}</div>)}</nav><button className="collapse-sidebar" onClick={()=>setCollapsed(!collapsed)}>{collapsed?"→":"← Collapse"}</button><Link href="/portal/settings" className="portal-user"><span>{business.slice(0,2).toUpperCase()}</span><div><b>{business}</b><small>{user}</small></div><CaretDown/></Link><form className="portal-logout" action="/api/auth/logout" method="post"><button type="submit"><SignOut/><span>Sign out</span></button></form></aside>
    <div className="portal-workspace"><header className="portal-topbar"><button className="mobile-nav-trigger" onClick={()=>setOpen(true)} aria-label="Open navigation"><List/></button><div className="business-switcher"><small>CURRENT BUSINESS</small><button>{business}<CaretDown/></button><span>All Locations</span></div><div className="topbar-actions"><div className="demo-indicator"><i/> LIVE ACCOUNT</div><button aria-label="Help"><Question/></button><NotificationBell href="/portal/notifications" unread={notifications.unread} latest={notifications.latest}/><Link href="/portal/settings" aria-label="Profile">{user.slice(0,2).toUpperCase()}</Link></div></header><main id="portal-main">{children}</main></div>
    {open&&<button className="portal-scrim" onClick={()=>setOpen(false)} aria-label="Close navigation overlay"/>}
  </div>;
}
