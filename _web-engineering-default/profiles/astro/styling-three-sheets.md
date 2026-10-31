# Styling — the three-sheet system

Provenance: identical architecture in kensei-2 and sentinals; codified in
ASTRO-ARCHITECTURE.md §3 and AGENT-CODING-GUIDE rules 2–6.

## The sheets, in load order

1. `src/styles/colors_and_type.css` — tokens ONLY: brand palette +
   semantic aliases (`--bg --fg --accent --border`), font stacks, type scale
   (1.25 ratio, `--fs-*`), 4px spacing scale (`--space-*`), radii, shadows,
   motion tokens (`--ease-out`, `--dur-*`), element defaults with
   `clamp()` fluid type.
2. `src/styles/global.css` — chrome/reset: container, nav, footer, buttons,
   forms, `.visually-hidden` utility.
3. `src/styles/landing.css` — page sections (largest file; edit surgically).

## Rules

- Plain global CSS only. No Tailwind / CSS modules / styled-components /
  Bootstrap / new token files (documented damage when violated).
- Components reuse wired class names; new classes must fit the existing
  naming texture of their sheet.
- Scoped `<style>` blocks appear only at page level for CMS-rendered HTML,
  using `:global()` selectors for injected content. Zero scoped styles is
  also fine (sentinals).
- Breakpoints: follow the project's established set (kensei: 960/560px).
  Introducing a sixth breakpoint value needs justification — sentinals'
  mixed 480–901px set is flagged as inconsistency debt, not a model.
- Motion: respect `prefers-reduced-motion` with a kill-switch block
  (landing.css pattern: zero out animations/transitions/scroll-behavior).
- Dark mode: none anywhere (deliberate so far). Do not add unilaterally.

## Recovery protocol

If styling breaks: restore the three sheets from git, restore class-churned
section files, re-apply only invisible work + approved copy. See
core/change-classes.md hard prohibitions.
