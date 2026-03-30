# 2026-03-30 Season-Wrap Copy Handoff

## Scope

Scout handoff for `ECO-20260330-scout-49`: define the smallest season-wrap and next-outing guidance pass that fits the current field station.

## Current Read

The field station already has the right bones:

- one primary route board
- one tiny atlas strip
- one compact top strip under the tabs

What is still missing is not another panel. It is a slightly stronger sense that the current outing can pause here and that the next outing already has a gentle direction.

So `main-80` should be a copy-and-surfacing pass, not a structural station expansion.

## Best Main-Agent Slice

### 1. Reuse the top strip as the season-wrap lane

The strip directly under the tabs is already the safest place for stopping-point language.

Recommendation:

- keep the strip as the closure lane
- let it carry a short wrap label plus one brief sentence
- prefer outing recap over raw `Recent: +1 ...` credit language when a route beat or route completion gives a better stopping cue

This keeps the station notebook-like and avoids growing a new card.

### 2. Make the wrap copy sound like a field-note margin

The tone should feel like a naturalist pausing between walks, not like a reward summary.

Good copy shape:

- short label such as `TODAY`, `STOP HERE`, or `ROUTE LOGGED`
- one calm sentence about what just became clear
- one soft pointer toward the next outing when helpful

Examples of the right energy:

- `TODAY` -> `Moist edge is reading clearly now. Forest Trail is a good place to pause.`
- `ROUTE LOGGED` -> `Edge line is logged. Next time, keep following the quiet middle links.`
- `NEXT OUTING` -> `Coastal Scrub still makes the clearest next comparison.`

### 3. Keep next-outing guidance soft and biome-facing

The teaser should point toward a place or comparison, not a checklist.

Recommendation:

- pull from `routeBoard.targetBiomeId`, `routeBoard.nextDirection`, or the existing atlas note
- shorten the copy so it reads like an invitation
- avoid imperative task language if the player has already reached a calm stopping point

Best teaser pattern:

- `Next outing: Forest Trail`
- `Next outing: compare the quieter middle edge`
- `Next outing: follow the inland line`

### 4. Stay inside the current station shell

Guardrails for `main-80`:

- do not add another station card or footer panel
- do not turn the station into a score or recap screen
- do not expand the atlas into route history
- do not bury the active route board under wrap copy

## Main-Agent Targets For `main-80`

The cleanest implementation bundle is:

1. upgrade the existing top strip from generic recent-credit text into a tiny wrap lane
2. let that lane prefer route-aware closure copy when a beat or route completion gives a stronger stopping point
3. keep next-outing teasers short, location-facing, and optional in tone

## Queue Guidance

- `ECO-20260330-scout-49` can close with this handoff.
- `ECO-20260330-main-80` should now move forward as a compact season-wrap copy pass, not as a larger station redesign.
