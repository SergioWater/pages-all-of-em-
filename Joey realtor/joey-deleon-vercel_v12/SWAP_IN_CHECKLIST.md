# Joey De Leon Site, Swap-In Checklist

Quick reference of every placeholder in the site so real content can be dropped in cleanly.

## 1. RealScout widget code, 3 spots
Replace the `<WidgetPlaceholder>` components with Joey's real widget embed code:

- **Home, Simple Search** → `app/page.tsx`
- **Home, Featured Listings** → `app/page.tsx`
- **Home Valuation, Home Value widget** → `app/home-valuation/page.tsx`

Also add the RealScout script tag to `app/layout.tsx` using `next/script`:
```tsx
<Script src="https://em.realscout.com/widgets/realscout-web-components.umd.js" strategy="afterInteractive" />
```

## 2. Real testimonials
`app/page.tsx`, three testimonials are clearly marked as samples. Swap with real client quotes (name, neighborhood, transaction type).

## 3. Real bio copy
`app/about/page.tsx`, three paragraphs of placeholder bio. Replace with Joey's actual story.

## 4. Real hero photo of Joey
Currently using `public/images/key-stilllife.png` for the about teaser. Drop in a real headshot/portrait of Joey and update the `<img src>` references in `app/page.tsx` and `app/about/page.tsx`.

## 5. Connect /api/lead to Supabase + Resend
- File: `app/api/lead/route.ts` (currently console.logs)
- Static export does not run server routes. Options:
  - Flip `next.config.mjs` `output` away from `'export'` and deploy to Vercel (or any Node host) so the API route runs
  - Or keep static export and POST the form to an external endpoint (Supabase Edge Function, Cloudflare Worker, or Vercel API route on a separate domain)
- Wire writes to Supabase `leads` table; trigger Resend email to `joeydln@powerreteam.com`

## 6. DRE license number
`components/SiteFooter.tsx`, replace `[License #, placeholder]` with `02238070` (or whichever license number Joey wants displayed).

---

## Local development

```bash
cd /home/user/workspace/joey-deleon-site
npm install
npm run dev          # http://localhost:3000

# Static build for S3 deploy:
rm -rf out .next && npx next build && node scripts/rewrite-paths.mjs
```

The `scripts/rewrite-paths.mjs` post-build step rewrites absolute `/_next/`, `/images/`, and internal page paths to relative form so the bundle works behind any path prefix.
