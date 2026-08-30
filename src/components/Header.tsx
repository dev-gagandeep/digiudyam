"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CaretDown, List, X, ArrowUpRight } from "@phosphor-icons/react";
import { Logo } from "./Logo";
import { Button } from "./ui";

const groups = [
  { label: "Build", copy: "Create a stronger digital front door.", links: [{n:"Website Development",h:"/services/website-development",f:true},{n:"Landing Pages",h:"/services/website-development"},{n:"E-commerce",h:"/services/website-development"},{n:"Website Redesign",h:"/services/website-development"},{n:"Maintenance",h:"/services/website-development"},{n:"Conversion Optimization",h:"/services/website-development"}] },
  { label: "Get Found", copy: "Show up when customers search.", links: [{n:"SEO",h:"/services/seo",f:true},{n:"Local SEO",h:"/services/local-seo",f:true},{n:"Google Business Profile",h:"/services/google-business-profile",f:true},{n:"Google Maps Optimization",h:"/services/local-seo"},{n:"Listings & Citations",h:"/services/local-seo"},{n:"Technical SEO",h:"/services/seo"}] },
  { label: "Get Customers", copy: "Turn attention into real enquiries.", links: [{n:"Google Ads",h:"/services/google-ads",f:true},{n:"Reputation Management",h:"/services/reputation-management",f:true},{n:"Meta Ads",h:"/services/google-ads"},{n:"Lead Generation",h:"/services/google-ads"},{n:"Google Reviews",h:"/services/reputation-management"},{n:"Content Marketing",h:"/services/seo"}] },
  { label: "Automate & Grow", copy: "Follow up without dropping the ball.", links: [{n:"CRM Setup",h:"/services/crm-solutions",f:true},{n:"WhatsApp Automation",h:"/services/whatsapp-automation",f:true},{n:"AI Automation",h:"/services/ai-automation",f:true},{n:"GoHighLevel",h:"/services/crm-solutions"},{n:"Lead Follow-up",h:"/services/crm-solutions"},{n:"AI Receptionist",h:"/services/ai-automation"}] },
];
const nav = [{n:"Solutions",h:"/services"},{n:"Industries",h:"/industries"},{n:"Our Work",h:"/our-work"},{n:"About",h:"/about"},{n:"Resources",h:"/resources"},{n:"Contact",h:"/contact"}];

export function Header() {
  const [menu, setMenu] = useState(false); const [mega, setMega] = useState(false); const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const onScroll=()=>setScrolled(window.scrollY>16); onScroll(); window.addEventListener("scroll",onScroll,{passive:true}); return()=>window.removeEventListener("scroll",onScroll); },[]);
  useEffect(() => { document.body.style.overflow = menu ? "hidden" : ""; return () => { document.body.style.overflow=""; }; },[menu]);
  useEffect(() => { const close=(e:KeyboardEvent)=>e.key==="Escape"&&(setMenu(false),setMega(false)); window.addEventListener("keydown",close); return()=>window.removeEventListener("keydown",close); },[]);
  return <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
    <div className="header-inner"><Logo /><nav className="desktop-nav" aria-label="Primary navigation"><Link href="/">Home</Link><div className="mega-wrap" onMouseLeave={()=>setMega(false)}><button onClick={()=>setMega(!mega)} onMouseEnter={()=>setMega(true)} aria-expanded={mega}>Services <CaretDown size={14} weight="bold" /></button>{mega&&<div className="mega-menu"><div className="mega-intro"><span>Digital growth, connected.</span><h3>Everything your business needs to move forward.</h3><Link href="/services">Explore all services <ArrowUpRight /></Link></div><div className="mega-groups">{groups.map(g=><div key={g.label}><h4>{g.label}</h4><p>{g.copy}</p>{g.links.map(l=><Link className={l.f?"featured":""} key={l.n} href={l.h} onClick={()=>setMega(false)}>{l.n}</Link>)}</div>)}</div></div>}</div>{nav.map(x=><Link key={x.n} href={x.h}>{x.n}</Link>)}</nav><div className="header-actions"><Button href="/free-audit">Free Growth Audit</Button><button className="menu-toggle" onClick={()=>setMenu(!menu)} aria-expanded={menu} aria-label={menu?"Close menu":"Open menu"}>{menu?<X size={24}/>:<List size={25}/>}</button></div></div>
    {menu&&<div className="mobile-menu"><nav aria-label="Mobile navigation"><Link href="/" onClick={()=>setMenu(false)}>Home</Link><div className="mobile-label">Services</div>{groups.map(g=><Link href={g.links[0].h} key={g.label} onClick={()=>setMenu(false)}>{g.label}<ArrowUpRight /></Link>)}{nav.map(x=><Link key={x.n} href={x.h} onClick={()=>setMenu(false)}>{x.n}</Link>)}</nav><Button href="/free-audit">Get Free Growth Audit</Button></div>}
  </header>;
}
