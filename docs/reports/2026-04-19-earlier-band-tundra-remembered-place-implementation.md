# 2026-04-19 Earlier-Band Tundra Remembered-Place Implementation

Implemented `ECO-20260419-main-317` from packet `128` by turning the live `thaw-skirt` seam into one compact remembered bench instead of another long approach shelf.

## What Changed

### Tundra geometry

In `src/content/biomes/tundra.ts`:

- shortened `thaw-skirt-upper-shelf` from one long `72px` run into a shorter `40px` lead-in
- added `thaw-skirt-bench-rest` at `x 392, y 101, w 28`
- nudged `thaw-skirt-bank-shoulder` right and tighter so it now reads as the tiny release out of the bench instead of the place itself

That turns the middle of the route into:

1. `thaw-skirt-entry-heave`
2. shorter upper shelf
3. held thaw bench
4. tiny bank release
5. `frost-ridge`

### Carrier clustering

Also in `src/content/biomes/tundra.ts`:

- moved `thaw-skirt-channel` to `x 398, y 100`
- moved `thaw-skirt-upper-sedge` to `x 410, y 99`

Those existing thaw-band carriers now belong to the new bench instead of the old stretched shelf.

### Focused proofs

In `src/test/tundra-biome.test.ts`:

- extended the authored thaw-family proof to include `thaw-skirt-bench-rest`
- added a direct exact-shape test for the new thaw bench spacing
- updated the thaw-band authored carrier expectations
- renamed the far-right pocket guard to `keeps the meltwater-bank-rest pocket unchanged`

In `src/test/runtime-smoke.test.ts`:

- replaced the older longer thaw-skirt traversal proof with a tighter deterministic bench proof that starts in tundra near the seam and confirms:
  - the player settles into the held thaw bench with `tussock-thaw-channel` / `bigelows-sedge` nearby
  - the route still releases cleanly into `frost-ridge`

### Verification guard

In `src/engine/game.ts`:

- added one defensive fallback around the debug-only `fieldStation.backdropAccent` export inside `render_game_to_text()`

This does not change player-facing station rendering. It only prevents the shared state dump from crashing when another lane's in-progress shell helper seam is temporarily unresolved in the mixed worktree.

## Verification

- `npm test -- --run src/test/tundra-biome.test.ts src/test/runtime-smoke.test.ts -t "adds one compact thaw-skirt bench between the drift hold and frost ridge|turns the thaw-skirt seam into one held thaw bench before frost ridge|keeps the meltwater-bank-rest pocket unchanged|extends the thaw-skirt proof into a fuller inland relief and snow-edge family|authors one compact thaw-window support cluster in the thaw skirt and meltwater edge bands"`
- `npm run build`
- shared web-game client smoke in `output/main-317-browser-probe/`
- seeded tundra browser proof in `output/main-317-browser/thaw-bench.png` with matching `state.json` and empty `errors.json`

## Result

The north end now has a distinct earlier remembered place by feel:

1. opener pocket
2. snow-meadow drift hold
3. thaw bench
4. later `meltwater-bank-rest`

The thaw band feels more like a small place and less like only a route hinge, while the far-right pocket stays untouched.
