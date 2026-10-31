---
id: NEXTJS-IMG-001
title: next/image only; heroes fill+priority; everything else dimensioned
domain: images
framework: nextjs
scope: framework
classification: PROVEN GOOD
severity: medium
confidence: high
requirement: >
  Always <Image> from next/image (never raw <img>); hero images use fill +
  priority; all other images declare width/height or fill a positioned
  parent; remote hosts whitelisted in next.config; videos add playsInline.
rationale: CODING_STANDARDS.md §3 (CLS + hydration-mismatch prevention).
detection: grep for "<img" in app/components (candidate detector)
automated_detection: partial
remediation_strategy: swap to Image with explicit dims
safe_auto_remediation: conditional
verification: build + CLS baseline unchanged/improved
regression_risks: [layout changes when dims corrected]
related: [ASTRO-IMG-002]
introduced: 1.0.0
last_validated: 1.0.0
---
Same CLS doctrine as the Astro profile, expressed through next/image.
