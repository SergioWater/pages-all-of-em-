# Journal — the append-only progress record

Every governed project keeps `.quality/state/progress.md`. This convention
emerged organically in both SEO campaigns and is now the standard audit
trail. (Template: installed to projects by `scripts/adopt.py`.)

## Grammar

```markdown
### YYYY-MM-DD — [Role] short title
What was done, what changed, what's next.
Verify: build ✓ · typecheck ✓ · checks 0 findings (or list)
```

- One entry per work session per concern.
- Newest entries at the **bottom** (append-only; never rewrite history).
- Role names come from the active profile/module role cards
  (Strategist, Frontend, Auditor, Curator, …).
- Include the Verify line always — an entry without verification evidence is
  incomplete work.

## Sections

`## Status` — checklist of campaign phases (project-defined).
`## Blocked` — include a distinct subsection "Blocked (owner facts only)" for
items waiting on human input, not code (proven pattern from kensei/sentinals).
`## Parked` — deliberately deferred items so they are not re-proposed every
session.

## Why append-only

The journal is the memory that prevents repeated work ("read this before
starting so you never repeat something already done" — original template) and
the evidence base for the learning loop: recurring entries are lesson
candidates for `core/learning/`.
