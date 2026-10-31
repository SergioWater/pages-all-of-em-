"""Metadata audit — titles, brand-suffix doubling, descriptions over dist HTML.

Implements ASTRO-META-002 (and sanity-checks description presence).
"""
from pathlib import Path
import re
import sys

sys.path.insert(0, str(Path(__file__).parent))
from _ww_common import (find_dist, html_pages, strip_tags, TITLE_RE, DESC_RE,  # noqa: E402
                        is_verification_file)

APPLIES = ("astro",)


def _site_title_from_consts(project_root: Path):
    for name in ("consts.ts", "constants.ts", "src/consts.ts", "src/constants.ts",
                 "lib/constants.ts", "src/lib/constants.ts"):
        p = project_root / name
        if p.is_file():
            m = re.search(r"SITE_TITLE\s*=\s*[\"']([^\"']+)[\"']",
                          p.read_text(encoding="utf-8", errors="replace"))
            if m:
                return m.group(1)
    return None


def run(project_root: Path, info: dict):
    findings = []
    dist = find_dist(project_root)
    if not dist:
        return [{
            "ruleId": "ASTRO-META-002", "severity": "info",
            "classification": "info",
            "message": "no dist/ build; metadata audit needs a production build",
        }]
    brand = _site_title_from_consts(project_root)
    pages = [pg for pg in html_pages(dist)
             if not is_verification_file(pg, pg.read_text(encoding="utf-8", errors="replace"))]
    seen_titles = {}
    for page in pages:
        rel = str(page.relative_to(project_root))
        text = page.read_text(encoding="utf-8", errors="replace")
        tm = TITLE_RE.search(text)
        title = strip_tags(tm.group(1)).strip() if tm else ""
        if not title:
            findings.append({
                "ruleId": "ASTRO-META-002", "severity": "high",
                "message": "page has no <title>", "file": rel,
            })
        else:
            if title in seen_titles:
                findings.append({
                    "ruleId": "ASTRO-META-002", "severity": "medium",
                    "message": f"duplicate title also used by {seen_titles[title]}: \"{title}\"",
                    "file": rel,
                })
            else:
                seen_titles[title] = rel
        if brand and title.count(brand) > 1:
            findings.append({
                "ruleId": "ASTRO-META-002", "severity": "medium",
                "message": f"brand suffix appears {title.count(brand)}x in title (doubling)",
                "file": rel, "evidence": title,
                "suggestedFixRef": "anti-patterns/AP-title-doubling.md",
            })
        dm = DESC_RE.search(text)
        if not dm:
            findings.append({
                "ruleId": "ASTRO-META-002", "severity": "medium",
                "message": "missing meta description", "file": rel,
            })
        elif not (50 <= len(dm.group(1)) <= 320):
            findings.append({
                "ruleId": "ASTRO-META-002", "severity": "low",
                "message": f"meta description length {len(dm.group(1))} outside 50–320",
                "file": rel,
            })
    return findings
