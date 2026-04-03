# 2026-04-03 Front-Half Route-Title Chapter Handoff

Scout handoff for `ECO-20260403-scout-167`.

## Scope Reviewed

- `docs/reports/2026-04-03-lane-4-front-half-chapter-follow-on.md`
- `.agents/packets/086-front-half-chapter-and-filing-phase.json`
- `src/engine/field-season-board.ts`
- `src/engine/guided-field-season.ts`
- `src/engine/game.ts`
- `src/test/field-season-board.test.ts`
- `src/test/guided-field-season.test.ts`
- `src/test/runtime-smoke.test.ts`

## Best Target

Spread the live front-half route titles across the existing chapter-facing surfaces instead of inventing a new chapter label family.

The strongest small pass is:

- keep the current `coastal-shelter-line` structure
- reuse the real route titles the player already files
- update the board and guided season flow so the early chapter reads as:
  - `Shore Shelter`
  - `Hidden Hollow`
  - `Moisture Holders`
  - `Open To Shelter`

## Why This Is The Best Next Move

- The route content is now ahead of the chapter-facing copy. The front half has real route names and stronger outing shapes, but several surrounding surfaces still talk in older generic labels such as `Beach To Hollow`, `Forest Hollow`, and `Coastal Shelter`.
- The fresh-save guided note is now stale. `beach-shore-shelter` opens the live Route v2 ladder, but `resolveGuidedFieldSeasonState()` still starts by telling the player to open the world map and go inland to `Forest Trail`.
- The route board is the best place to spread place memory without adding shell weight. Renaming the live beat titles to the actual filed route names makes the chapter feel more authored while staying inside the current board, support strip, and guided note seams.
- This also leaves the later filing-depth pass real room to deepen the notebook payoff instead of spending that budget on cleanup the chapter copy should already have done.

## Concrete Chapter Spread

### `field-season-board.ts`

Use the actual route titles on `coastal-shelter-line` where the board still uses generic labels:

- `Beach To Hollow` -> `Hidden Hollow`
- `Forest Hollow` -> `Moisture Holders`
- `Coastal Shelter` -> `Open To Shelter`

Keep the current compact beat count and three-row board.

Recommended summary direction:

- fresh start:
  - `Shore Shelter starts at Sunny Beach.`
- after `beach-shore-shelter` logs and before forest survey:
  - `Shore Shelter logged. Hidden Hollow carries shelter inland.`
- after `Trail Stride` and before `coastal-edge-moisture`:
  - `Open To Shelter carries the shore line into Coastal Scrub.`

The important part is not those exact sentences. It is that the board should repeat the same route names the player just learned instead of falling back to generic beach/coast/forest labels.

### `guided-field-season.ts`

Make the first chapter guidance follow the real route order:

- on a fresh save, the starter note should point at `Shore Shelter` on `Sunny Beach`, not straight to `Forest Trail`
- once `beach-shore-shelter` is filed but `forest-hidden-hollow` is not, the same early guidance should pivot to `Hidden Hollow`
- once `trail-stride` is owned, the `NEXT STOP` note should name `Open To Shelter`
- once `coastal-scrub` has been visited but `coastal-edge-moisture` is not yet logged, the settled note should describe the front half as one joined coast-to-forest chapter rather than one generic `beach and scrub` walk

### `game.ts`

Because starter guidance currently defaults the menu toward the world map, `main-205` should keep that shortcut only when the guided next biome differs from the current biome.

That means:

- fresh save with `Shore Shelter` active on `beach`: do not imply a world-map hop first
- after `Shore Shelter` is logged and `Hidden Hollow` is next in `forest`: keep the existing map-first guidance

## Why The Alternatives Are Weaker

### Do not add a new chapter banner or chapter index

That would solve a naming problem with a heavier shell. The route titles already exist and just need to be spread into the current surfaces.

### Do not spend this pass on filing copy

The next packet step already owns notebook-return depth. Right now the bigger gap is that the active chapter framing still sounds generic before the player even reaches the filing seam.

### Do not rename the routes themselves

`Shore Shelter`, `Hidden Hollow`, `Moisture Holders`, and `Open To Shelter` are already the strongest place-memory carriers. The drift is that the board and guided flow are not reusing them consistently.

## Best Main-Agent Slice For `main-205`

1. In `src/engine/field-season-board.ts`, rename the generic front-half beat titles to the actual route titles and update only the summary / next-direction lines needed to make the chapter read as one shore-to-forest family.
2. In `src/engine/guided-field-season.ts`, retarget starter and next-habitat guidance so the notes follow `Shore Shelter -> Hidden Hollow -> Open To Shelter` in order.
3. In `src/engine/game.ts`, keep starter-stage menu focus on `world-map` only when the guided next biome is not the current biome, so fresh saves do not falsely imply a travel step before the beach opener.
4. Add focused regressions:
   - `src/test/field-season-board.test.ts`
     - front-half beat titles now use the actual route titles
     - summaries / next-direction copy reflect the stronger chapter arc
   - `src/test/guided-field-season.test.ts`
     - fresh save points to `Shore Shelter`
     - post-beach guidance points to `Hidden Hollow`
     - `NEXT STOP` names `Open To Shelter`
   - `src/test/runtime-smoke.test.ts`
     - the starter guidance no longer sends the player inland before `Shore Shelter`
     - the field-station board and guided flow share the same route-title chapter language

## Expected File Touches

- `src/engine/field-season-board.ts`
- `src/engine/guided-field-season.ts`
- `src/engine/game.ts`
- `src/test/field-season-board.test.ts`
- `src/test/guided-field-season.test.ts`
- `src/test/runtime-smoke.test.ts`

## Guardrails

- do not add a new chapter HUD, banner, or station page
- do not rename the underlying request ids or filed route titles
- prefer the existing route titles over inventing a second naming family
- keep the chapter spread calm, readable, and early-game friendly

## Queue Guidance

- close `ECO-20260403-scout-167` with this report
- bump packet `086` to version `2`
- retarget and promote `ECO-20260403-main-205` to the specific route-title chapter spread
- leave `ECO-20260403-critic-178` blocked behind implementation
