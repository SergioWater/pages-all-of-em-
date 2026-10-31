# AGENTS Guide for `kensei`

This file is for coding agents working in this repository.
It captures the current build/test/lint workflow and the coding conventions already used in the codebase.

## Repository layout

- Monorepo managed with `pnpm` workspaces.
- Workspace config: `pnpm-workspace.yaml`.
- Main active apps/services:
  - Frontend: `frontends/attendance`
  - Backend Lambda package: `backends/attendance/lambda`
  - Enquiries backend (Go Lambda + Terraform): `backends/enquiries`
- Infra (Terraform): `backends/general`

## Source of truth docs

- Product scope/progress: `plan.md`
- DynamoDB schema/access patterns: `ddb_schema.md`
- Repo-level onboarding/check commands: `README.md`

## Rule files (Cursor/Copilot)

- No `.cursorrules` file found.
- No `.cursor/rules/` directory found.
- No `.github/copilot-instructions.md` file found.
- If any are added later, treat them as high-priority instructions and update this file.

## Environment and package manager

- Use `pnpm` (not npm/yarn) for installs and scripts.
- Backend lambda package expects Node `>=24`.
- Install deps from repo root when changing shared lock/workspace state:
  - `pnpm install`

## Root commands

Run from repository root unless noted.

- Dev all (where available):
  - `pnpm run dev`
- Build all (where available):
  - `pnpm run build`
- Lint all:
  - `pnpm run lint`
- Typecheck all:
  - `pnpm run typecheck`
- Format all:
  - `pnpm run format`
- Format check all:
  - `pnpm run format:check`
- Tests (targeted to current test-enabled packages):
  - `pnpm run test`
- Full local pre-commit gate:
  - `pnpm run precommit`

## Lefthook pre-commit

- Lefthook config: `lefthook.yml`
- Hook runs sequentially (`parallel: false`) and executes:
  1. `pnpm run test`
  2. `pnpm run lint`
  3. `pnpm run format:check`
  4. `pnpm run typecheck`
- Reinstall hooks after dependency/bootstrap changes:
  - `pnpm run prepare`

## Frontend (`frontends/attendance`) commands

- Start dev server:
  - `pnpm --filter attendance run dev`
- Build:
  - `pnpm --filter attendance run build`
- Lint:
  - `pnpm --filter attendance run lint`
- Typecheck:
  - `pnpm --filter attendance run typecheck`
- Format:
  - `pnpm --filter attendance run format`
- Format check:
  - `pnpm --filter attendance run format:check`
- Tests:
  - `pnpm --filter attendance run test`
- Coverage:
  - `pnpm --filter attendance run test:coverage`

### Frontend single-test runs (Vitest)

- Single file:
  - `pnpm --filter attendance exec vitest run src/test/example.test.tsx --silent`
- By test name:
  - `pnpm --filter attendance exec vitest run -t "renders content" --silent`

## Backend lambda (`backends/attendance/lambda`) commands

- Lint:
  - `pnpm --filter backend run lint`
- Typecheck (`checkJs` + JSDoc typing):
  - `pnpm --filter backend run typecheck`
- Format:
  - `pnpm --filter backend run format`
- Tests:
  - `pnpm --filter backend run test`
- Coverage:
  - `pnpm --filter backend run test:coverage`

### Backend single-test runs (Vitest)

- Single file:
  - `pnpm --filter backend exec vitest run get_classes/get_classes.test.mjs --silent`
- By test name:
  - `pnpm --filter backend exec vitest run -t "returns filtered timed events" --silent`

## Enquiries backend (`backends/enquiries`) — Go Lambda + API Gateway

A Go Lambda (custom runtime `provided.al2023` / arm64) that powers the public
website enquiry form. Fronted by a REST API Gateway (v1) with CORS handled
natively by API Gateway (a MOCK integration for OPTIONS preflight + the
lambda echoing CORS headers on POSTs). Rate limiting lives entirely in the
Go handler (a DynamoDB-native sliding window keyed by hashed (ip + email)).
Owned by the `backends/enquiries` Terraform stack.

### Commands (run from `backends/enquiries/lambda`)

- Build the lambda binary + zip:
  - `make zip` (produces `../builds/enquiries.zip` and `./bootstrap`)
  - Note: terraform runs this automatically via `scripts/build.py` on every
    plan/apply, so this is only needed for manual local builds.
- Tests:
  - `go test ./...` or `make test`
- Vet:
  - `go vet ./...` or `make vet`
- Format:
  - `gofmt -w .` or `make fmt`
- Full local check (gofmt + vet + test):
  - `make check`

### Terraform

- `cd backends/enquiries && terraform init && terraform apply`
- The lambda is built automatically on plan/apply via `scripts/build.py`
  (which runs `make zip`); no manual build step required.
- The deployment trigger includes a SHA-256 over all `.go` + `go.mod` +
  `go.sum` + `Makefile`, so a source change forces a new lambda code upload
  and a new API Gateway deployment.
- State stored at S3 key `enquiries/terraform.tfstate`.

### Notes

- CORS is enforced in two places (belt + braces): API Gateway's MOCK
  integration for OPTIONS preflight, and the in-handler origin check that
  echoes `Access-Control-Allow-Origin` on POSTs. CORS alone never stopped a
  spammer (`curl` ignores it) — the DynamoDB-native rate limiter is the
  actual spam defense.
- SES SMTP credentials are derived in Terraform from a dedicated IAM access
  key using the AWS-documented algorithm (`scripts/smtp_password.py`). The
  raw secret access key never leaves Terraform state.
- The API is public (`authorization_type = "NONE"`) and relies on the
  in-handler origin check + the API Gateway CORS config to restrict callers
  to the website origins.
- While the AWS account is in SES sandbox mode, each `notify_emails` address
  must be a verified SES identity; Terraform creates those identity resources
  and AWS emails a verification link to each one.

## Test framework notes

- Vitest is used in both frontend and backend package.
- Frontend tests use `jsdom` + React Testing Library.
- Backend tests run in Node environment.
- Coverage output is generated under backend package and ignored by lint/typecheck.

## Code style and conventions

Follow existing local style before introducing new patterns.

### Formatting

- Use Prettier via package scripts; do not hand-format around it.
- Keep semicolon/quote style consistent with surrounding files.
- Keep imports grouped at top and avoid unused imports.

### Imports

- Prefer explicit named imports.
- Keep third-party imports before local imports.
- Use relative imports inside package (`./`, `../`) as currently established.

### TypeScript (frontend)

- Prefer explicit domain types for API data (`ClassEvent`, profile types, etc.).
- Narrow `unknown` values with type guards before use.
- Avoid `any`; if unavoidable, isolate and document it.
- Keep strict-mode friendly code (project uses strict TS settings).

### JavaScript + JSDoc (backend)

- Backend lambda uses `.mjs` with `checkJs: true`.
- Add JSDoc for:
  - exported handlers
  - helper function params/returns
  - custom typedefs for payloads/responses
- Use `import("...").Type` for external types (e.g., `aws-lambda`).

### Naming

- Functions/variables: `camelCase`.
- Types/interfaces/type aliases: `PascalCase`.
- Constants: `UPPER_SNAKE_CASE` for true constants.
- Keep DynamoDB field naming in `snake_case` when matching schema docs.

### React patterns

- Prefer hooks + function components.
- Keep side effects in query hooks/providers where possible.
- Use React Query for async data fetching and caching.
- Keep component files focused; extract reusable logic into hooks/contexts.

### Error handling

- Fail fast on missing required credentials/config.
- Validate external API responses before consuming.
- In UI/data hooks, surface actionable error messages.
- In lambda handlers, return explicit status codes and JSON bodies.

### Logging

- Keep logs concise and useful for request/debug context.
- Avoid logging secrets/tokens/credentials.

## Infra and data model alignment

- DynamoDB table and index assumptions should match `ddb_schema.md`.
- Access pattern changes should be reflected in both code and schema docs.
- Terraform changes should be formatted (`terraform fmt`) in touched dirs.

## Change management expectations for agents

- Make minimal, targeted edits.
- Do not rewrite unrelated files.
- Run relevant checks for touched packages before finishing.
- Prefer package-scoped verification first, then root `pnpm run precommit`.
- If adding new conventions/tooling, update `README.md` and this file.
