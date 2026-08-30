import "server-only";
import { Resend } from "resend";
import type { EmailMessage, EmailResult } from "./types";

export async function sendEmail(message: EmailMessage): Promise<EmailResult> {
  const apiKey=process.env.RESEND_API_KEY,from=process.env.RESEND_FROM_EMAIL;
  if(!apiKey)return {status:"skipped",reason:"RESEND_API_KEY is not configured"};
  if(!from)return {status:"skipped",reason:"RESEND_FROM_EMAIL is not configured"};
  try { const {data,error}=await new Resend(apiKey).emails.send({from,to:message.to,subject:message.subject,html:message.html,text:message.text,replyTo:message.replyTo}); if(error)return {status:"failed",error:error.message}; return data?.id?{status:"sent",id:data.id}:{status:"failed",error:"Resend returned no message id"}; }
  catch(error){return {status:"failed",error:error instanceof Error?error.message:"Unknown email delivery error"};}
}
