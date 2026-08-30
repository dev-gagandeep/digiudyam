# DigiUdyam Supabase schema

These migrations are intentionally committed but **not applied automatically**.

## Migration order

1. `migrations/202608250001_core_schema.sql`
   - Creates identity-linked profiles, organizations, businesses, locations and memberships.
   - Creates service subscriptions, team assignments, delivery tracking and onboarding.
   - Creates requests, tasks, reports/blocks, staff notes and notifications.
   - Creates safe integration metadata/connections and append-oriented audit logs.
   - Adds foreign keys, constraints, timestamps, indexes and `updated_at` triggers.

2. `migrations/202608250002_auth_and_rls.sql`
   - Creates the `auth.users` → `profiles` provisioning trigger.
   - Adds membership and staff-role authorization helpers.
   - Enables RLS on every application table.
   - Adds organization/business isolation policies.
   - Keeps tasks, onboarding, assignments, notes and audit logs staff-only.
   - Exposes only published reports to client members.
   - Restricts integration connection column access so credential references remain server-only.

`seed.dev.sql` is an empty, clearly labeled development seed file. It intentionally adds no fake production data.

## How to apply

First link the Supabase CLI to the intended non-production project and review the diff:

```bash
supabase link --project-ref YOUR_PROJECT_REF
supabase db diff
supabase db push --dry-run
```

After reviewing the output, apply both migrations in filename order:

```bash
supabase db push
```

Alternatively, paste each migration into the Supabase SQL editor in the same order. Test in staging before production. Do not run `db reset` against an existing production database.

After applying, generate authoritative types from the linked project and compare them with `src/lib/supabase/database.types.ts`:

```bash
supabase gen types typescript --linked > src/lib/supabase/database.types.generated.ts
```

## First staff user

New Auth users default to `client_staff`. Promote the first verified staff user through a trusted SQL/admin operation only:

```sql
update public.profiles
set role = 'super_admin'
where id = 'VERIFIED_AUTH_USER_UUID';
```

Never accept a requested role from sign-up metadata. Add organization memberships explicitly after verifying the user and client relationship.
