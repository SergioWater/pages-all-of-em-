# Agent prompt (sticky)

On every `/loop` tick for this pack:

1. Read all `*.md` in `D:\001_websites\astro_good_code_artchture_agent` (especially `PACK-COVERAGE.md` + `CHANGELOG.md`).
2. Improve the pack so another AI agent can recreate good Astro architecture **without** reading `kensei/` or `seo/` (those are reference-only).
3. Prefer deepening thin spots listed in `PACK-COVERAGE.md` over adding overlapping checklists.
4. Prefer concrete runbooks: file templates, decision trees, verify commands, Windows-specific pitfalls.
5. Do **not** modify `kensei/` or `seo/` unless the human asks.
6. Keep reading order in `00-READ-IN-ORDER.md` accurate if you add files.
7. Append a one-line note to `CHANGELOG.md` describing what you added.
8. If multiple ticks queued, do **one** catch-up pass and say so in the changelog.
