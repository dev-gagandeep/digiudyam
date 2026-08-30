import { Briefcase, Plus } from "@phosphor-icons/react/dist/ssr";
import { AdminHeading } from "@/components/admin/AdminUI";
import { getServiceManagementData } from "@/lib/admin/onboarding-service";
import { createServiceAction, toggleServiceAction, updateServiceAction } from "../../actions";
import "./services.css";

export const metadata = { title: "Services" };
const categories = [{ value: "build", label: "Build" }, { value: "get_found", label: "Get Found" }, { value: "get_customers", label: "Get Customers" }, { value: "automate_grow", label: "Automate & Grow" }];

export default async function ServicesPage() {
  const services = await getServiceManagementData();
  return <div className="admin-page services-page">
    <AdminHeading label="OPERATIONS / SERVICES" title="Service catalog." copy="Define the services available for client onboarding and delivery."/>
    <details className="service-create"><summary className="admin-primary"><Plus/> Create service</summary><form action={createServiceAction}><label>Service name<input name="name" required/></label><label>Code<input name="code" required placeholder="local_seo"/></label><label>Category<select name="category" required>{categories.map((category) => <option key={category.value} value={category.value}>{category.label}</option>)}</select></label><label className="wide">Description<textarea name="description" rows={3} placeholder="What this service includes and delivers"/></label><button className="admin-primary">Create service</button></form></details>
    {services.length ? <section className="service-catalog">{services.map((service) => <article key={service.id} className={service.active ? "" : "inactive"}><header><div><span>{service.category.replaceAll("_", " ")}</span><h2>{service.name}</h2><code>{service.code}</code></div><form action={toggleServiceAction}><input type="hidden" name="id" value={service.id}/><input type="hidden" name="active" value={String(service.active)}/><button className={service.active ? "service-active" : "service-inactive"}>{service.active ? "Active" : "Inactive"}</button></form></header><form action={updateServiceAction}><input type="hidden" name="id" value={service.id}/><label>Name<input name="name" defaultValue={service.name} required/></label><label>Category<select name="category" defaultValue={service.category}>{categories.map((category) => <option key={category.value} value={category.value}>{category.label}</option>)}</select></label><label className="wide">Description<textarea name="description" rows={3} defaultValue={service.description || ""}/></label><button>Save changes</button></form></article>)}</section> : <section className="admin-rich-empty"><Briefcase/><h2>No services yet</h2><p>Create your first service to make it available during client onboarding.</p><label htmlFor="create-service-summary">Create first service</label></section>}
  </div>;
}
