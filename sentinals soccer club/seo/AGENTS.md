# sentinals soccer club — SEO Campaign Rules

Read this file before doing anything. It governs every session that works on this campaign.

---

## 1. The goal

Grow sentinals soccer club's organic visibility for **soccer club in gilroy** and its related terms,
and outrank the competitors listed in §2. The Strategist's audit (Phase 1–3) refines this
into specific targets — record them in `seo-brief.md` once known.

## 2. The facts

**Us — sentinals soccer club**
- URL: https://sentinelssoccerclub.com/
- Title tag: `Soccer Club in Gilroy & Morgan Hill | Sentinels Soccer Club`
- H1: `Sentinels Soccer Club` + subline `Soccer Club in Gilroy & Morgan Hill`
- Meta description: Soccer club in Gilroy, Morgan Hill, and Hollister, CA. Sentinels runs competitive teams, recreational leagues, and summer camps for boys and girls ages 5-18. Est. 2015.
- Platform: Static HTML
- NAP (name / address / phone): phone `(408) 722-1028` on site; **street address still needed from owner**
- Social accounts: Facebook, Instagram, YouTube (URLs in homepage `sameAs`)
- Site source: the parent folder of this `seo` folder — read it before suggesting anything.

**Competitors**

- https://www.audaxsoccerclub.org/
- https://ovysl.org/

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

*(Source: Phase 1–3 audit, `reports/compare-2026-08-11.md`, live fetches 2026-08-11.)*

1. **Primary keyword is never owned on-page.** Target is `soccer club in gilroy`, but no
   title, H1, or visible body copy uses that phrase (or a close lead-with-Gilroy variant).
   Homepage title leads with brand; H1 is brand-only. Audax leads titles with
   “Youth Soccer Club Morgan Hill and Gilroy” and runs a dedicated **City of Gilroy**
   rec-league page (`/recleague`) — a stronger Gilroy entity signal than we currently send.

2. **Local entity is incomplete for the map pack.** Homepage JSON-LD has
   `SportsOrganization` + `LocalBusiness`, phone, email, `areaServed`, and `sameAs` — ahead
   of both competitors’ thin `WebSite` schema — but lacks `streetAddress` / `geo` /
   `openingHours`, and the contact page shows email/phone only (no postal address). GBP
   status is unknown. Without a verified, NAP-identical GBP + complete LocalBusiness, we
   cannot win the local pack even with strong organic pages.

3. **We already beat both competitors on technical on-page basics.** Unique titles + metas
   on every indexable page, canonicals, sitemap + robots, FAQPage schema, alt text (0
   missing on home), footer internal links, and deeper program/FAQ/coach content (~419
   home words vs Audax ~87). OV Toros has weaker titles (“Home”), no meta description, and
   near-zero image alts — but more program surface (Pre-Comp, MLS NEXT ID, Adidas camps).

4. **Our real advantages to lean on:** Est. 2015, NorCal Premier + State Cup proof
   (gallery), named coaches with credentials, priced summer camps ($150/wk), private
   training, multi-city South County coverage (MH / Gilroy / Hollister). Competitors win
   on brand/keyword-forward titles (Audax) and program breadth / affiliate signals (OV).
   Strategy: keep technical lead, fix Gilroy keyword + local entity gaps, then publish
   differentiators competitors don’t show (schedules, prices, coach Person schema, reviews).

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
