-- Supabase Auth profile provisioning, membership helpers and RLS policies.

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, email, role)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name',''), new.email, 'client_staff')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

create or replace function public.current_user_role()
returns text language sql stable security definer set search_path = public as $$
  select role from public.profiles where id = auth.uid() and status = 'active';
$$;
create or replace function public.is_staff()
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce(public.current_user_role() in ('super_admin','admin','account_manager','specialist'), false);
$$;
create or replace function public.has_organization_access(target_org uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select public.is_staff() or exists (
    select 1 from public.organization_members m
    where m.organization_id = target_org and m.user_id = auth.uid() and m.status = 'active'
  );
$$;
create or replace function public.has_business_access(target_business uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.businesses b where b.id = target_business and public.has_organization_access(b.organization_id)
  );
$$;

revoke all on function public.current_user_role() from public;
revoke all on function public.is_staff() from public;
revoke all on function public.has_organization_access(uuid) from public;
revoke all on function public.has_business_access(uuid) from public;
grant execute on function public.current_user_role() to authenticated;
grant execute on function public.is_staff() to authenticated;
grant execute on function public.has_organization_access(uuid) to authenticated;
grant execute on function public.has_business_access(uuid) to authenticated;

alter table public.profiles enable row level security;
alter table public.organizations enable row level security;
alter table public.businesses enable row level security;
alter table public.locations enable row level security;
alter table public.organization_members enable row level security;
alter table public.services enable row level security;
alter table public.client_services enable row level security;
alter table public.team_assignments enable row level security;
alter table public.service_delivery_items enable row level security;
alter table public.onboarding_records enable row level security;
alter table public.onboarding_items enable row level security;
alter table public.requests enable row level security;
alter table public.tasks enable row level security;
alter table public.reports enable row level security;
alter table public.report_blocks enable row level security;
alter table public.notes enable row level security;
alter table public.notifications enable row level security;
alter table public.integrations enable row level security;
alter table public.integration_connections enable row level security;
alter table public.audit_logs enable row level security;

create policy "profiles read own or staff" on public.profiles for select to authenticated using (id = auth.uid() or public.is_staff());
create policy "profiles update own safe row" on public.profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());
create policy "organizations scoped read" on public.organizations for select to authenticated using (public.has_organization_access(id));
create policy "organizations staff write" on public.organizations for all to authenticated using (public.is_staff()) with check (public.is_staff());
create policy "businesses scoped read" on public.businesses for select to authenticated using (public.has_organization_access(organization_id));
create policy "businesses staff write" on public.businesses for all to authenticated using (public.is_staff()) with check (public.is_staff());
create policy "locations scoped read" on public.locations for select to authenticated using (public.has_business_access(business_id));
create policy "locations staff write" on public.locations for all to authenticated using (public.is_staff()) with check (public.is_staff());
create policy "members read same organization" on public.organization_members for select to authenticated using (user_id = auth.uid() or public.has_organization_access(organization_id));
create policy "members staff write" on public.organization_members for all to authenticated using (public.is_staff()) with check (public.is_staff());
create policy "services authenticated read" on public.services for select to authenticated using (active or public.is_staff());
create policy "services staff write" on public.services for all to authenticated using (public.is_staff()) with check (public.is_staff());
create policy "client services scoped read" on public.client_services for select to authenticated using (public.has_organization_access(organization_id));
create policy "client services staff write" on public.client_services for all to authenticated using (public.is_staff()) with check (public.is_staff());
create policy "team assignments staff only" on public.team_assignments for all to authenticated using (public.is_staff()) with check (public.is_staff());
create policy "delivery scoped read" on public.service_delivery_items for select to authenticated using (exists (select 1 from public.client_services cs where cs.id = client_service_id and public.has_organization_access(cs.organization_id)));
create policy "delivery staff write" on public.service_delivery_items for all to authenticated using (public.is_staff()) with check (public.is_staff());
create policy "onboarding staff only" on public.onboarding_records for all to authenticated using (public.is_staff()) with check (public.is_staff());
create policy "onboarding items staff only" on public.onboarding_items for all to authenticated using (public.is_staff()) with check (public.is_staff());

create policy "requests scoped read" on public.requests for select to authenticated using (public.has_organization_access(organization_id));
create policy "clients create requests" on public.requests for insert to authenticated with check (created_by = auth.uid() and public.has_organization_access(organization_id));
create policy "staff manage requests" on public.requests for all to authenticated using (public.is_staff()) with check (public.is_staff());

-- Tasks and internal notes are deliberately staff-only.
create policy "tasks staff only" on public.tasks for all to authenticated using (public.is_staff()) with check (public.is_staff());
create policy "notes staff only" on public.notes for all to authenticated using (public.is_staff()) with check (public.is_staff());

create policy "published reports scoped read" on public.reports for select to authenticated using (public.is_staff() or (status = 'published' and public.has_organization_access(organization_id)));
create policy "reports staff write" on public.reports for all to authenticated using (public.is_staff()) with check (public.is_staff());
create policy "published report blocks scoped read" on public.report_blocks for select to authenticated using (exists (select 1 from public.reports r where r.id = report_id and (public.is_staff() or (r.status = 'published' and public.has_organization_access(r.organization_id)))));
create policy "report blocks staff write" on public.report_blocks for all to authenticated using (public.is_staff()) with check (public.is_staff());

create policy "notifications own read" on public.notifications for select to authenticated using (user_id = auth.uid() or public.is_staff());
create policy "notifications own update" on public.notifications for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "notifications staff insert" on public.notifications for insert to authenticated with check (public.is_staff());
create policy "integrations authenticated read" on public.integrations for select to authenticated using (true);
create policy "integrations staff write" on public.integrations for all to authenticated using (public.is_staff()) with check (public.is_staff());

-- Client users receive safe integration metadata, but credential_reference and
-- detailed errors must additionally be omitted by the client data-access layer.
create policy "connections scoped read" on public.integration_connections for select to authenticated using (public.has_organization_access(organization_id));
create policy "connections staff write" on public.integration_connections for all to authenticated using (public.is_staff()) with check (public.is_staff());
create policy "audit logs staff read" on public.audit_logs for select to authenticated using (public.is_staff());
-- Audit inserts should normally use a trusted server function/service client.

grant usage on schema public to authenticated;
grant select, insert, update on public.requests to authenticated;
grant select on public.profiles, public.organizations, public.businesses, public.locations, public.organization_members, public.services, public.client_services, public.reports, public.report_blocks, public.notifications, public.integrations to authenticated;
grant select (id, organization_id, business_id, location_id, integration_id, account_identifier, scopes, status, sync_status, error_code, connected_at, last_sync_at, next_sync_at, created_at, updated_at) on public.integration_connections to authenticated;
grant update (read_at) on public.notifications to authenticated;
grant select, insert, update, delete on public.organizations, public.businesses, public.locations, public.organization_members, public.services, public.client_services, public.team_assignments, public.service_delivery_items, public.onboarding_records, public.onboarding_items, public.tasks, public.reports, public.report_blocks, public.notes to authenticated;
grant select on public.audit_logs to authenticated;
