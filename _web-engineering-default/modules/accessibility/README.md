# Module — Accessibility

Owns WCAG-oriented static checks and rules. Deeper evidence: axe/Lighthouse
a11y category (module lighthouse produces it).

## Known workspace gaps (from 2026-08 mining — fix on touch)

- No skip-to-content links anywhere (A11Y-SKIP-001 fires today).
- Hover-only dropdown menus without keyboard support (sentinals nav).
- `outline:none` on inputs without replacement focus indicator (kensei css).
- Mobile menu toggle missing aria-expanded sync.

## Rules

| ID | Requirement |
|---|---|
| A11Y-SKIP-001 | Every page offers a skip-to-content link as first focusable element |
| A11Y-LANG-001 | html[lang] present (detector live) |
| A11Y-FORM-001 | All inputs labeled (label[for]/aria-label) (detector live) |
| A11Y-FRAME-001 | iframes carry title (detector live) |
| A11Y-LINKNAME-001 | Icon-only links have accessible names (detector live) |
| A11Y-FOCUS-001 | Visible focus indicators; no bare outline removal |
| A11Y-MENU-001 | Menus operable by keyboard; toggle buttons sync aria-expanded |

Detectors marked "live" run in `checks/a11y_static.py` today; others are
manual-review items until promoted with detectors (Curator backlog).
