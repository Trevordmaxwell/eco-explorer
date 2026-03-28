# Initial Critique Report

Date: 2026-03-27

## Snapshot

Eco Explorer already has a real vertical slice, not just a concept. The strongest foundations are:

- clean separation between engine, content, and asset modules
- deterministic biome generation and save hooks
- a focused beach biome with inspectables and journal flow
- enough documentation for a second agent to reason about the system

The main risk now is not "can this work?" It is "can this stay coherent as polish and UI changes accelerate?"

## What Is Working

- The project shape in `src/engine`, `src/content`, and `src/assets` matches the original plan well.
- The save model and generation approach are a strong fit for revisit-based exploration.
- The beach content set is small in a healthy way. It gives the system room to mature before content scale hides structural issues.
- The in-canvas journal and fact bubble direction is the right one for a game-first experience.

## Current Risks

### 1. The browser shell still outweighs the game

Files:

- `src/main.ts:11-45`
- `src/style.css:53-166`

The current page still reads like a product landing page wrapped around a game:

- giant `BEACH BIOME` heading
- descriptive lede
- separate controls card

That makes the actual game feel smaller than it is. It also duplicates information that already exists in the canvas title overlay.

### 2. There are now two title surfaces

Files:

- `src/main.ts:12-43`
- `src/engine/game.ts:733-759`

The screenshot makes this especially clear: the page says "Eco Explorer / Beach Biome" and the game screen also says "Eco Explorer / Beach Biome." That weakens both.

Recommendation:

- pick one source of truth for title/onboarding copy
- prefer the in-game title surface

### 3. The next aspect ratio change needs care

Files:

- `src/style.css:112-121`
- `src/engine/game.ts`

The current canvas is displayed at `10 / 9`, which still echoes the original `160x144` internal resolution. If the goal is to feel more like a full device screen, the right first move is not a random CSS aspect ratio tweak.

Recommendation:

1. First let the game frame own more of the viewport.
2. Then decide whether the internal resolution should stay `160x144` or move wider.
3. If it moves, choose a deliberate retro-friendly target such as `192x144` or `256x160`.

### 4. Science accuracy needs a schema adjustment soon

Files:

- `src/content/biomes/beach.ts:93-100`

The driftwood entry currently has `scientificName: 'Lignum marinum'`. That reads like a placeholder or descriptive Latin rather than a standard organism name. Since science accuracy is now a hard gate, this should be treated as an early schema warning.

Recommendation:

- do not force a scientific name onto non-organism landmarks
- add a more flexible subtitle/taxonomy field before more landmark content ships

### 5. `src/engine/game.ts` is becoming the center of gravity

Files:

- `src/engine/game.ts:113-904`

This is not a problem yet, but it is the place to watch most closely. The file already owns:

- simulation state
- camera and terrain drawing
- entity hints
- title overlay
- journal overlay
- fact bubble
- test hooks

Recommendation:

- keep the next UI refactor disciplined
- if the game absorbs more shell UI, start extracting overlay drawing/helpers before adding more content

### 6. Test coverage is still mostly systems-first, not kid-experience-first

Files:

- `src/test/biome.test.ts:6-67`

The current tests are good for determinism and discovery state. They do not yet protect:

- science accuracy
- readability budgets
- overlay text truncation/regression
- the organism-vs-landmark metadata problem

## Screenshot Notes

From the current screenshot:

- the large external masthead makes the app feel like a webpage instead of a handheld screen
- the controls card uses valuable horizontal space that could make the game feel more central
- the title overlay is doing the right kind of work, but the overall intro text still feels dense for a first playable moment
- the game already has enough internal UI language that the next pass should consolidate around it

## Recommended Next Pass

1. Remove the large external title/lede/controls presentation from the page shell.
2. Let the game frame dominate the viewport.
3. Keep onboarding and controls inside the game title/help UI.
4. Delay any internal aspect-ratio change until after the shell is simplified.
5. Fix the content schema so science accuracy is not compromised by landmark entries.

## Prompt-Ready Handoff

You can paste the following to the main coding agent:

```text
Shift the presentation from “landing page with embedded game” to “game-first handheld screen.” Remove the large external masthead and sidebar controls from the browser shell and let the game frame dominate the viewport. Keep title/help/controls inside the in-game UI so there is only one onboarding surface.

Do not change the internal aspect ratio casually. First simplify the shell and make the game feel fuller on the page. If we still want a wider play surface after that, choose a deliberate retro-friendly internal resolution such as 192x144 or 256x160 instead of stretching 160x144 with CSS.

Science accuracy is a hard gate. If an inspectable is a landmark or habitat object rather than an organism, do not fake a scientific name. Adjust the content schema so organisms can have scientific names while non-organisms can use a different subtitle/label.

As you refactor UI, keep an eye on src/engine/game.ts so it does not become the permanent home for every overlay, text layout, and rendering concern. Preserve the current deterministic hooks, save behavior, and data-driven content model.
```

## Review Tone For Future Passes

Default tone should stay practical and supportive:

- note the win first when there is one
- identify the most important risk
- suggest the next smallest good move
- escalate only when accuracy, child comprehension, or architectural drift are at risk

