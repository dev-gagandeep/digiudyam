export type EmailMessage = { to: string | string[]; subject: string; html: string; text?: string; replyTo?: string };
export type EmailResult = { status: "sent"; id: string } | { status: "skipped"; reason: string } | { status: "failed"; error: string };
