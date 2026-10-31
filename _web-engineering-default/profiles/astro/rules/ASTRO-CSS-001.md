---
id: ASTRO-CSS-001
title: Three-sheet doctrine — tokens, chrome, sections; no second design system
domain: styling
framework: astro
scope: framework
classification: PROVEN GOOD
severity: high
confidence: high
requirement: >
  All styling lives in colors_and_type.css (tokens), global.css (chrome),
  landing.css (sections) — imported in that order from BaseLayout. No
  Tailwind, Bootstrap, CSS modules, styled-components, new token files, or
  utility soup. Scoped <style> only where a page already has one.
rationale: >
  Identical architecture in both reference sites; violations caused real
  damage (documented in AGENT-CODING-GUIDE unsafe list).
detection: checks/assets_audit.py flags stylesheet imports outside the three sheets
automated_detection: partial
remediation_strategy: n/a — prevention rule
safe_auto_remediation: no
verification: diff inspection (core definition-of-done step 6)
regression_risks: []
good_example: examples/three-sheet-tokens/
bad_example: anti-patterns/AP-css-churn-during-content-work.md
related: [ASTRO-CSS-002]
introduced: 1.0.0
last_validated: 1.0.0
---

# ASTRO-CSS-001 — One design system, three sheets

Tokens first: every color/spacing/type decision resolves to a custom property
in colors_and_type.css. If you are writing a raw hex or px value in a section
rule, look for the token first.
