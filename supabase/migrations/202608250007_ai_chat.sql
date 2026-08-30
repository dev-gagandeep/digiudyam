create table if not exists public.chat_sessions (
  id uuid primary key default gen_random_uuid(),
  access_token_hash text not null unique,
  lead_id uuid references public.leads(id) on delete set null,
  status text not null default 'active' check (status in ('active','qualified','closed')),
  visitor_metadata jsonb not null default '{}',
  last_message_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.chat_sessions(id) on delete cascade,
  role text not null check (role in ('user','assistant','system')),
  content text not null check (char_length(content) between 1 and 5000),
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);
create index if not exists idx_chat_sessions_recent on public.chat_sessions(last_message_at desc);
create index if not exists idx_chat_messages_session on public.chat_messages(session_id,created_at);
drop trigger if exists set_chat_sessions_updated_at on public.chat_sessions;
create trigger set_chat_sessions_updated_at before update on public.chat_sessions for each row execute function public.set_updated_at();
alter table public.chat_sessions enable row level security;
alter table public.chat_messages enable row level security;
-- Deliberately no anon/authenticated policies. Public chat access is mediated by
-- /api/chat, an opaque token hash and the trusted server client.
revoke all on public.chat_sessions,public.chat_messages from anon,authenticated;
grant select on public.chat_sessions,public.chat_messages to service_role;
grant insert,update on public.chat_sessions to service_role;
grant insert on public.chat_messages to service_role;
