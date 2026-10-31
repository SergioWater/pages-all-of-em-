---
id: ASTRO-META-003
title: JSON-LD from confirmed facts only; OWNER_CONFIRM_* never ships
domain: metadata
framework: astro
scope: framework
classification: PROVEN GOOD
severity: critical
confidence: high
requirement: >
  Schema.org objects are built in lib/schema.ts from consts.ts confirmed
  facts. Fields lacking owner confirmation are omitted (documented omission
  doctrine) or gated behind OWNER_CONFIRM_* placeholders that MUST NOT reach
  built HTML. Visible FAQ copy and its FAQPage schema share one source.
rationale: >
  E-E-A-T methodology; real blocked claims ("Kodokan rank every instructor",
  "Est. 2024", "Affiliated USA Judo", coach misattribution).
detection: checks/jsonld_validate.py parses ld+json blocks and greps OWNER_CONFIRM leakage
automated_detection: partial (placeholder leakage yes; factual truth no)
remediation_strategy: omit field until confirmed; correct after owner input
safe_auto_remediation: conditional (omission is safe)
verification: jsonld audit clean + honesty review of new claims
regression_risks: [rich-result loss when omitting fields]
bad_example: anti-patterns/AP-invented-facts.md
related: [core/honesty-rules]
introduced: 1.0.0
last_validated: 1.0.0
---

# ASTRO-META-003 — Honest structured data

Schema is a legal/trust surface, not decoration. Omit > fabricate.
