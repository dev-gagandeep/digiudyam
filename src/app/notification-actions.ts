"use server";
import { revalidatePath } from "next/cache";
import { markAllMyNotificationsRead,markMyNotificationRead } from "@/lib/notifications/service";
export async function markNotificationRead(form:FormData){await markMyNotificationRead(String(form.get("id")||""));revalidatePath("/admin/notifications");revalidatePath("/portal/notifications");}
export async function markAllNotificationsRead(){await markAllMyNotificationsRead();revalidatePath("/admin/notifications");revalidatePath("/portal/notifications");}
