import type { DashboardData } from "./types";
export type IntegrationSource="google-analytics"|"search-console"|"google-business"|"google-ads"|"meta"|"gohighlevel"|"whatsapp"|"call-tracking"|"internal";
export interface IntegrationContext{organizationId:string;businessId:string;locationIds:string[];range:{from:Date;to:Date}}
export interface GrowthDataAdapter{source:IntegrationSource;isConfigured():Promise<boolean>;fetch(context:IntegrationContext):Promise<Partial<DashboardData>>}
export interface PortalDataProvider{mode:"demo"|"production";getDashboard(organizationId:string,businessId:string):Promise<DashboardData>}
export class IntegrationUnavailableError extends Error{constructor(public source:IntegrationSource){super(`${source} is not configured`)}}
