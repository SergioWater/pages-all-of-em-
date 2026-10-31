# Components & Constants (Next.js)

From CODING_STANDARDS.md §4–§6:

- Fixed section structure per template clone:
  `app/page.tsx` imports only; one component per section under
  `components/{Hero,Services,gallery,Reviews,Booking,Footer}.tsx`.
- ALL client-specific values (name, tagline, accentColor, calLink,
  cloudinaryFolder, phone, address, instagram, hours, services, reviews)
  live ONLY in `/lib/constants.ts`. Zero hardcoded client content elsewhere —
  this mirrors the Astro consts.ts single-source rule (same DNA, two stacks).
- No inline `style={{}}` except the dynamic accent color.
- Cal.com embed: dynamic import ssr:false with loading fallback; inline embed,
  never link-out; link sourced from constants only.

These converge with core/change-classes hard prohibitions: introducing a
second styling/data system is prohibited across profiles.
