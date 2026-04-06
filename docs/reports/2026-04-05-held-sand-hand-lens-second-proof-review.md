# Held Sand Hand-Lens Second-Proof Review

Reviewed `ECO-20260405-critic-290` for lane 4.

## Findings

No blocking findings.

## Why This Still Reads Cleanly

- The second proof is player-felt in the live keyboard path, not only in controller state: on the same back-dune shelf, `hand-lens` pulls inspect to `beach-grass`, while `note-tabs` stays on the normal nearer inspectable.
- The new runtime proof reuses the already-authored `Held Sand` alternate carrier instead of adding more route logic, so the pattern still reads like a compact extension of the first `Thaw Window` win rather than a new subsystem.
- The tiny `nearestInspectableEntityId` debug export stays appropriately scoped. It exposes the live inspect target through the existing debug hook without changing player-facing behavior or widening the route shell.

## Watch Item

- Keep future runtime proofs on this same narrow shape: fixed-seed, route-local comparison shelves plus tiny debug-state reads only when the existing harness cannot truthfully see the live target. If more inspect-target proofs arrive later, consider grouping those debug fields under one dedicated inspect-debug object instead of growing the root state one field at a time.

## Verification

- Reviewed [game.ts](/Users/trevormaxwell/Desktop/game/src/engine/game.ts), [field-request-controller.test.ts](/Users/trevormaxwell/Desktop/game/src/test/field-request-controller.test.ts), [runtime-smoke.test.ts](/Users/trevormaxwell/Desktop/game/src/test/runtime-smoke.test.ts), and [2026-04-05-held-sand-hand-lens-second-proof-implementation.md](/Users/trevormaxwell/Desktop/game/docs/reports/2026-04-05-held-sand-hand-lens-second-proof-implementation.md).
- Re-ran `npx vitest run src/test/field-request-controller.test.ts -t "Held Sand|process-only alternates|active process-only"` and `npx vitest run src/test/runtime-smoke.test.ts -t "Held Sand clue on the live back-dune shelf|same Held Sand shelf setup|Held Sand replay window|held-sand route replay note"`.
