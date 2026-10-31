# HBK Futsal — Site Maintenance

Plain HTML/CSS/JS. No build step: edit the files, refresh the browser, upload the folder.

```
hbk/
├── index.html        Home (hero intro, squads, spotlights, signings, coaches, schedule, IG, contact)
├── teams.html        Full men's + women's rosters
├── schedule.html     Season fixtures + Nationals schedules
├── coaches.html      Staff profiles
├── programs.html     Skills training, youth pathway, elite squads
├── sponsors.html     Partnership pitch + sponsor wall
├── book-online.html  Booking / contact
├── portal.html       Site map linked from the nav (noindex — never add to sitemap.xml)
├── styles.css        The whole theme
├── sitemap.xml       Public URLs submitted to Google
└── assets/
    ├── logo.svg      Vector master — powers the inline hero animation (kept in sync with it)
    ├── logo.png      Raster logo — nav, footer, favicons, social cards, card watermarks
    └── sponsors/     Sponsor logo files go here
```

## Agency flow (lushessences.com → HBK)

`../index.html` (the Lush Essences client lobby, one folder up) → click **HBK Futsal** →
`portal.html` (site map of this build) → **Open Live Site** → `index.html`.

`portal.html` is marked `noindex` and is deliberately **not** in `sitemap.xml` — keep it that way.

---

## Players

Players live in **two files**, in up to three places:

| Place | File | What it is |
|---|---|---|
| Roster rows | `index.html` (`#team` section) and `teams.html` | `<li>` rows in the two `<ul class="women-squad__roster">` lists (men's and women's) |
| Spotlight cards | `index.html` only | Big photo cards in the `.tier--back` / `.tier--front` grids |

The search box needs no maintenance — it reads whatever rows/cards exist.

### Add a player

1. **Roster row (required)** — in `index.html` **and** `teams.html`, find the right squad list and add, keeping jersey-number order:

   ```html
   <li><span class="num">#12</span><span class="name">New Player</span></li>
   ```

   New signing? Add the badge:

   ```html
   <li><span class="num">#12</span><span class="name">New Player</span><span class="roster-badge">New</span></li>
   ```

   (Use `<span class="num">—</span>` if they have no number yet.)

2. **Spotlight card (optional, men's squad has these)** — in `index.html`, copy an existing `<article class="player">…</article>` card inside the same `.tier` div and change:
   - `src="assets/…"` → their photo file (drop it in `assets/` first)
   - `alt="…"` → "Name — HBK Futsal <role>"
   - `.player__num` → `#12`, `.player__name` → `NEW<br>PLAYER`, `.player__role` → their role
   - If they have **no photo**, use `class="player player--logo"` instead — that variant shows the HBK logo instead of a photo (see the women's cards).

3. Photo tips: portrait crop works best (cards are 3:4). Keep file sizes sane (under ~500 KB). Use lowercase hyphenated names, e.g. `assets/new-player.jpg`.

### Remove a player

Delete their `<li>` row from **both** `index.html` and `teams.html`, and their
`<article class="player">` card from `index.html` if they have one. Search for the
name with Ctrl+F to catch every occurrence. That's it — no other files reference players.

---

## Sponsors

Logo files live in `assets/sponsors/`. Sponsors appear as an infinite right-to-left ticker in **three places** —
the strip under the hero on `index.html`, the "Our Sponsors" section at the bottom of `index.html` (`#sponsor`),
and the "Our Sponsors" section on `sponsors.html`. Each marquee holds one `<ul class="sponsor-marquee__set">` with
one `<li>` per sponsor; a script clones the set automatically to make the loop seamless, so you only ever edit
the set itself. **Update all three copies** — the markup is identical.

### Add a sponsor

1. Drop their logo into `assets/sponsors/` (wide/short wordmarks like `archxsuite.jpeg` work best; light artwork reads best on the dark theme).
2. In all three marquee sets, add one `<li>`:

   ```html
   <li class="sponsor-marquee__slot"><img src="assets/sponsors/acme.png" alt="Acme Co." /></li>
   ```

   Logo baked onto a black background (like `archxsuite.jpeg`)? Add the blend class and the black disappears into the slot:

   ```html
   <li class="sponsor-marquee__slot"><img class="sponsor-wall__img--blend" src="assets/sponsors/acme.jpg" alt="Acme Co." /></li>
   ```

   No logo file yet? Use a text slot:

   ```html
   <li class="sponsor-marquee__slot"><span class="sponsor-wall__name">Their Name</span></li>
   ```

   Or hold the spot with the dashed placeholder:

   ```html
   <li class="sponsor-marquee__slot sponsor-marquee__slot--empty">Your logo here</li>
   ```

3. Link their site: wrap the `<img>` / `<span>` in `<a href="https://their-site.com" target="_blank" rel="noopener">…</a>`.

Logos display in chrome/grayscale and colorize on hover — that's intentional, keep the filter.
The ticker pauses on hover and stands still for reduced-motion visitors.

### Remove a sponsor

Delete its `<li>` from all three marquee sets, and delete the file from `assets/sponsors/`.

---

## Logo assets (don't break these)

- `assets/logo.svg` is the animated/vector master. An **inline copy** of it also lives inside `index.html` (the hero intro, marked `hero__space`). If you ever edit the SVG, update the inline copy to match — there's an HTML comment reminding you. Everywhere else (nav, footer, player-card watermarks) uses the PNG by convention — only the animation uses SVG.
- `assets/logo.png` is the raster used for nav/footer logos, favicons, and link previews.
- The space intro on the home page plays **once per browser session** (a `sessionStorage` flag in the `<head>` script) and is fully skipped for visitors who prefer reduced motion. Don't remove the `intro--play` gating script or it will play on every page load.
