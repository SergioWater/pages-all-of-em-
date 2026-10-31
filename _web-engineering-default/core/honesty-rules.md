# Honesty Rules — facts, claims, and evidence

The single most damaging failure mode in this workspace is publishing wrong
business facts. Codified from the E-E-A-T validator methodology
(`_seo-default/roles/8-eeat-validator.md`) and applied in both live campaigns.

## 1. Never invent business facts

Not schedules, prices, staff credentials, founding dates, certifications,
review counts, customer numbers. Ask the owner. A wrong claim in copy or
schema is worse than an absent one. ("Omit rather than fabricate" is the
documented kensei schema doctrine.)

## 2. Claim triage — three categories, never blurred

| Category | Meaning | Action |
|---|---|---|
| verified-correct | confirmed by source or owner | may ship |
| plausible-but-unverified | likely true, unconfirmed | gate as `OWNER_CONFIRM_*` or omit |
| wrong | contradicted by evidence | remove / correct after confirmation |

Evidence sources used in practice: owner statements, live pages,
Wayback Machine snapshots, official registries, club/association listings.

## 3. OWNER_CONFIRM gates

Schema/copy templates may contain `OWNER_CONFIRM_STREET`,
`OWNER_CONFIRM_FOUNDED`, etc. These are placeholders for owner-supplied facts.

**A build must never ship a visible `OWNER_CONFIRM_*` string.**
Detector: `modules/seo/scripts/jsonld_validate.py` flags them in dist HTML.

Real cases this rule exists for: "Every instructor holds Kodokan rank" (wrong
— BJJ coach), "Affiliated with USA Judo" + "Est. 2024" (unverified, blocked
from schema), "every coach holds a college degree" (removed), misattributed
coach identity (wrong person's bio).

## 4. Soften absolutes into conditioned accuracy

"inherently safe" → "injury risk is real. We manage it through ukemi,
qualified coaching, controlled randori, maintained mats." Attribute claims to
named individuals; avoid blanket superlatives.

## 5. NAP discipline (local business)

Byte-identical Name/Address/Phone everywhere: page, footer, schema, GBP.
Canonical format decided once in `consts.ts`; E.164 in `tel:` links, display
format on page. Variance tables (surface / current / canonical / fix) are the
audit format. Social handles must match URLs exactly (`@kenseijudo` vs
`@kenseijudoofficial` was flagged).

## 6. Agent conduct

No trackers/miners/beacons; no env files into logs; no weakening security
headers without review; fail closed on unverified claims.
