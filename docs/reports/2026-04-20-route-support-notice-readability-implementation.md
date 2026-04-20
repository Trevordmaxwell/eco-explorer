# Route Support Notice Readability Implementation

Date: 2026-04-20
Queue: `ECO-20260420-main-397`
Packet: `.agents/packets/147-kid-readability-and-input-accessibility.json`
Lane: `lane-4`

## Changes

- Updated `getOutingSupportNoticeText(...)` so `hand-lens` now says `Highlights notebook clues.` instead of exposing the internal `notebook-fit` helper term.
- Updated the `note-tabs` toast to `Keeps route aim visible.` so the support benefit is route-facing and short.
- Extended the focused support notice test to keep every toast at five words or fewer and reject `notebook-fit` or hyphenated helper terms.

## Scope Notes

- No support ids, cycling order, unlock rules, route targeting, route definitions, station pages, world-map focus, save schema, notice timers, geometry, filed-note synthesis, or broad content copy changed.
- The existing inspect-bubble `Notebook fit:` label was intentionally left unchanged; this pass only covers the support-toggle toast.

## Verification

- `npm test -- --run src/test/field-request-controller.test.ts -t "support notice copy"`
- `npm run build`
