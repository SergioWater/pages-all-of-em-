---
id: NEXTJS-HYD-003
title: suppressHydrationWarning banned without written justification
domain: hydration
framework: nextjs
scope: framework
classification: ANTI-PATTERN
severity: high
confidence: high
requirement: >
  suppressHydrationWarning requires an inline comment explaining exactly why
  it is necessary and safe at that node.
rationale: CODING_STANDARDS.md §2.4 — it masks real mismatch bugs.
detection: grep-based check candidate (not yet written)
automated_detection: partial
remediation_strategy: fix the underlying mismatch instead
safe_auto_remediation: no
verification: code review
regression_risks: [masked genuine hydration bugs]
introduced: 1.0.0
last_validated: 1.0.0
---
Silencing the warning hides the bug. Justify or fix.
