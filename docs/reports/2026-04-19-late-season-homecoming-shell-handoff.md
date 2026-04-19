# Late-Season Homecoming Shell Handoff

## Queue Ref

- `ECO-20260419-scout-315`
- prepares `ECO-20260419-main-315`

## Recommended Scope

Lane 1 should spend this pass on the existing station-shell accent family, not on more station copy or another page.

The best next chunk is:

- extract the current field-station shell accent cluster out of [overlay-render.ts](/Users/trevormaxwell/Desktop/game/src/engine/overlay-render.ts) into one dedicated helper file
- use that helper for one additional late-season visual payoff on the same shell family

That keeps the change compact while paying down one of the remaining renderer concentration points.

## Exact Hotspot

The relevant cluster in [overlay-render.ts](/Users/trevormaxwell/Desktop/game/src/engine/overlay-render.ts) already sits together:

- `FieldStationGrowthInput`
- `FieldStationGrowthAccentState`
- `FieldStationBackdropAccentState`
- `resolveFieldStationGrowthAccentState(...)`
- `resolveFieldStationBackdropAccentState(...)`
- `resolveFieldStationBackdropPulseState(...)`
- `drawFieldStationBackdropAccent(...)`
- `drawFieldStationGrowthAccent(...)`

Those functions are already a real subsystem. They are progression-driven, render-facing, and reused by both focused overlay tests and `render_game_to_text()` state.

This is the next clean split boundary before more late-season return nuance lands.

## Recommended Split

Extract that cluster into something like:

- `src/engine/field-station-homecoming-shell.ts`

Keep [drawFieldStationOverlay(...) in overlay-render.ts](/Users/trevormaxwell/Desktop/game/src/engine/overlay-render.ts) as the coordinator that:

- computes the shell input from existing station state
- calls the extracted shell renderer
- leaves routes-page, expedition-page, nursery-page, tabs, and header copy untouched

## Recommended Payoff Seam

Use the same brace-family shell for one calmer late-season payoff:

- default station return: unchanged
- mid-progression return: current brace and sill accents behave exactly as they do now
- late-season archived return: add one tiny upper `lintel` / `cap` across the brace family when the return loop has reached the archived `High Pass` season state

Why this seam:

- it reads as a slightly more settled homecoming instead of another decoration system
- it stays off the already-saturated lower sill family
- it makes late-season return feel more earned without adding text, a row, or another card

## Suggested Trigger

Derive the late-season shell state from render-facing station inputs that already exist in [drawFieldStationOverlay(...)](/Users/trevormaxwell/Desktop/game/src/engine/overlay-render.ts):

- prefer the archived routes return state already expressed through `seasonWrap`
- optionally confirm with the live `High Pass` routes shell state already present in `routeBoard`

Avoid adding new progression state or gameplay dependencies for this.

## Main Shape

### In scope

- extract the shell accent cluster into `field-station-homecoming-shell.ts`
- keep `overlay-render.ts` thinner by delegating shell accent drawing there
- add one tiny late-season archive lintel on the existing brace family
- expose the new late-season shell bit through the existing render-observability seam used by tests

### Keep small

- do not add a new station tab
- do not add a planner row, archive card, or subtitle copy
- do not reopen nursery layout work
- do not move progression policy back out of `field-station-session.ts`

## Verification For Main

- focused shell helper coverage in [overlay-copy.test.ts](/Users/trevormaxwell/Desktop/game/src/test/overlay-copy.test.ts) for:
  - no accent change in the default early return
  - unchanged mid-progression brace behavior
  - the new late-season archive lintel only appearing in the archived `High Pass` return state
- one runtime-smoke proof in [runtime-smoke.test.ts](/Users/trevormaxwell/Desktop/game/src/test/runtime-smoke.test.ts) for:
  - the first station return staying calm
  - the late-season `SEASON ARCHIVE` station shell showing the new payoff
- `npm run build`
