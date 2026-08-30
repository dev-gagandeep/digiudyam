import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "@phosphor-icons/react/dist/ssr";
import { notFound } from "next/navigation";
import { Breadcrumbs, JsonLd, PageShell } from "@/components/PageShell";
import { Button, Container, Eyebrow } from "@/components/ui";
import { industryMap, serviceMap } from "@/lib/content";
import { articleMetadata } from "@/lib/metadata";
import { articleSchema, faqSchema } from "@/lib/seo/schema";
import { articleReadingTime, BlogContentBlock, blogRegistry, industryRouteAliases, preferredIndustrySlug, preferredServiceSlug, serviceRouteAliases } from "@/lib/seo/routes";
import { getVerifiedAuthor } from "@/lib/seo/identity";
import { relatedArticlesForArticle } from "@/lib/seo/internal-links";
import { RelatedArticles } from "@/components/RelatedArticles";

export const dynamicParams=false;
const findArticle=(slug:string)=>blogRegistry.find(article=>article.slug===slug&&article.indexable&&Boolean(article.publishedAt));
const serviceData=(slug:string)=>serviceMap[serviceRouteAliases[slug as keyof typeof serviceRouteAliases]||slug];
const industryData=(slug:string)=>industryMap[industryRouteAliases[slug as keyof typeof industryRouteAliases]||slug];
const dateLabel=(value:string)=>new Intl.DateTimeFormat("en-IN",{day:"numeric",month:"long",year:"numeric",timeZone:"UTC"}).format(new Date(value));

export function generateStaticParams(){return blogRegistry.filter(article=>article.indexable&&Boolean(article.publishedAt)).map(({slug})=>({slug}))}
export function generateMetadata({params}:{params:{slug:string}}){const article=findArticle(params.slug);if(!article)return {};return articleMetadata({title:article.title,description:article.description,path:`/blog/${article.slug}`,image:article.image,publishedTime:article.publishedAt,modifiedTime:article.updatedAt})}

function ContentBlock({block}:{block:BlogContentBlock}){
  if(block.type==="section")return <section className="article-content-section"><h2>{block.heading}</h2>{block.paragraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}</section>;
  if(block.type==="paragraph")return <p>{block.text}</p>;
  if(block.type==="list"){const List=block.ordered?"ol":"ul";return <section className="article-content-section">{block.heading&&<h2>{block.heading}</h2>}<List>{block.items.map(item=><li key={item}>{item}</li>)}</List></section>}
  if(block.type==="table")return <section className="article-content-section">{block.heading&&<h2>{block.heading}</h2>}<div className="article-table-wrap"><table>{block.caption&&<caption>{block.caption}</caption>}<thead><tr>{block.columns.map(column=><th scope="col" key={column}>{column}</th>)}</tr></thead><tbody>{block.rows.map((row,index)=><tr key={index}>{row.map((cell,cellIndex)=>cellIndex===0?<th scope="row" key={cellIndex}>{cell}</th>:<td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div></section>;
  return <section className="article-content-section article-faq"><h2>{block.heading}</h2>{block.items.map(item=><details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</section>;
}

export default function BlogArticlePage({params}:{params:{slug:string}}){
  const article=findArticle(params.slug);if(!article)notFound();
  const author=getVerifiedAuthor(article.authorSlug);if(!author)notFound();
  const primaryService=serviceData(article.primaryServiceSlug);if(!primaryService)notFound();
  const primaryServiceLabel=preferredServiceSlug(article.primaryServiceSlug)==="website-development"?"website development":preferredServiceSlug(article.primaryServiceSlug)==="crm-solutions"?"CRM solutions":primaryService.name.toLowerCase();
  const relatedIndustries=article.relatedIndustrySlugs.map(slug=>({slug,data:industryData(slug)})).filter(item=>Boolean(item.data));
  const relatedArticles=relatedArticlesForArticle(article);
  if(relatedIndustries.length===0)notFound();
  const faqs=article.content.filter((block):block is Extract<BlogContentBlock,{type:"faq"}>=>block.type==="faq").flatMap(block=>block.items);
  const schemas=[articleSchema({headline:article.title,description:article.description,path:`/blog/${article.slug}`,datePublished:article.publishedAt,dateModified:article.updatedAt,authorName:author.name,authorUrl:author.profileUrl,authorType:author.schemaType,authorId:author.schemaId,image:article.image}),...(faqs.length?[faqSchema(faqs)]:[])];
  return <PageShell><JsonLd data={schemas}/><article className="editorial-article"><header className="article-hero"><Container><Breadcrumbs items={[{label:"Home",href:"/"},{label:"Blog",href:"/blog"},{label:article.title}]}/><Eyebrow>{article.category}</Eyebrow><h1>{article.title}</h1><p className="article-excerpt">{article.excerpt}</p><div className="article-byline"><div><b>{author.name}</b><span>{author.role}</span></div><dl><div><dt>Published</dt><dd><time dateTime={article.publishedAt}>{dateLabel(article.publishedAt)}</time></dd></div><div><dt>Updated</dt><dd><time dateTime={article.updatedAt}>{dateLabel(article.updatedAt)}</time></dd></div><div><dt>Reading time</dt><dd>{articleReadingTime(article)} min</dd></div></dl></div>{article.image&&<figure className="article-cover"><Image src={article.image} alt={article.imageAlt||article.title} fill priority sizes="(max-width: 900px) 100vw, 1180px"/></figure>}</Container></header><Container><div className="article-layout"><aside className="article-author"><span>EDITORIAL RESPONSIBILITY</span><h2>{author.name}</h2><b>{author.role}</b><p>{author.bio}</p><h3>How this content is reviewed</h3><p>{author.reviewApproach}</p><p>{author.editorialResponsibility}</p><div>{author.profileUrl&&<Link href={author.profileUrl}>About DigiUdyam <ArrowRight/></Link>}<Link href="/editorial-policy">Editorial policy <ArrowRight/></Link></div></aside><div className="article-body">{article.content.map((block,index)=><ContentBlock block={block} key={`${block.type}-${index}`}/>)}</div></div></Container></article><section className="article-connections"><Container><div><Eyebrow>Continue exploring</Eyebrow><h2>Connect the guidance with your business journey</h2></div><div className="article-related"><section><span>PRIMARY SERVICE</span><Link href={`/services/${preferredServiceSlug(article.primaryServiceSlug)}`}><b>Learn about our {primaryServiceLabel} process</b><ArrowRight/></Link></section><section><span>RELEVANT INDUSTRIES</span>{relatedIndustries.map(item=><Link href={`/industries/${preferredIndustrySlug(item.slug)}`} key={item.slug}><b>See digital growth solutions for {item.data.name.toLowerCase()}</b><ArrowRight/></Link>)}</section></div></Container></section><RelatedArticles articles={relatedArticles} heading="Related guides for your next decision"/><section className="article-cta"><Container><div><Eyebrow light>FREE DIGITAL GROWTH AUDIT</Eyebrow><h2>Apply the guidance to your business.</h2><p>Get a practical review of your current website, visibility, enquiry journey and follow-up priorities.</p></div><div><Button variant="light" href={article.conversionPath}>Request My Free Audit</Button><p><Check weight="bold"/> Clear priorities without inflated promises</p></div></Container></section></PageShell>;
}
