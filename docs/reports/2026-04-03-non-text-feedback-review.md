# 2026-04-03 Non-Text Feedback Review

Reviewed `ECO-20260403-critic-219` against packet `092`.

## Findings

### Blocking

1. The new `filed-route` variant currently leaks onto non-route notebook completions.

`showFieldRequestNotice()` now always assigns `variant: 'filed-route'`, but that helper still carries generic recorded field requests that are not route-backed. A seeded browser repro confirms that completing `forest-survey-slice` now shows `TASK RECORDED / Forest Survey` with `variant: "filed-route"`, which breaks the handoff's route-only scope and teaches the wrong visual distinction.

## Recommendation

Narrow the filed badge assignment back to route-backed completions only.

- Keep `notebook-ready` on real `NOTEBOOK READY` route moments.
- Keep `filed-route` on definitions that actually carry `routeV2Note`.
- Let generic recorded notices such as `Forest Survey` stay on the default notice styling.
- Add one focused regression proof for a non-route completion staying `variant: 'default'`.
