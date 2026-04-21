# Lane 4 Alpha Route/Support Signoff

Date: 2026-04-20
Queue: `ECO-20260420-main-437`
Packet: `.agents/packets/157-alpha-release-candidate-and-scope-gate.json`
Lane: `lane-4`

## Final Route Proof

Lane 4 is clear for the alpha RC from a route/support perspective. This signoff does not add route behavior; it records the proof that already exists and the focused checks rerun for packet `157`.

- `docs/reports/2026-04-20-alpha-route-playthrough-checklist.md` gives reviewers the human-readable route spine from fresh `Shore Shelter` through filed `High Pass`.
- `docs/reports/2026-04-20-full-arc-route-state-matrix-review.md` confirms all 11 live Route v2 notebook routes are covered through active state, clue progress, ready-to-file, filing, and next-state handoff.
- `src/test/runtime-smoke.test.ts` includes the live `High Pass` talus-hold filing smoke, including filed notice, cleared active request, cleared route marker/replay label, and cleared journal request.
- Packet `156` lane 4 closed the remaining `Shore Shelter` / `Open To Shelter` ready-to-file suppression guards so active outings may guide and replay, while ready-to-file states send attention back to station filing.

## Verification Run

```bash
npm test -- --run src/test/field-requests.test.ts -t "Route v2|High Pass|Open To Shelter|Shore Shelter|route-marker|replay"
npm test -- --run src/test/field-requests.test.ts
npm test -- --run src/test/runtime-smoke.test.ts -t "High Pass|Open To Shelter|Shore Shelter|Route|routes page|filed"
```

Results:

- Focused route-state slice: 2 files passed, 23 tests passed, 111 skipped.
- Full `field-requests` matrix: 2 files passed, 134 tests passed.
- Focused runtime route-smoke slice: 2 files passed, 23 tests passed, 242 skipped.

Full `npm test` and `npm run alpha:rc` remain lane-1 RC gates after cross-lane blockers clear.

## Post-Alpha Route/Support Opportunities

- Add a full-arc route-state matrix row at the same time any future Route v2 definition lands, so the alpha proof remains complete instead of becoming an after-the-fact audit.
- Continue moving support-biased inspect targeting and debug seams toward the route/controller layer instead of growing new wrapper clusters in `game.ts`.
- Improve replay surfacing only through existing seams such as the world-map footer, route board, or notice strip; do not add a separate route HUD.
- If the next chapter opens, make it one expedition-grade notebook route with clear station filing instead of compressing a fourth full field-season route onto the current board.
- Preserve the active-vs-ready contract: active outings may guide, mark, and replay; ready-to-file states should suppress route pressure and route the player back to station filing.
