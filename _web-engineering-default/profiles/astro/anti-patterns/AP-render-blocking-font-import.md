# AP — Render-blocking third-party font CSS

Classification: ANTI-PATTERN · Severity: high · Rule: ASTRO-FNT-001

**What happened.** sentinals inherited
`@import url('https://fonts.googleapis.com/css2?...')` inside
colors_and_type.css from its legacy port. CSS @import serializes requests:
stylesheet → font CSS → font files, all before first paint.

**Why it happened.** Direct port of legacy HTML head habits.

**Cost.** Delayed first paint on every page; flagged as debt, not yet fixed.

**Preferred pattern.** Fontsource imports in BaseLayout frontmatter;
external subsets only via non-blocking `media="print"` swap
(examples/base-head-seo).

**Detection.** assets_audit.py greps CSS + HTML for third-party font imports.
