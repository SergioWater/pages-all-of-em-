---
id: ASTRO-CSS-002
title: Never rename classes wired to the style sheets
domain: styling
framework: astro
scope: framework
classification: ANTI-PATTERN  # violation class with documented damage history
severity: critical
confidence: high
requirement: >
  Section and component class names referenced by the three sheets
  (hero-photo-section, instructor-grid, faqs, findus, container,
  section-head, photo-tone, underline, eyebrow, …) are load-bearing.
  Renaming, "simplifying", or deleting them breaks rendering silently.
rationale: >
  AGENT-CODING-GUIDE hard rules 2/3/6 exist because agents caused styling
  damage doing semantic cleanups during content work.
detection: checks/class_churn_check.py diffs class attributes on changed files (git)
automated_detection: partial
remediation_strategy: revert rename; if a rename is truly required it is a VISUAL change needing owner approval + full visual verification
safe_auto_remediation: no
verification: visual spot check protocol (definition-of-done)
regression_risks: [silent loss of all section styling]
bad_example: anti-patterns/AP-css-churn-during-content-work.md
related: [ASTRO-CSS-001]
introduced: 1.0.0
last_validated: 1.0.0
---

# ASTRO-CSS-002 — Class names are API

Treat `.hero-photo-section` like a function signature. "Non-semantic"
decorative spans carry the design; they are not cleanup targets.
