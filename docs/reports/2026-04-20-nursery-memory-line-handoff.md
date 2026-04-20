# Nursery Memory Line Handoff

Created: 2026-04-20

## Queue Item

- Completed: `ECO-20260420-scout-347`
- Packet: `.agents/packets/135-nursery-memory-and-teaching-bed-readability.json`
- Lane: `lane-2`

## Recommendation

Keep lane 2's packet `135` pass to one authored copy refresh: update the mature `salmonberry-bed` habitat-memory line so the teaching bed remembers both a route place and the science relationship behind that place.

Use this line:

`Cool forest edge where salmonberry thickets hold shade.`

It is one sentence, 55 characters including the period, and stays under the live `NURSERY_MEMORY_SUMMARY_MAX` budget of 56.

## Why Salmonberry

- `salmonberry` already has verified source-ledger support as a Pacific coastal forest-edge species.
- The shared entry says salmonberry grows in moist coastal forests and edges, feeds wildlife, and builds sheltered thickets with dense stems.
- Coastal Scrub already teaches that logs and berries mark cooler, wetter ground near the scrub edge.
- Forest already teaches that berries and low leaves show where cool cover still holds at wetter forest edges.
- The existing nursery route-support seam already uses `nursery:salmonberry-support` for the `forest-cool-edge` beat, so this refresh deepens the memory line without changing route behavior.

## Main-Agent Scope

Recommended implementation for `ECO-20260420-main-347`:

- Change only `salmonberry-bed.memorySummary` in `src/engine/nursery.ts`.
- Update the existing mature-bed habitat-memory assertion in `src/test/nursery.test.ts`.
- Add a tiny assertion in that same test that the line still carries `forest edge`, `salmonberry`, and `shade`.
- Add `docs/reports/2026-04-20-nursery-memory-line-implementation.md`.

## Non-Goals

- Do not edit nursery layout, station state, route-support selection, save schema, route controller behavior, world geometry, or renderer structure.
- Do not add a new nursery card, notebook page, station panel, or route hint.
- Do not update the science-source ledger unless the copy drifts beyond the existing verified salmonberry support.
- Do not rework the other five nursery memory lines in this pass.

## Verification Target

- `npm test -- --run src/test/nursery.test.ts src/test/content-quality.test.ts`
- `npm run build`
- `npm run validate:agents`
- `git diff --check`

## Handoff Note

`src/engine/nursery.ts` is outside lane 2's preferred content path, but the current nursery project definitions live there. This pass is safe only because it is a single authored-copy edit with no changes to nursery state, route support plumbing, rendering, or station behavior.
