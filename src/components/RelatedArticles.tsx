import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { BlogRouteDefinition } from "@/lib/seo/routes";
import { Container, Eyebrow } from "./ui";

export function RelatedArticles({articles,heading="Continue with practical guidance"}:{articles:BlogRouteDefinition[];heading?:string}){
  if(!articles.length)return null;
  return <section className="supporting-articles" aria-labelledby={`supporting-${articles[0].slug}`}><Container><header><Eyebrow>Supporting articles</Eyebrow><h2 id={`supporting-${articles[0].slug}`}>{heading}</h2></header><div>{articles.map(article=><article key={article.slug}><span>{article.category}</span><h3>{article.title}</h3><p>{article.excerpt}</p><Link href={`/blog/${article.slug}`}>Read this practical guide <ArrowRight/></Link></article>)}</div></Container></section>;
}
