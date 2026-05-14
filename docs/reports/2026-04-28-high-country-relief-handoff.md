# High-Country Relief Handoff

Date: 2026-04-28
Lane: lane-3
Queue item: ECO-20260428-scout-477
Role: scout-agent
Packet: .agents/packets/178-lane-3-spatial-depth-runway.json

## Scout Verdict

Promote one tiny Tundra-local implementation. Treeline's Source Shelter edge and Tundra's late meltwater thread both read cleanly at native `256x160`, but Tundra's `snow-meadow-drift-rest` still shares interaction range with the `HIGH COUNTRY MAP` return post.

## Proof

Scout proof directory:

- `output/lane-3-scout-477-high-country-relief-proof/`

Relevant frames:

- `treeline-source-pocket-before-prompt-256x160.png`: Treeline `lichen-fell`, player x=577 y=97, no nearby travel target.
- `treeline-source-edge-prompt-separated-256x160.png`: Treeline `lichen-fell`, player x=581 y=97, `TO TUNDRA REACH` appears, nearest inspectable is `stable-fell-heaths-1-white-arctic-mountain-heather-581`; the prior Source Shelter ptarmigan competition remains fixed.
- `tundra-snow-drift-map-post-overlap-256x160.png`: Tundra `snow-meadow`, player x=252 y=99, `HIGH COUNTRY MAP` is in range while the nearest inspectable is `authored-snow-meadow-drift-sedge-bigelows-sedge`.
- `tundra-meltwater-bank-rest-256x160.png` and `tundra-melt-thread-right-256x160.png`: Tundra `meltwater-edge` remains readable with no nearby travel target.

`errors.json` is empty. All captured frames report native `256x160`.

## Main-477 Contract

Recommended target:

- Separate Tundra's `snow-meadow-drift-rest` memory pocket from the `HIGH COUNTRY MAP` post without moving the map post.

Allowed edit scope:

- `src/content/biomes/tundra.ts`
- `src/test/tundra-biome.test.ts`
- `src/test/runtime-smoke.test.ts` if adding a focused no-travel-prompt proof helps

Suggested implementation:

- Try a tiny rightward nudge of `snow-meadow-drift-rest` from x=252 into roughly the x=266-270 band, adjusting only the paired `snow-meadow-drift-sedge` and `snow-meadow-drift-ptarmigan` carriers as needed.
- Keep the pocket inside `snow-meadow`, keep a readable gap before `thaw-skirt-entry-heave` at x=306, and do not add another platform, carrier, route beat, or prompt.
- Do not edit `src/content/world-map.ts`, the map-return post, travel framing, station, route state, save schema, physics, or traversal helpers.

Required proof:

- Capture fresh native `256x160` proof under `output/lane-3-main-477-high-country-relief-proof/`.
- At minimum include a Tundra drift-rest settled frame where `nearbyTravelTarget` is `null`, plus a meltwater frame to confirm the later Tundra thread stayed clean.
- Run focused Tundra/runtime checks and `npm run build` because a content geometry edit would land.

## Out Of Scope

- New high-country pockets, new climbables, new cave/vertical framework, route-board changes, station shell changes, journal-only content, new species or science copy, map-return post relocation, or player physics changes.
