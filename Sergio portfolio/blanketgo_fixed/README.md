# Sergio Aguilar — Portfolio

A static portfolio using HTML, CSS, and JavaScript. No framework, dependencies, or build step. The original dark palette, gold accents, purple glow, and category wheel are preserved.

## Run locally

From this directory, run `python -m http.server 8000 --bind 127.0.0.1` and open http://localhost:8000. Use an HTTP server; opening HTML directly from disk can prevent project data from loading.

## Project access

The portfolio publishes project **overviews**. Project actions link only to GitHub; demo links and email access-request buttons are not rendered. All entries carry `"visibility": "private"` as the intended repository policy.

This setting does not change GitHub permissions or secure the JSON file. Make each corresponding repository private in GitHub and grant access there. Every description in `projects.json` remains public; keep confidential source, credentials, and implementation details out of it. Existing public deployments must be disabled separately if they should no longer be accessible.

Exact repository URLs produce an “Open on GitHub” button. Missing URLs or profile-only URLs produce a clearly labeled “GitHub profile” link. The site does not invent repository addresses. Actual repository visibility has not been verified or changed by this local update.

## Content

Edit `projects.json` to update the profile, categories, and projects. Each project needs a unique `slug`, a `category` matching a category ID, a `title`, `summary`, `description`, `tags` array, `highlights` array, `visibility: "private"`, and a `github` URL (or an empty string if unknown). Category counts update automatically.

Keep copy specific to what was built. Describe team work and learning projects accurately. Include performance numbers only when supported by measurements.

## Interactions

- Category nodes work with click, Enter, and Space.
- Project cards are native buttons that open a labeled dialog.
- Dialogs keep keyboard focus inside, disable the background, and restore focus when closed.
- Escape closes the dialog first, then returns from a category to the wheel.
- Small screens use a single project column; reduced-motion preferences disable transitions and smooth scrolling.
- Loading failures show a visible message.

## Contact

The form opens an email draft containing the sender's name, reply address, and message. It does not send mail or store submissions. The user needs an email app configured and must send the draft themselves. A failed data load disables the form and displays the direct contact address.

## Files

- `index.html`: introduction and category browser.
- `contact.html`: email-draft form.
- `styles.css`: shared theme and responsive styles.
- `app.js`: loading, rendering, navigation, dialog, and contact behavior.
- `projects.json`: public portfolio content.

## Before publishing

Check desktop and mobile layouts, navigate the wheel and dialog with the keyboard, and confirm the contact draft includes the reply address. Verify GitHub permissions independently. Upload the static files to the existing host; there is no build command.

Upload assets before the HTML pages. When changing JavaScript or CSS, update the `?v=` value in both HTML pages so cached assets cannot be mixed with new markup. The live Cloudflare cache previously served an old `app.js` without the startup call alongside new HTML, leaving the page stuck loading. Purge the HTML cache after publishing if the host continues to serve an older page. Project-data requests time out after ten seconds and show an error instead of waiting indefinitely.
