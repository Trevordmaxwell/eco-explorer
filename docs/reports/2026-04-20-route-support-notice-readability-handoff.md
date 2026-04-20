# Route Support Notice Readability Handoff

Date: 2026-04-20
Queue: `ECO-20260420-scout-397`
Packet: `.agents/packets/147-kid-readability-and-input-accessibility.json`
Lane: `lane-4`

## Finding

Route-ready notices already give a clear recovery action. `Shore Shelter` names `M -> Field station` plus `Enter`, while the other Route v2 ready notices point back to the field station and name the note to file.

The remaining lane-4 kid-readability gap is the support-toggle toast copy in `getOutingSupportNoticeText(...)`. The current `hand-lens` toast says `Tags notebook-fit clues.`, which exposes an internal helper phrase instead of a kid-facing action. This is the smallest safe packet-147 implementation target because the copy is centralized, already covered by a focused test, and does not require changing route behavior, support cycling, station state, save shape, world-map focus, or geometry.

## Recommended Main Scope

- Update only `getOutingSupportNoticeText(...)` in `src/engine/field-request-controller.ts`.
- Replace the `hand-lens` support toast with plain action language such as `Highlights next notebook clue.` or similarly short wording.
- Optionally tighten `note-tabs` to a clearer route-facing benefit, but keep all support toasts at five words or fewer.
- Update the existing `returns the support notice copy from one helper seam` test in `src/test/field-request-controller.test.ts`.
- Add a small guard in that test rejecting `notebook-fit` and hyphenated helper terms in support-toggle notices.
- Add a dated implementation report.

## Non-Goals

- Do not change support ids, support cycling order, support unlocks, route targeting, route definitions, filed-note synthesis, station pages, world-map focus, save schema, notice timer behavior, geometry, or broad content copy.
- Do not rewrite inspect-bubble `Notebook fit:` labels in this pass; that would be a wider route-support language decision and is outside the tiny support-toggle toast fix.

## Suggested Verification

- `npm test -- --run src/test/field-request-controller.test.ts -t "support notice copy"`
- `npm run build`
- `npm run validate:agents`
- `git diff --check`
