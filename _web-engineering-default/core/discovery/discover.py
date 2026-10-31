#!/usr/bin/env python3
"""Project discovery for the Water World Web Engineering System.

Usage:
    python core/discovery/discover.py <project-root>

Prints a JSON description of the project: framework, versions, integrations,
package manager, build commands, source/dist layout, configured site URL.
Standard library only.
"""

import json
import re
import sys
from pathlib import Path


def _read_json(path: Path):
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception:
        return None


def detect_package_manager(root: Path) -> str | None:
    for lock, name in (
        ("pnpm-lock.yaml", "pnpm"),
        ("package-lock.json", "npm"),
        ("yarn.lock", "yarn"),
        ("bun.lockb", "bun"),
    ):
        probe = root
        for _ in range(4):  # monorepo roots may own the lockfile
            if (probe / lock).is_file():
                return name
            if probe.parent == probe:
                break
            probe = probe.parent
    return None


def detect_framework(pkg: dict) -> tuple[str | None, str | None, list]:
    deps = {}
    deps.update(pkg.get("dependencies") or {})
    deps.update(pkg.get("devDependencies") or {})
    integrations = sorted(k for k in deps if k.startswith("@astrojs/"))
    if "astro" in deps:
        return "astro", deps["astro"], integrations
    if "next" in deps:
        return "nextjs", deps["next"], []
    if "vite" in deps:
        return "vite", deps["vite"], []
    return None, None, []


def detect_site_url(root: Path, framework: str | None) -> str | None:
    patterns = {
        "astro": root / "astro.config.mjs",
        "nextjs": root / "next.config.mjs",
    }
    cfg = patterns.get(framework)
    if cfg is None:
        for candidate in ("astro.config.ts", "astro.config.js"):
            if (root / candidate).is_file():
                cfg = root / candidate
                break
    if cfg is None or not cfg.is_file():
        return None
    match = re.search(r"site\s*:\s*[\"']([^\"']+)[\"']", cfg.read_text(encoding="utf-8"))
    return match.group(1) if match else None


def discover(project_root: str | Path) -> dict:
    root = Path(project_root).resolve()
    pkg = _read_json(root / "package.json") or {}
    framework, fw_version, integrations = detect_framework(pkg)
    scripts = pkg.get("scripts") or {}
    build_cmd = scripts.get("build")
    typecheck_cmd = scripts.get("typecheck")
    if framework == "astro" and not typecheck_cmd and "astro" in (pkg.get("devDependencies") or {}):
        typecheck_cmd = "astro check"
    dist_dir = "out" if framework == "nextjs" else "dist"
    return {
        "projectRoot": str(root),
        "name": pkg.get("name") or root.name,
        "framework": framework,
        "frameworkVersion": fw_version,
        "integrations": integrations,
        "packageManager": detect_package_manager(root),
        "buildCmd": build_cmd,
        "typecheckCmd": typecheck_cmd,
        "srcDir": "src" if (root / "src").is_dir() else None,
        "distDir": dist_dir if (root / dist_dir).is_dir() else None,
        "siteUrl": detect_site_url(root, framework),
        "hasTestsConfig": any(
            (root / f).is_file()
            for f in ("vitest.config.ts", "playwright.config.ts", "jest.config.js")
        ),
    }


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(__doc__)
        sys.exit(2)
    print(json.dumps(discover(sys.argv[1]), indent=2))
