---
id: ASTRO-META-001
title: Canonical identity comes from Astro.site pinned to the production host
domain: metadata
framework: astro
scope: framework
classification: ANTI-PATTERN  # violation class with twice-bitten history
severity: critical
confidence: high
requirement: >
  astro.config site = the public production domain. Canonicals, og:url and
  sitemap URLs derive from it via BaseHead/Astro.site — never from staging
  IPs or CMS origins. Content-fetch origins live in separate env-driven helpers.
rationale: >
  Live canonicals were poisoned by http://54.245.204.4 (kensei v1 default)
  and kensei.click entity split; fixed by wp-url.ts split + explicit site.
detection: checks/canonical_host_check.py compares config site vs dist canonical/og:url/sitemap hosts
automated_detection: yes
remediation_strategy: set site correctly; rebuild; re-audit dist (invisible)
safe_auto_remediation: yes
verification: canonical audit clean on all pages + sitemap host agreement
regression_risks: []
good_example: examples/base-head-seo/
bad_example: anti-patterns/AP-canonical-host-poisoning.md
related: [ASTRO-META-002, ASTRO-DEP-001]
introduced: 1.0.0
last_validated: 1.0.0
---

# ASTRO-META-001 — One domain to rule canonicals

The deploy config IS the canonical identity. Fix config, never hack pages.
