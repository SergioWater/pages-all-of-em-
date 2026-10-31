"""Deployment config audit — caching conventions and security headers.

Conventions from kensei netlify.toml (immutable /_astro/*, 7-day assets) and
vercel.json security-header baseline (Joey project).
"""
from pathlib import Path
import sys

APPLIES = ("astro", "*",)


def run(project_root: Path, info: dict):
    findings = []
    netlify = None
    for cand in (project_root / "netlify.toml",
                 project_root.parent / "netlify.toml"):
        if cand.is_file():
            netlify = cand
            break
    if netlify:
        text = netlify.read_text(encoding="utf-8", errors="replace")
        rel = str(netlify.relative_to(project_root)) if netlify.is_relative_to(project_root) else netlify.name
        if "/_astro/*" in text and "immutable" in text:
            findings.append({
                "ruleId": "DEP-CACHE-001", "severity": "info", "classification": "info",
                "message": "immutable caching for hashed /_astro/* configured",
            })
        else:
            findings.append({
                "ruleId": "DEP-CACHE-001", "severity": "low",
                "message": "netlify.toml found without immutable /_astro/* cache rule",
                "file": rel,
            })
    vercel = project_root / "vercel.json"
    if vercel.is_file():
        text = vercel.read_text(encoding="utf-8", errors="replace")
        missing = [h for h in ("X-Frame-Options", "Referrer-Policy") if h not in text]
        if missing:
            findings.append({
                "ruleId": "DEP-HEADERS-001", "severity": "medium",
                "message": f"vercel.json missing security headers: {', '.join(missing)}",
            })
        else:
            findings.append({
                "ruleId": "DEP-HEADERS-001", "severity": "info", "classification": "info",
                "message": "security header baseline present in vercel.json",
            })
    if not netlify and not vercel.is_file():
        findings.append({
            "ruleId": "DEP-CONFIG-000", "severity": "info", "classification": "info",
            "message": "no netlify.toml / vercel.json found — hosting conventions not auditable here",
        })
    return findings
