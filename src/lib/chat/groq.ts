import "server-only";
import { CHAT_SYSTEM_PROMPT } from "./prompt";

type Message={role:"user"|"assistant";content:string};
export type ChatCompletion={reply:string;lead:{name:string|null;business_name:string|null;email:string|null;phone:string|null;website:string|null;industry:string|null;location:string|null;required_services:string[]};qualified:boolean};
export const GROQ_ENDPOINT="https://api.groq.com/openai/v1/chat/completions";
export const GROQ_MODEL="openai/gpt-oss-120b";

export class GroqApiError extends Error {
  constructor(public status:number,public code:string,public providerMessage:string){super(code);this.name="GroqApiError";}
}

export async function completeChat(messages:Message[]):Promise<ChatCompletion>{
  const key=process.env.GROQ_API_KEY;if(!key)throw new GroqApiError(401,"GROQ_AUTH_ERROR","GROQ_API_KEY is not configured");
  let response:Response;
  try{response=await fetch(GROQ_ENDPOINT,{method:"POST",headers:{Authorization:`Bearer ${key}`,"Content-Type":"application/json"},body:JSON.stringify({model:GROQ_MODEL,temperature:.35,max_completion_tokens:650,response_format:{type:"json_object"},messages:[{role:"system",content:CHAT_SYSTEM_PROMPT},...messages]})})}
  catch(error){throw new GroqApiError(503,"GROQ_NETWORK_ERROR",error instanceof Error?error.message:"Network request failed")}
  if(!response.ok){let providerMessage="No provider error details";try{const payload=await response.json() as {error?:{message?:string;code?:string}};providerMessage=[payload.error?.code,payload.error?.message].filter(Boolean).join(": ").slice(0,500)||providerMessage}catch{providerMessage=(await response.text().catch(()=>"")).slice(0,500)||providerMessage}const code=response.status===401?"GROQ_AUTH_ERROR":response.status===404?"GROQ_MODEL_OR_ENDPOINT_NOT_FOUND":response.status===429?"GROQ_RATE_LIMIT":`GROQ_HTTP_${response.status}`;throw new GroqApiError(response.status,code,providerMessage)}
  const payload=await response.json() as {choices?:{message?:{content?:string}}[]};const content=payload.choices?.[0]?.message?.content;if(!content)throw new GroqApiError(502,"GROQ_EMPTY_RESPONSE","Provider returned no assistant content");
  try{const parsed=JSON.parse(content) as ChatCompletion;if(typeof parsed.reply!=="string"||!parsed.lead||!Array.isArray(parsed.lead.required_services))throw new Error("Response schema mismatch");return parsed}catch(error){throw new GroqApiError(502,"GROQ_INVALID_RESPONSE",error instanceof Error?error.message:"Invalid structured response")}
}
