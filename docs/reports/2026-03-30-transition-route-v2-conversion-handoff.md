# 2026-03-30 Transition Route V2 Conversion Handoff

## Scope

Scout handoff for `ECO-20260330-scout-76`: prepare the next Route v2 conversion pack for `scrub-edge-pattern` and `forest-cool-edge` so `main-112` can implement the middle-habitat transition pair without re-planning the outing shape.

## Current Live Gap

Lane 4 now has the right foundation:

- Route v2 already supports notebook-ready landmark and evidence-slot beats
- the routes page can hold a beat until station filing
- the support row and support-aware `TODAY` strip are live

What is still old-shaped in the middle route is the request logic:

- `scrub-edge-pattern` is still a raw `inspect-entry-set`
- `forest-cool-edge` is still a raw `inspect-entry-set`
- both beats already have stronger authored identity in the board copy, replay notes, observation prompts, and biome zoning than the current completion model can express

So `main-112` should not invent a bigger route system. It should convert these two beats into concrete Route v2 outings using the live core.

## Best Conversion Rule

Do not add a third Route v2 core type yet.

Use the existing `assemble-evidence` structure for both beats, but author the slot families and zone footprints so they read like transition outings instead of another generic three-find count.

Why this is the right move now:

- it keeps `main-112` inside lane 4 instead of reopening the Route v2 runtime itself
- it gives the edge-pattern line a distinct outing feel through slot language and pathing rather than new machinery
- it preserves the compact station shell and existing notebook-return flow

## Conversion Pack

### 1. `scrub-edge-pattern`

Recommended Route v2 type:

- transect-flavored `assemble-evidence`

Best live reading path:

- `back-dune -> windbreak-swale -> forest-edge`

Recommended slot family:

- `open-pioneer`
- `holding-cover`
- `thicker-edge`

Recommended carriers:

- `open-pioneer`: `dune-lupine`
- `holding-cover`: `pacific-wax-myrtle`
- `thicker-edge`: `salmonberry`

Recommended zones:

- `back-dune`
- `windbreak-swale`
- `forest-edge`

Why this works:

- it turns the outing into a readable coast-to-forest gradient walk instead of “inspect any three scrub clues”
- each carrier already maps cleanly to one part of the transition
- the route can reuse the existing replay notes and nursery support without another content pass

Recommended summary shift:

- from “inspect three clues” toward “walk the scrub transition from the open pioneer side into the thicker edge and file one clue from each stage”

Recommended board detail:

- `Match one open pioneer, one holding cover, and one thicker-edge clue from dune to forest edge.`

### 2. `forest-cool-edge`

Recommended Route v2 type:

- transition-evidence `assemble-evidence`

Best live focus space:

- `creek-bend`

Recommended slot family:

- `edge-carrier`
- `cool-floor`
- `wet-shade`

Recommended carriers:

- `edge-carrier`: `salmonberry`
- `cool-floor`: `redwood-sorrel`
- `wet-shade`: `sword-fern`

Recommended zones:

- `creek-bend`

Why this works:

- `creek-bend` already holds the clearest forest-side version of this transition through the existing `Creekside Shelter` note and observation prompts
- keeping the beat to one zone makes it feel different from the wider coastal transect instead of repeating the same outing shape twice
- the carrier trio already matches the current request, the replay notes, and the nursery’s salmonberry support reward

Recommended summary shift:

- from “inspect three clues” toward “read the forest side of the transition by filing one edge carrier, one cool floor clue, and one wet-shade clue”

Recommended board detail:

- `Match one edge carrier, one cool floor, and one wet shade clue at Creek Bend.`

## Replay And Support Guidance

Keep the existing edge-pattern replay windows.

They already fit the Route v2 transition shape:

- scrub beat:
  - `Held Sand`
  - `Haze Edge`
  - `Pioneer Clue`
- forest beat:
  - `Moist Edge`
  - `Wet Edge`
  - `Cool Start`

`main-112` should preserve those authored follow-ons and let the new slot-based beats make them feel more purposeful, not replace them.

## Best Main-Agent Slice

`main-112` should stay narrowly scoped to:

1. convert `scrub-edge-pattern` to the slot-based transect beat above
2. convert `forest-cool-edge` to the slot-based transition-evidence beat above
3. update route-board beat detail copy for those two steps
4. add focused tests for the new slot logic and updated wrap/board expectations

Avoid in `main-112`:

- new Route v2 runtime types
- new support options
- new station surfaces
- new content from lane 2
- converting `treeline-low-fell` early

## Expected File Touches

- `src/engine/field-requests.ts`
- `src/engine/field-season-board.ts`
- `src/test/field-requests.test.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`

## Guardrails

- do not turn `scrub-edge-pattern` into another one-zone forest-edge check
- do not widen `forest-cool-edge` into a second multi-zone forest outing unless the current `creek-bend` read proves insufficient
- do not add a new transect-specific system just to support these two beats
- keep the slot labels readable and role-shaped rather than scientific jargon
- keep notebook filing and support choice behavior unchanged

## Queue Guidance

- close `ECO-20260330-scout-76` with this report
- bump packet `035` so this handoff is part of the lane record
- promote `ECO-20260330-main-112` to `READY`
- keep `ECO-20260330-critic-87` blocked behind implementation
