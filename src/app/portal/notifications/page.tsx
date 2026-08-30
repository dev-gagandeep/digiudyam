import { PortalHeading } from "@/components/portal/PortalUI";
import { NotificationCenter } from "@/components/NotificationCenter";
import { getMyNotifications } from "@/lib/notifications/service";
import "../../notifications.css";
export const metadata={title:"Notifications"};
export default async function PortalNotifications({searchParams}:{searchParams:{type?:string}}){const type=searchParams.type||"all";const items=await getMyNotifications(type);return <div className="portal-page"><PortalHeading eyebrow="ACCOUNT / NOTIFICATIONS" title="Your latest updates." copy="Service progress, completed work, reports and request updates for your organization."/><NotificationCenter items={items} basePath="/portal/notifications" activeType={type}/></div>}
