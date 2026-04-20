# Treeline Route Support Implementation

Created: 2026-04-20

## Queue Item

- Completed: `ECO-20260420-main-369`
- Packet: `.agents/packets/140-treeline-shelter-exposure-pass.json`
- Lane: `lane-4`

## Implementation

Added a controller-level `Brief Bloom` proof for the existing `treeline-low-fell` outing. The new coverage seeds `Low Fell` with the first two ordered clues already gathered, then proves the peak phenology window changes the hand-lens target choice for the `fell-bloom` slot without changing other support behavior.

## Coverage Added

- `hand-lens` sees active `Brief Bloom` with `2/4 clues`.
- `mountain-avens` remains an ordinary `Notebook fit: fell bloom` carrier.
- `moss-campion` becomes the active `LENS CLUE: fell bloom` carrier during the peak window.
- inspect selection retargets from nearer `mountain-avens` to farther `moss-campion`.
- `supportRetargetsInspect` and `supportPrefersActiveClue` are true for the hand-lens selection.
- the hand-lens `NOTEBOOK J` chip stays `Brief Bloom` / `support-biased`.
- paired `note-tabs` coverage keeps the nearest inspectable on `mountain-avens`, does not expose hand-lens notebook fit or active-clue preference, and keeps the chip progress-facing as `2/4 clues` / `support-biased`.

## Scope Preserved

- No route definitions changed.
- No world-state focus copy, filed-note copy, support order, save schema, station page, world-map focus, route-marker behavior, Treeline geometry, High Pass copy, science copy, or new UI/replay/loadout/planner surface changed.

## Verification

- `PASS npm test -- --run src/test/field-request-controller.test.ts`
- `PASS npm test -- --run src/test/field-requests.test.ts -t "Brief Bloom|treeline-low-fell|Low Fell"`
- `PASS npm run build`

## Handoff

- Promote `ECO-20260420-critic-369` to `READY`.
