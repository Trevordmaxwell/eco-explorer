# Journal And Atlas Systems Budget Handoff

Date: 2026-04-20
Queue: `ECO-20260420-scout-382`
Packet: `.agents/packets/144-journal-atlas-copy-budget-sweep.json`
Lane: `lane-1`

## Recommendation

Make the lane-1 packet `144` implementation a test-only budget guard in `src/test/field-season-board.test.ts`. The test should protect station-facing route, atlas, wrap, and active-outing strings that can also feed the quiet journal outing card, without editing authored science copy or adding notebook/station panels.

Why this slice:

- Lane 2 has already lowered the ecosystem-note summary budget to `96` and trimmed the packet-scoped content summaries, so lane 1 should not reopen `src/content/**`.
- `drawFieldStationRoutesPage(...)` already applies `fitTextToWidth(...)` to the routes strip, atlas strip, route title, board summary, beat labels, launch-card detail, and support rows. The risk now is silent upstream copy creep, not missing a renderer truncation helper.
- `resolveSeasonOutingLocator(...)` is the lane-1-owned seam that can become the fallback journal outing card when no active field request exists. Its `summary`, `worldMapLabel`, `routeBoardSummary`, and `atlasNote` should stay compact enough to share across station, journal, and map-facing surfaces.
- `src/test/field-season-board.test.ts` already contains representative route, atlas, expedition, wrap, High Pass, and exact-copy states, making it the smallest place to add a table-driven guard without wiring new UI proof.

## Main-Agent Scope

Update only:

- `src/test/field-season-board.test.ts`
  - add a small helper such as `expectCopyBudget(label, text, max)`
  - add a table-driven test covering representative station phases and selected supports
  - keep the test at the resolver level: `resolveFieldSeasonBoardState(...)`, `resolveFieldSeasonWrapState(...)`, `resolveFieldAtlasState(...)`, and `resolveSeasonOutingLocator(...)`

Recommended current-safe budgets:

- `seasonWrap.label <= 24`
- `seasonWrap.text <= 96` for non-notebook-ready station wrap states
- `atlas.note <= 64`
- `routeBoard.summary <= 96`
- `routeBoard.launchCard.summary <= 72`
- `routeBoard.launchCard.detail <= 72` if a future launch card adds detail
- `activeOuting.summary <= 86`
- `activeOuting.worldMapLabel <= 32`
- `activeOuting.atlasNote <= 64`

Recommended representative save states:

- fresh beach starter
- `beach-shore-shelter` logged with `note-tabs`
- coastal line logged / inland route opener with atlas present
- inland line logged / edge-pattern opener with atlas present
- edge line logged before `ROOT HOLLOW`
- Root Hollow evidence counts `1`, `2`, `3`, and notebook-ready
- Root Hollow filed / Season Threads active
- Season Threads filed / High Pass active
- High Pass ready-to-file
- High Pass filed

The test may use a tiny local save builder per row. Prefer checking only strings that lane 1 owns or projects through lane-1 station/outing seams. Do not budget-lock `routeBoard.notebookReady.previewText` in this slice; route filing and notebook-ready display inheritance belongs to packet `144` lane 4.

## Preserve

- no production runtime changes unless the new guard exposes an actual over-budget lane-1 string
- no new notebook, atlas, station, route, map, HUD, or planner panel
- no edits to `src/content/**`
- no edits to ecosystem-note summaries, filed Route v2 note synthesis, comparison cards, close-look copy, or science ledger entries
- no station layout, render-coordinate, save-schema, route-controller, world-map, corridor, traversal, or High Pass route-state behavior changes

## Verification

Expected checks after implementation:

```bash
npm test -- --run src/test/field-season-board.test.ts
npm run build
npm run validate:agents
git diff --check
```

Scout baseline:

```bash
npm test -- --run src/test/field-season-board.test.ts
```

Baseline result: passed, `2` files and `105` tests.
