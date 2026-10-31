"""Secret scan — key-shaped strings in source and config files.

Post-mortem: profiles/astro/anti-patterns/AP-committed-secrets.md
"""
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).parent.parent.parent / "profiles/astro/checks"))
from _ww_common import iter_files, SECRET_PATTERNS, SAFE_SECRET_CONTEXT  # noqa: E402

APPLIES = ("astro", "*",)


def run(project_root: Path, info: dict):
    findings = []
    suffixes = (".ts", ".tsx", ".astro", ".js", ".mjs", ".py", ".json",
                ".env", ".md")
    for path in iter_files(project_root, suffixes):
        text = path.read_text(encoding="utf-8", errors="replace")
        rel = str(path.relative_to(project_root))
        if "/.quality/" in f"/{rel}":
            continue
        for regex, label in SECRET_PATTERNS:
            for m in regex.finditer(text):
                line_start = text.rfind("\n", 0, m.start()) + 1
                line_end = text.find("\n", m.end())
                window = text[line_start:line_end if line_end != -1 else len(text)]
                if SAFE_SECRET_CONTEXT.search(window):
                    continue
                findings.append({
                    "ruleId": "SEC-CRED-001", "severity": "critical",
                    "message": f"{label} committed in source — rotate and move to env/hosting secrets",
                    "file": rel,
                    "line": text[:m.start()].count("\n") + 1,
                    "evidence": m.group(0)[:8] + "...",
                    "classification": "violation",
                })
    return findings
