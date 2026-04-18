# High Pass Chapter-State Hardening Handoff

## Queue Ref

- `ECO-20260418-scout-311`
- prepares `ECO-20260418-main-311`

## Recommended Scope

Sprint 4 lane 1 should spend its next pass on one dedicated High Pass chapter-state seam instead of adding another explicit shell state:

- keep the current station `ROUTES | EXPEDITION` shell exactly as-is
- keep the current one-card `HIGH PASS / NEXT` expedition surface
- extract the repeated High Pass composition out of [field-season-board.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-season-board.ts) into one chapter-owned helper

That gives the new chapter a cleaner home without reopening the larger station or planner question.

## Where The Drift Is

High Pass now exists as a real next chapter, but its filed-season composition is still scattered across several small resolvers in [field-season-board.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-season-board.ts):

- `resolveSeasonOutingLocator(...)`
- `resolveNextSeasonContinuityCopy(...)`
- `resolveNextSeasonApproachLine(...)`
- `resolveFiledSeasonLaunchCard(...)`
- the filed-season branch in `resolveFieldAtlasState(...)`
- the filed-season branch in `resolveFieldSeasonExpeditionState(...)`

Those branches are all small, but together they now own the same chapter facts:

- `High Pass`
- `Treeline Pass`
- the region-bridge sentence
- the station-facing next-direction line
- the expedition-card start text and note

This is the next clean split before more High Pass growth lands.

## Recommended Split

Create one focused helper for the filed-season High Pass chapter, for example:

- `src/engine/high-pass-chapter-state.ts`

That helper should resolve one compact `HighPassChapterState | null` once `forest-season-threads` is complete.

## Suggested Helper Shape

The helper does not need a new global framework. A small High Pass-specific state object is enough, with fields along these lines:

- target biome and location:
  - `targetBiomeId`
  - `startLocationLabel`
- outing / route-facing copy:
  - `title`
  - `worldMapLabel`
  - `routeBoardSummary`
  - `routeBoardNextDirection`
- station continuity copy:
  - `routesSubtitle`
  - `archiveText`
- atlas-facing copy:
  - `dormantAtlasNote`
  - `liveAtlasNote`
- expedition-card copy:
  - `cardTitle`
  - `cardStatusLabel`
  - `cardSummary`
  - `cardStartText`
  - `cardNote`
- one compact boolean:
  - `dormantUntilSeasonCloseClears`

Then let [field-season-board.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-season-board.ts) consume that state instead of recomposing the same chapter wording in multiple branches.

## Recommended Main Shape

### In scope

- extract the High Pass chapter-state composition out of `field-season-board.ts`
- keep `resolveSeasonOutingLocator(...)` as a thin adapter over the new helper
- feed the same helper into:
  - `resolveNextSeasonContinuityCopy(...)`
  - `resolveNextSeasonApproachLine(...)`
  - `resolveFieldAtlasState(...)`
  - `resolveFieldSeasonExpeditionState(...)`
  - `resolveFiledSeasonLaunchCard(...)`

### Keep small

Do not move the current `treeline-high-pass` dormancy guard out of [field-requests.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-requests.ts) in this pass unless the extraction truly needs one tiny shared boolean. The packet already calls that future guard movement a later watch item.

## Why This Boundary

- It hardens the real new chapter instead of widening the shell again.
- It reduces copy and state drift across the filed-season station surfaces.
- It keeps the current `HIGH PASS / NEXT` expedition card while making its state provenance easier to trust.
- It leaves Route v2 request-selection logic alone unless a genuinely shared dormancy fact is needed.

## Non-Goals

- do not add another field-station page
- do not add a new planner row or archive card
- do not widen the expedition shell beyond the current one-card pattern
- do not reopen nursery or unrelated route-board copy
- do not invent a broader chapter framework if a High Pass-specific helper is enough

## Verification For Main

- focused chapter-state tests in [field-season-board.test.ts](/Users/trevormaxwell/Desktop/game/src/test/field-season-board.test.ts) for:
  - filed-season High Pass copy staying consistent across outing / atlas / expedition branches
  - dormant vs live atlas phrasing when `seasonCloseReturnPending` is still set
- re-run the existing High Pass dormancy and activation checks in [field-requests.test.ts](/Users/trevormaxwell/Desktop/game/src/test/field-requests.test.ts)
- one focused runtime-smoke slice proving the station still opens routes-first and the expedition tab still shows the one-card High Pass chapter cleanly
- `npm run build`
