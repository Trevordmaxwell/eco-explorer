# Treeline Route Support Review

Created: 2026-04-20

## Queue Item

- Completed: `ECO-20260420-critic-369`
- Packet: `.agents/packets/140-treeline-shelter-exposure-pass.json`
- Lane: `lane-4`

## Verdict

No blocker.

The implementation stays inside the lane-4 proof contract. It is test/report scoped and does not change route definitions, world-state focus copy, filed-note copy, support order, save schema, station pages, world-map focus, route-marker behavior, Treeline geometry, High Pass copy, science copy, or UI/replay/loadout/planner surfaces.

## Review Notes

- The new controller proof correctly seeds `treeline-low-fell` with `last-tree-shape` and `low-wood` already gathered, making `fell-bloom` the next ordered slot.
- `hand-lens` proves active `Brief Bloom` behavior by retargeting from the nearer ordinary `mountain-avens` carrier to the farther peak-window `moss-campion` carrier.
- The inspect-bubble distinction is locked: `mountain-avens` keeps `Notebook fit: fell bloom`, while `moss-campion` receives `LENS CLUE: fell bloom`.
- The support flags stay meaningful: `supportRetargetsInspect` and `supportPrefersActiveClue` are true only for the hand-lens selection.
- The paired `note-tabs` coverage keeps physical nearest-inspect behavior on `mountain-avens`, avoids active-clue preference, and keeps the chip progress-facing as `2/4 clues`.

## Verification

- `PASS npm test -- --run src/test/field-request-controller.test.ts`
- `PASS npm test -- --run src/test/field-requests.test.ts -t "Brief Bloom|treeline-low-fell|Low Fell"`
- `PASS npm test -- --run src/test/runtime-smoke.test.ts -t "Brief Bloom|Low Fell|place-tab"`
- `PASS npm run build`

## Handoff

- Promote `ECO-20260420-scout-373` to `READY`.
