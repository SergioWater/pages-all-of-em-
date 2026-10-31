# Astro Profile — how Water World builds Astro sites

Entry point for all Astro work. Derived from two real implementations:
`kensei/frontends/astro-website-2` (primary reference) and
`sentinals soccer club astro`, both built against the
`astro_good_code_artchture_agent` pack and verified in production.

## Mental model

Static-first. Pages become HTML at build; frontmatter runs at build time and
is never shipped to visitors. Interactivity is the exception: tiny colocated
scripts or a handful of Solid islands. `Markdown / CMS API → pages &
sections → HTML (+ few islands)`.

## Canonical layout

```
src/
├── layouts/BaseLayout.astro    # wraps everything; imports fonts + 3 CSS sheets
├── components/BaseHead.astro   # ALL head metadata lives here
├── components/*.astro          # shared UI (Nav, Footer, Icon, JsonLd)
├── sections/*.astro            # one homepage block per file (Hero, FAQs…)
├── pages/**/*.astro            # routes = files; composition only, no styling
├── content.config.ts           # collection schemas (zod) + loaders
├── consts.ts                   # SINGLE SOURCE: NAP, nav, site titles, contact
├── lib/*.ts                    # schema.ts, content.ts, gallery-loader…
└── styles/{colors_and_type,global,landing}.css   # the three sheets, in order
public/                         # copied as-is: robots.txt, images, fonts
```

## Assembly contract

pages = route + composition → BaseLayout wraps (fonts, CSS, BaseHead,
JSON-LD array, Nav, `<main>`, Footer) → sections do one job each →
components reusable → `.tsx` files are Solid islands (`*Island.tsx`).

## The five look-protection rules

1. Prefer text/data/head edits over CSS edits.
2. Never rename section classes — selectors break silently.
3. Never introduce a second design system.
4. Scoped `<style>` only where a page already uses one (CMS-content pages).
5. Inline `style=""` only matching the rare existing `var(--…)` pattern.

Visual/layout changes require owner approval (core/change-classes.md).

## Where to go next

Read only what your task needs (INDEX.json has IDs):
architecture · routing-layouts · islands-hydration · styling-three-sheets ·
images-fonts · content-metadata · forms-analytics · typescript-config ·
deployment-conventions

Checks: `python run-checks.py <project>` runs this profile's detectors.
