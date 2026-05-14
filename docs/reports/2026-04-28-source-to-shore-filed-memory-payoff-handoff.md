# Source To Shore Filed-Memory Payoff Handoff

Date: 2026-04-28
Role: scout-agent
Queue: `ECO-20260428-scout-454`
Packet: `.agents/packets/173-source-to-shore-filed-memory-payoff.json`

## Scout Read

The payoff should be one filed `FIELD ATLAS` memory line, not a new surface.

Best seam:

- `src/engine/source-to-shore-state.ts`
- `resolveDuneCatchState('filed')`
- `liveAtlasNote`, consumed by `resolveFieldAtlasState(save)` in `src/engine/field-season-board.ts`

Candidate copy:

- `Filed: high source -> forest release -> coastal catch.`

Why this seam:

- It appears only after the three existing Source to Shore beats are filed.
- It is station-side, compact, and exact-copy tested.
- It reinforces the chapter chain without adding a badge, reward, notebook page, atlas mode, or fourth beat.
- It avoids stacking more text into the archive strip, route board, expedition card, and revisit notices, which already carry filed-state context.

## Implementation Contract

Keep the main pass to the filed Source to Shore state helper after the station-container review is clean.

Recommended files:

- `src/engine/source-to-shore-state.ts`
- `src/test/field-season-board.test.ts`
- `src/test/save-snapshots.test.ts`

Do not touch unless the post-container shape proves it necessary:

- `src/engine/field-requests.ts`
- `src/engine/debug-save-snapshots.ts`
- `src/engine/ecosystem-notes.ts`
- `docs/science-source-ledger.md`

If packet `169` removes the atlas note from the filed Source to Shore station view, use the same one-line copy as the filed station-card notice fallback instead of adding a second payoff surface.

## Science And Copy Checks

The copy should only name the already-authored relationship: high source, forest release, coastal catch. Avoid stronger causal claims such as water creating forest shelter, dunes creating habitat, or plants making groundwater.

The candidate line stays under the existing `64` character atlas-note budget. No new source-ledger row is needed unless implementation introduces a new ecological claim beyond the existing Source to Shore chapter language.

## Verification For Main

Run:

```bash
npm test -- --run src/test/field-season-board.test.ts src/test/save-snapshots.test.ts -t "Source to Shore|Dune Catch"
npm run build
```

Also run:

```bash
npm test -- --run src/test/content-quality.test.ts -t "content quality"
```

if any route-note or content-facing copy outside `source-to-shore-state.ts` changes.

## Status

Scout scope is ready, but `ECO-20260428-main-454` should stay parked until `ECO-20260428-critic-450` confirms the dedicated Source to Shore station container is clean.
