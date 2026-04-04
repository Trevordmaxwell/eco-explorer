# 2026-04-04 Route-Marker Guidance Review

Reviewed `ECO-20260404-main-261`.

## Result

No blocking issues found.

## What Holds Up

- The pass stays inside the intended lane-4 seam. `route-marker` now changes map-planning feel through focus behavior only, without adding another travel chip, overlay, or station row.
- The behavior is support-specific and reversible. Existing non-`route-marker` entry behavior still holds, while `route-marker` now creates a real difference both when opening the map from play and when returning from the field station to an already-open map.
- The focused runtime coverage is proportionate to the change:
  - one seed proves route-marker-selected map entry now lands on the outing target
  - one seed proves selecting route-marker inside the field station now returns to that same target on the world map
  - the broader `Open To Shelter` regression still keeps its older non-route-marker footer behavior

## Watch Item

- If a later follow-on wants to make `route-marker` gentler, keep that exploration inside the same support-selected behavior seam. Do not let future travel warmth work turn target focus into a global world-map default for every support.

## Verification Reviewed

- `npx vitest run src/test/runtime-smoke.test.ts -t "route marker|turns the coastal front-half transition into a notebook-ready Open To Shelter outing and files it at the station"`
- `npm run build`
