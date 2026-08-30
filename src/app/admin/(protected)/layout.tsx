import { redirect } from "next/navigation";
import { AdminChrome } from "@/components/admin/AdminChrome";
import { getAdminSession } from "@/lib/admin/auth";
import { getAuthContext } from "@/lib/supabase/auth";
import { roleLabels } from "@/lib/admin/permissions";
import { getMyNotificationSummary } from "@/lib/notifications/service";
import "../admin.css";
import "../admin-enhancements.css";
import "../admin-design-polish.css";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session=await getAdminSession();
  if (!session) redirect("/admin/login");
  const [context,notifications]=await Promise.all([getAuthContext(),getMyNotificationSummary()]);
  if (!context) redirect("/admin/login");
  return <AdminChrome user={context.profile.full_name} role={roleLabels[session.role]} notifications={notifications}>{children}</AdminChrome>;
}
