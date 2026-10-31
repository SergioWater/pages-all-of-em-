# Module — Performance

Owns measurable-speed engineering rules. Evidence sources: Lighthouse
(module lighthouse), dist bundle inventories, git-history measurements.
Does not own Lighthouse execution or SEO crawlability.

## Rules

| ID | Requirement | Evidence |
|---|---|---|
| PERF-JS-001 | Zero-JS by default; islands per ASTRO-HYD-002; third-party widgets gesture/idle-deferred (examples/deferred-third-party) | chat.ts pattern; census: 5 directives / 3 sites |
| PERF-CSS-001 | Do not inline site CSS into HTML — measured regression ("grew the HTML without helping first paint", kensei 7a4d2df→744f74d). Rely on hashed-path immutable caching instead | git history |
| PERF-HEAD-001 | JSON-LD renders at end-of-body, not in head (measured first-paint win, commit 829087b) | git history |
| PERF-IMG-001 | Image payload discipline per ASTRO-IMG-001..003; track payload in baselines | audit reports |

## Budgets (establish via first baselines; adjust with data)

Initial working budgets for local-business scale sites: total JS ≤ 90 KB
gzipped shipped to first load; hero image ≤ 250 KB; font files ≤ 120 KB.
These are PLACEHOLDER numbers until the first Lighthouse + bundle baselines
exist — mark every budget claim NEEDS VALIDATION until then.

## Checks

Bundle inventory lives in modules/lighthouse scripts after baseline tooling
lands; today `run-checks.py` covers hydration census + asset attributes.
