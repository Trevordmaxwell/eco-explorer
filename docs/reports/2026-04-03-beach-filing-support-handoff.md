# 2026-04-03 Beach Filing And Support Handoff

Scout handoff for `ECO-20260403-scout-158`.

## Scope

Prepare one compact follow-on that makes the first beach Route v2 return feel intentional without adding a new support row, station page, or recap shell.

## What The Current Runtime Is Doing

- `src/engine/game.ts` already reaches the right beach ending state. On the last `bull-kelp-wrack` inspect, `maybeCompleteActiveFieldRequest('inspect', entry.id)` marks `beach-shore-shelter` as `ready-to-synthesize` and shows the authored notebook-ready notice.
- That same inspect can also claim the existing wrack nursery resource. Immediately after the route-ready call, `inspectEntity()` still runs `showFieldNotice('NURSERY SUPPLY', nurseryGathering.note, 1.9)`, which overwrites the stronger notebook-ready cue on the exact closing beat.
- `src/engine/field-season-board.ts` already gives `note-tabs` the route-title preview and clue-backed filed sentence while the beach note is ready. After filing, though, the strip falls back to the generic `TODAY / Shore shelter logged. Follow shelter inland.` line instead of giving `note-tabs` one short page-close beat like the later `edge-pattern-line` exception.

## Best Next Slice

Keep `main-196` to two tightly scoped adjustments:

1. Make the notebook-ready notice win over `NURSERY SUPPLY` when the same inspect closes `Shore Shelter`.
2. Give `note-tabs` one compact beach-specific logged-return strip after `Shore Shelter` is filed and before `Hidden Hollow` is logged.

That keeps the beach return inside the current Route v2, notice, and season-wrap seams while making the first front-half outing land more cleanly.

## Recommended Main-Agent Changes For `main-196`

### 1. Protect the beach notebook-ready cue in `src/engine/game.ts`

- Keep the nursery resource award itself.
- Keep the fact-bubble `resourceNote`.
- Only stop the nursery notice from replacing the stronger route-ready notice when both happen on the same inspect.

Cleanest shape:

- let `maybeCompleteActiveFieldRequest()` report whether it showed a ready-to-synthesize notice, or
- check the just-written `fieldRequestNotice` before calling the nursery notice

Desired outcome:

- the final wrack inspect shows `NOTEBOOK READY`
- the player still receives the litter resource
- ordinary nursery gathers that do not finish a route still show `NURSERY SUPPLY`

### 2. Add one `note-tabs` beach close in `src/engine/field-season-board.ts`

Use the same narrow route-specific wrap pattern already used for `edge-pattern-line`, but only for the short post-file beach handoff state:

- support: `note-tabs` only
- route: `coastal-shelter-line`
- state: `beach-shore-shelter` complete, `forest-hidden-hollow` not yet complete

Recommended strip:

- label: `SHORE SHELTER LOGGED`
- text: `Sunny Beach closes the shore shelter line. Hidden Hollow waits inland.`

Leave the existing generic `TODAY` / travel-facing behavior alone for:

- `hand-lens`
- `route-marker`
- later `Beach To Hollow` and deeper forest states

## Why This Slice Is Better Than The Alternatives

### Do not suppress nursery feedback globally

That would fix the beach clash, but it would also erase the normal reward cue from unrelated safe gathering moments. The problem is timing priority, not the nursery system itself.

### Do not widen `place-tab` or `route-marker`

Those supports are not the meaningful early-beach seam. The first beach outing already lives on `note-tabs`, so broadening the later support row would add complexity before the player can even use it here.

### Do not add another notebook or station surface

The current route-title preview, filed notice, and season-wrap seams are already enough. This step only needs to make them land in the right order.

## Focused Test Targets

- `src/test/runtime-smoke.test.ts`
  - assert the final `bull-kelp-wrack` inspect leaves `fieldRequestNotice.title === 'NOTEBOOK READY'`
  - assert filing the beach note leads to the new `note-tabs` logged strip before `Hidden Hollow`
- `src/test/field-season-board.test.ts`
  - add one `note-tabs` beach post-file wrap expectation
- `src/test/field-requests.test.ts`
  - only touch if a helper signature changes while protecting the ready-state notice path

## Guardrails

- keep the nursery resource gain
- keep the current beach ready preview and filed sentence unless a test proves they need matching copy cleanup
- do not add a new field-station card, route ledger, or reward overlay
- keep the new strip short enough for the compact `256x160` routes shell
