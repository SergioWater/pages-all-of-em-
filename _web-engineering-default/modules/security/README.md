# Module — Security

Owns secret hygiene, header baselines, supply-chain discipline. Business-fact
integrity is core/honesty-rules.md, not here.

## Rules

| ID | Requirement |
|---|---|
| SEC-CRED-001 | No key-shaped strings in source (detector live). Committed keys get rotated + moved to env/hosting stores. Real case: Google Calendar key in kensei consts.ts; plaintext SSH key under lushessences/.ssh (owner rotation actions pending). |
| SEC-ENV-001 | PUBLIC_* vars are non-secret only; server secrets never enter client bundles |
| SEC-HEADERS-001 | Security-header baseline on hosting config: X-Frame-Options, Referrer-Policy; Permissions-Policy exceptions only per named vendor origin (vercel.json pattern from Joey project) |
| SEC-SUPPLY-001 | Lockfiles committed; build-script approvals reviewed (pnpm approve-builds discipline); no blind dependency additions |
| SEC-INLINE-001 | is:inline scripts = high-scrutiny surface; each one documented (chat loader is the current legit example) |

Detector: `checks/secret_scan.py`. Header/deploy checks:
`modules/deployment/checks/deploy_config_audit.py`.
