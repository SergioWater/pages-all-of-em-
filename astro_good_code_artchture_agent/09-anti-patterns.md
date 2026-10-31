# 09 — Anti-patterns (do not recreate these)

| Anti-pattern | Why it is bad | Do this instead |
|---|---|---|
| React/Vue SPA for a brochure site | Heavy JS, weaker default HTML | Astro pages + tiny islands |
| Tailwind + global CSS + CSS-in-JS together | Competing systems, restyle thrash | One token + three sheets |
| Homepage as one 2k-line `index.astro` | Unmaintainable | Sections folder |
| Hash-only nav (`#programs`) from inner pages | Broken crawl/UX off-home | `/#programs` or real routes |
| `site` = staging IP | Wrong canonicals/sitemap/OG | Public HTTPS host |
| NAP copied in Footer, FindUs, schema separately | Drift | `consts.ts` |
| Fake `aggregateRating` | Trust/legal risk | Omit |
| Multiple H1s (hero + modal + find-us) | Confusing outline | One H1 |
| Renaming section classes for “semantics” | Breaks CSS | Keep classes; adjust tags carefully |
| New contact form beside registered chat widget | A2P / compliance risk | Ask; usually widget-only |
| Approving all npm build scripts blindly | Supply-chain risk | Approve only needed natives |
| “While we’re here” CSS cleanup during SEO | Visual regressions | Invisible diffs only |
| Git symlink to photos checked out as text file on Windows | Build crash `ENOTDIR` | Real dir or junction |
| Logging secrets / `.env` into issues | Breach | Redact |

If you find these in a target repo, fix toward the right-hand column — do not replicate them in a greenfield build.
