# Module — Deployment

Owns hosting conventions, caching, cutover runbooks. Framework config details
live in profiles (astro/deployment-conventions.md).

## Rules

| ID | Requirement |
|---|---|
| DEP-CACHE-001 | Immutable caching keyed to content-hashed paths (`/_astro/*` max-age=31536000 immutable); ~7-day TTL for unhashed assets (kensei netlify.toml convention) |
| DEP-HEADERS-001 | Security-header baseline present on hosting config (shared with SEC-HEADERS-001) |
| DEP-CUTOVER-001 | Platform-replacement cutovers stage with robots/canonicals/sitemap ALREADY pointing at the production domain; non-public pages noindexed AND sitemap-excluded; legacy .html→clean-URL redirects prepared before switch (hbk runbook lesson) |
| DEP-STAGING-001 | Staging uploads carry obvious placeholder hosts with trap comments or are index-blocked |

Checks: `checks/deploy_config_audit.py`.
