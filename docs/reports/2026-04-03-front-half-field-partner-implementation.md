# 2026-04-03 Front-Half Field Partner Implementation

Implemented `ECO-20260402-main-187` in lane 2.

## What Landed

- Added exactly two new field-partner cues in `src/engine/field-partner.ts`:
  - `beach-lee-pocket-hold`
  - `scrub-swale-shelter`
- Kept the pass cue-bank-only. No new prompt families, fallback-bank rewrites, cadence changes, or new partner surfaces were added.
- Added focused guardrail coverage in `src/test/field-partner.test.ts` and `src/test/runtime-smoke.test.ts` so both new cues stay wired to the intended beach and coastal-scrub states.

## Cue Outcomes

- `beach-lee-pocket-hold`: `Driftwood keeps this tucked sand calmer.`
- `scrub-swale-shelter`: `This swale turns low cover into shelter.`

Both lines stay one-sentence, notebook-tight, and prompt-linked instead of widening the fallback bank.

## Small Adjustment During Verification

- The first live browser proof showed the partner strip clipping vertically on the new lines.
- Tightened the strip rendering in `src/engine/overlay-render.ts` so one-line notices keep the existing centered layout and two-line partner notices get safer wrapped baselines inside the same transient box.

## Verification

- `npx vitest run src/test/field-partner.test.ts`
- `npx vitest run src/test/runtime-smoke.test.ts -t "shows a sparse field-partner strip only during calm biome play|shows a no-prompt fallback cue when weather is carrying the observation alone|shows the new windbreak-swale partner cue when the sheltered middle prompt is active|shows the new lee-pocket partner cue after a tucked-sand discovery unlocks the note"`
- `npm run build`
- required `develop-web-game` shared client pass in `output/lane-2-main-187-client/`
- seeded browser proof in `output/lane-2-main-187-browser/`:
  - `swale-partner.png`
  - `lee-pocket-partner.png`
  - paired state captures confirm the expected `scrub-swale-shelter` and `beach-lee-pocket-hold` cue ids
  - `console-errors.json` is empty

## Queue Outcome

- Close `ECO-20260402-main-187`.
- Promote `ECO-20260402-critic-160` to `READY`.
