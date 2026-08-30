"use client";
import { FormEvent,useState } from "react";
import { submitWeb3Forms } from "@/lib/web3forms-client";

export function ContactForm({accessKey}:{accessKey:string}){
  const [state,setState]=useState<"idle"|"sending"|"sent"|"error">("idle"),[error,setError]=useState("");
  async function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();setState("sending");setError("");
    const form=event.currentTarget,payload=Object.fromEntries(new FormData(form).entries()) as Record<string,string>;
    if(payload.botcheck){setState("sent");return}
    try{
      await submitWeb3Forms(accessKey,`Contact enquiry: ${payload.business}`,{name:payload.name,business_name:payload.business,phone:payload.phone,email:payload.email,website:payload.website||"Not provided",business_type:payload.type,help_required:payload.help,message:payload.message,replyto:payload.email,page_url:window.location.href});
      form.reset();setState("sent");
    }catch(cause){setError(cause instanceof Error?cause.message:"Could not send your enquiry.");setState("error")}
  }
  return <form className="contact-form" onSubmit={submit}>{state==="sent"?<div className="form-success" role="status"><span>REQUEST RECEIVED</span><h2>Thanks—your enquiry has been sent.</h2><p>Our team will review the details and contact you about the clearest next step.</p><button type="button" onClick={()=>setState("idle")}>Send another enquiry</button></div>:<><input type="text" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" className="form-honeypot"/><div><label htmlFor="name">Name</label><input id="name" name="name" autoComplete="name" required/></div><div><label htmlFor="business">Business name</label><input id="business" name="business" autoComplete="organization" required/></div><div><label htmlFor="phone">Phone</label><input id="phone" name="phone" type="tel" autoComplete="tel" required/></div><div><label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="email" required/></div><div><label htmlFor="website">Website <span>optional</span></label><input id="website" name="website" type="url" placeholder="https://"/></div><div><label htmlFor="type">Business type</label><input id="type" name="type" placeholder="Clinic, restaurant, real estate…" required/></div><div className="full"><label htmlFor="help">What do you need help with?</label><select id="help" name="help" required defaultValue=""><option value="" disabled>Select an area</option><option>Website</option><option>SEO / Google visibility</option><option>Ads and leads</option><option>Reviews</option><option>CRM / WhatsApp</option><option>AI automation</option><option>Not sure yet</option></select></div><div className="full"><label htmlFor="message">Message</label><textarea id="message" name="message" rows={4} placeholder="Tell us what’s currently not working." required/></div><button className="submit-button" type="submit" disabled={state==="sending"}>{state==="sending"?"Sending enquiry…":<>Request consultation <span>→</span></>}</button><p className="form-note">We’ll only use these details to respond to your enquiry.</p>{state==="error"&&<p className="form-error" role="alert">{error}</p>}</>}</form>
}
