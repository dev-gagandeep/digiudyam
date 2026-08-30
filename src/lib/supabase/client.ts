"use client";import { createBrowserClient } from "@supabase/ssr";import type { Database } from "./database.types";import { requireSupabasePublicEnv } from "./env";
let browserClient:ReturnType<typeof createBrowserClient<Database>>|undefined;
export function createSupabaseBrowserClient(){const {url,key}=requireSupabasePublicEnv();return browserClient??=createBrowserClient<Database>(url,key)}
