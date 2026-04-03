# 2026-04-03 Forest Sub-Canopy Waypoint Review

Reviewed `ECO-20260402-critic-167` against packet `080`, the lane-3 brief, the scout handoff, the implementation report, the landed forest waypoint data in `src/content/biomes/forest.ts`, the focused forest proofs, and the fresh artifacts in `output/main-194-browser/`.

## Result

No blocking issue.

## What Landed Well

- The new cave-side `filtered-return-mouth-sill` spends the follow-on on a remembered observation pause, not on more route scaffolding. In the live browser frame, the mouth shelf still lets the basin darkness sit below the brighter exit side, so the recovery seam now reads more like habitat transition than pure pathing.
- Reusing `seep-moss-mat` at `filtered-return-mouth-moss` is the right restraint. It keeps the mouth band damp and cave-linked without inventing a louder new carrier or cluttering the narrow recovery strip.
- The canopy-side `canopy-inner-rest-crook` stays small enough to read as one tucked branch stop between the existing `old-growth-inner-loop-step` and `old-growth-canopy-ledge`. The state capture shows the inner-rest light, beard cluster, and nearby moss/lichen roster all reading together without implying a new upper branch.
- The focused runtime proofs are well aimed: one proves the cave shelf is a real settle point that still rejoins the exit carry, and the other proves the canopy crook is reachable from the current return path and still hands back to the inner bark seam.

## Watch Item

- If lane 3 spends the same upper old-growth band again, require a real browser frame for that canopy nook, not just another state capture. This pass is small enough that the deterministic proof is sufficient, but future crowding risk up there will show up visually before it shows up in route logic.

## Verification

- `npm test -- --run src/test/forest-biome.test.ts src/test/runtime-smoke.test.ts -t "adds one cave-mouth sill and one tucked canopy crook around the live waypoint cues|adds a tiny cave-mouth observation sill and keeps the exit carry clean|adds a tucked canopy crook around the inner-rest cue and keeps the return seam readable|adds a calmer upper-return nook so the cave family reads like a loop instead of a one-way corridor|turns the old-growth top route into a crown-rest destination loop and keeps the inner return seam catchable"`
- Reviewed `output/main-194-browser/cave-mouth-waypoint.png`
- Reviewed `output/main-194-browser/cave-mouth-waypoint-state.json`
- Reviewed `output/main-194-browser/canopy-crook-waypoint-state.json`
- Reviewed `output/main-194-browser/errors.json`

## Queue Recommendation

- Mark `ECO-20260402-critic-167` as `DONE`.
- Promote `ECO-20260403-scout-165` to `READY`.
