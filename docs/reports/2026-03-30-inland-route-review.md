# 2026-03-30 Inland Route Review

## Scope

Critic review for `ECO-20260330-critic-41`: check whether the second live route makes the inland branch feel authored, stays notebook-first, and keeps the field-station board compact.

## What I Reviewed

- `src/engine/field-season-board.ts`
- `src/engine/field-requests.ts`
- focused tests for field-season board, field requests, and runtime smoke
- full `npm test`
- `npm run build`
- live browser pass on the field-station overlay and world map route marker

## Result

No blocking issues.

The inland route now reads like a real second chapter instead of a vague `next line` teaser:

- the board stays single-route and compact rather than growing into a two-route dashboard
- `Treeline Shelter Line` has its own identity, branch label, and three medium beats
- the route uses treeline shelter and tundra short-season signals instead of repeating the coastal station-return rhythm
- `Route Marker` now flips inland cleanly, so the board and map support each other

## Strengths

1. The pacing is distinct from the coastal line.
   - The treeline request, tundra request, and tundra survey finish feel like one inland arc instead of a colder reskin of the first route.

2. The board still fits the handheld surface.
   - The route stays grouped into three beats with short titles and readable progress labels.

3. The implementation uses existing systems well.
   - The route is carried by the current notebook request chain, survey-state finish, and route-marker support instead of another progression shell.

## Watchlist

- The inland route now has a solid shell, but it still needs the planned alpine content-fuel pass so treeline and tundra feel as authored as the coast already does.
- The field-station overlay is still compact enough that any copy growth in the inland route beats should keep getting browser checks.

## Verification

- `npm test -- --run src/test/field-season-board.test.ts src/test/field-requests.test.ts src/test/runtime-smoke.test.ts`
- `npm test`
- `npm run build`
- live browser pass at `http://127.0.0.1:4189/` showing `TREELINE SHELTER LINE` in the field station with `routeMarkerLocationId: "treeline"` and zero console errors

## Queue Guidance

- `ECO-20260330-critic-41` can close cleanly.
- `ECO-20260330-main-66` should be promoted to `READY` for the alpine content-fuel pass.
