# Route-Local Replay Variants Handoff

Date: 2026-04-28
Owner: lane-4 scout-agent
Queue item: `ECO-20260428-scout-485`
Packet: `.agents/packets/179-lane-4-route-feel-runway.json`

## Read

Route-local replay already has the right seams:

- Normal Route v2 definitions can use `processFocus` or `worldStateFocus` in `src/engine/field-request-catalog.ts`.
- `src/engine/field-requests.ts` already keeps active live titles separate from ready/filed canonical titles.
- `src/engine/field-season-board.ts` already turns replay notes into station-board and world-map-facing route feel without a separate replay system.
- Source to Shore is special-cased through `src/engine/source-to-shore-state.ts`, which already mirrors active variants for `Rime Source` and `Cool Release` while keeping canonical `Source Shelter` and `Forest Release` filing identities stable.

The small gap is the third Source to Shore beat. `Dune Catch` currently has no active-only route variant even though Coastal Scrub already has a `sand-capture` process moment on late revisits. Adding one active-only title/copy pass gives Source to Shore a complete three-beat live-variant shape without adding a fourth beat.

## Selected Scope

Implement one active-only Dune Catch variant:

- Canonical request id stays `source-to-shore-dune-catch`.
- Canonical filed/ready title stays `Dune Catch`.
- Active-only title: `Held Dune`.
- Trigger: active `source-to-shore-dune-catch` while Coastal Scrub has the existing `sand-capture` process moment active.
- Player-facing feel: trapped sand makes dune grass, swale shrubs, and the cool edge easier to read today.

## Implementation Contract

- In `src/engine/field-request-catalog.ts`, add `processFocus` to `source-to-shore-dune-catch` using:
  - `momentId: 'sand-capture'`
  - `activeTitle: 'Held Dune'`
  - a short active summary about trapped sand helping the coast catch read today
- Do not add new evidence ids, support ids, route ids, slots, slot order, definitions, save fields, or catalog shape.
- In `src/engine/source-to-shore-state.ts`, update only the active Dune Catch state to mirror the same `Held Dune` title/copy when the same `sand-capture` process is active.
- Keep ready-to-file and filed Source to Shore states canonical and map-calm.
- Let `resolveSourceToShoreBeatSurfaceStates(...)`, station board, atlas note, active outing, and world-map label consume the existing source-to-shore state; avoid adding Source to Shore to `getReplayNote(...)` unless a focused test proves the current seam cannot carry the variant.

## Test Contract

- `src/test/field-requests.test.ts`
  - Add Dune Catch to the route-variant matrix: active title `Held Dune`, ready title `Dune Catch`, request id unchanged, filed text canonical.
  - Prove the variant is live-only by setting `worldStep = 6` and `biomeVisits['coastal-scrub'] = 2`.
- `src/test/field-season-board.test.ts`
  - Extend Source to Shore live-variant coverage so active Dune Catch surfaces `Held Dune` on the route board, world-map label, summary, and atlas note.
  - Keep ready-to-file and filed Dune Catch expectations canonical.
- `src/test/save-snapshots.test.ts`
  - Only update if an existing Source to Shore snapshot needs the active title assertion.
- `src/test/runtime-smoke.test.ts`
  - Add or extend one focused Dune Catch active-state smoke only if board/unit coverage does not prove the world-map/station surface.
- `npm run build`

Suggested focused commands:

```sh
npm test -- --run src/test/field-requests.test.ts -t "route variants|Dune Catch|Source to Shore"
npm test -- --run src/test/field-season-board.test.ts -t "Source to Shore|Dune Catch|Held Dune"
npm test -- --run src/test/save-snapshots.test.ts -t "Source to Shore|Dune Catch"
npm run build
```

## Out Of Scope

- No new replay system, planner, save schema, station shell, route framework, content pack, geometry, support behavior, route id, evidence id, slot-order change, filed-title change, or fourth Source to Shore beat.
- Do not broaden Source to Shore beyond the existing `Source Shelter -> Forest Release -> Dune Catch` endpoint.
- Do not make the filed chapter title, atlas filed sentence, or notebook filing identity change to `Held Dune`.
