"""Assets audit — image attributes, font loading, background-image heroes.

Implements ASTRO-IMG-001/002/003 and ASTRO-FNT-001.
"""
from pathlib import Path
import re
import sys

sys.path.insert(0, str(Path(__file__).parent))
from _ww_common import iter_files, parse_attrs, IMG_RE  # noqa: E402

APPLIES = ("astro", "*")

FONT_IMPORT_RE = re.compile(
    r"@import\s+url\([\"']?https?://fonts\.googleapis", re.I)
FONT_LINK_RE = re.compile(
    r"<link[^>]+href=[\"']https?://(?:fonts\.googleapis|use\.typekit)", re.I)
BG_IMG_RE = re.compile(r"background(?:-image)?\s*:[^;]*url\(", re.I)


def _check_images(project_root: Path):
    findings = []
    for path in iter_files(project_root, (".astro",)):
        text = path.read_text(encoding="utf-8", errors="replace")
        rel = str(path.relative_to(project_root))
        for m in IMG_RE.finditer(text):
            tag = m.group(0)
            attrs = {k.lower(): v for k, v in parse_attrs(tag).items()}
            line = text[:m.start()].count("\n") + 1
            src = attrs.get("src", "")
            alt = attrs.get("alt")
            if alt is None:
                findings.append({
                    "ruleId": "ASTRO-IMG-003", "severity": "high",
                    "message": f"img missing alt attribute ({src[:60]})",
                    "file": rel, "line": line,
                    "suggestedFixRef": "profiles/astro/rules/ASTRO-IMG-003.md",
                })
            elif alt == "":
                findings.append({
                    "ruleId": "ASTRO-IMG-003", "severity": "info",
                    "classification": "info",
                    "message": f"empty alt (decorative?) — confirm intent ({src[:60]})",
                    "file": rel, "line": line,
                })
            elif re.search(r"\.(png|jpe?g|webp|avif|svg)\s*$", alt.strip(), re.I) \
                    or alt.lower() in ("image", "photo", "picture"):
                findings.append({
                    "ruleId": "ASTRO-IMG-003", "severity": "medium",
                    "message": f"placeholder-quality alt \"{alt}\" ({src[:60]})",
                    "file": rel, "line": line,
                })
            eager = attrs.get("loading", "").lower() == "eager"
            has_dims = "width" in attrs and "height" in attrs
            if not eager:
                if "loading" not in attrs:
                    findings.append({
                        "ruleId": "ASTRO-IMG-001", "severity": "low",
                        "message": f"img without loading attribute — add lazy default ({src[:60]})",
                        "file": rel, "line": line,
                    })
                if "decoding" not in attrs:
                    findings.append({
                        "ruleId": "ASTRO-IMG-001", "severity": "low",
                        "message": f"img without decoding=async ({src[:60]})",
                        "file": rel, "line": line,
                    })
            if not has_dims and "srcset" not in tag and "fill" not in tag:
                findings.append({
                    "ruleId": "ASTRO-IMG-002", "severity": "medium",
                    "message": f"img without width/height or srcset/fill — CLS risk ({src[:60]})",
                    "file": rel, "line": line,
                    "suggestedFixRef": "profiles/astro/rules/ASTRO-IMG-002.md",
                })
    return findings


def _check_fonts(project_root: Path):
    findings = []
    for path in iter_files(project_root, (".css", ".astro")):
        text = path.read_text(encoding="utf-8", errors="replace")
        rel = str(path.relative_to(project_root))
        if FONT_IMPORT_RE.search(text):
            line = text[:FONT_IMPORT_RE.search(text).start()].count("\n") + 1
            findings.append({
                "ruleId": "ASTRO-FNT-001", "severity": "high",
                "message": "render-blocking @import of Google Fonts inside CSS",
                "file": rel, "line": line,
                "suggestedFixRef": "anti-patterns/AP-render-blocking-font-import.md",
            })
    return findings


def _check_bg_heroes(project_root: Path):
    findings = []
    styles = project_root / "src" / "styles"
    targets = list(styles.glob("*.css")) if styles.is_dir() else []
    landing = [p for p in targets if p.name in ("landing.css", "sections.css")]
    for path in targets:
        text = path.read_text(encoding="utf-8", errors="replace")
        rel = str(path.relative_to(project_root))
        for m in BG_IMG_RE.finditer(text):
            line = text[:m.start()].count("\n") + 1
            findings.append({
                "ruleId": "CHECK", "severity": "info",
                "message": "background-image usage — verify it is not an LCP hero "
                           "(invisible to lazy/LCP tooling)",
                "file": rel, "line": line,
                "classification": "needs-validation",
                "suggestedFixRef": "anti-patterns/AP-bg-image-hero.md",
            })
    return findings


def run(project_root: Path, info: dict):
    return (_check_images(project_root) + _check_fonts(project_root)
            + _check_bg_heroes(project_root))
