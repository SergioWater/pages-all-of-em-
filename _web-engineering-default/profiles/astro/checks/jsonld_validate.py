"""JSON-LD validation — parses ld+json blocks; flags OWNER_CONFIRM leakage.

Implements ASTRO-META-003 (placeholder-leakage half) and honesty gates.
"""
from pathlib import Path
import json
import re
import sys

sys.path.insert(0, str(Path(__file__).parent))
from _ww_common import find_dist, html_pages, LDJSON_RE  # noqa: E402

APPLIES = ("astro", "*")

OWNER_CONFIRM_RE = re.compile(r"OWNER_CONFIRM_[A-Z0-9_]+")


def run(project_root: Path, info: dict):
    findings = []
    dist = find_dist(project_root)
    if not dist:
        return [{
            "ruleId": "ASTRO-META-003", "severity": "info",
            "classification": "info",
            "message": "no dist/ build; jsonld audit needs a production build",
        }]
    total_blocks = 0
    pages = html_pages(dist)
    for page in pages:
        rel = str(page.relative_to(project_root))
        text = page.read_text(encoding="utf-8", errors="replace")
        for i, m in enumerate(LDJSON_RE.finditer(text), start=1):
            total_blocks += 1
            raw = m.group(1).strip()
            try:
                json.loads(raw)
            except json.JSONDecodeError as exc:
                findings.append({
                    "ruleId": "ASTRO-META-003", "severity": "high",
                    "message": f"ld+json block {i} does not parse: {exc}",
                    "file": rel,
                })
        for om in OWNER_CONFIRM_RE.finditer(text):
            findings.append({
                "ruleId": "ASTRO-META-003", "severity": "critical",
                "message": f"unresolved owner-fact placeholder shipped in built HTML: {om.group(0)}",
                "file": rel,
                "suggestedFixRef": "core/honesty-rules.md",
            })
    if total_blocks == 0 and pages:
        findings.append({
            "ruleId": "ASTRO-META-003", "severity": "medium",
            "message": "no JSON-LD blocks found anywhere in dist (audit history: "
                       "competitors with LocalBusiness schema outranked the zero-schema site)",
        })
    else:
        findings.append({
            "ruleId": "ASTRO-META-003", "severity": "info", "classification": "info",
            "message": f"{total_blocks} ld+json blocks parsed across {len(pages)} pages",
        })
    return findings
