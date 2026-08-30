import "server-only";

export type Web3FormsChannel="contact"|"free-audit"|"home";

const accessKeys:Record<Web3FormsChannel,string|undefined>={
  contact:process.env.WEB3FORMS_CONTACT_ACCESS_KEY,
  "free-audit":process.env.WEB3FORMS_FREE_AUDIT_ACCESS_KEY,
  home:process.env.WEB3FORMS_HOME_ACCESS_KEY
};

export async function sendWeb3Forms(channel:Web3FormsChannel,subject:string,data:Record<string,string>){
  const accessKey=accessKeys[channel];
  if(!accessKey)throw new Error("WEB3FORMS_NOT_CONFIGURED");
  const response=await fetch("https://api.web3forms.com/submit",{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify({access_key:accessKey,subject,from_name:"DigiUdyam Website",...data}),cache:"no-store"});
  const result=await response.json().catch(()=>null) as {success?:boolean;message?:string}|null;
  if(!response.ok||!result?.success){console.error("Web3Forms submission failed",{channel,status:response.status,message:result?.message||"Unknown response"});throw new Error("WEB3FORMS_DELIVERY_FAILED");}
}
