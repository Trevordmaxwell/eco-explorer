# 2026-04-02 Note-Tabs Chapter-Close Handoff

Scout handoff for `ECO-20260402-scout-139`.

## Scope

Prepare one compact lane-4 follow-on that makes the completed `edge-pattern-line` return page feel more like the close of a chapter without widening the station shell or spending more words on the already-long filed sentence.

## Best Next Seam

Use `note-tabs` only on the completed `edge-pattern-line` return page.

That is the best next move because:

- lane 4 already owns the notebook-return seam, and `note-tabs` is the existing support that turns route filing into a page-like payoff
- lane 2 already spent the atlas seam on one compact filed-memory prefix, so another atlas change would blur lane ownership and duplicate recap
- lane 1 already stabilized the generic `ROUTE LOGGED` stop cue as the calm all-support pause seam, so changing that line for every support would fight the newer stop-point rhythm work
- the critic pass on `main-176` flagged strip-budget growth as the main watch item, so the safest next gain is a short chapter-close line that appears only when the player has deliberately kept `note-tabs` selected

## Best Main-Agent Slice For `main-177`

1. Keep the existing generic `ROUTE LOGGED` stop cue for `hand-lens`, `place-tab`, and `route-marker`.
2. In `src/engine/field-season-board.ts`, add one note-tabs-only complete-route wrap for `edge-pattern-line` when:
   - the route is complete
   - no archive strip is active
   - the summary is still the pre-expedition `Edge line logged.` state
3. Give that note-tabs wrap a chapter-close label such as `EDGE LINE LOGGED` and one short authored line that feels like the notebook page closing over Low Fell while softly pointing toward Root Hollow.
4. Keep that new line clearly shorter than the current Low Fell filed sentence; treat the `critic-149` strip-budget watch item as a hard guardrail.
5. Leave all later states unchanged:
   - `ROOT HOLLOW` ready
   - `ROOT HOLLOW` active
   - `Season Threads`
   - `SEASON ARCHIVE`
6. Add focused regressions in:
   - `src/test/field-season-board.test.ts`
   - `src/test/runtime-smoke.test.ts`

## Why The Other Options Are Weaker

### Atlas note follow-on

This is the wrong seam now:

- lane 2 already deepened the atlas note family in `main-172`
- another atlas pass would mostly duplicate recap the routes page already carries
- it would not reward the player for choosing the notebook-first support

### Generic `ROUTE LOGGED` rewrite for all supports

This is riskier than it looks:

- lane 1 just tuned that strip into a calm stopping-point seam
- rewriting it for every support would spend shared pacing budget on one route family
- the gain is better spent on the notebook-specific seam that already owns authored filing payoff

## Guardrails

- do not add a new panel, card, or archive row
- do not widen the support row or add another support type
- do not spend the follow-on on the atlas line
- do not touch expedition, season-close, or High Pass states
- keep the chapter-close line compact at `256x160`

## Expected File Touches

- `src/engine/field-season-board.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`

## Queue Guidance

- close `ECO-20260402-scout-139` with this report
- bump packet `067` to version `3`
- retarget `ECO-20260402-main-177` and `ECO-20260402-critic-150` to this report
- promote `ECO-20260402-main-177` to `READY`
