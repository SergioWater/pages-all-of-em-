# Golden Pattern — three-sheet-tokens

Classification: PROVEN GOOD · Framework: astro
Source: `kensei-2/src/styles/colors_and_type.css` (model file), load order from BaseLayout

Token-first styling: every design decision resolves to a custom property.

```css
:root {
  --bg: var(--washi); --fg: var(--sumi); --accent: var(--kensei-red);
  --font-display: "Shippori Mincho", serif;
  --fs-16: 1rem; /* 1.25-ratio scale --fs-12..--fs-96 */
  --space-4: calc(4 * var(--space-unit));   /* 4px scale */
  --ease-out: cubic-bezier(.22,.61,.36,1); --dur-base: .25s;
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important; transition-duration: .01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Load order in BaseLayout frontmatter: colors_and_type → global → landing.
New classes fit the existing texture of their sheet; raw hex/px in section
rules are a smell — find the token first (ASTRO-CSS-001).
