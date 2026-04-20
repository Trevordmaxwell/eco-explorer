# Journal And Atlas Route Preview Handoff

Date: 2026-04-20
Queue: `ECO-20260420-scout-385`
Packet: `.agents/packets/144-journal-atlas-copy-budget-sweep.json`
Lane: `lane-4`

## Recommendation

Make the lane-4 packet `144` implementation a behavior-neutral, test-only guard for the station `NOTEBOOK READY` bridge in `src/test/field-season-board.test.ts`.

The exact gap is small:

- Lane 1 intentionally budget-locked station, atlas, wrap, launch-card, and active-outing strings but left `routeBoard.notebookReady.previewText` to lane 4.
- Lane 2 kept route filed-note copy untouched.
- `src/test/field-requests.test.ts` already protects generated Route v2 filed/display text at `<= 144` characters, but it does not prove the station board and `note-tabs` wrap inherit that shortened display text.
- `src/test/field-season-board.test.ts` has exact preview checks for a few ready routes, but not a compact route-preview budget matrix across the board-mapped Route v2 filing states.

## Main-Agent Scope

Update only:

- `src/test/field-season-board.test.ts`

Recommended test:

- Add a table-driven test for board-mapped ready Route v2 notes:
  - `beach-shore-shelter`
  - `forest-hidden-hollow`
  - `forest-moisture-holders`
  - `coastal-shelter-shift`
  - `treeline-stone-shelter`
  - `tundra-short-season`
  - `scrub-edge-pattern`
  - `forest-cool-edge`
  - `treeline-low-fell`
- For each row, build the smallest legitimate `ready-to-synthesize` save, resolve `resolveFieldSeasonBoardState(...)`, then assert:
  - `routeBoard.notebookReady.requestId` matches the route
  - `previewLabel` is present, canonical, and `<= 24` characters
  - `previewText` is present and `<= 144` characters
  - `resolveFieldSeasonWrapState(..., "note-tabs")` returns the same label/text as the preview
  - non-`note-tabs` wrap keeps `NOTEBOOK READY` plus the route ready text
  - `tundra-short-season` preserves `previewLabel: "SHORT SEASON"` while the preview text starts with `Thaw Window.`

Keep `forest-expedition-upper-run` and `treeline-high-pass` out of this table. Those ready states use the expedition and High Pass chapter seams rather than `routeBoard.notebookReady`, and current snapshot/runtime coverage intentionally keeps High Pass ready-to-file on the launch-card path.

## Preserve

- No production runtime changes unless the test exposes an actual inheritance bug.
- No route filed-note rewrites, broad copy edits, new station/notebook panels, new support surfaces, save schema changes, world-map behavior changes, corridor/traversal changes, science ledger churn, or High Pass chapter-state rewiring.
- Do not widen `getRouteBeatIdForRequest(...)` for Root Hollow or High Pass as part of this budget pass unless a failing test proves the current seam is wrong.

## Verification

Scout baseline passed:

```bash
npm test -- --run src/test/field-season-board.test.ts -t "notebook-ready|preview|copy budgets|High Pass"
npm test -- --run src/test/field-requests.test.ts -t "filed-note synthesis matrix|High Pass|Thaw Window"
```

Expected after implementation:

```bash
npm test -- --run src/test/field-season-board.test.ts -t "notebook-ready|preview|copy budgets|High Pass"
npm test -- --run src/test/field-requests.test.ts -t "filed-note synthesis matrix|High Pass|Thaw Window"
npm run build
npm run validate:agents
git diff --check
```
