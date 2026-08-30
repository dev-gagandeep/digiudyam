"use client";
import { useMemo, useState } from "react";
import { Check, MagnifyingGlass } from "@phosphor-icons/react";

type ServiceOption = { id: string; name: string };

export function ServiceMultiSelect({ services }: { services: ServiceOption[] }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const visible = useMemo(() => services.filter((service) => service.name.toLowerCase().includes(query.toLowerCase())), [query, services]);
  if (!services.length) return <div className="service-picker-empty"><b>No active services</b><span>Create or activate a service before assigning delivery.</span></div>;
  const toggle = (id: string) => setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  return <fieldset className="service-picker">
    <legend>Services <span>{selected.length} selected</span></legend>
    <div className="service-picker-search"><MagnifyingGlass/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search active services" aria-label="Search active services"/></div>
    <div className="service-picker-options" role="listbox" aria-multiselectable="true">{visible.map((service) => {
      const checked = selected.includes(service.id);
      return <button type="button" role="option" aria-selected={checked} className={checked ? "selected" : ""} key={service.id} onClick={() => toggle(service.id)}><i>{checked && <Check weight="bold"/>}</i><span>{service.name}</span></button>;
    })}</div>
    {selected.map((id) => <input key={id} type="hidden" name="service_ids" value={id}/>)}
    {!selected.length && <small>Select one or more services to continue.</small>}
  </fieldset>;
}
