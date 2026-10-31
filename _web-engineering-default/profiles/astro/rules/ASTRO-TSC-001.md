---
id: ASTRO-TSC-001
title: Strict TypeScript with astro check in the verification chain
domain: tooling
framework: astro
scope: framework
classification: PROVEN GOOD
severity: low
confidence: high
requirement: >
  tsconfig extends astro/tsconfigs/strict. package.json has a typecheck script
  running astro check; it is part of Definition of Done before any commit lands.
rationale: >
  Both reference sites run strict + astro check; kensei adds eslint/prettier.
detection: checks/build_gate.py verifies typecheck command presence/success when runnable
automated_detection: partial
remediation_strategy: enable strict; fix type errors incrementally
safe_auto_remediation: no
verification: typecheck exits 0 in journal Verify line
regression_risks: [type errors surfacing late without check]
related: [core/definition-of-done]
introduced: 1.0.0
last_validated: 1.0.0
---

# ASTRO-TSC-001 — Strict by default

Strictness is free correctness. Never downgrade to silence an error.
