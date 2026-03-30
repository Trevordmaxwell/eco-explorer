# 2026-03-30 Route Replay Variant Review

## Scope

Review `ECO-20260330-main-79`: the first route-aware revisit variant pass.

## What Changed

- The field-season board now resolves one optional `replayNote` from existing route state, world-state, habitat-process, and nursery-reward seams instead of adding a separate replay system.
- When a replay window is live, the active beat title, detail, and board summary swap to that authored variant while the rest of the route board stays unchanged.
- Entering the current target biome during a live replay window now shows one short in-biome notice that matches the route-board variant.
- The pass covers the three live routes through small authored windows such as `Moist Hollow`, `Rime Shelter`, `Held Sand`, `Moist Edge`, and `Brief Bloom`.

## Critic Read

No blocking issues.

Why the pass is working:

- Replay support stays authored because it only rides on top of the already-active route beat instead of randomizing the whole board.
- The implementation uses existing day-part, weather, phenology, process-moment, and nursery seams, so the world feels richer without growing a second progression layer.
- The in-biome surfacing is restrained: one short notice on biome entry, only when the replay window is live, and only for the current route target biome.
- The station remains readable at `256x160` because the active beat is the only text that changes; the route shell, atlas, and support rows stay familiar.

## Watch Item

If this replay lane grows later, keep it to one active-note swap at a time. Do not stack multiple replay badges, route-history lists, or broader replay dashboards onto the station.

## Verification

- Focused replay and runtime tests passed:
  - `src/test/field-season-board.test.ts`
  - `src/test/runtime-smoke.test.ts`
- Full `npm test` passed.
- `npm run build` passed.
- `npm run validate:agents` passed.
- Ran the shared web-game client and inspected the fresh-play output in `output/web-game-main-79`.
- Seeded live browser checks at `http://127.0.0.1:4189/` confirmed:
  - forest entry shows `fieldRequestNotice.title: "Moist Edge"`
  - the active `forest-cool-edge` beat swaps to `Moist Edge`
  - the field-station route board shows the same replay note without crowding the overlay
- Browser console errors: `0`

## Queue Guidance

- Close `ECO-20260330-main-79`.
- Close `ECO-20260330-critic-57`.
- Promote `ECO-20260330-main-80` once `ECO-20260330-scout-49` is landed.
