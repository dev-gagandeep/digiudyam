export type CaseStudyMedia={src:string;alt:string;caption?:string;width:number;height:number};
export type CaseStudyOutcome={heading:string;detail:string;verified:boolean};
export type CaseStudyProcessStep={heading:string;detail:string};

export type CaseStudyDefinition={
  slug:string;
  title:string;
  description:string;
  category:string;
  businessType:string;
  industrySlug:string;
  challenge:string;
  businessSituation:string[];
  approach:string[];
  serviceSlugs:string[];
  process:CaseStudyProcessStep[];
  media:CaseStudyMedia[];
  outcomes:CaseStudyOutcome[];
  learnings:string[];
  relatedArticleSlugs:string[];
  clientApproval:"approved"|"pending"|"not-requested";
  publishedAt?:string;
  updatedAt:string;
  indexable:boolean;
};

// Add only client-approved, evidence-backed work. An empty registry is intentional.
export const caseStudyRegistry:CaseStudyDefinition[]=[];

export const isPublishedCaseStudy=(study:CaseStudyDefinition)=>study.clientApproval==="approved"&&study.indexable&&Boolean(study.publishedAt);
export const publishedCaseStudies=caseStudyRegistry.filter(isPublishedCaseStudy);
export const caseStudyCategories=Array.from(new Set(publishedCaseStudies.map(study=>study.category))).sort();
export const findPublishedCaseStudy=(slug:string)=>publishedCaseStudies.find(study=>study.slug===slug);
