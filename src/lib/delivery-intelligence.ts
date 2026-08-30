export type ServiceHealth = "healthy" | "needs_attention" | "delayed";

type WorkItem = { status: string; due_at?: string | null; updated_at?: string | null };

export function isOpenStatus(status: string) {
  return !["completed", "cancelled"].includes(status);
}

export function isOverdue(item: WorkItem, now = new Date()) {
  return isOpenStatus(item.status) && Boolean(item.due_at) && new Date(item.due_at as string).getTime() < now.getTime();
}

export function completionProgress(items: WorkItem[]) {
  const relevant = items.filter((item) => item.status !== "cancelled");
  const completed = relevant.filter((item) => item.status === "completed").length;
  return { completed, total: relevant.length, percent: relevant.length ? Math.round((completed / relevant.length) * 100) : 0 };
}

export function serviceHealth(tasks: WorkItem[], openRequests: number, latestActivity?: string | null, now = new Date()): ServiceHealth {
  if (tasks.some((task) => isOverdue(task, now))) return "delayed";
  const stale = latestActivity ? now.getTime() - new Date(latestActivity).getTime() > 21 * 86400000 : false;
  if (openRequests > 0 || tasks.some((task) => task.status === "blocked") || stale) return "needs_attention";
  return "healthy";
}

export function nextAction(tasks: Array<WorkItem & { title: string }>, requests: Array<WorkItem & { title: string }>) {
  const task = tasks.filter((item) => isOpenStatus(item.status)).sort((a, b) => (a.due_at || "9999").localeCompare(b.due_at || "9999"))[0];
  if (task) return { label: task.title, dueAt: task.due_at || null, type: "task" as const };
  const request = requests.filter((item) => isOpenStatus(item.status)).sort((a, b) => (a.due_at || "9999").localeCompare(b.due_at || "9999"))[0];
  if (request) return { label: request.title, dueAt: request.due_at || null, type: "request" as const };
  return { label: "No action currently due", dueAt: null, type: "none" as const };
}
