# Tundra Short Summer Rush Copy Implementation

Created: 2026-04-20

Queue item: `ECO-20260420-main-371`
Packet: `.agents/packets/141-tundra-thaw-window-payoff-pass.json`
Lane: `lane-2`

## Change

Refreshed the existing Tundra Reach `short-summer-rush` ecosystem note so the journal ties first bloom, bird activity, and cloudberry fruit into one short-season relationship.

Updated summary:

`First blooms, birds, and cloudberry fruit all race the short tundra summer.`

Updated prompt:

`What here races the short summer?`

The note keeps the same `id`, `title`, `entryIds`, and `zoneId`, so the resolver path remains stable.

## Scope Check

- Changed `src/content/biomes/tundra.ts` only for the existing `short-summer-rush` summary and observation prompt.
- Added focused resolver coverage in `src/test/ecosystem-notes.test.ts` for the refreshed bloom/bird/berry timing relationship.
- Updated stale exact-copy expectations in `src/test/field-season-board.test.ts` and `src/test/runtime-smoke.test.ts` where the selected `place-tab` surface correctly reuses the ecosystem-note prompt.
- Did not edit `src/engine/field-requests.ts`, `tundra-short-season`, `Thaw Window` route/process behavior, support targeting, station/state/save behavior, world-map focus, Tundra geometry, science-ledger rows, close-look cards, sketchbook notes, comparison branches, new species, or runtime source code.
- `rg` for the old prompt in `src/` now returns no current source or test matches.

## Verification

- `npm test -- --run src/test/ecosystem-notes.test.ts src/test/content-quality.test.ts src/test/field-season-board.test.ts` passed.
- `npm test -- --run src/test/runtime-smoke.test.ts -t "tundra survey place-tab question"` passed.
- `npm run build` passed.
- Copy budget check: summary is 75 characters and prompt is 33 characters.
