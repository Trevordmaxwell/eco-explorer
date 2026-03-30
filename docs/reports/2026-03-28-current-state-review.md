# Current State Review And Next Queue Pass

Date: 2026-03-28

## Method

- ran `npm test`
- ran `npm run build`
- reviewed the current runtime, UI, save, journal, and world-travel code
- captured a fresh headless screenshot of the live title screen

Limit note:

- I was able to verify the live title screen visually, but I could not complete full browser-driven input automation in this pass because Playwright was blocked by an existing Chrome session and Apple Events keystrokes are disabled on this machine

## Snapshot

The app is moving in the right direction.

What is clearly better now:

- the game-first shell is real
- beach, forest, and tundra now exist inside one coherent runtime
- world-map travel and doorway transitions are live
- the viewport is wider and feels more like a handheld screen
- menu, settings, save reset, and cross-biome journal progress now exist as real systems

What still needs pressure:

- the text-heavy surfaces are still hand-packed tightly enough to break
- `src/engine/game.ts` is now the main concentration risk
- tests are strong on helpers and content rules, but still light on the lived player loop
- the science content is improving, but the system still teaches ecosystems mostly one object at a time

## Findings

### 1. Title-screen text budget is still breaking on the live screen

Files:

- `src/engine/game.ts:1397-1418`

What I saw:

- `FACTS / DOORS: E` clips against the right side of the card
- `CLICK ANYWHERE TO START` collides with the `START` button row

Why it matters:

- this is the first thing the player sees
- crowded or clipped copy makes the wider-screen pass feel less intentional than it actually is
- kids should not have to decode the interface before they can begin

Grounded recommendation:

- treat this as a layout-budget problem, not just a font or alignment problem
- give the title card a real copy budget, a separate CTA lane, and reusable rules for how long text blocks are allowed to be

### 2. `src/engine/game.ts` is now the main scaling risk

Files:

- `src/engine/game.ts`
- `src/engine/journal.ts`

What is true right now:

- `src/engine/game.ts` is 2020 lines
- it now owns scene flow, player update, rendering, menu logic, journal logic, title logic, transition logic, save-facing behavior, and debug hooks
- the extracted `src/engine/journal.ts` helper shows the right direction, but the bulk of orchestration still sits in one file

Why it matters:

- the next UI or biome feature will be slower and riskier to land
- critique and scout notes become harder to turn into small patches when one file owns everything

Grounded recommendation:

- extract coherent seams next, especially scene-specific render/update work and overlay-specific layout/input work
- this does not need to become a big architecture rewrite, but it does need to stop growing as one file

### 3. Coverage still stops short of the lived game loop

Files:

- `src/test/biome.test.ts`
- `src/test/forest-biome.test.ts`
- `src/test/journal.test.ts`
- `src/test/save.test.ts`
- `src/test/tundra-biome.test.ts`
- `src/test/world-map.test.ts`
- `src/engine/game.ts:2003-2012`

What is good:

- content, save migration, journal progress, and world-map helpers all have real tests

What is still missing:

- a deterministic smoke path through title -> play -> inspect -> journal/menu -> travel or reload
- a persistence-sensitive check around the main loop instead of only helper modules

Why it matters:

- the project is now stateful enough that loop-level regressions are more likely than data-shape regressions
- the existing hooks are already good enough to support this without introducing a brittle full browser suite

Grounded recommendation:

- add a small runtime smoke harness that leans on `window.advanceTime(ms)` and `window.render_game_to_text()`

## Direction Notes

### The current science content is stronger than the system surface

Files:

- `src/content/biomes/beach.ts`
- `src/content/biomes/forest.ts`
- `src/content/biomes/tundra.ts`
- `src/engine/journal.ts`

The content already includes real ecosystem relationships:

- beach grass stabilizes dunes
- driftwood provides shelter
- salal berries spread through animals
- banana slugs break down dead plants
- cottongrass spreads through wind and Arctic willow stays low against cold wind

That is good. The next education win is not just adding more facts. It is surfacing those relationships more clearly in play and in the journal.

## Idea Pool

I generated and compared these candidate next steps:

- title-screen and copy-budget cleanup
- wider text-safe-area rules across title, menu, journal, and fact panels
- world-map HUD polish
- doorway pacing polish
- extract scene modules out of `game.ts`
- extract overlay layout/input helpers out of `game.ts`
- deterministic runtime smoke coverage
- save/reload flow checks
- richer resume or autosave messaging
- ecosystem relationship tags or field-note links
- zone or habitat callouts
- more biome discoveries
- audio blips
- guide character or companion copy
- achievements or checklist meta systems

## Shortlist

I narrowed that pool to the highest-leverage next packets:

### 1. Readability stabilization

Why it made the cut:

- there is a visible live issue right now
- it affects first impression and child readability
- it should be fixed before more copy is added

### 2. Runtime seam extraction

Why it made the cut:

- this is the main technical scaling risk now
- it will make future biome, map, and UI work safer for every agent

### 3. Deterministic smoke coverage

Why it made the cut:

- the app now has enough scene state and persistence state to justify loop-level checks
- the hooks already exist, so this is a practical next layer

### 4. First ecosystem-relationship teaching layer

Why it made the cut:

- it advances the actual educational goal of the project
- it builds on the current content instead of replacing it
- it keeps the app from becoming just a collectible fact list

## Queue Recommendation

The next queue wave should be:

1. stabilize text layout and title-screen readability
2. review the readability pass and catch any remaining clipping
3. extract stable scene and overlay seams out of `src/engine/game.ts`
4. add deterministic runtime smoke coverage for the main player loop
5. have scout prepare the first ecosystem-relationship teaching packet for the live biome set
6. implement one lightweight ecosystem-relationship layer without hardcoding only one or two biomes
