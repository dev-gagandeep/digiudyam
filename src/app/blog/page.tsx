import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpenText } from "@phosphor-icons/react/dist/ssr";
import { Breadcrumbs, PageShell } from "@/components/PageShell";
import { Container, Eyebrow } from "@/components/ui";
import { createMetadata } from "@/lib/metadata";
import { articleReadingTime, publishedBlogArticles } from "@/lib/seo/routes";

export const metadata=createMetadata({title:"Local Business Growth Guides",description:"Practical guides about websites, local SEO, Google Business Profile, leads and automation for Indian business owners.",path:"/blog",noIndex:publishedBlogArticles.length===0});

const dateLabel=(value:string)=>new Intl.DateTimeFormat("en-IN",{day:"numeric",month:"short",year:"numeric",timeZone:"UTC"}).format(new Date(value));
const guide={title:"Website Development Company for Small Business India",excerpt:"Professional, mobile-friendly and SEO-ready website solutions for small businesses, startups, MSMEs and local businesses across India.",href:"/website-development-company-for-small-business-india",image:"/website-development-company-for-small-business-india.webp",alt:"Website development company helping small businesses in India build professional websites"};

export default function Blog(){
  const categories=Array.from(new Set(publishedBlogArticles.map(article=>article.category)));
  return <PageShell><section className="directory-hero blog-directory-hero"><Container><Breadcrumbs items={[{label:"Home",href:"/"},{label:"Blog"}]}/><Eyebrow>PRACTICAL GROWTH GUIDES</Eyebrow><h1>Useful advice for<br/><em>local business owners.</em></h1><p>Clear, practical guidance about websites, search visibility, marketing, customer management and automation.</p>{categories.length>0&&<nav className="blog-categories" aria-label="Article categories">{categories.map(category=><span key={category}>{category}</span>)}</nav>}</Container></section><section className="blog-grid"><Container><article><div><Image src={guide.image} alt={guide.alt} fill sizes="(max-width: 760px) 100vw, 33vw"/></div><span>Website Development</span><h2><Link href={guide.href}>{guide.title}</Link></h2><p>{guide.excerpt}</p><small>Updated 1 Sep 2026 · Commercial guide</small><Link className="blog-card-link" href={guide.href}>Read guide <ArrowRight/></Link></article>{publishedBlogArticles.length>0?publishedBlogArticles.map(article=><article key={article.slug}>{article.image&&<div><Image src={article.image} alt={article.imageAlt||""} fill sizes="(max-width: 760px) 100vw, 33vw"/></div>}<span>{article.category}</span><h2><Link href={`/blog/${article.slug}`}>{article.title}</Link></h2><p>{article.excerpt}</p><small>{dateLabel(article.publishedAt)} · {articleReadingTime(article)} min read</small><Link className="blog-card-link" href={`/blog/${article.slug}`}>Read article <ArrowRight/></Link></article>):<div className="blog-empty"><BookOpenText weight="duotone"/><h2>Practical guides are being prepared.</h2><p>New articles will appear here only when they are reviewed and ready to publish.</p><Link href="/services">Explore DigiUdyam services <ArrowRight/></Link></div>}</Container></section></PageShell>;
}
