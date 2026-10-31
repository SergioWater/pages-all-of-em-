# Kensei Homepage Redesign: Complete Frontend Handoff

This document compares the current uncommitted homepage redesign against the repository `HEAD`
that existed before the redesign. It is intended for a frontend-focused AI or developer who should
preserve the new conversion funnel and Elfsight reviews integration while restoring selected parts
of the previous visual identity.

## Primary restoration request

Keep the new homepage funnel, real Kensei photography, booking-chat behavior, live schedule,
conversion-focused copy, and Elfsight reviews widget. Restore the strongest visual ideas from the
old homepage, especially the embedded Japanese typography, the hero's richer behavior, and the
high-quality sections that were removed from homepage rendering.

Do not revert the whole patch blindly. Several old components still exist and can be selectively
reintroduced or merged into the new sections.

## Original active homepage order

Before the redesign, `src/pages/index.astro` rendered:

1. `HeroFramed`
2. `Programs`
3. `Premises`
4. `TrialCTA`
5. `Schedule`
6. `Instructors`
7. `Gallery`
8. `Social`
9. `FAQs`
10. `FindUs`
11. `Blog`

`Hero.astro` and `Intro.astro` were present in the repository but commented out. They were not
active homepage sections before this redesign.

## Current active homepage order

The redesign now renders:

1. `HeroFramed`
2. `Belonging`
3. `Reviews`
4. `Proof`
5. `Programs`
6. `WhyKensei`
7. `Instructors`
8. `TrialCTA`
9. `HowItWorks`
10. `Schedule`
11. `FAQs`
12. `FinalCTA`
13. `FindUs`
14. `Blog`

## Old active sections removed from homepage rendering

These components were removed from `src/pages/index.astro`, but their source files and most of
their CSS still exist. They were not deleted.

### 1. `Premises.astro`

The old premises section had a distinctive layered editorial design:

- A full-width, full-bleed photo of the main practice mat.
- A large white/washi information card overlapping the photo.
- Eyebrow text: `The dojo · 道場`.
- Heading: `Judo training in San Jose, California`.
- Detailed facility copy covering:
  - 4,500 square-foot facility.
  - 2,000 square-foot judo practice area.
  - Spring-supported mats.
  - Ventilation.
  - Changing rooms and showers.
  - Parent seating.
  - Children's area.
  - Free Wi-Fi.
  - Parking.
- A vertical facility-spec area showing:
  - `4,500` / `sq ft facility`.
  - `2,000` / `sq ft mat area`.
  - `2` / `changing rooms`.
- A `See the space` disclosure on mobile.
- Two supporting photos below the card: exterior and lounge/dojo view.
- Desktop JavaScript opened the photo disclosure automatically at widths above 960px.

The new `WhyKensei.astro` reuses the mat and lounge photos, but it does not preserve the old
full-bleed image, overlapping museum-card layout, numeric spec column, exterior photo, or the
`The dojo · 道場` typography.

Suggested restoration: merge the old overlapping premises treatment into `WhyKensei` or place a
condensed version immediately before `FindUs`. Avoid duplicating the same facility claims twice.

### 2. `Gallery.astro`

The old homepage gallery had:

- Heading: `From the mat.`
- Supporting copy emphasizing real students and real moments.
- Dynamic counts for total photos and galleries.
- The first 12 real gallery photos.
- A responsive CSS masonry layout.
- Warm, desaturated Kensei photo treatment.
- Fullscreen viewing through `fslightbox`.
- A `More photos` link to `/photos`.
- A `var(--washi-2)` background.

The redesign removed the entire homepage gallery from rendering and redistributed selected photos
throughout the funnel. The `/photos` route and `Gallery.astro` still exist.

Suggested restoration: if desired, reintroduce a compact 4–6 image filmstrip or masonry preview
near the bottom, after the conversion sections. Do not restore all 12 images in the middle of the
funnel unless the performance tradeoff is accepted.

### 3. `Social.astro`

The old social section had one of the more distinctive visual treatments:

- Heading about tournament clips, class photos, and ippon replays.
- Instagram and TikTok handle cards.
- A large phone-shaped media frame.
- A training poster inside the phone.
- A play-button overlay.
- Instagram-style caption and account overlay.
- A Japanese `剣` character used as the profile/avatar dot.
- Responsive behavior that retained the phone design on mobile.

The entire section was removed from homepage rendering. The component and styles remain.

Suggested restoration: reintroduce it near the bottom of the page, potentially between `FindUs`
and `Blog`, or simplify it into a smaller social proof block while preserving the phone mockup and
`剣` avatar detail.

## Hero design changes

### Removed from the active `HeroFramed` design

- The automatic slideshow built from all files in `public/assets/hero/slides`.
- Lazy creation of later slideshow images.
- Six-second crossfade timing.
- Idle-time slideshow initialization.
- Motion-reduction handling associated with the slideshow.
- The live `Next class` card populated from the Google Calendar source.
- The green animated live-status dot.
- Dynamic class label, date, time, and class-access text.
- Hero metadata text:
  - `San Jose, CA`
  - `剣聖柔道`
  - `Est. 2024`
- Original lead copy: `A traditional dojo for kids, juniors, and adults — your first class is on us.`
- Original secondary CTA: `See the schedule`.

### Added to the current hero

- One fixed hero image: `20260626-238A6065.JPG`.
- Metadata text: `Traditional Judo · San Jose, California`.
- Longer confidence/discipline/coordination supporting copy.
- Audience line: `Kids · Juniors · Adults`.
- Three reassurance pills:
  - `No experience needed`.
  - `Loaner judogi provided`.
  - `No commitment`.
- Primary CTA now opens the existing LeadConnector booking chat directly.
- Secondary CTA now scrolls to `Programs`.
- Hero anchor changed from `#top-framed` to `#top`.

### Recommended hero restoration

Restore the slideshow, the live next-class card, and the metadata sequence
`San Jose, CA · 剣聖柔道 · Est. 2024`. Keep the new headline, booking-chat CTA, audience line, and
reassurance content. The old live card and Japanese metadata can coexist with the new funnel copy.

## Japanese typography audit

### Japanese elements removed by the redesign

- `剣聖柔道` was removed from the active framed hero metadata.
- `道場` disappeared from homepage rendering when `Premises.astro` was removed.
- The social phone's `剣` avatar disappeared when `Social.astro` was removed.

### Japanese elements preserved from the old active homepage

- Program-card background glyphs:
  - Kids: `少`.
  - Juniors: `青`.
  - Adults: `道`.
- Trial eyebrow: `体験 · Free trial`.
- Large translucent trial background glyph: `体験`, generated by `.trial::before` in CSS.
- FAQ eyebrow: `FAQ · 質問`.
- FAQ free-trial card glyph: `体験`.
- Location eyebrow: `Visit · 道場へ`.
- Footer brand kanji from `CONTACT.kanji`: `剣聖柔道`.

### Japanese elements added in the redesign

- Belonging: `居場所`.
- Parent reviews: `声`.
- Development/proof: `成長`.
- Programs: `稽古`.
- Kensei difference: `剣聖`.
- Coach authority: `指導`.
- First-visit process: `初日`.
- Schedule: `時間割`.
- Final CTA: `始めよう`.

### Japanese design sources that were already inactive before this redesign

`Hero.astro` contains a stronger alternate Japanese composition, but it was commented out before
the redesign:

- Vertical `柔道` at the hero-panel boundary.
- Vertical rule below the glyph.
- `Scroll · 下へ` cue.
- A right-side washi panel.
- A live class caption over the photograph.

`Intro.astro` was also commented out before the redesign and contains:

- A large red `礼` signoff mark.
- Copy: `Reigi first. Bow on. Bow off. Everything between is practice.`
- Caption: `Entry · 玄関`.
- A layered three-photo collage.

These two components were not removed by this patch, but they are excellent sources for restoring
the Japanese visual identity.

## Program section changes

- Heading changed from `Judo for all ages.` to `Find your program.`.
- Added eyebrow: `Programs · 稽古`.
- Added supporting copy about starting points for every age and level.
- Removed class-day and class-time strings from program cards.
- Rewrote Kids, Juniors, and Adults outcome copy.
- Added five feature bullets to each program card.
- Changed CTA labels to:
  - `Try Kids Judo Free`.
  - `Try Junior Judo Free`.
  - `Try Adult Judo Free`.
- Changed CTA elements from anchor links to buttons opening the existing booking chat.
- Preserved the mobile accordion behavior.
- Preserved the decorative kanji glyphs `少`, `青`, and `道`.
- Removed the per-program image slideshows and all slideshow JavaScript.
- Each card now uses one fixed image.

Suggested restoration: retain the new copy and CTAs, but restore the image crossfades if the
frontend model can do so without loading every full-resolution image at once.

## Instructor section changes

- Anchor changed from `#instructors` to `#coaches`.
- Heading changed from `Learn from black belts.` to `Coached by people who have done it.`.
- Added eyebrow: `Coach authority · 指導`.
- Added longer supporting copy.
- Reduced homepage cards from all instructors to the first two lead instructors.
- Increased biography excerpt length from 160 to 220 characters.
- Removed the invisible full-card link overlay.
- Added a visible `View profile` link to each card.
- CTA changed from `Meet all the Senseis` to `Meet the Coaching Team`.

## Trial section changes

- Main anchor changed from `#trial` to `#free-trial`.
- A hidden `#trial` compatibility anchor remains so old links still work.
- Preserved `体験 · Free trial`.
- Heading changed from `Your first class is on us.` to `Your First Kensei Experience.`.
- Replaced arrival instructions with an offer-stack presentation.
- Expanded the checklist to:
  - Full judo class.
  - Loaner judogi.
  - Beginner introduction.
  - Sensei Q&A.
  - Parent viewing.
- Replaced the simple chat card with a photo-backed offer card.
- Added `Your cost today` and a large `$0` price.
- CTA changed from `Chat with us to book` to `Book My Free Class`.
- Fine print changed to `Kids · Juniors · Adults`.
- Preserved the dark sumi section, red accents, `体験` background glyph, and LeadConnector chat.

## Schedule section changes

- Heading changed from `Upcoming classes.` to `Find a class that works.`.
- Added eyebrow: `Schedule · 時間割`.
- Removed copy claiming membership covers all classes for the age group.
- Added a three-card membership schedule block:
  - Members train three classes per week.
  - Schedule A: Monday, Wednesday, Friday.
  - Schedule B: Tuesday, Thursday, Friday.
- Preserved the existing live Google Calendar schedule island and filters.
- Added a `Book a Free Class` chat button.
- Renamed `Full schedule` to `View Full Schedule`.
- Preserved Google Calendar and directions links.

## FAQ changes

- Main anchor changed from `#faqs` to `#faq`.
- A hidden `#faqs` compatibility anchor remains.
- Heading changed from `Frequently asked questions.` to `Questions before your first class?`.
- Supporting copy now points visitors toward email or booking chat.
- Preserved `FAQ · 質問` and the `体験` card glyph.
- Free-trial card copy changed from `No card, no commitment` to
  `Loaner judogi provided · no obligation`.
- Free-trial arrow changed from an anchor to a chat-opening button.
- FAQ ordering was changed to prioritize conversion questions.
- Existing FAQ files were updated for beginner friendliness, safety, first-class clothing/water,
  parent viewing, adult fitness, and differences from other martial arts.
- Added new FAQ files for:
  - Three-classes-per-week membership.
  - Whether competition is required.
  - What happens after the free class.

## Navigation changes

Original primary navigation:

- Programs.
- About.
- Schedule route.
- Gallery.
- Instructors.
- Visit.
- Journal.
- Contact chat.
- Free trial link.

Current primary navigation:

- Programs.
- Coaches.
- Schedule homepage anchor.
- FAQ homepage anchor.
- Visit.
- Free class chat button.

About, Gallery, Journal, and Free class links were added to the footer instead. The mobile checkbox
menu behavior was preserved.

## Location and journal changes

- Location heading changed from `Visit us.` to `Visit Kensei.`.
- Added an email action beside directions and phone.
- Preserved `Visit · 道場へ`, address, hours, transit, parking, and lazy map behavior.
- Journal anchor changed from `#blog` to `#journal`.
- Journal CTA changed from `All posts` to `Visit the Journal`.

## New sections added

### `Belonging.astro`

- Four-photo editorial collage.
- Eyebrow: `Belonging · 居場所`.
- Heading: `A place to learn, train, and grow.`.
- Real Kensei images only.

### `Reviews.astro` and `GoogleReviews.astro`

- Reviews section immediately after Belonging.
- Eyebrow: `Parent reviews · 声`.
- Elfsight platform script loaded asynchronously.
- Widget app ID: `723893a3-f157-4abd-964e-b450bc81787b`.
- Optional public override through `PUBLIC_ELFSIGHT_GOOGLE_REVIEWS_APP_ID`.
- Widget uses `data-elfsight-app-lazy`.

### `Proof.astro`

- Eyebrow: `Development · 成長`.
- Four proof cards for coaching, podium finishes, facility size, and spring-supported floor.
- Tournament image and non-competition-only caption.

### `WhyKensei.astro`

- Eyebrow: `The Kensei difference · 剣聖`.
- Six numbered feature cards.
- Two facility photos.
- Reuses some content and images formerly emphasized by `Premises.astro`, but not its layout.

### `HowItWorks.astro`

- Eyebrow: `Your first visit · 初日`.
- Six numbered process cards.
- Booking-chat CTA.

### `FinalCTA.astro`

- Dark full-width CTA section.
- Eyebrow: `Ready when you are · 始めよう`.
- Emotional class image.
- Reassurance row and booking-chat CTA.

## Styling changes

No design tokens, fonts, palette values, or existing section styles were deleted. Approximately 640
lines of scoped funnel CSS were appended to `src/styles/landing.css`.

The new CSS adds:

- Scroll offsets for all new homepage anchors.
- Compatibility-anchor positioning.
- Hero audience text and reassurance pills.
- Twelve-column Belonging photo collage.
- Reviews widget containment.
- Proof statistics and image layout.
- Program feature-list styling.
- Why Kensei card and facility-photo grid.
- Visible instructor profile links.
- Trial offer image and `$0` price treatment.
- Six-step card grid.
- Membership schedule cards.
- Final CTA split layout.
- Footer exploration links.
- Responsive behavior at 960px and 640px.

`src/styles/global.css` received only a small rule ensuring the new navigation CTA button has no
bottom border. Existing Premises, Gallery, Social, slideshow, Japanese typography, and alternate
hero styles remain in the stylesheets and can be reused.

## Nonvisual and documentation changes

- Added `.env.example` with the Elfsight public app ID.
- Added README instructions for overriding the Elfsight app ID.
- Reformatted `ScheduleIsland.tsx` and `calendar.ts` only to make the repository's Prettier check
  pass; these two files received no behavioral change.
- Lint, format check, typecheck, and production build passed after the redesign.

## Files created by the redesign

- `frontends/astro-website-2/.env.example`
- `frontends/astro-website-2/src/components/GoogleReviews.astro`
- `frontends/astro-website-2/src/sections/Belonging.astro`
- `frontends/astro-website-2/src/sections/Reviews.astro`
- `frontends/astro-website-2/src/sections/Proof.astro`
- `frontends/astro-website-2/src/sections/WhyKensei.astro`
- `frontends/astro-website-2/src/sections/HowItWorks.astro`
- `frontends/astro-website-2/src/sections/FinalCTA.astro`
- `frontends/astro-website-2/src/content/faq/how-many-classes-do-members-attend.md`
- `frontends/astro-website-2/src/content/faq/does-my-child-have-to-compete.md`
- `frontends/astro-website-2/src/content/faq/what-happens-after-the-free-class.md`

## Files modified by the redesign

- `frontends/astro-website-2/README.md`
- `frontends/astro-website-2/src/pages/index.astro`
- `frontends/astro-website-2/src/components/Nav.astro`
- `frontends/astro-website-2/src/components/Footer.astro`
- `frontends/astro-website-2/src/components/ScheduleIsland.tsx` (format only)
- `frontends/astro-website-2/src/consts.ts`
- `frontends/astro-website-2/src/lib/schema.ts`
- `frontends/astro-website-2/src/lib/calendar.ts` (format only)
- `frontends/astro-website-2/src/sections/HeroFramed.astro`
- `frontends/astro-website-2/src/sections/Programs.astro`
- `frontends/astro-website-2/src/sections/Instructors.astro`
- `frontends/astro-website-2/src/sections/TrialCTA.astro`
- `frontends/astro-website-2/src/sections/Schedule.astro`
- `frontends/astro-website-2/src/sections/FAQs.astro`
- `frontends/astro-website-2/src/sections/FindUs.astro`
- `frontends/astro-website-2/src/sections/Blog.astro`
- `frontends/astro-website-2/src/styles/global.css`
- `frontends/astro-website-2/src/styles/landing.css`
- `frontends/astro-website-2/src/content/faq/is-kensei-judo-suitable-for-beginners.md`
- `frontends/astro-website-2/src/content/faq/is-judo-safe.md`
- `frontends/astro-website-2/src/content/faq/what-should-my-child-wear-to-class.md`
- `frontends/astro-website-2/src/content/faq/can-parents-stay-help-or-coach-during-class.md`
- `frontends/astro-website-2/src/content/faq/am-i-too-old-or-not-fit-enough-for-judo.md`
- `frontends/astro-website-2/src/content/faq/how-is-judo-different-from-other-martial-arts.md`

## Recommended implementation brief for the next frontend model

1. Do not remove the Elfsight reviews section or change its app ID.
2. Keep the new funnel order unless there is a clear UX reason to adjust it.
3. Restore `剣聖柔道` in the hero metadata.
4. Restore the framed hero slideshow and live next-class card using the existing calendar helpers.
5. Consider borrowing `柔道`, `Scroll · 下へ`, and the vertical Japanese composition from the
   currently unused `Hero.astro` without replacing the active framed hero wholesale.
6. Restore the strongest parts of `Premises.astro`: full-bleed photo, overlapping card,
   `The dojo · 道場`, and facility stat column. Merge it with `WhyKensei` or place it near Visit to
   avoid duplicate content.
7. Restore the social phone design and its `剣` avatar near the bottom of the funnel.
8. Optionally restore a compact Gallery preview near the bottom; keep the full Gallery route.
9. Preserve existing Japanese elements and use them as large compositional marks, not only small
   eyebrow translations.
10. Preserve the existing Kensei palette, Shippori Mincho display type, Inter body type, washi/sumi
    backgrounds, restrained red accents, paper texture, and current responsive breakpoints.
11. Keep all major free-class actions connected to the existing LeadConnector chat widget.
12. Re-run lint, format check, typecheck, and production build after visual restoration.
