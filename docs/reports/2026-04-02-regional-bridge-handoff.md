# 2026-04-02 Regional Bridge Handoff

## Scope

Complete `ECO-20260402-scout-132` and narrow `ECO-20260402-main-170` to one compact lane-1 regional-bridge pass.

## Summary

The next lane-1 gain is not another travel widget or another expedition teaser.

The map already shows the carried-forward regional handoff clearly:

- focused target: `TREELINE PASS`
- footer: `Today: High Pass`
- origin: `FROM FOREST TRAIL`
- forest-side warmth: `Last woods before High Pass.`

The expedition page is also already at the right soft ceiling for now:

- subtitle: `High Pass opens the next field season.`
- one logged `ROOT HOLLOW` card
- one compact footer strip: `High Pass waits beyond Root Hollow.`

What still feels slightly split is the bridge between the broader regional journey and the live next outing on the calmer season-facing surfaces:

- the routes launch card says `Treeline Pass opens the next field season.`
- the journal outing card still says `Treeline Pass opens next. Follow last tree shape, then low wood, then fell bloom.`

Both are readable, but they still sound like different systems. `main-170` should tighten that into one small shared regional-bridge phrase without reopening the expedition shell or the map structure.

## Findings

### 1. The map should stay the ceiling

The existing travel-facing cues are already the clearest regional bridge in the game:

- [high-pass-map.png](/Users/trevormaxwell/Desktop/game/output/lane-1-main-138-browser/high-pass-map.png)
- `Today: High Pass`
- `FROM FOREST TRAIL`
- `Last woods before High Pass.`

That means `main-170` should not add another map banner, another footer row, or another travel label. The map should remain the strongest version of this handoff.

### 2. The expedition page should stay untouched for `main-170`

The logged expedition page already does one calm future-facing job well:

- [expedition-approach.png](/Users/trevormaxwell/Desktop/game/output/lane-1-main-147-browser/expedition-approach.png)
- subtitle: `High Pass opens the next field season.`
- footer: `High Pass waits beyond Root Hollow.`

Packet `064` already reserves a later `scout-133 -> main-171` step for the small next-expedition follow-on. Spending that footer budget now would collapse the distinction between the regional bridge pass and the later expedition-only pass.

### 3. The remaining drift is in the routes-and-journal phrasing family

The current filed-season routes page and journal card are both functional, but they still speak in different tones:

- routes launch-card summary in [routes-shell-calm.png](/Users/trevormaxwell/Desktop/game/output/lane-1-main-155-browser/routes-shell-calm.png): `Treeline Pass opens the next field season.`
- journal bottom-card summary in [journal-route-card.png](/Users/trevormaxwell/Desktop/game/output/lane-1-main-124-browser/journal-route-card.png): `Treeline Pass opens next. Follow last tree shape, then low wood, then fell bloom.`

The routes shell is staging a chapter. The journal card is still phrased like a procedural reminder. That is the smallest live seam where the broader regional journey can feel more intentionally linked without adding another surface.

## Recommended `main-170` Pass

Keep `main-170` to one shared regional-bridge copy helper in [field-season-board.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-season-board.ts).

Use it only on:

1. the filed-season `HIGH PASS` launch-card summary
2. the derived journal outing-card summary from `resolveSeasonOutingLocator()`

Keep these unchanged:

- the routes subtitle
- the archive strip
- the atlas note
- the expedition footer
- the world-map `Today: High Pass` / `FROM FOREST TRAIL` structure

## Good Target Shape

Aim for one short bridge line with place-led energy, for example:

- `Treeline Pass carries the season toward High Pass.`

The exact wording can move, but it should stay:

- shorter than the old journal procedural line
- calmer than the atlas `Next:` sentence
- clearly more regional and chapter-linked than a generic `opens next`

The routes page can let the atlas keep the explicit action, while the journal card becomes a calmer "where this journey is heading" reminder instead of a second checklist.

## Keep Out Of Scope

Leave these for later queue items:

- changing the expedition teaser or opening another expedition card early
- widening the routes shell with another strip or support row
- changing the map footer or adding another map summary line
- turning the journal card into a route planner

## Recommended File Targets

- [field-season-board.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-season-board.ts)
- [field-season-board.test.ts](/Users/trevormaxwell/Desktop/game/src/test/field-season-board.test.ts)
- [runtime-smoke.test.ts](/Users/trevormaxwell/Desktop/game/src/test/runtime-smoke.test.ts)

## Verification For `main-170`

- add focused `field-season-board` coverage for the shared filed-season bridge line on:
  - `resolveSeasonOutingLocator(save).summary`
  - the filed `HIGH PASS` launch-card summary
- add one `runtime-smoke` expectation that the journal bottom card uses the same bridge line in the filed-season opener state
- keep existing expectations unchanged for:
  - `High Pass starts at Treeline Pass.`
  - `Root Hollow now leads to High Pass.`
  - `Next: take the High Pass from Treeline Pass.`
  - `High Pass waits beyond Root Hollow.`
  - `Today: High Pass`
  - `FROM FOREST TRAIL`
- run the focused lane-1 test slice plus `npm run build`

## Queue Guidance

- close `ECO-20260402-scout-132`
- promote `ECO-20260402-main-170` to `READY`
- keep `ECO-20260402-critic-143` blocked until the bridge pass lands
