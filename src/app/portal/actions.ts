"use server";
import { revalidatePath } from "next/cache";
import { getPortalSession } from "@/lib/portal/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { emitNotificationSafe } from "@/lib/notifications/service";

export type RequestActionState = { ok: boolean; error?: string };

export async function createPortalRequestAction(_: RequestActionState, form: FormData): Promise<RequestActionState> {
  const session = await getPortalSession();
  if (!session) return { ok: false, error: "Your session has expired." };
  const title = String(form.get("title") || "").trim();
  const description = String(form.get("description") || "").trim();
  const requestType = String(form.get("request_type") || "").trim();
  const priority = String(form.get("priority") || "normal").toLowerCase();
  if (!title || !description || !requestType) return { ok: false, error: "Please complete every required field." };
  const db = createSupabaseServerClient();
  const { error } = await db.from("requests").insert({ organization_id: session.organizationId, business_id: session.businessId || null, created_by: session.user.id, request_type: requestType, title, description, priority: priority === "high" ? "high" : "normal", status: "submitted" });
  if (error) return { ok: false, error: "The request could not be submitted." };
  const admin=createSupabaseAdminClient();
  const [{data:organization},{data:team}]=await Promise.all([admin.from("organizations").select("account_manager_id").eq("id",session.organizationId).single(),admin.from("team_assignments").select("user_id").eq("organization_id",session.organizationId)]);
  await emitNotificationSafe({event:"client_request_received",recipientIds:[organization?.account_manager_id||"",...(team||[]).map(member=>member.user_id)],organizationId:session.organizationId,title:`New client request: ${title}`,body:`${session.user.name} submitted a ${requestType} request.`,severity:priority==="high"?"warning":"info"});
  revalidatePath("/portal/requests");
  revalidatePath("/portal/overview");
  return { ok: true };
}
export async function updatePortalProfileAction(form:FormData){const session=await getPortalSession();if(!session)throw new Error("UNAUTHORIZED");const db=createSupabaseServerClient();const call=db.rpc as any;const {error}=await call("update_client_workspace_profile",{target_business:session.businessId,contact_name:String(form.get("contact_name")||""),contact_email:String(form.get("contact_email")||""),contact_phone:String(form.get("contact_phone")||""),business_name:String(form.get("business_name")||""),business_industry:String(form.get("industry")||""),business_website:String(form.get("website")||""),business_description:String(form.get("description")||"")});if(error)throw error;revalidatePath("/portal/settings");revalidatePath("/portal/overview")}
export async function respondAccessRequestAction(form:FormData){const session=await getPortalSession();if(!session)throw new Error("UNAUTHORIZED");const db=createSupabaseServerClient();const call=db.rpc as any;const {error}=await call("respond_to_access_request",{target_request:String(form.get("request_id")||""),new_status:"submitted",response:String(form.get("response")||"")});if(error)throw error;revalidatePath("/portal/settings")}
