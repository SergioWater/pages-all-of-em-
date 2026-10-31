# Merge two branches (reusable playbook)

Use this when you have **product work on `main`/`master`** and **feature/SEO work on another branch** (example: `seo/sergio`) and need one combined tree.

Replace placeholders:

| Placeholder | Example |
|---|---|
| `<MAIN>` | `master` or `main` |
| `<FEATURE>` | `seo/sergio` |
| `<REMOTE>` | `origin` |

---

## 0. Decide merge direction

| Goal | Command direction |
|---|---|
| **A. Update the feature branch** with latest main (usual while feature is still open) | checkout `<FEATURE>` → merge `<MAIN>` into it |
| **B. Land the feature on main** | checkout `<MAIN>` → merge `<FEATURE>` into it (often via PR) |

For “I have teammate commits on master and SEO commits on `seo/sergio`” → start with **A**, then open a PR for **B** when ready.

---

## 1. Clean your working tree first

Uncommitted changes block or confuse merges.

```powershell
cd <REPO_ROOT>
git status
git fetch --all --prune
```

If you have local edits you want to keep:

```powershell
git stash push -u -m "wip before merge"
```

If you have junk you do **not** need (example: broken symlink, accidental folder):

```powershell
# only if you intend to discard that change
git restore -- <path>
# or remove untracked carefully
# git clean -nd   # dry-run first
```

Confirm clean (or only intentional files):

```powershell
git status
```

---

## 2. Make sure both branches are current

```powershell
git checkout <MAIN>
git pull --ff-only <REMOTE> <MAIN>

git checkout <FEATURE>
git pull --ff-only <REMOTE> <FEATURE>
```

If `<FEATURE>` exists only remotely:

```powershell
git checkout -b <FEATURE> <REMOTE>/<FEATURE>
```

---

## 3. Option A — merge main into feature (recommended first)

```powershell
git checkout <FEATURE>
git merge <MAIN>
```

### If conflicts

```powershell
git status
# fix files, then:
git add <fixed-files>
git commit
# default merge commit message is fine
```

Abort if it goes wrong:

```powershell
git merge --abort
```

Push the updated feature branch:

```powershell
git push -u <REMOTE> <FEATURE>
```

---

## 4. Option B — merge feature into main (when ready to land)

Prefer a PR on GitHub:

```powershell
git checkout <MAIN>
git pull --ff-only <REMOTE> <MAIN>
git push <REMOTE> <FEATURE>   # ensure remote feature is up to date
gh pr create --base <MAIN> --head <FEATURE> --title "Merge <FEATURE> into <MAIN>" --body "## Summary`n- …`n`n## Test plan`n- [ ] build`n- [ ] spot-check site"
```

Or local merge (only if your team allows direct merges to main):

```powershell
git checkout <MAIN>
git pull --ff-only <REMOTE> <MAIN>
git merge <FEATURE>
# resolve conflicts if any
git push <REMOTE> <MAIN>
```

---

## 5. Verify after merge

```powershell
git status
git log --oneline --graph --decorate -15
# run project checks, e.g.:
pnpm run build
# or package-scoped:
# pnpm --filter <pkg> run build
```

---

## 6. Common gotchas

| Symptom | Fix |
|---|---|
| “Your local changes would be overwritten” | stash or commit first (§1) |
| Fast-forward not possible on pull | `git pull --ff-only` failed → inspect; may need merge/rebase deliberately |
| Same file edited on both branches | resolve conflicts; prefer keeping **both** intents (product UI + SEO head/schema) when possible |
| Windows symlink/`photos` deleted | restore junction/dir after merge (see architecture pack Windows notes) |
| You merged the wrong way | `git merge --abort` if still in progress; otherwise `git reflog` + ask before reset |

---

## 7. Copy-paste for this Kensei repo (today)

Working tree notes before you start: restore `public/photos` if needed, stash `todo.md` edits, don’t commit accidental `backend/` unless intentional.

### A — bring master into `seo/sergio`

```powershell
cd D:\001_websites\kenseijudoschool\kensei
git fetch --all --prune
git stash push -u -m "wip before seo merge"
git checkout master
git pull --ff-only origin master
git checkout seo/sergio
git pull --ff-only origin seo/sergio
git merge master
# fix conflicts if prompted, then:
# git add -A
# git commit   # only if merge opened a commit and conflicts were fixed
git push -u origin seo/sergio
git stash pop   # optional; resolve if stash conflicts
```

### B — later, land SEO on master (PR)

```powershell
cd D:\001_websites\kenseijudoschool\kensei
git checkout master
git pull --ff-only origin master
gh pr create --base master --head seo/sergio --title "Merge seo/sergio into master" --body "## Summary`n- SEO P0/P1 + latest master product work`n`n## Test plan`n- [ ] pnpm --filter astro-kensei-2 run build`n- [ ] spot-check home + instructors + robots/sitemap"
```

---

## 8. One-line mental model

**Update the long-lived feature branch with main often; merge feature → main once through a PR when the work is ready.**
