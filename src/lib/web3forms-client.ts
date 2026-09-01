type Web3FormsResult={success?:boolean;message?:string;body?:{message?:string}};

export async function submitWeb3Forms(accessKey:string,subject:string,data:Record<string,string>){
  if(!accessKey)throw new Error("This form is temporarily unavailable. Please email hello@digiudyam.in.");
  const response=await fetch("https://api.web3forms.com/submit",{
    method:"POST",
    headers:{"Content-Type":"application/json","Accept":"application/json"},
    body:JSON.stringify({access_key:accessKey,subject,from_name:"DigiUdyam Website",...data})
  });
  const result=await response.json().catch(()=>null) as Web3FormsResult|null;
  if(!response.ok||!result?.success)throw new Error(result?.message||result?.body?.message||"We could not send your request. Please email hello@digiudyam.in.");
}
