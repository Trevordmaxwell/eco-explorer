# Field-Partner Cue Bank And Silence-State Matrix

Date: 2026-03-29
Status: Ready for `main-34`

## Method

- read queue item `ECO-20260329-scout-29` and packet `014`
- reviewed:
  - `docs/reports/2026-03-28-living-world-grounding-handoff.md`
  - `docs/reports/2026-03-28-field-partner-tone-boundaries-handoff.md`
  - `docs/reports/2026-03-28-prompt-partner-surface-handoff.md`
  - `docs/reports/2026-03-29-notebook-prompt-follow-up-review.md`
  - `docs/ai-naturalist-design.md`
  - `src/engine/observation-prompts.ts`
  - `src/engine/world-state.ts`
  - `src/engine/field-guide.ts`
  - `src/engine/game.ts`
  - `src/engine/overlay-render.ts`
  - live biome definitions under `src/content/biomes/`

## Live Seams Worth Reusing

The first field-partner pass does not need a new simulation layer.

The live runtime already has the right inputs:

- `world-state.ts`
  - deterministic `dayPart` as `dawn`, `day`, or `dusk`
  - deterministic biome-family `weather` as `clear`, `marine-haze`, `mist-drip`, `ridge-wind`, or `light-flurry`
- `observation-prompts.ts`
  - authored prompt families: `shelter`, `timing`, `neighbors`, `comparison`
  - real zone and evidence matching
  - stable `evidenceKey` strings that are useful for dedupe
- `game.ts`
  - current `overlayMode`, `sceneMode`, doorway transitions, journal state, world-map state, and field-guide notice timing
- `overlay-render.ts`
  - compact notice-style surfaces already exist and are a better v1 fit than a new dialogue HUD

That means `main-34` should build the partner as a thin resolver and delivery layer on top of existing state, not as a separate conversation system.

## Core Recommendation

Use a small authored cue bank plus one strict silence-state matrix.

Do not:

- generate partner copy freely from the active prompt text
- restate the notebook prompt word-for-word
- let the partner speak just because the player is moving around

Do:

- key cues to `biome + zone + dayPart + weather + prompt family or no-prompt state`
- keep lines to one sentence and roughly the same budget as the planned transient strip
- prefer one supportive nudge that reinforces what the world is already showing

The cleanest mental model is:

1. resolve whether the partner is allowed to speak at all
2. if allowed, pick one authored cue that matches the current state
3. suppress repeats unless the state really changed

## First Cue Bank

The first bank should stay compact: one or two cues per biome family, with each line short enough for the tiny in-biome strip.

### Prompt-linked cues

Use these only when the same local evidence would already support a notebook prompt or note-backed observation.

| Cue id | Trigger | Suggested line |
| --- | --- | --- |
| `beach-dune-shelter` | `beach`, `dune-edge`, `marine-haze`, prompt family `shelter` or unlocked dune note | `The first grass line is doing more work than it looks.` |
| `beach-tide-neighbors` | `beach`, `tide-line`, `dusk`, `clear`, prompt family `neighbors` | `The wrack line can feel busy before it looks busy.` |
| `scrub-back-dune-timing` | `coastal-scrub`, `back-dune`, `clear` or `marine-haze`, prompt family `timing` | `This patch already feels halfway between dune and scrub.` |
| `scrub-thicket-neighbors` | `coastal-scrub`, `shrub-thicket` or `forest-edge`, prompt family `neighbors` or unlocked shelter note | `The thicker stems here turn wind into cover.` |
| `forest-floor-neighbors` | `forest`, `fern-hollow` or `creek-bend`, `mist-drip`, prompt family `neighbors` | `Moist ground keeps the quiet recyclers close.` |
| `forest-log-timing` | `forest`, `log-run`, `dusk`, `clear`, prompt family `timing` | `Drier air changes how this patch lets seeds go.` |
| `treeline-low-shelter` | `treeline`, `lichen-fell`, `ridge-wind`, prompt family `shelter` | `The lowest shapes are winning the weather here.` |
| `treeline-krummholz-comparison` | `treeline`, `krummholz-belt`, `dusk`, `clear`, prompt family `comparison` | `Bent trees and low shrubs are solving the same problem.` |
| `tundra-short-season` | `tundra`, `snow-meadow`, `clear` or `light-flurry`, prompt family `timing` | `Everything bright here feels in a hurry to use the season.` |
| `tundra-low-shelter` | `tundra`, `wind-bluff` or `frost-ridge`, prompt family `shelter` | `Out here, staying low is almost the whole plan.` |

### No-prompt fallback cues

Use these only when no notebook prompt is currently supported and the world-state still offers a calm readable observation.

| Cue id | Trigger | Suggested line |
| --- | --- | --- |
| `beach-open-morning` | `beach`, `dawn`, `clear`, no prompt | `The open sand reads differently before the day gets louder.` |
| `scrub-haze-edge` | `coastal-scrub`, `marine-haze`, no prompt | `Even the haze makes this place feel more sheltered than the beach.` |
| `forest-drip` | `forest`, `mist-drip`, no prompt | `The air here is carrying water almost as much as the ground is.` |
| `treeline-wind` | `treeline`, `ridge-wind`, no prompt | `The wind is explaining the shape of almost everything here.` |
| `tundra-flurry` | `tundra`, `light-flurry`, no prompt | `A light flurry can make the whole ground feel even shorter and closer.` |

## Silence-State Matrix

The partner should treat silence as the default state.

| State | Partner rule | Notes |
| --- | --- | --- |
| title screen | hard silent | never compete with onboarding |
| menu open | hard silent | menu already owns the player's attention |
| journal open | hard silent | prompts and notes already live here |
| comparison open | hard silent | same reason, plus the layout is compact |
| world map | hard silent | map travel should stay calm and readable |
| doorway transition or fade | hard silent | never speak during travel staging |
| active fact bubble | hard silent | inspect teaching takes priority |
| field-guide copied or failed notice visible | hard silent | partner sits below this priority |
| first `2-3` seconds after any overlay closes | cooldown silent | avoid stacked UI chatter |
| same biome + zone + dayPart + weather + prompt evidence bundle as last delivered | dedupe silent | no repeat restating |
| no prompt and no meaningful state change | soft silent | do not fill dead air |
| prompt exists but player has not changed state since the last delivery | soft silent | prompts are not a license to talk repeatedly |
| new biome visit with a fresh eligible cue | may speak once | first unsolicited line for the visit |
| major state shift after the first cue | may speak once more | only one extra line for day-part, weather, zone, or discovery change |

## Cadence And Dedupe Rules

Recommended first cadence:

- at most one unsolicited partner line per biome visit
- allow one additional line only after a meaningful state change:
  - day-part changed
  - weather changed
  - zone changed into a newly eligible cue family
  - a new local discovery creates new evidence
- keep a global cooldown of about `18-24` seconds between partner lines
- keep a short post-overlay cooldown of about `2-3` seconds before the partner can speak again

Recommended dedupe key:

- `biomeId`
- `zoneId`
- `dayPart`
- `weather`
- `observationPrompt?.evidenceKey ?? "no-prompt"`
- cue id

If that bundle matches the last spoken bundle, stay silent.

## Prompt-State Rules

The partner should complement the notebook lens, not clone it.

When a prompt exists:

- use a cue from the same broad family only if it adds a side-angle
- do not repeat the prompt text
- do not ask a second question if the notebook prompt already asked one
- prefer observation statements over another instruction

When no prompt exists:

- only use a no-prompt fallback cue if day-part or weather is doing obvious readable work
- otherwise stay silent

This keeps the partner from feeling like a backup prompt generator.

## Implementation-Facing Handoff For `main-34`

Recommended first scope:

1. Add a tiny pure cue resolver next to the prompt helper or in a nearby `field-partner` helper module.
2. Feed it:
   - current biome id
   - current zone id
   - resolved `worldState`
   - current observation prompt, if any
   - a minimal recent-delivery cache for dedupe
3. Reuse the tiny transient notice strip surface instead of adding a permanent HUD element.
4. Give partner notices lower priority than inspect bubbles, menu/journal/map surfaces, transitions, and field-guide copy notices.

Most likely file seams:

- `src/engine/observation-prompts.ts` or a sibling helper
- `src/engine/game.ts`
- `src/engine/overlay-render.ts`
- `src/engine/world-state.ts`
- `src/test`

Suggested test focus:

- pure cue resolution by biome, zone, day-part, weather, and prompt-family state
- silence matrix coverage for menu, journal, map, transitions, inspect, and field-guide notice overlap
- dedupe coverage so same-state revisits do not chatter
- one seeded browser capture after implementation to confirm the transient strip stays unobtrusive at `192x144`

## Queue Outcome

- `ECO-20260329-scout-29` can close with this report.
- No new follow-on queue item is needed right now; this should feed the active `main-34` implementation directly.
