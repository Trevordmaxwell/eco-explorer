# 2026-04-04 Held-Sand Open-Pioneer Review

Reviewed `ECO-20260404-main-270`.

## Result

No blocking issues found.

## What Holds Up

- The pass stays inside the intended lane-4 seam. `Held Sand` changes actual route opportunity through the existing `activeSlotEntryIdsBySlotId` path instead of adding another support behavior, board exception, or runtime branch.
- Route identity stays clear:
  - the live outing can now open on `beach-grass` during active `Held Sand`
  - notebook-ready and filed states remain canonically `Scrub Pattern`
  - clue-backed filed text truthfully reflects the gathered carrier without renaming the route itself
- The science and readability tradeoff is solid. `sand-capture` already features `beach-grass`, `dune-lupine`, and `pacific-wax-myrtle`, so the new opening clue reads as a real same-place variation rather than a forced alternate path.
- The test shape is proportionate:
  - focused field-request coverage proves the opening clue only changes during the replay window
  - the runtime check proves the live game can carry a `beach-grass`-opened `Held Sand` route without losing the replay framing
  - the existing `Held Sand` note-tabs regression still protects the support split

## Watch Item

- If a future route-opportunity pass needs another proof, prefer the same pattern used here: reuse one existing route stage with a truthful same-zone process carrier before adding cross-zone alternates or broader replay-specific copy.

## Verification Reviewed

- `npx vitest run src/test/field-requests.test.ts -t "Held Sand|beach-grass fit|scrub-edge-pattern is reframed"`
- `npx vitest run src/test/runtime-smoke.test.ts -t "Held Sand live after beach-grass|stable scrub pattern line during the Held Sand replay window"`
- `npx vitest run src/test/field-requests.test.ts src/test/runtime-smoke.test.ts -t "Held Sand|beach-grass|scrub pattern line during the Held Sand replay window"`
- `npm run build`
