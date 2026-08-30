import { CheckCircle, ClipboardText } from "@phosphor-icons/react/dist/ssr";
import { AdminHeading } from "@/components/admin/AdminUI";
import { adminDataProvider } from "@/lib/admin/provider";
import { requireAdmin } from "@/lib/admin/auth";
import { createTaskAction, updateTaskAction } from "../../actions";
import "./tasks-workflow.css";

export const metadata = { title: "Tasks" };
const statuses = [{ value: "pending", label: "Pending" }, { value: "in_progress", label: "In Progress" }, { value: "review", label: "Review" }, { value: "completed", label: "Completed" }];

export default async function TasksPage() {
  await requireAdmin("manage_requests");
  const data = await adminDataProvider.getDashboard("tasks");
  return <div className="admin-page task-workflow">
    <AdminHeading label="OPERATIONS / TASKS" title="Delivery task workflow." copy="Assign accountable owners, track review and keep completion visible."/>
    <details className="task-create"><summary className="admin-primary">+ New task</summary><form action={createTaskAction}><label>Client<select name="organization_id" required>{data.clients.map((client) => <option key={client.id} value={client.id}>{client.name}</option>)}</select></label><label>Task title<input name="title" required/></label><label>Assignee<select name="assignee_id"><option value="">Assign to me</option>{data.users.filter((user) => user.status === "Active").map((user) => <option key={user.id} value={user.id}>{user.name}</option>)}</select></label><label>Due date<input name="due_at" type="date"/></label><label>Category<input name="category" defaultValue="Client Support"/></label><label>Priority<select name="priority"><option value="normal">Normal</option><option value="high">High</option><option value="low">Low</option></select></label><button className="admin-primary">Create task</button></form></details>
    {data.tasks.length ? <div className="task-columns">{statuses.map((column) => {const tasks=data.tasks.filter((task)=>task.status===column.label);return <section key={column.value}><header><span>{column.label}</span><b>{tasks.length}</b></header>{tasks.length ? tasks.map((task) => <details key={task.id}><summary><span>{task.category} / {task.priority}</span><h2>{task.title}</h2><p>{data.clients.find((client) => client.id === task.clientId)?.name || "Internal"}</p><footer><b>{data.users.find((user) => user.id === task.assigneeId)?.name || "Unassigned"}</b><time>{task.dueDate || "No due date"}</time></footer></summary><form action={updateTaskAction}><input type="hidden" name="id" value={task.id}/><label>Status<select name="status" defaultValue={column.value}>{statuses.map((status) => <option key={status.value} value={status.value}>{status.label}</option>)}</select></label><label>Assignee<select name="assignee_id" defaultValue={task.assigneeId}><option value="">Unassigned</option>{data.users.filter((user) => user.status === "Active").map((user) => <option key={user.id} value={user.id}>{user.name}</option>)}</select></label><label>Due date<input name="due_at" type="date" defaultValue={task.dueDate.slice(0,10)}/></label><label>Internal notes<textarea name="notes" rows={4} defaultValue={task.notes || ""}/></label><button>Save task</button></form></details>) : <div className="task-column-empty"><CheckCircle/><b>No {column.label.toLowerCase()} tasks</b><span>Tasks moved here will appear in this stage.</span></div>}</section>})}</div> : <section className="admin-rich-empty"><ClipboardText/><h2>No tasks yet</h2><p>Create the first delivery task and assign it to a team member.</p></section>}
  </div>;
}
