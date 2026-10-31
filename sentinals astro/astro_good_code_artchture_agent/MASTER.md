# MASTER — HTML/CSS/JS site → Astro remake

**Audience:** AI agents remaking an existing static (or lightly scripted) HTML/CSS/JS site into the architecture defined by this pack.

**Pack root:** `D:\001_websites\astro_good_code_artchture_agent`

**Commands:** see `README.md` (human + agent). Do not invent alternate package managers unless the human overrides.

---

## 0. Start here (agent boot sequence)

1. Read **this file** (`MASTER.md`) end-to-end.
2. Read `README.md` (commands + verify).
3. Read pack docs in order from `00-READ-IN-ORDER.md` (`01` → `20`, then coverage map).
4. Inventory the **source site** (legacy HTML/CSS/JS server or folder) — write `MIGRATION-INVENTORY.md` in the **new Astro project** (not in this pack) using the template in §3.
5. Propose the **split map** (§4) to the human if anything is ambiguous (especially visual redesign).
6. Scaffold Astro per `02` + `08` + `14`.
7. Migrate in the phase order in §5. Never “convert everything to React.”
8. Verify with `11` + `17` + `README.md` commands.
9. Handoff with `16-pr-and-handoff.md`.

Cite pack files when you decide (“Per `04`, CSS stays token+global”).

---

## 1. Goal of the remake

Turn:

```text
legacy/
  index.html, about.html, …
  css/*.css
  js/*.js
  images/…
  (optional simple static server)
```

Into:

```text
astro-project/
  public/          ← static assets (robots, images, fonts you keep as files)
  src/pages/       ← routes (ex-HTML pages)
  src/layouts/     ← shared chrome (ex-repeated header/footer)
  src/sections/    ← homepage blocks (ex-index sections)
  src/components/  ← reusable bits + islands
  src/styles/      ← colors_and_type.css, global.css, landing.css
  src/consts.ts    ← NAP, nav, shared strings
  src/content/     ← long copy pulled out of HTML
  src/lib/         ← helpers (schema, cms url, …)
```

Success = same (or human-approved) look, better structure, static-first Astro, honest SEO identity, minimal JS islands.

---

## 2. Non-negotiables during migration

From `01`, `04`, `06`, `09` — short form:

| Rule | Migration meaning |
|---|---|
| Static-first | Most legacy JS dies or becomes one island |
| Three CSS sheets + tokens | Do **not** dump all legacy CSS as 40 unrelated files; consolidate into the 3-sheet system (may take phases) |
| No casual restyle | Pixel changes need human approval; structure moves are OK if classes/look preserved |
| NAP once | Scrape phone/address into `consts.ts` |
| No secret/`PUBLIC_` abuse | Don’t put server keys in front-end |
| No fake schema | Only mark up confirmed facts |
| One H1 per page | Fix legacy multi-H1 while migrating if present — note it in handoff |

---

## 3. Inventory template (create in the new project)

Save as `MIGRATION-INVENTORY.md` next to the new Astro `package.json`:

```md
# Migration inventory

## Source
- Path:
- How served today: (static files / nginx / live-server / other)
- Public URL (if any):

## Pages (every HTML entry)
| Legacy file | Proposed Astro route | Notes |
|---|---|---|
| index.html | src/pages/index.astro + sections/* | |
| about.html | src/pages/about.astro or content/pages | |

## CSS
| Legacy file | Destination sheet | Action |
|---|---|---|
| styles.css | colors_and_type / global / landing | split tokens vs layout |

## JS
| Legacy file | Keep? | As island / script / delete |
|---|---|---|
| menu.js | yes | small island or layout script |
| slider.js | maybe | GalleryIsland or CSS-only |

## Assets
| Path | Goes to |
|---|---|
| images/hero.jpg | public/assets/… |

## Third parties
| Script | Approved to keep? |
|---|---|
| analytics / chat / fonts | ask human |

## Facts to confirm
- NAP:
- Social URLs:
- Affiliations / reviews: (omit until confirmed)
```

Do not start bulk file moves until this inventory exists.

---

## 4. How to split the legacy directory

### 4.1 Pages → `src/pages/` + `src/sections/`

| Legacy pattern | Astro destination |
|---|---|
| Full HTML document | Layout + page; strip duplicated `<head>`/`<header>`/`<footer>` |
| Homepage long scroll | `pages/index.astro` **composes** `sections/*.astro` (one section ≈ one legacy `<section id=…>`) |
| Inner page | `pages/<name>.astro` or `content/pages` + `[...slug].astro` |
| Repeated header/nav/footer | `layouts/BaseLayout.astro` + `components/Nav.astro` + `Footer.astro` |
| `<head>` meta/title | `components/BaseHead.astro` (canonical from `Astro.site`) |

### 4.2 CSS → `src/styles/` (three sheets)

| Kind of rule | Sheet |
|---|---|
| `:root` colors, fonts, type scale | `colors_and_type.css` |
| reset, body, nav, footer, buttons, forms | `global.css` |
| homepage / marketing section layouts | `landing.css` |

**Migration tactic:**  
Phase 1 — import legacy CSS unchanged from layout (temporary) so look doesn’t break.  
Phase 2 — split into the three sheets **without visual change** (human may still want a quick approve if risky).  
Phase 3 — tokenise hard-coded colors to `var(--…)`.

Do not introduce Tailwind during remake unless human overrides the pack.

### 4.3 JS → islands / delete / tiny scripts

| Legacy JS | Decision |
|---|---|
| Mobile nav toggle | Prefer CSS/`details` or one small island (`13` decision tree) |
| Accordion / FAQ | `*Island.tsx` + `client:visible` (`19`) |
| Lightbox / gallery | island + `client:only` if needs `window` |
| jQuery soup for trivial DOM | Delete; replace with HTML/CSS |
| Form posts to random endpoints | Stop — compliance/`06`; ask human |
| Analytics/chat widgets | Keep only if human approved; document in layout |

### 4.4 Images / fonts / downloads → `public/`

| Legacy | Astro |
|---|---|
| `images/`, `img/`, `assets/` | `public/assets/` (or keep structure under `public/`) |
| Gallery folders | `public/photos/…` (real directory; see Windows junction notes in `12`) |
| Favicon | `public/` |
| Something that must be processed by Astro assets pipeline | `src/assets/` only if you intentionally use `astro:assets` — default pack prefers `public/` for marketing sites |

### 4.5 Copy → `src/content/` + `consts.ts`

| Legacy | Astro |
|---|---|
| Phone/address repeated in HTML | `src/consts.ts` `CONTACT` |
| Nav labels/hrefs | `NAV_ITEMS` / `FOOTER_LINKS` |
| Blog posts / long about / FAQs in HTML | `src/content/**/*.md` (`15`) |
| One-off marketing blurbs in sections | OK in section `.astro` if short |

### 4.6 SEO / crawl files

| Legacy | Astro |
|---|---|
| Missing/wrong `robots.txt` | `public/robots.txt` → sitemap on **public** host (`07`) |
| No sitemap / hand sitemap | `@astrojs/sitemap` + correct `site` in `astro.config.mjs` |
| Meta tags per page | `BaseHead` + page props |
| Nothing structured | `lib/schema.ts` + `JsonLd.astro` from confirmed NAP/FAQs |

### 4.7 Server

| Legacy “server” | Remake approach |
|---|---|
| `live-server` / `npx serve` static | Astro `pnpm dev` / `pnpm build` → host `dist/` |
| Express only to `sendFile` HTML | Replace with static host of `dist/` |
| Express with APIs | Keep APIs separate; Astro does not become your API server by default |
| PHP includes | Become layouts/partials/content collections |

---

## 5. Phase plan (execute in order)

### Phase A — Scaffold (no content yet)

- [ ] New package folder (name agreed with human)
- [ ] `package.json` scripts from `README.md`
- [ ] `astro.config.mjs` with `site: "https://PUBLIC-HOST"`
- [ ] Empty `src/styles` three files + `BaseLayout` importing them
- [ ] `public/robots.txt`
- Commands: `README.md` → Install + Dev

### Phase B — Chrome parity

- [ ] Port header/nav/footer into `Nav` / `Footer` / `BaseLayout`
- [ ] Port global CSS into `global.css` (+ tokens started in `colors_and_type.css`)
- [ ] `consts.ts` NAP + nav
- Visual: should match legacy chrome; if not, stop and propose

### Phase C — Homepage split

- [ ] Map each homepage `<section>` → `src/sections/*.astro`
- [ ] `index.astro` only composes sections
- [ ] Section CSS → `landing.css`
- [ ] Replace legacy homepage JS with islands only where required (`19`)

### Phase D — Inner pages

- [ ] One Astro page (or content entry) per legacy HTML page
- [ ] Shared layout; unique title/description props
- [ ] Fix internal links to root-relative (`18`)

### Phase E — Content extraction

- [ ] Move long copy to markdown collections
- [ ] Zod schemas in `content.config.ts`
- [ ] Optional CMS URL helper if human still has WP/API (`05`)

### Phase F — SEO + security pass

- [ ] Canonical host correct (not IP)
- [ ] JSON-LD honest only
- [ ] Alt text; one H1; sitemap build output
- [ ] Remove leftover legacy JS that exfils or duplicates forms (`06`)

### Phase G — Accept + handoff

- [ ] `pnpm run build`
- [ ] Run acceptance script (`17`) with real host
- [ ] Fill handoff (`16`)
- [ ] Human: deploy `dist/`, GSC sitemap (agent does not claim live fixed until cutover — `20`)

---

## 6. Which pack file answers which migration question?

| Question | Read |
|---|---|
| May I change the look? | `01`, `04`, `13` |
| Where does this file go? | this MASTER §4, `02` |
| How do pages/islands work? | `03`, `19` |
| How do we style? | `04`, `14` |
| NAP / CMS / env? | `05`, `20` |
| XSS / forms / malice? | `06` |
| robots/sitemap/schema? | `07`, `10` |
| Exact execute order? | `08`, this MASTER §5 |
| What not to do? | `09` |
| Commands? | `README.md`, `11` |
| Windows symlink/photos? | `12` |
| Nav/routes? | `18` |
| Deploy? | `20` |

---

## 7. Definition of done

- Legacy page list ⊆ Astro routes (or explicitly deferred in handoff)
- No dependency on the old static server for production
- `pnpm run build` produces `dist/` with robots + sitemap on public host
- JS surface ≤ islands + approved third parties
- CSS lives in the three-sheet architecture (legacy dump only as temporary Phase A/B bridge, removed before done)
- Handoff lists human confirmations still open

---

## 8. Prompt snippet (paste to another agent)

```text
Read D:\001_websites\astro_good_code_artchture_agent\MASTER.md and README.md first,
then 00-READ-IN-ORDER.md and the listed docs. Remake the legacy site at <SOURCE_PATH>
into a new Astro project at <DEST_PATH> using the MASTER split map and phases.
Propose visual changes; do not apply them until I approve. Prefer invisible structure
moves. Use README commands. Log inventory as MIGRATION-INVENTORY.md in the new project.
```
