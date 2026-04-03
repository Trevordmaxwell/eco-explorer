# 2026-04-03 Forest Sub-Canopy Waypoint Handoff

Prepared `ECO-20260402-scout-156` against packet `080`, the lane-3 brief, the current forest geometry in `src/content/biomes/forest.ts`, the focused forest traversal proofs in `src/test/forest-biome.test.ts` and `src/test/runtime-smoke.test.ts`, and the latest relevant forest artifacts in `output/main-127-browser/`, `output/main-150-browser/`, and `output/main-175-browser/`.

## Current Read

The forest vertical family is no longer missing route shape.

Right now the player can:

1. drop through `root-hollow` into `stone-basin`
2. recover through `filtered-return`
3. carry the high line across `log-run`, the old-wood bridge, and the hinge bay
4. arrive at `old-growth-pocket`
5. climb into the crown-rest loop

That means the next gain should not be another bigger branch.

What still feels slightly thin is the quiet middle of that experience:

- the cave mouth reads as a recovery seam, but not yet as a small observation place where dark hollow meets brighter return light
- the upper old-growth route has a cue and several carriers, but the area around `old-growth-inner-rest-light` still reads more like climb infrastructure than like one tucked canopy stop

## Best Next Move

Use `main-194` on two tiny waypoint passes tied to the live vertical-cue anchors that already exist:

1. one cave-mouth observation point around `stone-basin-return-light`
2. one canopy rest nook around `old-growth-inner-rest-light`

This is the strongest next move because it:

- deepens the forest without widening the biome or reopening difficulty
- turns already-shipped recovery seams into habitats the player might remember
- keeps the work inside `forest.ts` and focused traversal proofs
- avoids another “more height” or “more cave depth” pass immediately after the last vertical wave

## Current Evidence

### Cave side

The cave family now has strong depth and recovery:

- `output/main-127-browser/under-basin-pocket.png` proves the deeper lower pocket works
- `output/main-150-browser/upper-return.png` shows `stone-basin-return-light`, `root-curtain`, and the upper ledges reading as the recovery path out

What it still lacks is one tiny place at the mouth itself. The current upper-return image still reads mostly as “this is how I get out,” not “this is where damp cave life starts giving way to brighter forest air.”

### Old-growth upper side

The old-growth family already has:

- the trunk-foot nook
- the hinge carry
- the crown-rest destination
- the inner-bark return seam

The useful live anchor here is `old-growth-inner-rest-light`:

- `output/main-175-browser/hinge-light.png` shows the current approach and the lower old-growth pocket staying readable
- `src/content/biomes/forest.ts` already places `old-growth-inner-rest-light` at `x: 724`, `y: 46`
- the nearby platforms are `old-growth-inner-bark-rest` and `old-growth-canopy-ledge`

The cue is already doing quiet guidance work, but the surrounding space still reads as “upper route pieces” more than as one tucked canopy nook.

## Recommendation For `main-194`

### 1. Cave-mouth observation point

Stay inside the existing recovery family around:

- `root-hollow-return-nook`
- `root-hollow-high-ledge`
- `root-hollow-exit-log`
- `stone-basin-return-light`

Best target band:

- roughly `x 388-428`
- roughly `y 92-126`

Best shape:

- prefer one tiny observation sill or a very small widen of an existing return shelf
- do not add a new climbable
- do not deepen the basin or move the current recovery route

Best carriers:

- `root-curtain`
- `tree-lungwort`
- `seep-moss-mat`
- optional `licorice-fern`

Desired read:

- the player pauses at the brighter mouth edge
- can still see the darker basin below
- can read that moisture and dim shelter continue upward into bark and roots

### 2. Canopy rest nook

Stay inside the existing upper old-growth band around:

- `old-growth-inner-bark-rest`
- `old-growth-canopy-ledge`
- `old-growth-inner-rest-light`

Best target band:

- roughly `x 708-746`
- roughly `y 42-60`

Best shape:

- prefer one tiny branch-crook shelf or a small rest widening around the current inner-rest cue
- do not raise the route above `old-growth-crown-rest`
- do not add a new upper snag or another tall rung

Best carriers:

- `canopy-moss-bed`
- `old-mans-beard`
- `tree-lungwort`

Desired read:

- one tucked stop inside the branches
- clearly part of the upper canopy, not a new challenge branch
- easy handoff back to `old-growth-inner-bark-rest` / `old-growth-canopy-ledge`

## Scope Boundary

- no new climbables
- no new zone boundaries
- no world-size changes
- no added height above the current crown-rest ceiling
- do not touch the lower trunk-foot band again
- do not reopen the deepest basin geometry
- do not grow a new journal, route, or station surface

## Suggested Acceptance For `main-194`

- the cave side gains one tiny cave-mouth waypoint that reads as a light/damp transition place, not just a recovery path
- the upper old-growth side gains one tucked canopy rest nook around the current inner-rest cue
- both waypoints reuse the existing forest roster and stay recoverable
- the vertical family feels more habitat-first without adding a new branch or harsher movement

## Test Suggestions

### Forest biome test

- assert the new cave-mouth and canopy waypoint pieces stay within the current cave-return and upper old-growth bands
- assert no new climbables were added
- assert the authored waypoint carriers use the current forest roster

### Runtime smoke

- one focused cave-mouth proof starting near `filtered-return` to confirm the player can settle at the new observation point and still rejoin the exit route
- one focused upper-old-growth proof starting near the current inner-rest band to confirm the player can settle into the canopy nook and still rejoin the return seam cleanly

### Browser proof

- one frame of the cave-mouth waypoint with the darker basin still visible below
- one frame of the canopy nook with the current upper route and recovery relationship still readable at `256x160`

## Queue Guidance

- Close `ECO-20260402-scout-156`.
- Promote `ECO-20260402-main-194` to `READY`.
- Retarget `ECO-20260402-main-194` and `ECO-20260402-critic-167` to this handoff report as their immediate source of truth.
