# Joey realtor — SEO Campaign Rules

Read this file before doing anything. It governs every session that works on this campaign.

---

## 1. The goal

Grow Joey realtor's organic visibility for **realtor in southern california** and its related terms,
and outrank the competitors listed in §2. The Strategist's audit (Phase 1–3) refines this
into specific targets — record them in `seo-brief.md` once known.

## 2. The facts

**Us — Joey realtor**
- URL: https://jdlre.com/
- Title tag: `Joey De Leon, Realtor® | Southern California`
- H1: `A trusted guide to your next address.`
- Meta description: Joey De Leon, Realtor® with Power Real Estate Group, helps Southern California buyers and sellers move with confidence. Orange County, Inland Empire, and Greater LA, Irvine, Yorba Linda, Newport Beach, Riverside, Long Beach & beyond.
- Platform: Next.js (App Router) with static export (`joey-deleon-vercel_v12/`) — live at jdlre.com
- NAP (name / address / phone): Joey De Leon · cell (408) 613-7001 · office (949) 806-6169 · joeydln@powerreteam.com · Power Real Estate Group · DRE# 02238070 · street address *(ask owner — not on site)*
- Social accounts: Instagram [@realtorjoeyd](https://www.instagram.com/realtorjoeyd/) · others *(ask owner)*
- Site source: `joey-deleon-vercel_v12/` in the parent folder of this `seo` folder — read it before suggesting anything.

**Competitors**

- https://johnalagna.com/

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

**Audited 2026-08-08** against live `jdlre.com` + source in `joey-deleon-vercel_v12/`,
and live `johnalagna.com` (Lofty/Chime IDX platform).

1. **Discovery gap (crawl / entity), not design.** Live site had no `robots.txt` and no
   `sitemap.xml` (both 404). No JSON-LD (`RealEstateAgent` / `Person` / `LocalBusiness`),
   no canonicals, and Open Graph falls back to root metadata on child pages. Google has a
   harder time discovering the 17 `/areas/*` pages and connecting Joey as a licensed SoCal
   agent entity. *(Sitemap + robots written into `public/` on 2026-08-08; still need deploy.)*

2. **Intent mismatch on the money pages.** Primary target is commercial-local
   (`realtor in southern california` and city variants). Homepage title leads with brand;
   H1 is brand voice (“A trusted guide to your next address”) with the primary phrase only
   in supporting copy/meta. Competitor’s Lofty stack is listing-first (Buy / Sell / Sold /
   Market Snapshot / indexable listing URLs) and publishes blog market updates — that
   matches “find a realtor / find homes” intent better even when on-page copy is weaker.

3. **Topical authority gap (off-page + content cadence).** Competitor ships recurring blog
   posts (market updates, buyer process), embeds social proof, and routes reviews to
   Google / Redfin / Zillow. Joey’s site has stronger editorial area pages and on-site
   testimonials, but no blog/market-update layer, no sold-listing archive as crawlable
   pages, and weak internal links from footer/nav into `/areas/*`. Theory of why they
   outrank: **platform-fed indexable inventory + review-graph + content cadence + crawl
   hygiene**, not better branding.

4. **Our real advantages to press.** Unique city landing pages with local market/lifestyle
   copy + live MLS widgets; premium brand experience; clear DRE# and brokerage; strong
   on-page reviews; county/community explorers. Win path: make city pages the ranking
   engine for `[city] realtor` / `homes for sale in [city]`, fix entity markup + GBP, then
   add a thin-but-steady market-update content layer — without abandoning the brand voice.

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
