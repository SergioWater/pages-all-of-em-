# Change Classes — what needs approval

Derived from `_seo-default/AGENTS.md` §4 (design rule) and the ten hard rules
in `kenseijudoschool/seo/AGENT-CODING-GUIDE.md`, both proven across the kensei
and sentinals campaigns.

## Classes

| Class | Examples | Gate |
|---|---|---|
| **INVISIBLE** | meta/title text, JSON-LD, robots.txt, sitemap, canonical config, alt text, semantic tag swaps that keep CSS selectors, internal link targets, schema values from confirmed facts | none — proceed |
| **COPY** | visible text changes beyond typos, new sections, headline rewrites, tone | owner approval |
| **VISUAL** | anything altering rendered pixels: colors, fonts, spacing, layout, component structure changes, CSS file edits beyond token additions | owner approval |
| **STRUCTURAL** | new islands, new dependencies, new third-party scripts, config changes affecting output URLs | propose first; invisible-only parts may proceed |

## The invisible whitelist (proceed without asking)

- `astro.config.*` `site` (canonical/sitemap host)
- `public/robots.txt`, sitemap integration config
- head metadata: title segment, description, OG/Twitter tags
- JSON-LD blocks (values must be confirmed facts — see honesty-rules)
- alt text on existing images
- root-relative link fixes (`#programs` → `/#programs`)
- adding `width`/`height`/`loading`/`decoding` attributes to existing `<img>`

## Hard prohibitions (never, regardless of approval wording)

- Do not rename classes wired to the three style sheets
  (`hero-photo-section`, `instructor-grid`, `faqs`, `findus`, `container`,
  `section-head`, …). "CSS selectors break silently."
- Do not reformat/"organize"/rewrite large CSS files.
- Do not introduce a second design system (Tailwind, Bootstrap, a new token
  file, inline utility soup).
- Do not delete decorative elements (`photo-tone`, `underline`, `eyebrow`,
  container spans) because they look non-semantic. They carry the design.
- No large inline `style=""` blocks; match the rare existing `var(--…)` pattern.
- Never edit a live CMS theme folder mistaking it for the static frontend
  (documented kensei failure mode: `frontends/wordpress` vs
  `frontends/astro-website-2`).

## If styling breaks anyway

Stop stacking fixes. Restore the three style sheets and any class-churned
files from the last good commit; re-apply only invisible work and approved
copy. Smaller patches beat "redesign while we're here." (Documented recovery
from AGENT-CODING-GUIDE.md.)
