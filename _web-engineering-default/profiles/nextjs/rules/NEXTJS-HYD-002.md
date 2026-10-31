---
id: NEXTJS-HYD-002
title: Math.random()/Date.now() banned in render
domain: hydration
framework: nextjs
scope: framework
classification: ANTI-PATTERN
severity: high
confidence: high
requirement: >
  Non-deterministic values are generated inside useEffect or passed as props;
  never computed during render (server/client mismatch).
rationale: CODING_STANDARDS.md §2.2.
detection: manual review; grep for Math.random(/Date.now( in tsx render paths
automated_detection: partial
remediation_strategy: precompute at build or defer to effect
safe_auto_remediation: conditional
verification: build + visual parity
regression_risks: []
introduced: 1.0.0
last_validated: 1.0.0
---
Determinism between server and client renders is non-negotiable.
