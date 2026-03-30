# Day-Part Mood Matrix Handoff

Date: 2026-03-28
Status: Ready for future implementation after phase two stabilizes

## Method

- read queue item `ECO-20260328-scout-18`, packet `017`, and parked `main-31`
- reviewed:
  - `docs/reports/2026-03-28-living-world-sequence.md`
  - `docs/reports/2026-03-28-living-world-grounding-handoff.md`
  - `docs/reports/2026-03-28-living-world-preproduction-sequence.md`
  - `.agents/packets/014-living-world-sequence.json`
  - `src/engine/biome-scene-render.ts`
  - `src/engine/types.ts`
  - `src/assets/palette.ts`
  - `src/assets/ambient.ts`
  - `src/content/biomes/beach.ts`
  - `src/content/biomes/coastal-scrub.ts`
  - `src/content/biomes/forest.ts`
  - `src/content/biomes/treeline.ts`
  - `src/content/biomes/tundra.ts`

## Core Recommendation

The first day-part pass should ship three reliable readable states:

- `dawn`
- `day`
- `dusk`

Treat `moonlit evening` as an optional stretch profile, not a required v1 state.

That recommendation fits the current renderer because the live game still depends on:

- bright sky-to-ground separation
- small sprite readability at `192x144`
- visible inspect markers, door highlights, shells, berries, and small animals

A true dark-night pass would push too much risk into the current five-biome art stack too early, especially in `forest` and `coastal-scrub`, where the lower half already clusters around darker greens and browns.

## Shared Visual Rules For `main-31`

Day-part should start as authored palette profile swaps, not as a full-screen darkening overlay.

Safe first-change surfaces:

- sky gradient colors
- parallax layer colors
- cloud tint
- beach sun treatment and sea highlight color
- sparkle emphasis or density if it stays subtle

Do not change in the first pass:

- player sprite colors
- inspect marker colors
- door highlight logic
- movement, spawn rules, or platform readability

Hard no-go rules for v1:

- no black silhouette scenes
- no global multiply overlay that muddies the ground plane
- no true night state if the beach shells, forest floor, or tundra platform edges become harder to read
- no biome-specific one-off logic that bypasses the planned shared `world-state` seam

## Five-Biome Mood Matrix

| Biome | Dawn | Day | Dusk | Moonlit Evening Stretch | Readability Risks / No-Go |
| --- | --- | --- | --- | --- | --- |
| `beach` | Peach-gold horizon, pale surf glow, low warm dune light. | Keep close to current live baseline. | Coral-lavender sky, cooler water, warm dune ridge. | Cool blue sky and silver foam can work later. | Do not darken tide-line shells, plovers, door gap, or the player against the sea band. |
| `coastal-scrub` | Marine haze with a warm dune edge and soft olive scrub. | Keep current misted green baseline. | Sage-and-rose sky, slightly deeper pine band, readable back dune. | Optional only if it stays close to dusk, not true night. | Back dune, shrub band, and pine stand flatten fast if pushed into gray-green darkness. |
| `forest` | Pale mist opening above the canopy with a warm upper-trunk edge. | Keep current diffuse green baseline. | Amber canopy rim and cooler creek-side shadow. | Not recommended for the first pass. | The floor, tree band, and small entities already sit close in value; avoid blue-black washes. |
| `treeline` | Cold pink ridge light, bright stone edge, crisp pale fell sky. | Keep current airy alpine baseline. | Lavender-slate sky with lighter lichen and stone accents. | Possible later if the fell stays bright and open. | Krummholz, scree, and lichen patches can merge if midtones get compressed. |
| `tundra` | Icy peach horizon, brighter meltwater edge, frost-blue snow. | Keep current crisp cold baseline. | Violet-blue air with slightly warmer permafrost shadow. | Best stretch candidate after beach if snow edges stay bright. | Sky, snow, and ice platforms can wash together; keep platform lips and ground break lines distinct. |

## Biome-Specific Emphasis Notes

### Beach

- Best first biome for showing the full day-part idea because the sky, sea, foam, and sand are already strongly separated.
- Dawn and dusk can get most of their feel from sky and water changes plus a lower or warmer sun.
- If a later moonlit pass lands, foam and pale shells should stay brighter than the surrounding water so collectables still read.

### Coastal Scrub

- This biome should feel like the beach losing openness and gaining shelter.
- Dawn can lean marine and soft, while dusk should warm only the top bands instead of darkening the whole ground.
- Moonlit evening is the highest-risk optional state here because the scrub, pine, and soil bands are already closer together than the beach.

### Forest

- Forest needs atmosphere without becoming murky.
- Dawn should feel like filtered light arriving from above, not like the whole biome turning orange.
- Dusk can deepen the creek and trunk bands a little, but the understory must remain readable enough for ferns, trillium, berries, slugs, and cones to stand apart.

### Treeline

- Treeline should feel airy, wind-cut, and more exposed than forest.
- Dawn and dusk should get most of their identity from cold ridge light and lichen or stone contrast, not from deep darkness.
- A later moonlit profile is possible because the biome stays more open than forest, but the lichen-fell floor still has to hold clear edges.

### Tundra

- Tundra can support the coldest and simplest day-part shifts because the ground plane is clean and open.
- Dawn should feel crisp and hopeful rather than dim.
- Dusk should cool the air and keep berries, flowers, hares, and buntings readable as small warm or dark accents against snow.

## Implementation-Facing Handoff For `main-31`

Recommended first scope:

1. Add `dayPart: 'dawn' | 'day' | 'dusk'` to the future shared `world-state` helper.
2. Author one day-part profile per live biome for sky gradient, parallax colors, cloud tint, and any beach-specific sun handling.
3. Keep the first pass mostly render-side in `src/engine/biome-scene-render.ts`, with only tiny data support in biome or palette helpers.
4. Expose `dayPart` through debug output and add deterministic tests before any browser polish pass.
5. Run a browser capture sweep across all five biomes before deciding whether to keep a fourth `moonlit evening` state.

Most likely file seams:

- `src/engine/world-state.ts`
- `src/engine/game.ts`
- `src/engine/biome-scene-render.ts`
- `src/assets/palette.ts`
- `src/content/biomes/*.ts`
- `src/test`

## Scope Limits

Avoid in the first day-part pass:

- real-time clocks
- HUD timers or sleep pressure
- weather bundled into the same slice
- animal schedule systems
- spawn rarity changes
- biome-specific moon or lantern art

If the first implementation can already make the five-biome chain feel warmer at dawn and cooler at dusk without hurting readability, that is enough.

## Queue Outcome

- `ECO-20260328-scout-18` can close with this report.
- `ECO-20260328-main-31` should now be read as a `dawn` / `day` / `dusk` first pass built on shared world-state seams, with `moonlit evening` treated as a later readability-gated stretch instead of part of the minimum scope.
