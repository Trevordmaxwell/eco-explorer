# 2026-03-29 Field-Request Layer Review

## Scope

Reviewed `ECO-20260329-main-52` against packet `021`, the standing critic brief, focused tests, full tests, build output, the shared web-game Playwright client, and a live browser pass at the shipped `256x160` baseline.

Files checked most closely:

- `src/engine/field-requests.ts`
- `src/engine/game.ts`
- `src/engine/overlay-render.ts`
- `src/engine/save.ts`
- `src/test/field-requests.test.ts`
- `src/test/runtime-smoke.test.ts`

## Findings

No blocking findings.

The shipped layer stays inside the product guardrails:

- The request model is small, authored, and sequential rather than opening a stacked quest log or generalized task system. The live request set in `src/engine/field-requests.ts:56` stays forest-first, ecology-grounded, and keyed to real evidence already present in the biome.
- Completion is derived from existing state seams instead of inventing a second progression model. `src/engine/game.ts:665`, `src/engine/game.ts:692`, `src/engine/game.ts:989`, `src/engine/game.ts:1185`, and `src/engine/game.ts:1769` route biome-entry, zone, and inspect progress through one completion helper backed by persistent request ids in `src/engine/save.ts:70` and `src/engine/save.ts:201`.
- The journal surface remains notebook-like. The active task is shown as one compact footer card in `src/engine/overlay-render.ts:651` and `src/engine/overlay-render.ts:812`, and the in-biome completion toast in `src/engine/overlay-render.ts:572` stays smaller than the field-guide and partner surfaces instead of turning into a permanent HUD row.
- The runtime smoke path now proves the intended loop: journal shows `Hidden Hollow`, entering `root-hollow` records it, and the next active request becomes `Moisture Holders` without breaking determinism or save persistence. That coverage lives in `src/test/runtime-smoke.test.ts`.

## Notes

One visual regression showed up during review: the journal’s empty-page branch originally returned before drawing the request footer. That is already fixed in `src/engine/overlay-render.ts:812`, and the follow-up browser capture now shows the footer card on an empty forest page as intended.

## Outcome

`ECO-20260329-critic-29` can close.

The pass is clean enough to promote `ECO-20260329-main-53`.
