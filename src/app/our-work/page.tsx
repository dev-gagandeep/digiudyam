import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FolderOpen } from "@phosphor-icons/react/dist/ssr";
import { createMetadata } from "@/lib/metadata";
import { caseStudyCategories, publishedCaseStudies } from "@/lib/seo/case-studies";
import { AuditCTA, Breadcrumbs, PageShell } from "@/components/PageShell";
import { Container, Eyebrow } from "@/components/ui";

export const metadata=createMetadata({title:"Our Work",description:"Explore approved DigiUdyam case studies covering websites, visibility, lead management and business automation for Indian MSMEs.",path:"/our-work",noIndex:publishedCaseStudies.length===0});

export default function Work({searchParams}:{searchParams?:{category?:string}}){
  const selected=searchParams?.category;
  const studies=selected?publishedCaseStudies.filter(study=>study.category===selected):publishedCaseStudies;
  return <PageShell><section className="work-hero"><Container><Breadcrumbs items={[{label:"Home",href:"/"},{label:"Our Work"}]}/><Eyebrow>APPROVED CASE STUDIES</Eyebrow><h1>Real work.<br/><em>Verified proof.</em></h1><p>We publish a project only when its business context, media and stated outcomes are approved for public use.</p></Container></section>
    <section className="case-study-listing"><Container>{caseStudyCategories.length>1&&<nav className="case-study-filters" aria-label="Filter case studies"><Link className={!selected?"active":""} href="/our-work">All work</Link>{caseStudyCategories.map(category=><Link className={selected===category?"active":""} href={`/our-work?category=${encodeURIComponent(category)}`} key={category}>{category}</Link>)}</nav>}
      {studies.length>0?<div className="case-study-grid">{studies.map(study=><article key={study.slug}>{study.media[0]&&<div className="case-study-card-image"><Image src={study.media[0].src} alt={study.media[0].alt} width={study.media[0].width} height={study.media[0].height} sizes="(max-width: 800px) 100vw, 50vw"/></div>}<span>{study.category} / {study.businessType}</span><h2>{study.title}</h2><p>{study.description}</p><Link href={`/our-work/${study.slug}`}>Read the approved case study <ArrowRight/></Link></article>)}</div>:<div className="case-study-empty"><FolderOpen weight="thin"/><div><Eyebrow>Evidence before publication</Eyebrow><h2>No approved case studies are published yet.</h2><p>Client names, screenshots and outcomes will appear only after permission and verification. DigiUdyam does not publish placeholder projects or invented results.</p><Link className="text-link" href="/free-audit">Start with a Free Growth Audit <ArrowRight/></Link></div></div>}
    </Container></section><AuditCTA context="your current growth system"/></PageShell>;
}
