import "server-only";
import type { CommunicationEvent, NotificationChannel } from "./types";
export type AutomationRule={id:string;trigger:CommunicationEvent;channels:NotificationChannel[];audience:"sales_owner"|"assignee"|"client_members"|"client_team";description:string};
export const automationRules:AutomationRule[]=[
  {id:"lead-created",trigger:"lead_created",channels:["in_app"],audience:"sales_owner",description:"Notify the sales owner when a lead enters the CRM."},
  {id:"task-assigned",trigger:"task_assigned",channels:["in_app"],audience:"assignee",description:"Notify a team member when delivery work is assigned."},
  {id:"task-completed",trigger:"task_completed",channels:["in_app","email"],audience:"client_members",description:"Tell client members when visible delivery work is completed."},
  {id:"report-published",trigger:"report_published",channels:["in_app","email"],audience:"client_members",description:"Deliver published report notifications to the client."},
  {id:"request-received",trigger:"client_request_received",channels:["in_app"],audience:"client_team",description:"Alert the assigned team when a client submits a request."},
];
export const futureChannels:NotificationChannel[]=["whatsapp"];
