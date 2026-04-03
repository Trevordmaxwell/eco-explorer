# 2026-04-03 Front-Half Station Warmth Handoff

Prepared `ECO-20260402-scout-144` against packet `070`.

## Current Read

The beach-led front-half no longer feels thin on the first return beat:

- the starter chapter is beach-first
- the forest survey handoff now keeps the beach chapter alive on the way back to station
- the `Trail Stride` pickup is already clear and handheld-safe

The remaining front-half gap comes one step later, after `Trail Stride` is owned and the player turns toward `Coastal Scrub`.

The current copy family there is functional but flatter than the inland half:

- routes-board summary: `Trail Stride opens scrub comparison.`
- `NEXT STOP` station note: `Coastal Scrub is the clearest next comparison. Look for how shelter shifts from dunes to shrubs.`
- `NEXT STOP` prompt notice: `Coastal Scrub makes the best next comparison after the forest run.`
- `FIELD SEASON OPEN` settled note after the first scrub visit: `Keep comparing nearby habitats and checking the station between longer routes.`

Those lines are accurate, but they lose the place-specific warmth that the beach return beat now has, and the settled note becomes especially generic while the player is still in the early front-half route.

## Best Next Slice

`main-182` should spend one compact pass on the front-half `Trail Stride -> Coastal Scrub` copy family only.

Recommended shape:

1. Keep the current starter and station-return copy from `main-178` and `main-179` unchanged.
2. Keep the active beat title `Coastal Shelter` unchanged; the prior review already flagged beat-title width as a risk.
3. Warm the routes-board summary in the `trail-stride-owned` / `coastal-comparison-active` state so it still sounds like the beach shelter line is flowing into scrub, not just unlocking a system step.
4. Tighten the paired `NEXT STOP` station note and prompt notice so they echo the same shelter-shift language in a shorter, more authored way.
5. Replace the generic pre-inland `FIELD SEASON OPEN` note with one compact beach-and-scrub comparison line that still fits the existing station shell.

## Guardrails For `main-182`

- no new station page, strip, card, or prompt type
- no change to menu routing or stage order
- no change to the `Coastal Shelter` beat title
- do not spend the budget in atlas or expedition copy
- keep the front-half warmth complementary to onboarding, not a second tutorial pass

## Likely File Targets

- `src/engine/field-season-board.ts`
- `src/engine/guided-field-season.ts`
- `src/test/field-season-board.test.ts`
- `src/test/guided-field-season.test.ts`
- `src/test/runtime-smoke.test.ts`

## Acceptance For `main-182`

- the post-`Trail Stride` routes summary feels like a beach-to-scrub chapter instead of a generic unlock
- the `NEXT STOP` note and notice feel authored but remain short
- the first scrub-visit settled note stops sounding generic while the front-half route is still active
- no new station surface appears and the active beat title stays compact
