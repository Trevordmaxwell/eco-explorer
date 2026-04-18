# High Pass Relationship Pack Handoff

Prepared `ECO-20260418-scout-312` in lane 2.

## Read

- `High Pass` is now a live Treeline Pass chapter with a clean clue chain:
  - `stone-lift` -> `frost-heave-boulder`
  - `lee-watch` -> `hoary-marmot`
  - `rime-mark` -> `moss-campion`, with `reindeer-lichen` already approved as the process-window alternate during `frost-rime`
  - `talus-hold` -> `talus-cushion-pocket`
- Sprint 3 already spent the chapter-facing close-look budget well:
  - `hoary-marmot` now covers shelter rock + lookout body
  - `dwarf-birch` now covers low woody survival above the last trees
- Treeline already has good general treeline notes:
  - `Stone Shelter`
  - `Low Ground Wins`
  - `Cold Ground Works`
  - `Talus Islands`
- What is still thinner is the chapter-specific relationship teaching for the live `High Pass` middle:
  - the route already asks the player to read `rime-mark` and `talus-hold`
  - the biome already has a `frost-rime` process
  - but the chapter still lacks one compact note that explains how wind and rime favor the lowest life while tiny rock pockets still give it somewhere to hold on

## Recommendation

Treat `main-312` as one compact `rime + foothold` note pass inside `Treeline Pass`, not as another close-look sweep.

Best shape:

1. add one new `lichen-fell` ecosystem note centered on:
   - `moss-campion`
   - `reindeer-lichen`
   - `talus-cushion-pocket`
2. let that note carry the chapter's relationship teaching:
   - exposure and rime reach the open fell
   - the lowest mats and lichens handle that exposure best
   - tiny sheltered rock pockets still give life a foothold
3. prove the note through the live `High Pass` route family in focused note/runtime tests

## Why This Shape

- It spends the pass exactly where the active chapter is pointing: the `rime-mark` plus `talus-hold` seam.
- It keeps the learning loop relationship-first instead of making the new marmot or birch cards longer.
- It uses already-live route carriers and the already-live `frost-rime` process instead of opening another comparison branch, atlas pass, or broader alpine pack.
- It makes `High Pass` feel more distinct from generic treeline by teaching how exposed ground still supports life, not just where clues happen to sit.

## Exact Main Direction

Prefer one new ecosystem note in [treeline.ts](/Users/trevormaxwell/Desktop/game/src/content/biomes/treeline.ts), with no new atlas or shell work.

Recommended target:

- note title direction:
  - `Rime Footholds`
  - or another equally short title that keeps the idea on exposure plus foothold
- entry family:
  - `moss-campion`
  - `reindeer-lichen`
  - `talus-cushion-pocket`
- safest summary direction:
  - on exposed High Pass ground, wind and rime favor the lowest mats and lichens, while small rock pockets still give them a place to hold
- safest observation prompt direction:
  - `What here still holds on where rime reaches first?`
  - or a near-equivalent question about foothold after wind and rime
- zone target:
  - `lichen-fell`
- discovery threshold:
  - keep it compact, likely two linked discoveries, so the note can actually surface during the live High Pass route without demanding a broader content sweep

## Suggested File Targets

- `src/content/biomes/treeline.ts`
- `src/test/ecosystem-notes.test.ts`
- `src/test/runtime-smoke.test.ts`

Only touch [observation-prompts.ts](/Users/trevormaxwell/Desktop/game/src/engine/observation-prompts.ts) if the existing ecosystem-note fallback cannot surface the note cleanly enough in the live chapter flow.

## Explicit Non-Targets

- do not make the existing `hoary-marmot` or `dwarf-birch` close-look cards denser
- do not add another comparison allowlist entry
- do not widen the atlas, journal shell, or station copy
- do not reopen a broader alpine or tundra richness wave

## Suggested Verification

- `npm test -- --run src/test/ecosystem-notes.test.ts`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "High Pass|rime|foothold|ecosystem note"`
- `npm run build`

## Queue Outcome

- Close `ECO-20260418-scout-312`.
- Promote `ECO-20260418-main-312` to `READY`.
- Retarget `ECO-20260418-main-312` and `ECO-20260418-critic-312` to this handoff.
