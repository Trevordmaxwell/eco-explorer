# 2026-04-03 Field Station State Split Review

Reviewed `ECO-20260403-critic-226` against packet `096`.

## Findings

### Blocking

1. The new helper dropped outing-support normalization and can now surface locked support ids again.

`src/engine/field-station-state.ts` now reads `save.selectedOutingSupportId` directly at [field-station-state.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-station-state.ts#L79), but the previous station path normalized that value through [save.ts](/Users/trevormaxwell/Desktop/game/src/engine/save.ts#L468) so old or partially unlocked saves could not render `place-tab` or `route-marker` while those supports were still unavailable. Because the extracted helper feeds both the field-station overlay state and `render_game_to_text()`, this is a behavior regression against packet `096`'s save-stability guardrail.

## Recommendation

Add one narrow follow-up before `scout-227`:

- restore `resolveSelectedOutingSupportId(save)` inside the new helper
- add one focused regression proving the field-station state falls back to `hand-lens` when a save still carries a locked support id
