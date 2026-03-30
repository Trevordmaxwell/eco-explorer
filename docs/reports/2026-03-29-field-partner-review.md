# First Field-Partner Review

Date: 2026-03-29
Queue Item: `ECO-20260328-critic-22`
Status: Follow-up needed before the living-world lane moves on

## Method

- reviewed:
  - `docs/reports/2026-03-28-living-world-grounding-handoff.md`
  - `docs/reports/2026-03-28-field-partner-tone-boundaries-handoff.md`
  - `docs/reports/2026-03-28-prompt-partner-surface-handoff.md`
  - `docs/reports/2026-03-29-field-partner-cue-bank-handoff.md`
- inspected:
  - `src/engine/field-partner.ts`
  - `src/engine/game.ts`
  - `src/engine/overlay-render.ts`
  - `src/test/field-partner.test.ts`
  - `src/test/runtime-smoke.test.ts`
- verified with:
  - `npm test -- --run src/test/field-partner.test.ts src/test/runtime-smoke.test.ts src/test/observation-prompts.test.ts src/test/field-guide.test.ts`
  - `npm run build`
  - `npm run validate:agents`
  - seeded live browser checks in `coastal-scrub`

## What Landed Well

- The strip stays visually restrained and does not compete with the playfield.
- Hard-silence rules for journal, menu, world map, transitions, inspect bubbles, and field-guide notices are holding.
- The first pass is functionally safe enough to keep, rather than something that needs to be rolled back.

## Findings

### 1. The live partner still collapses the authored cue-bank plan into four generic family lines

Priority: `P2`

In `src/engine/field-partner.ts`, the runtime currently maps every prompt family to one generic sentence:

- `shelter`
- `timing`
- `neighbors`
- `comparison`

That means the scout handoff's authored cue-bank never actually made it into the implementation. In live seeded `coastal-scrub`, the notebook prompt correctly resolves to:

- `Which patch looks ready for flowers, fruit, or seed here?`

but the partner still replies with the family-generic:

- `Something here looks close to its next change.`

This keeps the strip calm, but it loses the biome-local, zone-aware, notebook-margin feeling the handoff was aiming for. The current pass is functioning more like a polite paraphrase layer than an authored naturalist voice.

Primary anchors:

- `src/engine/field-partner.ts:21-39`
- `src/test/field-partner.test.ts:6-25`

### 2. The cadence seam is still much thinner than the planned silence-state matrix

Priority: `P3`

The runtime does suppress repeats and limits delivery to two lines per visit, but it does not yet implement the stronger cadence plan from the scout handoff:

- no explicit long global cooldown around `18-24` seconds
- overlay quiet windows are still subsecond defaults in multiple places
- state gating is mostly `deliveredThisVisit` plus `lastStateKey`, not a fuller cue-level cadence model

This is not causing obvious chatter yet because the cue set is still tiny, but it becomes a bigger risk as soon as the partner gets real authored coverage, no-prompt fallbacks, or phenology-aware observations.

Primary anchors:

- `src/engine/field-partner.ts:42-60`
- `src/engine/game.ts:551-553`
- `src/engine/game.ts:617-634`
- `src/engine/game.ts:701`
- `src/engine/game.ts:1316`

## Recommendation

Keep the feature, but do one authored follow-up before moving deeper into the next living-world slice.

The next main pass should:

1. replace the family-only copy table with a small authored cue bank keyed to live biome, zone, day-part, weather, and prompt or no-prompt state
2. add the no-prompt fallback cues from the scout handoff instead of staying prompt-only
3. upgrade delivery state from simple visit-count gating to a fuller cue-level cooldown and suppression model
4. keep the strip tiny and transient rather than expanding the UI surface

If that follow-up stays clean, the lane can move on to `main-37` phenology work without the field partner feeling under-authored.
