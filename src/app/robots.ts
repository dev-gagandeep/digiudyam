import type { MetadataRoute } from "next";import { site } from "@/lib/site";
const privatePaths=["/admin","/portal","/api","/login"];
export default function robots():MetadataRoute.Robots{return {rules:[{userAgent:"*",allow:"/",disallow:privatePaths},{userAgent:["Googlebot","Bingbot"],allow:"/",disallow:privatePaths},{userAgent:["GPTBot","ChatGPT-User","OAI-SearchBot","ClaudeBot","PerplexityBot"],allow:"/",disallow:privatePaths}],sitemap:`${site.url}/sitemap.xml`,host:site.url}}
