# AP — Canonical host poisoning

Classification: ANTI-PATTERN · Severity: critical · Rule: ASTRO-META-001

**What happened (twice).** kensei v1 defaulted `astro.config site` to a
staging IP (`http://54.245.204.4`); live canonical/og:url pointed at
`https://kensei.click/` while users visited `kenseijudo.com` — search engines
learned a second, wrong identity of the site.

**Why it happened.** Config convenience during staging; nobody re-audited
dist output at deploy.

**Cost.** Split entity in Google's eyes; sitemap 404 on top of it.

**Preferred pattern.** Pin `site` to the production domain; keep CMS/fetch
origins in separate env-driven helpers (`lib/wp-url.ts`); audit dist
canonicals + sitemap host post-build (canonical_host_check.py).

**Detection.** canonical_host_check.py — config site vs every dist
canonical/og:url/sitemap host.
