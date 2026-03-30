# 2026-03-30 Edge Pattern Line Handoff

## Scope

Scout handoff for `ECO-20260330-scout-44`: prepare the third live route, `Edge Pattern Line`, so it fits the current field-season board and uses the live nursery loop as optional route support instead of a second progression board.

## Strongest Route

Recommended live route:

- `EDGE PATTERN LINE`

Suggested branch:

- `Coastal Scrub -> Forest -> Treeline`

Why this is the right third line:

- it gives the front-half to inland transition its own authored chapter instead of leaving those mid-chain habitats as glue between the coastal and alpine routes
- it reuses live comparison-ready species and notes instead of demanding a new system
- it is the cleanest place to let nursery support feel helpful, because the nursery already has three route-support plants aimed at this exact edge-reading theme:
  - `dune-lupine`
  - `salmonberry`
  - `mountain-avens`

## Best Board Shape

Keep the existing compact three-beat board with no extra station beat and no second nursery panel.

Best medium beats:

1. `Scrub Pattern`
   - biome: `coastal-scrub`
   - ask the player to log two clues that show where open dune pioneers give way to steadier scrub cover
   - best entries: `dune-lupine`, `pacific-wax-myrtle`, `salmonberry`
   - best fit: no forced zone; let the beat read across `back-dune`, `windbreak-swale`, and `forest-edge`

2. `Cool Edge`
   - biome: `forest`
   - ask the player to log two clues that show where cool wet cover still holds before the inland branch opens
   - best entries: `salmonberry`, `sword-fern`, `redwood-sorrel`
   - best fit: `creek-bend` if a single-zone read is preferred, or no zone if the main pass wants a looser forest-edge comparison

3. `Low Fell`
   - biome: `treeline`
   - ask the player to log two clues that show where tree-shaped cover gives way to lower open ground
   - best entries: `krummholz-spruce`, `dwarf-birch`, `mountain-avens`
   - best fit: no forced zone so the beat can bridge `krummholz-belt` into `lichen-fell`

This keeps the route:

- route-sized instead of system-sized
- different from both the coastal shelter line and the inland short-season line
- centered on transition pattern reading, not another survey repeat

## Nursery Hook Plan

The nursery should support each beat quietly and optionally:

- `Scrub Pattern` can use `dune-lupine` as the pioneer-to-cover clue
- `Cool Edge` can use `salmonberry` as the wetter-shadier edge clue
- `Low Fell` can use `mountain-avens` as the open-but-low ground clue

Important implementation constraint:

- the current nursery view resolves `routeSupportHint` by taking the first claimed route-support reward whose `routeTags` include the active `routeId`
- for `edge-pattern-line`, that would likely freeze the hint on `dune-lupine` forever once it is claimed

Recommended fix for `main-75`:

- resolve the nursery route-support hint from the active beat, not from the first matching project in the full route
- if the active beat has no claimed nursery support reward yet, show no route support hint rather than substituting a later or earlier plant

That keeps nursery support:

- helpful
- optional
- readable
- clearly secondary to fieldwork

## Best Runtime Fit

The easiest implementation path is:

- activate `Edge Pattern Line` only after `tundra-survey-slice` logs the inland line
- keep the same field-station board shell and atlas strip
- add one new request chain with three compact requests instead of inventing a different route mechanism
- point `route-marker` to:
  - `coastal-scrub`
  - then `forest`
  - then `treeline`
  - then `null` after the line is logged

Best board copy direction:

- title: `EDGE PATTERN LINE`
- branch: `Coastal Scrub -> Forest -> Treeline`
- starting summary: `Follow transition patterns from scrub shelter to low fell.`
- complete summary: `Edge line logged. Next: keep comparing the quiet middle links.`

## Guardrails

- Do not add a fourth beat or another station-return step.
- Do not require nursery progress to advance the route.
- Do not show multiple nursery hints at once.
- Do not reopen the station as a management dashboard just because the route now has nursery-aware support.
- Keep the route about habitat transitions, not about collecting one plant from each biome.

## Queue Guidance

- `ECO-20260330-scout-44` can close with this report.
- `ECO-20260330-main-75` is ready for implementation once the board, request chain, route marker, and beat-aware nursery support are updated together.
