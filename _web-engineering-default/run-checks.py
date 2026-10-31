#!/usr/bin/env python3
"""Run Water World engineering checks against a website project.

Usage (from the kit root):
    python run-checks.py <project-root> [--profile astro] [--only ID,ID]
                         [--json out.json] [--fail-on medium]

Collects check modules from profiles/<profile>/checks/ and modules/*/checks/,
runs those whose APPLIES tuple includes the detected framework, prints a
scorecard summary, and optionally writes findings JSON conforming to
core/schemas/finding.schema.json. Exit code 1 when findings at or above
--fail-on severity exist. Standard library only.
"""

import argparse
import importlib.util
import json
import sys
from pathlib import Path

KIT_ROOT = Path(__file__).resolve().parent
sys.path.insert(0, str(KIT_ROOT / "core" / "discovery"))
from discover import discover  # noqa: E402

SEVERITY_ORDER = {"info": 0, "low": 1, "medium": 2, "high": 3, "critical": 4}


def load_check_modules(profile: str):
    checks = []
    for path in sorted(KIT_ROOT.glob("profiles/*/checks/*.py")) + sorted(
        KIT_ROOT.glob("modules/*/checks/*.py")
    ):
        name = path.stem
        if name.startswith("_"):
            continue  # shared helper libraries are not checks
        spec = importlib.util.spec_from_file_location(f"wwcheck_{profile}_{name}", path)
        module = importlib.util.module_from_spec(spec)
        try:
            spec.loader.exec_module(module)
        except Exception as exc:  # broken detector must not kill the whole run
            checks.append({"name": name, "error": f"failed to import: {exc}"})
            continue
        applies = getattr(module, "APPLIES", ())
        if profile in applies or "*" in applies:
            checks.append({"name": name, "module": module, "path": str(path)})
    return checks


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("project_root")
    parser.add_argument("--profile", default=None,
                        help="framework profile (default: auto-detect)")
    parser.add_argument("--only", default=None, help="comma-separated check names")
    parser.add_argument("--json", dest="json_out", default=None)
    parser.add_argument("--fail-on", default="medium",
                        choices=list(SEVERITY_ORDER))
    args = parser.parse_args(argv)

    info = discover(args.project_root)
    framework = args.profile or info.get("framework") or "unknown"
    if framework == "unknown":
        print("Could not detect framework; pass --profile explicitly.", file=sys.stderr)
        return 2

    only = set(args.only.split(",")) if args.only else None
    findings = []
    ran = []
    for entry in load_check_modules(framework):
        if "module" not in entry:
            print(f"[warn] {entry['name']}: {entry['error']}", file=sys.stderr)
            continue
        if only and entry["name"] not in only:
            continue
        try:
            produced = entry["module"].run(Path(args.project_root), info) or []
        except Exception as exc:
            print(f"[warn] {entry['name']} crashed: {exc}", file=sys.stderr)
            continue
        ran.append(entry["name"])
        for i, finding in enumerate(produced, start=1):
            finding.setdefault("id", f"{entry['name']}-{i}")
            finding.setdefault("severity", "medium")
            finding.setdefault("classification", "violation")
            findings.append(finding)

    counts = {s: 0 for s in SEVERITY_ORDER}
    for f in findings:
        counts[f["severity"]] += 1

    summary = {
        "project": info["projectRoot"],
        "framework": framework,
        "kitVersion": _kit_version(),
        "checksRun": ran,
        "counts": counts,
        "findings": findings,
    }

    print(f"Water World checks — {Path(args.project_root).name} ({framework})")
    print(f"  checks run : {len(ran)}")
    print("  findings   : "
          + ", ".join(f"{s}={n}" for s, n in counts.items() if n))
    for f in findings:
        loc = f.get("file") or ""
        if f.get("line"):
            loc += f":{f['line']}"
        print(f"  [{f['severity']:>8}] {f['ruleId']}: {f['message']}"
              + (f"  ({loc})" if loc else ""))

    if args.json_out:
        Path(args.json_out).write_text(
            json.dumps(summary, indent=2), encoding="utf-8")
        print(f"  wrote {args.json_out}")

    threshold = SEVERITY_ORDER[args.fail_on]
    bad = [f for f in findings
           if SEVERITY_ORDER[f["severity"]] >= threshold
           and f.get("classification") == "violation"]
    return 1 if bad else 0


def _kit_version():
    manifest = KIT_ROOT / "manifest.json"
    try:
        return json.loads(manifest.read_text(encoding="utf-8"))["version"]
    except Exception:
        return "unknown"


if __name__ == "__main__":
    sys.exit(main())
