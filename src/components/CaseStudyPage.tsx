import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { industryMap, serviceMap } from "@/lib/content";
import { CaseStudyDefinition } from "@/lib/seo/case-studies";
import { blogRegistry, industryRouteAliases, preferredIndustrySlug, preferredServiceSlug, serviceRouteAliases } from "@/lib/seo/routes";
import { AuditCTA, Breadcrumbs, JsonLd, PageShell } from "./PageShell";
import { Container, Eyebrow } from "./ui";

const resolveService=(slug:string)=>serviceMap[serviceRouteAliases[slug as keyof typeof serviceRouteAliases]||slug];
const resolveIndustry=(slug:string)=>industryMap[industryRouteAliases[slug as keyof typeof industryRouteAliases]||slug];

export function CaseStudyPage({study,schema}:{study:CaseStudyDefinition;schema:Record<string,unknown>}){
  const industry=resolveIndustry(study.industrySlug);
  const services=study.serviceSlugs.map(slug=>({slug,data:resolveService(slug)})).filter(item=>Boolean(item.data));
  const articles=study.relatedArticleSlugs.map(slug=>blogRegistry.find(article=>article.slug===slug&&article.indexable&&Boolean(article.publishedAt))).filter((article):article is NonNullable<typeof article>=>Boolean(article));
  return <PageShell><JsonLd data={schema}/><article className="case-study-detail">
    <header className="case-study-hero"><Container><Breadcrumbs items={[{label:"Home",href:"/"},{label:"Our Work",href:"/our-work"},{label:study.title}]}/><Eyebrow>{study.category} / VERIFIED CASE STUDY</Eyebrow><h1>{study.title}</h1><p>{study.description}</p><dl><div><dt>Business type</dt><dd>{study.businessType}</dd></div><div><dt>Industry</dt><dd>{industry?.name||study.industrySlug}</dd></div><div><dt>Services involved</dt><dd>{services.map(item=>item.data.name).join(", ")}</dd></div></dl></Container></header>
    <section className="case-study-story"><Container><aside><Eyebrow>Challenge</Eyebrow><h2>{study.challenge}</h2></aside><div><h2>Business situation</h2>{study.businessSituation.map(item=><p key={item}>{item}</p>)}<h2>DigiUdyam approach</h2><ul>{study.approach.map(item=><li key={item}><CheckCircle weight="fill"/>{item}</li>)}</ul></div></Container></section>
    <section className="case-study-process"><Container><Eyebrow>Implementation process</Eyebrow><h2>How the work moved from problem to implementation</h2><div>{study.process.map((step,index)=><article key={step.heading}><span>{String(index+1).padStart(2,"0")}</span><h3>{step.heading}</h3><p>{step.detail}</p></article>)}</div></Container></section>
    {study.media.length>0&&<section className="case-study-media"><Container><Eyebrow>Approved project media</Eyebrow><h2>Screenshots and implementation context</h2><div>{study.media.map(item=><figure key={item.src}><Image src={item.src} alt={item.alt} width={item.width} height={item.height} sizes="(max-width: 800px) 100vw, 50vw"/><figcaption>{item.caption}</figcaption></figure>)}</div></Container></section>}
    <section className="case-study-outcomes"><Container><div><Eyebrow>Verified outcomes</Eyebrow><h2>What could be supported by approved evidence</h2></div><div>{study.outcomes.filter(item=>item.verified).map(item=><article key={item.heading}><h3>{item.heading}</h3><p>{item.detail}</p></article>)}</div></Container></section>
    <section className="case-study-learnings"><Container><Eyebrow>Learnings</Eyebrow><h2>What this work reinforced</h2><ul>{study.learnings.map(item=><li key={item}>{item}</li>)}</ul></Container></section>
    <section className="case-study-connections"><Container><header><Eyebrow>Continue exploring</Eyebrow><h2>Connect this proof with your business journey</h2></header><div><section><span>RELATED SERVICES</span>{services.map(item=><Link href={`/services/${preferredServiceSlug(item.slug)}`} key={item.slug}>Explore {item.data.name.toLowerCase()} <ArrowRight/></Link>)}</section>{industry&&<section><span>RELATED INDUSTRY</span><Link href={`/industries/${preferredIndustrySlug(study.industrySlug)}`}>See solutions for {industry.name.toLowerCase()} <ArrowRight/></Link></section>}{articles.length>0&&<section><span>SUPPORTING ARTICLES</span>{articles.map(article=><Link href={`/blog/${article.slug}`} key={article.slug}>Read {article.title} <ArrowRight/></Link>)}</section>}</div></Container></section>
  </article><AuditCTA context={`${study.businessType.toLowerCase()} digital growth`}/></PageShell>;
}
