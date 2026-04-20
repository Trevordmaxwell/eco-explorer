# 2026-04-19 High Pass Closure State Review

Reviewed `ECO-20260419-main-320` for lane 1.

## Finding

Blocking: the filed High Pass expedition card still inherits start-facing expedition chrome.

The implementation correctly changes the filed expedition state to `statusLabel: FILED` and `startText: Filed from Treeline Pass`, but the live expedition-page renderer still labels that row as `STARTS`, and activating the filed card still builds a notice with `Start: ${expedition.startText}.` This leaves a reachable filed surface reading as `STARTS Filed from Treeline Pass` / `Start: Filed from Treeline Pass`, which undercuts the acceptance target that no surface should point back to High Pass as if it were still unstarted.

## What Passed

- The phase helper is the right direction and keeps High Pass state out of scattered ad hoc checks.
- Filed High Pass suppresses active outing locator behavior, so `route-locator:treeline`, route-marker, and `Today: High Pass` no longer leak through the field-request state.
- Station routes, atlas, archive, and route-board state now read filed without adding a new shell.
- Focused tests, the capstone runtime-smoke slice, production build, agent validation, and browser client smoke passed.

## Required Follow-Up

Add a narrow filed-expedition display fix:

- the expedition page should not render `STARTS` for a filed High Pass card
- the filed activation notice should not use a generic `Start:` prefix
- keep the existing one-card expedition page and do not add a new station shell

Queued follow-up: `ECO-20260419-main-324`.
