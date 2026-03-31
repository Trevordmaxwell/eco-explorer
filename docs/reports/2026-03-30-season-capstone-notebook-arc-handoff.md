# 2026-03-30 Season Capstone Notebook Arc Handoff

## Scope

Scout handoff for `ECO-20260330-scout-62`: prepare the first compact season-capstone notebook arc for lane 1.

## Current Live Gap

The game now has enough season structure to feel like a real chapter:

- three logged route lines
- one logged `ROOT HOLLOW` expedition chapter
- one calm `ROUTES | EXPEDITION` station pattern

But after `forest-expedition-upper-run`, the live guidance softens too far:

- `resolveActiveFieldRequest()` returns `null`
- `resolveGuidedFieldSeasonState()` falls back to a generic settled `FIELD SEASON OPEN`
- `resolveFieldAtlasState()` and `resolveFieldSeasonWrapState()` settle on `keep comparing the quiet middle links`

That leaves the season with no authored finale beat, only an open-ended pause state.

## Best Capstone Shape

Recommended capstone:

- one forest-centered notebook request that unlocks only after `forest-expedition-upper-run`
- one station-return note after that request logs

Why this is the strongest fit:

- it uses the current field-request lane instead of inventing a chapter log
- it ties the season together through places and organisms the player already knows
- it keeps the finale compact: one outing, then one clean return to station
- it preserves the expedition page as one card instead of asking `EXPEDITION` to host another progress stack

## Recommended Arc

### Beat 1: `Season Threads`

Use one new forest request as the capstone notebook outing.

Suggested shape:

- request id: `forest-season-threads`
- unlock after: `forest-expedition-upper-run`
- type: `inspect-entry-set`
- biome: `forest`
- no zone lock, so the player can move naturally through familiar forest spaces

Suggested entry set:

- `sword-fern`
- `salmonberry`
- `tree-lungwort`

Why this trio:

- `sword-fern` points back to the first sheltered forest route
- `salmonberry` points to the edge-pattern route and the cooler middle links
- `tree-lungwort` points to the elevated `ROOT HOLLOW` expedition space

This makes one small forest notebook pass feel like a recap of the season's whole shape instead of another unrelated errand.

Suggested request tone:

- title: `Season Threads`
- summary: `In Forest Trail, inspect three clues that now tie the season together: cool floor cover, sheltered edge growth, and life that can stay above the ground.`

### Beat 2: `Return To Station`

Once `forest-season-threads` is logged:

- do not add another request immediately
- shift the guidance into a station-return note

Recommended guidance surfaces:

- `resolveGuidedFieldSeasonState()`
- `resolveFieldAtlasState()`
- `resolveFieldSeasonWrapState()`

Target feel:

- the notebook outing is finished
- the player now has a clear calm reason to reopen the field station
- the season feels like it is ready for formal closure without needing another long travel chain

Suggested tone:

- station note title: `RETURN TO STATION`
- station note text: `The season threads are logged. Return to the field station for a calm season close.`

## Main-Agent Scope For `main-95`

The cleanest implementation is:

1. add one new field request definition after `forest-expedition-upper-run`
2. extend guided season state with one capstone-active stage and one capstone-return stage
3. update atlas and season-wrap copy so the station points at the capstone while it is active, then points back to the field station once it is done
4. verify the request and station states through focused tests plus one seeded runtime smoke pass

## Expected File Touches

- `src/engine/field-requests.ts`
- `src/engine/guided-field-season.ts`
- `src/engine/field-season-board.ts`
- `src/test/field-requests.test.ts`
- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`
- `src/test/content-quality.test.ts`

## Guardrails

- keep the capstone to one compact outing, not a new three-step ladder
- do not add a new station page, capstone page, or chapter dashboard
- do not add a second full expedition card
- do not make the nursery required for the capstone
- keep the finale notebook-first and forest-centered

## Queue Guidance

- close `ECO-20260330-scout-62` with this report
- promote `ECO-20260330-main-95` to `READY`
- keep `ECO-20260330-critic-70` blocked until the implementation lands
