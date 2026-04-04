# 2026-04-04 Route-Marker Guidance Handoff

Scout handoff for `ECO-20260404-scout-261`.

## Scope Reviewed

- `docs/reports/2026-04-04-tactile-living-world-and-support-phase.md`
- `docs/reports/2026-04-04-wrack-opportunity-zone-fix-review.md`
- `.agents/packets/107-tactile-living-world-and-support-phase.json`
- `src/engine/game.ts`
- `src/engine/field-request-state.ts`
- `src/engine/world-map-render.ts`
- `src/engine/field-season-board.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`

## Best Target

Spend `main-261` on a small `route-marker` guidance pass, not a support-row trim.

`hand-lens`, `note-tabs`, and `place-tab` now have distinct live jobs:

- `hand-lens` owns clue-fit and moment-specific route copy.
- `note-tabs` owns notebook preview, filed-note, and chapter-close seams.
- `place-tab` now keeps a place-reading question across every live post-unlock route beat.

`route-marker` is the one remaining thin support. Right now it draws the target pin on the world map, but it still leaves focus where the player already was. In practice that means:

- opening the map from play still lands on the current biome
- closing the field station back to the world map still leaves focus on the prior location
- the player still has to manually walk the cursor to the route target before the existing `Today:` footer and route summary become useful

That makes `route-marker` feel more like a decorative reminder than a helper that changes how outing planning feels.

## Why This Is The Best Next Move

- It sharpens the weakest existing support without adding another support type or wider loadout UI.
- It reuses current lane-4-owned seams: active outing targeting, world-map focus, and the already-shipped route footer label.
- It keeps the row small. If `route-marker` still feels too thin after this, a later simplification call will be better grounded.

## Concrete Follow-On

### `game.ts`

Make `route-marker` guide world-map focus to the active outing target whenever that support is selected and a target exists.

Recommended shape:

1. Add one small helper that resolves the preferred world-map focus location:
   - if `route-marker` is selected and `getRouteMarkerLocationId()` returns a location, use that
   - otherwise keep the current focus rules
2. Use that helper when opening the world map from normal play through `openWorldMapDirect()`.
3. Use that helper when closing the field station back to an already-open world map, so selecting `route-marker` inside the station immediately hands the player to the right destination.

This should create a real felt difference:

- without `route-marker`, the map still opens on the current biome
- with `route-marker`, the map opens or returns already focused on the outing target
- the existing footer can then immediately show the route-facing `Today:` line or focused location summary without another chrome pass

## What Should Stay Unchanged

- keep the current route-marker pin drawing and existing footer labels
- do not add another map chip, path overlay, or travel-arrow system
- do not change support unlock order, support count, or save shape
- do not widen into lane-1 shell work like new travel panels or station rows
- leave `hand-lens`, `note-tabs`, and `place-tab` behavior unchanged

## Tests

Add focused runtime coverage:

- opening the world map from a biome with `route-marker` selected focuses the current outing target instead of the current biome
- selecting `route-marker` inside the field station while already on the world map and then closing the station snaps focus to the outing target
- non-`route-marker` supports still keep the current world-map focus behavior

If implementation extracts a small pure helper, add a narrow unit around that helper; otherwise the runtime-smoke slice is sufficient.

## Why The Alternatives Are Weaker

### Do not trim a support away first

The row is still compact, and `route-marker` has one remaining low-risk seam that can make it feel meaningfully different without adding clutter.

### Do not reopen `hand-lens` or `place-tab`

Those supports already change how the route reads in practice. Their remaining gains would mostly be wording polish, not a new feel.

### Do not widen into new map chrome

The current map already has the needed surfaces: focus, origin label, route pin, and route footer text. The missing part is behavior, not another layer.

## Best Main-Agent Slice For `main-261`

1. In `src/engine/game.ts`, add a small preferred-focus helper for world-map entry/return when `route-marker` is active.
2. Keep all other support and map UI surfaces unchanged.
3. Add focused runtime regressions showing that `route-marker` now changes map-planning feel by taking focus straight to the active outing target.

## Expected File Touches

- `src/engine/game.ts`
- `src/test/runtime-smoke.test.ts`

## Guardrails

- do not add new support ids or another support row
- do not modify `field-season-board.ts` unless implementation uncovers a missing dependency
- do not change world-map art or render chrome
- keep the change reversible and helper-sized
