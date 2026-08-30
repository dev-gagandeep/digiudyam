import { firstSeoArticles } from "@/lib/seo/blog-content";

export type SeoRouteDefinition={slug:string;title:string;description:string;updatedAt:string;indexable:boolean};
export const serviceRouteAliases={"website-development":"web-development","crm-solutions":"crm"} as const;
export const serviceRouteRedirects={"web-development":"website-development",crm:"crm-solutions"} as const;
export const industryRouteAliases={clinics:"healthcare"} as const;
export const industryRouteRedirects={healthcare:"clinics"} as const;
export const preferredServiceSlug=(slug:string)=>serviceRouteRedirects[slug as keyof typeof serviceRouteRedirects]||slug;
export const preferredIndustrySlug=(slug:string)=>industryRouteRedirects[slug as keyof typeof industryRouteRedirects]||slug;
export const futureLocationRoutePattern="/locations/[city]";
export const futureServiceIndustryRoutePattern="/solutions/[service]/[industry]";
export type BlogFaqItem={question:string;answer:string};
export type BlogContentBlock=
 |{type:"section";heading:string;paragraphs:string[]}
 |{type:"paragraph";text:string}
 |{type:"list";heading?:string;items:string[];ordered?:boolean}
 |{type:"table";heading?:string;caption?:string;columns:string[];rows:string[][]}
 |{type:"faq";heading:string;items:BlogFaqItem[]};
export type BlogRouteDefinition=SeoRouteDefinition&{
 excerpt:string;
 publishedAt:string;
 authorSlug:string;
 category:string;
 image?:string;
 imageAlt?:string;
 content:BlogContentBlock[];
 primaryServiceSlug:string;
 relatedIndustrySlugs:string[];
 relatedArticleSlugs?:string[];
 conversionPath:"/free-audit";
};
export const blogRegistry:BlogRouteDefinition[]=firstSeoArticles;
export const publishedBlogArticles=blogRegistry.filter(article=>article.indexable&&Boolean(article.publishedAt));
const blockWords=(block:BlogContentBlock)=>{if(block.type==="section")return [block.heading,...block.paragraphs].join(" ");if(block.type==="paragraph")return block.text;if(block.type==="list")return [block.heading||"",...block.items].join(" ");if(block.type==="table")return [block.heading||"",block.caption||"",...block.columns,...block.rows.flat()].join(" ");return [block.heading,...block.items.flatMap(item=>[item.question,item.answer])].join(" ")};
export const articleReadingTime=(article:BlogRouteDefinition)=>Math.max(1,Math.ceil([article.title,article.excerpt,...article.content.map(blockWords)].join(" ").trim().split(/\s+/).length/220));
export type ProgrammaticRouteInput={serviceSlug:string;industrySlug?:string;citySlug?:string};
export function validateProgrammaticRoute(input:ProgrammaticRouteInput){return isSafeSeoSlug(input.serviceSlug)&&(!input.industrySlug||isSafeSeoSlug(input.industrySlug))&&(!input.citySlug||isSafeSeoSlug(input.citySlug))}
export function isSafeSeoSlug(value:string){return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)}
