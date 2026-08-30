import "server-only";
import { cache } from "react";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { notificationEmail } from "@/lib/email/templates";
import { sendEmail } from "@/lib/email/service";
import type { EmitNotificationInput } from "./types";

export async function emitNotification(input: EmitNotificationInput) {
  const recipients=Array.from(new Set(input.recipientIds.filter(Boolean)));
  if(!recipients.length)return {inApp:0,email:{status:"skipped" as const,reason:"No recipients"}};
  const db=createSupabaseAdminClient();
  const {error}=await db.from("notifications").insert(recipients.map(user_id=>({user_id,organization_id:input.organizationId||null,notification_type:input.event,title:input.title,body:input.body,severity:input.severity||"info"})));
  if(error)throw error;
  const email=input.email?.recipients.length?await sendEmail({...notificationEmail({eyebrow:"DIGIUDYAM UPDATE",title:input.title,body:input.body,actionLabel:input.email.actionLabel,actionUrl:input.email.actionUrl}),to:input.email.recipients}):{status:"skipped" as const,reason:"Email channel not requested"};
  return {inApp:recipients.length,email};
}
export async function emitNotificationSafe(input:EmitNotificationInput){try{return await emitNotification(input)}catch(error){console.error("Notification delivery failed",{event:input.event,error:error instanceof Error?error.message:"Unknown error"});return {inApp:0,email:{status:"failed" as const,error:error instanceof Error?error.message:"Unknown error"}}}}

async function notificationContext(){const db=createSupabaseServerClient();const {data,error}=await db.auth.getUser();if(error||!data.user)throw error||new Error("UNAUTHORIZED");return {db,userId:data.user.id};}
export const getMyNotifications=cache(async(type="all",limit=50)=>{const {db,userId}=await notificationContext();let query=db.from("notifications").select("id,organization_id,notification_type,title,body,severity,read_at,created_at").eq("user_id",userId).order("created_at",{ascending:false}).limit(limit);if(type!=="all")query=query.eq("notification_type",type);const {data,error}=await query;if(error)throw error;return data||[]});
export async function getMyNotificationSummary(){const {db,userId}=await notificationContext();const [countResult,latestResult]=await Promise.all([db.from("notifications").select("id",{count:"exact",head:true}).eq("user_id",userId).is("read_at",null),db.from("notifications").select("id,title,body").eq("user_id",userId).is("read_at",null).order("created_at",{ascending:false}).limit(1).maybeSingle()]);if(countResult.error||latestResult.error)throw countResult.error||latestResult.error;return {unread:countResult.count||0,latest:latestResult.data||null};}
export async function markMyNotificationRead(id:string){const db=createSupabaseServerClient();const {error}=await db.from("notifications").update({read_at:new Date().toISOString()}).eq("id",id);if(error)throw error;}
export async function markAllMyNotificationsRead(){const db=createSupabaseServerClient();const {error}=await db.from("notifications").update({read_at:new Date().toISOString()}).is("read_at",null);if(error)throw error;}
