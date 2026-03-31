# 2026-03-30 Route V2 Pilot Conversion Handoff

## Scope

Scout handoff for `ECO-20260330-scout-73`: prepare the first concrete Route v2 conversion pack for lane 4 so the runtime starts from real outings that already exist in the build.

## Current Live Gap

Lane 4 already has the right source material:

- `FIELD_REQUEST_DEFINITIONS` already carry the four key outing ids:
  - `forest-hidden-hollow`
  - `forest-moisture-holders`
  - `scrub-edge-pattern`
  - `forest-cool-edge`
- `field-season-board` already stages those outings in the season shell
- `forest.ts` and `coastal-scrub` content already contain the strongest route-ready clues

What is missing is Route v2 structure:

- requests still resolve as `enter-zone`, raw inspect counts, or survey state
- save data only knows `completedFieldRequestIds`, not in-progress outing evidence
- the station board can point at the next beat, but it cannot yet hold a beat in a `ready to file` state

So the first scout job is not to invent new routes. It is to say exactly how the live outings should convert once the Route v2 core exists.

## Best First Pilot Set

Use the forest pair as the first live pilot and treat the transition pair as the immediate follow-on preview.

Why this is the strongest first pack:

- `forest-hidden-hollow` and `forest-moisture-holders` already sit inside the clearest authored traversal pocket in the game
- the forest route already has real geometry, landmark flavor, and damp-ground clues that can carry two different outing types
- `scrub-edge-pattern` and `forest-cool-edge` are strong next candidates, but they read better after the core proves out the first wayfinding and assemble-evidence loop

That means the pack should cover all four outings, but with two different detail levels:

- `forest-hidden-hollow` and `forest-moisture-holders`: implementation-ready for `main-110`
- `scrub-edge-pattern` and `forest-cool-edge`: concrete second-wave preview so later lane-4 work starts from the same outing language

## Route V2 Beat Map

### 1. `forest-hidden-hollow`

Recommended Route v2 type:

- landmark-backed wayfinding beat

Best live fit:

- biome: `forest`
- travel path: `trailhead -> fern-hollow -> root-hollow`
- confirmation space: lower `root-hollow` / `seep-pocket`

Recommended completion shape:

1. travel to `Forest Trail`
2. reach `root-hollow`
3. confirm the hollow with one named landmark clue
4. return to station to file the notebook note

Best landmark clue:

- primary: `seep-stone`

Why this is the right anchor:

- it is already a real forest landmark entry, not a fabricated quest token
- it sits in the dampest part of the hollow, so it proves the player found the lower sheltered lane instead of only brushing past the zone edge
- it gives the first Route v2 outing a concrete "I found it" moment without turning the beat into a scavenger checklist

Recommended tone:

- title can stay `Hidden Hollow`
- summary should shift from "enter this zone" toward "find the sheltered hollow and confirm it with the seep landmark"

### 2. `forest-moisture-holders`

Recommended Route v2 type:

- assemble-evidence beat

Best live fit:

- biome: `forest`
- focus space: `root-hollow` with optional carry-through into `filtered-return`
- notebook slots:
  - `shelter`
  - `ground`
  - `living`

Recommended slot allowlists:

- `shelter`: `sword-fern` or `licorice-fern`
- `ground`: `redwood-sorrel` or `seep-stone`
- `living`: `banana-slug` or `ensatina`

Why this slot model works:

- it teaches three distinct ecological roles instead of another "find any two things" count
- it still uses existing authored forest clues
- it lets the main pass accept slightly different valid combinations without becoming vague

Recommended finish:

- once one clue is logged for each slot, the beat becomes `ready to synthesize`
- the request should not enter `completedFieldRequestIds` until the station-side notebook step is filed

### 3. `scrub-edge-pattern`

Recommended Route v2 type:

- transect / comparison beat

Best live fit:

- biome: `coastal-scrub`
- reading path: `back-dune -> windbreak-swale -> forest-edge`
- slot family:
  - `open pioneer`
  - `holding cover`
  - `thicker edge`

Best current evidence carriers:

- `dune-lupine`
- `pacific-wax-myrtle`
- `salmonberry`

Use this as the first middle-habitat outing later, not in the first live core bundle.

### 4. `forest-cool-edge`

Recommended Route v2 type:

- transition-evidence beat

Best live fit:

- biome: `forest`
- focus space: `creek-bend` with optional `log-run` fallback
- slot family:
  - `edge carrier`
  - `cool floor`
  - `wet shade`

Best current evidence carriers:

- `salmonberry`
- `sword-fern`
- `redwood-sorrel`

This should stay queued behind the forest pilot so the lane can prove the first outing loop before it broadens into the transition family.

## Best Main-Agent Slice

### `main-109`

Build the Route v2 core around these concepts first:

1. one active Route v2 beat at a time
2. in-progress beat data stored separately from `completedFieldRequestIds`
3. beat data that can hold:
   - gathered evidence slots
   - landmark confirmation
   - `ready to synthesize`
4. station-facing board copy that can pause on a beat instead of advancing immediately

### `main-110`

Convert only the forest pair in the first live pass:

1. `forest-hidden-hollow` becomes the landmark-backed wayfinding beat
2. `forest-moisture-holders` becomes the first assemble-evidence beat
3. both beats file complete only after station-side notebook synthesis

Leave `scrub-edge-pattern` and `forest-cool-edge` structurally untouched until `main-112`.

## Expected File Touches

- `src/engine/types.ts`
- `src/engine/save.ts`
- `src/engine/field-requests.ts`
- `src/engine/field-season-board.ts`
- `src/engine/game.ts`
- `src/test/save.test.ts`
- `src/test/field-requests.test.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`
- `src/test/content-quality.test.ts`

## Guardrails

- do not add a separate quest log or route dashboard
- do not make the forest pilot depend on new content from lane 2
- do not turn `Hidden Hollow` into a three-clue scavenger hunt
- do not let `Moisture Holders` complete the moment the last clue is inspected
- keep the transition pair concrete in the pack, but defer their live conversion until after the first forest critique gate

## Queue Guidance

- close `ECO-20260330-scout-73` with this report
- keep `ECO-20260330-scout-74` and `ECO-20260330-scout-75` active next
- do not promote `ECO-20260330-main-109` until those two scout handoffs also land
