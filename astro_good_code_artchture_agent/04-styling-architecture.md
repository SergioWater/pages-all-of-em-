# 04 — Styling architecture

## System

**Token-first global CSS.** Three files, imported from the layout/head:

1. `colors_and_type.css` — `:root` variables (color, type, spacing tokens)
2. `global.css` — base elements, nav, footer, shared controls
3. `landing.css` — homepage/section layouts

No Tailwind. No CSS Modules. No styled-components. No second token file “just for SEO.”

## Token examples (pattern)

```css
:root {
  --brand: #b23a2c;
  --ink: #14110f;
  --paper: #faf7f2;
  --bg: var(--paper);
  --fg: var(--ink);
  /* type, space, radii… */
}
```

Components use **classes** that consume tokens via the global sheets.

## Class stability

Section wrappers like `hero-photo-section`, `instructor-grid`, `faqs`, `findus`, `container`, `section-head` are part of the architecture. Renaming them breaks CSS. For SEO, add attributes/text — **keep classes**.

## Allowed style edits

| Edit | Allowed? |
|---|---|
| Change visible text nodes | Yes (copy may need approval) |
| Change `href` / `alt` / meta | Yes |
| Add JSON-LD in `<head>` | Yes |
| Reformat/reorganize CSS files | **No** |
| New design tokens / fonts / colors | **Proposal only** |
| New card grid “for SEO” | **Proposal only** |
| Scoped `<style>` tiny reset already used in file | OK if matching existing pattern |
| Large inline `style=""` layouts | **No** |

## Fonts

If loading webfonts, prefer a single import in the token sheet. Be aware third-party font CDNs receive visitor IPs (privacy — see `06`).

## When visuals must change

1. Describe the change + why + expected impact.
2. Wait for human “yes.”
3. Implement the smallest CSS/markup delta.
4. Spot-check desktop + mobile.

## Recovery

If styling breaks: restore the three CSS files + section class names from git, then re-apply only invisible/approved text changes.
