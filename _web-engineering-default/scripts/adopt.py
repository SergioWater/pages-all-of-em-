#!/usr/bin/env python3
"""Adopt a website project into the Water World Web Engineering System.

Usage (from the kit root):
    python scripts/adopt.py <site-root> [--kit <kit-root>]

Creates <site-root>/.quality/state/ scaffolds and kit.lock.json.
Purely additive: refuses to run if .quality already exists, never touches
existing project files. Standard library only.
"""

import argparse
import datetime
import hashlib
import json
import sys
from pathlib import Path

KIT_ROOT = Path(__file__).resolve().parent.parent
STATE_SCHEMA_VERSION = 1

PROGRESS_TEMPLATE = """# Progress Journal

Append-only record of engineering work. Grammar:

### YYYY-MM-DD — [Role] short title
What was done, what changed, what's next.
Verify: build ✓ · typecheck ✓ · checks 0 findings

## Status
- [ ] First Water World baseline captured

## Blocked

## Blocked (owner facts only — not code)

## Parked

## Log
"""

FACTS_TEMPLATE = """# Site Facts (owner-confirmed only)

Rules: facts here are verified-correct. Unverified items belong behind
OWNER_CONFIRM_* placeholders or in Pending below. Never publish a guess.

## Identity
- Production URL:
- Platform / framework:
- Canonical host decision:

## NAP (byte-identical canonical format)
- Name:
- Address:
- Phone (E.164 for tel:, display format on page):

## Pending owner confirmation
- OWNER_CONFIRM_... :
"""

BRIEF_TEMPLATE = """# Project Brief
Prioritized plan (P0/P1/P2 by impact vs effort). Trace every item back to a
finding, audit report, or owner request.

## P0
## P1
## P2
"""


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("site_root")
    parser.add_argument("--kit", default=str(KIT_ROOT))
    args = parser.parse_args(argv)

    site = Path(args.site_root).resolve()
    kit = Path(args.kit).resolve()
    quality = site / ".quality"
    if quality.exists():
        print(f"Refusing: {quality} already exists.", file=sys.stderr)
        return 1

    manifest_path = kit / "manifest.json"
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    now = datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")

    state = quality / "state"
    for sub in ("baselines", "findings", "history", "lessons/proposed",
                "lessons/promoted"):
        (state / sub).mkdir(parents=True)
    (state / "progress.md").write_text(PROGRESS_TEMPLATE, encoding="utf-8")
    (state / "facts.md").write_text(FACTS_TEMPLATE, encoding="utf-8")
    (state / "brief.md").write_text(BRIEF_TEMPLATE, encoding="utf-8")
    (state / "decisions.md").write_text(
        "# Decisions Log\n\n| Date | Decision | Reason | Approver |\n|---|---|---|---|\n",
        encoding="utf-8")
    (state / "exceptions.json").write_text(
        json.dumps({"exceptions": []}, indent=2), encoding="utf-8")
    (state / "state.json").write_text(json.dumps({
        "schemaVersion": STATE_SCHEMA_VERSION,
        "createdAt": now,
        "migrations": [],
    }, indent=2), encoding="utf-8")

    lock = {
        "system": manifest["system"],
        "kitVersion": manifest["version"],
        "stateSchemaVersion": manifest.get("stateSchemaVersion", 1),
        "profiles": {k: v["version"] if isinstance(v, dict) else v
                     for k, v in manifest["profiles"].items()},
        "modules": {k: v["version"] if isinstance(v, dict) else v
                    for k, v in manifest["modules"].items()},
        "adoptedAt": now,
        "updatedAt": now,
        "sourceKit": str(kit),
        "manifestSha256": sha256(manifest_path),
    }
    (quality / "kit.lock.json").write_text(
        json.dumps(lock, indent=2), encoding="utf-8")

    print(f"Adopted {site.name}")
    print(f"  created {quality / 'kit.lock.json'}")
    print(f"  created {state}/ scaffolds")
    print("Next steps:")
    print("  - fill .quality/state/facts.md with owner-confirmed facts")
    print("  - capture first baselines (see modules/lighthouse/README.md)")
    print("  - run: python run-checks.py <site-root>")
    return 0


if __name__ == "__main__":
    sys.exit(main())
