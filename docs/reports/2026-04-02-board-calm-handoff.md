# 2026-04-02 Board Calm Handoff

## Scope

Complete `ECO-20260402-scout-117` and narrow `ECO-20260402-main-155` to one compact board-calm follow-on inside the current lane-1 station shell.

## Summary

The routes-first season shell is already structurally correct.

What remains is not another new cue, page, or strip. It is one crowded line on the existing `HIGH PASS / NEXT` card.

Across the earlier season-two review and the fresh high-country approach review, the same seam keeps showing up:

- subtitle is good
- archive strip is good
- atlas note is good
- expedition page is good
- the `HIGH PASS` launch-card detail line is now the first thing pushing against the handheld ceiling

`main-155` should calm the board by making that live card do slightly less, not by teaching more.

## Findings

### 1. The routes shell already has enough chapter framing

The current filed `High Pass` routes state now layers four distinct signals:

- subtitle: `High Pass starts at Treeline Pass.`
- archive strip: `Root Hollow now leads to High Pass.`
- launch card summary: `Treeline Pass opens the next field season.`
- atlas note: `Next: take the High Pass from Treeline Pass.`

That is already enough to tell the player where the next chapter begins and what to do.

The extra launch-card detail line:

- `Match last tree shape, then low wood, then fell bloom.`

is the least necessary piece in that stack.

### 2. The launch-card detail line is the real crowding source

Two separate lane-1 reviews now point at the same problem:

- [2026-04-02-season-two-shell-review.md](/Users/trevormaxwell/Desktop/game/docs/reports/2026-04-02-season-two-shell-review.md)
- [2026-04-02-high-country-approach-review.md](/Users/trevormaxwell/Desktop/game/docs/reports/2026-04-02-high-country-approach-review.md)

The seeded browser proof in [routes-shell.png](/Users/trevormaxwell/Desktop/game/output/lane-1-critic-127-browser/routes-shell.png) confirms it visually: the card still fits, but the detail line is the first element that starts feeling squeezed and redundant.

That makes it the best target for a board-calm pass because removing it reduces density without weakening the shell.

### 3. The calmer move is to let the atlas own the action line

Recommended shape for `main-155`:

1. Keep the filed-season subtitle, archive strip, and atlas note exactly as they are.
2. Keep the `HIGH PASS / NEXT` launch card and its one summary line.
3. Stop spending a second card line on the launch-card detail when the filed-season shell is already showing the atlas note below.
4. Update the routes-page renderer so the card stays visually intentional when that detail line is absent.

This is the smallest change that makes the board calmer and more confident without drifting toward a planner or removing orientation.

## Recommended Implementation Shape

- Update the filed `High Pass` launch-card seam in [field-season-board.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-season-board.ts) so the extra detail line can be omitted for this state.
- Update [overlay-render.ts](/Users/trevormaxwell/Desktop/game/src/engine/overlay-render.ts) so routes-page launch cards render cleanly when that second line is missing.
- Keep the action sentence in the existing atlas row instead of moving it to a new strip or support state.
- Leave expedition, map, and journal behavior unchanged.

## Keep Out Of Scope

Leave these out of `main-155`:

- rewriting the subtitle again
- changing the archive strip wording
- changing the expedition subtitle or footer
- changing the atlas note
- adding a recap row, planner strip, or extra support panel
- changing world-map footer or walking labels

## Recommended File Targets

- [field-season-board.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-season-board.ts)
- [overlay-render.ts](/Users/trevormaxwell/Desktop/game/src/engine/overlay-render.ts)
- [field-season-board.test.ts](/Users/trevormaxwell/Desktop/game/src/test/field-season-board.test.ts)
- [runtime-smoke.test.ts](/Users/trevormaxwell/Desktop/game/src/test/runtime-smoke.test.ts)

## Verification For `main-155`

- update the filed-season launch-card expectation so the extra detail line is absent
- keep the subtitle, archive strip, atlas note, expedition footer, and world-map `High Pass` cues unchanged
- run the focused lane-1 board/season `vitest` slice plus `npm run build`
- run the shared web-game client after the runtime change
- capture one seeded routes-shell browser proof to confirm the card feels calmer at `256x160`

## Queue Guidance

- close `ECO-20260402-scout-117`
- promote `ECO-20260402-main-155` to `READY`
- keep `ECO-20260402-critic-128` blocked until the implementation lands
