# Coastal Corridor Spatial Depth Handoff

Date: 2026-04-28
Role: scout-agent
Lane: lane-3
Queue item: `ECO-20260428-scout-493`
Packet: `.agents/packets/186-lane-3-coastal-corridor-spatial-depth.json`

## Scope Read

The coastal front half now has three useful physical anchors:

- Beach to Coastal Scrub already has a held back-dune lip/rest inside the corridor.
- Coastal Scrub forest-edge already has a dense release cluster and no travel prompt at the first checked release frame.
- Forest Trail already has a trailhead edge log after corridor arrival.

The real spatial readability gap is the middle of the `coastal-forest-corridor`: it has honest transition carriers (`sword-fern`, `salmonberry`, `nurse-log`, shore pine, Douglas-fir sapling), but no authored physical hold. At native `256x160`, the center reads as a smooth carrier line instead of a small sheltered step between scrub and forest.

## Browser Proof

Proof folder:

- `output/lane-3-scout-493-coastal-corridor-spatial-proof/summary.json`
- `output/lane-3-scout-493-coastal-corridor-spatial-proof/assertions.json`
- `output/lane-3-scout-493-coastal-corridor-spatial-proof/errors.json`

Key frames:

- `beach-coastal-back-dune-held-shelf-256x160.png`: beach-to-scrub corridor reaches scrub-owned `back-dune` with existing held shelf readable.
- `coastal-scrub-forest-edge-release-256x160.png`: Coastal Scrub forest-edge release has the expected cover density and `nearbyTravelTarget: null` at the checked frame.
- `coastal-forest-center-carriers-no-rest-256x160.png`: coastal-to-forest corridor center shows carriers around x=104-171, but no small physical rest.
- `forest-trailhead-arrival-256x160.png`: Forest Trail arrival reaches `trailhead` and keeps the expected return prompt at the left door.

All captured canvas frames are native `256x160`; `assertions.json` passes the route-state checks above, and `errors.json` is empty.

## Main Contract

Promote `ECO-20260428-main-493` with this narrow contract:

- Touch only `src/engine/corridor.ts` and `src/test/corridor.test.ts` unless fresh proof shows a directly local need.
- Add one tiny authored hold inside `COASTAL_TO_FOREST_CORRIDOR_ID`, using existing platform sprites and existing carriers only.
- Prefer a two-step root/log rest around the current salmonberry/nurse-log transition, roughly x=108-148 and y=98-102, with the left lip still on the coastal-scrub-owned half and the rest near or just across the threshold.
- Do not add new carriers, new route beats, travel prompts, station work, route-board logic, route catalog semantics, save schema, traversal helpers, or physics changes.
- Keep the corridor fully exit-safe into Forest Trail.

## Proof And Checks For Main

Main should capture fresh native `256x160` proof after any geometry change:

- coastal-forest corridor center with the new hold visible
- Forest Trail arrival after exiting the corridor
- optional unchanged beach-to-scrub held shelf frame if the implementation touches shared corridor rendering

Focused checks:

- `npm test -- --run src/test/corridor.test.ts`
- focused runtime corridor chain check covering the coastal-to-forest exit
- `npm run build`

