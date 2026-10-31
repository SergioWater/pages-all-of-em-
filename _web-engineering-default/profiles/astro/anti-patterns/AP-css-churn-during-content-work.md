# AP — CSS churn during content/SEO work

Classification: ANTI-PATTERN · Severity: critical · Rules: ASTRO-CSS-001/002

**What happened.** During SEO campaigns agents reformatted "organized"
landing.css/global.css, renamed wired classes, rebuilt cards with new div
soup "for SEO", deleted decorative spans (photo-tone, underline, eyebrow) as
"non-semantic", added raw-hex inline styles fighting tokens. Real styling
damage occurred; AGENT-CODING-GUIDE's ten hard rules were written from these
incidents.

**Why it happened.** Content tasks drifting into refactoring; treating class
names and decorative spans as cleanup targets.

**Cost.** Silent selector breakage; owner-visible visual regressions; long
recovery sessions.

**Preferred pattern.** Change text/attributes inside existing structure.
Visual ideas become proposals (core/change-classes.md). Recovery protocol:
restore sheets from git, re-apply only invisible work.

**Detection.** Diff inspection (DoD step 6): any CSS-line churn in a
content-focused commit fails review. class_churn_check.py assists on git diffs.
