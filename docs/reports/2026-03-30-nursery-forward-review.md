# 2026-03-30 Nursery Forward Review

## Scope

Review `ECO-20260330-main-70`: the merged nursery-forward field-station pass.

## What Changed

- The field station now splits into two compact views:
  - `SEASON`
  - `NURSERY`
- The new nursery loop adds:
  - one `Propagation Bench` for selecting a plant project
  - one automatic `Compost Heap`
  - one single-project `Teaching Bed`
- Nursery state now persists through save data with deterministic world-step processing for:
  - abstract gathered resources
  - one active bed project
  - reward claims
  - tiny habitat extras
- Gathering stays narrow and allowlisted: wrack, fallen material, dropped fruits or cones, and a small gated cutting set.
- Mature projects now pay out in three restrained lanes:
  - route-support hints
  - quiet station beauty or habitat extras
  - one small utility improvement through faster composting

## Critic Read

No blocking issues.

Why the pass is working:

- The nursery still reads as field-station support instead of a second game. The `SEASON | NURSERY` split keeps the route board, station credits, and next-travel framing visible while the plant-care layer stays compact.
- The ethics line is holding. The live gathering set reads like safe collection of fallen or already-available material rather than broad extraction or specimen-selling.
- The reward mix stays balanced. The nursery adds a little texture and medium-term anticipation, but the player is still pointed back toward expeditions, route beats, and habitat noticing.
- The handheld-scale presentation survives. In the seeded browser pass at `256x160`, the nursery cards remained readable, the compost line stayed legible, and starting `Sand Verbena` in the teaching bed still left the screen calm instead of dashboard-dense.

Residual watch item:

- Future nursery copy should keep honoring the current card budgets. The layout is working now, but this is still one of the tighter overlay surfaces in the project.

## Verification

- Focused nursery and station tests passed:
  - `src/test/nursery.test.ts`
  - `src/test/field-station.test.ts`
  - `src/test/runtime-smoke.test.ts`
  - `src/test/save.test.ts`
- Full `npm test` passed.
- `npm run build` passed.
- Ran the shared web-game client and inspected the resulting screenshot and state output in `output/web-game-critic-52`.
- Seeded live browser field-station pass at `http://127.0.0.1:4190/` confirmed:
  - the `NURSERY` tab remained readable at handheld scale
  - `Sand Verbena` could be started from the teaching bed
  - the resulting station state showed `activeProject.stage: "stocked"`
  - browser console errors: `0`

## Queue Guidance

- Close `ECO-20260330-critic-52`.
- Keep `ECO-20260330-main-75` blocked until `ECO-20260330-scout-44` prepares the third route handoff.
