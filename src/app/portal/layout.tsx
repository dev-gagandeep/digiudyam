import { redirect } from "next/navigation";
import { PortalChrome } from "@/components/portal/PortalChrome";
import { getPortalSession } from "@/lib/portal/auth";
import { getPortalData } from "@/lib/portal/provider";
import { getMyNotificationSummary } from "@/lib/notifications/service";
import "./portal.css";
import "./portal-design-polish.css";
import "./portal-layout-polish.css";
import "./service-delivery.css";

export const metadata={title:{default:"Growth Hub",template:"%s | DigiUdyam Growth Hub"},robots:{index:false,follow:false}};
export default async function PortalLayout({children}:{children:React.ReactNode}) {
  const session=await getPortalSession();
  if(!session) redirect("/login");
  const [data,notifications]=await Promise.all([getPortalData(),getMyNotificationSummary()]);
  return <PortalChrome business={data.organization.businesses[0]?.name || data.organization.name} user={session.user.name} notifications={notifications}>{children}</PortalChrome>;
}
