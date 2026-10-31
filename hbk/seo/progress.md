# SEO Campaign Progress Log

Read this before starting work so you never repeat something already done.
Append to it after every action. Newest entries at the bottom.

Rules: `AGENTS.md` · Plan: `seo-brief.md`

## Status
- [x] Phase 1 — Audit our site (on-page + technical)
- [x] Phase 2 — Audit competitors
- [x] Phase 3 — Side-by-side gap analysis → `AGENTS.md` §3
- [x] Phase 4 — Prioritized plan → `seo-brief.md`
- [ ] Phase 5 — Implement fixes *(awaiting owner approval; no visual changes applied)*

## Blocked

- Cutover: static redesign vs live Wix on `hbkfutsal.com`
- Owner NAP, prices, venues, tryout dates, GBP access
- Approval needed for P0 title/meta/H1 and homepage nav → dedicated pages

## Log

### 2026-08-09 — [Strategist] Phase 1–4 campaign setup complete

**Phase 1 — Our site**

Audited two live surfaces + local source:

| Surface | URL | Notes |
|---|---|---|
| Production (indexed) | https://www.hbkfutsal.com/ | Wix. Title `Home \| Hbk Futsal`. No H1. Meta mentions Futsal Club + San Jose. 3 JSON-LD blocks. `robots.txt` OK; **sitemap.xml HTTP 500**. |
| Redesign staging | https://lushessences.com/hbk/ | Matches local `hbk/` HTML. Stronger content. Canonicals → hbkfutsal.com. |
| Source | `hbk/*.html` | Titles/metas/canonicals on all public pages; alts generally good; **zero JSON-LD**; homepage nav uses `#` anchors — only hard-links `sponsors.html` + `portal.html` among siblings. |

Technical: local `robots.txt` + `sitemap.xml` already cover indexable pages and correctly omit `portal.html` (`noindex`). No new sitemap/robots create required in source. Production sitemap still broken on Wix.

**Phase 2 — Competitors (fetched live)**

| Competitor | Title | Notable wins vs us |
|---|---|---|
| Bay City Futsal | `Futsal & Soccer Training \| … SF \| Bay Area\| San Francisco` | Geo in title+meta; program pages; phone+email; WebSite JSON-LD; ranks for primary query |
| Diablo Valley Futsal | `Diablo Valley Futsal` | Since 1999; city list; registration dates; $10 pickup; US Futsal refs; email |
| BAASL WelcomeFutsal | `WelcomeFutsal — Bay Area Adult Soccer League` | “Bay Area” in title; full address; schedule; rules; multi H1s (messy but geo-clear) |
| Futsal by the Bay | `Futsal by the Bay \| Burlingame Soccer Club` | Exact address; fees; dates; tournament intent (adjacent SERP, strong local parent domain) |

SERP sample for `futsal club bay area`: Bay City, 925 Futsal, Diablos-type sites — HBK not visible in top results.

**Phase 3 — Diagnosis** written to `AGENTS.md` §3; corrected §2 facts (were describing the Lush client lobby).

**Phase 4 — Plan** written to `seo-brief.md` (keyword clusters, topical map, P0/P1/P2, measurement, blocked list).

**Not applied (per design rule / show-before-apply):** title, meta, H1, nav, JSON-LD, copy deepen. Awaiting owner decisions listed in brief.
