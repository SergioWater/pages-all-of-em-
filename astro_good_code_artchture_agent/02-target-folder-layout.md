# 02 — Target folder layout

Recreate this shape. Names may vary slightly; **roles must not**.

```
<project>/
├── package.json                 # engines node>=24; scripts: dev, build, preview, check
├── astro.config.mjs             # site: https://YOUR-PUBLIC-HOST ; integrations
├── tsconfig.json
├── public/
│   ├── robots.txt               # Allow crawl; Sitemap: https://YOUR-PUBLIC-HOST/sitemap-index.xml
│   ├── assets/                  # logos, static images
│   └── photos/                  # gallery (dir or junction to media store)
└── src/
    ├── consts.ts                # CONTACT/NAP, NAV_ITEMS, SITE_DESCRIPTION, hours
    ├── content.config.ts        # collections + Zod; optional CMS loaders
    ├── content/                 # local markdown collections
    │   ├── blog/
    │   ├── faq/
    │   ├── instructors/
    │   ├── pages/
    │   └── testimonials/
    ├── pages/                   # file-based routes ONLY
    │   ├── index.astro          # homepage: compose sections, no layout soup
    │   ├── schedule.astro
    │   ├── instructors/
    │   ├── blog/
    │   ├── photos/
    │   └── [...slug].astro      # optional catch-all for CMS pages
    ├── layouts/
    │   └── BaseLayout.astro     # html shell, CSS imports, head, nav, footer, slot
    ├── sections/                # homepage one-job blocks
    │   ├── Hero.astro
    │   ├── Programs.astro
    │   ├── Instructors.astro
    │   ├── FAQs.astro
    │   ├── FindUs.astro
    │   └── …
    ├── components/
    │   ├── BaseHead.astro       # title, description, canonical, OG
    │   ├── Nav.astro
    │   ├── Footer.astro
    │   ├── JsonLd.astro         # <script type="application/ld+json">
    │   └── *Island.tsx          # Solid (or chosen island framework) only
    ├── lib/
    │   ├── wp-url.ts            # or cms-url.ts — build-time API origin helper
    │   ├── schema.ts            # JSON-LD builders from consts + confirmed facts
    │   ├── content.ts           # collection helpers
    │   └── …
    ├── styles/
    │   ├── colors_and_type.css  # :root tokens — fonts, palette, type
    │   ├── global.css           # nav/footer/shared
    │   └── landing.css          # section layouts
    ├── scripts/                 # optional client bootstraps
    └── types/
```

## Homepage composition rule

`pages/index.astro` should look like:

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import Hero from "../sections/Hero.astro";
// …sections…
const schemas = await buildHomeSchemas();
---
<BaseLayout schemas={schemas}>
  <Hero />
  <!-- sections only -->
</BaseLayout>
```

Do **not** inline a full homepage layout in `index.astro`.

## Config sketch (`astro.config.mjs`)

```js
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import solid from "@astrojs/solid-js";

export default defineConfig({
  site: "https://YOUR-PUBLIC-HOST", // never staging IP
  integrations: [mdx(), sitemap(), solid()],
});
```

## Package manager

Prefer **pnpm** in monorepos. Pin Node via `engines`. Run package-scoped scripts.
