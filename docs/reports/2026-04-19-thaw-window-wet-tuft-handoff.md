# 2026-04-19 Thaw Window Wet-Tuft Handoff

Prepared `ECO-20260419-scout-318` for lane 4.

## Recommendation

Spend packet 128's lane-4 pass on the middle `wet-tuft` leg of `tundra-short-season`, not on another first-bloom proof or a broader replay shell.

Best target:

- keep the live route id `tundra-short-season`
- keep the canonical filed and display identity `Short Season` / `Thaw Window`
- keep the active replay title `Thaw Window`
- spend the implementation on the current `wet-tuft` slot only
- use the existing thaw-skirt upper-shelf family and the current `Bigelow's sedge` presence as the stronger active-window consequence

The first `Thaw Window` replay proof is already live:

- `hand-lens` prefers `woolly-lousewort` for `first-bloom`
- `note-tabs` stays on the nearer ordinary inspectable

The next good spend is the middle leg, so the active thaw window has a second felt route consequence instead of repeating the opening beat.

## Why This Is The Right Next Move

- The first-bloom consequence already has controller and runtime proof, so another opening-beat pass would over-spend the same moment.
- The existing thaw-skirt shelf already carries the right comparison family for a smaller follow-on:
  - authored `Bigelow's sedge`
  - stable thaw-edge plants including `cottongrass`
  - nearby `purple-saxifrage` carryover on the same approach
- Packet 128 explicitly wants a route-local consequence, not more station or notebook shell work.
- Keeping this inside `field-requests` and controller tests avoids colliding with lane 2's note/prompt work or lane 3's earlier-band place work.

## Concrete Main Handoff

`ECO-20260419-main-318` should use one deterministic thaw-skirt upper-shelf proof.

### Preferred live state

- route: `tundra-short-season`
- route progress already filled through:
  - `first-bloom -> purple-saxifrage`
- next live slot:
  - `wet-tuft`
- replay window active:
  - `worldStep = 4`
  - `biomeVisits.tundra = 2`
  - active process `thaw-fringe`

### Preferred shelf band

Use the current thaw-skirt upper shelf / channel shoulder family rather than the later frost-ridge or meltwater edge:

- `thaw-skirt`
- roughly `x 332-392`, `y 88-108`
- anchored by the current authored and stable family:
  - `thaw-skirt-entry-willow`
  - `thaw-skirt-channel`
  - `thaw-skirt-upper-sedge`
  - stable thaw-edge plants, including `cottongrass`

The proof should look for one deterministic shelf where:

- `bigelows-sedge` is in inspect range
- an ordinary `wet-tuft` fit such as `cottongrass` is also nearby
- `hand-lens` retargets to `bigelows-sedge`
- `note-tabs` does not

## Expected Implementation Shape

### 1. Field-request proof

Add one focused `field-requests` case for `tundra-short-season` during active `Thaw Window` with `wet-tuft` next:

- `Bigelow's sedge` becomes the active middle-band carrier for the live window
- the route title and summary stay `Thaw Window`
- the filed display seam stays `Thaw Window. ...` rather than widening notebook chrome

This should be the `Thaw Window` counterpart to the earlier `Rimed Pass` middle-band pass, not another title-only proof.

### 2. Controller proof

Add one focused `field-request-controller` case for the live thaw-skirt middle shelf:

- `supportRetargetsInspect` should be `true`
- `supportPrefersActiveClue` should be `true`
- the hint chip should stay the existing `NOTEBOOK J` with the `support-biased` variant

### 3. Runtime proof

Add one deterministic runtime comparison on the same thaw-skirt shelf:

- `hand-lens` inspects `bigelows-sedge`
- the bubble shows `LENS CLUE: wet tuft`
- the route logs `wet-tuft -> bigelows-sedge`
- the live route title is `Thaw Window`
- `note-tabs` in the same shelf does not auto-snap to `bigelows-sedge`

If the existing controller seam already carries this cleanly, keep runtime code small and land the value through tests. If it exposes a real gap, tighten only the existing active-clue support seam instead of adding a new replay framework.

## File Targets

- `/Users/trevormaxwell/Desktop/game/src/engine/field-requests.ts`
- `/Users/trevormaxwell/Desktop/game/src/engine/field-request-controller.ts`
- `/Users/trevormaxwell/Desktop/game/src/test/field-requests.test.ts`
- `/Users/trevormaxwell/Desktop/game/src/test/field-request-controller.test.ts`
- `/Users/trevormaxwell/Desktop/game/src/test/runtime-smoke.test.ts`

## Guardrails

- no second Tundra route
- no new station page, notebook shell, or support row
- no new tundra geometry or authored carrier pack
- no lane-2 note/prompt expansion folded into this chunk
- no change to the `Thaw Window` filed display stamp beyond the current route-local clue consequences

## Why The Alternatives Are Weaker

### Do not spend this on another first-bloom proof

`woolly-lousewort` already gives the active window a felt opening consequence. Repeating that beat would make the replay richer on paper, but not in player rhythm.

### Do not widen into a bigger Tundra route rewrite

Packet 128 explicitly wants one smaller route-local consequence. A larger rewrite would step on the still-fresh `High Pass` proof and delay the lane-clear loop.

### Do not solve this with new tundra geometry

The thaw-skirt upper shelf already has the right comparison family. The gap is route consequence, not level density.

## Verification Target

- `npx vitest run src/test/field-requests.test.ts -t "tundra-short-season|Thaw Window|wet-tuft|Bigelow"`
- `npx vitest run src/test/field-request-controller.test.ts -t "Thaw Window|wet-tuft|Bigelow"`
- `npx vitest run src/test/runtime-smoke.test.ts -t "Thaw Window|wet tuft|bigelows-sedge"`
