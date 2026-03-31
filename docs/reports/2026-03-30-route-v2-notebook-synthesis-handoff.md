# 2026-03-30 Route V2 Notebook Synthesis Handoff

## Scope

Scout handoff for `ECO-20260330-scout-75`: define when a Route v2 beat becomes ready to synthesize at the station and how that notebook step should finish the beat without turning into a quiz, drag-and-drop puzzle, or new full-screen mode.

## Current Live Gap

The live request loop still completes too early for Route v2:

- `field-requests.ts` records success directly into `completedFieldRequestIds`
- field credit is awarded off completed request ids, so progress pays out the moment the runtime calls the request done
- the `ROUTES` page has no `ready to file` state
- `updateFieldStationState()` currently uses `Enter` on `SEASON -> ROUTES` only for the selected support row / upgrade purchase path

That is fine for the current notebook-request layer, but it is too abrupt for the Route v2 loop. If the beat completes at the last in-world clue, the station loses the return payoff that lane 4 is meant to add.

## Best Timing Rule

Split Route v2 beat resolution into two moments:

1. `gathered`
2. `filed`

### `gathered`

This happens in the biome.

Recommended trigger:

- the player has reached the landmark condition or filled every required evidence slot for the active beat

What should happen immediately:

- mark the active beat as `ready-to-synthesize`
- show one calm in-field notice such as `NOTEBOOK READY`
- do not write the beat id into `completedFieldRequestIds` yet
- do not award field credit yet
- stop pointing the route board at another biome target until the note is filed

### `filed`

This happens on the station `ROUTES` page.

Recommended trigger:

- the player opens the field station while a Route v2 beat is `ready-to-synthesize`
- one press of `Enter` files the note

What filing should do:

- write the request id into `completedFieldRequestIds`
- award any normal request-derived field credit through the existing ledger flow
- advance the route board to the next beat
- clear the transient in-progress evidence state for the filed beat

That timing gives the outing a return payoff without asking the player to do busywork.

## Best Station Presentation

Reuse the existing `ROUTES` page instead of adding another surface.

Recommended presentation:

- season strip label: `NOTEBOOK READY`
- strip text: one short return-facing line, for example `File the forest note before the next outing.`
- route board active row: swap the active beat state from `NOW` to a filing-oriented state such as `FILE`
- board summary line: show the gathered evidence in one authored compact line

Do not add:

- a new notebook page
- a modal synthesis screen
- slot-dragging
- multiple confirmation steps

## Best Input Fit

The smallest control change is to reuse the current `Enter` path on `SEASON -> ROUTES`.

Recommended behavior in `updateFieldStationState()`:

- if a Route v2 beat is `ready-to-synthesize`, `Enter` files that note before it tries to purchase the currently selected support row or upgrade
- once the note is filed, the normal support / upgrade `Enter` behavior resumes

Why this is the right fit:

- it keeps the notebook step to one press
- it does not require a second station cursor model
- it avoids crowding the already tight route page with another selectable card

## Best Authored Output Shape

The filing step should feel like closing a field note, not solving a puzzle.

### Wayfinding beat output

Use one compact place-plus-proof line.

Example shape:

- `Hidden Hollow filed: seep stone confirms the damp lower lane under the roots.`

### Assemble-evidence beat output

Use one compact synthesis line built from the filled evidence roles.

Example shape:

- `Moisture Holders filed: shelter, damp ground, and soft-bodied life all point to the hollow holding cool moisture.`

The important part is that the authored sentence comes from the beat definition, not from freeform text entry or a quiz prompt.

## Best Core State Shape

### `main-109`

Add one tiny progress state for the active Route v2 beat:

- `gathering`
- `ready-to-synthesize`

Plus the minimum supporting evidence data:

- landmark confirmed or not
- gathered evidence slots

The route board should derive its display from that transient state first, and only fall back to `completedFieldRequestIds` once the beat is filed.

### `main-110`

Use the first forest pair to prove both cases:

- `forest-hidden-hollow`: landmark-backed filing
- `forest-moisture-holders`: evidence-slot filing

That is enough to prove the notebook return loop before later routes add more variation.

## Expected File Touches

- `src/engine/types.ts`
- `src/engine/save.ts`
- `src/engine/field-requests.ts`
- `src/engine/field-season-board.ts`
- `src/engine/game.ts`
- `src/engine/overlay-render.ts`
- `src/test/save.test.ts`
- `src/test/field-requests.test.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`

## Guardrails

- keep synthesis to one press on the existing routes page
- do not add a quiz, drag-and-drop assembly, or full-screen notebook mode
- do not award completion or field credit before filing
- keep the filing copy authored and short enough for the `256x160` shell
- let the filing step temporarily outrank support purchases, then return to normal station behavior immediately after

## Queue Guidance

- close `ECO-20260330-scout-75` with this handoff
- promote `ECO-20260330-main-109` to `READY`
- keep `ECO-20260330-critic-84` blocked until the Route v2 core implementation lands
