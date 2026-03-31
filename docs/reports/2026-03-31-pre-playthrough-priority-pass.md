# 2026-03-31 Pre-Playthrough Priority Pass

## Summary

The next token-budgeted phase should prepare Eco Explorer for a full human playthrough, not broaden the game again.

At this point the project already has:

- a real five-biome world
- corridor travel
- a field station and nursery
- three live route lines
- Route v2 notebook structure
- a first expedition chapter
- richer vertical exploration spaces

That is enough to learn a lot from one serious playthrough.

The best remaining work before that playthrough is:

1. make the game feel more self-contained on first contact
2. tighten one expedition so it feels more like an authored chapter
3. reduce disorientation in the new vertical spaces
4. freeze broader content expansion unless review finds a real blocker

## External Handoff Read

An external handoff and patch were reviewed on `2026-03-31`:

- `eco_explorer_codex_handoff.md`
- `eco_explorer_field_case_route_v2.patch`

Conclusion:

- the design intent is good
- the literal patch is mostly superseded by the current live Route v2 runtime
- the highest-value remainder is the expedition follow-up: add one calmer evidence-backed middle leg inside `ROOT HOLLOW`

Do not spend pre-playthrough budget applying the patch literally. Carry forward the useful idea, not the older implementation shape.

## Do Now

### Lane 1: First-Session Standalone Polish

Goal:

- make the first ten minutes understandable without README, chat context, or a manual explanation

Focus:

- title and first-session guidance
- journal discoverability
- world-map to field-station discoverability
- active-route clarity
- stop-point and return guidance

Guardrails:

- do not add a new top-level panel
- do not add a quest log
- do not turn the station into a tutorial dashboard

### Lane 3: Vertical Readability Polish

Goal:

- make the cave and canopy family easier to read and recover through in a real playthrough

Focus:

- recovery and anti-stuck passes
- camera and route readability
- landing and climb clarity
- tiny in-world cue tuning if needed

Guardrails:

- do not open new major cave chambers
- do not add a larger traversal HUD
- do not widen the geometry family unless a tiny fix is necessary for readability

### Lane 4: Root Hollow Expedition Follow-Up

Goal:

- deepen `ROOT HOLLOW` so it is not only traversal plus filing

Focus:

- one evidence-backed middle leg between `Lower Hollow` and `Trunk Climb`
- bark / root / stone-pocket interpretation
- truthful route-board, station, and expedition copy
- compact test coverage for the added chapter leg

Guardrails:

- do not add another station page
- do not add combat, fail states, inventory, or a new expedition shell
- do not reopen generic field-request architecture unless the current Route v2 seam cannot support the leg

### Lane 2: Freeze And Review

Goal:

- spend the least budget here before playthrough

Focus:

- close the current richness wave through review
- only reopen lane 2 if the review finds a real science, clarity, or readability problem in currently active route content

Guardrails:

- do not start a broad new content pack before playthrough
- do not expand the archive or sketchbook shell

## Save For After Playthrough

These are still good ideas, but they should wait until the human playthrough produces real notes:

- a fourth live route or broader season-board growth
- a second expedition card or wider expedition roster
- bigger archive, gallery, or sketchbook shells
- broader canopy and cave breadth expansion beyond readability fixes
- larger microhabitat content waves
- economy, market, crafting, or loadout growth
- more route rows, more station density, or dashboard-style surfaces

## Recommendation

Before the playthrough, use the remaining token budget on:

1. lane-1 self-contained first-session polish
2. lane-4 `ROOT HOLLOW` field-case middle-leg polish
3. lane-3 vertical readability and recovery polish
4. lane-2 review only

That order should make the game feel cleaner, more standalone, and more note-worthy without spending precious token budget on expansion the playthrough might immediately redirect.
