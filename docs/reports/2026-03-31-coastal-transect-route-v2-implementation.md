# 2026-03-31 Coastal Transect Route V2 Implementation

Implementation notes for `ECO-20260331-main-128`.

## Scope

Land the first post-forest Route v2 expansion by adding one true staged transect request and converting `scrub-edge-pattern` to use it without changing the save model, filing flow, or station shell.

## What Landed

- Added a new Route v2 request type, `transect-evidence`, in `src/engine/field-requests.ts`.
- Converted `scrub-edge-pattern` from unordered `assemble-evidence` to a staged coastal transect:
  - `open-pioneer` at `back-dune`
  - `holding-cover` at `windbreak-swale`
  - `thicker-edge` at `forest-edge`
- Kept the existing `routeV2Progress.evidenceSlots` save seam and notebook filing seam unchanged.
- Kept `forest-cool-edge` as the tighter one-zone `assemble-evidence` follow-up.

## Runtime Behavior

- Only the first missing transect stage can advance the request.
- Progress labels now point to the next required stage zone for the transect:
  - `Go To Coastal Scrub`
  - `Return To Back Dune`
  - `Return To Windbreak Swale`
  - `Return To Forest Edge`
  - `Ready To File`
- Hand-lens notebook-fit hints now stay silent for later transect carriers until earlier stages are logged.
- Older in-progress `scrub-edge-pattern` saves continue to read coherently because the runtime still uses the existing filled-slot list and simply guides the player to the first missing stage.

## Supporting Copy

- The edge-pattern board beat now explicitly reads as `Back Dune -> Windbreak Swale -> Forest Edge`.
- The route-board summary and next-direction copy now frame the outing as a coast-to-forest transect instead of a generic clue-matching pass.

## Verification

- `npx vitest run src/test/field-requests.test.ts src/test/field-season-board.test.ts`
- `npx vitest run src/test/runtime-smoke.test.ts -t "switches the route board to coastal scrub and can hand the outing guide to route marker"`
- `npm run build`
