# 10 — Reference snippets (copy patterns, not secrets)

Illustrative patterns for agents. Replace hosts, NAP, and brand values.

## BaseHead title + canonical

```astro
---
interface Props { title?: string; description?: string; image?: string }
const { title, description, image = "/assets/logo.png" } = Astro.props;
const canonicalURL = new URL(Astro.url.pathname, Astro.site);
const fullTitle = title ? `${title} · Your Brand` : "Primary Keyword · Your Brand";
const desc = description ?? "Accurate meta description.";
---
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link rel="canonical" href={canonicalURL} />
<title>{fullTitle}</title>
<meta name="description" content={desc} />
<meta property="og:title" content={fullTitle} />
<meta property="og:description" content={desc} />
<meta property="og:url" content={Astro.url} />
<meta property="og:image" content={new URL(image, Astro.url)} />
```

## JsonLd component

```astro
---
interface Props { data: Record<string, unknown> }
const { data } = Astro.props;
---
<script type="application/ld+json" set:html={JSON.stringify(data)} />
```

Only pass objects you built from confirmed data.

## robots.txt

```txt
User-agent: *
Allow: /

Sitemap: https://YOUR-PUBLIC-HOST/sitemap-index.xml
```

## consts contact shape

```ts
export const CONTACT = {
  name: "Business Name",
  street: "123 Main St",
  suite: "Suite 100",
  city: "San Jose",
  region: "CA",
  postal: "95135",
  phoneDisplay: "(408) 555-0100",
  phoneE164: "+14085550100",
  sameAs: [
    "https://instagram.com/…",
    "https://youtube.com/…",
  ],
};
```

## Island boundary

```astro
---
import FaqsIsland from "../components/FaqsIsland";
const items = [/* {q,a} */];
---
<section class="faqs" id="faqs">
  <FaqsIsland items={items} client:visible />
</section>
```

## What not to paste from reference repos

- Real API keys, private WP credentials
- Proprietary images/logos you do not own
- Unverified instructor credentials or medical claims

## Next file

Return to `08-recreate-checklist.md` and execute. If extending this pack, append new numbered files and update `00-READ-IN-ORDER.md`.
