# 2026-04-04 Coastal Scrub Signature-Pocket Traversal Handoff

Prepared `ECO-20260404-scout-258` against packet `106`, the lane-3 brief, the scout role guide, the live `coastal-scrub` geometry in `src/content/biomes/coastal-scrub.ts`, and the current coastal browser artifacts in `output/main-191-browser/`, `output/main-204-browser/`, `output/main-209-browser/`, and `output/main-222-browser/`.

## Current Read

`Coastal Scrub` is no longer missing route structure.

Right now the biome already has four distinct traversal beats:

1. left gather at `shrub-thicket`
2. optional bluff rise
3. middle swale pocket
4. quieter shore-pine rest

That fixed the old “just a strip between beach and forest” problem, but it still has not created one benchmark coast-side destination that players remember the way forest now remembers its cave and giant-tree spaces.

## What Is Already Solved

### Not the left gather

The left gather now reads clearly after the map-post spacing fix. It is the approach into the family, not the place the player should remember most strongly.

### Not the middle swale pocket again

The `windbreak-pocket-*` pass already gave the swale a clear held low spot. Reopening that same band would mostly make the current beat denser instead of making the biome more memorable.

### Not the shore-pine rest again

The `shore-pine-rest-*` seam is already doing the quiet release job well, and the clean review explicitly said not to stack another strong authored beat into that same `shore-pine-stand` band.

## Best Next Move

Use `main-258` on one compact upper-bluff lookout pocket that turns the current optional rise into the biome's most memorable silhouette.

Best question:

- where can the current bluff crest stop being just “the higher route” and become one tiny lee-sheltered bluff place that lets the player feel wind above and held scrub below?

Why this is the strongest remaining move:

- it deepens the one coastal traversal family that still reads most like a connector
- it stays distinct from the already-landed low swale pocket and pine-floor rest
- it gives `Coastal Scrub` one strong destination shape without turning it into a second forest climb

## Recommended Shape For `main-258`

Stay inside:

- `src/content/biomes/coastal-scrub.ts`
- `src/test/coastal-scrub-biome.test.ts`
- focused `src/test/runtime-smoke.test.ts`

Keep the current family intact:

- `windbreak-gather-log`
- `windbreak-gather-lift`
- `windbreak-bluff-lee-step`
- `windbreak-bluff-mid-step`
- `windbreak-bluff-crest`
- `windbreak-swale-entry-log`
- `windbreak-swale-upper-log`
- `windbreak-pocket-lee-step`
- `windbreak-pocket-rest-log`
- `windbreak-swale-exit-log`
- `shore-pine-rest-log`

### Preferred target band

- roughly `x 286-344`
- roughly `y 82-96`
- zone focus: right half of `windbreak-swale`, but only on the upper bluff line

### Suggested authored shape

Prefer one tiny tucked upper rest just after the current crest, not a taller second branch:

1. `windbreak-bluff-lookout-rest`
   - around `x 318-338`
   - around `y 88-92`
   - width around `18-24px`
   - job: turn the crest into one small settled lee nook before the route rejoins the upper swale log

Only if the approach to that rest feels too abrupt, allow one tiny contour helper:

2. `windbreak-bluff-lookout-lip`
   - around `x 302-316`
   - around `y 90-94`
   - short and slightly lower than the rest
   - use it as a shape cue, not as another climb tier

If the single rest already makes the bluff read as a destination, stop there.

## Best Carriers

Keep carriers local to the bluff / scrub threshold, not the pine floor:

- `pacific-wax-myrtle`
- `coyote-brush`
- `song-sparrow`
- `deer-mouse`

Best support shape:

- one woody shrub or low cover anchor near the new upper nook
- optionally one tiny animal accent if the lookout needs to feel used
- no new species, climbables, cue markers, corridor edits, or note systems

## Explicit Non-Targets

- do not touch the repaired left map-post band again
- do not reopen the middle `windbreak-pocket-*` swale band
- do not stack another strong beat into `shore-pine-stand`
- do not move the forest corridor door
- do not add height beyond the current bluff family
- do not add a climbable, vertical cue, or new branch
- do not spend this pass on notebook, comparison, close-look, or route-shell work

## Desired Read

The biome should become:

1. gather into scrub
2. brief wind-exposed bluff climb
3. one tiny bluff lookout where the player can settle
4. held swale below
5. quieter pine release beyond

That gives `Coastal Scrub` a destination silhouette instead of just several good waypoints.

## Suggested Verification

### `src/test/coastal-scrub-biome.test.ts`

- assert the new lookout piece lands in the upper bluff band
- assert it stays between the current `windbreak-bluff-crest` and the low swale pocket family
- assert it remains well left of the shore-pine rest band
- assert authored support uses only the approved bluff/scrub carriers

### `src/test/runtime-smoke.test.ts`

- start in `coastal-scrub`
- reach the new bluff lookout first
- confirm the player can still drop or step back into the swale family safely
- confirm the pine rest and forestward release still follow cleanly afterward

### Browser guidance

Use these as the before-state references:

- `output/main-191-browser/bluff-crest.png`
- `output/main-222-browser/coastal-scrub-pocket.png`
- `output/main-204-browser/shore-pine-rest.png`

Success should look like:

- the bluff now has one small destination nook instead of only a pass-through crest
- the swale pocket still reads as the sheltered low route
- the pine rest still reads as the quieter release, not as the destination itself

## Queue Guidance

- Close `ECO-20260404-scout-258`.
- Promote `ECO-20260404-main-258` to `READY`.
- Retarget `ECO-20260404-main-258` and `ECO-20260404-critic-258` to this handoff report.
