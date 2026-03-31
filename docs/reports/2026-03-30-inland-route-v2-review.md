# 2026-03-30 Inland Route V2 Review

## Verdict

One blocking follow-up is still needed before lane 4 should move on to the expedition-as-chapter handoff.

## Finding

### 1. `Short Season` still collapses into `snow-meadow`

- `src/engine/field-requests.ts:246` frames `tundra-short-season` as a thaw-edge `assemble-evidence` outing across `snow-meadow` and `thaw-skirt`, with `purple-saxifrage`, `cottongrass`, and `cloudberry` as the three required carriers.
- But `src/content/biomes/tundra.ts:186` and `src/content/biomes/tundra.ts:268` still place all three of those carriers in `snow-meadow`, so the beat can be completed without entering `thaw-skirt` at all.
- The supporting read surfaces still reinforce that older shape: `src/engine/observation-prompts.ts:175` keeps the `tundra-short-season` seed on `snow-meadow`, and `src/content/biomes/tundra.ts:377` keeps the `Short Summer Rush` note centered there too.

Why this matters:

- `scout-77` explicitly guarded against collapsing the inland pack back into one-zone checklist beats.
- `Stone Shelter` and `Low Fell` now create real place-to-place reads, but the middle tundra beat still behaves like the old inland count pass in live content layout.
- That keeps the inland second act from fully landing as the intended stress-and-exposure chapter.

## Clean Parts

- `treeline-stone-shelter` now uses live `krummholz-belt -> dwarf-shrub` structure cleanly.
- `treeline-low-fell` now works as a real exposure capstone without moving off `edge-pattern-line`.
- The route-board copy is clearer and more game-like, and no science or tone regression stood out in the implementation pass.

## Recommendation

Add one small lane-4 follow-up before promoting `scout-78`:

1. make `tundra-short-season` require a real thaw-edge move in live content, not only in request copy
2. align the supporting prompt and/or note so the middle beat teaches the same thaw-edge read the route board now promises
3. keep the fix narrow and avoid widening Route v2 runtime again
