"use client";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { Paperclip, X } from "@phosphor-icons/react";
import { createPortalRequestAction, type RequestActionState } from "@/app/portal/actions";

const initialState: RequestActionState = { ok: false };

export function RequestForm() {
  const [open, setOpen] = useState(false);
  const [state, action] = useFormState(createPortalRequestAction, initialState);
  useEffect(() => { if (state.ok) setOpen(true); }, [state.ok]);
  return <>
    <button className="portal-primary" onClick={() => setOpen(true)}>+ New request</button>
    {open && <><button className="drawer-scrim" onClick={() => setOpen(false)} aria-label="Close request form"/><aside className="request-drawer">
      <header><span>NEW WORK REQUEST</span><button onClick={() => setOpen(false)} aria-label="Close"><X/></button></header>
      {state.ok ? <div className="request-success" role="status"><span>REQUEST SUBMITTED</span><h2>Your request is with our team.</h2><p>You can track its live status in this portal.</p><button onClick={() => setOpen(false)}>Close</button></div> : <form action={action}>
        {state.error && <p role="alert">{state.error}</p>}
        <label htmlFor="request-type">Request type</label><select id="request-type" name="request_type" required defaultValue=""><option value="" disabled>Select request type</option>{["Website change", "New landing page", "Update business hours", "Add staff member", "Campaign request", "SEO request", "Technical issue", "General question"].map((item) => <option key={item}>{item}</option>)}</select>
        <label htmlFor="request-title">Title</label><input id="request-title" name="title" required placeholder="A short summary"/>
        <label htmlFor="request-description">Description</label><textarea id="request-description" name="description" required rows={6} placeholder="What needs to change, and why?"/>
        <label htmlFor="request-priority">Priority</label><select id="request-priority" name="priority"><option value="normal">Normal</option><option value="high">High</option></select>
        <div className="attachment-field"><Paperclip/><div><b>Attachments</b><small>Secure uploads are not enabled for this request type.</small></div><button type="button" disabled>Add file</button></div>
        <button type="submit">Submit request</button>
      </form>}
    </aside></>}
  </>;
}
