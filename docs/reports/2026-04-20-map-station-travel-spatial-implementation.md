# Map Station Travel Spatial Implementation

Created: 2026-04-20
Queue item: `ECO-20260420-main-380`
Packet: `.agents/packets/143-map-station-travel-clarity-pass.json`
Lane: `lane-3`

## Summary

Moved the Treeline Pass `HIGH PASS MAP` return cue out of the High Pass shelter/exposure shelf band and into a quieter early-interior position.

## Changed

- `src/content/world-map.ts`
  - Treeline Pass `mapReturnPost` moved from `x: 404` to `x: 148`.
  - Sprite, facing, y-position, labels, corridor doors, map nodes, and world-map copy stayed unchanged.
- `src/test/world-map.test.ts`
  - Added a Treeline clearance guard proving the post is before `last-tree-approach-stone` and outside the `lee-pocket-upper-shelf` / `lee-pocket-exit-stone` band.
- `src/test/runtime-smoke.test.ts`
  - Added a Treeline runtime proof that the moved post is reachable, opens the world map on Treeline Pass, returns to the same post anchor, and leaves the old High Pass shelf band with `nearbyTravelTarget: null`.

## Browser Proof

Ignored proof artifacts live under `output/lane-3-main-380-browser/`.

- `treeline-map-return-post-256x160.png`
- `state-treeline-map-return-post.json`
- `state-world-map-from-treeline-post.json`
- `high-pass-shelf-clear-256x160.png`
- `state-high-pass-shelf-clear.json`
- `errors.json`
- `client/shot-0.png`
- `client/state-0.json`

The focused proof found no console or page errors. The map-return capture shows the post in the early `Thin Canopy` area, while the old `Dwarf Shrub` / shelter shelf capture has no nearby travel target.

## Preserved

- Station pages and station state
- Route definitions, active outing behavior, route-marker behavior, ready-to-file behavior, and filed-state behavior
- Save schema and migrations
- Journal, atlas, and science copy
- Corridor geometry
- Beach, Coastal Scrub, forest, and tundra map-return posts
- High Pass route copy and world-map labels

## Verification

- `PASS npm test -- --run src/test/world-map.test.ts`
- `PASS npm test -- --run src/test/runtime-smoke.test.ts -t "map-return|High Pass|destination-aware travel cue"`
- `PASS npm run build`
- `PASS web-game client smoke under output/lane-3-main-380-browser/client/`
- `PASS focused Treeline browser proof under output/lane-3-main-380-browser/`
