# Content Collections & Metadata/Schema

## Collections (content-collections.md merged)

Provenance: kensei-2 `src/content.config.ts` (six collections), sentinals
(two).

- Local markdown via glob loader: `glob({ pattern: "**/*.md", base })`.
  Migration lesson: "Load posts from local markdown so the repo owns content."
- Remote CMS via REST loaders where content stays live (kensei: pages,
  testimonials), validated by zod schemas so bad API data fails loudly at
  build instead of silently corrupting pages.
- Custom filesystem loaders for special shapes (galleries).
- Query helpers isolated in `lib/content.ts`: sorting, preferred-order arrays,
  excerpt stripping, featured-image size picking. Pages never hand-roll
  collection queries.
- Render with `const { Content } = await render(post)` → `<Content />`.
- Trusted-HTML injection points must be conscious decisions and documented:
  `set:html={person.bio}` (owner-controlled content only).

## Metadata (metadata-schema.md merged)

- Canonical: `new URL(Astro.url.pathname, Astro.site)`; `site` pinned to the
  production host. Fix config, never per-page hacks.
- Titles: pages pass a segment; BaseHead appends ` · ${SITE_TITLE}` once.
  Homepage gets the keyword-led default ("Judo in San Jose · Kensei Judo").
- OG complete (og:type/url/title/description/image); Twitter
  `summary_large_image` when card images exist.
- JSON-LD as first-class system: page builds schema objects in
  `lib/schema.ts` (LocalBusiness/SportsOrganization dual types, FAQPage,
  Article) from `consts.ts` confirmed facts; visible FAQ copy and its schema
  share one source function. Deliberate omissions documented inline
  (geo/foundingDate/ratings until owner confirms).
- Sitemap: `@astrojs/sitemap`; robots.txt points to `sitemap-index.xml` on
  the same production host. RSS dropped in current generation.
