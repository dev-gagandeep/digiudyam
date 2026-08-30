create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(), name text not null, business_name text not null,
  email text, phone text, website text, location text, industry text, lead_source text not null, notes text,
  status text not null default 'new_lead' check (status in ('new_lead','contacted','qualified','proposal_sent','negotiation','won','lost')),
  pipeline_value numeric(14,2) not null default 0 check (pipeline_value >= 0), follow_up_at timestamptz,
  sales_owner_id uuid references public.profiles(id) on delete set null,
  converted_organization_id uuid unique references public.organizations(id) on delete set null,
  archived_at timestamptz, created_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.lead_activities (
  id uuid primary key default gen_random_uuid(), lead_id uuid not null references public.leads(id) on delete cascade,
  actor_id uuid not null references public.profiles(id),
  activity_type text not null check (activity_type in ('call','email','note','status_change','follow_up')),
  summary text not null, metadata jsonb not null default '{}', occurred_at timestamptz not null default now(), created_at timestamptz not null default now()
);
create index if not exists idx_leads_status on public.leads(status) where archived_at is null;
create index if not exists idx_leads_owner_followup on public.leads(sales_owner_id, follow_up_at) where archived_at is null;
create index if not exists idx_leads_search on public.leads using gin (to_tsvector('simple', coalesce(name,'') || ' ' || coalesce(business_name,'') || ' ' || coalesce(email,'') || ' ' || coalesce(phone,'')));
create index if not exists idx_lead_activities_timeline on public.lead_activities(lead_id, occurred_at desc);
drop trigger if exists set_leads_updated_at on public.leads;
create trigger set_leads_updated_at before update on public.leads for each row execute function public.set_updated_at();
alter table public.leads enable row level security;
alter table public.lead_activities enable row level security;
create policy "crm staff manage leads" on public.leads for all to authenticated using (public.current_user_role() in ('super_admin','admin','account_manager')) with check (public.current_user_role() in ('super_admin','admin','account_manager'));
create policy "crm staff manage activities" on public.lead_activities for all to authenticated using (public.current_user_role() in ('super_admin','admin','account_manager')) with check (public.current_user_role() in ('super_admin','admin','account_manager'));
grant select, insert, update, delete on public.leads, public.lead_activities to authenticated;
