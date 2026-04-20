# Support Choice In-Field Differentiation Review

Date: 2026-04-20
Queue item: `ECO-20260420-critic-353`
Lane: `lane-4`
Owner: `critic-agent`
Packet: `.agents/packets/136-support-choice-in-field-differentiation.json`

## Verdict

No blocker.

The implementation stays inside the lane-4 route/support seam and makes three support choices feel distinct without adding inventory, loadout, station chrome, save schema, route definitions, geometry, or authored science-copy changes.

## Checks

- Hand lens remains the only support that can expose notebook-fit context, prefer active clues, retarget nearest inspectables, or format `LENS CLUE` inspect-bubble copy.
- `note-tabs` now uses the existing active Route v2 progress label in the in-field `NOTEBOOK J` chip, which is a small enough cue to read at the handheld scale and uses already-authored request state rather than new route prose.
- `place-tab` now uses a compact `Place Question` chip cue and does not change targeting or inspect-bubble resource-note behavior.
- `route-marker` remains map/travel-facing: the focused test keeps the default route-title chip, null hand-lens context, nearest inspectable fallback, and no support-biased notebook-chip behavior.
- Runtime smoke coverage refreshes the existing non-hand-lens regression slice so the debug state now matches the intended progress-chip behavior while still proving nearest-target and route-progress behavior do not drift.

## Verification

- `npm test -- --run src/test/field-request-controller.test.ts`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "keeps non-hand-lens supports"`
- `npm run build`

`npm run validate:agents` and `git diff --check` should run after recording this review in the queue and packet.
