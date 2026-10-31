# AP — CSS background-image heroes

Classification: ANTI-PATTERN · Severity: medium · Rule: ASTRO-IMG-001

**What happened.** sentinals hero uses a CSS background-image; invisible to
lazy-loading, LCP attribution, and fetchpriority tooling.

**Why it happened.** Legacy CSS carried over.

**Cost.** LCP optimization blind spot; no native responsive/resolution
switching.

**Preferred pattern.** `<img>` (or `<picture>`) heroes with eager +
fetchpriority=high + explicit dimensions.

**Detection.** assets_audit.py flags background-image usage in section/hero
CSS contexts.
