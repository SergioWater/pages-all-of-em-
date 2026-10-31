# Joey De Leon, Realtor Site

Next.js 15 (App Router) marketing site for Joey De Leon, Realtor® at Power Real Estate Group ⚡.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

This project is pre-configured for Vercel. Just push to GitHub and import in [vercel.com/new](https://vercel.com/new).

- Framework Preset: **Next.js** (auto-detected)
- Build Command: `next build` (default)
- Output Directory: `.next` (default)
- Install Command: `npm install` (default)

The `vercel.json` adds production headers for the RealScout embed permissions.

## Key features

- Embedded RealScout MLS search (live listings, map, city-filtered area pages)
- Modal lightbox keeps RealScout navigation on-site
- 17 Southern California area landing pages with city-filtered listings
- Contact + Home Valuation lead forms (POST to `/api/lead`)
- Tailwind + custom theme (ivory / navy / gold)

## Tech

- Next.js 15 (App Router)
- React 19
- Tailwind CSS
- TypeScript
- RealScout web components

## Contact

Joey De Leon · Realtor® · DRE# 02238070  
joeydln@powerreteam.com · (408) 613-7001
