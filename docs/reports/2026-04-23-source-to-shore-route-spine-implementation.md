# 2026-04-23 Source To Shore Route Spine Implementation

Source to Shore now has a two-beat beta spine instead of a single filed note.

## What Changed

- Kept `Source Shelter` as the Treeline Pass high-source opener.
- Added `Forest Release`, a downstream Forest Trail Route v2 beat that unlocks after `Source Shelter` is filed.
- Extended `src/engine/source-to-shore-state.ts` so the beta helper can resolve:
  - `Source Shelter` active
  - `Source Shelter` ready-to-file
  - `Forest Release` active after filed `Source Shelter`
  - `Forest Release` ready-to-file
  - `Forest Release` filed
- Added Forest Release debug snapshots for ready-to-file and filed states.
- Tightened world-map focus so an active outing target wins over the old High Pass guidance when Source to Shore moves downstream.

## Route Shape

Route id: `source-to-shore-forest-release`

Evidence slots:

- `seep-hold`: `seep-stone` or `seep-moss-mat`
- `root-filter`: `root-curtain`
- `cool-release`: `salmonberry` or `sword-fern`

Filed note:

- `Seep hold, root filter, and cool release show Source to Shore moving downhill through forest shelter.`

## Boundaries

- No biome six.
- No new route framework.
- No save schema change.
- No planner, dashboard, inventory, economy, combat, crafting, or API mode.
- No geometry expansion; this pass proves state and route connection first.

## Verification So Far

- Focused content, route, station, and snapshot tests passed:
  - `npm test -- --run src/test/content-quality.test.ts src/test/field-requests.test.ts src/test/field-season-board.test.ts src/test/save-snapshots.test.ts`
- Browser proof captured `Forest Release` active, ready-to-file, and filed snapshots under `output/source-to-shore-route-spine-browser/` with no console errors.
- Full local release gate passed:
  - `npm run alpha:rc`
  - Review drop: `output/review-drops/eco-explorer-review-drop-20260423-132343.tgz`
