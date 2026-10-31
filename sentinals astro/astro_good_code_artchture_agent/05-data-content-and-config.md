# 05 — Data, content, and config

## Split two URLs

| Knob | Role | Example |
|---|---|---|
| `astro.config.mjs` `site` | Public host for canonicals, OG, sitemap | `https://example.com` |
| `WP_URL` / `cmsBase()` | Build-time content API | `https://cms.example.com` |

**Never** set `site` to a staging IP. That poisons SEO identity.

Helper pattern:

```ts
export function cmsBase(): string {
  const raw = process.env.WP_URL || "https://cms.example.com";
  return String(raw).replace(/\/$/, "");
}
```

## `consts.ts` — single source of truth

Export:

- `CONTACT` (name, street, city, region, postal, phone, socials)
- `NAV_ITEMS` / `FOOTER_LINKS` (root-relative hrefs like `/#programs`, `/instructors`)
- `SITE_DESCRIPTION` and related SEO strings

All sections/schema/footer must import these — do not hardcode NAP in five files.

## Content collections

Use Astro content layer + Zod:

- Local markdown under `src/content/`
- Optional loaders that `fetch` CMS REST at build, then validate with Zod
- Log public `SITE` and CMS base at build for operator clarity

If CMS is unreachable: fail soft for optional collections (fallback copy) or fail hard for required ones — decide explicitly; do not silently ship empty critical pages.

## Gallery / media

Large photo trees may live outside the package (e.g. `media/photos`) with `public/photos` as a directory or junction. On Windows, git symlinks often become text files — recreate as a real directory/junction before build.

## JSON-LD data

Build objects in `lib/schema.ts` from `CONTACT` + on-page FAQ text.

Allowed when confirmed:

- `LocalBusiness` (or agreed subtype)
- `WebSite`
- `FAQPage` matching visible FAQs

Not allowed without human confirmation:

- `aggregateRating` / reviews
- `foundingDate`
- `memberOf` affiliations
- Instructor `Person` credentials you cannot prove

Emit via a tiny `JsonLd.astro` in `<head>` — never style schema.

## Env hygiene

| Var | Browser-visible? |
|---|---|
| `PUBLIC_*` | Yes — non-secrets only |
| `WP_URL` / private tokens | No — build/server only |

Do not commit `.env` with secrets. Document required vars in README.
