# 2026-03-30 Route Marker Review

## Scope

Review `ECO-20260330-main-63`: the next route reward or utility unlock beyond the current movement pair.

## What Changed

- Added `Route Marker` as the third field-station upgrade after `Trail Stride` and `Field Step`.
- The active field-season board now exposes a `targetBiomeId` so route progress can point at a biome without growing into a larger quest shell.
- The world map now renders a small route marker on the next active route stop when the upgrade is owned.

## Critic Read

No blocking issues.

Why this reward is working:

- It is useful without changing the genre. The player gets a clearer next-stop read, not a new economy system.
- It stays science-safe and station-safe. The reward supports route planning and observation instead of extraction or inventory pressure.
- The implementation is future-friendly: the marker follows the current route target and will keep working as later routes come online.

## Verification

- Focused tests passed:
  - `src/test/field-station.test.ts`
  - `src/test/field-season-board.test.ts`
  - `src/test/runtime-smoke.test.ts`
- Full `npm test` passed.
- `npm run build` passed.
- Representative browser pass passed at `http://127.0.0.1:4189/` with:
  - `worldMap.routeMarkerLocationId = "coastal-scrub"`
  - a visible map marker for the next stop
- Browser console errors: `0`

Screenshot:

- `var/folders/ld/2qx3rhlj7pb2hp1n_cdlhf9r0000gn/T/playwright-mcp-output/1774895773778/page-2026-03-30T19-00-45-697Z.png`

## Queue Guidance

- Close `ECO-20260330-main-63`.
- Close `ECO-20260330-critic-40`.
- Promote `ECO-20260330-main-64` to `READY`.
