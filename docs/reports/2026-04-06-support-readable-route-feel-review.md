# Support-Readable Route Feel Review

- Queue item: `ECO-20260406-critic-298`
- Packet: `123-support-readable-route-feel-phase`
- Reviewer: `lane-4 runner acting as critic-agent`
- Date: `2026-04-06`

## Verdict

No blocking findings.

## What Holds Up

- The cue stays inside the existing top-right `NOTEBOOK J` chip, so the route-feel pass remains tiny and does not widen the support row, notebook strip, or inspect bubble.
- The implementation reuses the extracted inspect-target seam instead of duplicating route-specific selection logic in `game.ts`, which keeps the new behavior easier to extend and easier to audit.
- Focused runtime proof now covers both protected examples: `Thaw Window` on the thaw-skirt shelf and `Held Sand` on the back-dune shelf. In both cases, `hand-lens` shows the support-biased hint while non-`hand-lens` supports keep the plain hint state.

## Watch Item

- `supportBiasActive` now effectively means the live selected inspect target is an active preferred `hand-lens` clue, which is slightly broader than the original wording about strictly overriding the raw nearest target. That is fine for this tiny cue, but if a later pass needs both concepts separately, split the flag before building more UI behavior on top of it.

## Verification

- Reviewed `src/engine/field-request-state.ts`, `src/engine/field-request-controller.ts`, `src/engine/overlay-render.ts`, `src/engine/game.ts`, `src/test/field-request-controller.test.ts`, and `src/test/runtime-smoke.test.ts`.
- Re-ran `npx vitest run src/test/field-request-controller.test.ts src/test/runtime-smoke.test.ts -t "woolly lousewort|Held Sand clue|thaw-window bloom|beach grass as the Held Sand clue|nearer thaw-skirt inspectable|nearer back-dune inspectable"`.
