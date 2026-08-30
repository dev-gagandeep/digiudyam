export type ProviderId="google"|"meta"|"gohighlevel"|"whatsapp";
export interface OAuthConfiguration{clientId:string;authorizationUrl:string;tokenUrl:string;redirectUri:string;scopes:string[]}
export interface SecureCredentialReference{id:string;provider:ProviderId;vaultKey:string;expiresAt?:Date}
export interface ProviderCapabilities{analytics:boolean;search:boolean;localPresence:boolean;ads:boolean;leads:boolean;appointments:boolean;conversations:boolean;automations:boolean}
export interface SyncContext{connectionId:string;clientId:string;locationId?:string;credential:SecureCredentialReference;cursor?:string}
export interface NormalizedSyncResult{records:number;cursor?:string;completedAt:Date;warnings:string[]}
export interface ProviderAdapter{id:ProviderId;capabilities:ProviderCapabilities;validateConfiguration():Promise<boolean>;getAuthorizationUrl?(state:string):Promise<string>;exchangeAuthorizationCode?(code:string):Promise<SecureCredentialReference>;sync(context:SyncContext):Promise<NormalizedSyncResult>}
export interface SyncJob{id:string;connectionId:string;type:"full"|"incremental";status:"queued"|"running"|"succeeded"|"failed";attempt:number;scheduledFor:Date;startedAt?:Date;completedAt?:Date;errorCode?:string}
export interface SyncScheduler{enqueue(connectionId:string,type:"full"|"incremental"):Promise<SyncJob>;retry(jobId:string):Promise<SyncJob>}
export class ProviderNotConfiguredError extends Error{constructor(provider:ProviderId){super(`${provider} credentials are not configured`)}}
// Implementations must resolve encrypted credentials inside server-only jobs.
// Never call provider syncs during React page rendering.
