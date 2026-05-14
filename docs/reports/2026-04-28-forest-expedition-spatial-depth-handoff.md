# Forest Expedition Spatial Depth Handoff

Date: 2026-04-28
Role: scout-agent
Lane: lane-3
Queue item: `ECO-20260428-scout-494`
Packet: `.agents/packets/187-lane-3-forest-expedition-spatial-depth.json`

## Scout Read

The next forest spatial beat should be the existing expedition upper-run carry:

- `filtered-return` mouth after the `root-hollow-cave-trunk` climb
- `log-run-high-run-log` into `creek-bend-high-run-log`
- old-wood bridge / hinge edge into the `old-growth-main-trunk` foot

This is the first forest expedition segment beyond the already reviewed under-basin -> cave-trunk -> upper-return proof. It stays inside current Forest Trail authored geometry and avoids route, station, save, content-only, traversal-HUD, cave-framework, and physics scope.

## Proof Captured

Fresh native canvas proof lives in:

- `output/lane-3-scout-494-forest-expedition-spatial-proof/`

Frames:

- `filtered-return-to-high-run-256x160.png`: filtered-return mouth shows root-curtain context plus the exit/high-run carry ahead.
- `high-run-bridge-hinge-256x160.png`: high run enters the old-growth bridge/hinge band with `old-wood-hinge-light` visible.
- `giant-trunk-foot-arrival-256x160.png`: old-growth trunk foot shows the main trunk climb and bark/wood carriers in the same native frame.

`assertions.json` confirms all captures are native `256x160`, the expected zones match, `old-wood-hinge-light` is present in the bridge/hinge frame, `old-growth-main-trunk` is in range at the trunk-foot frame, and the expected carriers are nearby.

## Finding

No real spatial readability issue is proven yet. The route already reads as a physical carry at native scale, but it has not had a main-agent proof pass like the earlier under-basin/cave-return proof did.

## Main Contract

Promote `ECO-20260428-main-494` as a proof-first task:

- Recreate the Forest expedition upper-run carry in a fresh browser proof: filtered-return mouth -> high-run bridge/hinge -> old-growth trunk foot.
- Treat proof closure as a valid completion if the fresh frames stay readable.
- If and only if fresh proof shows a real placement issue, apply one tiny Forest-local geometry or existing-carrier fix around `log-run-high-run-log`, `creek-bend-high-run-log`, `old-growth-crossover-limb`, or the `old-growth-main-trunk` foot.
- Do not edit station, route-board/catalog semantics, save schema, content-only surfaces, traversal framework, physics, or add a new cave/biome/route beat.

Suggested focused checks:

- `npm test -- --run src/test/forest-biome.test.ts -t "high-run carry|old-growth|root-hollow"`
- `npm test -- --run src/test/runtime-smoke.test.ts -t "high run|old-growth|Root Hollow|upper-return"`
- `npm run build` only if runtime code changes land.
