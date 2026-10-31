---
id: ASTRO-HYD-003
title: Trivial interactivity = colocated micro-script, not an island
domain: hydration
framework: astro
scope: framework
classification: PROVEN GOOD
severity: low
confidence: high
requirement: >
  Class toggles, accordions without state persistence, dismiss banners,
  close-nav-on-click: implement as a module `<script>` inside the .astro
  file, target ≤15 lines. First-party code must never use is:inline.
rationale: >
  Both reference sites do exactly this everywhere (nav checkbox reset,
  aria-expanded accordion, hero cross-fade, promo dismiss, click-to-load map).
detection: checks/hydration_census.py inventories script tags per component
automated_detection: partial
remediation_strategy: rewrite island as script when state is trivial
safe_auto_remediation: conditional
verification: manual interaction test
regression_risks: [event listener duplication on re-render]
good_example: examples/deferred-third-party/
bad_example: anti-patterns/AP-eager-hydration.md
related: [ASTRO-HYD-001]
introduced: 1.0.0
last_validated: 1.0.0
---

# ASTRO-HYD-003 — Micro-scripts over islands

Astro processes `<script>` in .astro files: bundled, deduped, hoisted modules.
That covers most "interactive" needs with zero framework JS. Reach for Solid
only when state outgrows a dozen lines.
