# Golden Pattern — faq-single-source

Classification: PROVEN GOOD · Framework: astro
Source: `kensei-2/src/lib/faqs.ts` (`resolveFaqItems`), sentinals `lib/faq.ts`

Visible FAQ UI and its FAQPage JSON-LD share ONE source array, so copy edits
can never desync structured data ("pack 15 sync rule").

```ts
export function resolveFaqItems() {
  return FAQ_ITEMS.map(({ q, a }) => ({ question: q, answer: a }));
}
// FAQs.astro maps items -> <details>; schema.ts builds FAQPage from same fn
```

Audit hook: jsonld_validate cross-checks that rendered questions appear in
the FAQPage block. Known debt note: sentinals defines a faq collection that
its page ignores in favor of constants — do not copy that divergence.
