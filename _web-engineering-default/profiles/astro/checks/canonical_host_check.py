"""Canonical host check — config site vs dist canonical/og:url/sitemap hosts.

Implements ASTRO-META-001 and part of ASTRO-DEP-001.
"""
from pathlib import Path
import re
import sys

sys.path.insert(0, str(Path(__file__).parent))
from _ww_common import (find_dist, html_pages, host_of, CANON_RE,  # noqa: E402
                        OGURL_RE)

APPLIES = ("astro",)


def run(project_root: Path, info: dict):
    findings = []
    site = info.get("siteUrl")
    if not site:
        findings.append({
            "ruleId": "ASTRO-META-001", "severity": "medium",
            "message": "no site URL configured in astro.config — canonical identity undefined",
            "suggestedFixRef": "profiles/astro/rules/ASTRO-META-001.md",
        })
        return findings
    expected = host_of(site)
    dist = find_dist(project_root)
    if not dist:
        findings.append({
            "ruleId": "ASTRO-META-001", "severity": "info",
            "classification": "info",
            "message": f"no dist/ build found; canonical audit needs a production build (expected host: {expected})",
        })
        return findings

    pages = html_pages(dist)
    no_canonical = 0
    for page in pages:
        rel = str(page.relative_to(project_root))
        text = page.read_text(encoding="utf-8", errors="replace")
        canon = CANON_RE.search(text)
        ogurl = OGURL_RE.search(text)
        if not canon and not ogurl:
            no_canonical += 1
            continue
        for match in (canon, ogurl):
            if not match:
                continue
            got = host_of(match.group(1))
            if got and got != expected:
                findings.append({
                    "ruleId": "ASTRO-META-001", "severity": "critical",
                    "message": f"canonical/og:host mismatch: {got} != {expected}",
                    "file": rel,
                    "evidence": match.group(1),
                    "suggestedFixRef": "anti-patterns/AP-canonical-host-poisoning.md",
                })
    if no_canonical:
        findings.append({
            "ruleId": "ASTRO-META-001", "severity": "medium",
            "message": f"{no_canonical}/{len(pages)} built pages lack canonical AND og:url",
        })

    for sitemap in list(dist.glob("sitemap*.xml")):
        text = sitemap.read_text(encoding="utf-8", errors="replace")
        hosts = {host_of(loc) for loc in re.findall(r"<loc>(.*?)</loc>", text)}
        bad = {h for h in hosts if h and h != expected}
        for h in sorted(bad):
            findings.append({
                "ruleId": "ASTRO-META-001", "severity": "critical",
                "message": f"sitemap {sitemap.name} contains foreign host: {h}",
                "file": str(sitemap.relative_to(project_root)),
                "suggestedFixRef": "anti-patterns/AP-canonical-host-poisoning.md",
            })
    return findings
