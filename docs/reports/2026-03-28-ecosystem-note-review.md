# Ecosystem Note Review

Date: 2026-03-28

## Method

- read queue item `ECO-20260328-critic-09` and packet `007`
- reviewed `src/engine/ecosystem-notes.ts`, `src/engine/overlay-render.ts`, `src/engine/game.ts`, and the live note content in beach, forest, and tundra
- ran `npm run validate:agents`
- ran `npm test -- --run`
- ran `npm run build`
- seeded a controlled save in the live browser and captured journal states for:
  - unlocked beach note
  - locked forest note
  - unlocked tundra note

## Summary

The first ecosystem-note pass is worth keeping.

The science claims are modest and sound, the lock state stays spoiler-safe, and the authored-per-biome structure is the right long-term direction.

The main issue is presentation, not concept. Right now the note system replaces too much of the selected entry’s own journal learning, and the note panel is still too tight for the copy it is trying to carry.

## Findings

### 1. The note block replaces the selected entry’s journal text instead of deepening it

Files:

- `src/engine/overlay-render.ts:553-559`
- `src/engine/overlay-render.ts:575-613`

What is happening:

- If a selected entry has either a locked or unlocked ecosystem note, the normal `journalText` body is removed.
- The player sees the note box only.

Why it matters:

- This turns the relationship layer into a swap instead of an addition.
- The journal should help a child learn both `what this thing is` and `how it connects`.
- Right now, entries with notes lose their own longer species/place blurb at the moment the new teaching layer appears.

Grounded recommendation:

- Keep the selected entry’s own journal learning visible.
- Treat the ecosystem note as a smaller companion block, not the only body content.

### 2. The journal is not surfacing most of the authored note structure, and the current note copy still clips

Files:

- `src/engine/overlay-render.ts:596-611`
- `src/content/biomes/beach.ts:239-258`
- `src/content/biomes/forest.ts:209-228`
- `src/content/biomes/tundra.ts:218-237`

What I saw in the live browser:

- The unlocked beach note cuts off after `for small beach`.
- The locked forest message cuts off after `unlock a shared`.
- The unlocked tundra note fits better, but the journal still only shows the summary.

What is true in code:

- The authored note has `title`, `summary`, and `observationPrompt`.
- The UI currently renders only a generic heading (`ECO NOTE` / `KEEP EXPLORING`) plus the summary or lock text.
- The authored note title and observation prompt are never shown to the player.

Why it matters:

- The system is paying authoring cost for note structure that the child never actually sees.
- The observation prompt is the part most likely to push the player back toward noticing the world instead of just reading a label.
- A note system that clips its short copy at `192x144` is not stable enough yet to be the template for later biomes.

Grounded recommendation:

- Surface at least one authored distinction beyond the summary, preferably the note title and a very short observation cue.
- Refit the panel so current beach, forest, and tundra note states all read cleanly at the live resolution.

### 3. Note selection will become arbitrary once more entries belong to multiple unlocked notes

Files:

- `src/engine/ecosystem-notes.ts:53-68`

What is true:

- The resolver picks the first unlocked matching note.
- It does not choose the strongest or most complete unlocked match.

Why it matters:

- This is fine for the current tiny set, but some entries already belong to more than one conceptual relationship.
- As ecotones arrive, the same entry is more likely to participate in multiple notes, and the chosen note may feel accidental rather than intentional.

Grounded recommendation:

- No urgent rewrite is needed before the next main task.
- Keep this on the watchlist and tighten the selection rule once multiple-note overlap becomes common.

## Science And Spoiler Check

What passed:

- The current ecological claims are appropriately modest.
- The note topics are aligned with real patterns already present in the content: dune shelter, wave-edge behavior, decomposition, seed travel, low tundra growth, and short growing seasons.
- Locked-note behavior does not reveal undiscovered exact species names.

No science blocker was found in this pass.

## Queue Outcome

- `ECO-20260328-critic-09` can be closed.
- Added one follow-up implementation item so the journal note system becomes a cleaner long-term teaching template before ecotones start stacking on top of it.
