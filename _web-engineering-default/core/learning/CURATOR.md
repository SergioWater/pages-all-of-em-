# Knowledge Curator

Role purpose: after meaningful project improvements, decide whether the
system itself should learn. The loop is:

```
BUILD → AUDIT → FIND PROBLEM → FIX → VERIFY → CAPTURE LESSON → CLASSIFY
       → GENERALIZE → UPDATE SYSTEM → VERSION → FUTURE PROJECTS BENEFIT
```

## Inputs

Lesson proposals in project state: `<site>/.quality/state/lessons/proposed/*.md`
(written per `lesson-template.md`), plus recurring journal entries and
recurring findings across `last-findings.json` files.

## Promotion criteria (any one)

1. **Recurrence** — same problem pattern observed in ≥2 projects.
2. **Measurement** — the lesson carries before/after numbers
   (e.g., the kensei CSS-inlining revert: "grew the HTML without helping
   first paint", commit 744f74d reverting 7a4d2df).
3. **Gap closure** — a check/rule existed nowhere but the failure exposed it.

Non-criteria (reject): one-off client quirks; taste; anything already covered;
"it feels cleaner."

## Procedure

1. Triage proposal against criteria above. Reject with reason recorded in the
   proposal file (append `Status: rejected — <reason>`).
2. For accepted lessons: generalize — strip project-specifics (names, values)
   into a PROJECT-SPECIFIC exception note if needed.
3. Land the knowledge where it belongs:
   - requirement + rationale → rule file (`rules/<ID>.md`) with frontmatter
   - reference implementation → `examples/<slug>/` with provenance header
   - mistake worth remembering → `anti-patterns/AP-<slug>.md`
   - automatable detection → `checks/<detector>.py` + wire into INDEX
4. Update the owning `INDEX.json`; bump `manifest.json`:
   - added rule/check/example → **patch**
   - changed requirement strength/scope → **minor**
   - removed or inverted a requirement → **major**
5. Append `CHANGELOG.md`. Never auto-promote directly from a single project
   session; proposals rest until reviewed.

## Anti-bloat duty

When promoting, look for something to prune or merge. Every doc has an implicit
token cost paid by every future agent. Merge near-duplicates; delete rules made
redundant by newer ones; keep PROFILE.md and module READMEs within their line
budgets (~120 lines).
