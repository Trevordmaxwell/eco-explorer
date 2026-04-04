# 2026-04-04 Wrack Opportunity Route Handoff

Scout handoff for `ECO-20260404-scout-260`.

## Scope Reviewed

- `docs/reports/2026-04-04-tactile-living-world-and-support-phase.md`
- `.agents/packets/107-tactile-living-world-and-support-phase.json`
- `src/engine/field-requests.ts`
- `src/engine/field-season-board.ts`
- `src/engine/biome-scene-render.ts`
- `src/content/biomes/beach.ts`
- `src/content/biomes/coastal-scrub.ts`
- `src/content/biomes/treeline.ts`
- `src/test/field-requests.test.ts`
- `src/test/runtime-smoke.test.ts`

## Best Target

Keep `main-260` on `beach-shore-shelter`, but change the pass from another replay-title alignment into one small live-opportunity seam:

- during active `wrack-hold`
- on the final `wrack-line` stage only
- let `beach-hopper` count as a truthful alternate tide-line clue alongside the existing `bull-kelp-wrack`

This is the cleanest way to make the living-world window matter in practice instead of only in wording.

## Why This Is The Best Next Move

- `Wrack Shelter` already has the right active-request, enter-biome, board, and `TODAY` alignment from the earlier replay pass. The missing piece is practical opportunity, not more naming work.
- `beach.ts` already backs the route with a real ecological seam:
  - the `wrack-line` visit table already spawns both `bull-kelp-wrack` and `beach-hopper`
  - late phenology already increases that table's density
  - the live `wrack-hold` process already overlays `bull-kelp-wrack` and `beach-hopper` in the tide-line zone
- That means one route leg can become easier to satisfy during the live window without inventing a new planner system, timer, or hard gate. The player sees more valid tide-line evidence right where the route currently ends.

## Why The Alternatives Are Weaker

### Do not spend this pass on `treeline-stone-shelter`

`Rime Shelter` is visually strong, but only one current route clue (`frost-heave-boulder`) overlaps the active process seam, and it sits in the middle of the route. That makes it a weaker first fit for a compact opportunity pass because the route would still mostly play the same until the second leg.

### Do not spend this pass on `coastal-shelter-shift`

`Held Sand` and `Haze Shift` already describe the live Coastal Scrub window, but the route's authored slots do not yet line up with one equally clean alternate clue. Making `Open To Shelter` softer in practice would likely require redefining the `open-bloom` stage more broadly instead of adding one tiny route-local seam.

### Do not widen this into multiple routes

Packet `107` only needs one route proof. `Wrack Shelter` already has the strongest authored overlap between route goal, process window, spawn table, and live render emphasis.

## Concrete Follow-On

### `field-requests.ts`

Add one tiny route-local active-opportunity seam for evidence routes.

Recommended shape:

- keep it single-variant and slot-local
- let a route slot opt into extra accepted `entryIds` only while that route's active process window is live
- do not turn this into a generic multi-window loadout or planner framework

First live use:

- request id: `beach-shore-shelter`
- process moment id: `wrack-hold`
- slot id: `wrack-line`
- always-valid clue:
  - `bull-kelp-wrack`
- extra live-window clue:
  - `beach-hopper`

That keeps the route science-safe:

- `beach-hopper` already lives inside beach wrack
- it already belongs to the same authored tide-line process moment
- it makes the live route easier to finish without making the non-window route fail

### Behavior Guardrail

The pass should widen opportunity, not replace the route.

Keep all of these true:

- `bull-kelp-wrack` still works in and out of the live window
- `beach-hopper` only works for `wrack-line` while `wrack-hold` is active
- earlier `dune-grass` and `lee-cover` stages stay unchanged
- notebook-ready and filed states still resolve through canonical `Shore Shelter`

The filed note can stay clue-backed with the actual gathered evidence, because that is already the route system's live contract. If later review finds the alternate clue reads awkwardly, solve it with one route-local display override instead of backing out the opportunity seam.

### Why This Should Feel Different In Play

This route already ends on the tide-line. After this pass, the live window should make that last step genuinely softer because:

- more tide-line entities can satisfy the final stage
- the active process overlay already makes those entities read differently on screen
- the route summary can stay short because the world itself now does more of the work

That is the packet's target outcome: not another renamed outing, but one route that plays a little differently when the world turns.

## Tests

Add focused regressions:

- `src/test/field-requests.test.ts`
  - `beach-hopper` does not fit `wrack-line` outside the live `wrack-hold` window
  - during active `wrack-hold`, `getHandLensNotebookFit()` treats `beach-hopper` as `wrack line`
  - during active `wrack-hold`, inspecting `beach-hopper` at `tide-line` can complete `beach-shore-shelter`
  - `bull-kelp-wrack` remains valid in both states
- `src/test/runtime-smoke.test.ts`
  - a seeded late `marine-haze` beach outing can finish `Wrack Shelter` through `beach-hopper`, then still return to the station and file through canonical `Shore Shelter`

No new board-specific regression is required unless the implementation changes replay copy. The existing `Wrack Shelter` board coverage already holds the alignment seam.

## Best Main-Agent Slice For `main-260`

1. In `src/engine/field-requests.ts`, add one compact active-opportunity seam for evidence slots during a route's active process window.
2. Spend it only on `beach-shore-shelter` by letting `beach-hopper` satisfy `wrack-line` during `wrack-hold`.
3. Add focused request and runtime coverage showing the route now has a softer live-window finish without changing the canonical filing identity.

## Expected File Touches

- `src/engine/field-requests.ts`
- `src/test/field-requests.test.ts`
- `src/test/runtime-smoke.test.ts`

## Guardrails

- do not add timers, failure states, or harsher gating
- do not widen the pass into a general route-planner or support-row change
- do not change the first two `beach-shore-shelter` stages
- do not make `pacific-sand-crab` a valid route clue for this pass
- keep the route truthful, compact, and handheld-safe

## Queue Guidance

- close `ECO-20260404-scout-260` with this report
- bump packet `107` to version `2`
- replace the generic `main_260_focus` block with this `Wrack Shelter` opportunity handoff
- retarget `ECO-20260404-main-260` and `ECO-20260404-critic-260` to this report
- promote `ECO-20260404-main-260` to `READY`
