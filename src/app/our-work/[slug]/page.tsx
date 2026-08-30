import { notFound } from "next/navigation";
import { CaseStudyPage } from "@/components/CaseStudyPage";
import { articleMetadata } from "@/lib/metadata";
import { findPublishedCaseStudy, publishedCaseStudies } from "@/lib/seo/case-studies";
import { caseStudySchema } from "@/lib/seo/schema";

export const dynamicParams=false;
export function generateStaticParams(){return publishedCaseStudies.map(study=>({slug:study.slug}))}
export function generateMetadata({params}:{params:{slug:string}}){const study=findPublishedCaseStudy(params.slug);if(!study)return {};return articleMetadata({title:study.title,description:study.description,path:`/our-work/${study.slug}`,publishedTime:study.publishedAt,modifiedTime:study.updatedAt,image:study.media[0]?.src})}
export default function CaseStudyDetail({params}:{params:{slug:string}}){const study=findPublishedCaseStudy(params.slug);if(!study)notFound();return <CaseStudyPage study={study} schema={caseStudySchema(study)}/>}
