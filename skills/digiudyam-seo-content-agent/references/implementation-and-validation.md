# Next.js implementation and SEO validation

Read this reference before editing the DigiUdyam website.

## Pre-edit checks

Inspect repository instructions, git status, relevant routes, content registries, shared templates, SEO helpers, sitemap, robots, redirects, and tests. Preserve unrelated user changes.

Map the approved content source, affected routes and files, reusable components, metadata, canonical, schema, breadcrumbs, internal links, images, sitemap/robots/redirect impact, risks, and verification commands.

## Implementation rules

- Use the existing Next.js routing model and SEO utilities.
- Reuse design tokens, components, animation conventions, and responsive layouts.
- Keep one semantic H1 and a logical outline.
- Render approved content exactly, including punctuation, lists, and heading roles.
- Use Next.js `Link` for internal navigation and `Image` for appropriate raster images.
- Keep canonical and structured-data URLs consistent with the production-origin utility.
- Update route registries and static params when dynamic routes require them.
- Keep admin, portal, authentication, preview, and private routes out of public sitemaps and indexed results.
- Do not weaken middleware or authorization for crawlability.
- Do not change databases or unrelated product behavior for an SEO task.

## Redirects

Implement only after approval and inventory checks. Use explicit mappings and verify status, destination, chains, internal links, sitemap, canonical, breadcrumbs, and schema URLs.

## Validation

Validate in proportion to the change:

1. Available TypeScript and lint checks.
2. Production build.
3. Route availability and unexpected errors.
4. Rendered title, description, canonical, robots, and social metadata.
5. One intended H1 and logical headings.
6. JSON-LD parses and matches visible content.
7. Breadcrumbs and internal links resolve without redirect chains.
8. Sitemap contains intended canonical public URLs only.
9. Robots protect private routes without blocking public pages or required assets.
10. Images load responsively with dimensions, correct alt behavior, and appropriate LCP priority.
11. Desktop and mobile layout remain usable.
12. Public website, admin, portal, auth, and core functionality remain unaffected.

Use browser inspection when rendered behavior matters. If external validators are unavailable, state that limitation and validate syntax and output locally.

Report failures accurately and distinguish change-related, pre-existing, and environmental issues.
