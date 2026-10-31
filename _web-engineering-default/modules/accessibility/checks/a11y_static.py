"""Static accessibility audit over built HTML.

Checks derived from gaps found in the 2026-08 code mining: no skip links
anywhere; hover-only dropdown menus; iframe titles; form labels; html lang.
Lighthouse/axe remain the deeper evidence source (modules/lighthouse).
"""
from pathlib import Path
import re
import sys

sys.path.insert(0, str(Path(__file__).parent.parent.parent / "profiles/astro/checks"))
from _ww_common import find_dist, html_pages, is_verification_file  # noqa: E402

APPLIES = ("astro", "*",)

LANG_RE = re.compile(r"<html[^>]*\blang\s*=\s*[\"']([a-zA-Z-]+)[\"']", re.I)
IFRAME_RE = re.compile(r"<iframe\b[^>]*>", re.I)
INPUT_RE = re.compile(r"<input\b[^>]*>/?>?", re.I)
LABEL_FOR_RE = re.compile(r"<label[^>]*\bfor=[\"']([^\"']+)[\"']", re.I)
SKIP_RE = re.compile(
    r"(class=[\"'][^\"']*skip[^\"']*[\"'])|(href=[\"']#(main|content|main-content)[\"'])", re.I)
EMPTY_LINK_RE = re.compile(
    r"<a\b(?![^>]*aria-label)(?![^>]*title=)[^>]*>\s*(<svg[\s\S]*?</svg>|&nbsp;|\s*)</a>", re.I)


def run(project_root: Path, info: dict):
    findings = []
    dist = find_dist(project_root)
    if not dist:
        return [{
            "ruleId": "A11Y-STATIC-001", "severity": "info", "classification": "info",
            "message": "no dist/ build; static a11y audit needs production HTML",
        }]
    pages = html_pages(dist)
    skip_count = sum(1 for p in pages if SKIP_RE.search(p.read_text(encoding="utf-8", errors="replace")))
    if skip_count == 0 and pages:
        findings.append({
            "ruleId": "A11Y-SKIP-001", "severity": "medium",
            "message": "no skip-to-content link on any page (workspace-wide gap)",
        })
    else:
        findings.append({
            "ruleId": "A11Y-SKIP-001", "severity": "info", "classification": "info",
            "message": f"skip links present on {skip_count}/{len(pages)} pages",
        })
    for page in pages:
        rel = str(page.relative_to(project_root))
        text = page.read_text(encoding="utf-8", errors="replace")
        if is_verification_file(page, text):
            continue
        if not LANG_RE.search(text):
            findings.append({
                "ruleId": "A11Y-LANG-001", "severity": "high",
                "message": "<html> missing lang attribute", "file": rel,
            })
        for m in IFRAME_RE.finditer(text):
            tag = m.group(0)
            if "title=" not in tag and "aria-label" not in tag:
                findings.append({
                    "ruleId": "A11Y-FRAME-001", "severity": "medium",
                    "message": "iframe without title attribute",
                    "file": rel, "line": text[:m.start()].count("\n") + 1,
                })
        labels = {x.lower() for x in LABEL_FOR_RE.findall(text)}
        for m in INPUT_RE.finditer(text):
            tag = m.group(0).lower()
            ttype = re.search(r"type=[\"']([^\"]+)", tag)
            itype = ttype.group(1) if ttype else "text"
            if itype in ("hidden", "submit", "button", "reset"):
                continue
            iid = re.search(r"id=[\"']([^\"']+)", tag)
            named = ("aria-label=" in tag or "aria-labelledby=" in tag)
            labeled = bool(iid and iid.group(1).lower() in labels)
            if not named and not labeled:
                findings.append({
                    "ruleId": "A11Y-FORM-001", "severity": "medium",
                    "message": f"form <input type={itype}> without label/aria-label association",
                    "file": rel, "line": text[:m.start()].count("\n") + 1,
                })
        for m in EMPTY_LINK_RE.finditer(text):
            findings.append({
                "ruleId": "A11Y-LINKNAME-001", "severity": "medium",
                "message": "link with no accessible name (icon-only link needs aria-label)",
                "file": rel, "line": text[:m.start()].count("\n") + 1,
            })
    return findings
