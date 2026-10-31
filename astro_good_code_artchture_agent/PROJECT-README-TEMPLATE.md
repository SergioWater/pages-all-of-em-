# Project README template (drop into the new Astro app)

Copy this file to the **new Astro project root** as `README.md` (or merge into an existing one). Replace placeholders.

```md
# <Project name>

Astro marketing site remake. Architecture governed by:

`D:\001_websites\astro_good_code_artchture_agent` (read MASTER.md + 00-READ-IN-ORDER.md)

## Requirements

- Node >= 24
- pnpm

## Setup

pnpm install

## Commands

| Command | What it does |
|---|---|
| `pnpm run dev` | Local dev server |
| `pnpm run build` | Production build → `dist/` |
| `pnpm run preview` | Serve `dist/` locally |
| `pnpm run typecheck` | `astro check` |

## Config

- Public site host: set `site` in `astro.config.mjs` to `https://<PUBLIC_HOST>`
- CMS/API (optional): `WP_URL` / see `src/lib/cms-url.ts` — **not** the public `site`

## Migration

See `MIGRATION-INVENTORY.md` in this repo (created during remake).

## Deploy

Upload/serve `dist/` on the public host that matches `site`. Then submit sitemap in Search Console.
```

Agents: after scaffolding, write this README into the destination project so humans have commands without opening the pack.
