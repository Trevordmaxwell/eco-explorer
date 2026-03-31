# 2026-03-31 Root Hollow Legacy Normalization Review

Review for `ECO-20260331-critic-04` covering `ECO-20260331-main-04`.

## Result

One blocking issue remains.

## Blocking Issue

### `ROOT HOLLOW` still leaves the shared field-request copy guardrail red

`main-04` fixes the legacy save-recovery gap cleanly: older in-progress `forest-expedition-upper-run` saves now normalize back into the truthful four-leg chapter shape before the expedition, atlas, route-board, or filing seams read them. Focused save, request, and station coverage all pass.

The remaining problem is smaller but still blocking for pre-playthrough readiness: the live `forest-expedition-upper-run` request summary in [src/engine/field-requests.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-requests.ts#L387) now reads at 101 characters, which breaks the shared compact notebook guardrail in [src/test/content-quality.test.ts](/Users/trevormaxwell/Desktop/game/src/test/content-quality.test.ts#L68). The current failing text is:

- `In Root Hollow, log seep-mark, stone-pocket, root-held, and high-run clues before filing the chapter.`

That exceeds the repo-wide 96-character budget for field-request summaries, so `npx vitest run src/test/content-quality.test.ts` is still red on `main`. Several other lanes have already had to carry that caveat in their own completion notes, which means lane 4 cannot stand down yet even though the save normalization itself is sound.

## Recommended Next Step

Do one tiny lane-4 copy pass:

1. trim the `forest-expedition-upper-run` summary back under 96 characters
2. keep it one sentence and still truthful to the four-leg `seep-mark -> stone-pocket -> root-held -> high-run` chapter
3. rerun `src/test/content-quality.test.ts` plus the focused lane-4 request coverage

This should stay a copy-only cleanup, not another Route v2 system change.
