"""
compare.py — source-level SEO comparison: local site vs live competitors.

Run it from anywhere:
    python compare.py            (from inside the seo folder)
    python seo\\compare.py       (from the site root)

What it does:
  1. Reads competitor URLs from AGENTS.md (the **Competitors** section, filled
     in when this kit was installed).
  2. Extracts on-page facts from the LOCAL home page (the parent folder of this
     seo folder is the site source).
  3. Fetches each competitor URL live and extracts the same facts.
  4. Writes a side-by-side report to seo\\reports\\compare-YYYY-MM-DD.md and
     prints the path.

Standard library only. Competitor facts come from raw fetched HTML — on
JS-heavy builders (Wix etc.) some content renders in the browser and will be
missing here; the campaign agent deepens those rows with its own fetches.
"""

import datetime
import html as html_mod
import json
import os
import re
import urllib.request

BASE_DIR = os.path.dirname(os.path.abspath(__file__))   # the seo\ folder
SITE_ROOT = os.path.dirname(BASE_DIR)                   # the site folder
AGENTS_MD = os.path.join(BASE_DIR, "AGENTS.md")
REPORTS_DIR = os.path.join(BASE_DIR, "reports")

MAX_FETCH_BYTES = 1024 * 1024
FETCH_TIMEOUT = 15
LOCAL_READ_CAP = 256 * 1024
HYGIENE_PAGE_CAP = 300
USER_AGENT = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
              "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36")

SKIP_DIRS = {
    "$recycle.bin", "system volume information", "recovery", "perflogs",
    "windows", "program files", "program files (x86)", "programdata",
    "appdata", "node_modules", "__pycache__", ".git", ".hg", ".svn",
    ".idea", ".vscode", "dist", "build",
}


def skip_dir(name):
    low = name.lower()
    return (low in SKIP_DIRS or name.startswith(".") or name.startswith("$")
            or name.startswith("_"))


def clean_text(value):
    return re.sub(r"\s+", " ", html_mod.unescape(value or "")).strip()


def tag_attrs(tag):
    attrs = {}
    for match in re.finditer(r'([\w:-]+)\s*=\s*("([^"]*)"|\'([^\']*)\'|[^\s>]+)', tag):
        val = match.group(3) if match.group(3) is not None else match.group(4)
        if val is None:
            val = match.group(0).split("=", 1)[-1]
        attrs[match.group(1).lower()] = val
    return attrs


def jsonld_types(text):
    types = set()
    blocks = re.findall(
        r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>',
        text, re.I | re.S)

    def collect(node):
        if isinstance(node, dict):
            t = node.get("@type")
            if isinstance(t, str):
                types.add(t)
            elif isinstance(t, list):
                types.update(str(x) for x in t)
            for key in ("@graph", "mainEntity"):
                if key in node:
                    collect(node[key])
        elif isinstance(node, list):
            for item in node:
                collect(item)

    for block in blocks:
        block = block.strip()
        if not block:
            continue
        try:
            collect(json.loads(block))
        except ValueError:
            for m in re.finditer(r'"@type"\s*:\s*"([^"]+)"', block):
                types.add(m.group(1))
    return sorted(types)


def extract_facts(text):
    facts = {"title": "", "description": "", "h1": [], "h2Count": 0,
             "jsonldTypes": [], "wordCount": 0, "imgsMissingAlt": 0,
             "imgCount": 0, "canonical": ""}
    match = re.search(r"<title[^>]*>(.*?)</title>", text, re.I | re.S)
    if match:
        facts["title"] = clean_text(match.group(1))
    for meta in re.finditer(r"<meta\b[^>]*>", text, re.I):
        attrs = tag_attrs(meta.group(0))
        name = (attrs.get("name") or attrs.get("property") or "").lower()
        if name == "description" and attrs.get("content") and not facts["description"]:
            facts["description"] = clean_text(attrs["content"])
    for link in re.finditer(r"<link\b[^>]*>", text, re.I):
        attrs = tag_attrs(link.group(0))
        if (attrs.get("rel") or "").lower() == "canonical" and attrs.get("href"):
            facts["canonical"] = attrs["href"].strip()
    facts["h1"] = [clean_text(re.sub(r"<[^>]+>", " ", m))
                   for m in re.findall(r"<h1[^>]*>(.*?)</h1>", text, re.I | re.S)]
    facts["h2Count"] = len(re.findall(r"<h2\b", text, re.I))
    facts["jsonldTypes"] = jsonld_types(text)
    body = re.sub(r"<(script|style)\b[^>]*>.*?</\1>", " ", text, flags=re.I | re.S)
    body = re.sub(r"<[^>]+>", " ", body)
    facts["wordCount"] = len(re.findall(r"\w+", html_mod.unescape(body)))
    for img in re.finditer(r"<img\b[^>]*>", text, re.I):
        facts["imgCount"] += 1
        alt = tag_attrs(img.group(0)).get("alt")
        if alt is None or not alt.strip():
            facts["imgsMissingAlt"] += 1
    return facts


def find_home_html(root):
    queue = [(root, 0)]
    scanned = 0
    while queue and scanned < 300:
        current, depth = queue.pop(0)
        scanned += 1
        try:
            with os.scandir(current) as it:
                entries = list(it)
        except (PermissionError, OSError):
            continue
        htmls = sorted(e.name for e in entries
                       if not e.is_symlink() and e.is_file(follow_symlinks=False)
                       and e.name.lower().endswith((".html", ".htm")))
        lowered = [h.lower() for h in htmls]
        for preferred in ("index.html", "index.htm"):
            if preferred in lowered:
                return os.path.join(current, htmls[lowered.index(preferred)])
        if depth == 0 and htmls:
            return os.path.join(current, htmls[0])
        if depth < 3:
            for e in entries:
                try:
                    if e.is_symlink() or not e.is_dir(follow_symlinks=False):
                        continue
                    if skip_dir(e.name):
                        continue
                    if os.path.normcase(os.path.realpath(e.path)) == \
                            os.path.normcase(os.path.realpath(BASE_DIR)):
                        continue
                    queue.append((e.path, depth + 1))
                except (PermissionError, OSError):
                    continue
    return None


def iter_local_html(root):
    stack = [root]
    seen = 0
    base_key = os.path.normcase(os.path.realpath(BASE_DIR))
    while stack and seen < HYGIENE_PAGE_CAP:
        current = stack.pop()
        try:
            with os.scandir(current) as it:
                entries = list(it)
        except (PermissionError, OSError):
            continue
        for e in entries:
            try:
                if e.is_symlink():
                    continue
                if e.is_dir(follow_symlinks=False):
                    if not skip_dir(e.name) and \
                            os.path.normcase(os.path.realpath(e.path)) != base_key:
                        stack.append(e.path)
                elif e.is_file(follow_symlinks=False) and \
                        e.name.lower().endswith((".html", ".htm")):
                    seen += 1
                    yield e.path
            except (PermissionError, OSError):
                continue


def local_hygiene(root):
    pages = list(iter_local_html(root))
    missing_title, missing_desc = [], []
    for path in pages:
        try:
            with open(path, "r", encoding="utf-8", errors="replace") as fh:
                text = fh.read(LOCAL_READ_CAP)
        except (PermissionError, OSError):
            continue
        rel = os.path.relpath(path, root)
        if not re.search(r"<title[^>]*>.*?</title>", text, re.I | re.S):
            missing_title.append(rel)
        has_desc = any(
            (tag_attrs(m.group(0)).get("name") or "").lower() == "description"
            and tag_attrs(m.group(0)).get("content", "").strip()
            for m in re.finditer(r"<meta\b[^>]*>", text, re.I))
        if not has_desc:
            missing_desc.append(rel)
    return pages, missing_title, missing_desc


def load_competitor_urls():
    try:
        with open(AGENTS_MD, "r", encoding="utf-8") as fh:
            text = fh.read()
    except OSError:
        return []
    match = re.search(r"\*\*Competitors\*\*(.*?)(?=\n\*\*|\n##|\Z)", text, re.S)
    if not match:
        return []
    urls = []
    for line in match.group(1).splitlines():
        line = line.strip()
        if not line.startswith("-"):
            continue
        for token in re.findall(r"(?:https?://)?[\w.-]+\.[a-z]{2,}(?:/\S*)?",
                                line, re.I):
            if token.startswith("{{"):
                continue
            urls.append(token if "://" in token else "https://" + token)
    return urls


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    try:
        with urllib.request.urlopen(req, timeout=FETCH_TIMEOUT) as resp:
            raw = resp.read(MAX_FETCH_BYTES)
        return raw.decode("utf-8", errors="replace"), None
    except Exception as exc:
        return None, str(exc)


def cell(value):
    text = value if value else "—"
    return str(text).replace("|", "\\|")


def gap_rows(mine, theirs):
    rows = []
    if theirs["title"] and not mine["title"]:
        rows.append("They have a title tag; mine is missing")
    if theirs["description"] and not mine["description"]:
        rows.append("They have a meta description; mine is missing")
    if theirs["h1"] and not mine["h1"]:
        rows.append("They have an H1; mine is missing")
    if len(mine["h1"]) > 1:
        rows.append("I have %d H1s (should be exactly one)" % len(mine["h1"]))
    missing_types = [t for t in theirs["jsonldTypes"] if t not in mine["jsonldTypes"]]
    if missing_types:
        rows.append("Schema types they use that I don't: " + ", ".join(missing_types))
    if theirs["canonical"] and not mine["canonical"]:
        rows.append("They declare a canonical URL; I don't")
    if mine["wordCount"] and theirs["wordCount"] > mine["wordCount"] * 1.5:
        rows.append("Their content is much deeper (~%d vs ~%d words)"
                    % (theirs["wordCount"], mine["wordCount"]))
    if mine["imgsMissingAlt"]:
        rows.append("I have %d images without alt text" % mine["imgsMissingAlt"])
    return rows


def main():
    today = datetime.date.today().isoformat()
    competitors = load_competitor_urls()
    if not competitors:
        print("No competitor URLs found in AGENTS.md (section '**Competitors**').")
        print("Fill them in first — the kit placeholders are replaced at install time.")
        return

    home = find_home_html(SITE_ROOT)
    mine = None
    if home:
        try:
            with open(home, "r", encoding="utf-8", errors="replace") as fh:
                mine = extract_facts(fh.read(LOCAL_READ_CAP))
        except (PermissionError, OSError):
            mine = None

    lines = []
    lines.append("# Compare report — %s" % today)
    lines.append("")
    lines.append("- Site source: `%s`" % SITE_ROOT)
    lines.append("- Home page: `%s`" % (home or "NOT FOUND"))
    lines.append("- Competitors fetched: %d" % len(competitors))
    lines.append("")

    if mine is None:
        lines.append("**No local home page found — the 'me' column is empty. "
                     "Point this kit at a folder containing the site source.**")
        lines.append("")

    blank = {"title": "", "description": "", "h1": [], "h2Count": 0,
             "jsonldTypes": [], "wordCount": 0, "imgsMissingAlt": 0,
             "imgCount": 0, "canonical": ""}

    for url in competitors:
        host = re.sub(r"^https?://(www\.)?", "", url).split("/")[0]
        lines.append("## Me vs %s" % host)
        lines.append("")
        text, error = fetch(url)
        if error:
            lines.append("Fetch failed: %s — the campaign agent should fetch this "
                         "page with browser tools instead." % error)
            lines.append("")
            continue
        theirs = extract_facts(text)
        me = mine or blank
        lines.append("| Fact | Me (local source) | %s (live) |" % host)
        lines.append("|---|---|---|")
        rows = [
            ("Title", me["title"], theirs["title"]),
            ("Meta description", me["description"], theirs["description"]),
            ("H1", " / ".join(me["h1"]), " / ".join(theirs["h1"])),
            ("H2 count", str(me["h2Count"]), str(theirs["h2Count"])),
            ("Schema (JSON-LD @type)", ", ".join(me["jsonldTypes"]),
             ", ".join(theirs["jsonldTypes"])),
            ("Word count (approx)", str(me["wordCount"]), str(theirs["wordCount"])),
            ("Images missing alt", "%d of %d" % (me["imgsMissingAlt"], me["imgCount"]),
             "%d of %d" % (theirs["imgsMissingAlt"], theirs["imgCount"])),
            ("Canonical", me["canonical"], theirs["canonical"]),
        ]
        for label, my_val, their_val in rows:
            lines.append("| %s | %s | %s |" % (label, cell(my_val), cell(their_val)))
        lines.append("")
        gaps = gap_rows(me, theirs)
        if gaps:
            lines.append("**What they have that I lack:**")
            lines.append("")
            for gap in gaps:
                lines.append("- [ ] %s" % gap)
        else:
            lines.append("**What they have that I lack:** nothing detected "
                         "at source level.")
        lines.append("")

    pages, missing_title, missing_desc = local_hygiene(SITE_ROOT)
    lines.append("## Local hygiene sweep (%d pages)" % len(pages))
    lines.append("")
    if missing_title:
        lines.append("Pages missing a title tag:")
        lines.extend("- `%s`" % p for p in missing_title[:50])
        lines.append("")
    if missing_desc:
        lines.append("Pages missing a meta description:")
        lines.extend("- `%s`" % p for p in missing_desc[:50])
        lines.append("")
    if not missing_title and not missing_desc:
        lines.append("Every local page has a title and a meta description.")
        lines.append("")
    lines.append("---")
    lines.append("Raw-HTML extraction only. JS-rendered competitor content may be "
                 "incomplete; deepen any empty 'live' rows with a browser fetch.")

    os.makedirs(REPORTS_DIR, exist_ok=True)
    out_path = os.path.join(REPORTS_DIR, "compare-%s.md" % today)
    with open(out_path, "w", encoding="utf-8") as fh:
        fh.write("\n".join(lines))
    print("Report written: %s" % out_path)


if __name__ == "__main__":
    main()
