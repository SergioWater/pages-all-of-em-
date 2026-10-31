---
id: ASTRO-FNT-001
title: Self-hosted subset fonts; third-party font CSS must be non-blocking
domain: fonts
framework: astro
scope: framework
classification: ANTI-PATTERN  # violating pattern documented with damage
severity: high
confidence: high
requirement: >
  Fonts self-host via Fontsource latin subsets, weights pinned per design.
  Any third-party font stylesheet (e.g., CJK glyph subsets) loads deferred:
  media="print" onload swap + noscript fallback + preconnect. Banned:
  @import of Google Fonts inside CSS files.
rationale: >
  kensei-2 pattern is the standard. sentinals inherited a render-blocking
  @import chain from its legacy port — flagged as debt, never copy it.
detection: checks/assets_audit.py scans CSS+HTML for font imports/links
automated_detection: yes
remediation_strategy: replace with Fontsource import in BaseLayout frontmatter
safe_auto_remediation: conditional (visual parity check needed)
verification: network waterfall shows no render-blocking font CSS; visual spot check
regression_risks: [missing glyphs if subset wrong]
good_example: examples/base-head-seo/
bad_example: anti-patterns/AP-render-blocking-font-import.md
related: []
introduced: 1.0.0
last_validated: 1.0.0
---

# ASTRO-FNT-001 — Font loading discipline

Fontsource imports live in BaseLayout frontmatter. The only external font
request ever justified: exact-glyph `text=` subset URLs for scripts Fontsource
doesn't cover — loaded off the critical path.
