# Next.js Profile

Entry point for Next.js work. Seeded from `/mnt/d/001_websites/CODING_STANDARDS.md`
(the client booking template rulebook, proven on the Joey realtor deployment)
— that document remains project-template-specific; the durable rules are
curated here.

## Reference implementation
`Joey realtor/joey-deleon-vercel_v12` — Next 15 App Router, React 19,
strict TS, Tailwind 3, static export mode, Vercel + Cloudflare DNS runbook.

## Domain docs (load by task)
- rules/NEXTJS-HYD-001..005 — server/client boundary (from CODING_STANDARDS §2)
- images.md · components-constants.md · styling.md · booking-integration.md ·
  performance-deploy-git.md · checklists.md

## Core neutrality note
This profile landed AFTER astro; any core doc discovered to assume Astro must
be fixed here (P6 sweep item).
