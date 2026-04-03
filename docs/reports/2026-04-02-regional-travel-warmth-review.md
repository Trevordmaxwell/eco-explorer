# 2026-04-02 Regional Travel Warmth Review

## Scope

Review `ECO-20260402-critic-111` after `main-138`.

## Decision

No blocking issue.

The travel-warmth pass lands on the smallest correct seams and keeps the stronger existing High Pass framing intact.

## What Changed Well

### 1. The warmth gain stays on the forest-side departure seam

The live season-two state now uses:

- `HIGH PASS MAP` on the forest-side map-return post
- `Last woods before High Pass.` on the forest-focused idle world-map footer

That gives the player a little more chapter-facing warmth at the moment they leave `Forest Trail` without spending a new HUD row, another station card, or a broader relabel of the whole map.

### 2. The stronger High Pass cues still remain the ceiling

The implementation correctly leaves the stronger travel states alone:

- focused `Treeline Pass` still reads `Today: High Pass`
- split-origin focus still reads `FROM FOREST TRAIL`
- walking still uses the compact top label `HIGH PASS`

That preserves the earlier travel-coherence structure instead of piling a second layer of emphasis onto every map state.

### 3. The override is scoped in the right way

The new helper is runtime-scoped rather than authored into the evergreen world-map data. That is the right call here.

Earlier-season forest travel can keep its generic inland wording, while the season-two `High Pass` chapter gets its warmer departure copy only when the active next-season target is actually live.

## Verification Reviewed

- targeted `world-map` / `runtime-smoke` coverage for the forest post, same-biome map return, and warmed High Pass departure state
- `npm run build`
- shared web-game client run in `output/lane-1-main-138-client/`
- seeded browser artifacts in `output/lane-1-main-138-browser/`:
  - `forest-post-cue.png`
  - `forest-idle-map.png`
  - `high-pass-map.png`
  - `high-pass-walk.png`
  - `console-errors.json`

The live captures stayed readable at `256x160`, and the console-error capture stayed at zero errors.

## Watch Item

Keep future lane-1 travel warmth on the shared runtime helper instead of adding more special-case text branches directly inside multiple render paths. This pass is clean largely because it centralizes the seasonal override in one place.

## Queue Guidance

- close `ECO-20260402-critic-111`
- promote `ECO-20260402-scout-101` to `READY`
