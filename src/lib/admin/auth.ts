import "server-only";
import { getAuthContext } from "@/lib/supabase/auth";
import { hasPermission, type Permission, type Role } from "./permissions";

const staffRoles: Role[] = ["super_admin", "admin", "account_manager", "specialist"];

export async function getAdminSession(): Promise<{ userId: string; role: Role } | null> {
  const context = await getAuthContext();
  if (!context || context.profile.status !== "active") return null;
  const role = context.profile.role as Role;
  return staffRoles.includes(role) ? { userId: context.userId, role } : null;
}

export async function requireAdmin(permission?: Permission) {
  const session = await getAdminSession();
  if (!session) throw new Error("UNAUTHORIZED");
  if (permission && !hasPermission(session.role, permission)) throw new Error("FORBIDDEN");
  return session;
}
