#!/usr/bin/env python3
"""Self-test for the Water World engineering check suite.

Runs the full runner against a fixture site containing deliberate violations
and asserts the expected rule IDs fire; then asserts the runner exits
non-zero under --fail-on. Also validates that every rule file declaring a
detector references an existing check script.

Usage (from kit root): python tests/selftest.py
"""
import json
import subprocess
import sys
from pathlib import Path

KIT = Path(__file__).resolve().parent.parent
FIXTURE = KIT / "tests" / "fixtures" / "demo-astro"

EXPECTED_RULE_IDS = {"SEC-CRED-001", "ASTRO-META-001"}


def main():
    failures = []
    proc = subprocess.run(
        [sys.executable, str(KIT / "run-checks.py"), str(FIXTURE),
         "--profile", "astro", "--json", str(FIXTURE / ".findings.json")],
        capture_output=True, text=True)
    if not (FIXTURE / ".findings.json").is_file():
        failures.append(f"runner did not write findings JSON: {proc.stderr[-300:]}")
        report("fixture run", failures)
        return 1
    data = json.loads((FIXTURE / ".findings.json").read_text(encoding="utf-8"))
    fired = {f["ruleId"] for f in data["findings"]}

    expected = {
        "SEC-CRED-001",
        "ASTRO-META-001",
        "ASTRO-DEP-001",
        "ASTRO-IMG-002",
        "ASTRO-HYD-002",
        "ASTRO-CSS-002",
        "A11Y-SKIP-001",
        "ASTRO-META-003",
        "SEO-NAP-001",
    }
    # mojibake detector is generic CHECK id with message match
    moji = any("mojibake" in f["message"].lower() for f in data["findings"])
    title_doubling = any("doubling" in f["message"].lower()
                         or "2x" in f["message"]
                         for f in data["findings"])
    canonical_mismatch = any("canonical/og:host mismatch" in f["message"]
                             for f in data["findings"])

    for rid in sorted(expected):
        if rid not in fired:
            failures.append(f"expected rule {rid} did not fire on fixture")
    if not moji:
        failures.append("expected mojibake finding on fixture")
    if not title_doubling:
        failures.append("expected title-doubling finding on fixture")
    if not canonical_mismatch:
        failures.append("expected canonical host mismatch finding on fixture")
    if proc.returncode == 0:
        failures.append("runner exited 0 despite critical findings")

    # detector references resolve: every rule's detection: script exists
    missing_detectors = []
    for rule in KIT.glob("profiles/*/rules/*.md"):
        text = rule.read_text(encoding="utf-8")
        for line in text.splitlines():
            if line.startswith("detection:") and ".py" in line:
                script = line.split("detection:", 1)[1].split()[0].strip()
                base = script.split("/")[-1]
                if base.startswith("--"):
                    continue  # inline flags after script name
                hits = list(KIT.glob(f"**/checks/{Path(base).name}"))
                if not hits and ".py" in base:
                    missing_detectors.append(f"{rule.name}: {base}")
    if missing_detectors:
        print("[warn] rules referencing missing detectors (visible debt):")
        for m in missing_detectors:
            print("   ", m)

    (FIXTURE / ".findings.json").unlink(missing_ok=True)
    report("fixture suite", failures)
    return 1 if failures else 0


def report(name, failures):
    if failures:
        print(f"SELFTEST FAIL — {name}")
        for f in failures:
            print("  -", f)
    else:
        print(f"SELFTEST OK — {name}")


if __name__ == "__main__":
    sys.exit(main())
