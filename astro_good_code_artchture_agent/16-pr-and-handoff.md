# 16 — PR / handoff template for agents

When you finish a recreate or architecture pass, leave this for the human (and the next agent).

## Summary block (paste into PR / chat)

```md
## Architecture pack citation
Followed: D:\001_websites\astro_good_code_artchture_agent (files: …)

## What changed
- …

## Invisible vs visual
- Invisible (no approval needed): …
- Proposed visual (awaiting approval): …
- Applied visual (human approved on <date>): …

## Hosts
- Public site (`astro.config` site): https://…
- CMS/API (env): …

## Verify
- [ ] `pnpm run build` OK
- [ ] `dist/robots.txt` present
- [ ] sitemap URLs on public host
- [ ] canonicals on public host
- [ ] homepage spot-check desktop + mobile
- [ ] no new lead forms / no new third-party scripts (or listed below)

## Facts still needed from human
- NAP confirmation?
- Affiliations / founding / reviews?
- Deploy target?

## Out of scope / not done
- …
```

## Diff hygiene

- Prefer many small commits over one “architecture + redesign” commit.
- Do not mix CSS restyles with SEO head tags in the same commit if avoidable.
- Never commit `.env`, credentials, or private media dumps.

## Saying no

If asked to violate `01` / `06` / `09`, refuse with the pack file name and offer a compliant alternative.
