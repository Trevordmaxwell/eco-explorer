# Science Source-Ledger Tooling Implementation

Date: 2026-04-20
Queue: `ECO-20260420-main-386`
Packet: `.agents/packets/145-science-source-ledger-audit.json`
Lane: `lane-1`

## Result

Added a named `science:check` package script for the focused source-ledger/content-quality gate and wired review-drop verification to run it before the full test suite.

## Changes

- `package.json` now exposes `npm run science:check` as `vitest run --run src/test/content-quality.test.ts`.
- `scripts/verify-review-drop.mjs` now requires `docs/science-source-ledger.md` and `src/test/content-quality.test.ts` in review archives.
- `scripts/verify-review-drop.mjs` now runs `npm run science:check` after agent validation and before full `npm test`.
- `docs/review-drop-checklist.md` now calls out the source-ledger proof as a local pre-pack command and clean extract proof step.

## Scope Kept Out

No authored science copy, source-ledger rows, content rosters, content-quality assertions, station/runtime behavior, route behavior, world-map behavior, save schema, geometry, or UI changed for this lane-1 pass.

## Verification

```bash
npm run science:check
node --check scripts/verify-review-drop.mjs
npm run validate:agents
npm run build
git diff --check
```

All checks passed. Agent validation still reports only the known work-queue size warning.
