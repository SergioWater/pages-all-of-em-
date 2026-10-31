---
id: ASTRO-IMG-002
title: Explicit width/height on images to prevent layout shift
domain: images
framework: astro
scope: framework
classification: PROVEN GOOD
severity: medium
confidence: high
requirement: >
  <img> elements declare width and height (or fill a sized parent for
  fluid media) so the browser reserves space before load.
rationale: >
  CLS prevention; applied to logos (150×47), featured images, srcset sets.
detection: checks/assets_audit.py flags dimensionless imgs
automated_detection: yes
remediation_strategy: measure intrinsic size and add attributes (invisible)
safe_auto_remediation: yes
verification: audit clean + CLS component of baseline unchanged/improved
regression_risks: [wrong aspect ratio if dimensions mis-measured]
good_example: examples/pre-sized-srcset/
related: [ASTRO-IMG-001]
introduced: 1.0.0
last_validated: 1.0.0
---

# ASTRO-IMG-002 — Dimensions required

Layout shift is a silent quality killer. Reserve the box.
