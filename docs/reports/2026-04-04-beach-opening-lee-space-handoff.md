# 2026-04-04 Beach Opening Lee-Space Handoff

Prepared `ECO-20260404-scout-268` against packet `110`, the lane-3 brief, the scout role guide, the live `beach` geometry in `src/content/biomes/beach.ts`, the focused beach proofs in `src/test/beach-biome.test.ts` and `src/test/runtime-smoke.test.ts`, and the current browser artifacts in `output/main-192-browser/`, `output/main-207-browser/`, `output/lane-2-main-188-browser/`, and `output/lane-3-scout-268-client/`.

## Current Read

`Sunny Beach` no longer lacks route shape.

Right now the biome already has four readable traversal moments:

1. sparse start-side `dune-edge`
2. low `dune-crest` rise
3. tucked `lee-pocket`
4. calmer `tidepool` approach

That solved the old flat-strip problem, but it still has not created one opening-side place that players remember before the middle route starts doing the work.

## What Is Already Solved

### Not the dune crest again

The `dune-crest-*` family already gives the early beach a broad rise and the spacing review kept it from colliding with the map-return seam. Reopening that band would mostly stack more shape into a pass-through moment instead of fixing the start-side memory gap.

### Not the lee pocket again

The `lee-pocket-*` family is already the beach's clearest tucked middle beat. It now carries driftwood, runners, and route evidence, so another lane-3 pass there would make the strongest solved band denser instead of clearer.

### Not the tidepool side

The `tidepool-approach-*` family already gives the far-right beach a softer destination. It is a good follow-on reward, but it lands too late to solve the onboarding problem at the left start.

## Best Next Move

Use `main-268` on one compact opening lee-space in the late `dune-edge -> early dry-sand` band so the first beach chapter becomes:

1. open start
2. one tiny wind-shadow shoulder
3. dune crest
4. lee pocket
5. tidepool approach

Best question:

- where can the start side stop feeling like “the corridor-post side” and become one small sheltered beach place before the current crest and route family take over?

Why this is the strongest remaining move:

- it strengthens first-run spatial memory instead of another later reward
- it stays distinct from the existing middle `lee-pocket` and far-right `tidepool` destination
- it keeps the opener calm and readable without touching route, journal, or station surfaces

## Recommended Shape For `main-268`

Stay inside:

- `src/content/biomes/beach.ts`
- `src/test/beach-biome.test.ts`
- focused `src/test/runtime-smoke.test.ts`

Keep the current family intact:

- `dune-crest-entry-step`
- `dune-crest-mid-step`
- `dune-crest-view`
- `lee-pocket-entry-drift`
- `lee-pocket-drift-span`
- `lee-pocket-exit-drift`
- `tidepool-approach-drift`
- `tidepool-approach-sill`
- `tidepool-overlook`

### Preferred target band

- roughly `x 108-188`
- roughly `y 100-108`
- zone focus: right half of `dune-edge`, spilling only slightly into the first `dry-sand` stretch

### Suggested authored shape

Prefer one tiny lee-held shoulder, not another viewpoint:

1. `dune-shoulder-entry-lip`
   - around `x 118-136`
   - around `y 106-108`
   - short and low
   - job: hint that the sand is starting to hold a calmer pocket
2. `dune-shoulder-rest`
   - around `x 146-176`
   - around `y 100-104`
   - width around `22-30px`
   - job: give the opening one settled wind-shadow stop before the player reaches the higher dune crest

If the second piece alone already creates a readable sheltered shoulder, stop there and do not spend a second helper just to equalize the family.

## Best Carriers

Keep carriers local to the start-side dune band:

- `beach-grass`
- `beach-pea`
- `sand-verbena`
- optional `sea-rocket`

Best support shape:

- one grass or pea anchor near the new shoulder
- one low bloom or runner accent that helps the space read as held sand instead of a second route signpost
- no `driftwood-log` in this start-side beat, because driftwood already belongs to the route-backed middle `lee-pocket` clue

## Explicit Non-Targets

- do not move or widen the inland corridor door or its return-post logic
- do not reopen the current `dune-crest-*` height ladder
- do not add another authored beat inside the existing `lee-pocket` band
- do not spend this pass on `tide-line` wrack or `tidepool` clues
- do not add new climbables, vertical cues, route logic, journal logic, or notebook surfaces
- do not duplicate `driftwood-log` on the opening side
- do not turn the opener into a second branch or mini-gauntlet

## Desired Read

The beach should become:

1. start-side open sand
2. one tiny dune shoulder where wind starts dropping off
3. current dune crest rise
4. current lee pocket shelter
5. tidepool approach beyond

That gives the onboarding biome one earlier remembered place without undoing the current route-backed middle beat.

## Suggested Verification

### `src/test/beach-biome.test.ts`

- assert the new shoulder family lands in the approved `dune-edge -> dry-sand` band
- assert it stays left of the current `dune-crest-entry-step`
- assert it remains well left of the `lee-pocket-*` family
- assert authored support uses only the approved start-side carriers

### `src/test/runtime-smoke.test.ts`

- start on the normal beach opener
- reach the new shoulder first
- confirm the player can still continue cleanly to the current dune crest and then on to the lee pocket
- confirm the corridor door and return-post logic still stay readable without becoming the destination itself

### Browser guidance

Use these as before-state references:

- `output/lane-3-scout-268-client/shot-0.png`
- `output/main-192-browser/dune-crest.png`
- `output/main-192-browser/lee-pocket.png`
- `output/main-207-browser/dune-crest-fixed.png`

Success should look like:

- the first beach screen has one calmer shoulder that reads as a place, not just a door side
- the dune crest still reads as the next rise rather than the only early landmark
- the lee pocket still reads as the stronger middle shelter rather than getting replaced

## Queue Guidance

- Close `ECO-20260404-scout-268`.
- Promote `ECO-20260404-main-268` to `READY`.
- Retarget `ECO-20260404-main-268` and `ECO-20260404-critic-268` to this handoff.
