# 2026-04-03 Beach Process Moment Handoff

Prepared for `ECO-20260402-scout-150` in lane 2.

## Scope Reviewed

- `docs/reports/2026-04-03-lane-2-front-half-and-parity-follow-ons.md`
- `.agents/packets/074-beach-process-moment-phase.json`
- `src/content/biomes/beach.ts`
- `src/content/biomes/coastal-scrub.ts`
- `src/content/biomes/forest.ts`
- `src/content/biomes/treeline.ts`
- `src/content/biomes/tundra.ts`
- `src/engine/habitat-process.ts`
- `src/engine/biome-scene-render.ts`
- `src/test/habitat-process.test.ts`
- `docs/science-source-ledger.md`

## Read

- Beach is now the only live biome without a `processMoments` entry, even though its tide-line already has the clearest process-ready content set in the front half: `bull-kelp-wrack`, `beach-hopper`, `pacific-sand-crab`, plus the existing `washed-clues` and `Wrack Workers` note seams.
- The current process system only keys off revisit count, weather, phenology, zone, and entry ids. It does not support day-part gating, so the cleanest beach process should use `marine-haze` instead of inventing a new day-part branch just for this lane.
- The render budget is already there. `main-188` can stay inside the existing `HabitatProcessStyle` set instead of widening lane 2 into another renderer/style pass.
- The strongest science-safe beach process is the wrack line itself, not another sand-hold or shelter beat. The partner and ecosystem-note wave already spent the lee-pocket budget on shelter language, so this step should move to the wave-delivered food line.

## Recommendation

Treat `main-188` as one compact tide-line process moment:

`wrack-hold`

That should be a late revisit beach process built on the existing wrack and scavenger content, not a broader beach weather system. The best v1 is a damp wrack-line moment during `marine-haze`, using the existing `moisture-hold` visual style so the main agent does not have to add another renderer branch.

This is an inference from the sources below taken together:

- Point Reyes describes coastal fog as a result of upwelling on this Pacific coast.
- Point Reyes beach habitat writing says beach hoppers stay moist in wet seaweed and break down washed-up material.
- NOAA sanctuary material says kelp wrack supports sand crabs and the shorebird food web.

That is enough to justify a compact `marine-haze` wrack hold without teaching a bigger meteorology lesson.

## Exact Process Plan

### `wrack-hold`

Recommended wiring:

- biome: `beach`
- moment id: `wrack-hold`
- style: `moisture-hold`
- entry ids:
  - `bull-kelp-wrack`
  - `beach-hopper`
  - `pacific-sand-crab`
- zone ids:
  - `tide-line`
- minimum visit count: `2`
- weather profiles:
  - `marine-haze`
- phenology phases:
  - `late`

Why this is the best first beach process:

- it uses the existing late-beach wrack emphasis already authored in `beach.ts`
- it stays visible on the live front-half route instead of hiding the whole pass at the far-right tidepool
- it teaches beach recycling and food-web transfer, which is a stronger next ecology lesson than one more shelter line
- it can reuse an existing process style and avoid new renderer drift

Suggested color direction:

- primary: muted kelp green or olive-brown
- secondary: pale sand or damp foam accent

## Explicit Non-Candidates For This Pass

- `lee-pocket` sand hold: too close to the just-landed shelter notes and partner cues
- `tidepool`-only process: too edge-local for the first beach process pass and too easy to miss
- a new `dayPart`-gated beach process: the current habitat-process seam does not support day-part rules, and widening that seam belongs in a larger systems lane
- a brand-new process style: unnecessary for the first beach parity step
- a route-board or field-request rewrite: this pass should stop at the visual beach process itself

## Guardrails For `main-188`

- add exactly one beach `processMoments` entry
- keep the pass inside existing habitat-process and renderer seams
- do not add a new `HabitatProcessStyle`
- do not widen the pass into route variants, notebook prompts, or partner chatter
- keep the process readable on the tide-line through existing entries and one browser proof

## Suggested File Targets

- `src/content/biomes/beach.ts`
- `src/test/habitat-process.test.ts`
- `src/test/runtime-smoke.test.ts`
- `docs/science-source-ledger.md`

## Suggested Verification

- `npm test -- --run src/test/habitat-process.test.ts src/test/runtime-smoke.test.ts`
- `npm run build`
- one seeded browser/state capture showing the active beach process on the tide line during a late `marine-haze` revisit

## Source Trail

- [Point Reyes Pacific Ocean page](https://www.nps.gov/pore/learn/nature/oceans.htm): upwelling creates summer coastal fog on this Pacific branch
- [Point Reyes Resource Newsletter: Defining Habitats](https://www.nps.gov/pore/learn/upload/resourcenewsletter_defininghabitats.pdf): beach hoppers stay moist in wet seaweed and break down dead things washed onto the beach
- [NOAA Eyes in Sanctuaries sandy beach notes](https://sanctuaries.noaa.gov/education/eyes-in-sanctuaries.html): kelp wrack supports sand crabs and the predators that feed on them
- [Crissy Field native plants note](https://home.nps.gov/articles/000/crissy-native-plants.htm): rain and fog provide water for established native coastal plants, supporting the conservative “marine haze keeps the beach calmer/damper” framing

## Queue Outcome

- Close `ECO-20260402-scout-150`.
- Promote `ECO-20260402-main-188` to `READY`.
- Keep `ECO-20260402-critic-161` blocked until the beach process lands.
