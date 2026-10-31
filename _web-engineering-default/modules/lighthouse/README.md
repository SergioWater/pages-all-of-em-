# Module — Lighthouse

Lighthouse is EVIDENCE, not truth. This module owns running it, storing
baselines, diffing runs, and flagging regressions. Remediation guidance
lives in performance/accessibility/seo modules.

Status: **no Lighthouse baseline exists anywhere in the workspace yet**
(all briefs show "?"). First action on any adopted project:

```
npx -y lighthouse@latest https://<production-url> \
  --output=json --output-path=.quality/state/baselines/lighthouse/$(date +%F)-home.json \
  --only-categories=performance,accessibility,best-practices,seo --chrome-flags="--headless"
```

Requires Chrome + node on the operator machine (owner's Windows box).
Water World never needs these tools; it only reads stored JSON.

## Workflow

1. BASELINE — run against production build URL; store JSON with date label.
2. CHANGE — implement approved work.
3. REBUILD+RERUN — same command, new dated file.
4. COMPARE — `scripts/compare_baselines.py before.json after.json` →
   markdown delta report into state/history/.
5. REGRESSION? — category drop >2 points or CWV worse → journal REGRESSION
   entry; investigate root cause before further changes.

Never optimize a score at the cost of function/design/honesty
(non-negotiable #12). A Lighthouse recommendation follows the trace chain:
finding → source → why-does-this-exist → user impact → risk → remediate →
verify function → rerun.
