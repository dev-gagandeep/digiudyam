drop policy if exists "clients read organization tasks" on public.tasks;

create or replace function public.client_task_summaries(target_org uuid)
returns table (id uuid, title text, status text, due_at timestamptz, updated_at timestamptz)
language sql stable security definer set search_path = public
as $$
  select t.id, t.title, t.status, t.due_at, t.updated_at
  from public.tasks t
  where t.organization_id = target_org
    and exists (select 1 from public.organization_members m where m.organization_id = target_org and m.user_id = auth.uid() and m.status = 'active')
  order by t.updated_at desc limit 20;
$$;

revoke all on function public.client_task_summaries(uuid) from public;
grant execute on function public.client_task_summaries(uuid) to authenticated;
