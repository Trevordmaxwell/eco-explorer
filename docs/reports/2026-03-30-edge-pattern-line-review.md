# 2026-03-30 Edge Pattern Line Review

## Scope

Review `ECO-20260330-main-75`: `Edge Pattern Line` as the first post-nursery field-season route.

## What Changed

- The field-station season board now advances beyond `Treeline Shelter Line` into a third compact route:
  - `EDGE PATTERN LINE`
  - `Coastal Scrub -> Forest -> Treeline`
- The route uses three medium transition beats instead of another survey or station-return loop:
  - `Scrub Pattern`
  - `Cool Edge`
  - `Low Fell`
- The request chain now supports those beats directly through new transition-focused field requests in:
  - `coastal-scrub`
  - `forest`
  - `treeline`
- `Route Marker` now points through the new line in order:
  - `coastal-scrub`
  - `forest`
  - `treeline`
- Nursery support for this route is now beat-aware:
  - `dune-lupine` supports `Scrub Pattern`
  - `salmonberry` supports `Cool Edge`
  - `mountain-avens` supports `Low Fell`

## Critic Read

No blocking issues.

Why the pass is working:

- The route reads like a real transition chapter instead of only another board shell. Each beat teaches a different way habitats change across the front-half to inland branch.
- Nursery support stays in the right role. In the seeded browser passes, the station only surfaced one relevant clue at a time, and that clue changed with the active beat instead of flattening the whole route into one repeated hint.
- The route shell stays notebook-first. It reuses the existing station board, request chain, route marker, and atlas instead of waking up a parallel progression layer.
- The live station state stayed readable enough at `256x160` after the board-spacing adjustment. The route title, beat stack, atlas note, and nursery clue all remained legible in the final browser capture.

Residual watch item:

- The season side is now tight enough that the existing support rows remain a little compressed when three upgrades are owned. That feels like the right thing to handle in the already-queued three-route station scaling pass, not as a blocker on this route shell.

## Verification

- Focused route, request, nursery, and runtime tests passed:
  - `src/test/field-season-board.test.ts`
  - `src/test/field-requests.test.ts`
  - `src/test/nursery.test.ts`
  - `src/test/runtime-smoke.test.ts`
- Full `npm test` passed.
- `npm run build` passed.
- `npm run validate:agents` passed.
- Ran the shared web-game client and inspected the resulting screenshot and state output in `output/web-game-main-75-finalpass`.
- Seeded live browser field-station pass at `http://127.0.0.1:4190/` confirmed:
  - `routeBoard.routeId: "edge-pattern-line"`
  - `routeBoard.targetBiomeId: "coastal-scrub"`
  - `fieldStation.atlas.note: "Next: follow the edge pattern line."`
  - `fieldStation.nursery.routeSupportHint: "Pioneer flowers often thin out where shrubs start making steadier cover."`
  - browser console errors: `0`

## Queue Guidance

- Close `ECO-20260330-critic-53`.
- Keep `ECO-20260330-main-76` blocked on `ECO-20260330-scout-45`.
- Leave the three-route station spacing follow-up to the existing later board-scaling lane instead of reopening this route shell.
