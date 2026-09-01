"use client";
import { useEffect,useState } from "react";
import Link from "next/link";
import { ArrowRight,CaretDown,List,X } from "@phosphor-icons/react";
import { Logo } from "./Logo";
import { Button } from "./ui";

const serviceGroups=[
  {label:"Build your presence",copy:"Create a clear, credible digital foundation.",links:[{n:"Website Development",d:"Professional websites built around business goals.",h:"/services/website-development"},{n:"Digital Marketing",d:"Connect strategy, channels and measurement.",h:"/services/digital-marketing"}]},
  {label:"Get found locally",copy:"Help nearby customers discover and trust you.",links:[{n:"SEO",d:"Improve organic visibility with a useful search foundation.",h:"/services/seo"},{n:"Local SEO",d:"Connect your website, listings and local authority.",h:"/services/local-seo"},{n:"Google Business Profile",d:"Improve profile accuracy, presentation and customer actions.",h:"/services/google-business-profile"}]},
  {label:"Generate demand",copy:"Turn relevant attention into measurable enquiries.",links:[{n:"Google Ads",d:"Reach people actively searching for your services.",h:"/services/google-ads"},{n:"Reputation Management",d:"Build a consistent review and response process.",h:"/services/reputation-management"}]},
  {label:"Organise & automate",copy:"Keep leads, follow-ups and repeatable work moving.",links:[{n:"CRM Solutions",d:"Organise leads, ownership and sales follow-up.",h:"/services/crm-solutions"},{n:"Business Automation",d:"Connect workflows, notifications and operational tasks.",h:"/services/automation"},{n:"WhatsApp Automation",d:"Support timely, approved customer communication.",h:"/services/whatsapp-automation"},{n:"AI Automation",d:"Apply AI to suitable, clearly controlled workflows.",h:"/services/ai-automation"}]}
];
const industries=[
  {n:"Clinics",d:"Patient discovery and enquiry journeys.",h:"/industries/clinics"},{n:"Restaurants",d:"Local discovery, menus and reviews.",h:"/industries/restaurants"},{n:"Real Estate",d:"Property enquiries and organised follow-up.",h:"/industries/real-estate"},{n:"Home Services",d:"Local trust, quotes and lead response.",h:"/industries/home-services"},{n:"Beauty & Wellness",d:"Appointments, reviews and repeat visits.",h:"/industries/beauty-wellness"},{n:"Education",d:"Programme discovery and admission enquiries.",h:"/industries/education"},{n:"Professional Services",d:"Authority and consultation enquiries.",h:"/industries/professional-services"},{n:"Retail Shops",d:"Nearby discovery and customer communication.",h:"/industries/retail-shops"}
];
const nav=[{n:"Solutions",h:"/services"},{n:"Our Work",h:"/our-work"},{n:"About",h:"/about"},{n:"Blog",h:"/blog"},{n:"Contact",h:"/contact"}];

export function Header(){
  const [mobile,setMobile]=useState(false),[open,setOpen]=useState<"services"|"industries"|null>(null),[scrolled,setScrolled]=useState(false);
  useEffect(()=>{const onScroll=()=>setScrolled(window.scrollY>16);onScroll();window.addEventListener("scroll",onScroll,{passive:true});return()=>window.removeEventListener("scroll",onScroll)},[]);
  useEffect(()=>{document.body.style.overflow=mobile?"hidden":"";return()=>{document.body.style.overflow=""}},[mobile]);
  useEffect(()=>{const close=(event:KeyboardEvent)=>{if(event.key==="Escape"){setMobile(false);setOpen(null)}};window.addEventListener("keydown",close);return()=>window.removeEventListener("keydown",close)},[]);
  const closeMenus=()=>setOpen(null);
  return <header className={`site-header ${scrolled?"scrolled":""}`}>
    <div className="header-inner"><Logo/><nav className="desktop-nav" aria-label="Primary navigation"><Link href="/">Home</Link>
      <div className="mega-wrap" onMouseLeave={closeMenus}><button onClick={()=>setOpen(open==="services"?null:"services")} onMouseEnter={()=>setOpen("services")} aria-expanded={open==="services"}>Services <CaretDown size={14} weight="bold"/></button>{open==="services"&&<div className="mega-menu service-mega"><header><span>SERVICES / CONNECTED GROWTH</span><h3>Choose the outcome your business needs next.</h3><p>Start with one priority or connect services into a practical growth system.</p><Link href="/services" onClick={closeMenus}>View all services <ArrowRight/></Link></header><div className="mega-service-groups">{serviceGroups.map((group,index)=><section key={group.label}><div><span>0{index+1}</span><h4>{group.label}</h4><p>{group.copy}</p></div><div className="mega-link-list">{group.links.map(link=><Link href={link.h} key={link.n} onClick={closeMenus}><span><b>{link.n}</b><small>{link.d}</small></span><ArrowRight/></Link>)}</div></section>)}</div></div>}</div>
      <Link href="/services">Solutions</Link>
      <div className="mega-wrap industry-wrap" onMouseLeave={closeMenus}><button onClick={()=>setOpen(open==="industries"?null:"industries")} onMouseEnter={()=>setOpen("industries")} aria-expanded={open==="industries"}>Industries <CaretDown size={14} weight="bold"/></button>{open==="industries"&&<div className="industry-menu"><header><span>INDUSTRIES WE HELP</span><h3>Digital growth shaped around how your customers decide.</h3><Link href="/industries" onClick={closeMenus}>Explore all industries <ArrowRight/></Link></header><div>{industries.map((industry,index)=><Link href={industry.h} key={industry.n} onClick={closeMenus}><b>0{index+1}</b><span><strong>{industry.n}</strong><small>{industry.d}</small></span><ArrowRight/></Link>)}</div></div>}</div>
      {nav.slice(1).map(item=><Link key={item.n} href={item.h}>{item.n}</Link>)}</nav>
      <div className="header-actions"><Button href="/free-audit">Free Growth Audit</Button><button className="menu-toggle" onClick={()=>setMobile(!mobile)} aria-expanded={mobile} aria-label={mobile?"Close menu":"Open menu"}>{mobile?<X size={24}/>:<List size={25}/>}</button></div>
    </div>
    {mobile&&<div className="mobile-menu"><nav aria-label="Mobile navigation"><Link href="/" onClick={()=>setMobile(false)}>Home</Link><div className="mobile-label">Services</div>{serviceGroups.flatMap(group=>group.links).map(link=><Link href={link.h} key={link.h} onClick={()=>setMobile(false)}>{link.n}<ArrowRight/></Link>)}<Link href="/services" onClick={()=>setMobile(false)}>All Solutions<ArrowRight/></Link><div className="mobile-label">Industries</div>{industries.map(industry=><Link href={industry.h} key={industry.h} onClick={()=>setMobile(false)}>{industry.n}<ArrowRight/></Link>)}<div className="mobile-label">Company</div>{nav.slice(1).map(item=><Link key={item.n} href={item.h} onClick={()=>setMobile(false)}>{item.n}</Link>)}</nav><Button href="/free-audit">Get Free Growth Audit</Button></div>}
  </header>
}
