---
id: ASTRO-HYD-002
title: Island budget — at most ~5 islands per site, each justified
domain: hydration
framework: astro
scope: framework
classification: PROVEN GOOD
severity: medium
confidence: high
requirement: >
  Every new island (client:* component) needs a one-sentence justification of
  why a colocated script cannot do the job. Sites stay within ~5 islands.
rationale: >
  kensei-2 ships 4 islands for an entire business site (gallery, FAQ,
  schedule, modal infra). Everything else is HTML/CSS + micro-scripts.
detection: checks/hydration_census.py reports island count and locations
automated_detection: yes
remediation_strategy: merge related widgets; move static parts back to .astro
safe_auto_remediation: no
verification: census count in journal entry
regression_risks: []
exceptions: complex app-like pages (galleries are the observed ceiling case)
good_example: examples/gallery-island/
related: [ASTRO-HYD-001, ASTRO-HYD-003]
introduced: 1.0.0
last_validated: 1.0.0
---

# ASTRO-HYD-002 — Island budget

Islands are for genuine client state: filters, lightboxes, fetched calendars.
A marketing/business site needs almost none. The census is the arbiter — if
your change raises the count, the justification belongs in the journal entry.
