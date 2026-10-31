# Promoted Lesson — do not inline site CSS

Status: accepted (promoted to PERF-CSS-001)
Date: 2026-08-11 · Project: kensei · Evidence: commits 7a4d2df, 744f74d

## Problem
First paint waited on a second CSS request.

## Fix attempt
Inlined the site CSS into HTML (7a4d2df).

## Verification / measurement
Reverted in 744f74d: "Keep site CSS as a cached file; inlining grew the
HTML without helping first paint." Net regression.

## Generalizes?
Yes — measured, framework-portable. For hashed-asset static sites with
immutable caching, inlining trades cacheability for one round trip and loses.
Promoted as modules/performance rule PERF-CSS-001 with commit evidence.
