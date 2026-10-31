## Architecture pack citation
Followed: `D:\001_websites\sentinals astro\astro_good_code_artchture_agent` (MASTER.md, README.md, 00–20, PACK-COVERAGE.md)

## What changed
- New Astro project at `sentinals soccer club astro/`
- Ported all marketing pages from legacy static HTML
- Three-sheet CSS, consts NAP/nav, Solid gallery island, honest JSON-LD

## Invisible vs visual
- Invisible: clean URLs (`/about` vs `about.html`), shared layout, sitemap via `@astrojs/sitemap`, BaseHead canonicals
- Proposed visual (awaiting approval): none applied beyond structure remake
- Applied visual: none — class names and CSS look preserved from legacy

## Hosts
- Public site (`astro.config` site): https://sentinelssoccerclub.com
- CMS/API (env): optional `WP_URL` via `src/lib/cms-url.ts` (unused for this static remake)

## Verify
- [x] `pnpm run build` OK
- [x] `dist/robots.txt` present
- [x] sitemap URLs on public host
- [x] canonicals on public host
- [ ] homepage spot-check desktop + mobile (human)
- [x] no new lead forms / no new third-party scripts (Font Awesome + Google Fonts + registration portal kept from legacy)

## Facts still needed from human
- Street address for NAP (legacy only had city/region)
- Confirm foundingDate / NorCal Premier affiliation remain accurate for schema
- Deploy target / cutover timing

## Out of scope / not done
- `.html` → clean URL redirects on the live host
- Node 24 local engine (build succeeded on Node 22 with engine warning)
- Pixel-perfect QA in browser
