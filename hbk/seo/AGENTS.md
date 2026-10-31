# hbk — SEO Campaign Rules

Read this file before doing anything. It governs every session that works on this campaign.

---

## 1. The goal

Grow hbk's organic visibility for **futsal club in bay area** and its related terms,
and outrank the competitors listed in §2. The Strategist's audit (Phase 1–3) refines this
into specific targets — record them in `seo-brief.md` once known.

## 2. The facts

**Us — hbk**
- Production URL (what Google indexes today): https://www.hbkfutsal.com/ — **Wix**
  - Title tag: `Home | Hbk Futsal`
  - Meta description: `Futsal Club, Pro Indoor Soccer, HBKFutsal. Based in San Jose, California EST.2024`
  - H1: **none** (welcome line is an H5)
  - Canonical: `https://www.hbkfutsal.com/`
  - Schema: 3 JSON-LD blocks present (Wix-generated)
  - `robots.txt` exists and references sitemap; **`sitemap.xml` returns HTTP 500**
- Redesign / campaign source (this repo → `hbk/`): staged at https://lushessences.com/hbk/
  - Platform: Static HTML/CSS/JS
  - Homepage title: `HBK Futsal — The Official Home of HBK Futsal`
  - Homepage meta: `HBK Futsal — Humble Ballers Klub. NFPL men's and women's futsal club based in San Jose, California.`
  - Homepage H1: `HBK Futsal`
  - Canonicals already point at `https://www.hbkfutsal.com/` (correct for cutover)
  - Local `robots.txt` + `sitemap.xml` exist and cover indexable pages; `portal.html` is correctly `noindex` and excluded
- NAP (name / address / phone): phone on site `669-350-3341`; street address / hours **unknown — ask owner**
- Social: Instagram `@hbkfutbol` (on site); other profiles **ask owner**
- Site source: `../hbk/` (parent of this `seo` folder contains the Lush lobby; club site is `../hbk/`)

**Competitors**

- https://baasl.org/welcomefutsal
- https://diablovalleyfutsal.com/
- https://www.baycityfutsalclub.com/
- https://www.burlingamesoccerclub.org/futsalbythebay

Fetch each competitor's actual page before claiming anything about them. Never rely on
memory or assumption for competitor facts.

**Backlink metrics** — fill in from a keyword/backlink tool when available:

| Metric            | Us  | Competitor |
| ----------------- | --- | ---------- |
| Domain Authority  | ?   | ?          |
| Spam Score        | ?   | ?          |
| Link Propensity   | ?   | ?          |
| Referring Domains | ?   | ?          |
| Total Backlinks   | ?   | ?          |

## 3. The diagnosis — filled in by the Strategist after the audit

**1. Dual-site / indexation split is the #1 blocker.** Google currently ranks the
thin Wix site at `hbkfutsal.com` (no H1, generic title `Home | Hbk Futsal`, broken
sitemap 500). The stronger redesign in `hbk/` lives on `lushessences.com/hbk/` with
canonicals already pointing at production — so the SEO work only compounds after
cutover (or Wix is patched in place). Until one live URL owns the content, on-page
wins on the redesign do not move rankings.

**2. Primary keyword mismatch.** Target is `futsal club in bay area`. Bay City wins
that SERP with geo stuffed into title + meta (`SF | Bay Area | San Francisco`).
Diablo Valley and BAASL also say “Bay Area” in title/body with concrete city lists
and addresses. Our redesign leans on brand + San Jose + NFPL and almost never says
“Bay Area” (schedule venue + one OG line). Searchers looking for a club do not see
our page as a match for that query.

**3. Transactional intent gap.** Competitors publish what local searchers need to
act: registration deadlines, prices, gym addresses, age groups, schedules (Diablo,
BAASL, Burlingame, Bay City programs). Live Wix still has bookable prices; the
redesign’s Programs/Book pages are thin (no prices, venues, ages, or tryout dates).
We win on elite proof (NFPL champs narrative, Nationals, named signings, deep
rosters) but lose the “join / train near me” intent that drives the primary query.

**4. Our real advantages (once live on the right domain).** Deeper E-E-A-T than most
listed rivals: dual NFPL squads, named staff with roles, international signing
(Edgar Rivas), Nationals coverage, clean static markup, image alts mostly solid,
dedicated pages already in sitemap. Competitors outrank us today mainly via
**domain authority + geo-aligned titles + actionable local content + unbroken
crawl**, not better design.

**Theory of why they outrank us:** For `futsal club in bay area`, Google rewards
pages that (a) match the geo phrase, (b) look like a place you can join this season,
and (c) sit on established local domains. Bay City does (a)+(b); Diablo/BAASL/
Burlingame do (b) with addresses and dates; we do neither clearly on the indexed
Wix URL, and the redesign that could compete is not the indexed homepage yet.

## 4. Design rule — propose, discuss, apply only with approval

This campaign WANTS design and UX ideas — but the owner decides what gets applied.

- Any team member may (and should) surface visual/UX ideas: what to change, why, and
  the expected impact. Present ideas clearly and discuss them with the owner.
- **Never APPLY a visual change until the owner explicitly approves it.** Until then it
  stays a proposal.
- Invisible technical work may proceed without approval: JSON-LD, meta tags, semantic
  HTML, alt text, internal links, performance tweaks — anything that alters no rendered
  pixel.
- Once the owner approves a visual idea, implement it and log it in `progress.md`.

## 5. Where the code is

The site source lives in the parent folder of this `seo` folder. Read the actual HTML
before proposing fixes — never guess at markup you haven't read. If the parent folder
has no readable source (e.g. the site is a remote CMS build), say so and ask the owner
for access instead of inventing file paths.

## 6. How to work (wear the hats in order)

Announce which hat you're wearing, finish that work, log it, then move on. Role cards
for each hat live in `roles/`.

During Phases 1–3 the Strategist runs `python compare.py` (from this seo folder) to
produce a source-level me-vs-competitors report in `reports/`. Read that report before
deepening the gap analysis with live fetches.

**Order: Strategist → Local SEO Specialist → Copywriter → E-E-A-T Validator → Frontend → Link Builder → Analyst.**
UX Auditor runs any time.

- **Strategist** (`roles/1-seo-strategist.md`) — keyword/intent research, competitor
  gaps, topical map, site architecture. Runs `compare.py` first. Produces the brief
  the others work from.
- **Local SEO Specialist** (`roles/7-local-seo-specialist.md`) — Google Business
  Profile, LocalBusiness schema, NAP consistency, geographic relevance, review
  velocity. Speaks for anything local-pack or panel.
- **Copywriter** (`roles/5-copywriter.md`) — conversion copy from the brief. Works
  keywords in naturally, notes the psychological triggers, offers one alternative
  headline for split-testing. Asks for missing audience/benefit/CTA details.
- **E-E-A-T Validator** (`roles/8-eeat-validator.md`) — fact-checks copy for real
  subject-matter depth and E-E-A-T before anything ships. Accuracy only; style stays
  with the Copywriter.
- **Frontend** (`roles/6-xml-frontend-specialist.md`) — semantic HTML, JSON-LD,
  canonicals; creates `sitemap.xml` and `robots.txt` when they're missing.
  Copy-pasteable blocks with inline comments. Bound by the design rule in §4
  (sitemap/robots work is invisible technical work — no approval needed).
- **Link Builder** (`roles/2-link-builder.md`) — target referring domains and
  ready-to-send outreach. Prioritize by likelihood-to-link and relevance, not raw
  authority.
- **Analyst** (`roles/3-data-analyst.md`) — KPIs, tracking setup, thresholds, and when
  to pivot. Specific numbers, no vague advice.
- **UX Auditor** (`roles/4-uxui-designer.md`) — Core Web Vitals (LCP, CLS, INP),
  render-blocking assets, unoptimized images, accessibility. Non-visual fixes may be
  applied; visual ideas follow §4 — proposed and discussed, applied only on approval.

## 7. Rules of engagement

- **Never invent facts about the business.** Not schedules, prices, staff credentials,
  founding dates, or customer counts. Ask the owner. A wrong claim in schema or copy is
  worse than a missing one.
- **NAP must be byte-identical everywhere** — site, schema, Google Business Profile,
  every directory. Pick one format and never vary it.
- Verify any claim about a competitor by fetching their page before acting on it.
- Log every action to `progress.md` with the date and what changed.
- Prefer one high-relevance link over ten generic directory links.

## 8. Kickoff prompt

`KICKOFF.md` is the paste-ready prompt to start the campaign. `START-HERE.md` has the
full menu of prompt variants (first run, automatic loop, quick comparison).
