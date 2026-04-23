# Source to Shore Beta Campaign Seed

Date: 2026-04-21  
Status: seed plan, not yet queue-expanded  
Use after: packet 158 alpha RC reconciliation and packet 160 feedback gate.

## Campaign thesis

Eco Explorer's best next broader move is a second arc through the current five-biome world rather than biome six.

Working title: **Source to Shore**.

The first alpha arc teaches the player to notice and file places from beach through High Pass. The second arc should teach how places are connected: water, shelter, wind, seeds, soil, shade, thaw, and wrack move through the whole gradient.

The player should feel: “I know these places, and now I see how they affect each other.”

## Product boundaries

In scope:

- one second-arc shell inside existing station/route/journal structures;
- one relationship spine that connects all five existing biomes;
- one new remembered spatial beat per biome at most;
- second-arc Route v2 outings that reuse existing active/ready/filed contracts;
- compact journal/atlas synthesis that helps players explain relationships;
- save migration and deterministic proof.

Out of scope:

- biome six;
- season three as a large new mode;
- broader planner/dashboard;
- crafting, combat, inventory, economy;
- direct in-game API field guide;
- long copy walls;
- new route framework.

## Campaign packets

### Packet 158 — Alpha RC reconciliation and queue unlock

Purpose: finish the current alpha runway correctly before beta planning.

Key outputs:

- clean review-drop metadata filter;
- queue/status reconciliation;
- High Pass rime-footing copy/test mismatch resolved;
- `alpha:rc` wrapper implemented and passing;
- active queue reduced/archived.

### Packet 159 — Alpha playtest kit and observation protocol

Purpose: make external feedback consistent.

Key outputs:

- playtest script;
- observer checklist;
- comprehension rubric;
- RC install/run instructions;
- route/support observation prompts.

### Packet 160 — Alpha feedback triage and beta direction gate

Purpose: decide with evidence.

Key outputs:

- issue taxonomy: comprehension, navigation, motivation, science, readability, bug;
- repeated-observation table;
- gate decision.

Default gate outcome if alpha is healthy: proceed to Source to Shore.

### Packet 161 — Source to Shore preproduction lock

Purpose: define the second arc without implementation churn.

Lane outputs:

- lane-1: state model sketch: dormant, invited, active, ready-to-file, filed, replay.
- lane-2: science relationship spine and source-ledger checklist.
- lane-3: five-biome spatial opportunity shortlist; one selected beat per biome.
- lane-4: route chain sketch and support/replay contract.

Completion gate: one approved campaign brief with exact first vertical slice.

### Packet 162 — Second-arc state shell

Purpose: add only the state/progression shell needed for Source to Shore.

Lane outputs:

- lane-1 owns shell and save safety.
- lane-2 provides placeholder-safe copy labels only.
- lane-3 does no geometry unless needed for proof screenshots.
- lane-4 adds route-state test scaffolding but no full route content.

Completion gate: no player-facing second-arc content beyond a safe dormant/invited state unless lane-2 has approved copy.

### Packet 163 — Science spine and source ledger

Purpose: lock the learning relationships before routes and spatial beats multiply.

Relationship spine candidates:

- rime/snow stores water high up;
- thaw windows release short-season growth;
- talus and lee pockets shelter low life;
- forest roots, nurse logs, shade, and seep hold moisture;
- coastal scrub windbreaks and swales catch seeds and fog/moisture;
- beach wrack and dune edges show what moves back to shore.

Lane outputs:

- lane-2 owns facts, source ledger, copy budgets.
- lane-1 reviews state labels only.
- lane-3 identifies visual carriers for each relationship.
- lane-4 identifies route evidence IDs and filing requirements.

### Packet 164 — Spatial beat preproduction

Purpose: pick the physical memory beats before implementation.

Possible beats:

- Tundra: thaw-source braid or sedge seep lip.
- Treeline: lee pocket / talus melt channel.
- Forest: root-seep shelf or nurse-log catchment.
- Coastal Scrub: windbreak swale / seed catch hollow.
- Beach: wrack return line / dune seep edge.

Completion gate: only one beat per biome is selected; no geometry work starts until file ownership is clear.

### Packet 165 — Route chain preproduction

Purpose: design the second-arc route loop without route framework drift.

Lane outputs:

- lane-4 owns active/ready/filed route contract and route-state matrix rows.
- lane-2 owns evidence copy and science relationship wording.
- lane-1 owns station/map entry and filed/replay state.
- lane-3 owns where the evidence sits physically.

Completion gate: route chain can be implemented with current Route v2 primitives.

### Packet 166 — Vertical slice: High source to first shelter

Purpose: prove the Source-to-Shore arc with one route-grade slice before building all five biomes.

Recommended slice: Tundra/Treeline source → lee shelter / talus hold.

Completion gate: player can see source/shelter relationship in field, file it at station, and see a compact notebook synthesis.

### Packet 167 — Forest hold and release pass

Purpose: bring the relationship spine into forest without building a new forest chapter.

Focus: seep, root hold, nurse log, shade, slow release.

Completion gate: one remembered forest beat + one route/evidence connection + source-ledger coverage.

### Packet 168 — Coastal catch and windbreak pass

Purpose: connect inland/forest movement to coastal scrub shelter and seed/moisture catch.

Focus: windbreak swale, seed catch, fog/moisture, coastal shelter.

Completion gate: Coastal Scrub feels like part of the gradient, not a side corridor.

### Packet 169 — Shore return and wrack line pass

Purpose: close Source to Shore at the beach.

Focus: wrack return, dune edge, shore evidence, what the high places send down.

Completion gate: the beach ending feels like a relationship payoff, not merely returning to start.

### Packet 170 — Station and nursery second-arc payoff

Purpose: make the home loop respond to Source to Shore.

Lane outputs:

- lane-1: station phase/homecoming state and save safety.
- lane-2: compact synthesis copy.
- lane-3: one small visual/home-base change only if it fits existing seams.
- lane-4: route filing / replay state proof.

Completion gate: filing second-arc work changes how the station/nursery feels without adding a new dashboard.

### Packet 171 — Notebook synthesis and kid-readable explanation

Purpose: help the player explain the cross-biome relationship in their own words.

Focus: one compact synthesis card/atlas note, not a copy wall.

Completion gate: content-quality tests enforce budget and source coverage.

### Packet 172 — World-map and travel clarity for second arc

Purpose: make Source to Shore legible as movement through the gradient.

Focus: existing map footer/route card/field-station seams.

Completion gate: no new persistent HUD or planner.

### Packet 173 — Save, migration, and debug snapshots

Purpose: protect old alpha saves and new beta states.

Completion gate: old alpha filed-High-Pass saves load safely; debug snapshots exist for major second-arc states.

### Packet 174 — Full second-arc smoke matrix

Purpose: prove the arc end to end.

Completion gate: deterministic smoke from invited state through filed Source-to-Shore state and stable replay.

### Packet 175 — Beta feedback batch

Purpose: run observed sessions focused on the second arc.

Completion gate: repeated issues are triaged, not every suggestion implemented.

### Packet 176 — Beta scope gate

Purpose: decide whether to harden, deepen, or finally expand region/biome.

Gate options:

- harden current alpha/beta;
- deepen Source to Shore inside five biomes;
- add a new chapter inside the current five-biome map;
- only then consider biome six.

## Parallelization guidance

The campaign is intentionally long-running, but it should not be fully parallel from day one.

Recommended cadence:

1. Run packet 158 by itself.
2. Run packets 159 and 160 in sequence around real playtest sessions.
3. Run packets 161-165 as preproduction; lanes can work in parallel because outputs are docs and contracts.
4. Run packet 166 as a vertical slice; keep cross-lane dependencies explicit.
5. If the vertical slice works, run packets 167-172 with lane-local chains, but use cross-lane locks for shared biome/content files.
6. Run packets 173-176 as hardening/feedback/release gates.

## Definition of success

A successful Source to Shore beta lets a player say, in their own words:

- where the water or shelter signal started;
- how it changed as it moved through places;
- why a plant, animal, or habitat marker mattered;
- what they filed at the station;
- what changed when they revisited.
