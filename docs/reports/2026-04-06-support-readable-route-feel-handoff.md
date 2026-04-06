# Support-Readable Route Feel Handoff

Prepared `ECO-20260406-scout-298` for lane 4.

## Recommendation

Use the existing top-right `NOTEBOOK J` field-request hint chip as the one live cue seam.

Do not answer this pass with the support notice strip, a new HUD row, or a bubble-only cue:

- the support notice strip is purchase-time only and does not travel with the live route moment
- the inspect bubble only appears after the player already committed to the clue
- a new helper row or planner shell would be larger than the gameplay win needs

The hint chip is already visible during active route play, already tied to the live request, and already quiet enough to carry one tiny support-shaped state without becoming another route card.

## Concrete Main Handoff

`ECO-20260406-main-298` should pair lane 1's extracted inspect-target seam with one tiny hint-chip state:

- keep the current chip body and route title
- add one minimal support-readable state only when active support is currently biasing the live inspect target
- scope the readable state to the existing `hand-lens` route-feel proofs only:
  - `Thaw Window` via `woolly-lousewort`
  - `Held Sand` via `beach-grass`

## Preferred Activation Rule

The cue should mean:

`hand-lens is changing what E will inspect right now`

It should not mean:

- `hand-lens is merely selected`
- `a route is active`
- `some notebook-fit clue exists somewhere nearby`

That keeps the cue truthful, tactile, and calm. If the player steps off the proof shelf or the normal nearest inspectable wins again, the chip should fall back to the plain existing state.

## Seam Guidance

After `ECO-20260406-critic-292` lands, lane 4 should consume the new extracted inspect-target seam instead of re-deriving preference rules inside `game.ts`.

Preferred shape:

- lane 1 exposes one tiny controller/debug-facing state for the current nearest inspect target and whether support bias is active
- lane 4 threads that into the existing field-request hint chip
- overlay work stays in the current chip renderer instead of opening another surface

## Proof Plan

Keep the proof set small and route-local:

- `Thaw Window`: prove the chip enters the support-readable state only on the live thaw-skirt shelf where `hand-lens` really prefers `woolly-lousewort`
- `Held Sand`: prove the same readable state on the back-dune shelf where `hand-lens` really prefers `beach-grass`
- comparison support: prove the chip stays in the plain existing state on the same shelves for `note-tabs`

## Guardrails

- no new support HUD
- no new planner shell
- no route-card copy growth
- no bubble-only explanation copy
- no expansion beyond `Thaw Window` and `Held Sand` in this wave

## Why This Is The Right Next Lane-4 Spend

The recent route-feel wave already made support choice matter in play. The best lane-4 follow-on is to make that live difference legible inside an existing calm seam while lane 1 protects the inspect-target logic from growing deeper into the coordinator.
