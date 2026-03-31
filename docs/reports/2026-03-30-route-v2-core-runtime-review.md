# Route V2 Core Runtime Review

## Scope

Review of `ECO-20260330-main-109` for save safety, station-shell overlap, readability, and whether the new Route v2 seams stay compact enough for lane 4 to keep moving.

## Result

No blocking issues found.

The core is small enough to proceed into the first forest Route v2 conversion. The implementation reuses the current station shell instead of opening a parallel quest or notebook layer, and the added save state is narrow enough to migrate safely.

## What Landed Cleanly

- `SaveState` now carries one narrow Route v2 progress seam plus one persisted outing-support selection instead of opening a second request ledger or route-tracking surface.
- `field-requests` now owns the Route v2 request shapes and progression helpers, which keeps most beat logic out of station rendering code.
- The ready-to-synthesize flow reuses the existing `ROUTES` page and one `Enter` press to file the note, which matches the lane guardrail to keep the station shell compact.
- Coverage now exercises save normalization, synthetic Route v2 request progression, notebook-ready board state, the one-press filing flow, the focused Route v2 test set, full `npm test`, and `npm run build`.

## Watch Items

- `shouldCompleteActiveFieldRequest()` now delegates through the mutating Route v2 advance path. Nothing live depends on that helper as a pure predicate right now, but future lane-4 work should prefer `advanceActiveFieldRequest()` directly or retire the older helper once the forest pilot is converted.
- `src/engine/game.ts` absorbed more request and station branching in this pass. It is still readable, but the next Route v2 conversions should keep pushing route-specific rules into `field-requests` or small route helpers instead of letting `game.ts` become the long-term home for each new beat type.

## Recommendation

Mark `ECO-20260330-critic-84` clean and promote `ECO-20260330-main-110` to `READY`.
