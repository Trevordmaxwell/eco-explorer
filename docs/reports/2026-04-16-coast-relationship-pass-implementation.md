# Coast Relationship Pass Implementation

## Queue Ref

- `ECO-20260416-main-304`

## What Landed

The Sprint 2 lane-2 coast pass stayed compact and relationship-first:

- [beach.ts](/Users/trevormaxwell/Desktop/game/src/content/biomes/beach.ts) now retunes the late-beach `wave-edge-survivors` ecosystem note around the wrack chain, with `bull-kelp-wrack`, `beach-hopper`, and `pacific-sand-crab` as the discovery pairings that unlock the note.
- [observation-prompts.ts](/Users/trevormaxwell/Desktop/game/src/engine/observation-prompts.ts) reuses the existing `beach-tide-line-cover` seed so the notebook prompt asks what in the wrack gets eaten before birds arrive, instead of widening the shell with another prompt family.
- [ecosystem-notes.test.ts](/Users/trevormaxwell/Desktop/game/src/test/ecosystem-notes.test.ts), [observation-prompts.test.ts](/Users/trevormaxwell/Desktop/game/src/test/observation-prompts.test.ts), and [runtime-smoke.test.ts](/Users/trevormaxwell/Desktop/game/src/test/runtime-smoke.test.ts) now lock the note unlock path and the late-beach prompt behavior together.

## Why This Helps

- The coast branch now teaches one simple ecological relationship instead of adding another list of isolated facts:
  - wrack settles on the tide line
  - tiny scavengers and small beach animals feed there first
  - birds remain the visible follow-up without becoming the whole lesson
- The pass stays inside existing lane-2 teaching surfaces, so the player gets a stronger idea of connection without any new journal layout, comparison mode, or close-look card.
- Because the prompt is still evidence-keyed to the tide-line seed, the relationship can surface through the same late-beach revisit rhythm that is already in the game.

## Test Coverage

Focused verification for this pass:

- `npm test -- --run src/test/ecosystem-notes.test.ts src/test/observation-prompts.test.ts`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "wrack|food line|tide line prompt"`

Note:

- `npm run build` is still blocked by the existing unrelated `supportBiasActive` TypeScript drift in [field-request-controller.test.ts](/Users/trevormaxwell/Desktop/game/src/test/field-request-controller.test.ts); this lane-2 pass does not touch that lane-4 test surface.
