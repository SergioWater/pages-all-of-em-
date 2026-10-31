# compare.py — known limitations (learned 2026-08 audits)

Documented failures across kensei + sentinals campaigns:

1. **Wrong home page selection.** Picked "Client Portal" shell (kenseijudo)
   and a design mock (`docs/design/index.html`). Always verify WHICH page it
   audited before reading results.
2. **Competitor fetch failures.** HTTP 400×3 + 404×1 on one run; timeout on
   another. JS-rendered builders (Wix) under-report content.
3. **False positives.** WordPress theme templates (`frontends/wordpress/**`)
   and react-email output pollute hygiene sweeps.

## Protocol (proven)

Treat raw report as BASELINE ONLY → write companion `<name>-deepened.md`
with manual live fetches for every gap row → footer disclaimer on every
report: "Raw-HTML extraction only. JS-rendered competitor content may be
incomplete."
