# Filed-Note Synthesis Matrix Implementation

Created: 2026-04-20

Queue item: `ECO-20260420-main-339`

## Result

Implemented the lane-2 filed-note synthesis guardrail for packet `133` as a test-only pass. No runtime route behavior, station filing, support behavior, map travel, save schema, geometry, discoveries, facts, or player-facing UI changed.

## Changes

- Added a Route v2 note-copy quality guard in `src/test/content-quality.test.ts`.
- The guard asserts the 11 live filed-note route ids exactly, then checks `readyText`, `filedText`, `clueBackedTail`, and `displayPrefix` against explicit handheld budgets.
- The same guard checks relationship anchors for each route segment, including shelter, moisture, transition, thaw-window, open-fell, hollow-return, and exposed-High-Pass language.
- Added a table-driven filed-note synthesis matrix in `src/test/field-requests.test.ts`.
- The matrix seeds `routeV2Progress` for each live filed-note route, resolves filed and display text, keeps generated strings under a current-safe `144` character ceiling, and confirms the `Thaw Window.` prefix stays display-only.

## Verification

Passed:

- `npx vitest run src/test/content-quality.test.ts src/test/field-requests.test.ts -t "route|filed|content quality|synthesis"`
- `npx vitest run src/test/content-quality.test.ts src/test/field-requests.test.ts`

Attempted:

- `npm run build`

Build did not complete because of unrelated in-progress lane edits outside this lane-2 change:

- `src/test/field-requests.test.ts` currently has unused lane-4 route-matrix helpers: `RouteVariantMatrixCase`, `setRouteMatrixZone`, `expectFiledTextIncludes`, and `createRouteMatrixCases`.
- `src/test/runtime-smoke.test.ts` currently has unrelated `game` drift: one unused local and one missing name.

## Handoff

`ECO-20260420-critic-339` should review the new lane-2 tests and confirm the build blocker is unrelated rather than widening this lane into lane-4/runtime-smoke repair work.
