---
id: NEXTJS-HYD-001
title: Never touch browser APIs at module top level
domain: hydration
framework: nextjs
scope: framework
classification: ANTI-PATTERN   # violation class; standard is the requirement below
severity: critical
confidence: high
requirement: >
  window/document/navigator/localStorage are never accessed during render or
  at module scope. Browser logic lives inside useEffect / event handlers.
rationale: CODING_STANDARDS.md §2.1–2.3 — top-level access crashes SSR.
detection: manual review + eslint-plugin-next; no dedicated detector yet
automated_detection: partial
remediation_strategy: move access into useEffect with false-default state
safe_auto_remediation: conditional
verification: production build + hydration console-clean on iPhone SE viewport
regression_risks: [flash of default state]
introduced: 1.0.0
last_validated: 1.0.0
---
Browser APIs at render time crash the server render. Default-false state +
useEffect is the house pattern.
