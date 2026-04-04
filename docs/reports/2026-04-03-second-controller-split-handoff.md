# 2026-04-03 Second Controller Split Handoff

Prepared `ECO-20260403-scout-227` against packet `096`.

## Recommendation

The second pre-chapter controller split should target the pure field-request and outing-state cluster in `src/engine/game.ts`, not the field-station input handlers.

Recommended implementation target for `ECO-20260403-main-227`:

- extract the pure request-and-outing derivation work into a helper such as `src/engine/field-request-state.ts`
- leave timer mutation, guided notice gating, and station input side effects in `game.ts`

## Why This Seam Now

This is the safest next high-payoff split after the field-station state extraction:

- `getFieldRequestContext()`, `getActiveFieldRequest()`, `getFieldRequestHint()`, `getActiveOutingLocator()`, `getJournalFieldRequest()`, `getRouteMarkerLocationId()`, and `getWorldMapReplayLabel()` now form one dense lane-1 cluster that feeds the notebook hint, journal card, route marker, and world-map replay label.
- Most of that work is already pure derivation layered on top of existing resolvers in `src/engine/field-requests.ts` and `src/engine/field-season-board.ts`.
- Lane 1's next chapter and replay work will keep touching this exact family, so pulling it out now lowers future change cost without redesigning station flow.
- The field-station interaction cluster is smaller but much more side-effect-heavy: it mixes input routing, audio cues, persistence, filing, upgrade purchase, and world-map transitions. Extracting that next would either widen the change or create an awkward half-controller seam.
- The full notice family is still more cross-cutting than needed for this pass because it owns timer writes and guided gating. A pure request/outing helper makes that later cluster easier to isolate if lane 1 ever needs a third split.

## Scope For Main-227

Keep `main-227` narrow and behavior-preserving.

- Add a helper file such as `src/engine/field-request-state.ts`.
- Give the helper the biome registry, world map, save, and a lightweight scene snapshot for current biome, zone, player position, scene mode, overlay mode, and whether a field-request notice is already open.
- Move pure derivations only:
  - field-request context assembly
  - active field-request resolution
  - notebook hint derivation
  - season-outing fallback resolution
  - journal field-request fallback
  - route-marker location resolution
  - world-map replay-label resolution

Keep these in `game.ts` for now:

- `showFieldNotice()`
- `showFieldRequestNotice()`
- `maybeShow*Notice()` family
- `maybeCompleteActiveFieldRequest()`
- field-station input handlers and filing / purchase actions
- small copy-only world-map helpers such as regional warmth, origin, summary, and approach labels if moving them would widen the pass

## Suggested Shape

One safe shape is:

- `src/engine/field-request-state.ts`
- export a small scene-snapshot input type
- export one resolver such as `resolveFieldRequestState(...)` that returns the pure request/outing view payload consumed by `game.ts`

That lets `game.ts` keep the timer and side-effect boundaries while the state math becomes explicit and testable.

## Verification For Main-227

Keep verification focused on unchanged request and outing behavior:

- `npx vitest run src/test/field-requests.test.ts`
- `npx vitest run src/test/runtime-smoke.test.ts -t "surfaces one active field request in the journal and turns Hidden Hollow notebook-ready after the seep-stone confirm|buys route marker after the movement pair and lets the support row activate it on the world map|shows the thaw-window route replay note when re-entering tundra during the active process window"`
- `npm run build`
