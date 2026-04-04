# 2026-04-03 Coastal Scrub Signature Pocket Implementation

Completed `ECO-20260403-main-222` in lane 3 against packet `094`, the coastal-scrub pocket handoff, the lane-3 brief, and the main-agent role guide.

## What Shipped

The `Coastal Scrub` middle swale now has one true sheltered pocket instead of reading only as a through-lane between the bluff and the shore-pine rest.

Implementation stayed inside the approved lane-3 scope:

- `src/content/biomes/coastal-scrub.ts`
- `src/test/coastal-scrub-biome.test.ts`
- `src/test/runtime-smoke.test.ts`

### Geometry

Inside `windbreak-swale`, the pass now adds one low settling lip plus one tucked rest:

- `windbreak-pocket-lee-step`
- `windbreak-pocket-rest-log`

The new pocket sits in the middle swale band rather than reopening the left map-return repair or stacking another authored beat into `shore-pine-stand`.

The finished read is:

1. thicket gather and bluff rise
2. tucked swale pocket
3. quiet shore-pine rest
4. forestward release

### Pocket Carriers

The pocket uses only the approved live swale carriers:

- `beach-strawberry`
- `song-sparrow`

No new species, climbables, travel cues, or corridor logic were added.

## Why This Landed Better

The first draft pushed the pocket too close to the swale exit. Before finalizing, I shifted the pocket left into the handoff band so the place reads as the biome's center of shelter instead of a pre-pine transition ledge.

That keeps:

- the bluff as the brief exposed feel
- the pocket as the held middle
- the pine rest as the quieter release

## Verification

Ran the focused lane-3 slice:

- `npm test -- --run src/test/coastal-scrub-biome.test.ts src/test/runtime-smoke.test.ts -t "adds a lowered windbreak swale with an optional bluff shoulder above the low route|builds the coastal-scrub family from the normal entry into the bluff and back to the low route|adds one quiet shore-pine rest after the swale family and keeps the forestward release open|adds a tucked middle swale pocket and still releases cleanly into the pine rest"`
- `npm run build`

Ran the required web-game client smoke:

- `output/lane-3-main-222-client/`

Captured targeted seeded browser proof from a direct `coastal-scrub` start:

- `output/main-222-browser/coastal-scrub-pocket.png`
- `output/main-222-browser/state.json`
- `output/main-222-browser/errors.json`

The final browser frame shows the pocket settled in the swale with the upper route still readable above it and the pine-rest release still hinted to the right. Console errors stayed empty.
