# Sergio Aguilar — Portfolio (Operator theme)

A fast, static single-page portfolio. No framework, no build step. Pure HTML/CSS/JS.
Everything is driven by one file: `projects.json`.

## The experience
- **One-line intro**, then a **giant circular wheel of categories** (Trading, AI/CV, Systems, Games, Web).
- **Click a category** → the wheel splits open: other nodes and the center hub fade out, and that
  category's projects slide into the center as a clickable list.
- **Click a project** → a detail modal opens with the full description, tech tags, "What I built"
  highlights, and GitHub / Live Demo buttons.
- **← All categories** or `Esc` returns to the wheel. `Esc` also closes the project modal.

## Theme
Dark "operator" palette — near-black base, **gold** primary accent, **purple** glow accent.
Fonts: Space Grotesk (display) + JetBrains Mono (labels).

## Files
- `index.html` — the single-page wheel experience
- `contact.html` — contact form (opens mail client; no backend)
- `styles.css` — all styling
- `app.js` — data loading, the SVG wheel, split-open animation, project modal
- `projects.json` — **single source of truth** (profile, categories, projects)

## How to add a project
Add an object to the `projects` array in `projects.json`:

```json
{
  "slug": "my-new-project",
  "title": "My New Project",
  "category": "ai",
  "summary": "One-line description shown in the category list.",
  "description": "Longer paragraph shown in the detail modal.",
  "tags": ["Python", "Machine Learning"],
  "visibility": "public",
  "github": "https://github.com/SergioWater/my-repo",
  "demo": "https://my-live-demo.com",
  "highlights": ["Point 1", "Point 2", "Point 3"]
}
```

- `category` must match a category `id` in the `categories` array
  (`trading`, `ai`, `systems`, `games`, `web`).
- Project counts on the wheel update automatically.
- `demo` → if non-empty, a "Live Demo" button appears. Leave `""` to hide it.
- **No images required** — the whole site is text + the wheel.

### Gatekeeping repos with `visibility`
Controls what the detail modal shows for the repo. If omitted, defaults to `public`.

| `visibility` | Row badge | Detail button | Note shown |
|---|---|---|---|
| `"public"` (default) | none | “View on GitHub” → the `github` URL | none |
| `"request"` | 🔒 On request | “Request access” → opens a pre-filled email to you | “Private repository · source available on request” |
| `"private"` | 🔒 Private | none | “Private repository” |

Recommended setup:
- Trading algo → `"request"` (keep the edge private; let people ask).
- Client work (real estate, FPTSports, futsal) → `"request"` or `"public"` pointing at a
  **showcase repo** (README + screenshots + redacted code), with the full code kept in a
  separate private repo.
- Learning / clone projects → `"public"`.

Note: this gates the *link*, not the code. To actually protect a project, make the GitHub repo
private. Never commit API keys/tokens — use `.gitignore` + `.env`, and rotate any key that has
already been pushed.

## Add a new category
Add to the `categories` array (`id`, `label`, `short`, `blurb`). The wheel re-spaces itself
automatically to fit any number of categories.

## Run locally
```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Deploy
Static folder — drop it on Vercel, Netlify, Cloudflare Pages, or GitHub Pages. No build command.
