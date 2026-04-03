# 2026-04-02 Atlas-Facing Richness Handoff

Prepared for `ECO-20260402-scout-134` in lane 2.

## Scope Reviewed

- `docs/reports/2026-04-02-atlas-and-sketchbook-richness-phase.md`
- `docs/reports/2026-03-30-atlas-and-sketchbook-archive-richness-handoff.md`
- `docs/reports/2026-04-02-return-recap-review.md`
- `src/engine/field-season-board.ts`
- `src/engine/overlay-render.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`
- browser artifacts:
  - `output/lane-1-main-130-browser/routes-high-pass-board.png`
  - `output/lane-1-main-139-browser/route-logged-station.png`

## Current Read

- The `FIELD ATLAS` strip is still the right surface for this phase, but it remains extremely tight. It has room for one compact title row and one compact note line, not another visible archive layer.
- Lane 1 has already re-stabilized the routes-page balance: `seasonWrap` now handles the short closure beat, while `atlas.note` stays the quieter next-step sentence. Reopening that balance with a second recap line would be drift.
- The remaining gap is emotional, not structural. In the logged-route states before `ROOT HOLLOW`, the atlas still reads like generic task staging even though the rest of the lane has grown much stronger place memory.

## Recommendation

Treat `main-172` as one compact atlas-note wording pass for the pre-expedition logged-route states only.

## Best Shape

Keep the existing atlas strip and the existing one-line note seam.

Do not add:

- a taller atlas strip
- a second archive row
- a route badge list
- a new station card

Instead, tighten the existing atlas note so it still points forward but carries one tiny filed-memory prefix.

## Exact Target

Limit the new wording to these atlas states:

1. one route logged
2. two routes logged
3. three routes logged, before `ROOT HOLLOW` is active

Leave these later states unchanged:

- active `ROOT HOLLOW` atlas guidance
- notebook-ready `ROOT HOLLOW` filing guidance
- filed `Season Threads`
- filed `High Pass`

Those later lines were just rebalanced by lane 1 and should stay direction-first.

## Suggested Copy Direction

The exact phrasing can vary, but the note family should stay this short and this balanced:

- one route logged:
  - `Coast filed. Inland shelter next.`
- two routes logged:
  - `Coast and ridge filed. Low-fell edge next.`
- three routes logged:
  - `Coast, ridge, and edge filed. Root Hollow next.`

Teaching goal:

- make the atlas feel like a filed notebook seam that remembers what the player has already connected
- keep the second clause explicitly directional so the strip still helps re-entry

## Why This Is The Right Next Step

- It spends the atlas budget where there is still room: better one-line phrasing, not more structure.
- It deepens remembered-world feeling without fighting the current lane-1 shell rules.
- It keeps the follow-on for `main-173` clear: the sketchbook can own the more personal authored payoff after the atlas gets its tiny filed-memory upgrade.

## What `main-172` Should Avoid

- do not change `overlay-render.ts` layout
- do not touch the filed `High Pass` atlas line
- do not rewrite `seasonWrap`, `SEASON ARCHIVE`, or expedition copy in this pass
- do not add more logged-route states or archive metadata

## Suggested File Targets

- `src/engine/field-season-board.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`

## Suggested Verification

- `npm test -- --run src/test/field-season-board.test.ts src/test/runtime-smoke.test.ts`
- `npm run build`
- one seeded browser capture for the first logged-route station state
- one seeded browser capture for the three-route pre-expedition station state

## Queue Guidance

- Close `ECO-20260402-scout-134`.
- Promote `ECO-20260402-main-172` to `READY`.
- Keep `ECO-20260402-critic-145` blocked until the atlas-note pass lands.
