---
id: ASTRO-META-002
title: Segment-only titles — BaseHead appends the brand suffix exactly once
domain: metadata
framework: astro
scope: framework
classification: PROVEN GOOD
severity: low
confidence: high
requirement: >
  Pages pass title="Schedule"; BaseHead composes `${title} · ${SITE_TITLE}`.
  Pages must never append the brand themselves. Homepage uses the keyword-led
  default from consts.
rationale: >
  Fixed the observed doubling bug ("Schedule · Kensei Judo · Kensei Judo")
  and keeps title patterns uniform for audits.
detection: checks/metadata_audit.py flags duplicated brand suffix in rendered titles
automated_detection: yes
remediation_strategy: strip suffix from page segment (invisible change)
safe_auto_remediation: yes
verification: metadata audit clean across all built pages
regression_risks: []
good_example: examples/base-head-seo/
bad_example: anti-patterns/AP-title-doubling.md
related: [ASTRO-META-001]
introduced: 1.0.0
last_validated: 1.0.0
---

# ASTRO-META-002 — One place composes titles

Single composition point means single-point audits and zero doubling.
