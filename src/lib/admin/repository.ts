import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/database.types";

type Tables = Database["public"]["Tables"];

async function insert<T extends keyof Tables>(table: T, values: Tables[T]["Insert"]) {
  const db = createSupabaseServerClient();
  const query = db.from(table) as any;
  const { data, error } = await query.insert(values).select().single();
  if (error) throw error;
  return data;
}

async function update<T extends keyof Tables>(table: T, id: string, values: Tables[T]["Update"]) {
  const db = createSupabaseServerClient();
  const query = db.from(table) as any;
  const { data, error } = await query.update(values).eq("id", id).select().single();
  if (error) throw error;
  return data;
}

export const adminRepository = {
  createOrganization: (values: Tables["organizations"]["Insert"]) => insert("organizations", values),
  updateOrganization: (id: string, values: Tables["organizations"]["Update"]) => update("organizations", id, values),
  createBusiness: (values: Tables["businesses"]["Insert"]) => insert("businesses", values),
  updateBusiness: (id: string, values: Tables["businesses"]["Update"]) => update("businesses", id, values),
  createLocation: (values: Tables["locations"]["Insert"]) => insert("locations", values),
  updateLocation: (id: string, values: Tables["locations"]["Update"]) => update("locations", id, values),
  updateMembership: (id: string, values: Tables["organization_members"]["Update"]) => update("organization_members", id, values),
  createClientService: (values: Tables["client_services"]["Insert"]) => insert("client_services", values),
  updateClientService: (id: string, values: Tables["client_services"]["Update"]) => update("client_services", id, values),
  createService: (values: Tables["services"]["Insert"]) => insert("services", values),
  updateService: (id: string, values: Tables["services"]["Update"]) => update("services", id, values),
  updateRequest: (id: string, values: Tables["requests"]["Update"]) => update("requests", id, values),
  createTask: (values: Tables["tasks"]["Insert"]) => insert("tasks", values),
  updateTask: (id: string, values: Tables["tasks"]["Update"]) => update("tasks", id, values),
  createReport: (values: Tables["reports"]["Insert"]) => insert("reports", values),
  updateReport: (id: string, values: Tables["reports"]["Update"]) => update("reports", id, values),
  async markNotificationRead(id: string, userId: string) {
    const db = createSupabaseServerClient();
    const { error } = await db.from("notifications").update({ read_at: new Date().toISOString() }).eq("id", id).eq("user_id", userId);
    if (error) throw error;
  },
};
