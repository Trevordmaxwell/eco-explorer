# 2026-04-04 Docs Truth And Home-Place Review

Reviewed `ECO-20260404-critic-252` against packet `103`.

## Result

No blocker.

The docs pass now does the practical job it was meant to do: future contributors reading the public repo surfaces get the live command list, the live field-station shell terms, and the post-split helper ownership instead of an older prototype story.

## What Landed Well

- [README.md](/Users/trevormaxwell/Desktop/game/README.md) now uses `menu` instead of the stale `field menu` wording and describes the home place with the current `SEASON -> ROUTES`, `SEASON -> EXPEDITION`, and `NURSERY` vocabulary.
- [docs/architecture.md](/Users/trevormaxwell/Desktop/game/docs/architecture.md) now reflects the `field-request-state` and `field-station-state` helper splits, so the coordinator story is more truthful after the recent controller protection work.
- [docs/content-authoring.md](/Users/trevormaxwell/Desktop/game/docs/content-authoring.md) now covers the live world-map location shape, including `mapReturnPost` and `corridorDoors`, which matters for the current travel model.

## Watch Item

Future controller or station-shell extractions should update the architecture doc in the same wave. The repo story is clean again, and it will stay that way more easily if ownership notes move alongside the code instead of catching up a packet later.

## Verification

- rechecked the edited docs against [package.json](/Users/trevormaxwell/Desktop/game/package.json), [src/engine/field-request-state.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-request-state.ts), [src/engine/field-station-state.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-station-state.ts), and [src/content/world-map.ts](/Users/trevormaxwell/Desktop/game/src/content/world-map.ts)
- `npm run validate:agents`
