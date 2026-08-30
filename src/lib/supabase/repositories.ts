import "server-only";import { createSupabaseServerClient } from "./server";import type { Database } from "./database.types";
export async function listAccessibleBusinesses(){const db=createSupabaseServerClient();const {data,error}=await db.from("businesses").select("id, organization_id, name, industry, website, status, created_at, updated_at").order("name");if(error)throw error;return data}
export async function listAccessibleLocations(businessId:string){const db=createSupabaseServerClient();const {data,error}=await db.from("locations").select("*").eq("business_id",businessId).order("name");if(error)throw error;return data}
export async function listClientRequests(organizationId:string){const db=createSupabaseServerClient();const {data,error}=await db.from("requests").select("*").eq("organization_id",organizationId).order("created_at",{ascending:false}).limit(50);if(error)throw error;return data}
export async function createClientRequest(input:Database["public"]["Tables"]["requests"]["Insert"]){const db=createSupabaseServerClient();const {data,error}=await db.from("requests").insert(input).select().single();if(error)throw error;return data}
export async function listPublishedReports(organizationId:string){const db=createSupabaseServerClient();const {data,error}=await db.from("reports").select("*, report_blocks(*)").eq("organization_id",organizationId).eq("status","published").order("period_end",{ascending:false});if(error)throw error;return data}
// Staff-only repositories should call requireAdmin() and use the user-scoped
// server client wherever possible. Reserve the secret-key client for background
// jobs, auth administration and carefully audited cross-client operations.
