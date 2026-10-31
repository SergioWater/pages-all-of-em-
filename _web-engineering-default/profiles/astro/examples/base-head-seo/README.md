# Golden Pattern — base-head-seo

Classification: PROVEN GOOD · Framework: astro
Source: `kensei-2/src/components/BaseHead.astro`, `sentinals .../BaseHead.astro`

The single composition point for all head metadata. Pages pass segments;
BaseHead owns assembly, canonical, OG/Twitter, deferred font subsets.

```astro
---
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";
interface Props { title?: string; description?: string; image?: string }
const { title, description = SITE_DESCRIPTION, image } = Astro.props;
const fullTitle = title ? `${title} · ${SITE_TITLE}` : DEFAULT_HOME_TITLE;
const canonical = new URL(Astro.url.pathname, Astro.site); // site pinned to prod host
---
<title>{fullTitle}</title>
<meta rel="canonical" href={canonical} />
<meta property="og:title" content={fullTitle} />
<meta property="og:url" content={canonical} />
{/* CJK glyph subset loaded off critical path */}
<link rel="stylesheet" href={notoSerifJpSubsetUrl} media="print"
      onload="this.removeAttribute('media')" />
```

Enforces ASTRO-META-001 (canonical from Astro.site), ASTRO-META-002
(segment-only titles), ASTRO-FNT-001 (non-blocking third-party font CSS).
Audit hooks live here: metadata_audit + canonical_host_check read the OUTPUT.
