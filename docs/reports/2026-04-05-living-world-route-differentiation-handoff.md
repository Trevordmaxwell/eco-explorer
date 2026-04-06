# Living-World Route Differentiation Handoff

Scout handoff for `ECO-20260405-scout-289`.

## Scope Reviewed

- `docs/reports/2026-04-05-living-world-route-differentiation-phase.md`
- `.agents/packets/119-living-world-route-differentiation-phase.json`
- `src/engine/field-requests.ts`
- `src/engine/game.ts`
- `src/engine/field-season-board.ts`
- `src/content/biomes/tundra.ts`
- `src/test/field-requests.test.ts`
- `src/test/runtime-smoke.test.ts`

## Best Target

Spend `main-289` on `tundra-short-season` during the live `Thaw Window` state.

The cleanest first proof is a same-band alternate first-bloom carrier:

- keep the route id and filed note as `Short Season`
- keep the live process-backed outing title as `Thaw Window`
- during the active `thaw-fringe` window only, let `woolly-lousewort` also satisfy the `first-bloom` slot
- rely on the existing `hand-lens` nearest-notebook-fit behavior so support choice now changes what clue the player is naturally pulled toward in the world

## Why This Is The Best Next Move

- It matches the packet's preferred shape exactly: same route, same band, same-stage differentiation instead of a new branch.
- It stays inside the light tundra band. `woolly-lousewort` already lives in `thaw-skirt`, the active route already spans `snow-meadow` plus `thaw-skirt`, and peak phenology already accents it visually.
- It turns the current support choice into actual play difference. With `hand-lens`, the player can be guided toward a truthful thaw-window bloom carrier instead of only reading a different strip.
- It builds on the proven `Held Sand` pattern in `field-requests.ts`, so the implementation can stay small and declarative.

## Why Tundra Still Wins Over Coastal Scrub

`scrub-edge-pattern` already carries several living-world alternatives (`Held Sand`, `Haze Edge`, existing support prompts) and sits closer to active lane-2 and lane-3 Coastal Scrub work. Tundra is cleaner for the first proof because:

- the `Thaw Window` route already has one compact process seam
- the alternate carrier can stay in the same route band
- the support effect will read clearly without colliding with other active identity pushes

## Concrete Follow-On

### `field-requests.ts`

Extend the existing `processFocus` on `tundra-short-season`.

Recommended shape:

- keep `momentId: 'thaw-fringe'`
- keep the current `activeTitle` and `activeSummary`
- add one `activeSlotEntryIdsBySlotId` mapping:
  - `first-bloom: ['woolly-lousewort']`

That makes `woolly-lousewort` a truthful alternate bloom carrier only while the live thaw-fringe window is active.

### `game.ts`

Do not add a new hand-lens branch.

The current `getNearestInspectable()` logic already prefers the nearest inspectable with a notebook fit when `hand-lens` is selected. Once the route accepts `woolly-lousewort` for the live first-bloom slot, the support difference should happen automatically through the existing targeting seam.

## Tests

Add focused regressions:

- `src/test/field-requests.test.ts`
  - outside the active thaw-fringe window, `woolly-lousewort` does not fit `first-bloom`
  - during the active thaw-fringe window, both `purple-saxifrage` and `woolly-lousewort` fit `first-bloom`
  - inspecting `woolly-lousewort` during that window fills the `first-bloom` slot on `tundra-short-season`
- `src/test/runtime-smoke.test.ts`
  - seed a tundra `Thaw Window` setup where `hand-lens` can prefer nearby `woolly-lousewort` over a nearer non-fit inspectable and confirm the route progresses through the alternate bloom carrier
  - keep one non-`hand-lens` comparison in the same setup so the change still reads as a support-shaped play difference instead of a universal retarget

## What Should Stay Unchanged

- `note-tabs` should stay notebook-preview and filing-first
- `route-marker` should stay travel and planning-first
- the station shell, route board, and filed-note contract should not change
- `Bright Survey` should stay the later survey-capstone phenology pass, not get folded into this route

## Why The Alternatives Are Weaker

### Do not spend this first proof on more place-tab wording

That would make the route read differently, but it still would not materially change how the player finds a clue in the world. The phase goal is stronger than another strip-only distinction.

### Do not spend this pass on a new `tundra-survey-slice` carrier change

`tundra-survey-slice` is not a Route v2 evidence loop, so it lacks the clean same-stage alternate-carrier seam that already exists for `tundra-short-season`.

### Do not widen into a new targeting system

The current hand-lens preference already gives lane 4 the right in-world behavior. The best move is to feed that seam one truthful live alternate carrier, not to open a second targeting mechanism.

## Best Main-Agent Slice For `main-289`

1. In `src/engine/field-requests.ts`, add `woolly-lousewort` as an active `first-bloom` carrier only during `thaw-fringe`.
2. Prove the route can progress through that alternate bloom without changing notebook-ready or filed identity.
3. Add a runtime smoke case where `hand-lens` meaningfully changes what gets inspected in a live `Thaw Window` setup.

## Expected File Touches

- `src/engine/field-requests.ts`
- `src/test/field-requests.test.ts`
- `src/test/runtime-smoke.test.ts`

## Guardrails

- do not add a new support type, route HUD, or planner seam
- do not rename the filed route or add more notebook-return complexity
- do not widen the alternate-carrier pattern beyond this one slot in this first proof
- keep the proof inside `snow-meadow` / `thaw-skirt`, not `frost-ridge`
