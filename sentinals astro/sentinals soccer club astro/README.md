# Sentinels Soccer Club (Astro)

Astro marketing site remake. Architecture governed by:

`D:\001_websites\sentinals astro\astro_good_code_artchture_agent` (read MASTER.md + 00-READ-IN-ORDER.md)

## Requirements

- Node >= 24 (local may warn on Node 22; prefer 24.x)
- pnpm

## Setup

```powershell
pnpm install
# if needed:
pnpm approve-builds esbuild sharp
pnpm rebuild
```

## Commands

| Command | What it does |
|---|---|
| `pnpm run dev` | Local dev server |
| `pnpm run build` | Production build → `dist/` |
| `pnpm run preview` | Serve `dist/` locally |
| `pnpm run typecheck` | `astro check` |

## Config

- Public site host: `https://sentinelssoccerclub.com` (`astro.config.mjs` `site`)
- CMS/API (optional): `WP_URL` / see `src/lib/cms-url.ts` — **not** the public `site`

## Migration

See `MIGRATION-INVENTORY.md` in this repo.

## Deploy

Upload/serve `dist/` on the public host that matches `site`. Then submit sitemap in Search Console.
