---
id: ASTRO-CNT-001
title: Content collections validated by zod schemas — fail loudly at build
domain: content
framework: astro
scope: framework
classification: PROVEN GOOD
severity: medium
confidence: high
requirement: >
  Every content collection declares a zod schema in src/content.config.ts.
  Remote CMS loaders validate payloads so bad data breaks the build instead
  of silently corrupting pages. Query helpers live in lib/content.ts; pages
  never hand-roll collection queries.
rationale: >
  kensei-2 runs six collections (local md glob + WP REST + custom filesystem)
  through zod; migration comment records why local markdown was chosen:
  "so the repo owns content".
detection: manual review; collection schema presence checkable via file scan
automated_detection: partial
remediation_strategy: add schema; coerce dates explicitly (z.coerce.date for YAML timestamps)
safe_auto_remediation: no
verification: build fails loudly when fixture bad-data test is injected
regression_risks: [over-strict schema rejecting valid CMS updates]
related: [ASTRO-META-003]
introduced: 1.0.0
last_validated: 1.0.0
---

# ASTRO-CNT-001 — Schemas as build-time gatekeepers

Bad content should be impossible to ship by accident.
