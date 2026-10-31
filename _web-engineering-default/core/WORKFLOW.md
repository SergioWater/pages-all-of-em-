# Core Workflow — how every task runs

Every engineering task in a governed project follows this loop. It is the
same loop the SEO campaigns used informally (see `_seo-default/AGENTS.md`
history); it is now mandatory.

```
INSPECT → PLAN → APPROVE(gate) → IMPLEMENT → BUILD → VERIFY → COMPARE → RECORD → LESSON?
```

1. **INSPECT** — run discovery (`core/discovery/discover.py`) and read the
   profile/module docs your task needs. Never edit code you have not read.
2. **PLAN** — identify the smallest set of changes that fixes the problem.
   Classify every change using `core/change-classes.md`.
3. **APPROVE** — if any change is class VISUAL or COPY-TONE, stop and propose
   to the owner. Proceed only on explicit approval. Invisible changes skip
   this gate (see the whitelist in change-classes.md).
4. **IMPLEMENT** — smallest safe remediation. Match existing patterns
   (profile docs + golden examples). One concern per commit/session.
5. **BUILD** — production build must pass (`run-checks.py build-gate` or the
   project's own command). No "works on my machine."
6. **VERIFY** — run the verification contract for the rule you applied
   (each rule's `verification:` field). Run relevant checks:
   `python run-checks.py <project> --json .quality/state/last-findings.json`
7. **COMPARE** — before/after against baselines
   (`.quality/state/baselines/`). Record deltas. Never hide regressions.
8. **RECORD** — append to `.quality/state/progress.md` using the grammar in
   `core/journal.md`.
9. **LESSON?** — if the fix taught something reusable, write a proposal per
   `core/learning/lesson-template.md`. Do not self-promote to the kit.

Failure at any step: revert toward the last good state (git), do not stack
fixes on broken foundations. The documented recovery protocol from the kensei
campaign applies: restore style files + churned files from git, re-apply only
invisible work and approved copy.
