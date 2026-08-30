export type Status="healthy"|"improving"|"attention"|"inactive"|"active"|"paused"|"error";
export interface Organization{id:string;name:string;businesses:Business[]}
export interface Business{id:string;name:string;industry:string;locations:Location[]}
export interface Location{id:string;name:string;city:string}
export interface PortalUser{id:string;name:string;email:string;role:"client_owner"|"client_staff"|"admin"|"account_manager";organizationId:string}
export interface Metric{id:string;label:string;value:string;change?:string;comparison?:string;trend:number[]}
export interface PulseItem{id:string;label:string;status:Status;explanation:string}
export interface AttentionItem{id:string;priority:"high"|"medium"|"low";title:string;explanation:string;action:string;href:string}
export interface JourneyStage{id:string;label:string;count:number;explanation:string}
export interface Activity{id:string;type:string;title:string;detail:string;time:string}
export interface Lead{id:string;name:string;email?:string;phone:string;source:"Website"|"Google"|"Google Ads"|"Meta"|"WhatsApp"|"Phone"|"Other";service:string;date:string;status:"New"|"Contacted"|"Qualified"|"Appointment"|"Won"|"Lost";assignedTo:string;lastActivity:string;timeline:{time:string;event:string}[]}
export interface Review{id:string;author:string;rating:number;date:string;excerpt:string;responded:boolean}
export interface Campaign{id:string;name:string;platform:"Google Ads"|"Meta Ads";status:"Active"|"Paused"|"Learning"|"Completed";spend:string;leads:number;cpl:string}
export interface Automation{id:string;name:string;status:"Active"|"Paused"|"Needs Attention";lastRun:string;runs:number;purpose:string;steps:string[]}
export interface Report{id:string;title:string;period:string;status:"Ready"|"Preparing";summary:string}
export interface ClientRequest{id:string;title:string;type:string;priority:"Normal"|"High";status:"Submitted"|"In Review"|"In Progress"|"Waiting for Client"|"Completed";updated:string}
export interface Integration{id:string;name:string;status:"Connected"|"Not Connected"|"Action Required";description:string}
export interface PortalServiceDelivery{id:string;name:string;status:string;health:"healthy"|"needs_attention"|"delayed";progress:number;completed:number;total:number;completedWork:string[];upcomingTasks:{id:string;title:string;dueAt:string|null}[];latestReport?:{id:string;title:string;period:string}}
export interface DashboardData{organization:Organization;user:PortalUser;metrics:Metric[];pulse:PulseItem[];attention:AttentionItem[];journey:JourneyStage[];activity:Activity[];serviceDelivery:PortalServiceDelivery[];leads:Lead[];reviews:Review[];campaigns:Campaign[];automations:Automation[];reports:Report[];requests:ClientRequest[];integrations:Integration[]}
