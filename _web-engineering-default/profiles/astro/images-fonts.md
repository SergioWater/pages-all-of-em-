# Images & Fonts

Provenance: kensei-2 Hero/HeroFramed/blog/gallery-loader, sentinals gallery +
Hero; font imports in both BaseLayouts.

## Images — current standard

| Concern | Standard | Evidence |
|---|---|---|
| Loading default | `loading="lazy" decoding="async"` on every non-hero img | virtually all sections |
| Heroes | first slide `loading="eager"` + `fetchpriority="high"`; subsequent slides lazy | Hero.astro, blog hero |
| Dimensions | explicit width/height (CLS) — logos, featured images, srcset imgs | Footer logo 150×47 etc. |
| Srcset | hand-written `400w/800w/1200w` + `sizes` for CMS-shaped images | blog/[slug].astro |
| Galleries | pre-sized `thumbnails/` (800px) + `web/` (1800px) pairs matched by filename | gallery-loader.ts |
| Alt text | descriptive sentences for curated sets; template+context fallbacks elsewhere; never bare filenames | sentinals gallery.ts vs kensei folder fallbacks |

Open question (NEEDS VALIDATION): neither site uses `astro:assets`
(`<Image>/<Picture>`). The manual pre-sized pipeline works and keeps builds
fast; migrating to astro:assets would add automatic AVIF/WebP. Do not
convert opportunistically — treat as a measured experiment with before/after
payload baselines.

## Anti-patterns

- CSS `background-image` heroes: invisible to LCP/lazy tooling (sentinals
  Hero). Prefer `<img>` for content heroes. See AP-bg-image-hero.
- Remote placeholder images in consts (v1 Unsplash links).
- Filename-based alt text (`${folder} photo`) — acceptable only as last
  resort; curated sets deserve real descriptions.

## Fonts

- Self-host via Fontsource, latin subsets only, weights pinned per design
  (`inter latin-400/500/600/700`, display serif 600/700, mono 400/500).
- CJK exception: Google Fonts `text=` subset URL containing exactly the
  glyphs used, loaded non-blocking (`media="print"` onload swap + noscript)
  with preconnect. See examples/base-head-seo.
- BANNED: `@import url('https://fonts.googleapis.com/...')` inside CSS —
  render-blocking chain (sentinals debt). Detector: assets_audit flags it.
