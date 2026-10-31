# Changelog

## 1.0.0 — 2026-08-22
Initial release of the Web Engineering System, derived from code mining of
kensei (astro-website-2), sentinals soccer club astro, legacy kensei v1,
the `_seo-default` campaign kit, `astro_good_code_artchture_agent` pack,
`CODING_STANDARDS.md`, all saved audit reports, and git history evidence.

- core/: workflow, change classes, honesty rules, journal grammar,
  definition-of-done, learning loop (template + curator + 2 promoted lessons),
  discovery script, JSON schemas (finding/scorecard/baseline/lesson)
- profiles/astro/: PROFILE + 9 domain docs, 13 rules with frontmatter,
  8 golden examples, 8 anti-pattern post-mortems
- modules/: seo (8 roles migrated verbatim + compare.py + limitations doc),
  performance, lighthouse, accessibility, security, deployment
- checks: 15 executable detectors (stdlib only), validated against kensei-2
  (found real committed API key, heading/NAP issues) and sentinals (font
  @import debt, mojibake on documented files) with zero false positives
- adapters/, migrations/, tests/selftest.py (green)
