# 11 — Scaffold commands & verify

Run from the new project root unless noted. Prefer **pnpm**.

## Create / install

```bash
# If greenfield inside an existing pnpm workspace, add a package folder then:
pnpm install

# Or standalone:
pnpm create astro@latest
# then reshape to the layout in 02-target-folder-layout.md
```

Required scripts in `package.json`:

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "typecheck": "astro check"
  },
  "engines": { "node": ">=24" }
}
```

## Day-to-day

```bash
pnpm run dev          # local server (often http://127.0.0.1:4321)
pnpm run build        # must succeed before handoff
pnpm run preview      # serve dist/
pnpm run typecheck    # if @astrojs/check installed
```

## Post-build verify (mandatory)

After `pnpm run build`, confirm:

```bash
# robots
test -f dist/robots.txt   # Unix
# Windows PowerShell:
Test-Path dist/robots.txt

# sitemap exists (Astro sitemap integration)
Test-Path dist/sitemap-index.xml
# or sitemap-0.xml depending on version/config

# canonical host appears in sitemap (PowerShell)
Select-String -Path dist/sitemap*.xml -Pattern "https://YOUR-PUBLIC-HOST" | Select-Object -First 5

# homepage emitted
Test-Path dist/index.html
```

Manual checks:

1. Open `/` — one H1, nav/footer present, no obvious CSS breakage.
2. View source — JSON-LD script(s) present if you added schema.
3. `<link rel="canonical">` uses `https://YOUR-PUBLIC-HOST/...` not an IP.
4. Off-home page: click a `/#section` nav item — returns to home section.

## Native deps note

Astro image / Vite often need `esbuild` and sometimes `sharp` build scripts approved under pnpm 10+. Approve **only** those natives, not every pending package.
