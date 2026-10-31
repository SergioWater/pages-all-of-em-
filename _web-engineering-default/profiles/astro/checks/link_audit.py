"""Link audit — bare hash anchors on non-home pages; insecure http:// links."""
from pathlib import Path
import re
import sys

sys.path.insert(0, str(Path(__file__).parent))
from _ww_common import iter_files  # noqa: E402

APPLIES = ("astro", "*")

HREF_RE = re.compile(r"""href=(?:"([^"]*)"|'([^']*)')""", re.I)


def run(project_root: Path, info: dict):
    findings = []
    for path in iter_files(project_root, (".astro",)):
        rel = str(path.relative_to(project_root))
        text = path.read_text(encoding="utf-8", errors="replace")
        for m in HREF_RE.finditer(text):
            href = next(g for g in m.groups() if g is not None)
            line = text[:m.start()].count("\n") + 1
            if href.startswith("http://"):
                findings.append({
                    "ruleId": "CHECK", "severity": "medium",
                    "message": f"insecure http:// link: {href[:80]}",
                    "file": rel, "line": line,
                })
            elif href.startswith("#") and len(href) > 1:
                # hash-only anchors resolve against the current page; on non-home
                # pages these silently break the homepage-section convention.
                # sections/*.astro compose the homepage by convention — skip them.
                normalized = rel.replace("\\", "/")
                if ("pages/index.astro" not in normalized
                        and path.name != "index.astro"
                        and not normalized.startswith("src/sections/")):
                    findings.append({
                        "ruleId": "CHECK", "severity": "low",
                        "message": f"hash-only href \"{href}\" outside home page — "
                                   "prefer root-relative /#anchor (kensei fix pattern)",
                        "file": rel, "line": line,
                    })
    return findings
