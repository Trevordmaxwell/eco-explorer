# Lane 1 First-Session Wayfinding Implementation

Queue: `ECO-20260420-main-334`
Packet: `.agents/packets/132-first-session-onboarding-and-wayfinding-proof.json`
Role: `main-agent`
Lane: `lane-1`

## Change

Guided world-map focus now uses the existing field-season `nextBiomeId` after route-marker support and before falling back to the current location. Route-marker support remains authoritative when active.

This keeps the first-session shell compact:

- fresh starter menus still default to `world-map`
- after `Shore Shelter`, `M` + `Enter` opens the map focused on `Forest Trail`
- station-return map menus still default to `field-station`
- after buying `Trail Stride`, closing the station returns to the world map focused on `Coastal Scrub`

## Files

- `src/engine/game.ts`
- `src/test/runtime-smoke.test.ts`

## Verification

- Passed: `npm test -- --run src/test/runtime-smoke.test.ts -t "first field-season guidance"`
- Passed: web-game client boot smoke at `output/lane-1-main-334-browser/shot-0.png`
- Passed: custom browser proof for completed `Shore Shelter` save; `M` + `Enter` opened `world-map` with `focusedLocationId: "forest"` and no console/page errors, screenshot at `output/lane-1-main-334-browser/guided-map-focus.png`
- Blocked: `npm run build` currently fails on pre-existing unused declarations in `src/test/field-requests.test.ts` (`RouteVariantMatrixCase`, `setRouteMatrixZone`, `expectFiledTextIncludes`, `createRouteMatrixCases`)
