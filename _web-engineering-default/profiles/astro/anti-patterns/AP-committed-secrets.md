# AP — Committed secrets and key-shaped strings

Classification: ANTI-PATTERN · Severity: critical · Module: security

**What happened (inventory).** Google Calendar API key hardcoded in kensei
consts.ts (referrer-restricted — mitigated but still wrong); Maps key in v1
GoogleMap.astro; Mailgun key passed as an env var NAME in tint's email
script; plaintext SSH private key under lushessences/.ssh/.

**Why it happened.** Convenience; misunderstanding env-var indirection
(os.getenv takes the NAME, not the secret).

**Cost.** Credential exposure in repo history and clones; rotation burden.

**Preferred pattern.** Secrets in env/hosting stores only; PUBLIC_* vars hold
non-secret config; secret_scan.py before every commit session; rotate
anything already committed (owner action items exist for SSH + Mailgun keys).

**Detection.** secret_scan.py — key-shaped strings across src/config.
