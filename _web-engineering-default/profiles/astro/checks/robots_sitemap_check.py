"""Robots/sitemap presence and host agreement.

Implements ASTRO-DEP-001.
"""
from pathlib import Path
import re
import sys

sys.path.insert(0, str(Path(__file__).parent))
from _ww_common import find_dist, host_of  # noqa: E402

APPLIES = ("astro", "*")


def run(project_root: Path, info: dict):
    findings = []
    site = info.get("siteUrl")
    expected_host = host_of(site) if site else None

    robots = None
    for cand in (project_root / "public" / "robots.txt",
                 project_root / "robots.txt"):
        if cand.is_file():
            robots = cand
            break
    dist = find_dist(project_root)
    if robots is None and dist and (dist / "robots.txt").is_file():
        robots = dist / "robots.txt"
    if robots is None:
        findings.append({
            "ruleId": "ASTRO-DEP-001", "severity": "medium",
            "message": "no robots.txt found (audit history: live 404 was a critical finding)",
            "suggestedFixRef": "profiles/astro/rules/ASTRO-DEP-001.md",
        })
    else:
        text = robots.read_text(encoding="utf-8", errors="replace")
        sitemap_lines = re.findall(r"(?i)^sitemap:\s*(\S+)\s*$", text, re.M)
        if not sitemap_lines:
            findings.append({
                "ruleId": "ASTRO-DEP-001", "severity": "low",
                "message": f"robots.txt ({robots.relative_to(project_root)}) has no Sitemap line",
                "file": str(robots.relative_to(project_root)),
            })
        elif expected_host:
            for url in sitemap_lines:
                got = host_of(url)
                if got != expected_host:
                    findings.append({
                        "ruleId": "ASTRO-DEP-001", "severity": "medium",
                        "message": f"robots Sitemap host {got} != production host {expected_host}",
                        "file": str(robots.relative_to(project_root)),
                        "evidence": url,
                    })

    if dist is None:
        findings.append({
            "ruleId": "ASTRO-DEP-001", "severity": "info",
            "classification": "info",
            "message": "no dist/ build; cannot verify generated sitemap files",
        })
    else:
        has_index = any(dist.glob("sitemap-index*.xml")) or any(dist.glob("sitemap.xml"))
        if not has_index:
            findings.append({
                "ruleId": "ASTRO-DEP-001", "severity": "medium",
                "message": "dist has no sitemap.xml / sitemap-index.xml output",
            })
    return findings
