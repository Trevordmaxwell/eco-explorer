# Filed Arc Final Frame Proof Handoff

Created: 2026-04-20

Queue: `ECO-20260420-scout-356`
Packet: `.agents/packets/137-filed-arc-epilogue-and-replay-intent.json`
Role: `scout-agent`
Lane: `lane-3`

## Scout Finding

The filed High Pass arc is already stable on the lane-1, lane-2, and lane-4 surfaces. The remaining lane-3 contribution should not add another visual, route prompt, or station panel. It should only make the existing final field-station frame proof explicit so the completed arc reads as calm and filed rather than as unfinished work.

## Current Coverage

- Filed High Pass snapshot coverage already proves the station subtitle, archive strip, atlas line, route-board filed state, world-map marker suppression, replay-label suppression, and journal task suppression.
- The lane-3 homecoming visual pass already proves the station frame can carry a tiny upper-frame cap without growing the lower sill, side gutters, or an extra panel.
- Overlay tests already prove archived High Pass can keep its late-season lintel while homecoming adds only the small cap memory.
- The gap is narrow: the `high-pass-filed` station snapshot does not yet explicitly assert its `fieldStation.backdropAccent` endcap state.

## Recommended Main Target

Add a test-only final-frame guard to `src/test/save-snapshots.test.ts`, preferably inside `boots the filed High Pass snapshot into settled station and journal state`.

The assertion should prove the filed station frame keeps the completed-arc accents:

- `hasLeftBrace: true`
- `hasRightBrace: true`
- `hasCenterTie: true`
- `hasLateSeasonLintel: true`
- `hasHomecomingFrameAccent: false`
- `homecomingMilestoneRequestId: null`

Only change runtime rendering or station accent logic if that guard fails. If a runtime fix is needed, keep it on the existing `field-station-homecoming-shell` seam and capture browser proof because that would become a visual change.

## Out Of Scope

- No new player-facing copy.
- No route state, route definitions, support behavior, world-map behavior, journal behavior, save schema, nursery behavior, or science-content changes.
- No new station panel, HUD chip, replay prompt, or season-three promise.
- No geometry or traversal changes for this packet.

## Verification Baseline

- `npm test -- --run src/test/save-snapshots.test.ts -t "filed High Pass"` passed.
- `npm test -- --run src/test/overlay-copy.test.ts -t "archived High Pass|homecoming memory"` passed.

## Main Verification

- `npm test -- --run src/test/save-snapshots.test.ts -t "filed High Pass"`
- `npm test -- --run src/test/overlay-copy.test.ts -t "archived High Pass|homecoming memory"`
- `npm run build`
- `npm run validate:agents`
- packet `137` JSON parse
- `git diff --check`
