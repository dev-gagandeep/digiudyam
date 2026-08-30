import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "./database.types";
import { requireSupabasePublicEnv } from "./env";

export function createSupabaseServerClient() {
  const { url, key } = requireSupabasePublicEnv();
  const store = cookies();
  return createServerClient<Database>(url, key, {
    cookies: {
      getAll() { return store.getAll(); },
      setAll(values) {
        try { values.forEach(({ name, value, options }) => store.set(name, value, options)); }
        catch { /* Server Components cannot write cookies; middleware refreshes them. */ }
      },
    },
  });
}
