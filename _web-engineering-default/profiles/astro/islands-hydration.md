# Islands & Hydration

Provenance: exhaustive census of all three Astro codebases (2026-08 audit).

## Census result (the standard)

5 `client:*` directives total across 3 sites. Zero `client:load`. Zero
`client:idle`. Only two patterns ever needed:

| Directive | When | Real usage |
|---|---|---|
| `client:visible` | stateful widget below the fold | FaqsIsland (accordion), ScheduleIsland (calendar fetch + filters) |
| `client:only="solid-js"` | component that scans/mutates DOM at mount (lightbox libs) | GalleryIsland ×2 |

## Rules

1. Default is NO hydration. HTML+CSS first; ask what state actually requires JS.
2. If interactivity is trivial (toggle class, open details, swap icon), write a
   colocated module `<script>` inside the .astro file — target ≤15 lines.
   Both sites do this everywhere else (nav close-on-click, accordion
   aria-expanded, hero cross-fade, promo-banner dismiss, click-to-load map).
3. Islands are for real client state (filters, lightboxes, fetched calendars).
   Budget: ≤ ~4–5 islands per site; each new island requires one-sentence
   justification of why script-in-component cannot do it.
4. Never `is:inline` for first-party code — it bypasses bundling/dedup.
   Legit uses observed: third-party embed tags, JSON-LD.
5. Islands get serialized props from frontmatter. No site-module imports
   inside island code.
6. Deferred third-party widgets load on first gesture or idle timeout
   (`chat.ts`: pointer/key gesture or 12 s idle). Click-to-load iframes gated
   to desktop viewports (FindUs map ≥961px).

## Detector

`checks/hydration_census.py` inventories directives + scripts and fails on
banned ones. See rules ASTRO-HYD-001..003.
