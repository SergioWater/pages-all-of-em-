# Migration inventory

## Source
- Path: `D:\001_websites\sentinals soccer club` (workspace mirror: `sentinals soccer club/`)
- How served today: static HTML/CSS/JS files
- Public URL: https://sentinelssoccerclub.com/

## Pages (every HTML entry)
| Legacy file | Proposed Astro route | Notes |
|---|---|---|
| index.html | src/pages/index.astro + sections/* | Hero, Programs, OurClub, TryoutsStatus |
| about.html | src/pages/about.astro | Ported body |
| competitive.html | src/pages/competitive.astro | Ported body |
| recreational.html | src/pages/recreational.astro | Ported body |
| private-training.html | src/pages/private-training.astro | Ported body |
| summer-camps.html | src/pages/summer-camps.astro | Ported body |
| coaches.html | src/pages/coaches.astro | Ported body |
| gallery.html | src/pages/gallery.astro + GalleryIsland | Solid island |
| tryouts.html | src/pages/tryouts.astro | Ported body |
| faq.html | src/pages/faq.astro + lib/faq.ts | Schema sync |
| contact.html | src/pages/contact.astro | Ported body |
| googlef4ecb229fe2199c5.html | public/ | Search Console verify |

## CSS
| Legacy file | Destination sheet | Action |
|---|---|---|
| style.css | colors_and_type.css | tokens + fonts |
| style.css | global.css | reset, topbar, nav, footer, promo, responsive chrome |
| style.css | landing.css | hero, sections, page layouts, gallery |

## JS
| Legacy file | Keep? | As island / script / delete |
|---|---|---|
| Inline mobile nav | yes | layout script in Nav.astro |
| Inline promo dismiss | yes | PromoBanner.astro script |
| gallery.js | yes | GalleryIsland.tsx client:only |

## Assets
| Path | Goes to |
|---|---|
| images/* | public/images/ |

## Third parties
| Script | Approved to keep? |
|---|---|
| Google Fonts (Inter, Montserrat) | yes (legacy) |
| Font Awesome CDN | yes (legacy icons) |
| sportscampament.web.app registration | yes (existing conversion path) |

## Facts to confirm
- NAP: Morgan Hill CA; email/phone from live site; no street address on legacy
- Social URLs: Facebook, Instagram, YouTube, NorCal club page
- Affiliations / reviews: foundingDate 2015 + NorCal Premier from legacy schema (ported, not invented)
