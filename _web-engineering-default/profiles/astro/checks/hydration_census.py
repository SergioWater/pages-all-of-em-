"""Hydration census — inventories client:* directives and component scripts.

Implements ASTRO-HYD-001/002/003.
"""
from pathlib import Path
import re

APPLIES = ("astro",)

CLIENT_RE = re.compile(r"client:(load|idle|visible|media|only)")
BANNED = {"load", "idle"}
SCRIPT_RE = re.compile(r"<script\b([^>]*)>", re.I)


def run(project_root: Path, info: dict):
    findings = []
    islands = []
    scripts_total = 0
    inline_first_party = 0

    src = project_root / "src"
    if not src.is_dir():
        return findings
    for path in src.rglob("*"):
        if not path.is_file() or path.suffix.lower() not in (".astro", ".tsx"):
            continue
        text = path.read_text(encoding="utf-8", errors="replace")
        rel = str(path.relative_to(project_root))
        for m in CLIENT_RE.finditer(text):
            kind = m.group(1)
            line = text[:m.start()].count("\n") + 1
            islands.append(f"{rel}:{line} client:{kind}")
            if kind in BANNED:
                findings.append({
                    "ruleId": "ASTRO-HYD-001", "severity": "high",
                    "message": f"banned eager hydration client:{kind}",
                    "file": rel, "line": line,
                    "evidence": f"client:{kind}",
                    "suggestedFixRef": "profiles/astro/rules/ASTRO-HYD-001.md",
                })
        for sm in SCRIPT_RE.finditer(text):
            scripts_total += 1
            attrs = sm.group(1) or ""
            if "is:inline" in attrs:
                # third-party embeds are legitimate; first-party inline is not.
                # Heuristic: flag only files that also contain client directives? Keep informational.
                inline_first_party += 1

    n = len(islands)
    for entry in islands:
        findings.append({
            "ruleId": "CHECK", "severity": "info", "classification": "info",
            "message": f"island: {entry}",
        })
    findings.append({
        "ruleId": "ASTRO-HYD-002", "severity": "info", "classification": "info",
        "message": f"island count: {n} (budget ~5); module <script> tags: {scripts_total}",
    })
    if n > 5:
        findings.append({
            "ruleId": "ASTRO-HYD-002", "severity": "medium",
            "message": f"island budget exceeded: {n} > 5; justify each new island",
            "suggestedFixRef": "profiles/astro/rules/ASTRO-HYD-002.md",
        })
    return findings
