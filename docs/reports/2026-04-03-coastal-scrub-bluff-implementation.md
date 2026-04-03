# 2026-04-03 Coastal Scrub Bluff Implementation

Implemented `ECO-20260402-main-191` against packet `077`, the lane-3 brief, and the scout handoff in `docs/reports/2026-04-03-coastal-scrub-bluff-handoff.md`.

## What Landed

`src/content/biomes/coastal-scrub.ts` now adds one compact optional bluff shoulder above the existing `windbreak-swale` bridge:

1. `windbreak-bluff-lee-step`
2. `windbreak-bluff-mid-step`
3. `windbreak-bluff-crest`

The original three swale logs remain the low route. The new bluff family rises above the left half of that lane, then settles back onto the long `windbreak-swale-upper-log`, so the player gets one brief exposed crest without losing the calmer sheltered traverse underneath.

## Guardrails Kept

- stayed inside the current coastal-scrub world size and camera band
- used only authored platforms in the existing traversal runtime
- added no new climbable, cue type, biome entry, or traversal mechanic
- kept the route optional and recoverable rather than turning it into the required line

## Test And Proof Coverage

Updated `src/test/coastal-scrub-biome.test.ts` to lock the authored bluff family into the intended height order above the existing swale bridge.

Updated `src/test/runtime-smoke.test.ts` with one focused proof that:

- enters `coastal-scrub`
- reaches the bluff crest
- confirms the route stays in `windbreak-swale`
- returns cleanly to the existing low bridge flow

## Verification

- `npm test -- --run src/test/coastal-scrub-biome.test.ts src/test/runtime-smoke.test.ts -t "adds a lowered windbreak swale with an optional bluff shoulder above the low route|turns the coastal-scrub swale into one optional bluff shoulder and keeps the low route recoverable"`
- `npm run build`
- `npm run validate:agents`
- required web-game client smoke pass in `output/main-191-client-smoke/`
- seeded browser proof in `output/main-191-browser/`

The seeded browser proof captured all three intended states with no console errors:

- `low-route.png`
- `bluff-crest.png`
- `recovered-route.png`
