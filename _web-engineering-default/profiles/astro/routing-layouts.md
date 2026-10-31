# Layouts & Components

Provenance: `astro-website-2/src/layouts/BaseLayout.astro` (48 lines),
`BaseHead.astro`, `components/*`; sentinals equivalents.

## BaseLayout pattern

Thin wrapper, single default slot:

```astro
interface Props {
  title?: string;
  description?: string;
  image?: string;
  hideChrome?: boolean;      // kensei: bare pages (print/legal)
  schemas?: Record<string, unknown>[];   // JSON-LD array → <JsonLd/>
}
```

- Fonts imported in layout frontmatter (Fontsource CSS imports).
- The three style sheets imported in order after fonts.
- `{schemas.map((data) => <JsonLd data={data} />)}` at end of body.
- Third-party widgets load via a deferred script import (see examples).

## BaseHead owns the head

All metadata composition lives in BaseHead: title assembly
(`${title} · ${SITE_TITLE}` — segment-only from pages), description fallback,
canonical (`new URL(Astro.url.pathname, Astro.site)`), OG/Twitter tags,
deferred font subset links. Pages pass segments only. This killed the
title-doubling bug ("Schedule · Kensei Judo · Kensei Judo").

## Component conventions

- `PascalCase.astro`, typed `interface Props` on every component.
- Page fragments live in `sections/`; islands suffixed `*Island.tsx`.
- Data-driven rendering: local const arrays mapped to cards
  (`items.map(...)`), not copy-pasted markup.
- `Icon.astro` wraps Lucide SVGs behind a `name` prop — never paste raw SVG
  paths inline into sections.
- `JsonLd.astro`: `<script type="application/ld+json" set:html={JSON.stringify(data)} />`
  — schema blocks are data, not markup to hand-style.

## Anti-rules

- No named-slot sprawl; one default slot has sufficed across both sites.
- Do not move CSS imports out of BaseLayout/BaseHead (documented damage).
- Do not rebuild existing cards with new wrappers "for SEO" — edit text and
  attributes inside the established structure.
