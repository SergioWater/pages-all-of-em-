# 20 — Env, build, and deploy notes

## Environment variables

| Variable | Purpose | Public? |
|---|---|---|
| (astro) `site` in config | Canonical/sitemap host | N/A (config) |
| `WP_URL` / CMS base | Build-time content fetch | No |
| `PUBLIC_*` | Browser-visible config only | Yes — non-secrets |

Document required vars in the project README. Provide safe defaults for local dev only when they are non-secret hosts.

## Build pipeline expectations

1. `pnpm install` (lockfile committed)
2. Approve only required native builds (`esbuild`, `sharp`, …)
3. `pnpm run build`
4. Run acceptance checks from `17-acceptance-script.md`
5. Deploy **`dist/`** (or host adapter output) to the public host matching `site`

## Deploy pitfalls

- Deploying dist built with wrong `site` → bad canonicals forever until rebuild
- Pointing DNS at an IP and leaving that IP in `site` → SEO identity bug
- Publishing CMS/staging host as the public site
- Forgetting `public/robots.txt` (must appear in dist)
- Windows photo junction missing on CI → empty gallery or build failure — make CI create the dir or skip gallery hard-fail

## Hosting shape (choose explicitly)

| Shape | Meaning |
|---|---|
| Astro replaces origin | `kenseijudo.com` serves Astro `dist` |
| Astro + CMS behind | Public Astro; CMS on subdomain/IP for API only |
| Old WP still live | Astro SEO fixes do not affect Google until cutover |

Agents must not claim “live SEO fixed” until the public host serves the new `dist`.

## Post-deploy human steps (not agent-blocked coding)

- Google Search Console: property on HTTPS host, submit sitemap
- Confirm live `/robots.txt` and homepage canonical
- GBP website URL matches public host
