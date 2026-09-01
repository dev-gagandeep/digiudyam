import { NextRequest,NextResponse } from "next/server";
import { takeChatRateLimit } from "@/lib/chat/rate-limit";
import { sendWeb3Forms } from "@/lib/web3forms";

export const runtime="nodejs";
const clean=(value:unknown,max=500)=>typeof value==="string"?value.trim().slice(0,max):"";

export async function POST(request:NextRequest){
  const address=request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()||request.headers.get("x-real-ip")||"unknown";
  const rate=takeChatRateLimit(`contact:${address}`,5,15*60*1000);
  if(!rate.allowed)return NextResponse.json({error:"Too many requests. Please try again shortly."},{status:429});
  let body:Record<string,unknown>;try{body=await request.json()}catch{return NextResponse.json({error:"Invalid request."},{status:400})}
  if(clean(body.botcheck))return NextResponse.json({ok:true});
  const name=clean(body.name,180),business=clean(body.business,180),phone=clean(body.phone,30),email=clean(body.email,240),website=clean(body.website,300),businessType=clean(body.type,180),help=clean(body.help,180),message=clean(body.message,1500);
  if(!name||!business||!phone||!email||!businessType||!help||!message)return NextResponse.json({error:"Please complete all required fields."},{status:400});
  try{await sendWeb3Forms("contact",`Contact enquiry: ${business}`,{name,business_name:business,phone,email,website:website||"Not provided",business_type:businessType,help_required:help,message,replyto:email,page_url:"https://www.digiudyam.in/contact"});return NextResponse.json({ok:true})}catch(error){console.error("Contact form delivery failed",{code:error instanceof Error?error.message:"UNKNOWN"});return NextResponse.json({error:"We could not send your enquiry. Please email hello@digiudyam.in."},{status:503})}
}
