"""Heading audit — exactly one H1 per page; no level skips.

Universal web rule surfaced through the kensei audit (3 H1s found live).
"""
from pathlib import Path
import re
import sys

sys.path.insert(0, str(Path(__file__).parent))
from _ww_common import find_dist, html_pages, is_verification_file, HEADINGS_RE  # noqa: E402

APPLIES = ("astro", "*")


def run(project_root: Path, info: dict):
    findings = []
    dist = find_dist(project_root)
    if not dist:
        return [{
            "ruleId": "CHECK", "severity": "info", "classification": "info",
            "message": "no dist/ build; heading audit needs a production build",
        }]
    for page in html_pages(dist):
        rel = str(page.relative_to(project_root))
        text = page.read_text(encoding="utf-8", errors="replace")
        if is_verification_file(page, text):
            continue
        levels = [int(m.group(1)) for m in HEADINGS_RE.finditer(text)]
        h1 = sum(1 for l in levels if l == 1)
        if h1 == 0:
            findings.append({
                "ruleId": "CHECK", "severity": "medium",
                "message": "page has no H1", "file": rel,
            })
        elif h1 > 1:
            findings.append({
                "ruleId": "CHECK", "severity": "medium",
                "message": f"page has {h1} H1 elements (audit history: live site shipped 3)",
                "file": rel,
            })
        prev = None
        for lvl in levels:
            if prev is not None and lvl - prev > 1:
                findings.append({
                    "ruleId": "CHECK", "severity": "low",
                    "message": f"heading level skip h{prev}→h{lvl}",
                    "file": rel,
                })
                break
            prev = lvl
    return findings
