"use client";
import Link from "next/link";
import { Bell,CheckCircle,X } from "@phosphor-icons/react";
import { useEffect,useState } from "react";
export function NotificationBell({href,unread,latest}:{href:string;unread:number;latest:{id:string;title:string;body:string|null}|null}) {
  const [toast,setToast]=useState(false);
  useEffect(()=>{if(!latest)return undefined;const key=`du-notification-${latest.id}`;if(sessionStorage.getItem(key))return undefined;sessionStorage.setItem(key,"shown");setToast(true);const timer=window.setTimeout(()=>setToast(false),5500);return()=>{window.clearTimeout(timer);};},[latest]);
  return <><Link className="notification-bell" href={href} aria-label={`${unread} unread notifications`}><Bell/>{unread>0&&<b>{unread>99?"99+":unread}</b>}</Link>{toast&&latest&&<aside className="notification-toast" role="status"><CheckCircle weight="fill"/><div><b>{latest.title}</b><p>{latest.body||"A new update is available."}</p><Link href={href}>View notification</Link></div><button onClick={()=>setToast(false)} aria-label="Dismiss notification"><X/></button></aside>}</>;
}
