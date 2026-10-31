# resh.sentinals soccer club — SEO Brief

Source of truth for what to build. Facts and diagnosis live in `AGENTS.md`.
The Strategist fills this in after the Phase 1–3 audit; every item must trace back to
a finding in `AGENTS.md` §3.

---

## Keyword targets

**Primary:** `soccer club in gilroy`

**Secondary (each earns a page or a section, not a keyword-stuffed paragraph):**


| Cluster             | Terms                                                                                     | Intent                  | Lands on                                                                      |
| ------------------- | ----------------------------------------------------------------------------------------- | ----------------------- | ----------------------------------------------------------------------------- |
| Gilroy / local club | soccer club in gilroy, youth soccer gilroy, gilroy soccer club                            | commercial / local      | Homepage title + H1 (revised); optional Gilroy section or landing if approved |
| Morgan Hill         | youth soccer morgan hill, soccer club morgan hill                                         | commercial / local      | Homepage + about (already strong); keep MH second in titles                   |
| Competitive         | competitive youth soccer, norcal premier soccer club, soccer tryouts gilroy / morgan hill | commercial              | `competitive.html`, `tryouts.html`                                            |
| Recreational        | recreational soccer gilroy, kids soccer league gilroy / morgan hill                       | transactional           | `recreational.html` (compete with Audax City of Gilroy rec page)              |
| Camps               | summer soccer camp morgan hill / gilroy                                                   | transactional           | `summer-camps.html`                                                           |
| Private training    | private soccer training morgan hill / gilroy                                              | transactional           | `private-training.html`                                                       |
| Coaches / trust     | youth soccer coaches morgan hill                                                          | informational / E-E-A-T | `coaches.html` + Person schema                                                |


---

## P0 — do these first, in this order

1. **Google Business Profile audit** *(blocked on owner)* — confirm listing exists,
  verified, not suspended; category (e.g. Soccer Club / Youth Organization); NAP  byte-identical to site + schema. Without this, local-pack work stalls. Nothing I can do skip this.
2. **Title tag + visible H1 for primary keyword** *(propose → owner approves copy)* —
  Lead with Gilroy/youth-soccer intent, brand last. Example direction (not applied):
   `Soccer Club in Gilroy & Morgan Hill | Sentinels Soccer Club`. Homepage H1 should  include the service + place (not brand-only). Inner-page visually-hidden H1s are OK  for SEO but visible H2s should carry the same intent where thin. sounds good do this
3. **Complete LocalBusiness schema + on-page NAP** *(invisible tech once address confirmed)* —
  Add `streetAddress`, `postalCode`, `geo`, and `openingHoursSpecification` only with
   owner-verified values. Mirror the same NAP on `contact.html`. Keep existing
   `sameAs` and `areaServed`. Do not invent a street address. nothing i can do skip this
4. **Coach** `Person` **schema on** `coaches.html` *(invisible)* — only credentials already
  published on the page (Rick / Nolan / Alex). No invented degrees or years. only credentials on page
5. **Sitemap / robots hygiene** — already present and correct (`sitemap.xml` +
  `robots.txt` Sitemap line). Refresh `lastmod` dates when pages change. No create  needed unless new indexable URLs ship. ref

---

## P1 — differentiators

*(Trace: AGENTS.md §3 #3–4 — exploit content/tech lead + proof competitors lack.)*

1. **Rec page vs Audax City of Gilroy partnership** — deepen `recreational.html` with
  clear Fall 2026 dates, ages, cost (owner-confirmed), practice/game locations including
   Gilroy fields already used for tryouts (Christmas Hill Park), and a plain-language
   “serving Gilroy families” block. Do not claim a City of Gilroy contract we don’t have.
2. **FAQ freshness** — tryout FAQ still reads as open; align copy + FAQPage JSON-LD with
  live tryouts status (2026 complete / 2027 next) so schema matches the page.
3. **Proof modules** — surface State Cup / NorCal podium wins with dates and age groups
  (owner-confirmed) on about or competitive, not only in gallery alt text.
4. **Pricing transparency where known** — summer camp $150/wk already on-page; add rec
  and private-training pricing only when owner supplies numbers.
5. **Optional Gilroy landing** *(architecture proposal)* — `/gilroy-soccer.html` or
  similar pillar only if homepage revisions aren’t enough after 60–90 days; internal-link
   from home, rec, tryouts, contact. **Do not build until owner approves.**

---

## P2 — off-page

1. **NorCal Premier club directory** — already in `sameAs`; confirm listing is complete
  and links to `https://sentinelssoccerclub.com/`.
2. **City / parks partnerships** — Morgan Hill & Gilroy parks & rec calendars, field
  permit pages, youth-sports roundups (relevance over DA).
3. **Local press / South County outlets** — State Cup / championship story pitches with
  real photo assets from gallery.
4. **School & league boards** — Soquel/Gilroy Soccer League ties already mentioned for
  Coach Rick; ask about current community listings (no invented affiliations).
5. Skip paid directories, link exchanges, and guest-post farms.

---

## Measurement


| Metric                                           | Where                       | Baseline          | Check   |
| ------------------------------------------------ | --------------------------- | ----------------- | ------- |
| Rank for `soccer club in gilroy`                 | Rank tracker / incognito    | ? *(owner paste)* | Weekly  |
| Impressions + CTR (brand + Gilroy queries)       | Search Console              | ?                 | Monthly |
| Referring domains                                | Backlink tool               | ?                 | Monthly |
| Primary conversion (rec signup / contact / call) | Analytics / SportsCampament | ?                 | Weekly  |
| LCP / CLS / INP (home)                           | PageSpeed Insights          | ?                 | Monthly |
| GBP actions (calls, direction, website)          | GBP insights                | ? *(need access)* | Monthly |


**Pivot triggers:**

- Rank flat 90 days after P0 completes with impressions rising → intent mismatch;
revisit the page-to-cluster mapping (consider Gilroy landing).
- Rank flat with impressions also flat → the links didn’t land; re-check that earned
listings are live, crawlable, and not `nofollow`-only.

---

## Blocked on the owner

Nothing below can be written accurately without answers. Ask before drafting.

- [ ] Google Business Profile access *(local businesses)*
- [ ] Canonical street address + ZIP (and whether public hours exist)
- [x] Confirm founding date 2015, phone `(408) 722-1028`, email, social URLs already on site
- [ ] Rec league pricing, exact Fall 2026 dates/locations if not already final
- [ ] Private training rates
- [ ] Championship / podium facts with year + age group for copy (not just photos)
- [ ] Rank / backlink baselines from keyword tool (DA, referring domains)
- [x] Approval on proposed title/H1 copy before any visible text change
---

## Design / UX proposals (not applied — need approval)

Per `AGENTS.md` §4. Ideas only:

1. **Homepage H1 + subtitle** — make the first viewport say the service + Gilroy/MH, not
  only the crest + brand name (brand stays hero-level; add place/service in the line).
2. **Contact page NAP block** — visible address + map embed once address is confirmed
  (currently email/phone icons only — weak local trust).
3. **Typography** — site uses Inter + Montserrat; Inter is a default-stack look. Optional
  later refresh is visual — out of scope until you ask.

Invisible technical work (schema fields with verified NAP, FAQ schema sync, `lastmod`)
may proceed without design approval once you confirm facts.