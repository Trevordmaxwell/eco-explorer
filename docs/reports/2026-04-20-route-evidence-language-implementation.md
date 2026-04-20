# Route Evidence Language Implementation

Date: 2026-04-20
Queue: `ECO-20260420-main-389`
Packet: `.agents/packets/145-science-source-ledger-audit.json`
Lane: `lane-4`

## Changed

- Softened `beach-shore-shelter` filed-note language from `shelter grows from dune edge to tide line` to `mark shelter from dune edge to tide line`.
- Softened `coastal-shelter-shift` filed-note language from `coast settling into forest-edge shelter` to `mark open coast meeting forest-edge shelter`.
- Updated route filed-note matrix expectations so clue-backed generated text preserves the new observation-led phrasing.
- Updated the content-quality route-note guard so the two overclaim phrases cannot quietly return.

## Preserved

- No source-ledger rows changed; lane 2 already closed packet `145` ledger coverage.
- No route progression, evidence slots, active route titles, ready text, support behavior, station behavior, world-map behavior, save/schema behavior, geometry, or UI changed.
- The changed notes remain one sentence and stay inside the compact filed-note budget.

## Verification

All listed checks passed. Agent validation still reports only the known work-queue size warning.

```bash
npm test -- --run src/test/field-requests.test.ts -t "route-state matrix|filed-note|Shore Shelter|Open To Shelter"
npm run science:check
npm run build
npm run validate:agents
git diff --check
```
