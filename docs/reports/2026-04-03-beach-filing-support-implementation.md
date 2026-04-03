# 2026-04-03 Beach Filing Support Implementation

Implementation report for `ECO-20260403-main-196`.

## Scope

Make the first beach Route v2 return feel more intentional by keeping the authored notebook-ready cue visible on the closing wrack inspect and by giving `note-tabs` one short logged beach close after filing.

## What Landed

- `src/engine/game.ts` now lets the route-ready notice keep priority when an inspect both closes a Route v2 note and claims a nursery resource. The beach `bull-kelp-wrack` step still awards litter and still shows the resource note in the fact bubble, but it no longer replaces `NOTEBOOK READY` on that exact inspect.
- `src/engine/field-season-board.ts` now gives `note-tabs` one narrow front-half exception while `Shore Shelter` is logged and `Hidden Hollow` has not yet taken over: the routes strip reads `SHORE SHELTER LOGGED` with `Sunny Beach closes the shore shelter line. Hidden Hollow waits inland.`
- Other support behavior stays unchanged:
  - ordinary nursery gathers still use `NURSERY SUPPLY`
  - `hand-lens` and `route-marker` still keep their existing travel-facing route copy
  - the existing beach notebook-ready preview and filed note text stay in place

## Test Coverage

Updated:

- `src/test/field-season-board.test.ts`
- `src/test/runtime-smoke.test.ts`

The coverage now locks:

- notebook-ready notice priority on the closing beach wrack inspect
- the `note-tabs` beach-close strip after filing `Shore Shelter`
- the existing one-press routes-page filing flow

## Verification

- `npx vitest run src/test/field-season-board.test.ts`
- `npx vitest run src/test/runtime-smoke.test.ts -t "Shore Shelter|files a notebook-ready route from the routes page with one Enter press"`
- `npm run build`

## Handoff Note

`critic-169` should confirm that the new priority rule stays narrow to the route-closing inspect, that nursery feedback still survives in normal gathering moments, and that the new `note-tabs` strip feels like a compact page close instead of a second station card.
