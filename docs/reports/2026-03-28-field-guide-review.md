# Field Guide Review

Date: 2026-03-28

## Method

- read queue item `ECO-20260328-critic-06` and packet `005`
- reviewed `src/engine/field-guide.ts`, `src/engine/game.ts`, `src/engine/overlay-render.ts`, and the related tests
- ran `npm run validate:agents`
- ran `npm test -- --run`
- ran `npm run build`
- drove the live browser through:
  - title menu
  - in-biome menu with the `Field guide` row
  - successful copy flow with a mocked clipboard capture
  - failed copy flow with clipboard access removed

## Summary

Clipboard Mode A is worth keeping.

The menu gating is correct, the copied prompt stays out of `render_game_to_text()`, and the toast pattern feels lightweight enough for the current game.

The main risk is prompt quality. Right now the copied text can spoil undiscovered species names and it asks the model to make stronger ecological claims than the current context really supports.

## Findings

### 1. The copied prompt reveals exact undiscovered species names

Files:

- `src/engine/field-guide.ts:142-156`

What I saw:

- The copied prompt includes an `ALL SPECIES IN THIS BIOME` section.
- That block lists exact common names and scientific names for undiscovered entries, marked only with `?`.

Why it matters:

- The journal and note systems are carefully trying not to spoil undiscovered names.
- Clipboard mode currently breaks that rule the moment a player pastes the prompt into an AI chat.
- This weakens the discovery loop for both kids and co-players.

Grounded recommendation:

- Do not include exact undiscovered names in the copied prompt.
- Replace them with counts, categories, or vague local hints, while keeping exact names only for already discovered entries.

### 2. The prompt over-asks for ecological certainty and invites hallucination

Files:

- `src/engine/field-guide.ts:163-170`

What is true:

- The instructions currently tell the model to explain `Who eats what?` and processes like `nitrogen fixation`, `pollination`, `seed dispersal`, and `succession`.
- In the live beach sample, the nearby context was essentially two beach-grass entities plus broader biome metadata.

Why it matters:

- This encourages the model to fill in ecological relationships that are not grounded in the actual local state.
- The problem is not that those processes are bad topics. It is that the prompt currently frames them as expected output even when the present context does not support them.

Grounded recommendation:

- Change the instruction tone from `cover these processes` to `use only relationships that the current context supports`.
- Explicitly allow the model to say when a process is not clear from what the player can currently observe.

### 3. The failure toast is readable but not very helpful

Files:

- `src/engine/overlay-render.ts:421-437`

What I saw:

- On failure, the game shows `CLIPBOARD NOT READY`.
- The success toast is fine, but the failure toast does not tell the player what to do next.

Why it matters:

- Clipboard permission failures are common enough that a short next step would reduce confusion.
- The current message is readable, but it feels like a debug state rather than a player-facing explanation.

Grounded recommendation:

- Keep the toast compact, but give it one hint such as trying browser copy permissions or trying again.

## What Passed

- The `Field guide` action appears only in biome-play menu states, not in the title menu.
- The success notice is lightweight and does not drag extra chrome into the playfield.
- `render_game_to_text()` exposes safe menu/notice metadata without leaking the copied prompt body.
- The menu helper copy and `COPY` affordance are clear enough for this first pass.

## Queue Outcome

- `ECO-20260328-critic-06` can close.
- Add one focused follow-up to tighten prompt safety and fallback messaging before any direct API mode is reconsidered.
