# High Pass Science Pack Handoff

Prepared `ECO-20260416-scout-308` in lane 2.

## Read

- The next live chapter shell is already pointing at `High Pass` through `Treeline Pass`, not at a generic alpine content wave. The active routes shell, expedition footer, and world-map targeting all keep naming `High Pass` and `Treeline Pass` directly.
- The current second-act chapter structure is also already sequenced:
  - opener: `Stone Shelter`
  - middle turn: `Thaw Window`
  - close: `Low Fell`
- The treeline branch already has strong notebook-note and comparison support in the later alpine half:
  - `krummholz-spruce` close-look is live
  - `frost-heave-boulder` close-look is live
  - `mountain-avens`, `arctic-willow`, and `reindeer-lichen` already have stronger comparison or close-look support
- What still feels thinner is the chapter-facing science payoff for the first real `High Pass` carriers:
  - `hoary-marmot` is one of the active `Stone Shelter` route clues but still has no close-look or sketchbook-facing payoff
  - `dwarf-birch` is already a route clue and sketchbook memory line, but it still lacks the stronger specimen-style payoff that would help `Low Fell` feel like a real next-chapter step instead of only a route slot

## Recommendation

Treat `main-308` as one compact `Treeline Pass` chapter science pack, not a broad alpine richness sweep.

Best shape:

1. add a `hoary-marmot` close-look card to strengthen the `Stone Shelter` opener
2. add a `dwarf-birch` close-look card to strengthen the `Low Fell` chapter drop
3. prove both cards from live `Treeline Pass` inspectables in runtime coverage

## Why This Shape

- It supports the chapter that is actually opening now: `High Pass` through `Treeline Pass`
- It avoids reopening tundra, the atlas shell, or a new comparison branch when those later chapter seams already have stronger support
- It uses current route carriers instead of inventing a new species pack that the chapter does not yet need
- It keeps the chunk lane-2-sized: authored science-facing content plus focused tests, with no station, route-board, or world-map rewrite

## Exact Main Direction

Stay with the current chapter carriers.

Recommended targets:

- add `hoary-marmot` to [close-look.ts](/Users/trevormaxwell/Desktop/game/src/engine/close-look.ts)
  - keep the card visual-first and shelter-facing
  - safest callout direction:
    - rocky den or shelter rock
    - upright lookout body
  - safest sentence direction:
    - marmots use rocky slopes and shelter gaps while watching for danger
- add `dwarf-birch` to [close-look.ts](/Users/trevormaxwell/Desktop/game/src/engine/close-look.ts)
  - keep the card about low woody survival, not a second generic shrub fact
  - safest callout direction:
    - low woody stems
    - small rounded leaves
  - safest sentence direction:
    - staying low helps this woody shrub handle the harsh wind after the last trees
- extend focused coverage in:
  - [close-look.test.ts](/Users/trevormaxwell/Desktop/game/src/test/close-look.test.ts)
  - [runtime-smoke.test.ts](/Users/trevormaxwell/Desktop/game/src/test/runtime-smoke.test.ts)

Runtime proof should come from live `Treeline Pass` inspectables:

- one `Stone Shelter`-side `hoary-marmot`
- one `Low Fell`-side `dwarf-birch`

## Explicit Non-Targets

- no broader tundra content sweep
- no new comparison allowlist entries
- no route-board or station copy changes
- no new field-partner or notebook prompt work
- no broad alpine content pack outside the current `High Pass` chapter carriers

## Suggested File Targets

- `src/engine/close-look.ts`
- `src/test/close-look.test.ts`
- `src/test/runtime-smoke.test.ts`

## Suggested Verification

- `npm test -- --run src/test/close-look.test.ts`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "hoary-marmot|dwarf-birch|Treeline Pass"`
- `npm run build`

## Queue Outcome

- Close `ECO-20260416-scout-308`.
- Promote `ECO-20260416-main-308` to `READY`.
- Retarget `ECO-20260416-main-308` and `ECO-20260416-critic-308` to this handoff.
