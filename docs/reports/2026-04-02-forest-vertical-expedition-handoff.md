# 2026-04-02 Forest Vertical Expedition Handoff

Prepared `ECO-20260402-scout-112` against packet `054`, the lane-3 brief, the live `forest` geometry, the earlier `ROOT HOLLOW` expedition beat sheet, the finished cave-loop and giant-tree reports, and fresh forest browser artifacts in `output/lane-3-scout-112-browser/`.

## Current Read

The forest already has two strong vertical families:

- the under-root cave loop now reads as one calm chamber family with a real recovery shape
- the old-growth climb now has a true arrival and a recoverable crown-to-interior loop

Those halves are no longer the problem.

What still reads thin is the carry between them. Right now the forest vertical language becomes flatter once the player leaves the cave-return side:

- `root-hollow` and `filtered-return` feel special
- `old-growth-pocket` feels special
- the middle `log-run -> creek-bend -> bridge` stretch still reads more like connective travel than a deliberate chapter carry

That is why the whole family can still feel like stacked proofs instead of one memorable outing path.

## Strongest Existing Hook

The best clue is already in the shipped forest expedition language:

- `docs/reports/2026-03-30-forest-expedition-beat-sheet-handoff.md` already framed the forest chapter as:
  1. `Lower Hollow`
  2. `Trunk Climb`
  3. `Upper Run`
- the live request data in `src/engine/field-requests.ts` still ends on `high-run`
- the cave and old-growth geometry already share one optional elevated bridge-to-trunk crossover

So the right next move is not inventing a fourth cave pocket or a second giant-tree branch. It is making that existing `high-run` feel like it actually carries somewhere.

## Recommendation

Treat `main-150` as one compact upper-carry pass across the current forest vertical family.

The target shape is:

1. recover from `stone-basin` through `filtered-return`
2. climb or step onto the current upper return
3. stay on a readable elevated carry through `log-run`
4. reach the fallen old-wood bridge as part of the same upper journey
5. hand directly into the existing giant-tree approach and `old-growth-main-trunk`

That would make the forest read more like one chapter-grade outing without touching the station shell or reopening the cave and canopy budgets that already landed well.

## Why This Is The Best Budget

### Option 1. Build one upper carry from cave-return into the giant-tree approach

What it is:

- strengthen the existing elevated route between `filtered-return`, `log-run`, `creek-bend`, the old-wood bridge, and the old-growth trunk entry

Pros:

- turns the strongest existing forest spaces into one journey instead of two destinations
- aligns with the already-shipped `high-run` expedition language
- stays inside lane 3 runtime and geometry rather than pulling on station or route-board logic
- reuses the already-good bridge and giant-tree approach instead of adding another isolated destination

Tradeoffs:

- needs careful platform spacing so it feels authored rather than like one more optional jump chain

Assessment:

- best option

### Option 2. Extend the expedition shell or route-board copy toward old growth

What it is:

- make the station or request layer explicitly point beyond `ROOT HOLLOW`

Pros:

- would make the outing feel more explicit

Tradeoffs:

- crosses into lane 1 shell work
- hides the real spatial problem instead of improving the forest runtime itself

Assessment:

- reject for this lane

### Option 3. Add another cave chamber or another canopy shelf

What it is:

- spend the packet on one more pocket inside either existing family

Pros:

- easy to feel “bigger”

Tradeoffs:

- repeats a budget the lane already spent well
- would deepen one side while leaving the middle travel seam flat

Assessment:

- reject

## Proposed Shape For `main-150`

### Geometry

- Stay in the current `filtered-return -> log-run -> creek-bend -> old-growth-pocket` band.
- Do not widen the forest farther right and do not deepen the cave farther down.
- Keep the current cave loop and the current crown-rest loop intact.
- Add one compact elevated carry on the left/middle side of the bridge family so the upper route does not dissolve back into ordinary floor travel before the giant tree.
- Prefer one or two small authored logs or shelves that:
  - begin from the current root-held/high-run exit side
  - hand into the existing `forest-layer-bridge-log`
  - preserve the existing `old-growth-crossover-limb` and `old-growth-main-trunk` approach

### Route Feel

The desired forest chapter should read more like:

1. lower hollow
2. trunk climb
3. root-held return
4. high run
5. old wood crossing
6. giant tree

That makes the old-growth side feel like the natural continuation of the forest vertical outing rather than a separate optional trick found later on the same map.

### Scope Boundary

- No new depth-feature style
- No `worldHeight` increase
- No second cue family or text signage
- No station, route-board, journal, or request-shell expansion
- No new old-growth top tier

If content support is needed at all, it should be one tiny reused bark- or old-wood carrier only after the geometry works. Most of the outing feel should come from the carry itself.

## Suggested Acceptance For `main-150`

- the forest vertical family now has one readable elevated carry from the cave-return side toward the giant-tree approach
- the player can reach the old-wood bridge and giant-tree entry as part of the same upper journey instead of dropping into a long flat reset
- the cave loop, bridge beat, and crown-rest loop all remain readable and recoverable at the current handheld frame
- the pass feels chapter-grade without adding a new shell or louder support language

## Test Suggestions

### Forest biome test

- extend the authored platform expectations with the new carry piece or pieces between the current high-run exit and the bridge family
- keep the assertions focused on order and height relationships rather than exact prose about chapter feel

### Runtime smoke

- start from the live forest cave-return route
- climb out through the current upper recovery
- continue right through the new elevated carry
- confirm the player reaches the bridge and gets the `old-growth-main-trunk` in range without the route collapsing into an awkward floor-only reset

### Browser proof

- capture one frame where the carry into the bridge and giant-tree entry reads as one visible continuation
- if possible, capture a second frame where the cave-return side and the first new carry beat still read as part of the same upper path

## Queue Guidance

- Close `ECO-20260402-scout-112`.
- Promote `ECO-20260402-main-150` to `READY`.
- Retarget `ECO-20260402-main-150` and `ECO-20260402-critic-123` to this handoff report as the immediate source of truth.
