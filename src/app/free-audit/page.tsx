import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { GrowthAuditForm } from "@/components/GrowthAuditForm";
import { Breadcrumbs, PageShell } from "@/components/PageShell";
import { Container, Eyebrow } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
export const metadata=pageMetadata("Free Website and SEO Audit","Request a practical website and Google visibility review for your Indian local business.","/free-audit");
export default function FreeAudit(){return <PageShell><section className="audit-funnel standalone-audit"><Container><Breadcrumbs items={[{label:"Home",href:"/"},{label:"Free Audit"}]}/><div className="audit-layout"><div className="audit-intro"><Eyebrow light>Free Website & SEO Audit</Eyebrow><h1>Know what to improve before you spend more.</h1><p>We review your website, Google visibility and enquiry journey, then explain the clearest practical next step.</p><div>{["Website clarity and mobile experience","Google presence and local visibility","Enquiry and follow-up gaps","Priority actions for your business"].map(x=><span key={x}><CheckCircle weight="fill"/>{x}</span>)}</div></div><GrowthAuditForm accessKey={process.env.WEB3FORMS_FREE_AUDIT_ACCESS_KEY||""}/></div></Container></section></PageShell>}
