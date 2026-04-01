# 2026-03-31 High-Pass Board Activation Handoff

## Scope

Complete `ECO-20260331-scout-92` and narrow `ECO-20260331-main-130` to one compact lane-1 pass that makes `High Pass` visibly live on the filed-season routes board.

## Summary

The current season-two chain already has the right destination language:

- the logged `ROOT HOLLOW` expedition opens the world map on `Treeline Pass`
- the world map echoes `Today: High Pass`
- the journal can restore one compact `High Pass` card
- the routes-page atlas note now says `Next: take the High Pass from Treeline Pass.`

What still does not feel live is the routes board itself.

On the filed-season `ROUTES` page, the player still sees:

- `EDGE LINE LOGGED`
- `ROUTE LOGGED`
- three `DONE` rows from the old route

So the surface that still looks most like a season board is also the one place where `High Pass` is least visible.

## Findings

### 1. The current board data already derives `High Pass`, but the routes-page body hides it

`resolveEdgePatternFieldSeasonBoardState()` already switches the completed board summary and target biome to the active outing locator once `forest-season-threads` is filed.

That means the data is already there:

- `summary`: `High Pass opens next from Treeline Pass into the next field season.`
- `nextDirection`: the compact travel-facing `High Pass` cue
- `targetBiomeId`: `treeline`

But that summary never reaches the live filed-season board presentation.

### 2. The atlas strip now owns the archive job, so the board can stop repeating old `DONE` beats

The routes page already has a stable archive seam:

- the top strip says `SEASON ARCHIVE`
- the atlas lists the three logged routes
- the atlas note points forward to `High Pass`

Because that archive memory is already present, the board no longer needs to spend its full body on:

- `DONE Scrub Pattern Logged`
- `DONE Cool Edge Logged`
- `DONE Edge Line Logged`

That repetition is what makes the page feel stale.

### 3. The current renderer specifically suppresses the forward-looking board summary when the atlas is visible

In `overlay-render.ts`, the routes-page board draws `routeBoard.summary` only when there is no atlas.

Once the player reaches the filed-season state, the atlas is always present, so the routes board falls back to the beat list only.

That is the concrete seam `main-130` should fix.

### 4. The smallest clean fix is one compact launch-card mode on the existing board

`main-130` does not need a fourth route card or a real season-two route ladder.

The cleanest direction is:

- keep the archive strip
- keep the atlas strip
- let the board itself pivot into one compact `High Pass` launch card when the filed season now points beyond itself

That keeps the page split clear:

- atlas = filed history
- board = what is live now

## Recommended `main-130` Pass

Keep `main-130` to one three-part change set:

1. Add one optional filed-season launch-card state to `field-season-board`, derived from the existing active outing locator once `forest-season-threads` is logged.
2. Render that launch card on `SEASON -> ROUTES` instead of the old three-line `DONE` stack when the launch state is present.
3. Keep the expedition launch, atlas note, and world-map handoff unchanged so the routes board becomes a clearer glance surface, not a second launch system.

## Concrete Target Shape

The board should read like one live next outing, not like another completed archive block.

Recommended content shape:

- title: `HIGH PASS`
- progress label: `NEXT`
- one compact summary line confirming that `Treeline Pass` opens the next field season
- one compact direction line reusing the existing `last tree`, `low wood`, and `fell bloom` language

The exact object shape is flexible, but it should stay separate from the historical three-beat route rows so the implementation does not have to fake new season-two beats before they exist.

## Keep Out Of Scope

Do not:

- add a new station page
- add a second launch button or another `Enter` behavior on the routes page
- invent a full season-two route ladder before those outings exist
- remove the atlas history strip
- rewrite the expedition card for this step

## Likely File Targets

- `src/engine/field-season-board.ts`
- `src/engine/overlay-render.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`

`src/engine/game.ts` should only move if the debug payload needs a tiny shape update for the new board state.

## Suggested Verification For `main-130`

- add focused `field-season-board` coverage for the filed-season routes-page launch-card state
- add runtime-smoke coverage that the filed-season routes page no longer renders only the archived `DONE` stack
- run `npm run build`
- do one seeded browser capture of the filed-season `ROUTES` page at `256x160`

## Queue Guidance

- close `ECO-20260331-scout-92`
- promote `ECO-20260331-main-130` to `READY`
- keep `ECO-20260331-critic-103` blocked behind implementation
