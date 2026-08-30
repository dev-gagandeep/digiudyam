import { BlogRouteDefinition, industryRouteAliases, preferredIndustrySlug, preferredServiceSlug, publishedBlogArticles, serviceRouteAliases } from "@/lib/seo/routes";

const canonicalService=(slug:string)=>preferredServiceSlug(serviceRouteAliases[slug as keyof typeof serviceRouteAliases]||slug);
const canonicalIndustry=(slug:string)=>preferredIndustrySlug(industryRouteAliases[slug as keyof typeof industryRouteAliases]||slug);
const unique=<T extends {slug:string}>(items:T[])=>items.filter((item,index)=>items.findIndex(candidate=>candidate.slug===item.slug)===index);

export function supportingArticlesForService(serviceSlug:string,limit=3){
  const canonical=canonicalService(serviceSlug);
  return publishedBlogArticles.filter(article=>canonicalService(article.primaryServiceSlug)===canonical).slice(0,limit);
}

export function supportingArticlesForIndustry(industrySlug:string,limit=3){
  const canonical=canonicalIndustry(industrySlug);
  return publishedBlogArticles.filter(article=>article.relatedIndustrySlugs.some(slug=>canonicalIndustry(slug)===canonical)).slice(0,limit);
}

export function relatedArticlesForArticle(article:BlogRouteDefinition,limit=3){
  const explicit=(article.relatedArticleSlugs||[]).map(slug=>publishedBlogArticles.find(candidate=>candidate.slug===slug)).filter((candidate):candidate is BlogRouteDefinition=>Boolean(candidate)&&candidate?.slug!==article.slug);
  const articleIndustries=new Set(article.relatedIndustrySlugs.map(canonicalIndustry));
  const inferred=publishedBlogArticles.filter(candidate=>candidate.slug!==article.slug).map(candidate=>({
    article:candidate,
    score:(canonicalService(candidate.primaryServiceSlug)===canonicalService(article.primaryServiceSlug)?4:0)+candidate.relatedIndustrySlugs.filter(slug=>articleIndustries.has(canonicalIndustry(slug))).length
  })).filter(item=>item.score>0).sort((a,b)=>b.score-a.score||b.article.publishedAt.localeCompare(a.article.publishedAt)||a.article.title.localeCompare(b.article.title)).map(item=>item.article);
  return unique([...explicit,...inferred]).slice(0,limit);
}
