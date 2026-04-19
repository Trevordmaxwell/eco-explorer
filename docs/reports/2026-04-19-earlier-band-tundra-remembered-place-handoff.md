# 2026-04-19 Earlier-Band Tundra Remembered-Place Handoff

Prepared `ECO-20260419-scout-317` against packet `128`, the lane-3 brief, the late-season packet report, the live `Tundra Reach` geometry in `src/content/biomes/tundra.ts`, the focused tundra proofs in `src/test/tundra-biome.test.ts` and `src/test/runtime-smoke.test.ts`, and the latest browser artifacts in `output/main-259-browser/` and `output/main-193-browser/`.

## Current Read

`Tundra Reach` already has three remembered beats:

1. the opener pocket at `wind-bluff -> snow-threshold`
2. the mid `snow-meadow` drift hold
3. the far-right `meltwater-bank-rest`

That leaves the first thaw band as the weakest remaining spatial seam. It teaches the route and the ecology, but it still reads mostly as:

1. `thaw-skirt-entry-heave`
2. long `thaw-skirt-upper-shelf`
3. `thaw-skirt-bank-shoulder`
4. quick release into `frost-ridge`

That is good traversal, but not yet a place the player remembers by feel.

## Why Not Reopen The Meadow Or The Far Right

The live evidence points away from both alternatives:

- `output/main-259-browser/tundra-drift-hold.png` shows the `snow-meadow` drift family already reading as a compact held lee before thaw begins.
- `docs/reports/2026-04-05-light-band-route-approach-review.md` already leaves a clear watch item: stay out of the exact `snow-meadow -> thaw-skirt` strip unless the work is pure cleanup.
- packet `128` explicitly says not to spend more density on `meltwater-bank-rest`, and `output/main-193-browser/meltwater-bank-rest.png` already gives the far-right side its own readable wet pocket.

So `main-317` should spend its budget inside the thaw band itself, where the current geometry still behaves more like route infrastructure than remembered space.

## Recommendation

Treat `main-317` as one compact `thaw-skirt` remembered place:

- biome: `Tundra Reach`
- zone: `thaw-skirt`
- target band: roughly `x 348-436`
- target height: roughly `y 98-106`

The best live seam to reshape is the current `thaw-skirt-upper-shelf -> thaw-skirt-bank-shoulder` handoff.

## Preferred Main Shape

Keep the current route family intact:

1. `thaw-skirt-entry-heave`
2. `thaw-skirt-upper-shelf`
3. `thaw-skirt-bank-shoulder`
4. `thaw-skirt-exit-heave`

But turn that middle from one long shelf plus release into one held thaw place.

### Preferred geometry

1. keep `thaw-skirt-entry-heave` as the approach catch
2. shorten or rebalance the current `thaw-skirt-upper-shelf` so it reads as the lead-in, not the destination
3. add one compact lower or mid-height `thaw-bench` / `wet-bank rest` around `x 374-410`
4. only if the handoff feels abrupt, let `thaw-skirt-bank-shoulder` become the tiny return step back out of that bench instead of adding a second new destination

Target dimensions for the new held place:

- width: about `22-30px`
- height band: about `y 100-104`
- job: create one brief sheltered thaw bench so the route reads `entry -> thaw bench -> bank release` instead of one long shelf and a shoulder

If the bench reads clearly, stop there. Do not turn this into another multi-stop pocket family.

## Best Carrier Support

Use the carriers already local to the thaw band:

- `arctic-willow`
- `tussock-thaw-channel`
- `bigelows-sedge`

If authored support needs a tiny retune, prefer nudging the current thaw-band anchors so they belong to the new bench:

- `thaw-skirt-entry-willow`
- `thaw-skirt-channel`
- `thaw-skirt-upper-sedge`

Do not add a new species, a new notebook surface, or a second landmark family for this pass.

## Desired Read

The earlier tundra band should become:

1. threshold pocket behind you
2. drift hold in `snow-meadow`
3. `thaw-skirt` entry rise
4. one held thaw bench or wet-bank rest
5. short release into `frost-ridge`
6. far-right `meltwater-bank-rest` still later as its own separate ending pocket

That gives the north end one more place-memory beat without reopening the solved extremes.

## Explicit Non-Targets

- do not add more geometry in the `snow-meadow` drift-hold strip
- do not touch `meltwater-bank-rest`
- do not widen `frost-ridge` into another destination
- do not add climbables, map logic, corridor changes, or a broader vertical family
- do not turn the thaw band into another High Pass-scale geometry wave

## Suggested File Targets

- `src/content/biomes/tundra.ts`
- `src/test/tundra-biome.test.ts`
- focused `src/test/runtime-smoke.test.ts`

## Suggested Verification

- `npm test -- --run src/test/tundra-biome.test.ts src/test/runtime-smoke.test.ts -t "adds one compact thaw-skirt bench between the drift hold and frost ridge|turns the earlier tundra band into a drift hold, thaw bench, then ridge release|keeps the meltwater-bank-rest pocket unchanged"`
- `npm run build`
- required shared client smoke
- one seeded browser proof centered on the new thaw bench with the drift hold behind it and the far-right wet pocket still clearly later in the route

## Queue Outcome

- Close `ECO-20260419-scout-317`.
- Promote `ECO-20260419-main-317` to `READY`.
- Retarget `ECO-20260419-main-317` and `ECO-20260419-critic-317` to this handoff.
