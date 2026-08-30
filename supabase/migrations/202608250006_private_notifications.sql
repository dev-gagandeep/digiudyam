-- Notification inboxes are private to the addressed user. Staff may create
-- notifications through trusted workflows, but cannot read another inbox.
drop policy if exists "notifications own read" on public.notifications;
create policy "notifications own read"
on public.notifications for select
to authenticated
using (user_id = auth.uid());
