# 19 — Island (Solid) patterns

Astro owns the page. Solid owns **one interactive widget**.

## When to create an island

See decision tree `13` §A. Typical yes: accordion, lightbox, modal dialog, client-only gallery.

## File naming

- `FaqsIsland.tsx`, `GalleryIsland.tsx`, `ModalIsland.tsx`
- Keep island files under `src/components/` (or `components/<feature>/`)
- Companion `.astro` section passes **serializable props** only

## Hydration directives

| Directive | Use |
|---|---|
| `client:visible` | Hydrate when scrolled into view (FAQ) |
| `client:idle` | After main thread idle |
| `client:load` | ASAP — avoid unless required |
| `client:only="solid-js"` | No SSR for this island (gallery needing `window`) |

## Solid basics (not React)

```tsx
import { createSignal, For } from "solid-js";

export default function FaqsIsland(props: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = createSignal(0);
  return (
    <ul>
      <For each={props.items}>
        {(item, i) => (
          <li>
            <button type="button" onClick={() => setOpen(i())}>{item.q}</button>
            {open() === i() ? <div>{item.a}</div> : null}
          </li>
        )}
      </For>
    </ul>
  );
}
```

- State: `createSignal`, not `useState`
- Lists: `<For>`, not `.map` alone (Solid tracking)
- Do not import React

## Styling islands

Prefer **global classes** already in `landing.css` / `global.css` so the island does not invent a second look. Pass `class` names from the Astro parent when possible.

## Security

- Props must be plain data from trusted build-time sources
- Avoid `innerHTML` in islands; if unavoidable, only on sanitized/trusted SVG/icon helpers you control
- Do not fetch secrets from the browser inside an island
