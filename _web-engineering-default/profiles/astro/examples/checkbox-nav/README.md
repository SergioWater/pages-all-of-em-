# Golden Pattern — checkbox-nav

Classification: PROVEN GOOD · Framework: astro
Source: `kensei/frontends/astro-website-2/src/components/Nav.astro` + `global.css` `:checked ~` rules

Mobile menu with NO JS required to open: hidden checkbox + label button,
CSS sibling selectors animate it. The only script (≤8 lines) unchecks the
box after navigating so the menu doesn't stay open.

```astro
<input type="checkbox" id="nav-open" class="nav-toggle" />
<label for="nav-open" class="nav-menu-btn">
  <Icon name="menu" class="icon-open" size={26} />
  <Icon name="x" class="icon-close" size={26} aria-hidden="true" />
  <span class="visually-hidden">Menu</span>
</label>
```

```css
.nav-toggle { position: absolute; opacity: 0; }
.nav-toggle:checked ~ .nav-links { transform: none; }
/* swap open/close icons via :checked ~ selectors */
```

```js
// the entire script: reset after navigation
document.querySelectorAll(".nav-links a").forEach((a) =>
  a.addEventListener("click", () => {
    document.getElementById("nav-open").checked = false;
  }));
```

Why: zero hydration, keyboard-reachable (native checkbox), screen-reader
labeled. Contrast with the sentinals JS-toggle variant which lacked
aria-expanded sync — prefer this one for new sites.
