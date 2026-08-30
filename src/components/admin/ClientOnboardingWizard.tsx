"use client";
import { useState } from "react";
import { Check } from "@phosphor-icons/react";
import { onboardClientAction } from "@/app/admin/actions";
import { ServiceMultiSelect } from "./ServiceMultiSelect";

type Option = { id: string; full_name?: string; name?: string; role?: string };

export function ClientOnboardingWizard({ services, staff }: { services: { id: string; name: string }[]; staff: Option[] }) {
  const [step, setStep] = useState(1);
  const managers = staff.filter((member) => member.role === "account_manager" || member.role === "admin" || member.role === "super_admin");
  const specialists = staff.filter((member) => member.role === "specialist");
  return <details className="client-section onboarding-create"><summary className="admin-primary">+ Add client</summary><form action={onboardClientAction} className="onboarding-wizard">
    <ol>{["Business", "Location", "Services", "Account manager", "Specialists", "Review"].map((label, index) => <li key={label} className={step === index + 1 ? "active" : step > index + 1 ? "complete" : ""}><i>{step > index + 1 ? <Check/> : index + 1}</i><span>{label}</span></li>)}</ol>
    <section hidden={step !== 1}><span>STEP 1 / BUSINESS INFORMATION</span><h2>Tell us about the client.</h2><div><label>Organization<input name="organization_name" required/></label><label>Primary contact<input name="primary_contact_name" required/></label><label>Client email<input name="client_email" type="email" required/></label><label>Business name<input name="business_name" required/></label><label>Industry<input name="industry"/></label></div></section>
    <section hidden={step !== 2}><span>STEP 2 / LOCATION</span><h2>Add the primary operating location.</h2><div><label>Location name<input name="location_name" required/></label><label>City<input name="city"/></label><label>Timezone<input name="timezone" defaultValue="Asia/Kolkata"/></label><label>Onboarding target<input name="target_date" type="date"/></label></div></section>
    <section hidden={step !== 3}><span>STEP 3 / SERVICES</span><h2>Select the delivery scope.</h2><ServiceMultiSelect services={services}/></section>
    <section hidden={step !== 4}><span>STEP 4 / ACCOUNT MANAGER</span><h2>Choose the primary client owner.</h2><div><label>Account manager<select name="account_manager_id" required={Boolean(managers.length)}>{!managers.length && <option value="">Current admin</option>}{managers.map((member) => <option key={member.id} value={member.id}>{member.full_name}</option>)}</select></label></div></section>
    <section hidden={step !== 5}><span>STEP 5 / SPECIALISTS</span><h2>Assign delivery specialists.</h2>{specialists.length ? <div className="wizard-specialists">{specialists.map((member) => <label key={member.id}><input type="checkbox" name="specialist_ids" value={member.id}/><i><Check/></i><span><b>{member.full_name}</b><small>Specialist</small></span></label>)}</div> : <div className="wizard-empty"><b>No specialists available</b><span>Invite a specialist from Team Management, or continue without one.</span></div>}</section>
    <section hidden={step !== 6}><span>STEP 6 / REVIEW & CREATE</span><h2>Ready to create the client workspace.</h2><div className="wizard-review"><Check/><div><b>The organization, business and location will be created.</b><span>Selected services and team assignments will be connected, an onboarding checklist will be started, and the client owner will receive a secure invitation.</span></div></div></section>
    <footer><button type="button" disabled={step === 1} onClick={() => setStep((current) => Math.max(1, current - 1))}>Back</button>{step < 6 ? <button className="admin-primary" type="button" onClick={() => setStep((current) => Math.min(6, current + 1))}>Continue</button> : <button className="admin-primary" type="submit">Review complete · Create client</button>}</footer>
  </form></details>;
}
