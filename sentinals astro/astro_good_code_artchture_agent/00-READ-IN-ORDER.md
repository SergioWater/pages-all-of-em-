# Agent entrypoint — read these files in order

**You are an AI coding agent.** Your job is to recreate (or extend) a **good Astro marketing-site architecture** like the Kensei `astro-website-2` pattern: static-first, token CSS, tiny islands, honest SEO, secure data boundaries.

## Which door?

| Job | Start |
|---|---|
| Remake an existing **HTML/CSS/JS** site into Astro | **`MASTER.md`** + **`README.md`**, then this file |
| Learn / greenfield in this architecture | This file, then `01`… |
| Commands only | **`README.md`** |

## Reading order (mandatory)

0. `MASTER.md` — **if migrating** HTML/CSS/JS → Astro (split map + phases)
0b. `README.md` — commands for agents and humans
0c. `PROJECT-README-TEMPLATE.md` — copy into the new Astro app as its README
1. `00-READ-IN-ORDER.md` ← you are here
2. `01-mission-and-non-negotiables.md`
3. `02-target-folder-layout.md`
4. `03-astro-coding-patterns.md`
5. `04-styling-architecture.md`
6. `05-data-content-and-config.md`
7. `06-security-privacy-malicious-intent.md`
8. `07-seo-invisible-rules.md`
9. `08-recreate-checklist.md`
10. `09-anti-patterns.md`
11. `10-reference-snippets.md`
12. `11-scaffold-commands.md`
13. `12-windows-pitfalls.md`
14. `13-decision-trees.md`
15. `14-file-templates.md`
16. `15-content-markdown-conventions.md`
17. `16-pr-and-handoff.md`
18. `17-acceptance-script.md`
19. `18-routing-and-nav.md`
20. `19-island-solid-patterns.md`
21. `20-env-and-deploy.md`
22. `PACK-COVERAGE.md` — what exists; avoid duplicate docs on later passes

Do **not** skip ahead to snippets/templates and invent a different stack.

## Output contract

When recreating a site from this pack:

1. Create the folder layout in `02` before writing page content.
2. Wire styling exactly as in `04` (three global sheets + tokens). Do not introduce Tailwind unless the human explicitly overrides this pack.
3. Keep interactivity as **islands only** (see `03`).
4. Split **public site URL** from **CMS/API URL** (see `05`).
5. Apply security rules in `06` before shipping any `client:*`, `innerHTML`, or third-party script.
6. Treat visual/layout changes as **proposal-only** until the human approves (`01`).
7. Finish with the verification checklist in `08`.

## Scope of this pack

- **In scope:** architecture, patterns, security, styling system, SEO-safe invisible work.
- **Out of scope:** inventing business facts, credentials, reviews, or NAP; copying proprietary Kensei brand assets without permission.
- **Reference implementation (read-only inspiration):** `D:\001_websites\kenseijudoschool\kensei\frontends\astro-website-2`
- **This pack lives at:** `D:\001_websites\astro_good_code_artchture_agent` (sibling of `kenseijudoschool/`, outside `kensei/` and `seo/`).

## How to cite this pack in your replies

When you change code, name which file of this pack authorized the change, e.g. “Per `06-security…` no new lead forms.”
