# Forms & Analytics

Provenance: kensei-2 TrialCTA/chat.ts + A2P comment; v1 ContactForm (Lambda);
sentinals contact (mailto/tel); analytics grep across all sites.

## Current standard: no bespoke forms on new Astro sites

kensei-2 eliminated forms entirely — trial CTA opens the LeadConnector
SMS/chat widget (`data-chat-trigger`); the widget loader is deferred to first
gesture or 12 s idle. A2P compliance note in chat.ts is PROJECT-SPECIFIC
(carrier registration) — do not generalize the "no forms" rule, only the
deferral pattern.

If a form IS required:
- v1 pattern is the reference: native validation + `novalidate`, JS validity
  gate, FormData → JSON POST to an env-configured endpoint, server error
  contract `{error, fields[]}` surfaced via `role="alert"`, graceful
  "not configured" state when env var missing.
- Spam protection belongs server-side; add honeypot if none exists.

## Analytics: deliberately absent

Zero analytics/cookie banners in any active site — a privacy-minimizing
posture (third parties receive visitor data; each addition needs review per
ASTRO-ARCHITECTURE §5). Legacy v1 shipped production-gated gtag in head;
current generation dropped it. If analytics returns: defer loading, gate to
production, prefer cookieless (Plausible-class), document in facts.md.

## Third-party runtime inventory discipline

Each site should list its third-party runtime scripts in project facts
(current kensei total: one — the deferred chat widget). New additions require
a privacy/security note per core honesty rules and security module.
