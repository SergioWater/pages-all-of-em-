# 12 — Windows-specific pitfalls

Agents recreating this architecture on Windows must handle these.

## Git symlinks become text files

If `public/photos` (or similar) is a git symlink (`120000` mode), Windows often checks it out as a **21-byte text file** containing the target path (e.g. `../../../media/photos`).

Symptom at build/dev:

```text
ENOTDIR: not a directory, scandir '.../public/photos'
```

Fix (junction example):

```powershell
Remove-Item .\public\photos -Force
cmd /c mklink /J "public\photos" "D:\path\to\media\photos"
```

Or create a real empty `public/photos` directory if media is optional (gallery returns []).

Enable symlinks in git only if the human’s Windows setup supports them (`core.symlinks true` + Developer Mode / admin). Prefer documenting a junction step in README.

## Node version managers (nvm-windows)

- `nvm use 24.x` may not update PATH in the current non-interactive shell.
- Prefer putting `…\nvm\v24.x.x` at the front of `$env:Path` for that session, then `node -v`.
- Match `engines.node` (>=24 in the reference pattern).

## pnpm + corepack EPERM

`corepack enable` writing into an nvm Node directory can hit `EPERM`. Fallback:

```powershell
npm install -g pnpm
```

## pnpm ignored builds fail installs

pnpm 10+ may exit non-zero when build scripts are ignored (`esbuild`, `sharp`, etc.). Approve only required packages, then rebuild those — do not `approve-builds --all` casually.

## Path separators

Node `path.join` is fine. In content URL helpers, normalize to `/` for web paths. Avoid hardcoding `\` in `href`s.

## Line endings

Keep Prettier / `.gitattributes` consistent. Do not reformat entire CSS trees “for CRLF cleanup” during architecture work.
