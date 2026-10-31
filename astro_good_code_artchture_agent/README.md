# Astro good-code architecture agent pack

Location: `D:\001_websites\astro_good_code_artchture_agent`

This folder teaches an AI agent how to build (or remake) a marketing site in the **Astro static-first** style: token CSS, tiny islands, honest SEO, safe data boundaries.

## Start

| Job | Open first |
|---|---|
| **Remake HTML/CSS/JS → Astro** | [`MASTER.md`](./MASTER.md) then this README |
| **Learn / recreate architecture** | [`00-READ-IN-ORDER.md`](./00-READ-IN-ORDER.md) |
| **See what docs exist** | [`PACK-COVERAGE.md`](./PACK-COVERAGE.md) |

Reference implementation (read-only):  
`D:\001_websites\kenseijudoschool\kensei\frontends\astro-website-2`

---

## Tooling assumptions

- **Node** `>=24` (nvm-windows: `nvm use 24.13.0` or newer 24.x)
- **pnpm** (install with `npm install -g pnpm` if needed)
- OS notes for Windows: see `12-windows-pitfalls.md`

---

## Commands — new Astro project (after scaffold)

Run from the **Astro project root** (not from this pack folder).

### Install

```powershell
# ensure Node 24 on PATH, then:
pnpm install
```

If pnpm blocks native builds needed by Astro:

```powershell
pnpm approve-builds esbuild sharp
pnpm rebuild
```

Approve only what you need — not every package.

### Develop

```powershell
pnpm run dev
# often http://127.0.0.1:4321/
# optional:
pnpm exec astro dev --host 127.0.0.1
```

### Build / preview / check

```powershell
pnpm run build
pnpm run preview
pnpm run typecheck
```

Recommended `package.json` scripts:

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "typecheck": "astro check"
  },
  "engines": {
    "node": ">=24"
  }
}
```

### Acceptance after build

1. Copy the script from `17-acceptance-script.md`
2. Set `$hostName = "your-public-domain.com"`
3. Run it in PowerShell from the project root (after `pnpm run build`)

Manual spot checks: homepage look, one H1, canonical host, JSON-LD if expected.

---

## Commands — this documentation pack

No build step. Edit markdown only.

```powershell
cd D:\001_websites\astro_good_code_artchture_agent
Get-ChildItem *.md | Sort-Object Name
```

---

## Migration quick path (HTML → Astro)

1. Follow **`MASTER.md`** phases A→G  
2. Write `MIGRATION-INVENTORY.md` in the new project  
3. Split legacy tree per MASTER §4  
4. Use pack files `02`–`20` for how each layer should look  
5. Handoff with `16-pr-and-handoff.md`

---

## Design / safety rules (short)

- Propose visual changes; **apply only after human approval**
- Invisible SEO/structure work may proceed
- Do not invent business facts for schema
- Do not add rogue lead forms / mystery third-party scripts

Details: `01`, `04`, `06`, `07`.
