# 2026-03-29 Field-Station Loop Review

## Scope

Reviewed `ECO-20260329-main-53` against packet `021`, the field-station handoff, focused tests, full tests, build output, the shared web-game Playwright client, and a live browser pass that opened the world-map station and bought `Trail Stride`.

Files checked most closely:

- `src/engine/field-station.ts`
- `src/engine/game.ts`
- `src/engine/overlay-render.ts`
- `src/engine/save.ts`
- `src/test/field-station.test.ts`
- `src/test/runtime-smoke.test.ts`

## Findings

No blocking findings.

The first loop stays inside the intended framing:

- Credit comes from documented fieldwork rather than direct specimen selling. `src/engine/field-station.ts:56`, `src/engine/field-station.ts:89`, and `src/engine/field-station.ts:99` only award support from survey milestones plus completed notebook requests, which keeps the economy tied to observation instead of extraction.
- The station stays world-map-context and ledger-light. `src/engine/game.ts:348`, `src/engine/game.ts:363`, and `src/engine/game.ts:1396` gate the new action to the world-map menu and keep the overlay out of the in-biome HUD, while `src/engine/overlay-render.ts:438` and `src/engine/overlay-render.ts:628` keep the menu and station surfaces compact.
- The upgrade is modest and readable. `src/engine/field-station.ts:25` defines only one first upgrade, and `src/engine/field-station.ts:178` plus `src/engine/game.ts:1731` apply it as a small walk-speed bump from `42` to `46` without changing jump feel or adding a broader power ladder.
- Persistence and one-way claiming are covered. `src/engine/save.ts` now keeps credit, claimed-credit ids, and purchased upgrades across reloads, while `src/test/field-station.test.ts` and `src/test/runtime-smoke.test.ts:502` prove that credit claims do not duplicate and that the purchased upgrade survives into live runtime state.

## Notes

The station overlay is necessarily dense at `256x160`, but the browser pass still reads cleanly enough: the ledger shows credit total, recent support, and the single upgrade without competing with active exploration because it only appears from world-map context.

## Outcome

`ECO-20260329-critic-30` can close.

Packet `021` is now clear of active main/critic steps.
