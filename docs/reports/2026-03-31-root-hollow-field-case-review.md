# 2026-03-31 Root Hollow Field-Case Review

Review for `ECO-20260331-critic-03` covering `ECO-20260331-main-03`.

## Result

One blocking issue.

## Blocking Issue

### Legacy in-progress `ROOT HOLLOW` saves no longer map truthfully to the new four-leg chapter

`main-03` correctly changes the live expedition definition to `seep-mark -> stone-pocket -> root-held -> high-run` in [src/engine/field-requests.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-requests.ts#L384), and the station copy in [src/engine/field-season-board.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-season-board.ts#L935) now assumes that exact four-step prefix.

The problem is that the implementation does not normalize or migrate older `forest-expedition-upper-run` progress that was created under the earlier three-step chapter. For legacy saves, the expedition card, route-board text, and atlas note now infer stage from raw `evidenceSlots.length`, even though old progress can still contain the older slot set with no `stone-pocket` entry. That creates two truth gaps:

- a legacy active save with `seep-mark` + `root-held` will now read as if the stone-pocket leg is already logged even though it is still the next missing slot
- a legacy `ready-to-synthesize` save can still file immediately through [src/engine/field-requests.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-requests.ts#L967) without ever touching the new middle leg, while the expedition copy claims the four-step chapter is complete

This matters because the earlier expedition handoff explicitly called for partially progressed legacy saves to fall back cleanly instead of drifting into false copy or broken recovery. As written, the new chapter is solid for fresh playthroughs but not for players loading an older in-progress `ROOT HOLLOW` save on `main`.

## Recommended Next Step

Add one compact legacy-progress normalization pass for `forest-expedition-upper-run`.

The simplest safe fix is:

1. detect old three-slot `ROOT HOLLOW` progress that lacks `stone-pocket`
2. normalize it to a truthful four-leg state before expedition, route-board, atlas, or filing code reads it
3. add tests for both legacy gathering and legacy notebook-ready save shapes

That keeps the new middle leg, protects save recoverability, and preserves the pre-playthrough goal of truthful station copy.
