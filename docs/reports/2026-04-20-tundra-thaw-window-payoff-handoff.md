# Tundra Thaw Window Payoff Handoff

Created: 2026-04-20

## Queue Item

- Completed: `ECO-20260420-scout-373`
- Packet: `.agents/packets/141-tundra-thaw-window-payoff-pass.json`
- Lane: `lane-4`

## Recommendation

Add a test-only station/notebook payoff proof for active `Thaw Window` evidence. The support targeting path is already well covered for `woolly-lousewort` and `bigelows-sedge`; the useful missing lane-4 guard is that a ready-to-synthesize `Short Season` note carrying those active-window clues shows the active carrier names in the existing `note-tabs` filing preview and season wrap.

## Main-Agent Scope

- Edit `src/test/field-season-board.test.ts` only, plus normal report/packet/queue/progress updates.
- Add a focused test near the existing `adds the thaw-window page stamp to the short-season note-tabs preview` coverage.
- Seed `selectedOutingSupportId = 'note-tabs'`, completed route ids through `treeline-stone-shelter`, and `routeV2Progress` for `tundra-short-season` as `ready-to-synthesize`.
- Use active-window evidence slots:
  - `first-bloom` / `woolly-lousewort`
  - `wet-tuft` / `bigelows-sedge`
  - `brief-fruit` / `cloudberry`
- Assert `routeBoard.notebookReady.previewLabel` stays `SHORT SEASON`.
- Assert preview and wrap text include the display prefix and active evidence names: `Thaw Window. Woolly Lousewort, Bigelow's Sedge, and Cloudberry trace the tundra's short thaw window.`
- Keep this behavior-neutral unless the test exposes a real mismatch.

## Guardrails

- Do not change `src/engine/field-requests.ts`, route definitions, slot order, `processFocus`, display prefix, filed-note behavior, support targeting, station layout, save schema, world-map focus, Tundra geometry, High Pass copy, science copy, or runtime source.
- Do not add a new route, station page, planner layer, support type, or replay system.
- Do not retune lane-2 `short-summer-rush` copy or lane-3 Tundra geometry.

## Baseline Verification

- `PASS npm test -- --run src/test/field-season-board.test.ts -t "thaw-window|Short Season|note-tabs preview"`
- `PASS npm test -- --run src/test/field-requests.test.ts -t "Thaw Window|tundra-short-season|Short Season"`
- `PASS npm test -- --run src/test/runtime-smoke.test.ts -t "Thaw Window|thaw-window|tundra survey place-tab"`

## Required Main Verification

- `npm test -- --run src/test/field-season-board.test.ts -t "thaw-window|Short Season|note-tabs preview"`
- `npm test -- --run src/test/field-requests.test.ts -t "Thaw Window|tundra-short-season|Short Season"`
- `npm run build`
- `npm run validate:agents`
- `git diff --check`
