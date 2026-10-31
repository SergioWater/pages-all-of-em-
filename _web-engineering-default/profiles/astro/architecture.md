# Architecture & Routing

Provenance: kensei v2 + sentinals structure; ASTRO-ARCHITECTURE.md §1–§2.

## File-based routing

Routes are files under `src/pages/`. `index.astro` → `/`;
`blog/[slug].astro` → `/blog/<slug>`; `[...slug].astro` catch-all for
CMS-driven pages. Route count is a baseline metric (see core baselines).

## Layer responsibilities

| Layer | Contains | Must not contain |
|---|---|---|
| pages | route params, getCollection calls, section composition | styles beyond an existing scoped block, business logic |
| layouts | html shell, fonts, CSS imports, BaseHead, Nav/Footer, JsonLd render, single default slot | page-specific markup |
| sections | one homepage block per file, local data arrays | routing, cross-section imports |
| components | shared reusable UI, typed Props | page copy |
| lib | pure helpers (schema builders, content queries, loaders) | DOM/markup |

## Data flow

Frontmatter (build-time) fetches/composes data → props flow down into
templates. Visitors never download frontmatter code. Islands receive fully
serialized props from frontmatter — never import site modules client-side.

## Environment split (critical)

- `astro.config.* → site` = PUBLIC canonical identity (canonicals, OG urls,
  sitemap host). Pin to the production domain.
- CMS/fetch origins live in their own helper (`lib/wp-url.ts`,
  `PUBLIC_*_URL` env) and are build-time only.
- Lesson (twice-bitten): reusing a staging IP or CMS origin as `site`
  poisoned live canonicals. See anti-patterns/AP-canonical-host-poisoning.md.

## Monorepo awareness

kensei builds inside `frontends/astro-website-2` under a repo root with
shared packages and Terraform backends. Netlify config sets
`base = "frontends/astro-website-2"`; commands run with the workspace package
manager. Discovery handles subdirectory roots automatically.
