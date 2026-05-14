# Route-Local Replay Variants Review

Date: 2026-04-28
Queue: `ECO-20260428-critic-485`
Lane: `lane-4`
Owner: `critic-agent`

## Verdict

Clean. The active-only `Held Dune` pass stays route-local and preserves canonical `Dune Catch` ready/filed identity.

## Reviewed

- `source-to-shore-dune-catch` now has a catalog `processFocus` for the existing Coastal Scrub `sand-capture` process.
- `resolveDuneCatchState(...)` only shows `Held Dune` while Dune Catch is active and the existing process seam is live.
- Ready-to-file and filed states continue to use canonical `Dune Catch` identity and existing Source to Shore filing evidence.
- `SOURCE_TO_SHORE_BEAT_FLOW`, route ids, evidence ids, ordered slots, support behavior, save schema, station shell, content, geometry, and replay framework boundaries stayed unchanged.

## Verification

- `npm test -- --run src/test/field-requests.test.ts -t "route variants|Dune Catch|Source to Shore"`
- `npm test -- --run src/test/field-season-board.test.ts -t "Source to Shore|Dune Catch|Held Dune"`
- `npm test -- --run src/test/save-snapshots.test.ts -t "Source to Shore|Dune Catch"`

The implementation report also records the focused controller slice and `npm run build` passing.

## Handoff

Promote `ECO-20260428-scout-486` to scope filing depth and catalog guardrails from the now-stable route variant boundary.
