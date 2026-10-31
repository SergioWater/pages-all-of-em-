# 14 — File templates (greenfield paste targets)

Replace `YOUR-*` placeholders. Create files only after reading `01`–`06`.

## `src/layouts/BaseLayout.astro`

```astro
---
import "../styles/colors_and_type.css";
import "../styles/global.css";
import "../styles/landing.css";
import BaseHead from "../components/BaseHead.astro";
import JsonLd from "../components/JsonLd.astro";
import Nav from "../components/Nav.astro";
import Footer from "../components/Footer.astro";

interface Props {
  title?: string;
  description?: string;
  schemas?: Record<string, unknown>[];
}
const { title, description, schemas = [] } = Astro.props;
---
<!doctype html>
<html lang="en">
  <head>
    <BaseHead title={title} description={description} />
    {schemas.map((data) => <JsonLd data={data} />)}
  </head>
  <body>
    <Nav />
    <main>
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

## `src/lib/cms-url.ts`

```ts
/** Build-time CMS origin. Do not use for Astro.site / canonicals. */
export function cmsBase(): string {
  const raw =
    (typeof process !== "undefined" && process.env.WP_URL) ||
    "https://YOUR-CMS-HOST";
  return String(raw).replace(/\/$/, "");
}
```

## `src/components/JsonLd.astro`

```astro
---
interface Props { data: Record<string, unknown> }
const { data } = Astro.props;
---
<script type="application/ld+json" set:html={JSON.stringify(data)} />
```

## `public/robots.txt`

```txt
User-agent: *
Allow: /

Sitemap: https://YOUR-PUBLIC-HOST/sitemap-index.xml
```

## Minimal `src/lib/schema.ts` shape

```ts
import { CONTACT } from "../consts";

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: CONTACT.name,
    telephone: CONTACT.phoneDisplay,
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.street,
      addressLocality: CONTACT.city,
      addressRegion: CONTACT.region,
      postalCode: CONTACT.postal,
    },
    sameAs: CONTACT.sameAs,
  };
}
```

Do not add `aggregateRating`, `foundingDate`, or `memberOf` unless the human confirmed.

## Section stub

```astro
---
// sections/Programs.astro — one job
---
<section class="programs" id="programs">
  <div class="container">
    <header class="section-head">
      <h2>Programs</h2>
      <p>Short supporting sentence.</p>
    </header>
    <!-- reuse existing card/grid classes from landing.css -->
  </div>
</section>
```

Keep `class` names stable once CSS exists.
