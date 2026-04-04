# 2026-04-03 Forest Vertical Destination Handoff

Prepared `ECO-20260403-scout-214` against packet `090`, the lane-3 brief, the live `forest` geometry in `src/content/biomes/forest.ts`, the current old-growth smoke coverage, and the recent browser/state artifacts in `output/main-150-debug-browser/`, `output/main-175-browser/`, and `output/main-194-browser/`.

## Current Read

The forest vertical family now has the right broad structure:

- `root-hollow -> stone-basin -> filtered-return` reads as one calm lower chamber family
- `high run -> old wood crossing -> hinge bay -> giant-tree pocket` now reads as one upper carry
- the old-growth side already has a clear arrival at `old-growth-crown-rest`
- the return still works through `old-growth-inner-bark-snag`, `old-growth-inner-bark-rest`, and the newer `canopy-inner-rest-crook`

That means the next gain should not be another rescue cue, another bridge patch, or another height spike.

What still feels a little thin is the remembered place inside the top old-growth band. Right now the player can:

1. arrive at `old-growth-crown-rest`
2. touch the crown-window side
3. fold back through the inner-rest return seam

That is fair and readable, but the strongest upper biology idea, `Forests Above`, still reads more like nearby dressing than like a place the player truly enters.

## Strongest Existing Hook

The best next destination is already implied by the shipped forest content:

- the upper canopy already holds `canopy-moss-bed`, `tree-lungwort`, and `old-mans-beard`
- the note `Forests Above` teaches that one giant branch can hold enough moss and water for a tiny forest to begin above the ground
- the live top route already passes through the exact band where that idea should feel real: `old-growth-crown-window -> old-growth-inner-rest-light -> canopy-inner-rest-crook`

What is missing is one standable branch-nursery pocket in that band.

## Recommendation

Treat `main-214` as one compact branch-nursery destination pass inside the current old-growth canopy family.

The target shape is:

1. keep `old-growth-crown-rest` as the high arrival
2. keep the current return through `old-growth-inner-bark-snag`
3. spend the new budget on one small inward-facing branch shelf or widened landing in the `crown-window / inner-rest` band
4. let that pocket carry the `Forests Above` idea with one high hemlock start plus the existing moss-and-lichen anchors

This makes the upper route feel like “the little forest above” instead of only “the top route plus the safe way down.”

## Why This Is The Best Budget

### Option 1. Build one branch-nursery pocket between crown-window and inner-rest

What it is:

- deepen the current `old-growth-crown-window` / `old-growth-inner-rest` band into one real destination pocket
- support it with the already-authored canopy-moss and lichen language plus one high seedling

Pros:

- strengthens place memory without growing the route taller
- reuses the live `Forests Above` teaching instead of inventing another payoff
- stays inside the current canopy/trunk silhouette
- keeps recovery on the existing snag and rest family

Tradeoffs:

- needs careful sizing so it reads like one intentional pocket, not another skinny connector

Assessment:

- best option

### Option 2. Add another outward perch on the right side

What it is:

- extend farther toward `old-growth-canopy-ledge` / `old-growth-upper-snag`

Pros:

- would feel bigger immediately

Tradeoffs:

- repeats the old “more top route” shape instead of creating a stronger destination
- spends the little remaining visual space nearest the corridor-facing side
- risks turning the pocket back into another continuation instead of a place to arrive

Assessment:

- reject

### Option 3. Add another higher shelf above crown-rest

What it is:

- raise the canopy ceiling again

Pros:

- would feel dramatic

Tradeoffs:

- fights the long-standing lane-3 guardrail against more top-left height pressure
- repeats a budget the crown-rest pass already used well
- makes readability worse faster than it adds wonder

Assessment:

- reject

## Proposed Shape For `main-214`

### Geometry

- Stay inside the current `old-growth-pocket` canopy band around `x ≈ 692-742` and `y ≈ 24-50`.
- Do not add any route height above `old-growth-crown-rest`.
- Do not touch the lower bridge, hinge, trunk-foot, or bark-shelf carry.
- Prefer one of these moves:
  - widen or slightly reposition `old-growth-crown-window` into a more standable inward pocket
  - or add one compact new branch shelf between `old-growth-crown-window` and `canopy-inner-rest-crook`
- If one helper seam is needed, keep it short, local, and clearly part of the same pocket. Do not add a second ascent spine.

### Habitat Support

Use the existing `Forests Above` language:

- `canopy-moss-bed`
- `western-hemlock-seedling`
- `old-mans-beard`
- `tree-lungwort`

The upper pocket should feel like an old branch holding water, bark life, and one tiny tree start, not like a new species pack or a new note system.

### Route Feel

The ideal route language becomes:

1. giant-tree ascent
2. crown-rest arrival
3. branch-nursery pocket
4. inner-rest crook
5. inner-bark snag return

That is enough to make the upper forest feel like one small remembered destination instead of only a good endpoint.

## Guardrails

- no new vertical cue or new helper language
- no new outward ledge near `old-growth-canopy-ledge`
- no bridge or trunk-foot changes
- no new animal branch
- no journal, note, route-board, or station work
- no second canopy expansion beyond this one pocket

## Suggested Acceptance For `main-214`

- the old-growth route now has one clearer upper destination beyond crown-rest
- the new pocket reads as inward, sheltered, and memorable rather than like another corridor ledge
- the player can still recover through the existing inner-bark return seam
- the pass stays inside one pocket-scale geometry move plus one tiny habitat support beat

## Test Suggestions

### Forest biome test

- add one focused assertion for the new upper pocket platform or widened landing inside the `x ≈ 692-742`, `y ≈ 24-50` band
- add one authored high `western-hemlock-seedling` support assertion in that same canopy pocket

### Runtime smoke

- start from the current old-growth upper route
- reach `old-growth-crown-rest`
- continue into the new branch-nursery pocket
- confirm nearby inspectables now include the intended upper canopy support set
- confirm the player can still re-catch `old-growth-inner-bark-snag` on the way back out

### Browser proof

- capture one live frame where the new nursery pocket and its support read as one place
- prefer a frame that still shows the return relationship clearly enough that the space reads like a destination, not a trap

## Queue Guidance

- Close `ECO-20260403-scout-214`.
- Promote `ECO-20260403-main-214` to `READY`.
- Retarget `ECO-20260403-main-214` and `ECO-20260403-critic-214` to this handoff report as their immediate source.
