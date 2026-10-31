# CODING STANDARDS
## Client Booking Website Template
### Stack: Next.js + Tailwind CSS + Cal.com + Cloudinary + Vercel

This document defines the rules every developer and AI code writer must follow
for this project. These rules exist to prevent hydration errors, broken mobile
layouts, slow load times, and deployment failures. Read this before writing
a single line of code.

---

## 1. PROJECT OVERVIEW

This is a one-page, dark-themed, mobile-first booking website template for
local service businesses. It is cloned and rebranded per client. Each client
gets their own accent color, content, Cloudinary folder, and Cal.com calendar.

**Sections (in order):**
1. Hero
2. Services + Pricing
3. Gallery (images + videos)
4. Reviews
5. Booking (Cal.com embed)
6. Footer

---

## 2. HYDRATION RULES — NON-NEGOTIABLE

Hydration errors occur when the server-rendered HTML does not match what React
renders on the client. These will break the hero image on mobile and cause
invisible failures. Follow every rule below without exception.

### 2.1 Never Access Browser APIs at the Top Level

Browser APIs (`window`, `document`, `navigator`, `localStorage`) do not exist
on the server. Accessing them outside of a `useEffect` will cause a hydration
error and a crash.

```js
// WRONG — will crash on server render
const width = window.innerWidth

// RIGHT — safe, runs only in the browser
const [width, setWidth] = useState(0)
useEffect(() => {
  setWidth(window.innerWidth)
}, [])
```

### 2.2 Never Use Math.random() or Date.now() During Render

These return different values on the server vs the client, causing a mismatch.

```js
// WRONG
const id = Math.random()
const timestamp = Date.now()

// RIGHT — generate inside useEffect or pass as a prop from the server
const [id, setId] = useState(null)
useEffect(() => {
  setId(Math.random())
}, [])
```

### 2.3 All Conditional Browser Logic Goes Inside useEffect

```js
// WRONG
const isMobile = window.innerWidth < 768

// RIGHT
const [isMobile, setIsMobile] = useState(false)
useEffect(() => {
  setIsMobile(window.innerWidth < 768)
}, [])
```

### 2.4 Do Not Use suppressHydrationWarning as a Fix

`suppressHydrationWarning` silences the error without solving it. It is banned
in this project unless there is a written comment explaining exactly why it is
necessary and that it is safe.

```js
// BANNED — no silent suppression without documented justification
<div suppressHydrationWarning>...</div>
```

### 2.5 Dynamic Imports for Any Component That Uses Browser APIs

If a third-party component or your own component uses `window`, `document`, or
any browser-only API, import it dynamically with `ssr: false`.

```js
import dynamic from 'next/dynamic'

const CalBooking = dynamic(() => import('../components/CalBooking'), {
  ssr: false,
  loading: () => <p>Loading booking...</p>
})
```

This applies to: Cal.com embed, any map embed, any animation library that
reads screen size, any component using localStorage.

---

## 3. IMAGE RULES

The hero image not loading on mobile is one of the most common bugs in
Next.js projects. These rules prevent it entirely.

### 3.1 Always Use the Next.js Image Component

Never use a raw `<img>` tag. The Next.js `<Image>` component handles
optimization, lazy loading, and responsive sizing automatically.

```js
// WRONG
<img src="/hero.jpg" alt="hero" />

// RIGHT
import Image from 'next/image'
<Image src="/hero.jpg" alt="hero" fill priority />
```

### 3.2 Hero Images Must Have the priority Flag

The `priority` prop tells the browser to load this image immediately — before
anything else. Without it, the hero image loads late on mobile, appearing
blank on first view.

```js
// Every hero image — mandatory
<Image
  src="/hero.jpg"
  alt="Business hero"
  fill
  priority
  className="object-cover"
/>
```

### 3.3 All Non-Hero Images Must Have Explicit Width and Height

For any image that is not using `fill`, always provide `width` and `height`
to prevent layout shift and hydration mismatches.

```js
<Image
  src="https://res.cloudinary.com/your-cloud/image/upload/v1/client/photo.jpg"
  alt="Before and after"
  width={800}
  height={600}
/>
```

### 3.4 Cloudinary Images Must Always Include Dimensions

Every image pulled from Cloudinary must have explicit `width` and `height`
values or use `fill` with a positioned parent container.

```js
// RIGHT — fill with positioned parent
<div className="relative w-full h-64">
  <Image
    src="https://res.cloudinary.com/..."
    alt="gallery photo"
    fill
    className="object-cover rounded-lg"
  />
</div>
```

### 3.5 Add Cloudinary Domain to next.config.js

Cloudinary images will not load unless the domain is whitelisted.

```js
// next.config.js
module.exports = {
  images: {
    domains: ['res.cloudinary.com'],
  },
}
```

### 3.6 Video Elements Must Include playsInline for Mobile

On iOS, videos will not autoplay unless `playsInline` is set.

```js
<video
  src="https://res.cloudinary.com/..."
  autoPlay
  muted
  loop
  playsInline
  className="w-full rounded-lg"
/>
```

---

## 4. COMPONENT RULES

### 4.1 File and Folder Structure

```
/app
  /page.tsx              ← single page, imports all sections
/components
  /Hero.tsx
  /Services.tsx
  /Gallery.tsx
  /Reviews.tsx
  /Booking.tsx
  /Footer.tsx
/lib
  /constants.ts          ← client config (name, colors, content)
/public
  /images                ← static images only if not using Cloudinary
/styles
  /globals.css
next.config.js
tailwind.config.ts
CODING_STANDARDS.md
```

### 4.2 Client Config Lives in One File

All client-specific values — business name, accent color, services, reviews,
Cal.com link, Cloudinary folder — live in `/lib/constants.ts`. No hardcoded
client content anywhere else in the codebase.

```ts
// /lib/constants.ts
export const CLIENT = {
  name: "Business Name",
  tagline: "Your tagline here",
  accentColor: "#D4AF37",       // Gold for barber, change per client
  calLink: "username/service",  // Cal.com booking link
  cloudinaryFolder: "client-barber",
  phone: "(408) 000-0000",
  address: "123 Main St, San Jose, CA",
  instagram: "https://instagram.com/handle",
  hours: "Mon–Sat: 9AM–7PM",
  services: [
    { name: "Service Name", price: "$00", description: "Short description" }
  ],
  reviews: [
    { name: "Customer Name", text: "Review text here.", rating: 5 }
  ]
}
```

### 4.3 One Component Per Section

Each section of the page is its own component file. The main `page.tsx` only
imports and renders those components — no logic lives in `page.tsx`.

```tsx
// app/page.tsx
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Gallery from '@/components/Gallery'
import Reviews from '@/components/Reviews'
import Booking from '@/components/Booking'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Gallery />
      <Reviews />
      <Booking />
      <Footer />
    </main>
  )
}
```

### 4.4 No Inline Styles

All styling goes through Tailwind CSS classes. No `style={{}}` props unless
dynamically setting the client accent color, which is the only exception.

```js
// WRONG
<div style={{ backgroundColor: '#000', padding: '20px' }}>

// RIGHT
<div className="bg-black p-5">

// ONLY EXCEPTION — dynamic accent color from client config
<button style={{ backgroundColor: CLIENT.accentColor }}>
  Book Now
</button>
```

---

## 5. STYLING RULES

### 5.1 Mobile First — Always

Write Tailwind classes for mobile first, then add responsive prefixes for
larger screens. Never design desktop first.

```js
// WRONG — desktop first
<div className="flex-row md:flex-col">

// RIGHT — mobile first
<div className="flex-col md:flex-row">
```

### 5.2 Dark Theme Base Colors

These are the base colors for all client sites. Do not change the base.
Only the accent color changes per client.

| Element | Tailwind Class | Hex |
|---|---|---|
| Page background | `bg-zinc-950` | #09090b |
| Section background | `bg-zinc-900` | #18181b |
| Card background | `bg-zinc-800` | #27272a |
| Primary text | `text-white` | #ffffff |
| Secondary text | `text-zinc-400` | #a1a1aa |
| Border | `border-zinc-700` | #3f3f46 |

### 5.3 Accent Color Application

The accent color is applied to: CTA buttons, section underlines, price text,
hover states, and active elements. It is set via `CLIENT.accentColor` in
`constants.ts` and applied as an inline style only where Tailwind cannot
reach a dynamic value.

### 5.4 Font

Use `Inter` from Google Fonts or Next.js font optimization. One font family
across the entire site. No mixing fonts.

```ts
// app/layout.tsx
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
```

---

## 6. BOOKING (CAL.COM) RULES

### 6.1 Always Load Cal.com as a Dynamic Import

The Cal.com embed uses browser APIs. It must never be server-side rendered.

```js
const Booking = dynamic(() => import('@/components/Booking'), { ssr: false })
```

### 6.2 Embed Inline — No Redirects

The calendar must be embedded directly on the page in the Booking section.
Do not link out to a separate Cal.com page. The user books without leaving
the site.

```js
// Use Cal.com's inline embed script, not a link
// Follow Cal.com embed documentation for React/Next.js
```

### 6.3 Cal.com Link Comes From constants.ts

Never hardcode the Cal.com username or event slug. Always pull from
`CLIENT.calLink` in `constants.ts`.

---

## 7. PERFORMANCE RULES

### 7.1 No Unused Dependencies

Only install packages that are actively used. Run `npm ls` before deploying
to check for bloat. Do not install a library for a single utility function
you can write in 5 lines.

### 7.2 Lazy Load Everything Below the Fold

Only the Hero section loads eagerly. Everything else — gallery images,
reviews, booking — loads lazily as the user scrolls.

```js
// All gallery images below the fold
<Image src="..." alt="..." width={800} height={600} loading="lazy" />
```

### 7.3 No console.log in Production

Remove all `console.log` statements before deploying. Use a linter rule
to enforce this automatically.

---

## 8. VERCEL DEPLOYMENT RULES

### 8.1 Environment Variables Are Never Hardcoded

Any API key, Cloudinary cloud name, or Cal.com token goes in `.env.local`
and is added to Vercel's environment variables dashboard — never in the code.

```bash
# .env.local
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

### 8.2 .env.local Is Always in .gitignore

Never commit environment variable files to GitHub.

```
# .gitignore
.env.local
.env*.local
```

### 8.3 Test Mobile Before Every Deploy

Before pushing to Vercel, open Chrome DevTools → toggle device toolbar →
test on iPhone SE (smallest common screen). If the hero image does not load
or text overflows, fix it before deploying.

### 8.4 Each Client Is a Separate Vercel Project

Do not deploy multiple clients to the same Vercel project. Each client gets:
- Their own GitHub repo (cloned from the template)
- Their own Vercel project
- Their own custom domain connected in Vercel

---

## 9. GIT RULES

### 9.1 Branch Naming

```
main          ← production, always deployable
dev           ← active development
feature/name  ← new features
fix/name      ← bug fixes
client/name   ← client-specific customization branch
```

### 9.2 Commit Message Format

```
feat: add gallery section with Cloudinary integration
fix: resolve hero image not loading on mobile
style: update barber client accent color to gold
chore: add Cloudinary domain to next.config.js
```

### 9.3 Never Push Directly to Main

All changes go through a branch. Merge into `main` only when the feature
works on mobile and has no console errors.

---

## 10. CHECKLIST BEFORE GOING LIVE

Run through every item before handing a site to a client:

- [ ] Hero image loads on iPhone (Chrome DevTools mobile simulation)
- [ ] "Book Now" button scrolls directly to the calendar
- [ ] Cal.com calendar loads and accepts a test booking
- [ ] All services and prices are correct
- [ ] Gallery images and videos load on mobile
- [ ] Reviews section displays correctly
- [ ] Footer has correct phone, address, hours, and Instagram link
- [ ] No console errors in browser DevTools
- [ ] No `console.log` statements in the code
- [ ] `.env.local` is NOT in the GitHub repo
- [ ] Custom domain is connected and HTTPS is active on Vercel
- [ ] Site loads in under 3 seconds on a mobile connection (use PageSpeed Insights)

---

## 11. CLONING FOR A NEW CLIENT — CHECKLIST

When deploying this template for a new client:

- [ ] Fork or clone the template repo into a new GitHub repo
- [ ] Update `/lib/constants.ts` with all client-specific values
- [ ] Set the accent color in `constants.ts`
- [ ] Replace or update Cloudinary folder name in `constants.ts`
- [ ] Update Cal.com link in `constants.ts`
- [ ] Add new environment variables to Vercel for this project
- [ ] Connect the client's custom domain in Vercel
- [ ] Run the full pre-launch checklist above

---

*This document is the source of truth for all development on this project.
Any deviation from these rules must be discussed and documented before code is written.*
