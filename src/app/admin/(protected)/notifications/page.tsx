import { AdminHeading } from "@/components/admin/AdminUI";
import { NotificationCenter } from "@/components/NotificationCenter";
import { getMyNotifications } from "@/lib/notifications/service";
import "../../../notifications.css";
export const metadata={title:"Notifications"};
export default async function AdminNotifications({searchParams}:{searchParams:{type?:string}}){const type=searchParams.type||"all";const items=await getMyNotifications(type);return <div className="admin-page"><AdminHeading label="SYSTEM / NOTIFICATIONS" title="Communication center." copy="Sales, client and delivery events requiring your attention in one private inbox."/><NotificationCenter items={items} basePath="/admin/notifications" activeType={type}/></div>}
