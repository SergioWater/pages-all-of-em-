"""Mojibake scan — flags Windows-1252 corruption sequences in source/dist.

Post-mortem: AP-mojibake-migration (sentinals em-dash corruption).
"""
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).parent))
from _ww_common import iter_files, MOJIBAKE_PATTERNS  # noqa: E402

APPLIES = ("astro", "*",)


def run(project_root: Path, info: dict):
    findings = []
    seen = set()
    suffixes = (".astro", ".ts", ".tsx", ".md", ".mdx", ".css", ".html", ".json")
    for path in iter_files(project_root, suffixes):
        text = path.read_text(encoding="utf-8", errors="replace")
        hits = [p for p in MOJIBAKE_PATTERNS if p in text]
        if not hits:
            continue
        rel = str(path.relative_to(project_root))
        key = tuple(sorted(hits))
        if (rel, key) in seen:
            continue
        seen.add((rel, key))
        line = next((text[:m.start()].count("\n") + 1
                     for p in hits for m in [__import__("re").search(__import__("re").escape(p), text)] if m),
                    None)
        findings.append({
            "ruleId": "CHECK", "severity": "medium",
            "message": f"mojibake sequences {hits} — legacy encoding corruption",
            "file": rel, "line": line,
            "suggestedFixRef": "profiles/astro/anti-patterns/AP-mojibake-migration.md",
        })
    return findings
