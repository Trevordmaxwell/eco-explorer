# 2026-03-30 Season Archive And Handoff Handoff

## Scope

Scout handoff for `ECO-20260330-scout-63`: prepare the smallest season archive and next-season handoff pattern that fits the current station without turning it into a dashboard.

## Current Live Gap

`main-95` gives the season a real ending beat:

- `Season Threads` closes the active outing
- the station note correctly says `RETURN TO STATION`
- the route marker turns off once the capstone is logged

But once the player actually opens the station, the close is still mostly phrased as a live instruction:

- the routes-page top strip still reads like a return cue, not a preserved season memory
- the station header subtitle is still generic `Route board and calm field support.`
- there is no tiny station-side record that says this season is now filed

So the season ends better than before, but the station does not yet keep that ending.

## Layout Read

The routes page is already tightly packed at `256x160`:

1. header and tabs
2. one top strip
3. route board
4. atlas strip
5. support rows

The expedition page is also effectively full:

- one `ROOT HOLLOW` card
- one tiny logged-only `NEXT EXPEDITION` teaser

That means `main-96` should not add a new card or new middle panel. The clean move is to repurpose an existing small surface once the player is already back at station.

## Best Main-Agent Slice

### 1. Turn the existing routes-page top strip into the archive strip during season close

Recommended behavior:

- while the season is still active or mid-capstone, keep the current `seasonWrap` strip behavior
- once `forest-season-threads` is logged and the station is opened, reuse that same top strip as a quiet archive strip instead of a live return instruction

Suggested archive tone:

- label: `SEASON ARCHIVE`
- text: `3 routes and ROOT HOLLOW logged.`

Why this is the best fit:

- it adds memory without costing new vertical space
- it preserves the route board as the main body
- it lets the station feel like it has filed the season instead of still shouting instructions

### 2. Use the station subtitle for the soft next-season handoff

Recommended behavior:

- when the season-close state is active, replace the generic season subtitle with one calm forward-looking line
- keep it softer than a new card, because `main-98` is the later step that should add the clearer next-season setup card

Suggested handoff tone:

- `This season is filed. Another field season can open here later.`

Why the subtitle is the right home:

- it is visible immediately when the station opens
- it does not add another panel
- it invites future motion without pretending the next season is already fully staged

### 3. Keep the expedition page unchanged in this pass

Recommendation:

- leave the logged `ROOT HOLLOW` card and tiny `NEXT EXPEDITION` teaser alone for now
- do not move the archive there
- do not add another expedition card or a season-history card

Why:

- the expedition page is already carrying the right chapter-scale weight
- adding archive or handoff copy there would blur chapter memory with future-expedition teasing
- the routes page is the better place to acknowledge the whole finished season

## Implementation Shape For `main-96`

The cleanest implementation bundle is:

1. add one small archive state resolved only after `forest-season-threads` is logged
2. feed that state through the field-station view model
3. let `overlay-render.ts` swap the existing routes-page top strip into `SEASON ARCHIVE` during season close
4. make the season-page subtitle season-aware so the close state gets one soft next-season handoff line

## Expected File Touches

- `src/engine/field-season-board.ts`
- `src/engine/game.ts`
- `src/engine/overlay-render.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`

## Guardrails

- do not add a new panel, card, or dashboard row
- do not turn the archive into a badge wall or season-history list
- do not make the next-season handoff more specific than the current content can support
- keep the archive quieter than the live route board and the real `ROOT HOLLOW` card

## Queue Guidance

- close `ECO-20260330-scout-63` with this handoff
- promote `ECO-20260330-main-96` to `READY`
- keep `ECO-20260330-critic-71` blocked until the archive-and-handoff pass lands
