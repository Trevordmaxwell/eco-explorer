# Lane 1 First-Session Wayfinding Handoff

Queue: `ECO-20260420-scout-334`
Packet: `.agents/packets/132-first-session-onboarding-and-wayfinding-proof.json`
Role: `scout-agent`
Lane: `lane-1`

## Finding

The first-session menu default is already pointed at the right shell action: biome play menus select `world-map`, and station-return / season-close-return menus on the world map select `field-station`. The smaller remaining lane-1 seam is map focus. `getPreferredWorldMapFocusLocationId()` currently prefers the route-marker support and otherwise keeps the current fallback location, so early guided states that already know a `nextBiomeId` can still open the map focused on the current location.

That matters in two first-session beats:

- after `beach-shore-shelter`, the guidance says `Hidden Hollow` is next in `Forest Trail`, but `M` + `Enter` can open the map still focused on the current beach location
- after buying `Trail Stride`, the guidance says `Open To Shelter` is next in `Coastal Scrub`, but closing the station can leave focus on the prior map location unless route-marker support is active

No new tutorial panel, copy expansion, station page, save change, or geometry work is needed.

## Main-334 Target

Make guided map focus use the existing `GuidedFieldSeasonState.nextBiomeId` as a fallback after route-marker support and before the current-location fallback. Keep route-marker support authoritative when active.

Recommended implementation:

- update `src/engine/game.ts` near `getPreferredWorldMapFocusLocationId()`
- keep `getRouteMarkerLocationId()` as first priority
- when `getGuidedFieldSeasonState().nextBiomeId` is present, focus the matching world-map location
- leave station-return and season-close-return behavior unchanged except for existing map-menu default to `field-station`

Recommended proof:

- extend `src/test/runtime-smoke.test.ts` first-session coverage so `M` + `Enter` from the beach-beat-complete starter state opens the world map focused on `forest`
- assert the station close after buying `Trail Stride` lands back on the world map focused on `coastal-scrub`
- preserve existing assertions that station-return and season-close-return menus select `field-station`

Verification:

- `npm test -- --run src/test/runtime-smoke.test.ts -t "first field-season guidance"`
- `npm run build`
- `npm run validate:agents`
- `git diff --check`
