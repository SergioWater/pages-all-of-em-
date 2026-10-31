# Joey realtor — SEO Brief

Source of truth for what to build. Facts and diagnosis live in `AGENTS.md`.
The Strategist fills this in after the Phase 1–3 audit; every item must trace back to
a finding in `AGENTS.md` §3.

---

## Keyword targets

**Primary:** `realtor in southern california`

**Secondary (each earns a page or a section, not a keyword-stuffed paragraph):**

| Cluster | Terms | Intent | Lands on |
|---|---|---|---|
| Brand / agent | `Joey De Leon realtor`, `Joey De Leon Power Real Estate` | Navigational | `/`, `/about/` |
| Regional commercial | `Southern California realtor`, `Orange County realtor`, `Inland Empire realtor` | Commercial | `/` (H1/title refresh), `/about/` |
| City agent | `[city] realtor`, `realtor in [city] CA` (Yorba Linda, Irvine, Newport Beach, Long Beach, Riverside, Ontario…) | Commercial-local | `/areas/[slug]/` |
| City inventory | `homes for sale in [city]`, `[city] CA homes for sale` | Transactional | `/areas/[slug]/` + `/search/` |
| Seller | `what's my home worth Southern California`, `home valuation Orange County` | Transactional | `/home-valuation/` |
| Buyer process *(future)* | `buying a home in Southern California`, `[county] real estate market` | Informational | New `/insights/` posts (P1) |

**Topical map (architecture)**

```
jdlre.com/
├── /                          ← regional realtor pillar (brand + SoCal intent)
├── /about/                    ← E-E-A-T / Person entity
├── /search/                   ← transactional MLS hub
├── /home-valuation/           ← seller capture
├── /contact/                  ← conversion
├── /areas/{city}/             ← local commercial + inventory (×17, expand later)
└── /insights/                 ← P1: market updates & buyer/seller guides (not built yet)
```

Internal link paths to enforce: Home → Areas → Contact; Footer “Communities” → all `/areas/*`;
Area pages ↔ sibling areas (already partial); About → Areas + Contact.

---

## P0 — do these first, in this order

Traces to `AGENTS.md` §3 findings 1–2.

1. **Deploy `robots.txt` + `sitemap.xml`** — Already written under
   `joey-deleon-vercel_v12/public/` (and mirrored in `out/`). Cover all 22 indexable
   URLs. Submit sitemap in Google Search Console after deploy. *Impact: high · Effort: low.*

2. **Google Business Profile audit** — Verify listing exists, category = Real Estate Agent
   (or equivalent), NAP byte-identical to site, service areas = OC / IE / Greater LA,
   website = https://jdlre.com/, photos + DRE#. *Blocked on owner access.*

3. **JSON-LD on homepage + about** *(invisible — may apply after you OK the draft)* —
   `RealEstateAgent` + `Person` with name, DRE# 02238070, phone, email, `url`,
   `image`, `worksFor` (Power Real Estate Group), `areaServed`, `sameAs` (Instagram;
   add more when you confirm). Values must match live page text exactly. No invented
   street address. *Impact: high · Effort: low.*

4. **Canonical + per-page Open Graph** *(invisible)* — `metadataBase` +
   `alternates.canonical` in Next metadata; page-level `openGraph.title/description`
   so area pages don’t inherit the homepage OG title. *Impact: medium · Effort: low.*

5. **Title / H1 alignment for primary intent** *(copy change — needs your approval)* —
   Homepage: keyword-led title, brand last; H1 that still sounds like Joey but includes
   the regional realtor meaning (proposal below). Area pages: keep
   `{City}, CA Homes for Sale | Joey De Leon, Realtor®` pattern; optionally add a
   supporting line with `{City} realtor`. *Impact: high · Effort: low.*

6. **Internal links to `/areas/*`** *(visible footer/nav — needs approval)* — Add a
   “Communities” block in the footer listing all 17 area pages; link popular cities from
   About. Area pages already cross-link siblings. *Impact: high · Effort: low.*

---

## P1 — differentiators

Traces to `AGENTS.md` §3 findings 3–4.

1. **Deepen top 6 city pages** (Yorba Linda, Irvine, Newport Beach, Long Beach,
   Riverside, Ontario) to ~800–1,200 words: neighborhoods, buyer/seller angles, FAQ
   (`FAQPage` schema only with real Q&As you approve). Keep RealScout widget.
2. **`/insights/` market-update cadence** — 1 short post / month (county snapshot or
   buyer/seller guide). Competitor ranks partly on this layer; we don’t need volume,
   we need consistency + internal links into `/areas/*`.
3. **Review graph** — On-site reviews stay; add outbound links to Google / Zillow /
   Realtor.com profiles once URLs confirmed. Ask flow after closings.
4. **Sold / results section** — On-site “recently helped” strip with cities + outcomes
   you’re willing to publish (no invented stats). Optional later: crawlable sold pages.
5. **Expand area coverage** for high-intent cities currently chip-only (Pasadena,
   Temecula, Rancho Cucamonga, Santa Monica, Huntington Beach) into full `/areas/*`
   pages when capacity allows.

---

## P2 — off-page

Traces to `AGENTS.md` §3 finding 3. Prefer relevance over raw DA.

1. Google Business Profile posts + Q&A (weekly).
2. California / local association directories once CAR membership and brokerage landing
   pages are confirmed.
3. Neighborhood / city resource pages that accept local expert quotes (one relevant
   link > ten directories).
4. Instagram → site deep links in bio and story highlights to `/areas/*` and valuation.
5. Skip paid generic directories, link exchanges, guest-post farms.

---

## Measurement

| Metric | Where | Baseline | Check |
|---|---|---|---|
| Rank for primary keyword | Rank tracker / incognito | ? *(paste from your tool)* | Weekly |
| Rank for `homes for sale in Irvine` (+ top cities) | Rank tracker | ? | Weekly |
| Impressions + CTR | Search Console | ? after property verify | Monthly |
| Indexed `/areas/*` count | Search Console Coverage | 0 known via sitemap until deploy | Monthly |
| Referring domains | Backlink tool | ? | Monthly |
| Primary conversion (form / call / booking) | Analytics event | ? | Weekly |
| LCP / CLS / INP | PageSpeed Insights | ? | Monthly |

**Pivot triggers:**
- Rank flat 90 days after P0 completes with impressions rising → intent mismatch;
  revisit the page-to-cluster mapping.
- Rank flat with impressions also flat → the links didn't land; re-check that earned
  listings are live, crawlable, and not `nofollow`-only.

---

## Gap analysis summary (Strategist)

| Category | Joey (jdlre.com) | John Alagna (johnalagna.com) | Winner | Why |
|---|---|---|---|---|
| Title tags | Brand-first; solid on area pages | Generic “Real Estate - John Alagna - eXp Realty” | **Joey** (areas) / Tie (home) | Area titles match inventory intent; home title underuses primary KW |
| Meta descriptions | Present, geo-rich | Often thin / platform-default on key pages | **Joey** | Clear SoCal + city coverage |
| H1 / headings | One H1/page; brand-voice H1 on home | Duplicate H1/H2 pairs; listing-address H3s | **Joey** (structure) | Cleaner outline; home H1 still misses KW intent |
| Keyword placement | Strong in meta/body; weak in home H1/title | “Real Estate” + listing-heavy, less regional KW craft | **Tie** | Different strategies; Joey needs home alignment |
| Content depth vs intent | Strong brand + 17 city pages (~thin-medium) | Listing-first + blog market posts | **Competitor** | Cadence + inventory pages match search demand |
| Internal linking | Nav/footer miss `/areas/*` | Deep Buy/Sell/Sold/Blog IA | **Competitor** | Platform IA surfaces more crawl paths |
| Image alt text | Present and descriptive on key images | Mixed / platform defaults | **Joey** | Better descriptive alts in source |
| URL structure | Clean `/areas/{city}/`, trailing slash | `/listing`, `/blog/...`, `/sell`, `/evaluation` | **Tie** | Both fine; competitor has more URL types indexed |
| Schema / JSON-LD | None found | Platform may inject; not reliably visible in fetch | **Competitor (likely)** | Joey has a clear win available by adding agent schema |
| Canonicals | Missing | Platform-managed (assumed) | **Competitor** | Joey should add `metadataBase` + canonicals |
| robots.txt | Was 404; **now in repo** | Present (blocks some bots; declares sitemap) | **Joey after deploy** | Fixed in source; needs live deploy |
| sitemap.xml | Was 404; **now in repo** (22 URLs) | Declared; endpoint errored 500 at audit time | **Joey after deploy** | Complete static sitemap ready |
| Semantic HTML | Good (`main`, `header`, `footer`, headings) | App-shell heavy (Lofty) | **Joey** | Cleaner static HTML export |
| Reviews / E-E-A-T | On-site 5★ quotes + DRE# | Google / Redfin / Zillow outbound + license | **Competitor** (graph) | Off-site review graph helps local pack |
| MLS / listings UX | RealScout on-site widgets | Native Lofty IDX + sold + social feed | **Competitor** (indexable listings) | Joey keeps users on-site but fewer indexable listing URLs |

**Best theory of outranking:** Competitor wins on **crawlable inventory + review ecosystem + content cadence + basic crawl hygiene**, while Joey wins on **brand quality and unique city pages that aren’t fully activated** (no sitemap/schema, weak home KW alignment, areas under-linked).

---

## Proposed changes awaiting your approval

### A — Homepage title (meta only; invisible in page body)
**From:** `Joey De Leon, Realtor® | Southern California`  
**To:** `Southern California Realtor® | Joey De Leon`  
*Why:* Keyword first, brand last for SERP CTR on primary query.

### B — Homepage H1 (visible — design/copy)
**From:** `A trusted guide to your next address.`  
**To (option 1):** `Southern California Realtor® for buyers and sellers.`  
**To (option 2, keeps voice):** `Your Southern California Realtor® — a trusted guide to your next address.`  
*Why:* Align H1 with commercial-local intent without junking the brand line.

### C — Footer “Communities” link list (visible)
Add links to all 17 `/areas/{slug}/` pages under Explore.  
*Why:* Internal PageRank + crawl discovery for the ranking engine pages.

### D — JSON-LD draft (invisible once approved as accurate)
Homepage `RealEstateAgent`/`Person` using only verified facts: name, phones, email,
DRE# 02238070, brokerage name, Instagram `sameAs`, areaServed counties/cities already
on the page. **No street address until you provide one.**

Reply with which of A–D to apply (e.g. “A, C, D, and H1 option 2”).

---

## Blocked on the owner

Nothing below can be written accurately without answers. Ask before drafting.

- [ ] Google Business Profile access / claim status
- [ ] Street address for NAP + schema (or confirm “service-area only, no storefront”)
- [ ] Additional social / profile URLs for `sameAs` (Zillow, Realtor.com, Facebook, LinkedIn, YouTube)
- [ ] Confirm Deploy of `public/robots.txt` + `public/sitemap.xml` to production
- [ ] Approve proposals A–D above before visual/copy application
- [ ] Any credentials/awards beyond DRE# and CAR membership already on `/about/`
- [ ] Backlink metrics table in `AGENTS.md` §2 (paste from Ahrefs/Moz/Semrush when available)
