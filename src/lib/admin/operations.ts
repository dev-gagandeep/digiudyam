import "server-only";import type { AuditEvent,AdminNotification,InternalNote } from "./types";
export interface AuditLogWriter{write(event:Omit<AuditEvent,"id"|"timestamp">):Promise<void>}
export interface InternalNoteRepository{list(clientId:string):Promise<InternalNote[]>;create(note:Omit<InternalNote,"id"|"timestamp">):Promise<InternalNote>}
export interface NotificationRepository{list(userId:string):Promise<AdminNotification[]>;markRead(id:string,userId:string):Promise<void>}
export interface AdminSearchService{search(query:string,scope:{actorId:string;role:string},cursor?:string):Promise<{items:{type:string;id:string;label:string}[];nextCursor?:string}>}
// Production implementations must validate inputs, scope every query by staff
// authorization, rate-limit mutation endpoints and write audit events atomically.
