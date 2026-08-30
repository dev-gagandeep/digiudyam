-- Client portal task visibility. No schema/table changes.
-- Clients may only read tasks belonging to an active organization membership.
create policy "clients read organization tasks"
on public.tasks
for select
to authenticated
using (public.has_organization_access(organization_id));
