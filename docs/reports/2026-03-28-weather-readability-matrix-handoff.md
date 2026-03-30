# Weather Readability Matrix Handoff

Date: 2026-03-28
Status: Ready for future implementation after day-part stabilizes

## Method

- read queue item `ECO-20260328-scout-19`, packet `017`, and parked `main-32`
- reviewed:
  - `docs/reports/2026-03-28-living-world-sequence.md`
  - `docs/reports/2026-03-28-living-world-grounding-handoff.md`
  - `docs/reports/2026-03-28-living-world-preproduction-sequence.md`
  - `.agents/packets/014-living-world-sequence.json`
  - `src/engine/biome-scene-render.ts`
  - `src/engine/generation.ts`
  - `src/engine/types.ts`
  - `src/assets/palette.ts`
  - `src/assets/ambient.ts`
  - `src/content/biomes/beach.ts`
  - `src/content/biomes/coastal-scrub.ts`
  - `src/content/biomes/forest.ts`
  - `src/content/biomes/treeline.ts`
  - `src/content/biomes/tundra.ts`

## Core Recommendation

The first weather pass should stay family-based and small.

Recommended baseline:

- `clear`

Recommended first special weather states:

- `marine-haze` for `beach` and `coastal-scrub`
- `mist-drip` for `forest`
- `ridge-wind` for `treeline`
- `light-flurry` for `tundra`

This is enough variety for v1. It keeps the system calm, readable, and extensible without turning weather into a combinatoric simulation grid.

## Shared Weather Rules For `main-32`

Weather should begin as atmosphere plus tiny emphasis, not as a gameplay modifier.

Safe first-change surfaces:

- cloud density or tint
- parallax contrast
- horizon softness
- sparse particle passes in the most open biomes only
- sparkle reinterpretation where it can become mist glint, drizzle drip, or blown ice

Do not do in the first weather pass:

- movement penalties
- heavy screen-covering particles
- visibility loss over inspectables
- storm logic
- random per-biome weather lists that ignore the shared `world-state` seam

Strong cross-cutting guardrail:

- do not stack the heaviest weather profile with the darkest day-part profile in `coastal-scrub` or `forest` until browser captures prove those combinations still read cleanly

## Biome Weather Matrix

| Biome | Weather Family | Safe V1 Changes | Must Stay Readable | Safe Later Emphasis |
| --- | --- | --- | --- | --- |
| `beach` | `marine-haze` | Soften horizon, cool the sky slightly, mute far dunes, keep foam bright. | Tide line, shells, shorebirds, door gap, player outline. | Later tiny wrack or shoreline-bird emphasis, but no spawn shifts in v1. |
| `coastal-scrub` | `marine-haze` | Similar haze profile, but keep scrub and pine bands distinct from each other. | Back-dune flowers, shrub edges, root-step platforms, small animals. | Later tiny berry or shrub-thicket emphasis only if it stays local and readable. |
| `forest` | `mist-drip` | Lighter upper haze, subtle canopy drip or glint cues, cooler distant bands. | Forest floor entries, fallen-log platforms, inspect markers, berry colors. | Safest later bias is tiny banana-slug or nurse-log ambience, not a broad spawn change. |
| `treeline` | `ridge-wind` | Faster cloud slide, slightly sharper ridge contrast, sparse wind streaks only if very light. | Lichen-fell floor, granite platform lips, krummholz silhouettes, ptarmigan visibility. | Later tiny open-ground bird or marmot emphasis, but still no movement effect. |
| `tundra` | `light-flurry` | Sparse flake drift or surface-snow motion, pale sky veil, brighter windward snow edge. | Ice-platform lips, berry accents, hare and bunting silhouettes, meltwater edge. | Later tiny snow-bunting or hare emphasis if it remains deterministic and visual-first. |

## Family Notes

### Marine Haze

- Best shared weather family for the Pacific coast branch because it reinforces the beach-to-scrub transition without needing separate storm systems.
- Works best as distance compression rather than as a gray veil over the whole playfield.
- Foam, pale sand, and flower accents should stay brighter than the haze layer.

### Mist Drip

- Forest weather should feel damp and close, not rainy and busy.
- A few subtle drip or shimmer cues are safer than visible streak-rain on this small screen.
- The ground plane should still clearly separate sorrel, fern, trillium, cones, and slugs.

### Ridge Wind

- Treeline weather should communicate exposure and moving air, not precipitation first.
- The safest feel comes from cloud speed, a sharper cold edge, and perhaps a few tiny wind lines rather than lots of particles.
- This family should still leave the lichen and stone floor fully legible.

### Light Flurry

- Tundra can carry the most visible particles because the playfield is open and bright.
- Keep the flurry sparse and lateral, more like passing surface snow than a storm.
- If flakes start hiding berry sprites or platform edges, the effect is already too strong.

## Atmospheric-Only Versus Emphasis

Use this order for future implementation:

1. atmospheric-only visuals first
2. tiny authored emphasis second
3. spawn bias only if it remains deterministic, local, and clearly worth the complexity

The first weather pass should stop at steps 1 and at most a little of step 2.

## Implementation-Facing Handoff For `main-32`

Recommended first scope:

1. Extend the shared `world-state` helper with `clear` plus one special weather profile per biome family.
2. Keep the first implementation mostly render-side in `src/engine/biome-scene-render.ts`.
3. If generation changes happen at all, keep them tiny and authored, such as small emphasis hooks rather than missing-core-content behavior.
4. Expose `weather` through debug output and tests before allowing richer combinations.
5. Browser-check the five live biomes at their default day-part first, then test only a small number of day-part plus weather pairings.

Most likely file seams:

- `src/engine/world-state.ts`
- `src/engine/game.ts`
- `src/engine/biome-scene-render.ts`
- `src/engine/generation.ts`
- `src/content/biomes/*.ts`
- `src/test`

## Scope Limits

Avoid in the first weather pass:

- thunderstorms
- lightning
- deep fog that erases the horizon line
- heavy rain sheets
- snow accumulation systems
- biome-specific weather menus or forecast UI

The goal is to make the world feel more alive, not harder to parse.

## Queue Outcome

- `ECO-20260328-scout-19` can close with this report.
- `ECO-20260328-main-32` should now be read as one calm family-based weather pass, render-first and readability-first, not as a generic “add weather” bucket.
