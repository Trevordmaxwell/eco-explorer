# Route Support Readability Handoff

Date: 2026-04-28  
Role: scout-agent  
Lane: lane-4  
Queue: ECO-20260428-scout-484  
Packet: .agents/packets/179-lane-4-route-feel-runway.json

## Read

The tiny support slot already changes real route behavior:

- `hand-lens` enables notebook-fit inspect retargeting plus `LENS CLUE` bubble copy through `src/engine/field-request-controller.ts`.
- `note-tabs` keeps the in-field hint progress-first through `getFieldRequestHintState(...)`.
- `place-tab` keeps the in-field hint question-first and the station wrap already resolves route-local place prompts.
- `route-marker` stays map-facing through `src/engine/field-request-state.ts` and only marks active outings, not ready-to-file notes.

The weak readable moment is the support switch itself. `src/engine/game.ts` calls `getOutingSupportNoticeText(nextSupportId)` after cycling the station support row, but that helper currently returns generic five-word copy even when a live route, target biome, or ready-to-file state is known. The smallest implementation should make the existing `OUTING SUPPORT` notice contextual from controller state. It should not add a support row, loadout, planner, station layout, save field, route catalog shape, or new support mechanic.

## Implementation Contract

Implement `ECO-20260428-main-484` as a controller-notice pass:

- Extend `getOutingSupportNoticeText(...)` in `src/engine/field-request-controller.ts` so it can accept the current `ActiveFieldRequest | null` in addition to the selected support id.
- Keep no-active-route fallback copy stable enough for old tests: route marker marks the next map stop, place tab keeps one place question, note tabs keep the route aim visible, and hand lens highlights notebook clues.
- For active gathering Route v2 states, make the notice name what the selected support does right now:
  - `route-marker`: name the target biome/location, for example `Marks Treeline Pass.`
  - `hand-lens`: name the current route clues, for example `Highlights Source Shelter clues.`
  - `note-tabs`: name the current compact progress or route aim, for example `0/3 clues stays visible.`
  - `place-tab`: keep the place-question framing while tying it to the current route title.
- For `ready-to-synthesize` routes, do not imply a map marker or in-field hunt. Use a calm ready-note line such as `Route note is ready.` regardless of support.
- Update `toggleOutingSupport()` in `src/engine/game.ts` to pass the active request from `getFieldRequestController()` into the helper after `cycleSelectedOutingSupportId(save)`.

Keep `getFieldRequestHintState(...)`, hand-lens retargeting, route-marker location resolution, `field-season-wrap.ts`, the station support row renderer, save normalization, and `src/engine/field-request-catalog.ts` behavior unchanged unless a focused test exposes a direct regression.

## Test Contract

Focused proof for main should cover:

- `src/test/field-request-controller.test.ts`
  - generic fallback support notice copy still stays compact
  - active Source to Shore or High Pass support notice copy is contextual for all four support ids
  - ready-to-file support notice copy does not imply a route marker or active outing
  - existing hand-lens, note-tabs, place-tab, and route-marker controller splits still behave as before
- `src/test/runtime-smoke.test.ts`
  - one station support-row toggle on an active route surfaces the contextual `OUTING SUPPORT` notice
  - route-marker still focuses the world map target after the support toggle
- `src/test/field-requests.test.ts`
  - only if the implementation needs an extra ready-to-file active-request assertion; route progression should otherwise remain untouched

Suggested commands:

```sh
npm test -- --run src/test/field-request-controller.test.ts -t "support notice|Source to Shore support|place-tab|route-marker"
npm test -- --run src/test/runtime-smoke.test.ts -t "support row|route marker"
npm run build
```

## Out Of Scope

- No broad content pack, geometry change, station shell restructure, planner UI, save-schema change, route framework, route id/evidence id/slot-order change, support id, inventory/loadout row, or Source to Shore fourth beat.
- Do not move or reshape the route catalog.
- Do not change filed route identity or ready-to-file map-calm behavior.
