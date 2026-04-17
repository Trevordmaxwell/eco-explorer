# High Pass Science Pack Implementation

## Queue Ref

- `ECO-20260416-main-308`

## What Landed

The Sprint 3 lane-2 chapter pack stayed compact and Treeline Pass-owned:

- [close-look.ts](/Users/trevormaxwell/Desktop/game/src/engine/close-look.ts) now adds two new `High Pass` carrier cards:
  - `hoary-marmot` for the `Stone Shelter` opener
  - `dwarf-birch` for the `Low Fell` chapter drop
- [close-look.test.ts](/Users/trevormaxwell/Desktop/game/src/test/close-look.test.ts) now locks both cards into the close-look allowlist and checks their compact payloads directly.
- [runtime-smoke.test.ts](/Users/trevormaxwell/Desktop/game/src/test/runtime-smoke.test.ts) now opens both cards from live `Treeline Pass` inspectables, proving the chapter pack through the existing handheld inspect flow instead of a synthetic payload-only test.

## Why This Helps

- The next chapter now has stronger science-facing payoff exactly where the live shell is pointing:
  - `Stone Shelter` gains a real animal shelter card through `hoary-marmot`
  - `Low Fell` gains a stronger low-wood specimen card through `dwarf-birch`
- The pack stays chapter-facing instead of turning into another broad alpine sweep. It strengthens the active `High Pass` route carriers rather than reopening tundra, atlas copy, or new comparison structure.
- The new cards stay visual-first and compact, which is the right fit for a lane-2 handheld pass.

## Test Coverage

Focused verification for this pass:

- `npm test -- --run src/test/close-look.test.ts`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "hoary-marmot|dwarf-birch|Treeline Pass"`
- `npm run build`
