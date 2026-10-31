---
id: ASTRO-IMG-003
title: Descriptive alt text; never bare filenames
domain: images
framework: astro
scope: framework
classification: PROVEN GOOD
severity: medium
confidence: high
requirement: >
  Curated image sets get real descriptive sentences (subject, event, place).
  Programmatic sets may use contextual templates ("{program} class at
  {site}") but not bare filenames or "{folder} photo" as a final quality bar.
rationale: >
  sentinals gallery alts are model sentences; kensei's template/folder
  fallbacks were flagged in audits as the weak end of acceptable.
detection: checks/assets_audit.py flags empty/file-extension/placeholder alts
automated_detection: partial (heuristic)
remediation_strategy: write descriptions from image content or owner input
safe_auto_remediation: no   # requires human judgment of image content
verification: audit + accessibility spot check
regression_risks: []
good_example: examples/pre-sized-srcset/
related: [ASTRO-IMG-001]
introduced: 1.0.0
last_validated: 1.0.0
---

# ASTRO-IMG-003 — Alt text quality

Alt text is an accessibility and E-E-A-T surface. Reference sentence:
"Sentinels Soccer Club 2014 birth-year boys team, Half Moon Bay champions,
celebrating with medals."
