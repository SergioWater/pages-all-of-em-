# Promoted Lesson — canonical host poisoning

Status: accepted (promoted to ASTRO-META-001 + AP-canonical-host-poisoning)
Date: 2026-08-10 · Projects: kenseijudo, kenseijudoschool · Evidence:
seo/reports/compare-2026-08-10*.md; astro.config defaults

## Problem
Live canonical/og:url served a staging IP and a secondary domain — search
engines indexed a second, wrong identity of the site.

## Fix
Pin astro.config `site` to the production host; split CMS fetch origin into
lib/wp-url.ts so build-time data fetching can never define public identity.

## Generalizes?
Occurred TWICE independently ⇒ recurrence criterion met. Detector shipped
(canonical_host_check.py); post-mortem preserved as anti-pattern. This pair
(promotion + detector + post-mortem) is the reference example of the full
learning loop.
