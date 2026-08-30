"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";

export function GrowthAuditForm({source="free-audit"}:{source?:"home"|"free-audit"}) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(formData: FormData) {
    setState("sending"); setError("");
    const payload = {...Object.fromEntries(formData.entries()),source};
    try {
      const response = await fetch("/api/growth-audit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not submit your request.");
      setState("sent");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not submit your request."); setState("error");
    }
  }

  if (state === "sent") return <div className="audit-success" role="status"><CheckCircle weight="fill"/><span>REQUEST RECEIVED</span><h3>Your free growth audit is booked.</h3><p>Our team will review your details and contact you with the clearest next step for your business.</p></div>;

  return <form className="growth-audit-form" action={submit}>
    <div><label htmlFor="audit-name">Name</label><input id="audit-name" name="name" autoComplete="name" required placeholder="Name"/></div>
    <div><label htmlFor="audit-business">Business Name</label><input id="audit-business" name="business_name" autoComplete="organization" required placeholder="Business Name"/></div>
    <div><label htmlFor="audit-phone">Phone Number</label><input id="audit-phone" name="phone" type="tel" autoComplete="tel" required placeholder="+91"/></div>
    <div><label htmlFor="audit-city">City</label><input id="audit-city" name="city" autoComplete="address-level2" required placeholder="Your city"/></div>
    <div><label htmlFor="audit-website">Website (Optional)</label><input id="audit-website" name="website" type="url" inputMode="url" placeholder="https://"/></div>
    <div><label htmlFor="audit-service">Required Service</label><select id="audit-service" name="service" required defaultValue=""><option value="" disabled>Select a service</option><option>Website Development</option><option>Local SEO</option><option>Google Business Profile</option><option>Digital Marketing & Ads</option><option>CRM & WhatsApp Automation</option><option>Not sure — guide me</option></select></div>
    <button type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending request…" : <>Get Free Growth Audit <ArrowRight weight="bold"/></>}</button>
    <p className="audit-privacy">No spam or hard sell. We’ll only use these details to contact you about your audit.</p>
    {state === "error" && <p className="audit-error" role="alert">{error}</p>}
  </form>;
}
