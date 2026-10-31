# 01 — Mission and non-negotiables

## Mission

Build a **local-business marketing site** with Astro that:

- Ships mostly **static HTML**
- Looks intentional via a **token + global CSS** system (not utility-CSS sprawl)
- Uses **minimal client JavaScript** (islands)
- Separates **public site identity** from **CMS/content API**
- Supports **honest local SEO** without inventing claims
- Resists **XSS, secret leaks, spam forms, and supply-chain junk**

## Non-negotiables (fail the task if you break these)

1. **Static-first.** Default to zero client JS. Add an island only when HTML/CSS cannot do the job.
2. **One design system.** CSS variables + three global stylesheets. No Tailwind / Bootstrap / CSS-in-JS unless the human overrides in writing.
3. **Do not restyle casually.** Propose visual/UX ideas; **apply only after human approval.** Invisible technical work (meta, canonicals, JSON-LD, robots, alt text, internal `href`s) may proceed.
4. **Single source of truth for NAP** (name/address/phone) and nav — one constants module, not copy-pasted strings.
5. **Never invent business facts** (affiliations, founding year, ranks, reviews, certifications). Omit > fabricate.
6. **No rogue lead forms** if the product uses a registered chat/SMS widget path (A2P). Ask before adding forms.
7. **Public `site` URL ≠ CMS URL.** Canonicals/sitemap must use the real public HTTPS host.
8. **Secrets never in the client bundle or git.** Only non-secrets may use `PUBLIC_*`.
9. **Preserve class names** tied to CSS. Renaming wrappers “for SEO” is an architecture failure.
10. **Verify with build + visual spot-check** before claiming done.

## Hats (when working with an SEO campaign)

- **Strategist:** audit, diagnose, plan — may propose visuals.
- **Frontend:** implement invisible SEO and approved copy only.
- Log work; show proposed visual diffs before applying.

## Success definition

A peer agent can open the repo and see:

```
pages compose → layout chrome → sections/components
styles = tokens + global + landing
data = consts + content collections (+ optional CMS at build)
security = no secrets, minimal islands, validated content
SEO = correct site host, robots, sitemap, honest JSON-LD
```
