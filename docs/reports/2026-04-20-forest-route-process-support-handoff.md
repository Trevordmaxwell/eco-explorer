# Forest Route Process Support Handoff

Created: 2026-04-20

## Queue Item

- Completed: `ECO-20260420-scout-365`
- Packet: `.agents/packets/139-forest-tactile-identity-pass.json`
- Lane: `lane-4`

## Scout Read

Packet `139` asks lane 4 to strengthen an existing forest route clue or replay consequence tied to weather/process state. The strongest lane-4 target is already live: `forest-cool-edge` becomes `Moist Edge` during the late wet `moisture-hold` process window, while `forest-moisture-holders` becomes `Moist Hollow`.

Lane 1 has already protected the mid-forest station/map/request snapshot, and lane 2 refreshed the `root-held-shelter` copy around root curtains, drips, shade, and seep-floor shelter. Lane 4 should not add forest geometry, new content, new station pages, or another route framework.

The gap is proof clarity. `field-requests` covers the process-backed `Moist Edge` title/summary and stable filed identity, and runtime smoke already covers forest replay notices. But `field-request-controller.test.ts` does not yet prove how support targeting behaves for the forest `Moist Edge` process route.

Baseline also exposed one stale runtime assertion: the `Moist Hollow` note-tabs runtime smoke now receives the correct progress-facing support chip (`0/3 clues`, `support-biased`) rather than the old default `Moist Hollow` chip. That should be repaired with the main pass.

## Recommended Main Chunk

Keep this as a focused proof/repair pass:

- Add a controller-level `Moist Edge` support proof in `src/test/field-request-controller.test.ts`.
- Refresh the stale `Moist Hollow` note-tabs runtime expectation in `src/test/runtime-smoke.test.ts`.
- Do not change route definitions, process-focus copy, filed-note text, lane-2 forest copy, station pages, support order, save schema, world-map focus priority, route-marker behavior, geometry, science copy, new UI, replay systems, loadouts, planners, or quest surfaces.

## Suggested Assertions

Controller proof:

- Seed a save with completed requests through `scrub-edge-pattern`, `selectedOutingSupportId = "hand-lens"`, `worldStep = 6`, and `biomeVisits.forest = 2`.
- Resolve in `forest` / `creek-bend` so the active request is `forest-cool-edge` with title `Moist Edge`.
- Use a nearer non-fit candidate such as `fir-cone` and a farther route-fit candidate such as `salmonberry`.
- Expect `hand-lens` to retarget to `salmonberry`, with `supportRetargetsInspect: true`, `supportPrefersActiveClue: false`, and `Notebook fit: edge carrier`, not `LENS CLUE`.
- Pair the same candidates with `note-tabs` and expect the physical nearest inspectable to remain selected while the chip stays progress-facing with `0/3 clues`.

Runtime repair:

- In the existing `lets tree lungwort count as the Moist Hollow shelter clue on the live upper-return shelf` smoke, update the note-tabs chip expectation to `title: "0/3 clues"` and `variant: "support-biased"`.

## Baseline Verification

- `PASS npm test -- --run src/test/field-requests.test.ts -t "Moist Edge|Moist Hollow|forest-cool-edge|forest-moisture-holders"`
- `PASS npm test -- --run src/test/field-request-controller.test.ts -t "Moisture Holders|Moist Edge|retarget|non-hand-lens"`
- `FAIL npm test -- --run src/test/runtime-smoke.test.ts -t "Moist Hollow"` on the stale note-tabs chip expectation described above

## Main Verification

- `npm test -- --run src/test/field-request-controller.test.ts`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "Moist Hollow|Moisture Holders"`
- `npm test -- --run src/test/field-requests.test.ts -t "Moist Edge|Moist Hollow|forest-cool-edge|forest-moisture-holders"`
- `npm run build`
- `npm run validate:agents`
- `git diff --check`
