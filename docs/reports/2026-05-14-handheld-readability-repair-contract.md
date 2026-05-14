# Handheld Readability Repair Contract

Date: 2026-05-14
Role: scout-agent
Lane: lane-1
Queue: `ECO-20260514-scout-01`
Packet: `.agents/packets/192-director-playability-sprint.json`

## Contract

Keep the repair inside native `256x160` readability for existing handheld surfaces. Do not add route breadth, route ids, station pages, save fields, content packs, progression states, or new journal surfaces.

The main step should repair only these surfaces:

1. Filed Source to Shore / Dune Catch station routes page.
   - Proof seed: `output/lane-1-main-489-beta-integration-proof/filed-dune-catch-station.png`
   - State: `output/lane-1-main-489-beta-integration-proof/filed-dune-catch-station-state.json`
   - Target: the filed station page must have clear vertical separation between the station header/subtitle, tabs, route board, archive/atlas note, and support rows. The route title, filed state, three filed beats, and selected support must remain visible without text colliding or being clipped.

2. Fresh first-play notebook task notice.
   - Proof seed: `output/lane-1-main-489-beta-integration-proof/first-play-task.png`
   - State: `output/lane-1-main-489-beta-integration-proof/first-play-task-state.json`
   - Target: the first notice must visibly include the full carrier set: `dune grass`, `lee cover`, and `wrack line`. Avoid a single-line body that truncates the objective before all three are readable.

3. Source Shelter journal route card.
   - Proof seed: `output/lane-1-main-489-beta-integration-proof/source-shelter-journal.png`
   - State: `output/lane-1-main-489-beta-integration-proof/source-shelter-journal-state.json`
   - Target: the active route card must keep `Source Shelter`/`Rime Source`, the progress label, and the summary readable inside the card without right-edge clipping. Prefer layout compaction over copy changes.

4. Title bottom guidance.
   - Proof seed: `output/lane-1-main-489-beta-integration-proof/title.png`
   - State: `output/lane-1-main-489-beta-integration-proof/title-state.json`
   - Target: the bottom start hint and `START`/`MENU` buttons must all read cleanly without crowding the lower panel edge.

Use the filed Dune Catch world-map frame as the control proof, not as a repair target:

- `output/lane-1-main-489-beta-integration-proof/filed-dune-catch-world-map.png`

## Likely Files

- `src/engine/field-station-routes-page.ts`
- `src/engine/field-notice-overlays.ts`
- `src/engine/overlay-render.ts`
- `src/test/runtime-smoke.test.ts`
- focused layout tests only if the implementation adds a reusable layout helper

## Required Proof

Capture fresh native browser proof in:

- `output/lane-1-main-01-handheld-readability/`

Include:

- `title.png` and `title-state.json`
- `first-play-task.png` and `first-play-task-state.json`
- `filed-dune-catch-world-map.png` and `filed-dune-catch-world-map-state.json`
- `filed-dune-catch-station.png` and `filed-dune-catch-station-state.json`
- `source-shelter-journal.png` and `source-shelter-journal-state.json`
- `browser-errors.json`

## Verification

Minimum implementation checks:

- `npm run test -- src/test/runtime-smoke.test.ts src/test/field-season-board.test.ts src/test/field-requests.test.ts src/test/journal-selector.test.ts`
- `npm run build`
- native browser proof listed above
- `npm run validate:agents` after queue or packet edits

Run broader tests if the repair touches shared layout helpers used outside these surfaces.

## Handoff

Promote `ECO-20260514-main-01` to `READY`. Keep lane 2 parked behind `ECO-20260514-critic-01`.
