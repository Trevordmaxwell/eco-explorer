# Handheld Readability Repair

Date: 2026-05-14
Role: main-agent
Lane: lane-1
Queue: `ECO-20260514-main-01`
Packet: `.agents/packets/192-director-playability-sprint.json`

## Result

Verdict: ready for critic review.

The lane-1 handheld readability repair stayed inside the existing title, station, notice, and journal surfaces. It did not add route ids, route breadth, station pages, save fields, content packs, progression state, or new journal surfaces.

## Changes

- Wrapped the field-request notice body to two short lines so the fresh first-play Shore Shelter task shows `dune grass`, `lee cover`, and `wrack line`.
- Shortened the title screen bottom hint to `START: M MAP/STATION.` so the hint and `START`/`MENU` buttons fit cleanly at native scale.
- Tightened the filed Source to Shore station route page only when `source-to-shore-beta` is complete, preserving the filed route board, three done beats, atlas/archive note, and selected support while omitting the regular upgrade rows from that compact filed page.
- Let journal route cards stack a long progress label beneath the route title when the full label fits the card width but not the old side-by-side title row.
- Added focused runtime smoke coverage for the first-play notice text, filed Source to Shore compact station page, and Source Shelter journal route progress label.

## Native Proof

Fresh proof is in `output/lane-1-main-01-handheld-readability/`:

- `title.png` / `title-state.json`
- `first-play-task.png` / `first-play-task-state.json`
- `filed-dune-catch-world-map.png` / `filed-dune-catch-world-map-state.json`
- `filed-dune-catch-station.png` / `filed-dune-catch-station-state.json`
- `source-shelter-journal.png` / `source-shelter-journal-state.json`
- `browser-errors.json`

All five PNGs are native `256x160`. `browser-errors.json` reports zero errors and zero warnings.

Additional shared web-game client proof is in `output/lane-1-main-01-web-game-client/`; it starts the game, captures the first playable frame with the notebook task visible, and records the matching `render_game_to_text` state.

## Verification

- `npm run test -- src/test/runtime-smoke.test.ts src/test/field-season-board.test.ts src/test/field-requests.test.ts src/test/journal-selector.test.ts` passed (`8` files, `584` tests).
- `npm run build` passed.
- Shared browser-game client pass against `http://127.0.0.1:4173/` passed with visible first-play notice proof.
- Native browser proof was visually inspected at `256x160`.

## Handoff

Promote `ECO-20260514-critic-01` for the visual gate review. Keep lane 2 parked until that review decides whether breadth can open.
