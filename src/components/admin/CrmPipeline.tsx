"use client";
import Link from "next/link";
import { useMemo,useState,useTransition } from "react";
import { CalendarBlank,CurrencyInr } from "@phosphor-icons/react";
import { moveLeadAction } from "@/app/admin/crm/actions";
type Stage="new_lead"|"contacted"|"qualified"|"proposal_sent"|"negotiation"|"won"|"lost";
type Lead={id:string;name:string;business_name:string;status:Stage;pipeline_value:number;follow_up_at:string|null;sales_owner_id:string|null};
const stages:{id:Stage;label:string}[]=[{id:"new_lead",label:"New Lead"},{id:"contacted",label:"Contacted"},{id:"qualified",label:"Qualified"},{id:"proposal_sent",label:"Proposal Sent"},{id:"negotiation",label:"Negotiation"},{id:"won",label:"Won"},{id:"lost",label:"Lost"}];
export function CrmPipeline({initialLeads,owners}:{initialLeads:Lead[];owners:{id:string;full_name:string}[]}) {
  const [leads,setLeads]=useState(initialLeads); const [pending,startTransition]=useTransition();
  const grouped=useMemo(()=>Object.fromEntries(stages.map(stage=>[stage.id,leads.filter(lead=>lead.status===stage.id)])) as Record<Stage,Lead[]>,[leads]);
  const move=(leadId:string,status:Stage)=>{if(!leadId)return;const previous=leads;setLeads(current=>current.map(lead=>lead.id===leadId?{...lead,status}:lead));startTransition(async()=>{try{await moveLeadAction(leadId,status)}catch{setLeads(previous)}})};
  return <div className={`crm-pipeline ${pending?"updating":""}`}>{stages.map(stage=><section key={stage.id} onDragOver={event=>event.preventDefault()} onDrop={event=>move(event.dataTransfer.getData("lead-id"),stage.id)}><header><span>{stage.label}</span><b>{grouped[stage.id].length}</b></header><div>{grouped[stage.id].map(lead=><article draggable onDragStart={event=>event.dataTransfer.setData("lead-id",lead.id)} key={lead.id}><span>{lead.name}</span><h3><Link href={`/admin/crm/${lead.id}`}>{lead.business_name}</Link></h3><p><CurrencyInr/>{Number(lead.pipeline_value).toLocaleString("en-IN")}</p><footer><b>{owners.find(owner=>owner.id===lead.sales_owner_id)?.full_name||"Unassigned"}</b><time><CalendarBlank/>{lead.follow_up_at?new Date(lead.follow_up_at).toLocaleDateString("en-IN"):"No follow-up"}</time></footer><label className="pipeline-mobile-stage">Move stage<select value={lead.status} onChange={event=>move(lead.id,event.target.value as Stage)}>{stages.map(option=><option value={option.id} key={option.id}>{option.label}</option>)}</select></label></article>)}</div></section>)}</div>;
}
