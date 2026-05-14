# Filing Depth And Catalog Guardrails Implementation

Date: 2026-04-28
Queue: `ECO-20260428-main-486`
Lane: `lane-4`
Owner: `main-agent`

## Summary

Added a focused route catalog authoring guard without changing route runtime behavior.

## Changes

- Added `src/test/field-request-catalog.test.ts` to check Route v2 definitions directly for unique route ids, canonical `NOTEBOOK READY` copy, evidence-slot uniqueness, exact `slotOrder` coverage, clue-backed filed-note tails, active replay labels staying out of canonical filed text, and active alternate clue references pointing at real route slots and biome entries.
- Updated `docs/content-authoring.md` to document the filed-text, display-prefix, and active-alternate boundary for future route authors.

## Verification

- `npm test -- --run src/test/field-request-catalog.test.ts`
- `npm test -- --run src/test/field-requests.test.ts -t "full-arc filed-note synthesis matrix|route variants"`
- `npm run build`

## Boundaries

No route ids, evidence ids, ordered slots, support behavior, filed states, save schema, station shell, content, geometry, route framework, support system, planner, or Source to Shore beat count changed.

## Handoff

Promote `ECO-20260428-critic-486` to review the test/docs-only catalog guardrail and decide whether packet `179` can close.
