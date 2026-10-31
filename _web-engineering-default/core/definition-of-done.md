# Definition of Done

A change is **not** done because code was written or because the model said
it worked. It is done when this chain completes:

```
IMPLEMENT → BUILD → TYPE CHECK → TEST* → AUDIT → VERIFY → COMPARE → DIFF INSPECT → RECORD → LESSON?
```

\* TEST where the project has tests; none of the current sites do yet (known
gap — do not skip silently, note it in the journal).

## The chain

1. **BUILD** — production build exits 0 (`pnpm run build` / `npm run build`).
2. **TYPE CHECK** — `astro check` / `tsc --noEmit` passes where configured.
3. **AUDIT** — run applicable checks:
   `python run-checks.py <project> --json .quality/state/last-findings.json`.
   No new findings vs before; pre-existing findings either fixed or explicitly
   accepted via exceptions.
4. **VERIFY** — execute the verification contract attached to each rule you
   touched (its `verification:` field). The agent does not invent success
   criteria after changing code; success was defined by the system beforehand.
5. **COMPARE** — metrics vs `.quality/state/baselines/`: Lighthouse categories,
   JS bytes shipped, image payload, route count. Record deltas in the journal.
   Regressions must be visible, never averaged away.
6. **DIFF INSPECT** — the git diff contains only changes relevant to the
   stated concern. CSS churn, reformatting, and drive-by cleanups fail DoD.
7. **RECORD** — journal entry with the Verify line (see core/journal.md).
8. **LESSON?** — evaluate against `core/learning/CURATOR.md` promotion
   criteria; propose if it generalizes.

Visual spot-check protocol (from AGENT-CODING-GUIDE, applied after any change
near markup): hero, nav, primary sections, footer render identically at
desktop + mobile widths unless visual change was approved.
