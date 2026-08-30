import { ClientDirectory } from "@/components/admin/ClientDirectory";
import { AdminHeading } from "@/components/admin/AdminUI";
import { adminDataProvider } from "@/lib/admin/provider";
import { getOnboardingOptions } from "@/lib/admin/onboarding-service";
import { requireAdmin } from "@/lib/admin/auth";
import { ClientOnboardingWizard } from "@/components/admin/ClientOnboardingWizard";
import "./onboarding-form.css";

export const metadata = { title: "Clients" };

export default async function Clients({ searchParams }: { searchParams: { q?: string } }) {
  await requireAdmin("view_clients");
  const [data, options] = await Promise.all([adminDataProvider.getDashboard("clients"), getOnboardingOptions()]);
  return <div className="admin-page">
    <AdminHeading label="CLIENTS / DIRECTORY" title="Client accounts." copy="Search and filter operational records without loading unrelated performance data."/>
    <ClientOnboardingWizard services={options.services} staff={options.staff}/>
    <ClientDirectory clients={data.clients} users={data.users} initialQuery={searchParams.q}/>
  </div>;
}
