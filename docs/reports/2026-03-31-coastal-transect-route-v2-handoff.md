# 2026-03-31 Coastal Transect Route V2 Handoff

Scout handoff for `ECO-20260331-scout-90`.

## Scope

Prepare the first post-forest Route v2 expansion pack so `main-128` can add one stronger non-forest outing type without reopening the station shell, the save model, or a larger quest system.

## Recommendation

Make the first new post-forest outing type a true coastal transect and use it on the front half of the `Edge Pattern Line`.

The best implementation target is:

- new Route v2 type: `transect-evidence`
- first converted beat: `scrub-edge-pattern`
- route family it strengthens: `edge-pattern-line`

Keep `forest-cool-edge` as the tighter one-zone `assemble-evidence` follow-up. That gives the family a better rhythm: one broader gradient walk first, then one calm focused forest-side read.

## Why This Is The Best First Expansion

`scrub-edge-pattern` already wants to be a transect more than a generic evidence set:

- its live summary already says “walk Coastal Scrub from dune to forest edge”
- its zones already form a readable left-to-right gradient:
  - `back-dune`
  - `windbreak-swale`
  - `forest-edge`
- its carrier trio already maps one-to-one onto those stages:
  - `dune-lupine` -> `open-pioneer`
  - `pacific-wax-myrtle` -> `holding-cover`
  - `salmonberry` -> `thicker-edge`
- the existing route-board and replay-note language already treats this route as a transition read, not just a checklist

This makes it the cleanest place to add a stronger outing type without needing new content from lane 2 or geometry from lane 3.

By contrast:

- inland process reads are promising, but they would pull harder on process-moment timing and are less obviously a first runtime expansion
- `forest-cool-edge` already works well as a tight one-zone interpretation beat, so upgrading it first would buy less

## Best Runtime Shape

Add one new Route v2 definition shape that still reuses the existing save seam:

- `type: 'transect-evidence'`
- reuse `routeV2Progress.evidenceSlots`
- reuse the existing notebook-ready filing step
- do not add a second route-progress ledger or a new station page

Recommended definition structure:

- keep the existing `evidenceSlots`
- add ordered stage metadata per slot, using one required zone per stage

Minimum authored stages for `scrub-edge-pattern`:

1. `open-pioneer`
   - zone: `back-dune`
   - carrier: `dune-lupine`
2. `holding-cover`
   - zone: `windbreak-swale`
   - carrier: `pacific-wax-myrtle`
3. `thicker-edge`
   - zone: `forest-edge`
   - carrier: `salmonberry`

## Behavior Expectations

`main-128` should make the new type feel different from `assemble-evidence` in three concrete ways:

1. stage-gated progress
   - only the next missing transect stage should count
   - later-stage entries should not advance the beat early
2. stage-specific guidance
   - progress labels should point to the next stage zone rather than showing only a generic clue count
   - examples:
     - `Go To Coastal Scrub`
     - `Return To Back Dune`
     - `Return To Windbreak Swale`
     - `Return To Forest Edge`
     - `Ready To File`
3. stage-specific hand-lens help
   - the hand lens should only surface the next valid stage clue
   - it should stay silent for later-stage carriers until the earlier stage is logged

That is enough to make the outing read like a real transect without adding another HUD or route shell.

## Save Compatibility

Do not introduce a broader save migration system for this pass.

Instead:

- keep the existing `routeV2Progress.evidenceSlots` shape
- treat already-filled `scrub-edge-pattern` slots in older saves as valid completed stages
- let next-step guidance point to the first missing stage, even if an older save happened to log a later stage early under the previous unordered `assemble-evidence` behavior

This keeps the change compact and avoids repeating the `ROOT HOLLOW` compatibility work unless critique later finds a real truth gap.

## Route-Board Guidance

The route-board shell should stay compact.

`main-128` should only tighten the edge-pattern route copy that needs to acknowledge the new outing shape:

- make the active `Scrub Pattern` detail and next-direction copy explicitly read like a staged coast-to-forest transect
- keep `forest-cool-edge` as the calmer one-zone interpretation follow-up at `creek-bend`
- do not add a new route card, planner, or progress panel

## Best Main-Agent Slice

`main-128` should stay tightly scoped to:

1. add the `transect-evidence` Route v2 runtime branch in `field-requests.ts`
2. convert `scrub-edge-pattern` to the new type
3. update the minimum edge-pattern board copy needed to support the staged transect read
4. add focused tests for:
   - stage-ordered advancement
   - stage-specific progress labels
   - hand-lens next-stage guidance
   - older in-progress `scrub-edge-pattern` saves still reading coherently through the new first-missing-stage guidance

Avoid in `main-128`:

- converting `forest-cool-edge` to the new type in the same pass
- revisiting inland route semantics
- adding a new support option
- changing the filing surface
- adding another save field

## Expected File Touches

- `src/engine/field-requests.ts`
- `src/engine/field-season-board.ts`
- `src/test/field-requests.test.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`
- `src/test/save.test.ts` only if the compatibility edge case needs a direct regression

## Queue Guidance

- close `ECO-20260331-scout-90` with this report
- bump packet `043` so the handoff is part of the lane record
- promote `ECO-20260331-main-128` to `READY`
- keep `ECO-20260331-critic-101` blocked behind implementation
