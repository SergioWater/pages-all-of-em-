# AP — Title doubling

Classification: ANTI-PATTERN · Severity: low · Rule: ASTRO-META-002

**What happened.** Pages appended their own brand suffix while BaseHead also
appended one: "Schedule · Kensei Judo · Kensei Judo".

**Why it happened.** Two composition points.

**Cost.** Unprofessional SERP display; noisy audits.

**Preferred pattern.** Segment-only page titles; BaseHead is the single
composer. metadata_audit.py flags any rendered title containing the brand
twice.

**Detection.** metadata_audit.py over built pages.
