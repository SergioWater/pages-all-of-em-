# 18 — Routing & navigation

## File → URL map

| File | URL |
|---|---|
| `src/pages/index.astro` | `/` |
| `src/pages/schedule.astro` | `/schedule` |
| `src/pages/instructors/index.astro` | `/instructors` |
| `src/pages/blog/index.astro` | `/blog` |
| `src/pages/blog/[slug].astro` | `/blog/:slug` |
| `src/pages/photos/index.astro` | `/photos` |
| `src/pages/photos/[slug].astro` | `/photos/:slug` |
| `src/pages/[...slug].astro` | catch-all CMS/markdown pages |
| `src/pages/privacy-policy.astro` | `/privacy-policy` |
| `src/pages/terms.astro` | `/terms` |

Dynamic routes must export `getStaticPaths()` for static builds.

## Nav rules

1. Put link lists in `consts.ts` (`NAV_ITEMS`, `FOOTER_LINKS`) — components only render.
2. Prefer **root-relative** hrefs:
   - Home sections: `/#programs`, `/#trial`, `/#visit`
   - Real pages: `/instructors`, `/schedule`, `/blog`
3. Logo → `/`
4. Primary CTA → trial/contact path the human approved (often `/#trial` or chat widget only)
5. Footer should expose crawlable landings (instructors, schedule, photos, blog, about), not only social icons

## Hash links

`#programs` works only on the current page. From `/blog`, use `/#programs` or the user never reaches the section.

## Catch-all caution

`[...slug].astro` can swallow unknown paths. Ensure:

- Known static routes are real files (they win over catch-all)
- 404 behavior is intentional (Astro static may not soft-404 unless configured)
- Do not let `/json/version` style probe paths invent empty CMS pages without a proper 404

## Sitemap inclusion

Only indexable marketing URLs belong in the sitemap. Exclude thank-you, preview, or private paths if you add them later (`filter` on `@astrojs/sitemap` if needed).
