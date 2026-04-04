# 2026-04-03 Support-Choice Meaning Implementation

Implementation report for `ECO-20260403-main-225`.

## Scope

- `src/engine/field-season-board.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`

## What Landed

- Extended `resolvePlaceTabPrompt()` so the inland `treeline-shelter-line` now gives `place-tab` its own authored question on the active `tundra-survey` beat.
- Reused the existing tundra `short-summer-rush` prompt, so both generic `Tundra Survey` and peak `Bright Survey` now read `What hints at a very short summer?` when `place-tab` is selected.
- Left the rest of the support row unchanged: `hand-lens` keeps the detail-first strip, `note-tabs` keeps notebook-first wording, `route-marker` keeps its travel role, and no new support or unlock seam was added.

## Verification

- `npx vitest run src/test/field-season-board.test.ts -t "place tab|thaw-edge place question|tundra survey beat"`
- `npx vitest run src/test/runtime-smoke.test.ts -t "shows the tundra survey place-tab question once the inland line reaches Tundra Survey|keeps the tundra survey place-tab question when the beat reframes as Bright Survey|shows the treeline place-tab question once the edge line reaches Low Fell|shows the Bright Survey route replay note when re-entering tundra during peak phenology"`
- `npm run build`

## Follow-On

- `ECO-20260403-critic-225` can now review whether the support row feels materially more distinct on the inland survey capstone without drifting into extra UI or another support type.
