# hbk — SEO Brief

Source of truth for what to build. Facts and diagnosis live in `AGENTS.md`.
The Strategist fills this in after the Phase 1–3 audit; every item must trace back to
a finding in `AGENTS.md` §3.

---

## Keyword targets

**Primary:** `futsal club in bay area` *(commercial / local — “find a club to join or train with”)*

**Secondary (each earns a page or a section, not a keyword-stuffed paragraph):**

| Cluster | Terms | Intent | Lands on |
|---|---|---|---|
| Geo club | `futsal club san jose`, `san jose futsal`, `bay area futsal club` | Commercial local | Homepage title/H1/lede + About |
| Programs / train | `futsal training bay area`, `youth futsal san jose`, `futsal skills training` | Commercial | `programs.html` (+ deepen copy) |
| Competitive / NFPL | `NFPL futsal`, `US futsal nationals`, club name variants | Navigational / brand | Homepage Nationals + `schedule.html` |
| Join / tryouts | `futsal tryouts bay area`, `join futsal team san jose` | Transactional | `book-online.html` |
| Sponsor | `sponsor futsal team` | Commercial | `sponsors.html` (keep; not primary growth lever) |

**Topical map (pillar → supports)**

```
HBK Futsal — Bay Area / San Jose futsal club (homepage pillar)
├── Programs (skills, youth, NFPL)     → programs.html
├── Teams & rosters                    → teams.html
├── Coaches & staff (E-E-A-T)          → coaches.html
├── Schedule & Nationals               → schedule.html
├── Book / tryouts / contact           → book-online.html
└── Sponsors                           → sponsors.html
```

Internal link rule: homepage nav/footer must pass PageRank to every support URL
(today homepage mostly uses `#` anchors and only hard-links `sponsors.html` + `portal.html`).

---

## P0 — do these first, in this order

Traces to diagnosis §3.1–§3.3. Impact ≫ effort unless noted.

1. **Decide / execute the live domain** *(§3.1)* — Highest impact.
   - Confirm cutover plan: replace Wix at `hbkfutsal.com` with the static `hbk/` build.
   - Until cutover, ranking work on lushessences.com will not move the primary SERP.
   - On cutover: 301 Wix paths (`/team`, `/team-4`, `/book-online`, Programs URL, etc.) → new `.html` URLs; resubmit Search Console sitemap; fix production `sitemap.xml` 500.

2. **Homepage title + meta description** *(§3.2)* — Invisible once approved as copy; keyword first, brand last.
   - Proposed title: `Bay Area Futsal Club in San Jose | HBK Futsal`
   - Proposed meta (~155 chars): `HBK Futsal is a Bay Area futsal club in San Jose — men's & women's NFPL squads, youth pathway, and skills training. Headed to the 2026 U.S. Futsal Nationals.`
   - *Await owner approval before applying (changes SERP snippet; H1 change if we also revise visible hero is visual).*

3. **Align visible homepage H1 / lede to geo intent** *(§3.2)* — **visual/copy change — needs approval.**
   - Keep brand strong; add one clear geo line (e.g. tagline or H1 supporting sentence that includes Bay Area / San Jose futsal club). Do not keyword-stuff the H1 alone.

4. **JSON-LD on homepage** *(§3.3 / E-E-A-T)* — Invisible; still show draft first per kickoff.
   - `SportsClub` or `SportsOrganization` + `PostalAddress` **only with owner-confirmed NAP**.
   - `sameAs`: Instagram (confirmed); add others only if real.
   - Optional `Person` for Miguel Medina / Víctor Miramontes matching on-page bios.
   - Do **not** invent street address, hours, or founding date.

5. **Internal linking from homepage → dedicated pages** *(§3.1 architecture)* — **nav change = visual/UX; needs approval.**
   - Point Teams / Coaches / Programs / Schedule / Contact nav items at `teams.html`, `coaches.html`, `programs.html`, `schedule.html`, `book-online.html` (keep in-page sections or deep-link with anchors if desired).
   - Footer Explore links same way. Remove or `noindex` portal from public nav if it is agency-only.

6. **Sitemap / robots** *(already in source)* — Local `hbk/robots.txt` + `hbk/sitemap.xml` cover all indexable pages and exclude `portal.html`. No create needed. **Owner action:** repair or replace production Wix sitemap (currently 500) at cutover.

---

## P1 — differentiators

Traces to §3.3–§3.4 — publish what competitors show that we don't, without inventing facts.

1. **Deepen `programs.html` + `book-online.html`** — ages, session types, who it's for, how to try out, CTA to call/Instagram. Add real prices/venues/dates **only when owner provides them** (Wix already shows some prices: Personalized Coaching $75/hr, Academy $70/hr, Futsal Training $50 — confirm still accurate before copying).
2. **Secondary page titles** — weave Bay Area / San Jose into Programs and Book titles where natural (e.g. Programs title already San-Jose-ish in meta; strengthen H1 ledes).
3. **FAQ block** (Programs or Book) for tryouts / youth / NFPL path → enables `FAQPage` schema later.
4. **Surface NFPL California Champions + Nationals** higher in copy that Google sees (already strong visually on redesign; ensure text, not only images).
5. **NAP consistency** — pick one phone format (`669-350-3341` vs `+1`), one email if public, one address for GBP + schema + footer.

---

## P2 — off-page

Traces to §3.4 authority gap. One relevant link > ten directories.

1. **Google Business Profile** — verify category (e.g. Futsal / Sports Club), photos, NAP, website = `hbkfutsal.com`, posts for Nationals/signings.
2. **US Futsal / NFPL / league listings** — wherever clubs are listed; claim/complete profile.
3. **Local association & facility partners** — gyms you train/play at; San Jose / South Bay sports orgs; ask for a text link with club name + Bay Area/San Jose.
4. **Press / community hooks** — Nationals 2026, NFPL California Champions, Edgar Rivas signing (Panama NT captain) — short pitches to local sports writers / bilingual South Bay outlets.
5. **Skip** paid directory farms, link exchanges, generic guest-post networks.

---

## Measurement

| Metric | Where | Baseline | Check |
|---|---|---|---|
| Rank for `futsal club in bay area` | Rank tracker / incognito | Not in top results observed Aug 2026 (Bay City / 925 / Diablos-type sites dominate) | Weekly after cutover |
| Impressions + CTR for geo queries | Search Console | ? (connect GSC) | Monthly |
| Indexed URLs / sitemap status | GSC Coverage | Production sitemap 500 | After cutover |
| Referring domains | Backlink tool | ? | Monthly |
| Primary conversion (call / book / IG DM) | Analytics or call tracking | ? | Weekly |
| LCP / CLS / INP | PageSpeed Insights | ? (run after cutover on static) | Monthly |

**Pivot triggers:**
- Rank flat 90 days after P0 completes with impressions rising → intent mismatch;
  revisit the page-to-cluster mapping.
- Rank flat with impressions also flat → the links didn't land; re-check that earned
  listings are live, crawlable, and not `nofollow`-only.
- Cutover delayed >30 days → either patch Wix title/meta/H1/sitemap in place as a bridge, or accept no SERP movement.

---

## Blocked on the owner

Nothing below can be written accurately without answers. Ask before drafting.

- [ ] Cutover decision: when does static `hbk/` replace Wix on `hbkfutsal.com`?
- [ ] Google Business Profile access
- [ ] Full NAP: legal/business name, street address, city/ZIP, hours, public email
- [ ] Confirm which prices/services from Wix Book Online are still live
- [ ] Tryout dates, training venues, youth age bands
- [ ] Social URLs beyond Instagram `@hbkfutbol` (Facebook, YouTube, etc.)
- [ ] Approval on proposed title/meta/H1 and homepage nav linking (see P0)
