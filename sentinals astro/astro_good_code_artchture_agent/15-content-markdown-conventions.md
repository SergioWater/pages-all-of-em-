# 15 — Content & markdown conventions

Agents recreating the content layer should follow these rules so pages stay consistent and safe.

## Collection types (typical)

| Collection | Purpose | Notes |
|---|---|---|
| `pages` | Long static pages (about, policies) | Catch-all route optional |
| `blog` | Posts | `[slug].astro` |
| `instructors` | People bios | Homepage cards = short; dedicated page = full |
| `faq` | Q&A | Must match FAQPage schema text if schema exists |
| `testimonials` | Quotes | Render only with existing section classes |
| `galleries` | Photo sets | Prefer filesystem loader over huge markdown |

## Frontmatter shape (markdown)

Keep a shared base:

```yaml
---
title: "Visible title"
slug: url-slug
description: "Optional short summary"
# type: post | page | instructor | faq | testimonial | gallery
---
Body in markdown…
```

Validate with Zod in `content.config.ts`. Reject unknown fields that would encourage schema invention (e.g. fake `rating`).

## Homepage vs deep pages

- Homepage sections: short excerpts, clear CTAs, one job each.
- Deep pages: full copy, still one H1.
- Do not truncate bios on the dedicated instructors route if the product expects full trust content.

## FAQ sync rule

If FAQ text exists both in markdown **and** a section fallback array, change both or remove the fallback. Schema FAQ answers must equal visible answers.

## Images in content

- Prefer files under `public/` with stable paths.
- Alt text unique; include role/context; no keyword stuffing.
- Do not hotlink random third-party images without human approval (privacy + breakage).

## Encoding

Decode HTML entities from CMS titles/bodies before display when the API returns entities (`&amp;` etc.). Use a small library (e.g. `html-entities`) in the loader — not regex hacks.
