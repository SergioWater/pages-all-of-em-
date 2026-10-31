# Golden Pattern — gallery-island

Classification: PROVEN GOOD · Framework: astro + solid
Source: `kensei-2/src/pages/photos/index.astro`, `components/gallery/GalleryIsland.tsx`

The one legitimate `client:only` case in the workspace: a lightbox library
(fslightbox) that scans the DOM at mount. Fully serialized props from
frontmatter; vendor-lib refresh dance documented inline.

```astro
---
import GalleryIsland from "../../components/gallery/GalleryIsland";
const photos = await loadGalleryPreview();   // pre-sized thumb/web pairs
---
<GalleryIsland client:only="solid-js" photos={photos} />
```

```tsx
// fslightbox is side-effectful: re-register anchors added by infinite scroll
createEffect(() => { if (visible()) refreshFsLightbox?.(); });
```

Why client:only here and not elsewhere: the island renders nothing useful on
the server (lightbox wiring), so SSR round-trip is wasted work. FAQ/schedule
islands use client:visible instead. Island count stays within budget (ASTRO-HYD-002).
