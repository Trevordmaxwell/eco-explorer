# 2026-03-30 Regional Travel And Approach Review

## Scope

Review `ECO-20260330-critic-90` after `ECO-20260330-main-115`.

## Verdict

Clean pass. No blocking lane-1 issues found.

The regional follow-on stays inside the intended budget:

- interior map-return posts now feel a little more authored and less like identical utility switches
- the walking-only world-map cue adds chapter feel during long hops without becoming another persistent guidance layer
- corridor door labels, footer grounding, and map-return behavior all stay intact, so this reads as warmth layered onto the coherence pass rather than a new navigation system

The result is subtle, readable, and calm enough to move on.

## Evidence

- Focused tests passed:
  - `npm test -- --run src/test/world-map.test.ts`
  - `npm test -- --run src/test/runtime-smoke.test.ts -t "covers title, play, inspect, menu, world-map travel, journal, and reload persistence|uses an authored map-return post to open the map and return to the same interior anchor|uses the authored map-return post as the same-biome anchor when the map opens from the field menu|keeps the current origin readable on the world map when focus moves away"`
- Live browser review was clean with zero console errors:
  - `output/lane-1-main-115-browser/post-cue-state.json`
  - `output/lane-1-main-115-browser/post-cue.png`
  - `output/lane-1-main-115-browser/walking-hud-state.json`
  - `output/lane-1-main-115-browser/walking-hud.png`
  - `output/lane-1-main-115-browser/console-errors.json`

## Review Notes

- `INLAND MAP` reads clearly above the forest post and stays comfortably inside the current travel-cue footprint.
- The walking HUD capture showing `HIGH PASS` is a good ceiling for this layer: it makes the hop feel like an approach into a broader place, but it does not compete with the footer or turn into a route planner.
- Keeping both labels authored in `src/content/world-map.ts` was the right move. The pass stays data-driven and easy to extend to later biomes or districts.

## Follow-On Guidance

Promote `ECO-20260330-scout-80`.

The next scout step can now use the newly grounded coast / inland / high-country language as the base for one calm second-season invitation without reopening travel HUD scope.

## Non-Blocking External Watch

Broader shared verification is currently noisy outside this pass:

- `npm test -- --run src/test/world-map.test.ts src/test/runtime-smoke.test.ts` is failing in unrelated field-station assertions
- `npm run build` is currently blocked by a shared `FieldStationOverlayOptions` mismatch

Those issues sit outside the regional travel change and should not block this lane-1 review result.
