# SEO Campaign Progress Log

Read this before starting work so you never repeat something already done.
Append to it after every action. Newest entries at the bottom.

Rules: `AGENTS.md` · Plan: `seo-brief.md`

## Status
- [x] Phase 1 — Audit our site (on-page + technical)
- [x] Phase 2 — Audit competitors
- [x] Phase 3 — Side-by-side gap analysis → `AGENTS.md` §3
- [x] Phase 4 — Prioritized plan → `seo-brief.md`
- [ ] Phase 5 — Implement fixes

## Blocked

- Google Business Profile access / verification status
- Canonical street address + ZIP + public hours (needed for LocalBusiness geo/address + contact NAP)
  - Candidate only (unverified): TaxExemptWorld lists `543 Via Sorrento, Morgan Hill, CA 95037` / EIN 47-4528587 — do not publish until owner confirms
- Rank + backlink baselines from keyword tool
- Rec / private-training pricing and championship year/age-group facts for remaining P1 copy
- E-E-A-T owner confirms: 2014 vs 2015 gallery labeling; coach degrees/last names; “15 years” claim

## Log

### 2026-08-11 — [Strategist] Phase 1–4 campaign setup
Ran `python compare.py` → `reports/compare-2026-08-11.md`. Audited all indexable HTML
(titles, metas, H1s, canonicals, schema, sitemap/robots, alts, internal links). Live-fetched
Audax home, tryouts, about-audax, recleague; OV Toros home. Wrote diagnosis into
`AGENTS.md` §3 and concrete P0/P1/P2 plan into `seo-brief.md`. No site files changed —
awaiting owner answers + approval on visible copy. Next: owner fills Blocked list; then
Frontend/Local SEO execute P0 invisible items; Copywriter drafts title/H1 for approval.

### 2026-08-11 — [Copywriter + Frontend] P0 on-page + schema (owner: go ahead)
Applied approved homepage title/meta/OG, H1 brand + Gilroy subline, hero body KW phrase,
and gold `.hero-h1-sub` style. Added coach `Person` JSON-LD on `coaches.html` from published
bios only. Synced FAQ + FAQPage tryout answers to 2026 closed / 2027 next; listed private
training in programs FAQ. Refreshed sitemap `lastmod` for home, coaches, faq. Updated
`AGENTS.md` §2 facts. Still blocked: GBP, street address/hours for LocalBusiness + contact NAP.

### 2026-08-11 — [Local SEO Specialist] entity / GBP / NAP audit
Wrote `reports/local-seo-2026-08-11.md`. GBP still blocked (no owner access). NAP phone/email
consistent on-site; street address missing. Third-party candidate address found on TaxExemptWorld
(`543 Via Sorrento…95037`, EIN 47-4528587) — **not published**; awaiting owner confirm. Delivered
LocalBusiness JSON-LD template with OWNER_CONFIRM placeholders, geo relevance gaps, and
policy-safe review ask-flow. Next: owner GBP + address/hours → Frontend can complete schema + contact NAP.

### 2026-08-11 — [E-E-A-T Validator] accuracy pass on shipped + trust pages
Wrote `reports/eeat-2026-08-11.md`. Verdicts: camps/competitive Pass (thin); home/FAQ/coaches/
about/gallery/contact Needs Work. Highest risks: championship claims without year/age group;
gallery “2014” vs Est. 2015; “every coach holds a college degree” vs Rick bio; unverified
“15 years” FAQ claim. Proposed safe softenings (not applied until owner OK). Owner question
list captured in report.

### 2026-08-11 — [E-E-A-T Validator + research] implement verified fixes
Armed `/loop 7m` research loop (PID 32892). Verified from Wayback club pages + NorCal Premier:
- Coach Rick = **Ricardo Guzman**; Cabrillo College / semi-pro; USSF Level F + NSCAA Level 4
  (source: archived `coach-rick/`; NorCal club contacts).
- Club founded **2015** with five teams; **2008 boys 2023 State Cup**; **2009 girls 2022 State Cup**;
  27 club-wide first-place trophies (source: archived `accomplishments/`).
- “2014” labels = **birth-year teams**, not calendar year (resolves Est. 2015 conflict).
- “15 years” attributed to **Coach Nolan** (club live-site copy), not combined staff.
Applied: coaches intro + Rick bio/Person schema; homepage championship subtitle; FAQ private/
tryout answers; private-training copy; gallery/about/index alts for birth-year + State Cup.
### 2026-08-11 — [E-E-A-T loop tick 1] Coach Alex identified
Web research: Audax coaches page lists **Alejandro Sanchez** (“Coach Alex”) with seven years at
Sentinels, OV + City of Gilroy rec, Christopher HS girls JV, USSF D/E/F, multiple State Cup titles.
Updated `coaches.html` bio + Person schema. Note: Audax also lists him as a **current** Audax
coach — confirm dual affiliation with owner. Coach Nolan last name still not found publicly
(false leads: Nolan Walsh / Nolan Ledwith). Loop continues every 7m.

### 2026-08-11 — [E-E-A-T loop tick 2] Nolan still unresolved
Re-searched web/social/trainer directories. No verifiable last name for Sentinels Coach Nolan.
Ruled out: Nolan Walsh (Vestavia/Chicago), Nolan Ledwith (MH lacrosse), Nolan B. CoachUp
(Murrieta / Cal South). No site edits this tick — will not invent. Next tick continues Nolan +
any other open E-E-A-T gaps.

### 2026-08-11 — [E-E-A-T] owner correction — Nolan Grieve + Alexandria
Owner confirmed: Coach Nolan last name **Grieve**, U.S. Soccer **C license**; Coach Alex is
**Alexandria** (not Alejandro Sanchez — that Audax bio was a wrong match). Updated coaches
cards + Person schema; removed Sanchez copy and dual-affiliation note.
