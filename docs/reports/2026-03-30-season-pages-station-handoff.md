# 2026-03-30 Season Pages Station Handoff

## Scope

Scout handoff for `ECO-20260330-scout-51`: define the calmest field-station pattern that can grow beyond the current three-route board by adding season pages and one expedition slot.

## Current Read

The current station shell is still good at what it is doing:

- one active route board
- one small atlas acknowledgment
- one tiny wrap lane
- nursery as a clear secondary tab

The problem is not tone. The problem is capacity.

The next step should not be squeezing a fourth equal route onto the same board. It should be a page turn.

## Best Pattern

### 1. Keep `SEASON | NURSERY` as the top-level split

Do not add more top tabs.

Why:

- `NURSERY` is already a clean secondary home-base surface
- adding more global tabs would push the station toward dashboard energy
- the growth problem is inside `SEASON`, not across the whole station

### 2. Turn `SEASON` into notebook pages

The safest structure is:

- top tabs: `SEASON | NURSERY`
- inside `SEASON`, one small page row such as:
  - `ROUTES`
  - `EXPEDITION`

This should feel like flipping notebook pages, not switching product panes.

### 3. Let `ROUTES` preserve the existing working shell

The `ROUTES` page should mostly keep what already works:

- wrap strip
- current route board
- atlas acknowledgment
- support list

Main goal:

- make the existing route page feel like page one, not like legacy UI that has to coexist awkwardly with the new expedition slot

### 4. Make `EXPEDITION` one bigger chapter slot, not another route list

The expedition page should show only one special chapter card.

Best slot shape:

- title
- one short chapter summary
- one short `where it starts` note
- one simple status state:
  - `LOCKED`
  - `READY`
  - `ACTIVE`
  - `LOGGED`

Important constraint:

- do not show multiple expedition cards
- do not make expedition feel like a fourth route row

### 5. Keep atlas and nursery secondary

Atlas guidance:

- keep it on the `ROUTES` page
- do not promote it into its own page yet

Nursery guidance:

- keep the current nursery tab intact
- do not merge expedition support into nursery during `main-83`

## Main-Agent Targets For `main-83`

The cleanest implementation bundle is:

1. add one small page selector inside `SEASON`
2. keep `ROUTES` as the current compact board page
3. add one `EXPEDITION` page with a single large slot card
4. keep the new pattern readable at `256x160` without adding a dashboard footer or side rail

## Guardrails

- Do not add more than one expedition slot.
- Do not add more top-level station tabs.
- Do not make atlas or nursery compete visually with the expedition card.
- Do not compress four equal route boards into the new page system.

## Queue Guidance

- `ECO-20260330-scout-51` can close with this handoff.
- `ECO-20260330-main-83` should now move forward as a season-page station evolution, not as a larger station redesign.
