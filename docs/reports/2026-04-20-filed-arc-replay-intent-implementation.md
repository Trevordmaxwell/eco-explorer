# Filed Arc Replay Intent Implementation

Created: 2026-04-20

## Queue Item

- Completed: `ECO-20260420-main-357`
- Packet: `.agents/packets/137-filed-arc-epilogue-and-replay-intent.json`
- Lane: `lane-4`

## Summary

This pass is intentionally test-only. The shipped filed `High Pass` state already keeps route replay inactive, so the implementation tightened the regression surface instead of adding a new replay feature or player-facing state.

The filed route-board test now explicitly asserts that completed `High Pass` has no target biome, no notebook-ready return, and no replay note. The field-request state test now also asserts no in-field notebook hint appears after filing, while preserving the existing proof that pre-filed / active `High Pass` can still show `Today: High Pass`. The filed save-snapshot tests now lock the same `notebookReady: null` and `replayNote: null` state and confirm the optional revisit invitation remains on the expedition surface.

## Guardrails Preserved

- No player-facing copy changed.
- No save schema, route definition, route filing, support behavior, station page/UI, geometry, science copy, new route task, or new replay UI changed.
- Optional revisit intent stays on the filed expedition surface: `Current field arc filed. Revisit when you want a quiet pass.`
- Filed `High Pass` still suppresses active request, active outing, journal request, route marker location, in-field notebook hint, and world-map route replay label.

## Verification

- `npm test -- --run src/test/field-season-board.test.ts src/test/field-requests.test.ts src/test/save-snapshots.test.ts`
- `npm run build`
- `npm run validate:agents`
- `git diff --check`
