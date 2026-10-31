# 08 — Recreate checklist (agent execution order)

Use this as your runbook when creating a new Astro site in this architecture.

## Phase A — Scaffold

- [ ] Create folder layout from `02-target-folder-layout.md`
- [ ] `package.json` with Astro 5.x, `@astrojs/sitemap`, content/mdx as needed, island framework
- [ ] `astro.config.mjs` with correct `site`
- [ ] Node engine note (`>=24` if matching reference)

## Phase B — Styling spine

- [ ] Add `colors_and_type.css`, `global.css`, `landing.css`
- [ ] Import all three from `BaseLayout` / `BaseHead`
- [ ] Define tokens before writing section CSS
- [ ] **Stop** and get human approval before inventing a new visual direction

## Phase C — Chrome

- [ ] `BaseHead.astro` (charset, viewport, canonical from `Astro.site`, title, description, OG)
- [ ] `BaseLayout.astro` with Nav, `<main><slot /></main>`, Footer
- [ ] `consts.ts` NAP + nav

## Phase D — Pages

- [ ] `index.astro` composes sections only
- [ ] Secondary routes: schedule, instructors, blog, legal as needed
- [ ] One H1 per page

## Phase E — Content

- [ ] Collections + Zod in `content.config.ts`
- [ ] Local markdown samples
- [ ] Optional CMS loader via separate base URL helper

## Phase F — Islands (only if needed)

- [ ] FAQ/gallery/modal as islands
- [ ] `client:visible` / `client:only` deliberately chosen
- [ ] No full-app hydration

## Phase G — SEO + security

- [ ] `robots.txt` + sitemap
- [ ] JSON-LD from confirmed facts only
- [ ] No secrets in repo/client
- [ ] No extra lead forms without approval
- [ ] Review any `set:html` / `innerHTML`

## Phase H — Verify

- [ ] `pnpm build` / `astro build` succeeds
- [ ] Spot-check home on desktop + mobile
- [ ] Confirm sitemap host + canonical host
- [ ] Write a short handoff note: what was created, what needs human facts

## Stop conditions

Stop and ask the human if:

- NAP / affiliation / reviews are unknown
- A visual redesign seems required for the goal
- A new third-party script seems required
- CMS HTML must be rendered unsafely to “make it work”
