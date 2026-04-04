# 2026-04-03 Front-Half Stop-Point Handoff

Prepared `ECO-20260403-scout-162` against packet `083`.

## Recommendation

Spend `main-200` on one generic front-half stop-point wrap at the first inland opener after the coastal line is fully filed.

The exact target state is:

- `coastal-edge-moisture` is logged
- `treeline-stone-shelter` is not started yet
- the routes page has already rolled forward into `TREELINE SHELTER LINE`
- the board and atlas already point inland correctly

That is where the early season currently loses its calm pause beat. The station immediately speaks in `Stone Shelter` travel language again, so the coast-to-forest chapter reads complete in the board history but not in the top-strip rhythm.

## Why This Seam

The current shell already has the right division of labor:

- route board: what the next live chapter is
- atlas row: the explicit next-action breadcrumb
- top strip: the place where lane 1 already teaches permission to pause

The inland stop-point pass on `main-162` solved the later-season version of this by letting the strip soften while the atlas kept the direct action line. The front half now wants the same treatment in one earlier, coast-facing state.

## Best Main-Agent Slice For `main-200`

Keep the change in [field-season-board.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-season-board.ts) plus focused lane-1 tests.

Recommended implementation shape:

1. Add one helper for the first inland opener after the front-half coastal line is complete.
2. Use it inside `resolveFieldSeasonWrapState()` before the generic support-aware `TODAY` branch.
3. Let it affect the top strip only for that exact state.
4. Keep the board on `Stone Shelter starts at Treeline Pass.`
5. Keep the atlas as the explicit next step, not the strip.
6. Do not reopen `guided-field-season.ts`, the map footer, or the earlier `OPEN TO SHELTER LOGGED` `note-tabs` close.

## Suggested Copy Direction

Keep the strip short and recap-first.

Good target family:

- label: `ROUTE LOGGED`
- text: `Good stopping point. Coast-to-forest line is filed.`

That line is short enough to stay handheld-safe, reads like permission to pause, and still reminds the player what just became complete before the atlas and board point inland.

## Keep Out Of Scope

- no new panel, recap card, or planner strip
- no new `note-tabs`-only close; lane 4 already owns that page-close seam
- no board-title or atlas rewrite
- no guided-season note or notice rewrite
- no map or journal follow-on copy in this pass

## Verification Target For `main-200`

- focused `field-season-board` coverage for the first inland-opener wrap
- focused `runtime-smoke` coverage for the post-`coastal-edge-moisture`, pre-`treeline-stone-shelter` station state
- `npm run build`
- one seeded browser proof that the strip, board, and atlas all still read cleanly at `256x160`
