# Golden Pattern — deferred-third-party

Classification: PROVEN GOOD · Framework: astro (pattern generalizes)
Source: `kensei-2/src/scripts/chat.ts` (LeadConnector loader), loaded from BaseLayout

Third-party runtime widgets load on first human gesture or idle timeout —
never at page load. Keeps their CSS/JS out of first paint entirely.

```ts
// chat.ts (abridged) — arms on pointer/key gesture or 12s idle
const arm = () => { loadWidgetOnce(); teardown(); };
["pointerdown", "keydown"].forEach((e) =>
  window.addEventListener(e, arm, { once: true }));
const idle = requestIdleCallback?.(() => setTimeout(arm, 12_000))
          ?? setTimeout(arm, 12_000);
```

```astro
{/* BaseLayout body end */}
<script> import "../scripts/chat.ts"; </script>
```

Companion trick (FindUs map): click-to-load iframe, auto-loaded only on
desktop viewports where maps are primary. Inventory rule: each site lists its
third-party runtimes in facts.md; additions need privacy/security note.
