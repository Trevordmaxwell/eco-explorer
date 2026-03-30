# Readability Stabilization Review

Date: 2026-03-28

## Method

- read `AGENTS.md`, `.agents/critic-brief.md`, queue item `ECO-20260328-critic-05`, and packet `004`
- reviewed the extracted UI/layout modules in `src/engine/ui-layout.ts`, `src/engine/pixel-ui.ts`, and `src/engine/overlay-render.ts`
- ran `npm test -- --run`
- ran `npm run build`
- booted a local dev server and captured a fresh live title-screen screenshot before later hot reloads from active in-progress work changed the runtime

## What Held Up Well

- The original title-screen clipping problem is fixed. The CTA lane and button row now fit cleanly inside the `192x144` frame.
- Extracting layout and overlay helpers was the right move. `src/engine/game.ts` is no longer doing all raw UI drawing work itself.
- The current shell still reads like a game screen first, not a web page with a game embedded inside it.

## Findings

### 1. Current in-progress work temporarily destabilized the live runtime

Files:

- `src/engine/generation.ts:90-100`

What happened during review:

- The live page initially loaded and rendered correctly.
- A later hot reload from active in-progress work blanked the canvas and logged `TypeError: definition.ecosystemNotes is not iterable`.

Why it matters:

- It prevented a full second screenshot pass through menu, journal, and fact states.
- Future critique passes will be noisier if live biome definitions are allowed to drift out of compatibility while new note systems are being wired.

Grounded recommendation:

- Keep current biome definitions load-safe while note work is in flight.
- The safest short-term path is to make sure every live biome carries `ecosystemNotes: []` until authored notes land, or to tolerate missing note arrays during validation while the feature is incomplete.

### 2. The title subtitle still silently drops the `field journal` promise

Files:

- `src/engine/overlay-render.ts:189-195`
- `src/engine/ui-layout.ts:93-125`

What I saw:

- The title card no longer clips.
- The left-column subtitle now hits a different problem: the three-line cap plus the narrow `84px` column silently drops the tail of `Explore ecosystems, inspect nature, and build a field journal.`
- In the live title capture, the player sees the exploration framing but loses the `field journal` concept.

Why it matters:

- The journal is one of the core loops of the game.
- Silent truncation is harder to notice than visible overflow, so this kind of regression can slip back in while the screen still looks “clean.”

Grounded recommendation:

- Treat this as a copy-budget issue, not a font issue.
- Shorten the subtitle so the whole idea survives inside the current column, or add a safer truncation rule/test so important onboarding concepts do not disappear silently.

### 3. The menu panel has no spare vertical budget for the incoming field-guide row

Files:

- `src/engine/overlay-render.ts:302-339`

What is true right now:

- The menu panel is laid out tightly around four action rows, a short header, and a helper line at the bottom.
- `main-12` is already in progress and is supposed to add a `Field guide` action into this same surface.

Why it matters:

- Without a real reflow, the fifth row will either crowd the helper copy, force future truncation, or make the menu feel denser right when the project is trying to stay readable for kids.

Grounded recommendation:

- Reflow the menu intentionally as part of `main-12`.
- Do not just squeeze another row into the current vertical budget.

### 4. Equal-width journal tabs will not survive the five-biome chain

Files:

- `src/engine/overlay-render.ts:426-443`

What is true right now:

- The current tab math is fine for `Beach`, `Forest`, and `Tundra`.
- It uses equal-width buttons for every biome name.
- That will not scale cleanly once names like `Coastal Scrub` and `Treeline` join the live journal.

Why it matters:

- The ecotone work is already approved, and this is a predictable future readability break.
- If it waits until after the five-biome wiring lands, the journal will become the next UI bottleneck.

Grounded recommendation:

- Replace fixed equal-width biome tabs before the full five-biome chain goes live.
- Keep the solution lightweight: abbreviated chips, left/right biome paging, or another calm selector that protects the `192x144` safe area.

## Queue Outcomes

- `ECO-20260328-critic-05` can be closed.
- Added a small follow-up item for title copy-budget protection after the current field-guide pass settles.
- Added a pre-ecotone journal-selector item so five-biome journal navigation does not arrive already clipped.
- Cleaned the duplicate `critic-09` queue ID by renaming the later science-audit item to `ECO-20260328-critic-10`.
