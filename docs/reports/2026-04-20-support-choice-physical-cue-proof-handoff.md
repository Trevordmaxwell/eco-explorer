# Support Choice Physical Cue Proof Handoff

Created: 2026-04-20

Queue: `ECO-20260420-scout-352`
Packet: `.agents/packets/136-support-choice-in-field-differentiation.json`
Role: `scout-agent`
Lane: `lane-3`

## Scout Finding

Lane 4 already made support choice felt in the field through existing Route v2 seams:

- `hand-lens` remains the only support that changes inspect targeting.
- `note-tabs` now uses the existing in-field `NOTEBOOK J` chip for active route progress.
- `place-tab` now uses the same chip for the compact `Place Question` cue.
- `route-marker` remains map/travel-facing.

Lane 3 should therefore avoid adding a second support UI, new route behavior, or new geometry by default. The safer lane-3 follow-up is a proof pass that locks the existing physical clue carriers and nearby decoys that already make hand-lens retargeting spatially readable.

## Current Physical Cue Coverage

Existing runtime-smoke coverage already points at the right proof shape:

- Beach / coast: `Shore Shelter` wrack and `Held Sand` beach grass prove front-half physical carrier reads.
- Forest: `Moisture Holders` sword fern proves the root-hollow carrier can be chosen over a nearby ordinary inspectable.
- Treeline / high country: `Brief Bloom`, `Rimed Pass`, and `High Pass` prove small exposed-ground carriers such as moss campion, reindeer lichen, and talus cushion pocket can act as route-fit targets.
- Tundra: `Thaw Window` proves woolly lousewort and Bigelow's sedge can act as support-relevant carriers without changing non-hand-lens behavior.

Those are enough to justify a proof-first main item. If the focused proof shows a missing physical carrier or missing nearby decoy in one family, add one tiny existing-style placement only in that family. Otherwise, do not touch world geometry.

## Recommended Main Target

Add a small lane-3 proof around existing support-readable physical cues. Prefer test/report-only work unless a real gap appears.

Recommended files:

- `src/test/runtime-smoke.test.ts`
- `docs/reports/2026-04-20-support-choice-physical-cue-proof-implementation.md`
- `.agents/packets/136-support-choice-in-field-differentiation.json`
- `.agents/work-queue.md`
- `progress.md`

Avoid editing:

- station surfaces
- support selection state or save schema
- route definitions or filed-note behavior
- authored science copy
- nursery behavior
- new HUD, inventory, loadout, or notebook panels

## Acceptance For Main

- Prove at least three support-relevant physical cue families across different parts of the world: one front-half cue, one forest cue, and one alpine or tundra cue.
- Each proved family should include a route-fit physical carrier plus a nearby ordinary or non-fit inspectable so the hand-lens choice reads spatially instead of magically.
- Paired non-hand-lens coverage should still prove normal nearest-inspect behavior or chip-only support behavior.
- If existing smoke tests already cover the matrix, main may consolidate or name that proof without changing geometry.
- If any geometry is changed, keep it tiny, existing-style, and include a `256x160` browser proof under `output/`.

## Verification For Main

- `npm test -- --run src/test/runtime-smoke.test.ts -t "Held Sand|Moisture Holders|Brief Bloom|High Pass|Thaw Window"`
- `npm test -- --run src/test/field-request-controller.test.ts`
- `npm run build`
- `npm run validate:agents`
- packet `136` JSON parse
- `git diff --check`

Known queue hygiene note: `npm run validate:agents` may currently fail on unrelated lane-4 packet `154` references if that lane has not landed its browser-proof artifact yet. Do not fix that from lane 3; report it if still present.
