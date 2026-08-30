-- DigiUdyam core identity, client configuration and operations schema.
-- This migration is additive. Review in a staging Supabase project before production.

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  email text,
  avatar_url text,
  role text not null default 'client_staff' check (role in ('super_admin','admin','account_manager','specialist','client_owner','client_staff')),
  status text not null default 'active' check (status in ('active','invited','disabled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  status text not null default 'active' check (status in ('lead','onboarding','active','paused','archived')),
  health text not null default 'healthy' check (health in ('healthy','needs_attention','critical')),
  health_reasons text[] not null default '{}',
  primary_contact_name text,
  primary_contact_email text,
  account_manager_id uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.businesses (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  industry text,
  website text,
  status text not null default 'active' check (status in ('setup','active','paused','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, name)
);

create table if not exists public.locations (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  name text not null,
  address jsonb not null default '{}'::jsonb,
  phone text,
  website text,
  google_business_identifier text,
  crm_location_identifier text,
  service_area text,
  timezone text not null default 'Asia/Kolkata',
  status text not null default 'setup' check (status in ('setup','active','paused','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.organization_members (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role text not null check (role in ('client_owner','client_staff','account_manager','specialist')),
  status text not null default 'active' check (status in ('active','invited','suspended')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, user_id)
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  category text not null check (category in ('build','get_found','get_customers','automate_grow')),
  description text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.client_services (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  business_id uuid references public.businesses(id) on delete cascade,
  service_id uuid not null references public.services(id) on delete restrict,
  owner_id uuid references public.profiles(id) on delete set null,
  status text not null default 'setup' check (status in ('setup','active','paused','completed')),
  plan text,
  notes text,
  reporting_enabled boolean not null default true,
  start_date date,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, business_id, service_id)
);

create table if not exists public.team_assignments (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  responsibility text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, user_id, responsibility)
);

create table if not exists public.service_delivery_items (
  id uuid primary key default gen_random_uuid(),
  client_service_id uuid not null references public.client_services(id) on delete cascade,
  label text not null,
  status text not null default 'scheduled' check (status in ('completed','in_progress','scheduled','active','upcoming')),
  position integer not null default 0,
  due_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (client_service_id, label)
);

create table if not exists public.onboarding_records (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  owner_id uuid references public.profiles(id) on delete set null,
  status text not null default 'in_progress' check (status in ('not_started','in_progress','blocked','completed')),
  started_at date,
  target_date date,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id)
);

create table if not exists public.onboarding_items (
  id uuid primary key default gen_random_uuid(),
  onboarding_id uuid not null references public.onboarding_records(id) on delete cascade,
  label text not null,
  position integer not null default 0,
  status text not null default 'not_started' check (status in ('not_started','waiting_on_client','in_progress','completed','not_applicable')),
  notes text,
  updated_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (onboarding_id, label)
);

create table if not exists public.requests (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  business_id uuid references public.businesses(id) on delete cascade,
  location_id uuid references public.locations(id) on delete set null,
  created_by uuid not null references public.profiles(id) on delete restrict,
  assigned_to uuid references public.profiles(id) on delete set null,
  request_type text not null,
  title text not null check (char_length(title) between 3 and 180),
  description text not null check (char_length(description) between 3 and 10000),
  priority text not null default 'normal' check (priority in ('low','normal','high','urgent')),
  status text not null default 'submitted' check (status in ('submitted','assigned','in_progress','waiting_on_client','completed','cancelled')),
  due_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  business_id uuid references public.businesses(id) on delete cascade,
  location_id uuid references public.locations(id) on delete set null,
  request_id uuid references public.requests(id) on delete set null,
  client_service_id uuid references public.client_services(id) on delete set null,
  assignee_id uuid references public.profiles(id) on delete set null,
  title text not null check (char_length(title) between 3 and 240),
  description text,
  category text not null check (category in ('seo','website','ads','reputation','automation','crm','content','technical','client_support')),
  priority text not null default 'normal' check (priority in ('low','normal','high','urgent')),
  status text not null default 'todo' check (status in ('todo','in_progress','blocked','completed','cancelled')),
  due_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  business_id uuid references public.businesses(id) on delete cascade,
  owner_id uuid references public.profiles(id) on delete set null,
  title text not null,
  period_type text not null check (period_type in ('monthly','quarterly','custom')),
  period_start date not null,
  period_end date not null check (period_end >= period_start),
  status text not null default 'draft' check (status in ('draft','in_review','published')),
  executive_summary text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.report_blocks (
  id uuid primary key default gen_random_uuid(),
  report_id uuid not null references public.reports(id) on delete cascade,
  block_type text not null check (block_type in ('metric','trend','text','completed_work','recommendations','screenshot','traffic','keyword_table','lead_funnel','review_summary')),
  title text not null,
  position integer not null check (position >= 0),
  content jsonb not null default '{}'::jsonb,
  data_source text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (report_id, position)
);

create table if not exists public.notes (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete restrict,
  content text not null check (char_length(content) between 1 and 10000),
  related_type text check (related_type in ('service','request','report','integration','task')),
  related_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  organization_id uuid references public.organizations(id) on delete cascade,
  notification_type text not null,
  title text not null,
  body text,
  severity text not null default 'info' check (severity in ('info','warning','critical')),
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.integrations (
  id uuid primary key default gen_random_uuid(),
  provider text not null unique check (provider in ('google_analytics','search_console','google_business_profile','google_ads','meta','gohighlevel','whatsapp','call_tracking','website','other')),
  display_name text not null,
  capabilities text[] not null default '{}',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.integration_connections (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  business_id uuid references public.businesses(id) on delete cascade,
  location_id uuid references public.locations(id) on delete cascade,
  integration_id uuid not null references public.integrations(id) on delete restrict,
  account_identifier text,
  credential_reference text,
  scopes text[] not null default '{}',
  status text not null default 'not_configured' check (status in ('connected','disconnected','expired','action_required','pending','not_configured')),
  sync_status text not null default 'idle' check (sync_status in ('idle','queued','syncing','succeeded','failed')),
  error_code text,
  error_message text,
  connected_at timestamptz,
  last_sync_at timestamptz,
  next_sync_at timestamptz,
  sync_cursor text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique nulls not distinct (organization_id, business_id, location_id, integration_id)
);

create table if not exists public.audit_logs (
  id bigint generated always as identity primary key,
  actor_id uuid references public.profiles(id) on delete set null,
  organization_id uuid references public.organizations(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id text not null,
  metadata jsonb not null default '{}'::jsonb,
  ip_hash text,
  created_at timestamptz not null default now()
);

create index if not exists idx_businesses_organization on public.businesses(organization_id);
create index if not exists idx_locations_business on public.locations(business_id);
create index if not exists idx_members_user on public.organization_members(user_id, status);
create index if not exists idx_members_organization on public.organization_members(organization_id, status);
create index if not exists idx_client_services_org on public.client_services(organization_id, status);
create index if not exists idx_assignments_org on public.team_assignments(organization_id, user_id);
create index if not exists idx_delivery_service on public.service_delivery_items(client_service_id, position);
create index if not exists idx_onboarding_status on public.onboarding_records(status, target_date);
create index if not exists idx_onboarding_items_record on public.onboarding_items(onboarding_id, position);
create index if not exists idx_requests_org_status on public.requests(organization_id, status, created_at desc);
create index if not exists idx_tasks_org_assignee on public.tasks(organization_id, assignee_id, status, due_at);
create index if not exists idx_reports_org_status on public.reports(organization_id, status, period_end desc);
create index if not exists idx_notes_org_created on public.notes(organization_id, created_at desc);
create index if not exists idx_notifications_user_unread on public.notifications(user_id, created_at desc) where read_at is null;
create index if not exists idx_connections_org_status on public.integration_connections(organization_id, status);
create index if not exists idx_audit_org_created on public.audit_logs(organization_id, created_at desc);

do $$ declare t text; begin
  foreach t in array array['profiles','organizations','businesses','locations','organization_members','services','client_services','team_assignments','service_delivery_items','onboarding_records','onboarding_items','requests','tasks','reports','report_blocks','notes','integrations','integration_connections'] loop
    execute format('drop trigger if exists set_%I_updated_at on public.%I', t, t);
    execute format('create trigger set_%I_updated_at before update on public.%I for each row execute function public.set_updated_at()', t, t);
  end loop;
end $$;
