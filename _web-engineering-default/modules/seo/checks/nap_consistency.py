"""NAP consistency — phone variants across built pages and JSON-LD.

Methodology from roles/7-local-seo-specialist.md (variance tables) and core
honesty rules. Byte-identical NAP everywhere.
"""
from pathlib import Path
import json
import re
import sys

sys.path.insert(0, str(Path(__file__).parent.parent.parent / "profiles/astro/checks"))
from _ww_common import find_dist, html_pages, LDJSON_RE  # noqa: E402

APPLIES = ("astro", "*",)

TEL_RE = re.compile(r"href=[\"']tel:([+\d][\d\-().\s]{6,})[\"']", re.I)


def _digits(s: str) -> str:
    return re.sub(r"\D", "", s or "")


def run(project_root: Path, info: dict):
    findings = []
    dist = find_dist(project_root)
    if not dist:
        return [{
            "ruleId": "SEO-NAP-001", "severity": "info", "classification": "info",
            "message": "no dist/ build; NAP audit needs production HTML",
        }]
    tel_variants = {}
    schema_phones = set()
    for page in html_pages(dist):
        text = page.read_text(encoding="utf-8", errors="replace")
        for m in TEL_RE.finditer(text):
            raw = m.group(1).strip()
            tel_variants.setdefault(_digits(raw), set()).add(
                (str(page.relative_to(project_root)), raw))
        for lm in LDJSON_RE.finditer(text):
            try:
                data = json.loads(lm.group(1))
            except json.JSONDecodeError:
                continue
            stack = [data]
            while stack:
                node = stack.pop()
                if isinstance(node, dict):
                    if isinstance(node.get("telephone"), str):
                        schema_phones.add(_digits(node["telephone"]))
                    stack.extend(v for v in node.values()
                                 if isinstance(v, (dict, list)))
                elif isinstance(node, list):
                    stack.extend(v for v in node if isinstance(v, (dict, list)))
    if len(tel_variants) > 1:
        detail = "; ".join(sorted({raw for s in tel_variants.values() for _, raw in s}))
        findings.append({
            "ruleId": "SEO-NAP-001", "severity": "medium",
            "message": f"{len(tel_variants)} distinct tel: formats in use — pick one "
                       f"canonical display format: {detail}",
        })
    if tel_variants and schema_phones and not schema_phones.issubset(set(tel_variants)):
        findings.append({
            "ruleId": "SEO-NAP-001", "severity": "medium",
            "message": f"JSON-LD telephone digits {sorted(schema_phones)} do not all appear "
                       "as tel: links on pages — schema/page mismatch",
        })
    if tel_variants:
        findings.append({
            "ruleId": "SEO-NAP-001", "severity": "info", "classification": "info",
            "message": f"NAP phone digits found: {sorted(tel_variants)}; "
                       "verify byte-identical format vs GBP/directories manually",
        })
    return findings
