# 2026-04-03 Wrack Shelter Replay Review

Reviewed `ECO-20260403-critic-171`.

## Result

No blocking findings.

The `Wrack Shelter` follow-on stays inside the approved lane-4 seam:

- it reuses the existing `processFocus` route-variant pattern instead of inventing a second replay system
- it keeps the opening beach route's canonical filing identity stable as `Shore Shelter`
- it aligns the active request, replay note, and season wrap around one compact replay sentence instead of growing new route-board chrome

## Residual Watch

- The opening beach beat still starts under the guided `NOTEBOOK TASK` prompt on a fresh title resume, so the replay notice shows up on the supported re-entry path rather than replacing that starter prompt. That matches the current global notice-priority rule, but future beach replay proofs should keep using a post-guided or re-entry flow unless the guided-notice priority is intentionally revisited.

## Verification

- `npx vitest run src/test/field-requests.test.ts src/test/field-season-board.test.ts`
- `npx vitest run src/test/runtime-smoke.test.ts -t "Wrack Shelter|Thaw Window|Moist Edge|route replay note"`
