# Living-World Route Differentiation Implementation

Implemented `ECO-20260405-main-289` for lane 4.

## What Landed

- In [field-requests.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-requests.ts), `tundra-short-season` now treats `woolly-lousewort` as a truthful alternate `first-bloom` carrier only while the live `thaw-fringe` process window is active.
- The route keeps its existing identity:
  - live title stays `Thaw Window`
  - filed route stays `Short Season`
  - no new support type, notebook branch, or station shell change was added

## Verification

- Added focused route tests in [field-requests.test.ts](/Users/trevormaxwell/Desktop/game/src/test/field-requests.test.ts):
  - `woolly-lousewort` does not fit `first-bloom` outside the active window
  - during `thaw-fringe`, both `purple-saxifrage` and `woolly-lousewort` fit the opening slot
  - inspecting `woolly-lousewort` during that live window records `first-bloom`
- Added focused live proof in [runtime-smoke.test.ts](/Users/trevormaxwell/Desktop/game/src/test/runtime-smoke.test.ts):
  - a live thaw-skirt shelf inspection can progress `Thaw Window` through `woolly-lousewort`
  - the nearby keyboard inspect path for a non-`hand-lens` support still does not auto-snap to that alternate carrier

## Browser Proof

- Built the game and captured a seeded handheld browser proof in [tundra-thaw-window.png](/Users/trevormaxwell/Desktop/game/output/lane-4-main-289-browser/tundra-thaw-window.png)
- A live Playwright state check on that seed confirmed:
  - `biomeId: tundra`
  - `zoneId: thaw-skirt`
  - `habitatProcesses: ['thaw-fringe']`
  - active route title `Thaw Window`
  - nearby `woolly-lousewort` present on the shelf
- Browser console stayed clean in [console-errors.json](/Users/trevormaxwell/Desktop/game/output/lane-4-main-289-browser/console-errors.json)

## One Adjustment From The Scout Hypothesis

The original scout handoff suggested a single runtime proof where `hand-lens` would naturally prefer `woolly-lousewort` over a nearer non-fit clue. In the live thaw-skirt shelf, the nearest valid bloom still truthfully varies with local placement, so I kept the implementation small and proved the shipped behavior in two tighter ways instead:

- unit coverage for the live alternate-carrier fit itself
- runtime/browser proof that the live route accepts `woolly-lousewort` without changing the route shell or support system
