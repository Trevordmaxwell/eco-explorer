# Lane 4 Alpha Route/Support Signoff Handoff

Date: 2026-04-20
Queue: `ECO-20260420-scout-437`
Packet: `.agents/packets/157-alpha-release-candidate-and-scope-gate.json`
Lane: `lane-4`

## Finding

Lane 4 does not need another route behavior change for packet `157`. The current route proof is already spread across the reviewer checklist, the full-arc route-state matrix, and runtime smoke slices:

- `docs/reports/2026-04-20-alpha-route-playthrough-checklist.md` gives reviewers the human-readable route spine from `Shore Shelter` through filed `High Pass`.
- `docs/reports/2026-04-20-full-arc-route-state-matrix-review.md` confirms the matrix covers all 11 live Route v2 notebook routes through active, progress, ready-to-file, filing, and next-state handoff.
- `runtime-smoke.test.ts` includes a live `High Pass` talus-hold filing smoke that verifies filed notice, cleared active request, cleared route marker/replay label, and cleared journal request.
- Packet `156` lane 4 just added/cleared the remaining `Open To Shelter` route-marker-vs-ready suppression guard.

The final lane-4 RC step should therefore be a source-facing signoff report that reruns focused route/support smoke, records the current proof map, and names a disciplined post-alpha opportunity list. It should not reopen route definitions, support UI, station pages, geometry, or broad copy while lane 1 owns the actual `alpha:rc` packaging command.

## Recommended Main Scope

Recommended file:

- `docs/reports/2026-04-20-lane-4-alpha-route-support-signoff.md`

Recommended implementation:

- Create the signoff report with three sections:
  - `Final route proof`: cite the checklist, full-arc matrix, High Pass live filing smoke, and packet `156` ready-to-file suppression guards.
  - `Verification run`: record focused route/state/runtime commands and results.
  - `Post-alpha route/support opportunities`: name only narrow lane-4 next moves, each explicitly deferred until after the RC.
- Keep the report evidence-based: if a focused command fails, do not broaden scope; document the failure and leave `main-437` blocked or incomplete with the exact failing command.
- Update packet `157` with the lane-4 main result and promote `ECO-20260420-critic-437` only if the focused route/support checks pass.

## Suggested Post-Alpha Opportunity List

- Keep every future Route v2 addition coupled to the full-arc route-state matrix row at the same time the route definition lands.
- Continue extracting support-biased inspect targeting out of `game.ts` into the route/controller seam rather than adding another coordinator wrapper.
- Improve replay surfacing only through existing labels such as the world-map footer or route board, not a new route HUD.
- If a next chapter opens, make it one expedition-grade route with clear notebook filing rather than compressing a fourth full field-season route onto the current board.
- Preserve the active-vs-ready contract: active outings may guide and replay; ready-to-file states should route attention back to station filing.

## Non-Goals

- Do not edit route runtime, route definitions, save schema, station pages, world-map rendering, support UI, geometry, science content, broad copy, review packaging, or `alpha:rc` scripts.
- Do not run or require full `npm test` for this lane-4 item; packet `157` lane 1 owns the full-suite RC gate after lane-2/lane-3 blockers clear.
- Do not touch lane-2 High Pass rime-footing copy or lane-3 screenshot/contact-sheet work.

## Suggested Verification

```bash
npm test -- --run src/test/field-requests.test.ts -t "Route v2|High Pass|Open To Shelter|Shore Shelter|route-marker|replay"
npm test -- --run src/test/field-requests.test.ts
npm test -- --run src/test/runtime-smoke.test.ts -t "High Pass|Open To Shelter|Shore Shelter|Route|routes page|filed"
npm run validate:agents
node -e "JSON.parse(require('fs').readFileSync('.agents/packets/157-alpha-release-candidate-and-scope-gate.json','utf8')); console.log('packet 157 ok')"
git diff --check
```
