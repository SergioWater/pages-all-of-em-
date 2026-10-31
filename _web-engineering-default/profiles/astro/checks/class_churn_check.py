"""Class churn check — git diff based guard for ASTRO-CSS-002.

Reports class attribute tokens that changed on modified .astro files so a
human can confirm renames were approved. Requires a git repo; gracefully
reports nothing otherwise. Optional base ref via --base handled by runner env:
set WW_DIFF_BASE (default HEAD).
"""
from pathlib import Path
import os
import re
import subprocess
import sys

APPLIES = ("astro",)

CLASS_RE = re.compile(r'class(?:Name)?=(?:"([^"]*)"|\'([^\']*)\'|\{([^}]*)\})')


def _git_diff(project_root: Path):
    base = os.environ.get("WW_DIFF_BASE", "HEAD")
    try:
        return subprocess.run(
            ["git", "diff", "--unified=0", base, "--", "src"],
            cwd=str(project_root), capture_output=True, text=True, timeout=60,
        ).stdout
    except Exception:
        return ""


def run(project_root: Path, info: dict):
    findings = []
    diff = _git_diff(project_root)
    if not diff:
        return [{
            "ruleId": "ASTRO-CSS-002", "severity": "info", "classification": "info",
            "message": "no git diff available for class-churn analysis",
        }]
    current_file = None
    removed, added = set(), set()
    for line in diff.splitlines():
        if line.startswith("+++ b/"):
            current_file = line[6:]
        elif line.startswith("-") and not line.startswith("---"):
            removed.update(m.group(0) for m in CLASS_RE.finditer(line))
        elif line.startswith("+") and not line.startswith("+++"):
            added.update(m.group(0) for m in CLASS_RE.finditer(line))
    churned = {t for t in removed ^ added}
    if churned:
        findings.append({
            "ruleId": "ASTRO-CSS-002", "severity": "medium",
            "message": f"{len(churned)} class attribute expression(s) changed in diff — "
                       "confirm renames were owner-approved (wired selectors break silently)",
            "classification": "needs-validation",
            "evidence": "; ".join(sorted(churned)[:5]),
            "suggestedFixRef": "anti-patterns/AP-css-churn-during-content-work.md",
        })
    else:
        findings.append({
            "ruleId": "ASTRO-CSS-002", "severity": "info", "classification": "info",
            "message": "class attributes unchanged in working diff",
        })
    return findings
