Read AGENTS.md, seo-brief.md, and progress.md in this folder first, and follow AGENTS.md — especially the design rule: propose and discuss design ideas with me, but never apply a visual change until I approve it.

Then read my actual site source in the parent folder of this seo folder.

Wear the Strategist hat and run the full campaign setup:
1. Audit my site: title tags, meta descriptions, H1/heading structure, keyword usage and placement, internal linking, content depth vs search intent, image alt text, URL structure, and any existing schema markup. Also check technical SEO: semantic HTML, JSON-LD, canonical tags, robots.txt — and if there is no sitemap.xml at the site root, create one covering every indexable page and reference it from robots.txt (create or fix robots.txt too if needed). Sitemap and robots work is invisible technical work, so it does not need my approval.
2. Run `python compare.py` from this seo folder first — it compares my local site source against the competitor URLs in AGENTS.md and writes `reports/compare-<date>.md`. Then deepen the competitor audit with live fetches wherever that report marks gaps or fetch failures.
3. Produce a side-by-side gap analysis (use the compare report as the source-level baseline): me vs them, category by category, marking who wins each row and why. Explain your best theory of why they outrank me.
4. Write your diagnosis into AGENTS.md section 3, then turn seo-brief.md into a concrete prioritized plan (P0/P1/P2), ranked by impact vs effort.

Show me each change before applying it. When you propose a visual change, present the idea and wait for my approval. Log everything you do to progress.md.
