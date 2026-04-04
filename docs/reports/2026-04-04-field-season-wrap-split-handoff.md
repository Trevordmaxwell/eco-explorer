# 2026-04-04 Field Season Wrap Split Handoff

Prepared `ECO-20260404-scout-255` against packet `104`.

## Recommendation

The next safe `field-season-board.ts` extraction should target the season-wrap and subtitle composition family at the bottom of the file, not the route-state resolvers.

Recommended implementation target for `ECO-20260404-main-255`:

- extract the pure wrap/subtitle cluster into a helper module such as `src/engine/field-season-wrap.ts`
- move `resolveFieldSeasonWrapState(...)`, `resolveFieldStationSubtitle(...)`, and their local helper family together
- update `src/engine/field-station-state.ts` to import the wrap resolver directly from that new module

## Why This Seam First

This is the cleanest concentrated pure-composition seam still left in `field-season-board.ts`.

- The entire bottom cluster already hangs together around one responsibility: decide the compact station strip copy for `TODAY`, `NOTEBOOK READY`, `ROUTE LOGGED`, archive, and support-specific variants.
- It is pure derivation fed by existing inputs (`routeBoard`, `seasonNote`, `atlas`, `archive`, `selectedOutingSupportId`) and does not own save mutation, route progression, or input handling.
- The test surface is already strong: `src/test/field-season-board.test.ts` has dense direct coverage on `resolveFieldSeasonWrapState(...)` and `resolveFieldStationSubtitle(...)`, while `runtime-smoke` rechecks the live station shell.
- Pulling this family out reduces file concentration without reopening the more entangled route-state builders (`resolveCoastalFieldSeasonBoardState`, `resolveInlandFieldSeasonBoardState`, `resolveEdgePatternFieldSeasonBoardState`).

## Scope For Main-255

Keep `main-255` narrow and behavior-preserving.

Move:

- `resolveFieldSeasonWrapState(...)`
- `resolveFieldStationSubtitle(...)`
- their private helper family:
  - support-aware `TODAY` wrap derivation
  - note-tabs chapter-close / replay-wrap helpers
  - compact stop-point and logged-return text helpers
  - tiny text-format helpers only used by that family

Keep in `src/engine/field-season-board.ts`:

- route-state builders
- replay-note generation
- notebook-ready route-board mutation
- atlas / archive / expedition resolvers
- next-season continuity and outing locator logic

## Suggested Shape

One safe shape is:

- `src/engine/field-season-wrap.ts`
- import `BiomeDefinition`, `FieldStationSeasonPage`, `FieldStationView`, and `OutingSupportId` from `src/engine/types.ts`
- use type-only imports for `FieldSeasonBoardState`, `FieldAtlasState`, `FieldSeasonArchiveState`, and `FieldSeasonWrapState`
- point `src/engine/field-station-state.ts` at the new module directly instead of relying on a runtime re-export through `field-season-board.ts`

That avoids turning this into a broader board reorganization and keeps runtime cycles easy to reason about.

## Verification For Main-255

Keep verification focused on the existing wrap behavior.

- `npx vitest run src/test/field-season-board.test.ts`
- `npx vitest run src/test/runtime-smoke.test.ts -t "seasonWrap|field station|Route Marker|note-tabs|place tab"`
- `npm run build`

If the station shell import path changes in a meaningful way, add the usual shared web-game client smoke afterward, but this should stay a pure composition move first.

## Follow-On Note

If this lands cleanly, `critic-255` should mainly watch for two things:

- silent wrap-copy drift in the support-specific `TODAY` cases
- accidental runtime cycles between `field-season-board.ts`, `field-season-wrap.ts`, and `field-station-state.ts`
