# Deployment & Conventions

Provenance: kensei netlify.toml; sentinals HANDOFF.md + MIGRATION-INVENTORY.md;
hbk cutover runbook; robots/sitemap conventions across all sites.

## Netlify (Astro)

```toml
[build]
  base = "frontends/astro-website-2"        # monorepo-aware
  command = "pnpm install && pnpm run build"
  publish = "dist"

[[headers]]
  for = "/_astro/*"     # hashed chunks — cache forever
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/assets/*"     # unhashed static — moderate TTL
  [headers.values]
    Cache-Control = "public, max-age=604800"
```

Convention: immutable caching keyed to content-hashed paths; ~7 days for
unhashed assets/photos.

## Measured perf lessons (git history, kensei)

- Moving JSON-LD out of `<head>` helped first paint (829087b). Keep schema
  blocks at end-of-body via BaseLayout render position.
- Inlining site CSS was tried and REVERTED: "grew the HTML without helping
  first paint" (7a4d2df → 744f74d). Do not re-attempt without new evidence.
- Image byte cuts + font/cache fixes shipped as their own commits (96b3178,
  d337857).

## Cutover runbook (platform replacement, e.g., Wix→static)

1. Stage the redesign with robots/canonicals/sitemap ALREADY pointing at the
   production domain — cutover then needs zero URL surgery (hbk pattern).
2. Non-public pages: `noindex` AND excluded from sitemap.
3. Document known production defects of the outgoing platform in facts.md
   (e.g., live sitemap HTTP 500) so post-cutover verification doesn't chase ghosts.
4. `.html → clean URL` redirects must exist on the receiving host before switch.

## Staging hygiene

Staging uploads carry obvious placeholder hosts with self-documenting trap
comments (`Sitemap: https://www.placeholder-tree-company.com/...`) or are
blocked from indexing entirely.

## Git conventions

Branch per work session off master/main (`seo/sergio`,
`seo/astro-onpage-p0-p1`, `copilot/update-yoga-page-hours`); master receives
reviewed merges only; commit subjects state the concern. Journal entry per
session links the branch.
