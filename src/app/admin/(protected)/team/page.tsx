import { UserPlus, UsersThree } from "@phosphor-icons/react/dist/ssr";
import { AdminHeading } from "@/components/admin/AdminUI";
import { getTeamManagementData } from "@/lib/admin/team-service";
import { assignClientTeamAction, inviteStaffAction, updateStaffAction } from "../../actions";
import "./team-management.css";

export const metadata = { title: "Team Management" };
const staffRoles = [{ value: "admin", label: "Admin" }, { value: "account_manager", label: "Account Manager" }, { value: "specialist", label: "Specialist" }];

export default async function TeamPage() {
  const data = await getTeamManagementData();
  const managers = data.profiles.filter((profile) => profile.status === "active" && ["super_admin", "admin", "account_manager"].includes(profile.role));
  const specialists = data.profiles.filter((profile) => profile.status === "active" && profile.role === "specialist");
  return <div className="admin-page team-management">
    <AdminHeading label="TEAM / MANAGEMENT" title="People, ownership and delivery." copy="Invite staff, control access and assign clear responsibility across every client."/>
    <details className="team-invite"><summary className="admin-primary"><UserPlus/> Invite team member</summary><form action={inviteStaffAction}><label>Full name<input name="name" required/></label><label>Work email<input name="email" type="email" required/></label><label>Role<select name="role">{staffRoles.map((role) => <option key={role.value} value={role.value}>{role.label}</option>)}</select></label><button className="admin-primary">Send secure invitation</button></form></details>

    {data.profiles.length ? <section className="team-members"><header><span>STAFF DIRECTORY</span><b>{data.profiles.length} MEMBERS</b></header>{data.profiles.map((member) => {
      const assignedOrganizations = data.assignments.filter((assignment) => assignment.user_id === member.id).map((assignment) => data.organizations.find((organization) => organization.id === assignment.organization_id)?.name).filter(Boolean);
      const ownedServices = data.clientServices.filter((service) => service.owner_id === member.id).map((service) => data.services.find((item) => item.id === service.service_id)?.name).filter(Boolean);
      return <article key={member.id}><div className="team-avatar">{member.full_name.split(" ").map((part) => part[0]).join("").slice(0,2)}</div><div className="team-identity"><h2>{member.full_name}</h2><p>{member.email}</p><span className={`member-${member.status}`}>{member.status}</span></div><div><small>ASSIGNED CLIENTS</small><p>{assignedOrganizations.join(", ") || "No clients assigned"}</p></div><div><small>ASSIGNED SERVICES</small><p>{ownedServices.join(", ") || "No services assigned"}</p></div><form action={updateStaffAction}><input type="hidden" name="user_id" value={member.id}/><input type="hidden" name="status" value={member.status}/><select name="role" defaultValue={member.role}>{member.role === "super_admin" && <option value="super_admin">Super Admin</option>}{staffRoles.map((role) => <option key={role.value} value={role.value}>{role.label}</option>)}</select><button>{member.status === "active" ? "Deactivate" : "Activate"}</button></form></article>;
    })}</section> : <section className="admin-rich-empty"><UsersThree/><h2>No staff members</h2><p>Invite your first team member to start assigning client ownership.</p></section>}

    <section className="client-assignment"><header><span>CLIENT ASSIGNMENT WORKFLOW</span><p>Organization → Account Manager → Specialists → Services</p></header>{data.organizations.map((organization) => {
      const organizationServices = data.clientServices.filter((service) => service.organization_id === organization.id);
      const selectedSpecialists = data.assignments.filter((assignment) => assignment.organization_id === organization.id && assignment.responsibility === "Specialist").map((assignment) => assignment.user_id);
      return <details key={organization.id}><summary><div><b>{organization.name}</b><span>{organizationServices.length} services · {selectedSpecialists.length} specialists</span></div><strong>{organization.status}</strong></summary><form action={assignClientTeamAction}><input type="hidden" name="organization_id" value={organization.id}/><label>Account Manager<select name="account_manager_id" defaultValue={organization.account_manager_id || ""}><option value="">Unassigned</option>{managers.map((manager) => <option key={manager.id} value={manager.id}>{manager.full_name}</option>)}</select></label><fieldset><legend>Specialists</legend>{specialists.length ? specialists.map((specialist) => <label key={specialist.id}><input type="checkbox" name="specialist_ids" value={specialist.id} defaultChecked={selectedSpecialists.includes(specialist.id)}/><span>{specialist.full_name}</span></label>) : <p>No active specialists available.</p>}</fieldset><div className="service-owner-grid"><span>SERVICE OWNERSHIP</span>{organizationServices.map((clientService) => <label key={clientService.id}>{data.services.find((service) => service.id === clientService.service_id)?.name || "Service"}<select name={`service_owner_${clientService.id}`} defaultValue={clientService.owner_id || ""}><option value="">Unassigned</option>{[...managers, ...specialists].map((member) => <option key={member.id} value={member.id}>{member.full_name}</option>)}</select></label>)}</div><button className="admin-primary">Save assignments</button></form></details>;
    })}</section>
  </div>;
}
