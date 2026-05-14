# Route Replay And Support Depth Scout

Date: 2026-04-28
Owner: lane-4 scout-agent
Queue item: `ECO-20260428-scout-497`
Packet: `.agents/packets/190-lane-4-route-replay-and-support-depth.json`

## Finding

The smallest route-local depth pass is the `Held Dune` hand-lens preference seam.

`Source Shelter` and `Forest Release` already use existing `processFocus.activeSlotEntryIdsBySlotId` data so their live replay variants can bias hand lens toward process-specific carriers while other supports stay unchanged. `Dune Catch` now has the active-only `Held Dune` replay title/copy, but its `processFocus` does not yet name active slot carriers, so controller selection cannot prefer the held-sand clue when nearby alternatives compete.

## Scoped Main Pass

- Add only `activeSlotEntryIdsBySlotId` to `source-to-shore-dune-catch.processFocus` in `src/engine/field-request-catalog.ts`.
- Use existing coastal scrub `sand-capture` carriers:
  - `dune-catch`: `beach-grass`
  - `swale-hold`: `pacific-wax-myrtle`
- Do not add a `cool-edge` active carrier because the existing `sand-capture` process is scoped to `back-dune` and `windbreak-swale`.
- Add focused tests proving hand lens prefers the active carriers during `Held Dune` while `note-tabs`/non-hand-lens behavior stays unexpanded.
- Keep ready-to-file and filed states canonical as `Dune Catch`.

## Guardrails

- No route ids, evidence ids, slot order, filed text, support ids, save schema, replay framework, loadout UI, station shell, geometry, content pack, or fourth Source to Shore beat.
- Preserve the existing `Route note is ready.` support notice for ready-to-file routes.
- Preserve filed Source to Shore as the three done beats ending at `Dune Catch`.

## Suggested Verification

- `npm test -- --run src/test/field-requests.test.ts -t "Source to Shore|Held Dune"`
- `npm test -- --run src/test/field-request-controller.test.ts -t "Source to Shore|Held Dune|support notice"`
- `npm test -- --run src/test/field-season-board.test.ts -t "Source to Shore|Dune Catch|Held Dune"`
- `npm test -- --run src/test/save-snapshots.test.ts -t "Source to Shore|Dune Catch"`
- `npm run build`
