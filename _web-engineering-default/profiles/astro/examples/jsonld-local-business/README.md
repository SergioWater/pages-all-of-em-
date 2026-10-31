# Golden Pattern — jsonld-local-business

Classification: PROVEN GOOD · Framework: astro
Source: `kensei-2/src/lib/schema.ts` (`buildHomeSchemas()`), `components/JsonLd.astro`, `layouts/BaseLayout.astro`

Dual-type local entity schema built ONLY from confirmed consts facts,
rendered as data (never hand-written markup), placed at end-of-body
(measured first-paint win: commit 829087b moved it out of `<head>`).

```ts
// lib/schema.ts — values come from consts.CONTACT; omissions documented
export function buildHomeSchemas() {
  return [
    {
      "@context": "https://schema.org",
      "@type": ["SportsActivityLocation", "LocalBusiness"],
      name: SITE_TITLE,
      url: Astro.site?.toString(),
      telephone: CONTACT.phoneE164,
      address: { "@type": "PostalAddress",
                 streetAddress: CONTACT.street,       // OWNER_CONFIRMED
                 addressLocality: CONTACT.city },
      // foundingDate: OMITTED until owner confirms (documented omission)
    },
    faqPageSchema(resolveFaqItems()),   // same source as visible FAQ copy
  ];
}
```

```astro
{/* JsonLd.astro */}
<script type="application/ld+json" set:html={JSON.stringify(data)} />
```

Rules enforced here: no invented credentials/ratings/dates (ASTRO-META-003);
OWNER_CONFIRM_* placeholders must be resolved before build ships.
