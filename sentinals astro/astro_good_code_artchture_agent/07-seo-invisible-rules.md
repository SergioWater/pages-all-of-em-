# 07 — SEO invisible rules (architecture-compatible)

These changes **do not** redesign the site. Agents may implement them without visual approval unless they alter visible copy/layout.

## P0 technical identity

1. Set `site` to the real public HTTPS origin.
2. Ship `public/robots.txt` referencing the generated sitemap on that origin.
3. Keep `@astrojs/sitemap` (or equivalent) enabled.
4. Emit LocalBusiness + WebSite JSON-LD from confirmed NAP.
5. Emit FAQPage only for FAQs actually on the page.
6. Fix title doubling via segment titles + BaseHead brand suffix.
7. One `h1` per page; do not regress to multiple H1s for modals.

## On-page (still architecture-safe)

- Internal links: root-relative (`/#section`, `/instructors`) so they work off-home.
- Alt text: unique, descriptive; include context (city/role) without stuffing.
- Crawlable schedule text above any iframe.
- Meta description: accurate kids/adults/trial claims only if true.

## Proposal-only (need human yes)

- H1 rewrite
- Hero redesign / location badge overlays
- New program landing page layouts
- Map embed replacing intentional decorative graphics
- Any CSS token/visual system change

## Do not

- Stuff keywords into hidden CSS/`display:none` blocks
- Swap class names to “more semantic” and break CSS
- Point canonicals at CMS/staging
- Add review stars in schema without real review platform data

## Verify after SEO edits

```text
build OK
dist/robots.txt present
sitemap URLs use https://public-host/...
homepage has expected JSON-LD blocks
title tags not doubled
homepage visual unchanged
```
