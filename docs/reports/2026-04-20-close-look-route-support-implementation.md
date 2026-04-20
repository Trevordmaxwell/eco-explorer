# Close-Look Route Support Implementation

Date: 2026-04-20
Queue: `ECO-20260420-main-393`
Packet: `.agents/packets/146-close-look-sketchbook-selected-refresh.json`
Lane: `lane-4`

## Summary

Implemented the packet `146` lane-4 pass as behavior-neutral runtime proof. No route logic, close-look data, support choice behavior, station surfaces, save fields, world-map cues, geometry, or player-facing copy changed.

## What Changed

- Extended the existing `Open To Shelter` route smoke flow so `shore-pine` proves both route evidence and optional close-look context.
- Extended the existing `Root Hollow` route smoke flow so `root-curtain` proves both route evidence and optional close-look context.
- Both proofs assert the normal inspect claims the Route v2 evidence slot before any close-look action.
- Both proofs open and close the selected close-look card from the bubble, then assert route progress remains unchanged.

## Verification

- `npm test -- --run src/test/runtime-smoke.test.ts -t "Open To Shelter outing|forest expedition slot"`
- `npm test -- --run src/test/close-look.test.ts -t "shore-pine|root-curtain|supported entries|compact payload"`
- `npm run build`
- `npm run validate:agents`
- `git diff --check`

## Handoff

Ready for lane-4 critic review. The critic should confirm this stayed test-only and did not turn close-look or sketchbook into a route gate.
