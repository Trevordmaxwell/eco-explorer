# Home-Place Payoff And Session-Split Handoff

## Queue Ref

- `ECO-20260416-scout-303`
- prepares `ECO-20260416-main-303`

## Recommended Scope

Sprint 2 lane 1 should pair one felt station-return payoff with one station-owned coordinator split:

- add one calmer homecoming accent that reuses the existing field-station arrival pulse and existing shell accents instead of adding copy
- extract the field-station open-session setup out of [game.ts](/Users/trevormaxwell/Desktop/game/src/engine/game.ts) into a station-owned helper

That keeps the station feeling more earned after returns without reopening route-board density or inventing a larger home screen.

## Recommended Payoff Seam

Use the station shell that already exists:

- the lower-sill growth accent in [overlay-render.ts](/Users/trevormaxwell/Desktop/game/src/engine/overlay-render.ts)
- the side-gutter brace family in that same file
- the existing `arrivalPulse` timing already passed from [game.ts](/Users/trevormaxwell/Desktop/game/src/engine/game.ts)

The next payoff should not add another row or sentence. It should make station return feel warmer by briefly lighting the shell the player already knows.

## Main Shape

### Visual target

When the player opens the station from a meaningful return state, let the existing arrival pulse briefly read as a stronger homecoming on the shell:

- reuse the existing arrival pulse timing
- keep the effect on the current sill-and-gutter accent family
- only elevate the pulse for earned return moments such as logged-route return or season-close return
- leave normal station opens calm and unchanged

This should feel like "the place welcomes you back" rather than "another UI panel appeared."

### Split target

The best next coordinator split is the field-station session-open cluster in [game.ts](/Users/trevormaxwell/Desktop/game/src/engine/game.ts):

- `openFieldStation()`
- `closeFieldStation()`
- `getFieldStationArrivalPulse()`

That cluster currently owns:

- season-close-return acknowledgement
- ledger and nursery sync
- persistence decision
- station default selection resets
- arrival pulse initialization

Those are station-owned responsibilities and a safer Sprint 2 split than the broader notice family.

## Suggested Helper Boundary

Prefer a helper in [field-station.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-station.ts) or one tiny sibling module beside it that:

- accepts the save plus the current station selections
- performs the station-open normalization and returns the updated selections plus any save-side effects that happened
- derives one compact arrival mode, for example `default` vs `homecoming`

Then let [game.ts](/Users/trevormaxwell/Desktop/game/src/engine/game.ts) keep only the outer mode switch and timing countdown wiring.

## Why This Boundary

- It directly supports the home-place payoff packet goal.
- It keeps the payoff inside the existing station shell instead of growing new text surfaces.
- It buys down future coordinator risk exactly where more station-return behavior is likely to accumulate.
- It avoids reopening the broader `maybeShow*Notice` family too early.

## Non-Goals

- do not add another subtitle, recap strip, or planner row
- do not widen routes-page copy
- do not reopen nursery-card copy budgets
- do not turn the arrival pulse into a broader animation system

## Verification For Main

- focused overlay-copy coverage for the new return-payoff state
- one focused field-station runtime-smoke slice that proves ordinary opens stay calm while earned return opens use the stronger shell read
- `npm run build`
