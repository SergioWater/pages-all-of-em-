# JDL Realtor — Domain Setup Runbook (Vercel + Cloudflare)

**Goal:** `jdlre.com` serves the site. `www.jdlre.com`, `jdlrealtor.com`, and `www.jdlrealtor.com` all 308-redirect to `jdlre.com`.

**Stack:** Site hosted on Vercel (project `joey-deleon-realtor-site`, team `realwaterblanket-gmailcoms-projects`). Both domains registered + DNS managed at Cloudflare (account `c485e4a229404b215b427d8c4bf5104a`).

---

## Final state (verified)

| Host | DNS (Cloudflare) | Vercel role | Live result |
|---|---|---|---|
| jdlre.com | CNAME → `d237c05a9b5dcb86.vercel-dns-017.com`, DNS only | Production, no redirect | HTTP 200 |
| www.jdlre.com | CNAME → same target, DNS only | 308 → jdlre.com | 308 → https://jdlre.com/ |
| jdlrealtor.com | CNAME → same target, DNS only | 308 → jdlre.com | 308 → https://jdlre.com/ |
| www.jdlrealtor.com | CNAME → same target, DNS only | 308 → jdlre.com | 308 → https://jdlre.com/ |

SSL/TLS mode in both Cloudflare zones: **Full**. No Page Rules or Redirect Rules in either zone.

---

## Step 1 — Attach all four hostnames in Vercel

1. Go to Vercel → project `joey-deleon-realtor-site` → **Settings → Domains**.
2. Add all four if not already present: `jdlre.com`, `www.jdlre.com`, `jdlrealtor.com`, `www.jdlrealtor.com`.
   - Vercel auto-suggests a www↔apex redirect when you add a domain. Ignore/accept for now; you fix the targets in Step 2.

## Step 2 — Set redirect direction in Vercel (order matters)

A domain cannot redirect to a domain that itself redirects. So clear the target first.

1. Edit **`jdlre.com`** → choose **No Redirect**, connect to the **Production** environment. Save.
2. Edit **`www.jdlre.com`** → **Redirect to** `jdlre.com`, status **308 Permanent**. Save.
3. Edit **`jdlrealtor.com`** → **Redirect to** `jdlre.com`, **308**. Save.
4. Edit **`www.jdlrealtor.com`** → **Redirect to** `jdlre.com`, **308**. Save.

Reload the page and confirm only `jdlre.com` (plus the `.vercel.app` URL) is marked Production.

## Step 3 — Grab the DNS target Vercel wants

On any domain flagged **Invalid Configuration**, click **View DNS configuration**. Vercel shows the CNAME target — currently:

```
d237c05a9b5dcb86.vercel-dns-017.com
```

This value is project-specific and can change; always copy it from the dashboard rather than reusing this one. Legacy targets `cname.vercel-dns.com` and A record `76.76.21.21` still work but are being phased out.

## Step 4 — Cloudflare DNS for jdlre.com

Cloudflare → zone **jdlre.com** → **DNS → Records**.

| Type | Name | Target | Proxy | TTL |
|---|---|---|---|---|
| CNAME | `@` | `d237c05a9b5dcb86.vercel-dns-017.com` | **DNS only** (grey cloud) | Auto |
| CNAME | `www` | `d237c05a9b5dcb86.vercel-dns-017.com` | **DNS only** (grey cloud) | Auto |

- Cloudflare's CNAME flattening makes a CNAME at the apex (`@`) legal — no ALIAS/A record needed.
- If an old `A @ 76.76.21.21` record exists, **delete it** and add the CNAME (you can't have both A and CNAME on the same name).
- **Do not touch** MX / TXT / SPF / DKIM / DMARC records.

## Step 5 — Cloudflare DNS for jdlrealtor.com

Same zone settings, different zone:

| Type | Name | Target | Proxy | TTL |
|---|---|---|---|---|
| CNAME | `@` | `d237c05a9b5dcb86.vercel-dns-017.com` | **DNS only** | Auto |
| CNAME | `www` | `d237c05a9b5dcb86.vercel-dns-017.com` | **DNS only** | Auto |

## Step 6 — SSL/TLS mode

For each zone: **SSL/TLS → Overview**. Set to **Full** or **Full (strict)**. Never **Flexible** — with Flexible you get an infinite redirect loop against Vercel.

(With proxy off, this setting has little effect on these records, but keep it correct in case you ever enable the orange cloud.)

## Step 7 — Verify

Wait 1–5 minutes, then from a terminal:

```bash
for h in jdlre.com www.jdlre.com jdlrealtor.com www.jdlrealtor.com; do
  echo "=== $h ==="
  dig +short $h CNAME @1.1.1.1
  curl -sS -o /dev/null -w "%{http_code} -> %{redirect_url}\n" -m 20 "https://$h"
done
```

Expected:
- `jdlre.com` → `200`
- the other three → `308 -> https://jdlre.com/`

Back in Vercel → Settings → Domains, all four should read **Valid Configuration** (hit "Refresh" if stale).

---

## Gotchas

- **Grey cloud, always.** If the Cloudflare proxy (orange cloud) is on, Vercel can't complete domain verification or issue/renew the Let's Encrypt cert, and you may hit redirect loops. Keep these records **DNS only**.
- **Don't stack redirects.** Do the redirecting in Vercel only. Adding a Cloudflare Redirect Rule or Page Rule on top will fight the Vercel 308 and can loop.
- **Order of operations.** Vercel refuses to point a redirect at a domain that is itself a redirect. Clear `jdlre.com` to "No Redirect" before assigning the other three.
- **308 vs 307.** Use 308 (permanent) so search engines consolidate link equity onto `jdlre.com`.
- **SEO follow-up:** in Google Search Console add `jdlre.com` as the canonical property, keep `jdlrealtor.com` verified so the redirect is observed, and update the sitemap/canonical tags to the `jdlre.com` origin.
- **Nameserver alternative:** instead of manual records you can point each domain's nameservers to `ns1.vercel-dns.com` / `ns2.vercel-dns.com` and let Vercel manage DNS. Not recommended here — you'd lose Cloudflare DNS management for these zones.

## Rollback

To make `jdlrealtor.com` primary again: in Vercel set `jdlrealtor.com` to **No Redirect / Production**, then point `jdlre.com`, `www.jdlre.com`, and `www.jdlrealtor.com` at it with 308s. DNS records need no changes — they already all point to the same Vercel target.
