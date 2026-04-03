# 2026-04-03 Beach Route V2 Handoff

Scout handoff for `ECO-20260403-scout-157`.

## Scope

Prepare one beach-first Route v2 implementation slice that gives the front half a real purpose-driven outing through the live beach spaces and existing notebook-return seam, without adding a new route type, station page, or support shell.

## Best Target

Add one starter beach transect route that walks:

1. `dune-edge`
2. `lee-pocket`
3. `tide-line`

Recommended request shape:

- `id: beach-shore-shelter`
- `title: Shore Shelter`
- `type: transect-evidence`

Recommended stages:

1. `dune-grass`
   - `label: Dune-grass clue`
   - `entryIds: ['beach-grass']`
   - `zoneId: 'dune-edge'`
2. `lee-cover`
   - `label: Lee-cover clue`
   - `entryIds: ['driftwood-log']`
   - `zoneId: 'lee-pocket'`
3. `wrack-line`
   - `label: Wrack-line clue`
   - `entryIds: ['bull-kelp-wrack']`
   - `zoneId: 'tide-line'`

Recommended route copy:

- summary:
  - `On Sunny Beach, log dune-grass, then lee-cover, then wrack-line from dune edge to tide line.`
- ready text:
  - `Return to the field station and file the Shore Shelter note.`
- filed text:
  - `Beach grass, driftwood, and bull kelp wrack mark how shelter grows from dune edge to tide line.`
- clue-backed tail:
  - `mark how shelter grows from dune edge to tide line.`

## Why This Is The Best Next Move

This is the highest-leverage beach route now because:

- beach is still the player start and the only front-half biome without a dedicated notebook outing, so the early loop still opens with less purpose than the inland half
- the walk already exists in the shipped runtime: dune plants are stable at the left start, the lee pocket is now a readable middle waypoint with driftwood, and the tide line already carries wrack
- `transect-evidence` is the cleanest seam for this path because it can reuse the live first-missing-stage guidance in `getHandLensNotebookFit()` and `formatProgressLabel()` instead of inventing another tutorial or marker layer
- the route uses stable, visible evidence already present in `src/content/biomes/beach.ts`, so lane 4 can deepen the loop without asking lane 2 for a content pack or lane 3 for new terrain

## Why The Alternatives Are Weaker

### Landmark-only lee-pocket route

This would be too small for the first beach outing:

- `driftwood-log` is a good middle waypoint, but building the whole route around one landmark would feel closer to the old forest pilot than to the stronger route ladder now live elsewhere
- it would not make the player read the beach as a changing shoreline from dune shelter to wrack line

### Tidepool or surf-focused route

This is the wrong first slice:

- the packet explicitly wants the current front-half spaces, and the best live path is dune -> lee pocket -> tide line
- tidepool-heavy routing would pull the outing farther right than the beach currently teaches clearly
- it would also overlap more with future beach density work in lane 2 than this smaller shelter-reading walk

### Converting `coastal-shelter-shift` first

That is a later-wave front-half transition task, not the right first beach gain:

- it still leaves the actual starting biome without a dedicated Route v2 outing
- lane 1 is already spending effort to bring beach onto the season board, so lane 4 gets more leverage by giving that beach beat real notebook structure instead of deepening scrub first

## Best Main-Agent Slice For `main-195`

1. After `ECO-20260402-critic-151` lands, build on the beach beat that lane 1 added to the season board instead of adding a second parallel beach request.
2. In `src/engine/field-requests.ts`, add `beach-shore-shelter` as the first active Route v2 outing:
   - keep it on `transect-evidence`
   - use the three zones and three existing carriers above
   - gate `forest-hidden-hollow` behind it so the opening active outing finally matches the starting biome
3. Reuse the current beach content first:
   - `beach-grass` at `dune-edge`
   - `driftwood-log` at `lee-pocket`
   - `bull-kelp-wrack` at `tide-line`
   - only touch `src/content/biomes/beach.ts` if the tide-line wrack placement needs one tiny stable authored backup for deterministic tests
4. Keep filing and support polish out of this step:
   - no special display prefix yet
   - no new `place-tab` wording yet
   - no support-row or station-shell growth
5. Add focused regressions:
   - `src/test/field-requests.test.ts`
     - add a `createBeachContext()` helper
     - assert the first active request now starts on beach
     - assert travel-facing labels point back to `Sunny Beach` from other biomes until the route is done
     - lock the transect stage order and notebook-fit gating
     - assert filing returns `beach-shore-shelter`
   - `src/test/runtime-smoke.test.ts`
     - drive one seeded beach run from start -> dune grass -> lee pocket driftwood -> tide-line wrack
     - assert the route becomes notebook-ready and can be filed at the field station
   - touch `src/test/field-season-board.test.ts` only if lane-1's new beach beat needs route-title or detail alignment after the conversion

## Why This Route Shape Is Best

The beach needs a walk the player can feel in motion, not just a three-clue pile.

Using `transect-evidence` does three useful things at once:

- it keeps the outing notebook-first and compact
- it lets the hand lens teach only the next readable stage without another tutorial surface
- it turns the live dune -> lee pocket -> wrack path into a calm mini-adventure the player can remember after one trip

## Expected File Touches

- `src/engine/field-requests.ts`
- `src/test/field-requests.test.ts`
- `src/test/runtime-smoke.test.ts`
- `src/engine/field-season-board.ts` only if the landed lane-1 beach beat needs matching route wording
- `src/test/field-season-board.test.ts` only if that board wording changes
- `src/content/biomes/beach.ts` only if one tiny stable wrack placement is needed for deterministic proof

## Guardrails

- do not add a second beach request beside the lane-1 beach beat; convert or extend that beat in place
- do not add a new station page, recap overlay, or route ledger
- do not widen the support row or spend the beach filing polish in this step
- keep the outing calm and readable at `256x160`
- keep the route grounded in already-shipped beach spaces and observable evidence

## Queue Guidance

- close `ECO-20260403-scout-157` with this report
- bump packet `081` to version `2`
- retarget `ECO-20260403-main-195` and `ECO-20260403-critic-168` to this handoff
- leave `ECO-20260403-main-195` blocked behind `ECO-20260402-critic-151`
