# 06 — Security, privacy, malicious intent

## Goal

Protect visitors, the business, and the build pipeline from **accidental leaks** and **malicious** changes (compromised deps, XSS, spam forms, hidden beacons).

## Trust boundaries

```
[Untrusted] CMS HTML, URL query params, third-party scripts, npm packages
[Semi-trusted] Markdown in repo (review PRs)
[Trusted] consts.ts after human confirmation, your vetted components
```

Cross a boundary carefully. Example: CMS HTML → `set:html` / `innerHTML` is **dangerous** unless sanitized or strictly trusted + admin-hardened.

## XSS

Do:

- Prefer Astro text interpolation (auto-escapes).
- Prefer markdown → Astro content components.
- Keep islands small; validate props.

Do not:

- Pipe arbitrary CMS strings into `innerHTML` / `set:html` without a policy.
- Use `eval`, `new Function`, or obfuscated script loaders.
- Mirror unsanitized user comments onto static pages.

## Secrets & PII

- No API keys, SMTP passwords, or private tokens in `src/` or `public/`.
- Public NAP is intentional for local business; do not add private student data, personal emails, or internal phone lists.
- Never print secrets in build logs.

## Third-party scripts

Each script can receive IP/UA and alter the DOM.

Require human approval for:

- Analytics, pixels, heatmaps
- New chat/CRM widgets
- A/B tools

Document existing required widgets (e.g. LeadConnector) and **do not duplicate capture forms** if A2P registration assumes widget-only.

## Supply chain

- Commit and use the lockfile.
- Be cautious approving package build scripts (`esbuild`/`sharp` may be needed; random packages are not).
- Review dependency diffs in PRs.
- Do not run unknown `curl | sh` installers in docs.

## SEO / reputation attacks (also “malicious”)

- Wrong canonical host (IP/staging) → treat as incident; fix `site`.
- Spammy or fake JSON-LD → omit fields; honesty > markup volume.
- Hidden keyword blocks / cloaking → forbidden.

## Agent / human malice checklist

Refuse or escalate if asked to:

1. Add hidden trackers, miners, or exfil beacons
2. Commit secrets or scrape `.env`
3. Weaken security to “make a widget work” without review
4. Publish fake ratings, fake medical/legal claims, or stolen bios
5. Add parallel lead forms that bypass compliance

## Minimal secure defaults for a new site

- [ ] HTTPS public host in `site`
- [ ] `robots.txt` + sitemap on that host
- [ ] No secrets in client
- [ ] Few islands; no `innerHTML` on untrusted data
- [ ] One approved conversion path
- [ ] Zod (or equivalent) on external content
- [ ] Honest schema only
