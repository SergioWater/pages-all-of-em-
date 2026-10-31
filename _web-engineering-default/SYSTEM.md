# Water World Web Engineering System

You are working in a website project governed by this system. Read this file
first. It tells you where everything else lives and what you must never do.

## What this is

A versioned, code-derived engineering system installed (or referenced) at
`_web-engineering-default/`. It encodes how Water World builds, audits,
improves, and verifies websites — derived from real projects (kensei,
sentinals soccer club astro) and real measured lessons, not generic advice.

## Load order (progressive — read only what your task needs)

1. `SYSTEM.md` (this file) — always.
2. The relevant profile entry: `profiles/astro/PROFILE.md` (or nextjs later).
3. The relevant module README: `modules/<domain>/README.md`.
4. Specific docs/rules by ID via that profile's or module's `INDEX.json`.

Do not read every doc. Do not load unrelated modules.

## The three layers

- **CORE** (`core/`) — how agents work: workflow, change classes, honesty
  rules, journaling, definition-of-done, learning loop. Framework-neutral.
- **PROFILES** (`profiles/<framework>/`) — how we build sites per framework:
  architecture conventions, rules with machine-readable frontmatter, golden
  examples, anti-pattern post-mortems, executable checks.
- **QUALITY MODULES** (`modules/<domain>/`) — domain audits (seo,
  performance, lighthouse, accessibility, security, deployment). Lighthouse
  is evidence, not truth.

## Non-negotiables (details in core/change-classes.md + core/honesty-rules.md)

1. Invisible technical changes may proceed; visual/layout/copy-tone changes
   require explicit owner approval first.
2. Never invent business facts. Unverified claims are removed or gated behind
   `OWNER_CONFIRM_*` placeholders until the owner confirms them.
3. Preserve existing design systems. Never introduce a second one.
4. Project state under `<site>/.quality/state/` survives every kit update.
   Never edit it as part of a reusable-knowledge change.
5. A change is done only after: build → typecheck → audit → verify → compare
   → record in the project journal → ask "is there a reusable lesson?"
6. Prefer the smallest safe remediation. Never optimize for a Lighthouse score
   at the cost of function, access, honesty, or design intent.

## Executable knowledge

Rules may declare a detector script (`detection:` field). Run all applicable
checks from the kit root:

```
python run-checks.py <project-root> --profile astro --json out.json
```

Findings conform to `core/schemas/finding.schema.json`. A rule whose detector
does not exist yet is visible debt, tracked by `tests/selftest.py`.

## Project state vs reusable knowledge

| Path | Owner | Updates may touch? |
|---|---|---|
| `<kit>/` | the system (versioned) | yes — via updates |
| `<site>/.quality/kit.lock.json` | Water World | yes — on install/update |
| `<site>/.quality/state/` | the project | **never**, except journaled migrations |

## Learning loop

After any meaningful fix: capture a lesson proposal using
`core/learning/lesson-template.md` into the project's
`state/lessons/proposed/`. A Knowledge Curator (`core/learning/CURATOR.md`)
reviews, generalizes, and promotes accepted lessons into new rules, patterns,
or checks — then the manifest version bumps.
