# 2026-04-02 High Country Approach Handoff

## Scope

Complete `ECO-20260402-scout-116` and narrow `ECO-20260402-main-154` to one compact lane-1 approach pass.

## Summary

The remaining lane-1 gain is not another travel system layer.

The live map, routes shell, and expedition footer already prove the chapter exists:

- forest departure now reads `Last woods before High Pass.`
- the focused map still keeps `Today: High Pass` plus `FROM FOREST TRAIL`
- the walking label stays the tiny ceiling `HIGH PASS`
- the expedition footer already says `High Pass waits beyond Root Hollow.`

The gap is that the season-facing copy still splits between a strong chapter feeling and a more generic "next outing" voice. `main-154` should tighten that shared approach wording without reopening the launch card, atlas row, or map HUD.

## Findings

### 1. The visible map and expedition seams are already the right size

Live browser review against the filed-season seed stayed clean:

- [high-pass-map-focus.png](/Users/trevormaxwell/Desktop/game/output/lane-1-scout-116-browser/high-pass-map-focus.png)
- [routes-shell.png](/Users/trevormaxwell/Desktop/game/output/lane-1-scout-116-browser/routes-shell.png)
- [expedition-page.png](/Users/trevormaxwell/Desktop/game/output/lane-1-scout-116-browser/expedition-page.png)

The map already feels staged enough through:

- `Last woods before High Pass.`
- `Today: High Pass`
- `FROM FOREST TRAIL`
- `HIGH PASS`

The expedition page is also structurally correct now:

- subtitle: `High Pass opens the next field season.`
- one logged `ROOT HOLLOW` card
- one tiny footer strip: `High Pass waits beyond Root Hollow.`

That means `main-154` should not spend budget on another map label, another expedition strip, or another launch affordance.

### 2. The routes shell is where the remaining approach drift shows up

The routes page is readable, but it still mixes two voices:

- calm archive and subtitle framing
- imperative outing language through the atlas note and launch-card body

The page already sits close to the handheld density ceiling, so the fix should not be "say more." It should be "make the carried-forward approach wording more settled."

The clearest seam is the shared season-facing phrase family around:

- the routes subtitle
- the calm next-season note state
- the existing continuity helper that already feeds the archive-and-expedition follow-through

### 3. `main-154` should spend its budget on one shared approach-copy helper

Recommended implementation shape:

1. Add one small high-country approach helper in [field-season-board.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-season-board.ts) for the filed-season `High Pass` state.
2. Use it to make the routes-facing subtitle feel more like a staged regional approach than a generic next outing.
3. Reuse that same phrasing in the guided next-season note in [guided-field-season.ts](/Users/trevormaxwell/Desktop/game/src/engine/guided-field-season.ts) so the station state and the routes opener stop sounding like separate systems.
4. Keep the existing map ceiling and expedition-footer ceiling intact.

Good target energy:

- `High Pass begins at Treeline Pass.`
- `High Pass begins at Treeline Pass when you are ready.`

Exact wording can change, but it should stay:

- shorter than the current launch-card detail line
- calmer than the atlas `Next:` sentence
- more place-staged than a generic "opens next" sentence

## Keep Out Of Scope

Leave these for `scout-117` / `main-155`:

- changing the `HIGH PASS / NEXT` launch card body
- rewriting the atlas note
- adding another row, page, or support strip
- changing the `Today: High Pass` or `FROM FOREST TRAIL` map structure
- expanding the expedition page beyond its current subtitle-plus-footer shape

`main-154` should make the chapter feel more deliberately approached, not calm the whole board yet.

## Recommended File Targets

- [field-season-board.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-season-board.ts)
- [guided-field-season.ts](/Users/trevormaxwell/Desktop/game/src/engine/guided-field-season.ts)
- [field-season-board.test.ts](/Users/trevormaxwell/Desktop/game/src/test/field-season-board.test.ts)
- [guided-field-season.test.ts](/Users/trevormaxwell/Desktop/game/src/test/guided-field-season.test.ts)
- [runtime-smoke.test.ts](/Users/trevormaxwell/Desktop/game/src/test/runtime-smoke.test.ts)

## Verification For `main-154`

- update focused expectations for the filed-season routes subtitle and next-season note
- keep the existing `High Pass` expedition footer expectation unchanged
- keep the existing world-map `Today: High Pass` plus `FROM FOREST TRAIL` expectation unchanged
- run the targeted lane-1 test slice plus `npm run build`
- capture one seeded routes-shell browser proof to confirm the subtitle still fits at `256x160`

## Queue Guidance

- close `ECO-20260402-scout-116`
- promote `ECO-20260402-main-154` to `READY`
- keep `ECO-20260402-critic-127` blocked until the implementation lands
