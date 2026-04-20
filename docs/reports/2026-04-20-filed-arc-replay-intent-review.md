# Filed Arc Replay Intent Review

Created: 2026-04-20

## Queue Item

- Completed: `ECO-20260420-critic-357`
- Reviewed: `ECO-20260420-main-357`
- Packet: `.agents/packets/137-filed-arc-epilogue-and-replay-intent.json`
- Lane: `lane-4`

## Verdict

No blocker.

The implementation stayed exactly in the narrow lane-4 contract: it made the filed-arc replay intent explicit through regression coverage rather than introducing a new route task, replay UI, copy change, or save behavior. Filed `High Pass` is now better protected against accidentally regaining active-route surfaces after the arc is complete.

## Checks

- Filed route-board coverage now explicitly asserts `complete: true`, `targetBiomeId: null`, `notebookReady: null`, and `replayNote: null`.
- Filed field-request state still has no active request, active outing, journal request, route-marker location, in-field notebook hint, or world-map replay label even when `route-marker` remains selected and Treeline is focused.
- Existing pre-filed and active `High Pass` coverage still proves `Today: High Pass` can appear before filing.
- Filed snapshot coverage keeps the optional revisit invitation on the expedition surface and does not create a task.
- No player-facing copy, save schema, route definition, route filing behavior, support behavior, station page/UI, geometry, new replay UI, season-three promise, or authored science/copy changed.

## Verification

- `npm test -- --run src/test/field-season-board.test.ts src/test/field-requests.test.ts src/test/save-snapshots.test.ts`
- `npm run build`
- `npm run validate:agents`
- `git diff --check`
