# 2026-03-30 Inland Route Beat Sheet Handoff

## Scope

Scout handoff for `ECO-20260330-scout-38`: recommend the clearest inland route identity, pacing, and beat structure for the second live line on the field-season board.

## Strongest Route

Recommended live route:

- `Treeline Shelter Line`

Suggested branch:

- `Forest Trail -> Treeline Pass -> Tundra Reach`

Why this is the right second line:

- it turns the back half of the world into a real chapter instead of a later unlock list
- it teaches a distinct ecology problem from the coast: exposure and short season, not moisture gathering
- it already has the best live supports to build on now: `Root Hollow`, the treeline lee pocket, alpine comparison entries, and inland process moments

## Best Board Shape

Keep the same compact three-beat board pattern, but do not repeat the earlier station-return beat inside the route itself.

Best medium beats:

1. `Treeline Shelter`
   - travel to `Treeline Pass`
   - reach the lee-side `dwarf-shrub` lane
   - log two shelter clues such as `frost-heave-boulder`, `krummholz-spruce`, or `hoary-marmot`

2. `Tundra Short Season`
   - travel to `Tundra Reach`
   - use `snow-meadow` as the first readable notebook stop
   - log two short-season clues such as `purple-saxifrage`, `cottongrass`, or `cloudberry`

3. `Tundra Survey`
   - bring `Tundra Reach` up to surveyed so the inland line ends with a real fieldwork capstone instead of only another inspect pair

This keeps the route:

- medium in length
- biome-specific
- notebook-first
- different from the first coastal line

## Best Runtime Fit

The easiest main-agent implementation path is:

- keep the existing board surface and switch to the inland line only after `Coastal Shelter Line` is complete
- add one treeline request and one tundra request rather than inventing a second route system
- reuse the existing survey-state finish for the third beat
- point the route marker at `treeline` first, then `tundra`, then `null` once the line is logged

Best board copy direction:

- title: `TREELINE SHELTER LINE`
- branch: `Forest -> Treeline -> Tundra`
- summary start: `Leave canopy cover. Follow shelter into shorter season.`
- complete summary: `Inland line logged. Next: deepen the alpine branch.`

## Guardrails

- Do not add another station-upgrade beat inside this route.
- Do not open multiple inland lines at once.
- Do not make the second route feel like a colder reskin of the coastal one.
- Keep the first tundra beat gentle and discovery-led, not like a survival trial.

## Queue Guidance

- `ECO-20260330-scout-38` can close with this report.
- `Treeline Shelter Line` should be treated as the strongest second live route for `ECO-20260330-main-65`.
- The route should use one treeline request, one tundra request, and one tundra survey finish as its best initial pacing shell.
