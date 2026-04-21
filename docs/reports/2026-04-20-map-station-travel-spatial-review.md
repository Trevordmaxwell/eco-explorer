# Map Station Travel Spatial Review

Created: 2026-04-20
Queue item: `ECO-20260420-critic-380`
Packet: `.agents/packets/143-map-station-travel-clarity-pass.json`
Lane: `lane-3`

## Verdict

No blocker. The Treeline Pass map-return cue fix satisfies the lane-3 packet 143 contract.

## What I Checked

- `src/content/world-map.ts` moves only the Treeline Pass `mapReturnPost` from `x: 404` to `x: 148`.
- Sprite id, facing, y-position, `HIGH PASS MAP` label, world-map copy, corridor doors, and other biome return posts are unchanged.
- `src/test/world-map.test.ts` now protects Treeline return-post clearance from `last-tree-approach-stone`, `lee-pocket-upper-shelf`, and `lee-pocket-exit-stone`, while existing beach and Coastal Scrub clearance tests remain in place.
- `src/test/runtime-smoke.test.ts` proves the moved post is reachable, opens the Treeline world map, returns to the same anchor, and leaves the old High Pass shelf band with `nearbyTravelTarget: null`.
- Browser proof under `output/lane-3-main-380-browser/` shows the post in early `Thin Canopy`, a clear old `Dwarf Shrub` shelf state, and `errors.json` is empty.

## Risk Review

- Scope drift: clear. No station page, route state, support behavior, save schema, journal/atlas copy, science copy, corridor geometry, or High Pass copy changed.
- Readability: improved. The travel label now appears before the shelter/exposure shelf instead of inside that route-memory band.
- Learning/world feel: improved. The shelf area can read as alpine place detail rather than as a map affordance.
- Determinism: clear. Unit, runtime, and browser proof all use deterministic seams.
- Residual risk: the proof intentionally targets Treeline only; tundra and forest return posts were left untouched because no fresh proof showed the same blocker class.

## Verification

- `PASS npm test -- --run src/test/world-map.test.ts`
- `PASS npm test -- --run src/test/runtime-smoke.test.ts -t "map-return|High Pass|destination-aware travel cue"`
- `PASS npm run build`
- `PASS output/lane-3-main-380-browser/errors.json` is empty
- Prior implementation proof includes the web-game client smoke and focused Treeline browser screenshots.

## Handoff

Packet 143 lane 3 is clean. Promote `ECO-20260420-scout-384` for packet 144.
