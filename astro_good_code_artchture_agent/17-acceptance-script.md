# 17 — Acceptance script (PowerShell)

Run from the Astro project root after `pnpm run build`.  
Replace `YOUR-PUBLIC-HOST` before use.

```powershell
$ErrorActionPreference = "Stop"
$hostName = "YOUR-PUBLIC-HOST"  # e.g. kenseijudo.com — no https://

if (-not (Test-Path "dist/index.html")) { throw "dist/index.html missing — build first" }
if (-not (Test-Path "dist/robots.txt")) { throw "dist/robots.txt missing" }

$robots = Get-Content "dist/robots.txt" -Raw
if ($robots -notmatch "Sitemap:\s*https://$([regex]::Escape($hostName))/") {
  throw "robots.txt Sitemap does not reference https://$hostName/"
}

$maps = Get-ChildItem "dist" -Filter "sitemap*.xml"
if (-not $maps) { throw "no sitemap*.xml in dist/" }

$hit = $false
foreach ($m in $maps) {
  if (Select-String -Path $m.FullName -Pattern "https://$([regex]::Escape($hostName))/" -Quiet) { $hit = $true }
}
if (-not $hit) { throw "sitemap files lack https://$hostName/ URLs" }

# Fail if staging IP pattern sneaks back into sitemap
foreach ($m in $maps) {
  if (Select-String -Path $m.FullName -Pattern "https?://\d+\.\d+\.\d+\.\d+" -Quiet) {
    throw "sitemap contains raw IP URL(s) in $($m.Name)"
  }
}

$home = Get-Content "dist/index.html" -Raw
if ($home -notmatch 'rel="canonical"') { throw "homepage missing canonical" }
if ($home -match 'canonical" href="https?://\d+\.\d+\.\d+\.\d+') {
  throw "homepage canonical points at an IP"
}

Write-Host "ACCEPTANCE OK for host $hostName"
```

Optional deeper checks (manual or extend script):

- Count `application/ld+json` blocks on homepage
- Ensure a single `<h1>` in `dist/index.html`
- Grep `dist` for accidental `localhost` canonicals
