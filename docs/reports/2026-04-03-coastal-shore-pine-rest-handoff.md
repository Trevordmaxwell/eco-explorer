# 2026-04-03 Coastal Shore-Pine Rest Handoff

Prepared `ECO-20260403-scout-166` against packet `085`, the lane-3 brief, the fresh coastal family review/fix pair, the live `coastal-scrub` geometry in `src/content/biomes/coastal-scrub.ts`, the focused runtime proofs in `src/test/runtime-smoke.test.ts`, and the latest relevant browser/state artifacts in `output/main-191-browser/`, `output/main-209-browser/`, `output/main-193-browser/`, and `output/main-194-browser/`.

## Current Read

The new left coastal family now works:

1. `back-dune` opening
2. denser `shrub-thicket` gather
3. sheltered `windbreak-swale`
4. one optional bluff crest

After `main-209`, that left-side gather is finally clear of the `COAST MAP` interaction range, so the family now reads as habitat first.

What still feels slightly abrupt is the release out of that family. Right now the route goes:

1. `windbreak-swale-exit-log`
2. immediate `shore-pine-stand` ground
3. stable pine/underlayer life
4. then onward toward `forest-edge`

That means the biome teaches the pine underlayer mostly through entities and notes, not through one small place to pause. The right half is not broken, but it still reads more like "the swale is over" than "the scrub has settled into a quieter pine pocket."

## Ruled-Out Candidates

### Not tundra

`docs/reports/2026-04-03-tundra-spatial-depth-review.md` already flags `meltwater-bank-rest` as close to the density ceiling for the far-right tundra edge. Another authored beat there would risk crowding the exact pocket that review said to leave alone.

### Not another left-side coastal beat

`docs/reports/2026-04-03-coastal-map-post-spacing-fix-review.md` leaves a clear watch item: do not stack another strong authored beat directly into the same left-half map-post band that was just repaired.

### Not another upper-canopy forest pass

The forest waypoint work is already doing its job, and the last clean review only left a watch item about future crowding in the canopy nook. That makes it a weaker next target than the underdeveloped right half of `coastal-scrub`.

## Best Next Pass

Spend `main-204` on one tiny right-half rest seam inside `coastal-scrub`'s `shore-pine-stand`.

This is the best next move because it:

- stays inside packet `085`'s existing coastal write scope
- avoids the repaired left map-post band
- gives the `shore-pine` / `kinnikinnick` / `song-sparrow` note family a physical place to belong
- adds rest and habitat identity without turning the biome into a second vertical proof

## Recommended Change For `main-204`

Stay inside:

- `src/content/biomes/coastal-scrub.ts`
- `src/test/coastal-scrub-biome.test.ts`
- focused `runtime-smoke` coverage

Keep the current left-side family intact:

- `windbreak-gather-log`
- `windbreak-gather-lift`
- `windbreak-bluff-lee-step`
- `windbreak-bluff-mid-step`
- `windbreak-bluff-crest`
- `windbreak-swale-entry-log`
- `windbreak-swale-upper-log`
- `windbreak-swale-exit-log`

### Preferred target band

- roughly `x 428-476`
- roughly `y 100-108`
- zone focus: late `windbreak-swale` into early `shore-pine-stand`

### Suggested authored shape

Prefer one tiny rest family, not a new branch:

1. `shore-pine-rest-log`
   - around `x 436-462`
   - around `y 102-104`
   - width around `22-28px`
   - reads as the first settled pause after the swale release
2. optional `shore-pine-rest-step`
   - only if needed to smooth the handoff from `windbreak-swale-exit-log`
   - keep it low and nearly level with the rest log
   - do not turn it into a second bluff or staircase

If the single rest log already makes the right half read clearly, stop there.

### Preferred carriers

Use the existing pine-underlayer roster only:

- `shore-pine`
- `kinnikinnick`
- `song-sparrow`

Best authored support:

- one low `kinnikinnick` mat near the rest
- optionally one `song-sparrow` or one slightly leaned `shore-pine` placement to make the space feel hushed
- do not add new species, cue markers, inspect systems, or note shells

## Desired Read

The right half of `coastal-scrub` should feel like:

1. gathered thicket
2. swale shelter
3. brief bluff option
4. quieter pine rest
5. then the path toward forest shade

That keeps the biome broad and calm while giving the player one more remembered place inside the current route.

## Guardrails

- do not touch the repaired left map-return post band again
- do not edit corridor runtime, corridor ownership, or world-map anchors
- do not move the far-right corridor door to `forest`
- do not add a climbable, vertical cue, or another crest
- keep the new seam inside the current one-camera-band readability budget
- let the pine pocket read as rest, not as a reward perch

## Test Guidance

### `src/test/coastal-scrub-biome.test.ts`

- assert the new rest piece lands to the right of `windbreak-swale-exit-log`
- assert it stays inside `shore-pine-stand` and below the bluff family
- assert any authored support stays within the existing pine-underlayer roster

### `src/test/runtime-smoke.test.ts`

- enter `coastal-scrub` from the normal start
- carry through the current gather/swale family
- settle into the new pine rest seam
- continue onward without trapping the player or colliding with the forest corridor door

Best proof question:

- does the right half now feel like a quieter pine pocket after the swale, rather than just the end of the family?

### Browser Guidance

Capture one seeded browser frame that shows:

- the new pine rest seam
- the swale family still readable to the left
- the forestward release still visible to the right
- no travel label or door clutter stealing the read

## Queue Guidance

- Close `ECO-20260403-scout-166`.
- Promote `ECO-20260403-main-204` to `READY`.
- Retarget `ECO-20260403-main-204` and `ECO-20260403-critic-177` to this handoff report.
