# 13 — Decision trees

## A. Does this need client JavaScript?

```
Can HTML + CSS + details/summary or :target do it?
  YES → no island
  NO → is it one widget (FAQ, lightbox, modal)?
        YES → Solid/React island with client:visible or client:only
        NO → stop; you are inventing an SPA — re-scope
```

## B. May I change CSS / layout?

```
Is the change only meta/title/canonical/JSON-LD/robots/alt/href?
  YES → proceed (invisible)
Does it change pixels, spacing, fonts, section order, or H1 look?
  YES → write a proposal; wait for human approval
Human said "yes, apply"?
  YES → smallest possible diff; reuse classes
  NO → do not apply
```

## C. Where does this string belong?

```
NAP / phone / social → consts.ts
Long prose / bio / FAQ → src/content/**/*.md
Page chrome title segment → page frontmatter prop into BaseHead
Machine business facts → lib/schema.ts from consts (+ confirmed only)
Secret API key → env (not PUBLIC_*), never git
```

## D. Public host vs CMS host

```
URL used in browser address bar / Google → astro.config site
URL used only to fetch posts at build → WP_URL / cmsBase()
Are they the same host?
  MAYBE in simple setups — still keep two knobs so staging CMS cannot poison canonicals
Is site currently an IP?
  YES → treat as P0 bug; set https public host
```

## E. Rendering CMS HTML

```
Is HTML required (rich bio)?
  NO → plain text / markdown
  YES → is CMS admin locked down + content trusted?
          NO → sanitize or refuse set:html
          YES → isolate to one component; never pass through island innerHTML casually
```

## F. Adding a third-party script

```
Human approved + privacy reviewed?
  NO → do not add
  YES → document in BaseLayout comment; prefer one conversion path
Does it duplicate an existing chat/form capture?
  YES → refuse (compliance risk)
```
