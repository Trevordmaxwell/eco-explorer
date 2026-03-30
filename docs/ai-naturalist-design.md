# AI Naturalist Field Guide

Date: 2026-03-28
Status: Context, prompt, clipboard menu mode, prompt-safety/readability follow-up, and the first notebook-lens append are implemented. Direct API mode is still parked.

## Overview

The field guide is an AI-ready teaching surface for Eco Explorer.

Instead of only showing one fact about one object, it captures the player's current ecosystem context:

- current biome
- current zone
- nearby spawned entities
- discovered versus undiscovered entries
- biome and global discovery progress

That context is assembled into a natural-language prompt that can be copied into an AI chat or, later, sent directly to an API.

## Current Foundation

Implemented in [src/engine/field-guide.ts](/Users/trevormaxwell/Desktop/game/src/engine/field-guide.ts):

- `getBiomeZoneForPlayerX()`
- `buildFieldGuideContext()`
- `buildFieldGuidePrompt()`

The current pure module is intentionally side-effect free. It does not mutate save state and it does not yet touch menu UI, overlays, or network calls.

Supporting types live in [src/engine/types.ts](/Users/trevormaxwell/Desktop/game/src/engine/types.ts).
Coverage lives in [src/test/field-guide.test.ts](/Users/trevormaxwell/Desktop/game/src/test/field-guide.test.ts).

Clipboard Mode A now also uses:

- [src/engine/game.ts](/Users/trevormaxwell/Desktop/game/src/engine/game.ts)
- [src/engine/clipboard.ts](/Users/trevormaxwell/Desktop/game/src/engine/clipboard.ts)
- [src/engine/observation-prompts.ts](/Users/trevormaxwell/Desktop/game/src/engine/observation-prompts.ts)

The full copied prompt stays out of the runtime debug surfaces. `render_game_to_text()` now exposes only safe notebook-lens metadata when the same observation seed is active, not the full clipboard payload.
Clipboard Mode A now also masks undiscovered exact names in the copied prompt, can append the same calm notebook observation lens used by the journal companion surface, and uses a short player-facing retry hint if copy access fails.

## Context Shape

The field-guide context includes:

- `biomeId`
- `biomeName`
- `zoneName`
- `zoneLabel`
- `playerPosition`
- `nearbyEntities`
- `allBiomeEntries`
- `totalDiscoveries`
- `biomeDiscoveries`
- `biomeTotalEntries`
- `visitCount`
- optional `observationPrompt`

Nearby entities should remain local and concrete. The current default radius is `60px`, which is intentionally wider than a direct inspect interaction.

## Prompt Goals

The prompt should guide an LLM toward:

- warm, observational prose
- real ecological relationships, not isolated labels
- age-appropriate language for roughly ages 7-10
- scientific accuracy without fake certainty
- a short “look closer” observation prompt

The prompt should avoid:

- quiz framing
- bullet-point output
- achievement language
- invented natural history
- exact undiscovered species spoilers

## Planned Delivery Modes

### Mode A: Clipboard First

The `Field guide` menu action is now wired into the existing in-game menu during biome play.

When selected it:

- build the field-guide context
- build the prompt
- copy it to the clipboard
- show a short in-game confirmation or retry hint

If the current biome, zone, weather, and recent journal context support a notebook observation lens, Clipboard Mode A now appends that same authored prompt seed so the external AI response stays aligned with the in-game journal cue.

This is the safest next step because it keeps the runtime simple, introduces no API key handling, and still gives players a useful AI workflow.

### Mode B: Direct API Overlay

Later, if the clipboard mode proves worthwhile, add an optional direct API mode:

- store an optional API key in settings
- send the prompt to a model endpoint
- display the response in a journal-style overlay

This mode should stay parked until Mode A feels good and privacy/error-path concerns are fully handled.

## Future Extensions From The External Design Pack

These ideas came through the external PDF and zip review. They are now approved future-direction features for the app, but they should still stay behind the current content-density and lightweight-progression work:

- `Ecosystem pulse overlay`
  A compact ecological status view showing biodiversity progress, zone position, and undiscovered-hint pressure.
- `Day/night cycle`
  A slow play-time-driven palette and spawn shift that can teach temporal niche partitioning.
- `Weather events`
  Light biome-specific states like rain, wind, or fog that change atmosphere and some spawn behavior.
- `Ambient ecosystem indicators`
  Small non-interactive cues like pollen drift, decomposition particles, water shimmer, or bird-call notes.
- `Field partner`
  A future companion idea built on the existing test hooks and deterministic stepping model. The first version does not need direct API mode.

These should be treated as follow-on living-world work, not prerequisites for the current field-guide plan, and they should land in sequence rather than as one expansion blob.

## Guardrails

- Science accuracy stays a hard gate.
- The pure context builder should remain deterministic and side-effect free.
- Clipboard mode is the default and fallback path.
- No API key or private prompt data should appear in debug outputs like `render_game_to_text()`.
- The field-guide response should deepen ecosystem understanding, not replace the game's own discovery loop.

## Next Recommended Sequence

1. Keep the pure field-guide module as the stable data layer.
2. Keep clipboard Mode A spoiler-safe and grounded to current context.
3. Consider direct API mode only after the clipboard flow is solid.
