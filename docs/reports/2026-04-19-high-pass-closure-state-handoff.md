# High Pass Closure State Handoff

## Queue Ref

- `ECO-20260419-scout-320`
- prepares `ECO-20260419-main-320`

## Current Gap

Lane 1 already has the right helper seam in [high-pass-chapter-state.ts](/Users/trevormaxwell/Desktop/game/src/engine/high-pass-chapter-state.ts), but it still models `High Pass` as a single `NEXT` chapter once `forest-season-threads` is filed.

That means post-filed surfaces can keep implying the route is upcoming:

- `resolveSeasonOutingLocator(...)` can keep returning `Today: High Pass`
- the journal can still synthesize `route-locator:treeline`
- the world map can keep showing `Today: High Pass`
- station routes, archive, atlas, and expedition copy stay future-tense

The exact state gap is after `treeline-high-pass` lands in `save.completedFieldRequestIds`.

## Recommended Main Shape

Extend the helper around one explicit phase model:

- `dormant`: `forest-season-threads` is filed but `seasonCloseReturnPending` is still true
- `active`: `High Pass` is unlocked/opened and gathering has not reached ready-to-file
- `ready-to-file`: `save.routeV2Progress?.requestId === 'treeline-high-pass'` and `status === 'ready-to-synthesize'`
- `filed`: `save.completedFieldRequestIds` includes `treeline-high-pass`

Keep `null` for the pre-`forest-season-threads` state.

Use `filed` as the strongest state if the save ever contains both filed and route-progress data.

## Recommended Surface Changes

Keep the work inside existing shells:

- station routes page: reuse the existing routes shell and current card strip; do not add another page or planner row
- atlas: switch from `Next:` / future-tense copy to a filed line, for example `High Pass filed from Treeline Pass.`
- archive strip: switch from `Root Hollow now leads to High Pass.` to a calmer past-tense close, for example `Root Hollow led into High Pass.`
- expedition card: reuse the existing `HIGH PASS` card but change it from `NEXT` to `FILED`
- route locator and world map: after filed, stop returning a live `activeOuting`, `route-locator:treeline`, route marker, or `Today: High Pass`

The station can still acknowledge the filed arc, but it should not route the player back to Treeline Pass as if the chapter is unstarted.

## Suggested File Targets

- [high-pass-chapter-state.ts](/Users/trevormaxwell/Desktop/game/src/engine/high-pass-chapter-state.ts)
  - owns the phase detection and phase-specific copy
- [field-season-board.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-season-board.ts)
  - should use the helper instead of adding more inline High Pass conditionals
- [field-season-wrap.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-season-wrap.ts)
  - only if subtitle/wrap copy needs a small filed-state adapter
- [field-request-state.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-request-state.ts)
  - only if `resolveSeasonOutingLocator(...)` alone is not enough to suppress filed route-locator/map cues

## Suggested Proofs

Add or extend focused coverage for:

- helper phases: pre-open null, dormant, active, ready-to-file, filed
- station filed state: `SEASON ARCHIVE`, filed atlas note, filed expedition/status copy, no future-tense `NEXT` launch behavior
- request state after filed: no `activeFieldRequest`, no synthesized `route-locator:treeline`, no route marker, no `Today: High Pass`
- runtime station proof seeded with `treeline-high-pass` completed

## Non-Goals

- Do not open season three or biome six.
- Do not add a new station tab, dashboard, planner row, or route framework.
- Do not solve lane 2's richer synthesis-copy pass here; use compact filed-state copy only.
- Do not add more High Pass geography or change final-route traversal.
