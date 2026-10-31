# Ready-to-paste prompts for Cursor

Open this folder (or the site folder above it) in Cursor, then paste ONE of these.
`KICKOFF.md` holds the main prompt as raw text for one-click copying from the hub.

---

## ⭐ MAIN PROMPT — full audit + plan (paste this first)

```
Read AGENTS.md, seo-brief.md, and progress.md in this folder first, and follow
AGENTS.md — especially the design rule: propose and discuss design ideas with me, but
never apply a visual change until I approve it.

Then read my actual site source in the parent folder of this seo folder.

Wear the Strategist hat and run the full campaign setup:
1. Audit my site: title tags, meta descriptions, H1/heading structure, keyword usage,
   internal linking, content depth vs search intent, alt text, URL structure, schema.
   Also technical SEO: semantic HTML, JSON-LD, canonicals; if there is no sitemap.xml
   at the site root, create one covering every indexable page and reference it from
   robots.txt (create or fix robots.txt too if needed).
2. Run `python compare.py` from this seo folder first (writes reports/compare-<date>.md),
   then deepen competitor audits with live fetches where the report marks gaps.
3. Produce a side-by-side gap analysis table: me vs them, category by category.
4. Write the diagnosis into AGENTS.md §3, then turn seo-brief.md into a concrete
   P0/P1/P2 plan ranked by impact vs effort.

Show me each change before applying it. Log everything to progress.md.
```

---

## 🔁 KEEP-GRINDING PROMPT — after the plan exists

```
Read AGENTS.md, seo-brief.md, and progress.md. Work the campaign: pick the single
highest-impact unfinished item in progress.md, execute it wearing the right hat
(AGENTS.md §6), and append what you did to progress.md. Respect the design rule —
propose visual ideas, apply them only after I approve. Invisible technical fixes may
proceed. Stop when the P0 list is complete.
```

---

## 🔍 QUICK VERSION — comparison only, change nothing

```
Read AGENTS.md and my site source in the parent folder. Fetch each competitor URL in
AGENTS.md. Give me a side-by-side SEO gap analysis table and your top 10 prioritized
fixes. Analysis only — change nothing yet.
```

---

### Before you paste
Check that `AGENTS.md` §2 has your real URL and competitor URLs filled in. Rankings
and backlink numbers can't be fetched live — pull them from your keyword tool and
paste them in when asked.
