---
id: ASTRO-DEP-001
title: robots.txt points at sitemap-index.xml on the same production host
domain: deployment
framework: astro
scope: framework
classification: PROVEN GOOD
severity: medium
confidence: high
requirement: >
  public/robots.txt exists, allows default crawlers, and its Sitemap line
  uses the same production host as astro.config site. @astrojs/sitemap
  generates sitemap-index.xml. Non-public pages are noindexed AND excluded.
rationale: >
  Live robots/sitemap 404s were a critical finding in the kensei audit;
  convention proven across kensei, sentinals, hbk staging.
detection: checks/robots_sitemap_check.py validates presence + host agreement + dist files
automated_detection: yes
remediation_strategy: add robots.txt; verify dist output post-build (invisible)
safe_auto_remediation: yes
verification: robots-sitemap check clean on dist
regression_risks: []
good_example: examples/base-head-seo/
bad_example: anti-patterns/AP-canonical-host-poisoning.md
related: [ASTRO-META-001]
introduced: 1.0.0
last_validated: 1.0.0
---

# ASTRO-DEP-001 — Crawlability contract

robots and sitemap agree with canonical identity or search engines learn a
second, wrong version of your site.
