# DigiUdyam — Phase 1

Premium, responsive homepage and design foundation for DigiUdyam, a digital growth partner for Indian local businesses.

## Run locally

```bash
npm install
npm run dev
```

Production check: `npm run build`.

## Architecture

- `src/app` — App Router layout, homepage, global CSS, metadata, robots and sitemap
- `src/components` — header/mega menu, footer, interface visuals, service cards, animation wrappers and UI primitives
- `src/lib/site.ts` — shared company URL, email and contact configuration
- `public` — local brand/favicon assets

The Phase 1 navigation intentionally links future sections to homepage anchors or placeholders; no Phase 2 service pages, CMS, backend or client portal are included.

## Design system

The visual language uses deep navy (`#081D38`) and DigiUdyam blue (`#1455D9`) for trust and systems, orange (`#FF6B2C`) only for action and signal, warm paper (`#FBFAF7`) and cool supporting neutrals. Manrope is loaded through `next/font`. Cards use restrained borders, 20–28px radii and soft blue-grey shadows.

## Animation

GSAP + ScrollTrigger handles section reveals and the connected growth path. Page scrolling remains browser-native for predictable wheel, trackpad and touch behaviour. Motion defers to `prefers-reduced-motion`.

## SEO and accessibility

The root layout includes title templates, canonical metadata, Open Graph/Twitter data, Organization and WebSite JSON-LD, a generated sitemap and robots policy. The page uses semantic landmarks, a single H1, descriptive image alt text, a skip link, keyboard-operable menus, visible focus states and an Escape-key close pattern.

Update the placeholder WhatsApp number and business email in `src/lib/site.ts` before launch.

## Growth Hub (Phase 3)

The client portal lives under `/portal` with a separate authenticated layout and no marketing header/footer. Domain models are in `src/lib/portal/types.ts`; normalized development fixtures are isolated in `fixtures.ts`; `PortalDataProvider` and `GrowthDataAdapter` define the future integration boundary.

Demo authentication is intentionally not production authentication. It is enabled automatically during development, or explicitly with `PORTAL_DEMO_MODE=true`, and stores an HTTP-only demo cookie. Before production launch, replace `getPortalSession()` with a verified server-side authentication provider and database-backed membership lookup. Authorization must derive organization/business access from the session—not URL parameters or client-submitted organization IDs.

Future integrations prepared by the adapter contract include Google Analytics, Search Console, Google Business Profile, Google Ads, Meta, GoHighLevel, WhatsApp, call tracking and internal DigiUdyam systems. Credentials must remain server-side. Request submission, file upload, report storage/download, password reset, logout UI and notification delivery still require production services.

## DigiUdyam Admin (Phase 4)

The staff operations application lives under `/admin` and uses a separate session cookie, layout and centralized role/permission policy. Demo access is available in development or with `ADMIN_DEMO_MODE=true`. Production must replace the demo boundary with an approved identity provider, persistent users/roles and server-enforced client scopes.

Admin operational models and isolated fixtures are under `src/lib/admin`. No database existed in the project, so Phase 4 adds provider/repository contracts without inventing a migration. Before production, introduce a database with migrations for users, roles, clients, locations, assignments, client services, integration connections, requests, tasks, reports/blocks, internal notes, notifications and audit events.

Provider adapter foundations are under `src/lib/integrations`. Google, Meta, GoHighLevel and WhatsApp adapters expose capability/configuration boundaries and deliberately throw a not-configured error instead of making external calls. Implement OAuth callbacks, encrypted credential storage, background workers, retry policy and normalized persistence before enabling sync.

Security requirements for production mutations: schema validation, CSRF protection where applicable, rate limiting, verified staff permission and client scope checks, encrypted server-side tokens, atomic audit events and pagination. Internal notes must never be returned by the client portal provider. “Open Client Portal” is only a normal portal link in this phase; secure, time-limited, audited read-only impersonation remains future work.

## Supabase database and authentication

Official `@supabase/ssr` and `@supabase/supabase-js` clients now provide browser, authenticated server and server-only administrative boundaries. The code uses only `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` and `SUPABASE_SECRET_KEY`; the secret is imported exclusively through a `server-only` module.

SQL migrations and application instructions are documented in `supabase/README.md`. Migrations have not been applied automatically. When Supabase public configuration is present, portal/admin providers use database-backed repositories; when it is absent, isolated Phase 3/4 fixtures remain in explicit demo mode.
# digiudyam
