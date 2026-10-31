---
id: ASTRO-IMG-001
title: Lazy by default; eager + fetchpriority only for the LCP hero
domain: images
framework: astro
scope: framework
classification: PROVEN GOOD
severity: medium
confidence: high
requirement: >
  Every non-hero <img> gets loading="lazy" decoding="async". Only the first
  hero slide / LCP image gets loading="eager" and fetchpriority="high".
rationale: >
  Universal practice across both reference sites; heroes explicitly marked
  (Hero.astro, blog/[slug].astro).
detection: checks/assets_audit.py classifies imgs and flags eager non-heroes
automated_detection: yes
remediation_strategy: add attributes to existing imgs (invisible change)
safe_auto_remediation: yes
verification: assets audit clean + visual spot check + LCP baseline delta
regression_risks: [above-fold flash if hero misclassified]
good_example: examples/pre-sized-srcset/
bad_example: anti-patterns/AP-bg-image-hero.md
related: [ASTRO-IMG-002]
introduced: 1.0.0
last_validated: 1.0.0
---

# ASTRO-IMG-001 — Loading discipline

One eager image per page view path. Everything else waits its turn.
