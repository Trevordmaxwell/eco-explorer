# 2026-03-29 Corridor Threshold State Audit

## Recommendation

For the first corridor proof, visual blending should begin before the threshold, but gameplay state should switch once, cleanly, at the threshold.

Do not let journal, field-guide, save, prompt, and weather ownership drift independently across the corridor. That would make the seam much harder to understand and much riskier to extend later.

## Threshold Rule

Use one centered ownership threshold.

- before threshold: origin biome owns state
- after threshold: destination biome owns state

Do not introduce a separate saved `corridor` biome id in the first pass.

## State Table

| System | Before threshold | At threshold | After threshold | Notes |
| --- | --- | --- | --- | --- |
| `lastBiomeId` save ownership | origin biome | switch once | destination biome | keep save model unchanged |
| journal biome context | origin biome | switch once | destination biome | opening the journal in the seam should reflect current owner |
| discovery attribution | origin biome | switch once | destination biome | new discoveries should record the owning biome only |
| field-guide biome context | origin biome | switch once | destination biome | keep one biome voice at a time |
| field-guide zone label | origin edge zone | switch once | destination edge zone | use mapped edge zones, not a new corridor zone id |
| world-state weather family | origin biome family | switch once | destination biome family | avoid mid-band weather ambiguity |
| ecosystem-note resolution | origin biome | switch once | destination biome | keeps unlock logic simple |
| observation prompt seeds | origin biome seeds | switch once | destination biome seeds | prompt matching already assumes one biome at a time |
| survey/progress math | origin biome | switch once | destination biome | keep current progression model stable |
| map-return availability | off in the blend band | no post on threshold | off in the blend band | keep map-return posts outside the seam in v1 |
| terrain blend | already drifting | continue drifting | destination-led | visual-only, not state-owned |
| parallax/sky blend | already drifting | continue drifting | destination-led | visual-only |
| decor/species emphasis | already drifting | continue drifting | destination-led | visual-only, based on corridor slice |

## Systems That Should Stay Visual-Only

These can drift before the threshold:

- ground texture and surface shape
- parallax layers and ridge silhouette
- mixed decor weights
- shared-species density

These should not drift before the threshold:

- save ownership
- prompt ownership
- note ownership
- field-guide biome identity
- journal context

## Zone Mapping Recommendation

Do not add corridor-specific zone ids in the first proof.

Use mapped edge zones:

- beach side: treat the owned seam area as `dune-edge`
- coastal-scrub side: treat the owned seam area as `back-dune`

That keeps the field guide, observation prompts, and note checks compatible with the current data model.

## Why This Matches The Current Runtime

- `buildWorldState(save, biomeId)` already assumes one biome id at a time.
- `resolveObservationPrompt()` filters by a single `context.biome.id`.
- `buildFieldGuideContext()` and zone lookup expect one biome definition and one zone set.
- discovery attribution and journal progress still depend on stable biome ownership rather than blended identities.

Trying to let different systems swap at different corridor positions would force a much larger runtime refactor than the first proof needs.

## Queue Outcome

This should narrow `main-46` and `critic-23`.

`main-46` should switch state once at the corridor threshold while allowing art to blend earlier.

`critic-23` should explicitly review whether the proof keeps visual blending and state ownership separate in the intended way.
