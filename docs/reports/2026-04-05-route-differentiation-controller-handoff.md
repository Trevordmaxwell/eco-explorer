# Route Differentiation Controller Handoff

## Queue Ref

- `ECO-20260405-scout-280`
- prepares `ECO-20260405-main-280`

## Recommended Seam

The safest lane-1 split is a small route-differentiation controller helper that sits between `game.ts` and the existing route-state logic in `field-requests.ts`.

The current coordinator pressure is concentrated in one cluster inside `src/engine/game.ts`:

- `getFieldRequestState(...)`
- `getJournalFieldRequest()`
- `getRouteMarkerLocationId()`
- `getWorldMapReplayLabel(...)`
- `getFieldRequestContext()`
- `getActiveFieldRequest()`
- `getFieldRequestHint()`
- the inline hand-lens notebook-fit checks in `inspectEntity(...)` and `getNearestInspectable()`

That cluster already acts like a mini controller, but it is still embedded in the main runtime coordinator. The next route-feel pass will likely add more support-specific or route-variant reads there unless the seam is extracted first.

## Suggested Main Pass

Create one pure or mostly-pure helper that:

- resolves the route-differentiation state once from the current runtime context
- exposes the derived values `game.ts` actually needs for route-marker, replay-label, journal, hint, and hand-lens notebook-fit decisions
- keeps `field-requests.ts` as the owner of route logic and route-facing live variants

The likely shape is a tiny helper module adjacent to `field-requests.ts`, not a new planner system and not a broad new state container.

## Why This Seam

- It removes a growing bundle of route-facing wrapper functions from `game.ts`.
- It gives later support or route-variant changes one narrower place to land.
- It preserves current behavior because the route rules still come from `field-requests.ts`.
- It avoids pushing route-board or station concerns into this pass.

## Explicit Non-Goals

- do not widen the field-station shell
- do not add a new HUD, planner row, or support slot
- do not move route-board copy work into this controller split
- do not rewrite all field-request plumbing in one pass

## Short Review-Drop Truth

The packaging note can stay short and practical in `README.md`:

- external review or playable archive drops should omit `node_modules` so another machine can install cleanly

This truth is already durable in project memory, so the main pass only needs to make it explicit in a reviewer-facing doc surface.
