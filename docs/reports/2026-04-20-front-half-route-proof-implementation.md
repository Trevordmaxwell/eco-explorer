# Front-Half Route Proof Implementation

Created: 2026-04-20

## Queue Item

- Completed: `ECO-20260420-main-361`
- Packet: `.agents/packets/138-front-half-tactile-identity-pass.json`
- Lane: `lane-4`

## Implementation

Added focused controller coverage for the live `Open To Shelter` route without changing route definitions, runtime behavior, station surfaces, support ordering, save schema, geometry, or player-facing copy.

The new proof seeds the post-forest Coastal Scrub handoff, selects `hand-lens`, and verifies that a nearer non-fit `beach-pea` candidate gives way to the farther `sand-verbena` `open-bloom` route clue. It also confirms the result is an ordinary notebook-fit retarget: `supportRetargetsInspect` is true, `supportPrefersActiveClue` is false, the bubble line stays `Notebook fit: open bloom`, and no `LENS CLUE` label appears.

The paired `note-tabs` case uses the same candidates and confirms non-hand-lens support leaves the physical nearest inspectable alone while the existing in-field chip stays progress-facing with `0/3 stages`.

## Runtime Note

I attempted to place the same cue inside the existing Open To Shelter runtime smoke, but the in-field chip is intentionally suppressed while the route notice or inspect bubble is active in that path. Keeping this pass controller-level avoids testing notice timing or forcing behavior changes just to expose a transient chip.

## Verification

- `npm test -- --run src/test/field-request-controller.test.ts`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "Open To Shelter"`
- `npm run build`
