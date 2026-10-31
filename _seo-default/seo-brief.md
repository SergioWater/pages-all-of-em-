# {{site_name}} — SEO Brief

Source of truth for what to build. Facts and diagnosis live in `AGENTS.md`.
The Strategist fills this in after the Phase 1–3 audit; every item must trace back to
a finding in `AGENTS.md` §3.

---

## Keyword targets

**Primary:** `{{target_keyword}}`

**Secondary (each earns a page or a section, not a keyword-stuffed paragraph):**

| Cluster | Terms | Lands on |
|---|---|---|
| *(strategist fills)* | | |

---

## P0 — do these first, in this order

*(Filled after the audit. Typical candidates — keep what applies, in impact order:)*

1. **Google Business Profile audit** *(local businesses)* — listing exists, verified,
   not suspended, correct specific category, NAP byte-identical to the site.
2. **Title tag and H1** — keyword first, brand last; one descriptive H1 per page;
   headings descend without skipping levels.
3. **Structured data** — appropriate schema type for the business on the homepage,
   `sameAs` for every social/profile, `Person` entries for named staff (real
   credentials only), `FAQPage` where a FAQ exists. Every value must match the live
   page exactly.
4. **Sitemap and robots.txt** — if the site root has no `sitemap.xml`, create one
   covering every indexable page; ensure `robots.txt` allows crawling and references
   the sitemap.

## P1 — differentiators

*(What we can publish or show that competitors don't: real schedules/prices, named
staff pages with E-E-A-T detail, facility/product specifics, review ask-flows.)*

## P2 — off-page

*(Prioritized link targets, highest relevance first: industry-org directories,
community/press hooks, local associations. Skip paid directories, link exchanges, and
generic guest-post farms. One relevant link beats ten generic ones.)*

---

## Measurement

| Metric | Where | Baseline | Check |
|---|---|---|---|
| Rank for primary keyword | Rank tracker / incognito | ? | Weekly |
| Impressions + CTR | Search Console | ? | Monthly |
| Referring domains | Backlink tool | ? | Monthly |
| Primary conversion (form/call/sale) | Analytics event | ? | Weekly |
| LCP / CLS / INP | PageSpeed Insights | ? | Monthly |

**Pivot triggers:**
- Rank flat 90 days after P0 completes with impressions rising → intent mismatch;
  revisit the page-to-cluster mapping.
- Rank flat with impressions also flat → the links didn't land; re-check that earned
  listings are live, crawlable, and not `nofollow`-only.

---

## Blocked on the owner

Nothing below can be written accurately without answers. Ask before drafting.

- [ ] Google Business Profile access *(local businesses)*
- [ ] Real business facts: hours, pricing, staff credentials, founding date
- [ ] Access to the live site admin / hosting if the parent-folder source is incomplete
