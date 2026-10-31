# AP — Mojibake from legacy HTML migration

Classification: ANTI-PATTERN · Severity: medium

**What happened.** Porting Windows-1252 legacy pages into UTF-8 Astro
components corrupted em-dashes/middots into `â€”` / `Â·` across multiple
sentinals pages (contact, coaches, competitive, about, tryouts).

**Why it happened.** Copy-paste without encoding normalization.

**Cost.** Visible character garbage on production pages; sweep-and-fix churn.

**Preferred pattern.** Normalize encodings at extraction time; run
utf8_mojibake_scan.py over src after any migration batch.

**Detection.** utf8_mojibake_scan.py — flags known corruption byte sequences.
