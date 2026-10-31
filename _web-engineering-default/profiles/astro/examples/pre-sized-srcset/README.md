# Golden Pattern — pre-sized-srcset

Classification: LIKELY GOOD (astro:assets migration = open NEEDS VALIDATION)
Source: `sentinals .../lib/gallery.ts` alts; `gallery-loader.ts` pairs;
`blog/[slug].astro` srcset

Manual responsive-image pipeline without build-time processing:

```astro
<img src={img.web} srcset={`${img.thumb} 800w, ${img.web} 1800w`}
     sizes="(max-width: 960px) 100vw, 50vw"
     width="1200" height="800"
     loading="lazy" decoding="async"
     alt="Sentinels Soccer Club 2014 birth-year boys team, Half Moon Bay champions" />
```

Heroes invert the attributes: first slide `loading="eager"`
`fetchpriority="high"` (ASTRO-IMG-001). Thumbnails/web pairs matched by
filename via lib loader; symlink-checkout workaround documented there
(git core.symlinks=false turns photo junctions into text files).
Open question for a future measured experiment: astro:assets <Picture> for
automatic AVIF/WebP — requires before/after payload baselines first.
