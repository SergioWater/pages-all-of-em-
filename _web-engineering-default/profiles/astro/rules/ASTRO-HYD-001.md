---
id: ASTRO-HYD-001
title: Never use client:load or client:idle
domain: hydration
framework: astro
scope: framework
classification: PROVEN GOOD   # the standard; violating it is the anti-pattern
severity: high
confidence: high
requirement: >
  Interactive widgets hydrate with client:visible (below-the-fold stateful)
  or client:only="solid-js" (DOM-scanning libraries). client:load and
  client:idle are banned without a written justification reviewed by the owner.
rationale: >
  Census of all Water World Astro sites found 5 client:* directives total,
  none eager. Eager hydration ships JS that competes with LCP for zero UX gain.
detection: checks/hydration_census.py --fail-on client:load,client:idle
automated_detection: yes
remediation_strategy: >
  Downgrade to client:visible when content is below the fold; extract a
  smaller island boundary if genuine above-fold state exists.
safe_auto_remediation: conditional
verification: >
  Production build + hydration census diff + manual interaction test of the
  affected widget at desktop and mobile widths.
regression_risks: [interactivity timing, island FOUC]
exceptions: project state exceptions.json (e.g., required booking widget)
good_example: examples/gallery-island/
bad_example: anti-patterns/AP-eager-hydration.md
related: [ASTRO-HYD-002, ASTRO-HYD-003, PERF-JS-001]
introduced: 1.0.0
last_validated: 1.0.0
---

# ASTRO-HYD-001 — Never use client:load or client:idle

The entire workspace runs on `client:visible` + `client:only` only. Eager
hydration has never been needed. If you believe your widget requires it,
re-read profiles/astro/islands-hydration.md and reduce the island boundary
first; escalate to an exception only after that fails.
