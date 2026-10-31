"""Build gate — verifies build/typecheck commands exist; executes with --execute.

Default (dry) mode only reports configuration, so audits stay fast and never
require node. Set --execute to actually run the commands (Definition of Done).
"""
from pathlib import Path
import json
import os
import subprocess
import sys

sys.path.insert(0, str(Path(__file__).parent))

APPLIES = ("astro", "*",)


def run(project_root: Path, info: dict, execute: bool | None = None):
    findings = []
    execute = execute if execute is not None else (
        os.environ.get("WW_BUILD_EXECUTE") == "1")
    pkg_path = project_root / "package.json"
    if not pkg_path.is_file():
        return [{
            "ruleId": "CHECK", "severity": "info", "classification": "info",
            "message": "not an npm-style project; build gate skipped",
        }]
    scripts = (json.loads(pkg_path.read_text(encoding="utf-8"))
               .get("scripts") or {})
    pm = info.get("packageManager") or "npm"
    for label, cmd_name, rule in (
        ("production build", "build", "ASTRO-TSC-001"),
        ("typecheck", "typecheck", "ASTRO-TSC-001"),
    ):
        if cmd_name not in scripts:
            findings.append({
                "ruleId": rule, "severity": "low" if cmd_name == "build" else "medium",
                "message": f"package.json has no \"{cmd_name}\" script ({label} gate undefined)",
            })
            continue
        if not execute:
            findings.append({
                "ruleId": rule, "severity": "info", "classification": "info",
                "message": f"{label} command configured: {pm} run {cmd_name} "
                           "(dry run; set --execute to run it)",
            })
            continue
        runner = [pm, "run", cmd_name] if pm != "npm" else ["npm", "run", cmd_name]
        try:
            proc = subprocess.run(runner, cwd=str(project_root),
                                  capture_output=True, text=True, timeout=900)
            ok = proc.returncode == 0
            findings.append({
                "ruleId": rule, "severity": "high" if not ok else "info",
                "classification": "violation" if not ok else "info",
                "message": f"{label}: {'passed' if ok else 'FAILED exit %d' % proc.returncode}",
                "evidence": (proc.stderr or proc.stdout)[-400:] if not ok else None,
            })
        except Exception as exc:
            findings.append({
                "ruleId": rule, "severity": "medium",
                "message": f"{label} could not run ({pm} missing?): {exc}",
            })
    return findings


def run_with_args(project_root, info, argv=None):
    import argparse
    p = argparse.ArgumentParser()
    p.add_argument("--execute", action="store_true")
    args, _ = p.parse_known_args(argv or [])
    return run(project_root, info, execute=args.execute)
