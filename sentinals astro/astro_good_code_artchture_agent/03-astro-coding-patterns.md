# 03 — Astro coding patterns

## Frontmatter vs template

```astro
---
// Build/request-time TypeScript
import BaseLayout from "../layouts/BaseLayout.astro";
const title = "Schedule";
---
<BaseLayout title={title}>
  <h1>Schedule</h1>
</BaseLayout>
```

- Frontmatter runs at build (static) or on the server (SSR if enabled). This site targets **static**.
- Template is HTML-like output. Prefer semantic tags: `main`, `section`, `nav`, `footer`, one `h1` per page.

## Component layers

| Layer | Responsibility | May import |
|---|---|---|
| `pages/` | Route + compose | layouts, sections, lib |
| `layouts/` | Chrome + head + global CSS | components, styles |
| `sections/` | One marketing block | components, consts, content helpers |
| `components/` | Reusable UI | consts, tiny helpers |
| `lib/` | Pure logic | node APIs, fetch, zod — **no CSS** |

## Titles (avoid doubling)

If `BaseHead` appends ` · Brand`, pages must pass **segment only**:

- ✅ `title="Schedule"` → `Schedule · Brand`
- ❌ `title="Schedule · Brand"` → `Schedule · Brand · Brand`

## Islands (Solid pattern)

Use a client framework **only** for interaction (accordion, lightbox, modal).

```astro
<!-- FAQs.astro -->
<FaqsIsland items={items} client:visible />
```

```astro
<!-- Gallery needing full Solid runtime -->
<GalleryIsland photos={photos} client:only="solid-js" />
```

Rules:

- Prefer `client:visible` / `client:idle` over always-on.
- Keep island props **serializable** (plain data).
- Do not turn the whole page into a client app.
- JSX/TSX here is **Solid (or React) syntax**, not “Astro itself.” Astro hosts the island.

## Content rendering

- Prefer markdown collections + Astro `<Content />` where possible.
- If rendering CMS HTML (`set:html`), treat it as a **trust boundary** — see `06`.
- Keep long copy in `src/content/**`, not buried in section frontmatter.

## Icons

Centralize icon helpers (e.g. `Icon.astro` + icon map). Do not paste one-off SVGs with conflicting styles across sections.

## Scripts

- Prefer bundled modules.
- `is:inline` third-party loaders are high scrutiny (chat widgets). Document why they exist.
- Do not add analytics/trackers without human approval.
