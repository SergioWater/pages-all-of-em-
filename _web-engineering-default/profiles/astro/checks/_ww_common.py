"""Shared helpers for Water World check modules (stdlib only)."""
import re
from pathlib import Path

MOJIBAKE_PATTERNS = [
    "â€", "Â·", "Ã¤", "Ã¶", "Ã¼", "â€™", "â€œ", "â€\x9d",
    "â€˜", "Â«", "Â»", "Ã©", "Â´",
]

SECRET_PATTERNS = [
    (re.compile(r"sk-[A-Za-z0-9]{20,}"), "OpenAI-style secret key"),
    (re.compile(r"sk-ant-[A-Za-z0-9-]{20,}"), "Anthropic key"),
    (re.compile(r"AIza[0-9A-Za-z_\-]{35}"), "Google API key"),
    (re.compile(r"ghp_[A-Za-z0-9]{36}"), "GitHub token"),
    (re.compile(r"xox[baprs]-[A-Za-z0-9-]{10,}"), "Slack token"),
    (re.compile(r"AKIA[0-9A-Z]{16}"), "AWS access key id"),
    (re.compile(r"key-[A-Za-z0-9]{24,}"), "Mailgun-style key"),
]

SAFE_SECRET_CONTEXT = re.compile(
    r"(process\.env|import\.meta\.env|os\.environ|getenv|OWNER_CONFIRM"
    r"|your[-_]|example|placeholder|<REDACTED)", re.I)

HTML_FILE_RE = re.compile(r"\.html?$")
ASTRO_RE = re.compile(r"\.(astro|tsx)$")


def iter_files(root: Path, suffixes, skip_dirs=("node_modules", ".git", ".astro", "dist")):
    """Yield files under root with matching suffix, pruning heavy/symlinked dirs.

    Uses os.walk without following symlinks so Windows junctions (e.g.
    public/photos -> media/photos) and pnpm farms never explode the scan.
    """
    import os
    suffixes = {s.lower() for s in suffixes}
    for dirpath, dirnames, filenames in os.walk(root, followlinks=False):
        rel_parts = set(Path(dirpath).relative_to(root).parts)
        if rel_parts & set(skip_dirs):
            dirnames[:] = []
            continue
        dirnames[:] = [d for d in dirnames
                       if d not in skip_dirs
                       and not (Path(dirpath) / d).is_symlink()]
        for name in filenames:
            path = Path(dirpath) / name
            if path.suffix.lower() in suffixes:
                yield path


def find_dist(root: Path):
    for name in ("dist", "out"):
        d = root / name
        if d.is_dir():
            return d
    return None


def html_pages(dist: Path):
    return [p for p in dist.rglob("*.html") if p.is_file()]


def strip_tags(html: str) -> str:
    return re.sub(r"<[^>]+>", "", html)


TITLE_RE = re.compile(r"<title[^>]*>(.*?)</title>", re.S | re.I)
DESC_RE = re.compile(
    r"<meta\s+name=[\"']description[\"']\s+content=[\"'](.*?)[\"']", re.S | re.I)
CANON_RE = re.compile(
    r"<link\s+[^>]*rel=[\"']canonical[\"'][^>]*href=[\"']([^\"']+)[\"']", re.I)
OGURL_RE = re.compile(
    r"<meta\s+property=[\"']og:url[\"']\s+content=[\"']([^\"']+)[\"']", re.I)
H1_RE = re.compile(r"<h1[\s>]", re.I)
HEADINGS_RE = re.compile(r"<h([1-6])[\s>]", re.I)
LDJSON_RE = re.compile(
    r"<script\s+type=[\"']application/ld\+json[\"'][^>]*>(.*?)</script>",
    re.S | re.I)
IMG_RE = re.compile(r"<img\b[^>]*>/?>?", re.I)
ATTR_RE = re.compile(r"(\w+)=(?:\"([^\"]*)\"|'([^']*)'|([^\s>]+))")


def parse_attrs(tag: str) -> dict:
    attrs = {}
    for m in ATTR_RE.finditer(tag):
        key = m.group(1).lower()
        attrs[key] = next(g for g in m.groups()[1:] if g is not None)
    return attrs


def host_of(url: str) -> str:
    m = re.match(r"https?://([^/]+)", url or "")
    return m.group(1).lower() if m else ""


def is_verification_file(path: Path, text: str) -> bool:
    """Google Search Console / Bing ownership-verification artifacts."""
    name = path.name.lower()
    if re.match(r"^(google|bing|yandex)[0-9a-f]{8,}\.html$", name):
        body = strip_tags(text).strip()
        return len(body) < 200
    return False
