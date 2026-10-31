# Module — SEO

Migrated from `_seo-default` (the proven SEO campaign kit). Boundary: this
module owns search-engine-facing requirements and campaign methodology.
Content honesty lives in `core/honesty-rules.md`; technical performance in
`modules/performance`; crawlability config rules (robots/sitemap/canonical)
are shared with the Astro profile (ASTRO-META-001, ASTRO-DEP-001) — this
module does not duplicate them.

## Contents

- `roles/` — the eight campaign role cards, migrated verbatim
  (strategist, link-builder, data-analyst, uxui-designer, copywriter,
  xml-frontend-specialist, local-seo-specialist, eeat-validator).
  Methodology pieces already generalized into core: baseline-first discipline
  (→ definition-of-done), design-freeze rule (→ core/change-classes.md),
  claim triage (→ core/honesty-rules.md). The cards remain the domain-depth
  reference for SEO campaigns.
- `scripts/compare.py` — stdlib source-level me-vs-competitors comparison →
  writes `reports/compare-YYYY-MM-DD.md`. See KNOWN-LIMITATIONS.md before
  trusting raw output.
- `checks/nap_consistency.py` — phone variance audit over built HTML.

## Known limitations of automated tooling

See scripts/KNOWN-LIMITATIONS.md. In short: raw extraction is baseline-only;
always produce a `-deepened` companion with live fetches; ignore rows from
CMS theme folders and email-template builds.

## Rules contributed to system

SEO-NAP-001 (byte-identical NAP), plus the owner-fact gates enforced by
jsonld_validate (OWNER_CONFIRM leakage = critical).
