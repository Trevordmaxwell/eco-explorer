# Tundra Thaw Window Spatial Handoff

Created: 2026-04-20
Queue item: `ECO-20260420-scout-372`
Packet: `.agents/packets/141-tundra-thaw-window-payoff-pass.json`
Lane: `lane-3`

## Recommendation

Make this lane-3 pass proof-first.

The Tundra thaw-window space already has a strong authored physical chain: snow-meadow drift hold -> thaw-skirt entry heave -> upper shelf -> lower bench/channel -> bank shoulder/exit -> frost-ridge drift -> meltwater snow lip -> meltwater bank rest. The route, copy, and support lanes have already proved the active `Thaw Window` behavior; lane 3 should now make the existing physical recovery lane explicit rather than spending more screen density.

## Main Scope

- Add one focused guard in `src/test/tundra-biome.test.ts`.
- Pin the existing thaw-aware movement/recovery chain across snow meadow, thaw skirt, frost ridge, and meltwater edge.
- Pin the authored carriers that make the chain read as wet thaw ground: snow-meadow sedge, entry willow, thaw channel, upper sedge, meltwater channel, bank willow, and bank cottongrass.
- Keep runtime behavior, route/support logic, station UI, save schema, world-map behavior, science copy, journal/atlas copy, High Pass copy, player physics, and new UI surfaces unchanged.

## Suggested Assertions

- `snow-meadow-drift-rest` leads to `thaw-skirt-entry-heave` before the upper shelf.
- `thaw-skirt-upper-shelf` sits above entry/bench, while `thaw-skirt-bench-rest`, `thaw-skirt-bank-shoulder`, and `thaw-skirt-exit-heave` form a forgiving descending recovery lane.
- `frost-ridge-drift-rest` hands off to `meltwater-snow-lip`, then `meltwater-bank-rest`, without adding another route branch.
- `meltwater-bank-rest` remains before `x 604`, keeping the proof inside the existing north-end pocket.
- Required carriers remain authored near the chain: `snow-meadow-drift-sedge`, `thaw-skirt-entry-willow`, `thaw-skirt-channel`, `thaw-skirt-upper-sedge`, `meltwater-channel`, `meltwater-bank-willow`, and `meltwater-bank-cottongrass`.

## Verification Baseline

- `PASS npm test -- --run src/test/tundra-biome.test.ts`
- `PASS npm test -- --run src/test/runtime-smoke.test.ts -t "Thaw Window|thaw-window|tundra process|thaw fringe|thaw-hold|tundra survey place-tab"`

## Browser Proof

No browser proof is required if the main pass stays test/report-only. If geometry, placement, renderer, or visual-position changes land, capture a real `256x160` proof and state export before review.
