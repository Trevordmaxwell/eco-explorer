# First-Session Onboarding Copy Handoff

Created: 2026-04-20

Queue item: `ECO-20260420-scout-335`

## Goal

Prepare the lane-2 implementation slice for packet `132`: tighten the first-session copy around `J`, `M`, `Enter`, the field station, `Shore Shelter`, and the first filed note without adding a tutorial panel or changing route/menu behavior.

## Current Read

The first-session structure is already close. The title teaches `J`, `M`, and `Enter`; the menu defaults are handled by lane 1; and the route loop already has a fresh-save `NOTEBOOK TASK`, a field-station season note, a `Shore Shelter` route definition, and a `NOTEBOOK READY` return cue.

The lane-2 risk is wording, not systems:

- The title hint says `START, THEN OPEN MENU FOR MAP OR STATION.` but does not name `M` directly.
- The first `NOTEBOOK TASK` says `log dune grass to wrack line`, which assumes the player already understands notebook filing.
- The first route summary uses hyphenated clue labels such as `dune-grass`, `lee-cover`, and `wrack-line`, while other surfaces use friendlier spaced language.
- The first ready-to-file line says to return to the field station, but it does not reinforce the learned `M -> Field station -> Enter` path.
- The menu copy is already structurally useful, so this pass should tune wording only and avoid changing focus defaults or action availability.

## Recommended Main Slice

`ECO-20260420-main-335` should make a copy-only pass across the existing first-session seams:

- `src/engine/overlay-render.ts`: tighten `TITLE_START_HINT`, `getMenuOverlayIntroText()`, and `getMenuOverlayHelperText()` so `M`, `J`, `Enter`, world-map travel, and field-station filing/support read as one loop.
- `src/engine/guided-field-season.ts`: make the fresh-save `FIRST FIELD SEASON` and `NOTEBOOK TASK` lines more player-action-facing and less jargon-heavy.
- `src/engine/field-requests.ts`: update only the `beach-shore-shelter` summary and `routeV2Note.readyText` so the first ready note points back through `M -> Field station -> Enter`.
- `src/engine/field-season-board.ts`: align the first `Shore Shelter` beat detail with the revised field-request copy if the wording would otherwise diverge.
- Update exact-copy tests in `src/test/overlay-copy.test.ts`, `src/test/guided-field-season.test.ts`, `src/test/field-season-board.test.ts`, and the first-session slice of `src/test/runtime-smoke.test.ts`.

## Suggested Copy Direction

These are directionally safe wording shapes, not mandatory strings:

- Title hint: name `M` directly, for example `START, THEN M FOR MAP OR STATION.`
- Menu intro with map and station visible: pair travel with filing/support, not just generic support.
- First notice: use simple physical actions such as `inspect dune grass, lee cover, and wrack line` before saying `log`.
- First ready note: explicitly connect `M`, `Field station`, and `Enter` to filing the `Shore Shelter` note.
- Keep `J` framed as the notebook/journal surface, but do not force every notice to mention every key.

## Non-Goals

- Do not change menu selection defaults, action availability, route progression, save state, station state, or world-map behavior.
- Do not add a tutorial panel, new overlay, new route objective, or new HUD.
- Do not rewrite broader route prose after `Shore Shelter`.
- Do not touch biome geometry, content density, science facts, or source-ledger coverage.

## Acceptance For Main

- Fresh-save title/menu/guided-season/first-route copy reads as one loop: `J` for notebook, `M` for map/station, `Enter` to choose or file.
- The first `Shore Shelter` route text uses kid-readable clue language instead of token-like hyphenated wording where player-facing.
- The first ready-to-file line clearly tells the player how to return to the field station and file the note.
- Existing behavior remains unchanged apart from copy and exact-copy tests.
- Run focused exact-copy tests plus `npm run validate:agents` and `git diff --check`; run `npm run build` if runtime TypeScript files change.

## Handoff

Promote `ECO-20260420-main-335` to `READY`.
