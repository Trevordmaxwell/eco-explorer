# 2026-03-30 Three-Route Station Scaling Handoff

## Scope

Scout handoff for `ECO-20260330-scout-47`: define the smallest field-station refinements needed now that three route layers and three support upgrades can coexist.

## Current Read

The station still has the right mood and structure:

- `SEASON` remains primary
- `NURSERY` stays clearly separate
- the active route board still reads like a notebook chapter

The problem is now layout density, not feature direction.

In the current three-route state:

- the route board still fits
- the atlas still fits
- the support rows are the part that start clipping or crowding

So `main-78` should be a scaling pass, not another new station system.

## Best Main-Agent Slice

### 1. Collapse the dedicated credit card into a lighter header strip

Current issue:

- the separate `FIELD CREDIT` box consumes vertical budget that the lower support area now needs more urgently

Recommendation:

- keep the credit total in the title row
- turn the recent source text into one compact single-line strip under the subtitle instead of its own boxed card

Effect:

- frees enough height for cleaner support rows
- keeps the station feeling like a notebook page, not stacked dashboard cards

### 2. Keep the route board as the dominant middle panel

Recommendation:

- preserve the current three-line beat stack
- keep route title, progress, and beat statuses as the main visual center
- do not expand atlas or support into competing panels

Three-route ordering should stay:

1. title or credit header
2. one compact recent-note strip
3. route board
4. one compact atlas strip
5. support list

### 3. Compress support into flat rows instead of mini cards

Current issue:

- support rows are paying card padding costs three times

Recommendation:

- render support as one labeled section with three short rows
- each row should only show:
  - upgrade title
  - one short summary line
  - right-aligned cost or `OWNED`
- keep the selected row highlighted, but drop extra box chrome per row if needed

This is the cleanest way to make all three support items survive at `256x160`.

### 4. Use one tiny header note as the stopping-point cue

The station does need a stronger "chapter closed" feeling, but it does not need another panel.

Recommendation:

- when the active route is fully logged, replace the normal subtitle or recent-note line with a tiny calm stop cue such as:
  - `Route logged. Good stopping point.`
  - or `Route logged. Rest here or tend the nursery.`

Why this is the right fit:

- it gives the player permission to stop without adding a reward screen
- it preserves the notebook mood
- it avoids creating another bottom card that would worsen crowding

## Guardrails

- Do not add a fourth route.
- Do not add route history totals, badges, or score-wall framing.
- Do not merge nursery details back into the season view.
- Do not solve spacing by shrinking text into unreadability.

## Main-Agent Targets For `main-78`

The cleanest implementation bundle is:

1. remove the boxed credit card and replace it with one compact text strip
2. keep the route board primary and atlas secondary
3. flatten support rows so all three upgrades fit cleanly
4. add one tiny stop cue in the header area when the active route is logged

## Queue Guidance

- `ECO-20260330-scout-47` can close with this handoff.
- `ECO-20260330-main-78` should now move forward on compact season-layout scaling, not on new station features.
