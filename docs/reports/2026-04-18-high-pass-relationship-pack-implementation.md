# High Pass Relationship Pack Implementation

## Queue Ref

- `ECO-20260418-main-312`

## What Landed

The Sprint 4 lane-2 High Pass pass stayed compact and relationship-first:

- [treeline.ts](/Users/trevormaxwell/Desktop/game/src/content/biomes/treeline.ts) now adds one new `lichen-fell` ecosystem note:
  - `Rime Footholds`
  - carried by `moss-campion`, `reindeer-lichen`, and `talus-cushion-pocket`
- [observation-prompts.ts](/Users/trevormaxwell/Desktop/game/src/engine/observation-prompts.ts) now adds one tiny chapter-specific prompt seed:
  - `treeline-rime-footholds`
  - this was needed because the older generic treeline wind prompt was still winning in the live High Pass pocket before the new chapter note could surface clearly
- [ecosystem-notes.test.ts](/Users/trevormaxwell/Desktop/game/src/test/ecosystem-notes.test.ts), [observation-prompts.test.ts](/Users/trevormaxwell/Desktop/game/src/test/observation-prompts.test.ts), and [runtime-smoke.test.ts](/Users/trevormaxwell/Desktop/game/src/test/runtime-smoke.test.ts) now prove the note and prompt through the live open-fell High Pass seam

## Why This Helps

- High Pass now teaches one clearer chapter-specific relationship instead of only listing carriers:
  - exposed fell gets hit by wind and rime first
  - the lowest mats and lichens can still hold there
  - tiny talus pockets give that life a foothold
- The pass stays inside current handheld-safe surfaces:
  - one new ecosystem note
  - one tiny prompt seed
  - no wider atlas, journal shell, comparison branch, or close-look stack
- The new teaching seam sits exactly on the live `rime-mark` plus `talus-hold` route family, so the chapter feels more like its own place rather than generic treeline.

## Verification

- `npm test -- --run src/test/ecosystem-notes.test.ts src/test/observation-prompts.test.ts`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "High Pass rime|rime-footing|rime-footholds"`
- `npm run build`
