# Post-Travel Queue Pass

Date: 2026-03-27

## Snapshot

The app is in a productive but transitional state.

What is true right now:

- the shell refactor worked and the game frame now owns the browser surface
- science metadata is in better shape
- a forest biome, world map, and door-transition scaffold now exist
- the main agent is actively integrating those systems into the live runtime

What is also true right now:

- the current live screen still feels vertically framed
- the journal and title layouts are still sized for the old `160x144` slice
- the runtime is getting more scene complexity without yet having a fully settled system surface
- `npm run build` currently fails while `ECO-20260327-main-03` is in progress, so the next queue packet assumes that task completes and restores a clean build before follow-on work begins

## Grounded Direction Check

### The game-first presentation is real now

Files:

- `src/main.ts`
- `src/style.css:33-76`

The app no longer reads like a landing page. That direction is correct and should be preserved.

### The visible screen still feels too tall for the next phase

Files:

- `src/style.css:66-69`
- `src/engine/game.ts:713-745`
- `src/engine/game.ts:748-859`
- `src/engine/game.ts:656-710`

The current start screen, journal, and fact bubble are all packed into a `10 / 9` display shape that still feels taller than the app wants to be, especially now that world-map travel and a second biome are part of the plan.

### Settings and save controls still exist mostly as hidden system behavior

Files:

- `src/engine/save.ts:6-15`
- `src/engine/save.ts:30-39`

The app already persists meaningful state, but it still does not offer a proper player-facing menu/settings/save surface.

### Cross-biome progression is the next UX pressure point after travel

Files:

- `src/engine/game.ts:748-859`

The current journal works for a one-biome slice. Once beach and forest are both live, the app will need clearer progress framing by biome and category or it will start to feel like a growing list with no structure.

## Idea Pool

I generated and compared these candidate next steps:

- widen the internal viewport to a more rectangular handheld ratio
- tighten title-screen hierarchy and reduce intro density
- rebalance fact-bubble and journal safe areas
- add a pause/menu/settings surface
- expose reset-save and persisted comfort options
- show cross-biome collection progress
- deepen journal navigation for multiple ecosystems
- add a world-map HUD/status strip
- add sound/UI blips
- add more beach and forest discoveries immediately
- add ambient NPCs or guide characters
- add achievements or checklist goals
- extract more runtime boundaries before more scene types land
- add multi-biome reload/travel smoke coverage

## Shortlist

I narrowed that pool to the highest-leverage next packets after `main-03`:

### 1. Rectangular viewport and safe-area pass

Why it made the cut:

- directly addresses the current “still too vertical” feel
- affects every future scene
- improves readability before more systems pile into the same screen

### 2. Menu/settings/save surface

Why it made the cut:

- the app already persists state, but not through visible UX
- multi-biome play will make settings and reset affordances more important

### 3. Cross-biome progress and journal navigation

Why it made the cut:

- the current journal is almost ready to become a real field guide
- beach + forest progression will need better grouping and persistence framing

## What I Did Not Promote Yet

I intentionally did not promote these yet:

- audio and music
- more collectibles and content volume
- NPC guide systems
- achievements/checklist meta systems
- visual polish passes on the world map

Those may all become worthwhile later, but right now the app needs stronger screen shape, system surfaces, and multi-biome progression clarity first.

## Queue Recommendation

After `ECO-20260327-main-03` is complete and the build is green again:

1. adopt a wider, deliberate viewport and rebalance safe areas
2. add a player-facing menu/settings/save surface
3. improve cross-biome collection progress and journal navigation

