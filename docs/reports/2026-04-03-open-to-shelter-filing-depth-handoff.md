# 2026-04-03 Open To Shelter Filing-Depth Handoff

Scout handoff for `ECO-20260403-scout-168`.

## Scope Reviewed

- `docs/reports/2026-04-03-lane-4-front-half-chapter-follow-on.md`
- `docs/reports/2026-04-03-front-half-route-title-chapter-handoff.md`
- `docs/reports/2026-04-03-front-half-route-title-chapter-review.md`
- `docs/reports/2026-04-03-front-half-board-summary-fix-review.md`
- `src/engine/field-season-board.ts`
- `src/engine/field-requests.ts`
- `src/engine/game.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`

## Best Target

Spend the filing-depth pass on the `Open To Shelter` return, not on another broad front-half copy sweep.

The strongest narrow move is:

- once `coastal-shelter-shift` is filed, stop pointing the board back at `Open To Shelter`
- let the board and `note-tabs` acknowledge that the page just got filed
- hand off cleanly into the smaller `Edge Moisture` follow-on without adding another panel or support row

## Why This Is The Best Next Move

- The chapter spread is now truthful up through the forest side, but the filed coastal return still feels thin. `getCoastalComparisonBeat()` already advances the active beat title to `Edge Moisture` once `coastal-shelter-shift` is complete, yet `resolveCoastalFieldSeasonBoardState()` still keeps the summary and next-direction on `Open To Shelter carries the shore line into Coastal Scrub.` and `start Open To Shelter...`.
- That means the front-half filing moment still reads more like "task cleared, same copy remains" than "page filed, next margin note begins."
- The existing notebook-return seam already has the right shape. `Shore Shelter` got a compact `SHORE SHELTER LOGGED` close through `note-tabs`, and `resolveSupportAwareTodayWrap()` already supports route-specific logged exceptions. Reusing that pattern for `Open To Shelter` is lower-risk and more notebook-like than adding a new return panel or a broader recap system.

## Concrete Follow-On

### `field-season-board.ts`

Split the coastal-comparison copy after `coastal-shelter-shift` is filed:

- before `coastal-shelter-shift`:
  - keep the existing `Open To Shelter` summary and direction
- after `coastal-shelter-shift` and before `coastal-edge-moisture`:
  - switch the summary and next-direction to `Edge Moisture`
  - keep `targetBiomeId` on `coastal-scrub`

Recommended direction:

- summary:
  - `Open To Shelter logged. Edge Moisture checks the cooler forest edge next.`
- nextDirection:
  - `Next: return to Coastal Scrub and log the cooler, wetter edge at forest side.`

The exact sentences can tighten, but the important part is that the board should feel like the `Open To Shelter` page was filed and the player is turning to the smaller forest-edge follow-on.

### `note-tabs`

Add one compact post-file close for this exact state, similar to `SHORE SHELTER LOGGED`:

- label:
  - `OPEN TO SHELTER LOGGED`
- text direction:
  - `Coastal Scrub closes the shelter chapter. Edge Moisture waits at the forest edge.`

This should only apply in the logged `coastal-shelter-shift` / pre-`coastal-edge-moisture` window, and only for `note-tabs`.

### Tests

Add focused regressions:

- `src/test/field-season-board.test.ts`
  - after `coastal-shelter-shift`, the board summary and next-direction point to `Edge Moisture`
  - `note-tabs` uses `OPEN TO SHELTER LOGGED` in that exact state
- `src/test/runtime-smoke.test.ts`
  - after filing `Open To Shelter`, the filed notice stays route-specific, the next active request becomes `coastal-edge-moisture`, and the routes wrap reflects the new logged close / next-step handoff

## Why The Alternatives Are Weaker

### Do not add another general recap strip

The station already has wrap, board, atlas, and filed notice seams. The problem is not missing UI; it is that the current filed coastal return does not use those seams deeply enough.

### Do not spend this pass on `Hidden Hollow` or `Moisture Holders`

Those notes already have route-specific preview and filed text, and the repaired board now tracks them cleanly. The coastal filing return is the one still reading like a plain task clear.

### Do not widen this into the full completed-route stop cue

`coastal-edge-moisture` and the broader completed-route stop state are a later seam. The smaller, stronger move now is the immediate post-file page turn once `Open To Shelter` is logged.

## Best Main-Agent Slice For `main-206`

1. In `src/engine/field-season-board.ts`, split the logged `coastal-shelter-shift` state away from the pre-file one so the board summary and direction turn toward `Edge Moisture`.
2. Add one `note-tabs`-only `OPEN TO SHELTER LOGGED` close for that exact state.
3. Add focused board and runtime-smoke coverage for the post-file coastal return.

## Expected File Touches

- `src/engine/field-season-board.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`

## Guardrails

- do not add another station page, card, or support row
- do not rename `Open To Shelter` or `Edge Moisture`
- keep the payoff notebook-first and compact
- make the filed return feel more like a page turn, not a bigger recap shell
