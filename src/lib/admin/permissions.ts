export const permissions=["manage_leads","view_clients","edit_clients","manage_integrations","manage_reports","manage_requests","manage_team","manage_services","view_sensitive_data","admin_settings"] as const;
export type Permission=typeof permissions[number];
export type Role="super_admin"|"admin"|"account_manager"|"specialist"|"client_owner"|"client_staff";
const grants:Record<Role,readonly Permission[]>={super_admin:permissions,admin:["manage_leads","view_clients","edit_clients","manage_integrations","manage_reports","manage_requests","manage_team","manage_services","admin_settings"],account_manager:["manage_leads","view_clients","edit_clients","manage_reports","manage_requests","manage_services"],specialist:["view_clients","manage_reports","manage_services"],client_owner:[],client_staff:[]};
export function hasPermission(role:Role,permission:Permission){return grants[role].includes(permission)}
export function assertPermission(role:Role,permission:Permission){if(!hasPermission(role,permission))throw new Error("FORBIDDEN")}
export const roleLabels:Record<Role,string>={super_admin:"Super Admin",admin:"Admin",account_manager:"Account Manager",specialist:"Specialist",client_owner:"Client Owner",client_staff:"Client Staff"};
