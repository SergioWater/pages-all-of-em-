# Styling, Performance & Deploy (Next.js)

CODING_STANDARDS.md §5, §7–§9 curated:

- Mobile-first Tailwind always; fixed dark-zinc section palette; ONE font
  family (Inter); accent color applied via constants where Tailwind can't reach.
- Performance: no unused dependencies (`npm ls` audit before deploy); lazy-load
  everything below fold — only Hero eager; zero console.log in production
  (linter-enforced).
- Deployment: env vars only in `.env.local` + Vercel dashboard, gitignored;
  every client = own repo + own Vercel project + own domain; test iPhone SE
  viewport before every push.
- Git: main/dev/feature|fix|client branches; conventional commit prefixes
  (feat:/fix:/style:/chore:); NEVER push directly to main. Same protocol the
  Astro campaigns follow branch-per-session off master.

Go-live checklist (§10) and new-client clone checklist (§11) remain in the
template's own CODING_STANDARDS.md — they are PROJECT-TYPE scoped, not
system-wide; reference them from project briefs when cloning that template.
