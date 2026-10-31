# AP — Eager hydration for trivial interactivity

Classification: ANTI-PATTERN · Severity: high · Rules: ASTRO-HYD-001..003

**What would have happened.** Hydrating whole sections for one button or
using client:load for below-fold widgets ships framework JS competing with
LCP. The workspace avoided this by census-verified discipline (5 client:*
directives total across 3 sites); preserved here so future agents don't
rediscover why.

**Preferred pattern.** Micro-script in component (<15 lines) for toggles;
client:visible for below-fold stateful widgets; client:only reserved for
DOM-scanning libs (gallery lightbox). Island budget ~5/site.

**Cost avoided.** Tens-to-hundreds of KB framework JS per page.

**Detection.** hydration_census.py fails on client:load/client:idle and
reports island counts per site.
