# Project Memory

This file stores durable decisions so they survive context loss.

Update this only when a decision or standing rule changes.

## Product Summary

Eco Explorer is a desktop-first retro-style educational exploration game for kids. The current live build includes a five-biome chain of beach, coastal scrub, forest, treeline, and tundra ecosystems connected by a world map, with inspectable nature objects, collectible discoveries, and a persistent journal.

## Audience

- Primary audience: kids roughly ages 7-10
- Secondary audience: adults guiding or observing play

## Standing Product Decisions

- Science accuracy is a hard gate.
- Facts should be kid-friendly, short, and readable.
- The game should teach ecosystems through exploration and noticing, not quizzes or combat.
- The project should stay modular and data-driven so new biomes can be added without rewriting the core.
- Player-facing category language should stay science-safe, including treating lichens as distinct from plants.
- Species intentionally shared between a parent biome and an ecotone should live in `src/content/shared-entries.ts` instead of being spread from one biome module into another.
- Shared species should keep one journal entry keyed by `entryId`, while repeat sightings can extend that entry with compact multi-biome context instead of creating duplicates.
- Save state stays local for now.
- Landmark or habitat inspectables use subtitles instead of invented scientific names.
- AI-style field-guide features should land clipboard-first before any direct in-game API mode.
- Any future direct OpenAI field-guide mode must keep API secrets off the client; this browser-only repo needs a server-side relay or equivalent secret boundary before that lane can be implemented safely.
- Day-part changes, weather, naturalist prompts, and a lightweight field partner are approved future features, but they should land after the current content-density and lightweight-progression phase.
- Future living-world features should share one deterministic `world-state` seam instead of growing as separate day, weather, prompt, or companion systems.
- The first living-world pass is now live as a render-first `dawn` / `day` / `dusk` cycle resolved from deterministic saved `worldStep` state rather than wall-clock time.
- The first weather pass is now live as a render-first extension of that same seam: baseline `clear` plus one calm family weather per live biome branch (`marine-haze`, `mist-drip`, `ridge-wind`, `light-flurry`).
- The first phenology pass is now live as the next extension of that same seam: one deterministic shared `early` / `peak` / `late` phase with biome-local authored responses instead of a heavy calendar simulation.
- The first phenology pass is structurally sound, but beach remains the weakest live branch and should get the tiny `main-44` reinforcement pass before the first coastal corridor proof leans on phenology as a continuity signal.
- Ecotone transition biomes are an approved future direction for teaching ecosystem gradients.
- Biome chains should stay geographically coherent when the game presents them as one continuous ecosystem gradient.
- Continuous ecosystem walking is an approved future direction, but it should be hybrid: adjacent biomes can blend and be walked between while the world map remains as optional fast travel and orientation.
- Corridor threshold ownership and biome-visit accounting are separate concerns: the first continuous-travel proof can switch biome owner at the threshold, but pacing back and forth inside one seam session must not repeatedly advance `worldStep`, visit counts, weather, or phenology; the seam only counts as a biome visit when the player fully exits into the neighboring biome.
- Compact onboarding copy should use authored, test-backed budgets instead of runtime truncation for core concepts.
- Ecosystem notes in the journal should deepen a selected entry, not replace that entry's own teaching text.
- The first lightweight progression layer should use per-biome survey states (`none`, `surveyed`, `complete`) derived from discovery counts, shown mainly in the journal with only a tiny map echo.
- Per-biome journal progress and survey states should treat shared species as local only after that species has actually been seen in the current biome.
- Dense journal pages should stay notebook-like through selection-centered windowing and light scroll affordances instead of turning into a dashboard or a second full-screen list surface.
- Approved future depth systems now include gentle seasons and phenology, notebook-style relationship prompts, shared-species comparison pages, sketchbook authorship, sparse soundscapes, and occasional close-look inspect moments.
- Relationship prompts should read like a field notebook, not achievement quests or chores.
- The first notebook prompt pass should surface one calm relationship prompt at a time from a small authored seed set, centered on shelter, timing, neighbor roles, or evidence-backed comparison.
- Notebook prompts should use simple evidence-aware unlock and rotation rules instead of broad runtime chatter generation.
- Notebook prompts should deepen an unlocked ecosystem note, not replace that note's stable teaching text.
- Prompt and partner surfaces should stay distinct: prompts belong in the compact notebook flow first, while the partner, if added, should use a tiny transient in-biome strip rather than a permanent shared chatter surface.
- The first notebook prompt pass is now live as a journal-first companion cue plus field-guide prompt append, using a small authored seed set with ecosystem-note fallback instead of a new chatter surface.
- The notebook-prompt follow-up is now live as a split companion journal state: unlocked ecosystem-note teaching stays visible in its own compact section while longer prompt seeds get a separate prompt card instead of replacing the note.
- The field partner should feel like a notebook margin and default to silence during overlays, map travel, active inspect, transitions, and repeated same-state revisits.
- The field partner should stay a tiny transient in-biome strip built from a compact authored cue bank keyed to biome, zone, world-state, and notebook context, with no-prompt fallback cues only when day-part or weather are doing obvious readable work.
- Shared-species comparison pages should stay note-backed and same-pane, comparing habitat roles and conditions instead of repeating shared fact text.
- The first shared-species comparison pass should stay narrowly allowlisted to note-backed entries with strong local ecosystem-note contrast until more cross-habitat pairs are authored.
- Sketchbook v1 should be journal-hosted and stamp-based, using local discovered entries and a few anchored slots instead of a freehand editor.
- The first sketchbook pass is now live as a journal-hosted, surveyed-biome stamp spread with three anchored slots and local discovered entries only; it should stay personal and save-light rather than drifting toward a bigger editor.
- Sound should start as sparse biome ambience plus tiny UI cues, with one simple on/off control before any larger music or mixer system.
- The first sound pass is now live as one sparse synthesized ambience profile per live biome plus tiny UI cues, all gated behind a persisted `Sound` toggle and debug-safe runtime state instead of a larger music or mixer system.
- Close-look inspect mode should stay occasional and visual-first, starting with a few supported entries and one centered vignette card instead of a new text-heavy overlay system.
- The first close-look pass is now live as a small inspect extension for a short allowlist of visual-first discoveries: the fact bubble still comes first, and a second inspect opens one centered vignette card with enlarged art and tiny callouts instead of a journal detour.
- Second-tier field-station upgrades should stay gated behind earlier support and remain modest movement help rather than expanding into a larger shop or utility system.
- Visible ecology-process moments now live on authored biome `processMoments`, derived from revisit count plus deterministic world-state instead of a heavy simulation layer.
- Seasonal and phenology changes should feel like the world being in a different mood, not like a heavy simulation calendar.
- The first phenology pass should use a coarse shared phase with biome-local authored responses rather than a universal four-season matrix.
- Player-authorship systems should emphasize sketchbook or atlas feeling rather than crafting or base-building.
- The internal gameplay viewport baseline is now `256x160`, and future readability decisions should use that as the default screen shape unless a stronger gameplay reason appears.
- After the first phenology stabilization point, functional gameplay work should outrank sketchbook, broader soundscape, and close-look polish features.
- The first stronger game-loop expansion should go in order: exploration geometry first, notebook-style field requests second, and a tiny field-station upgrade loop third.
- Now that traversal, requests, station, sketchbook, sound, close-look, and the stabilized corridor lane are all live, the next highest-leverage phase is a short guided field-season loop that makes those systems feel like one authored game instead of a set of successful subsystems.
- The field station now hosts one compact `Field season` board with a single live authored route grouped into three medium beats; future route work should keep that notebook-first, station-centered shape instead of growing into a separate quest log.
- After the nursery wave and the third-route activation, the next highest-leverage phase should deepen that route through transition-driven content fuel, one front-half sheltered traversal proof, and a compact three-route field-station scaling pass before adding another large system.
- The three-route field-station scaling pass is now live as one compact recent-or-stop strip, one route-title-plus-beat board, one tiny atlas count strip, and flat support rows; this is the safe upper density for the current `256x160` station shell, so a fourth live route should wait for a different station pattern instead of another compression pass.
- The nursery should keep acting as a secondary support loop for route progression and chapter feel; it should not expand into a broader resource economy or base-building lane during the current phase.
- The first traversal proof is now live in `forest` as a late-`fern-hollow` into `root-hollow` slice with authored overhead logs above a lowered sheltered lane, and it should stay a cozy detour rather than a generalized cave system.
- The first functional objective layer should stay notebook-first and evidence-aware, using the journal, survey-state, and current world-state seam instead of a separate quest-log or job-board model.
- The first functional objective layer is now live as one active notebook-style field request at a time, surfaced mainly through the journal plus a tiny in-world completion notice, with completed requests stored as durable ids instead of a stacked quest list.
- If an economy is added, prefer a field-station or survey-credit model where completed surveys and requests convert into field credit, rather than directly selling living nature finds.
- The first exploration-geometry proof should start in `forest`, centered in late `fern-hollow` into `log-run`, adding an upper route plus one short root-hollow, log-underpass, or shallow creek-bank detour before any larger world rewrite.
- The first field-station loop should stay world-map-context and ledger-light, converting surveyed biomes plus completed notebook requests into field credit instead of turning the in-biome field menu into a store.
- If the field-station loop lands, the first upgrade should be a small walk-speed improvement, with any jump boost held for a second tiny slot only if readability still survives critique.
- The first field-station loop is now live as a compact world-map-context overlay that converts surveyed biomes and completed notebook requests into field credit, with `trail-stride` as the first small walk-speed upgrade.
- The first nursery-forward gameplay expansion is now live inside the field station as a compact `SEASON | NURSERY` split, not as a separate hub or management screen.
- Nursery v1 uses four small abstract bundle types (`litter`, `seed-stock`, `cuttings`, `compost`) and one single-project teaching bed instead of a larger inventory or farm grid.
- Nursery gathering must stay science-safe and allowlisted: safe fallen material, wrack, dropped cones or fruits, and a small set of gated propagation cuttings are valid; broad harvesting is not.
- Nursery growth should stay low-maintenance and deterministic, advancing through world-step sync plus automatic compost processing rather than repeated chores or watering loops.
- Nursery rewards should stay balanced between beauty, route-support clues, and one tiny convenience effect; they should not escalate into a market, heavy economy, or another movement-upgrade ladder.
- Habitat extras such as `Log Pile` and `Pollinator Patch` should read as tiny teaching-garden supports, not decorative clutter or base-building.
- The first guided field-season loop is now live as a fresh-save starter note plus one forest-led request chain, one world-map station-return beat, and one `coastal-scrub` forward pointer after `trail-stride`; future content passes should feed that loop without growing a heavier quest-log or station dashboard.
- The next highest-leverage gameplay phase is a field-station-centered `field season` board with one live authored cross-biome route; this should deepen medium-term progression before the project wakes up broader inland process moments or more abstract side systems.
- Route progression should stay notebook-first, route count should stay tiny at first, and the first live route should favor the already strong beach, coastal scrub, and forest branch before inland and alpine routes widen the season.
- The next phase after the first route board is now an inland authored chapter: one second live route should make the forest, treeline, and tundra branch feel like a real second half of the game before broader atlas, corridor, or abstract seasonal systems grow further.
- `Treeline Shelter Line` is now the live second field-season route, using treeline shelter, tundra short-season, and tundra survey beats; future inland route work should reinforce that one authored chapter before another live line opens.
- The first route utility beyond movement is now live as `Route Marker`, a small world-map pin for the next route stop; future station rewards should stay in that light observational or travel-support lane instead of escalating into a larger economy.
- The first inland content-fuel pass uses `mountain-avens` as the shared alpine comparison anchor between treeline and tundra, while forest support stays prompt-first rather than adding a second inland request chain immediately.
- The first tundra traversal proof is now live as a `thaw-skirt` seam between `snow-meadow` and `frost-ridge`, with one upper ice-step route above a lower thaw-edge recovery lane; future tundra traversal should stay low, thaw-aware, and forgiving.
- The first front-half traversal proof is now live as a beach-side `lee-pocket` shaped by driftwood and wrack; future coast traversal should stay broad, optional, and habitat-role-driven instead of reopening `coastal-scrub` or introducing a cave engine.
- The field station now has a tiny `Field atlas` strip for logged routes; it should stay secondary to the active route board and avoid drifting toward route totals, badges, or dashboard framing.
- `Edge Pattern Line` is now the live third field-season route, using compact transition beats across `coastal-scrub`, `forest`, and `treeline` instead of opening a broader multi-route planner.
- On `Edge Pattern Line`, nursery route-support clues should resolve by the active beat so `dune-lupine`, `salmonberry`, and `mountain-avens` stay optional context clues instead of flattening the whole route into one repeated hint.
- The first `Edge Pattern Line` content-fuel pass stays note-first: coastal scrub now teaches sturdier shrub cover with `sturdier-cover`, forest uses the `forest-middle-edge` comparison prompt, and treeline bridges into open fell with `tree-line-drops` instead of adding a larger route mechanic.
- Quiet inland corridor beats are now live: `forest <-> treeline` should stay carrier-first and mostly silent, while `treeline <-> tundra` is the safer seam for one small prompt-linked shelter cue once open-ground carriers are visible.
- Inland habitat-process moments are now live as authored revisit cues: forest uses late wet `moisture-hold`, treeline uses late windy `frost-rime`, and tundra uses peak-season `thaw-fringe`, all resolved from the shared world-state seam plus revisit count.

## Standing Process Decisions

- The critique agent should act like a practical coach, not a blocker.
- The work queue is the main handoff mechanism between agents.
- Structured packets in `.agents/packets/` can supplement queue items when work needs machine-friendly context, but the queue stays authoritative for owner, order, and status.
- When a clean critic review explicitly gates the next parked main-agent step, the critic may promote that named next step to `READY` so the overnight lane can keep moving.
- Queue or packet edits should be followed by `npm run validate:agents` so handoff metadata drift is caught early.
- Dated critique or handoff documents should live in `docs/reports/`.
- Durable agent instructions and role docs should live in `.agents/`.

## Current Design Direction

- Move away from a landing-page presentation toward a game-first handheld-screen feel.
- Remove or greatly reduce the large external page masthead and controls card.
- Keep onboarding, controls, and feedback inside the game UI where possible.
- If the internal aspect ratio changes, choose it deliberately after shell simplification rather than stretching the current view casually.
- Use the deliberate `256x160` in-game viewport as the baseline screen shape for current UI work unless a stronger gameplay reason appears.
- Expand to new ecosystems through a world-map travel layer with readable doorway transitions instead of hard-cut biome swaps.
- Evolve travel toward a hybrid corridor model over time: neighboring ecosystems can blend and be walked between, while the world map remains for long hops, overview, and optional quick travel.
- Fix text-heavy in-canvas surfaces with layout rules and safe areas rather than repeated one-off coordinate nudges.
- Favor ecosystem gradients and transition biomes over disconnected “next level” biome additions when expanding the world map.
- The best next-phase order is content density first, lightweight progression second, and broader living-world systems only after those are stable.
- The first progression layer should stay journal-first and biome-based, with only tiny map echoes instead of quest logs or score ladders.
- Same-pane shared-species comparison pages are now part of the live journal for a small set of note-backed multi-biome entries, so future journal depth should build from that compact notebook treatment instead of replacing it.
- At `256x160`, comparison-open journal layouts should prioritize habitat-card readability over preserving every normal-detail line; it is okay to trim the usual excerpt or sightings copy while comparison mode is open.
- Scout downtime should now favor living-world preproduction for day-part, weather, and phenology instead of reopening broader feature ideation.
- After the current phase-two fixes, the strongest longer-term depth line is ecology over time first, then notebook comparison depth, then player authorship and sensory richness.
- The live `world-state` seam now carries the first day-part pass as a forward-feeling `dawn -> day -> dusk` sequence, and future weather, notebook prompts, or phenology work should extend that helper instead of inventing parallel timing state.
- Fresh saves should keep their calm neutral onboarding feel by seeding into `day` through save initialization or migration, not by making the core day-part sequence run backward.
- The first day-part pass should stay the readable core set, with any `moonlit evening` variant treated as an optional later stretch only if five-biome browser captures stay clear at `256x160`.
- The first weather pass now uses `clear` plus one calm profile per biome family and stays render-first before any broader prompt or spawn effects.
- The first phenology pass should keep stable terrain and habitat anchors in place, using small scene washes, entry accents, and selective visit-table emphasis instead of relocating the world or simulating a full season engine.
- The first notebook prompt pass and the authored field-partner pass should keep extending the same shared world-state seam instead of introducing a separate chatter or timing system.
- The first post-phenology world-continuity bundle should use the `beach <-> coastal-scrub` corridor proof as its spine, while broader audio rollout and map-return posts wait until after that proof survives critique.
- Future weather depth should keep building on the same seam and profile family approach instead of turning into a parallel simulation or per-biome menu.
- If continuous corridor travel lands later, the first proof should use a dedicated `beach <-> coastal-scrub` seam scene rather than wiring the current beach right-side exit directly into `coastal-scrub`, because the live beach strip still faces seaward on its right edge.
- If continuous corridor travel lands later, visual blending can begin before the threshold, but save, journal, field-guide, note, prompt, and weather ownership should switch once at the threshold and should not introduce a separate corridor biome id in v1.
- If continuous biome walking lands later, prototype it as adjacent blend corridors with one clear handoff threshold instead of stitching the full five-biome chain into one giant level on the first pass.
- If beach phenology still needs reinforcement after the first coarse phase pass, keep it inside the current beach species set around `sand-verbena`, `beach-grass`, and a small `bull-kelp-wrack` support accent rather than expanding the coast roster.
- The first continuous-travel proof is now live as a dedicated `beach <-> coastal-scrub` seam scene with one ownership threshold; it is not a saved biome id and should stay edge-focused until critique approves broader expansion.
- During the first corridor proof, the world map should remain available as optional fast travel through the field menu while permanent authored map-return posts stay deferred to the later travel follow-up.
- The first corridor proof has now survived its stabilization pass, so full-chain expansion can move forward as long as new seam pairs keep the same state-accounting rule and receive browser-level readability checks.
- The full adjacent corridor chain is now live with one authored interior map-return post per corridor-enabled biome, and canceling back from the world map should return the player near the same post anchor instead of the old edge doorway.
- The strongest post-nursery direction is now to make the `Edge Pattern Line` branch feel like a full chapter, then strengthen the front-half movement identity and station stopping-point rhythm before opening a bigger new phase.
- With three routes now live and the station shell at its safe density, the next high-leverage phase should improve replayability and chapter closure through route-aware revisit variants, a compact season-wrap pass, and quiet coastal corridor continuity instead of opening a fourth live route.
- The project now supports lane-based single-agent runners: one agent can alternate scout, main, and critic roles inside one lane as long as it restarts the read chain before every new item and stays inside that lane's scope.
- Lane 1 is the systems-and-progression lane; lane 2 is the content-and-atlas-richness lane. Parallel agents should stay in separate lanes whenever possible.
- Lane 2 should prefer `src/content/**`, science docs, and content-facing tests, using existing journal, note, comparison, close-look, and sketchbook systems instead of reopening station or progression architecture.
- The first lane-2 coastal richness pass should center on washed-shore clues, thorny scrub cover, and coast-facing forest berry thickets, while leaving actual comparison-allowlist and close-look expansion for the later journal-richness step.
- The first lane-2 coastal richness pass is now live as `sand-dollar-test` on beach, shared `nootka-rose` thickets across scrub and forest, and `red-huckleberry` at the first forest edge; later journal-depth work should build on those note-backed additions instead of reopening coastal travel or station systems.
- Lane 3 is the vertical-exploration lane, focused on deeper caves, giant-tree climbing, and science-forward sub-ecosystem spaces; it should avoid station and route-board work unless explicitly handed off.
- The first lane-3 runtime pass should expand vertical budget through `cameraY`, taller authored biome heights, and small authored depth features; it should not turn the engine into a procedural cave-topology or ceiling-collision rewrite.
- The first route-replay pass should stay one active-beat variant at a time, driven by existing world-state, habitat-process, and nursery seams rather than a separate replay system or route-history layer.
- Station stopping-point guidance should stay inside one tiny wrap lane in the existing season strip, not expand into a new recap card or score panel.
- Coastal corridor continuity should stay carrier-first, with at most one notebook or partner window on the scrub-to-forest seam where `coastal-edge-shade` and the `salmonberry` edge read are strongest.
- Small replay surfacing follow-ons should prefer reusing the world-map footer or other existing labels instead of adding a separate route HUD.
- After the replay and season-wrap wave, the next larger growth step should be a notebook-like season-page station pattern plus one deeper expedition chapter, not a fourth full route compressed onto the current board.
- The first season-page station evolution is now live as a compact `ROUTES | EXPEDITION` page turn inside `SEASON`: the routes page keeps wrap, board, atlas, and support, while the expedition page stays one single `ROOT HOLLOW` slot instead of growing a dashboard or multiple expedition cards.
- The new forest cave and climbable work is the best current foundation for a more exploration-forward expedition chapter, as long as it stays calm, readable, and free of combat or survival drift.
- The first deeper expedition chapter is now live as one `ROOT HOLLOW` outing threaded through the existing forest runtime: `Lower Hollow` -> `Trunk Climb` -> `Upper Run`, with the expedition card and post-route atlas/wrap copy reflecting chapter progress instead of leaving the season at a dead end.

## Current Known Risks

- `src/engine/game.ts` is becoming the concentration point for simulation, rendering, overlays, and hooks.
- The new biome, map, and transition scenes are live, but their orchestration still sits mostly inside `src/engine/game.ts`.
- A future continuous corridor-travel pass would put extra pressure on the current per-biome runtime and should be prototyped as one adjacent pair before any full-chain rewrite.
- The current beach strip is oriented opposite the coastal gradient on its live right edge, so any future `beach <-> coastal-scrub` corridor proof must correct for that instead of directly reusing the existing beach exit.
- The first corridor proof is now stable, but any future corridor expansion will put pressure on state-model clarity if new seam pairs do not follow the same “ownership switches at the threshold, visits commit on full exit” rule.
- The first corridor proof now uses a dedicated inland-facing gameplay door on beach while map transitions still use the original map-linked door, and future corridor pairs may need similar per-biome entry framing instead of blindly reusing map anchors.
- Terrain is still modeled primarily as one sampled surface plus platforms, so the first traversal-depth proof should stay shelter-like; a true overhang cave system would be a meaningfully larger runtime and renderer rewrite.
- The title, menu, journal, and other text-heavy surfaces are still manually packed tightly enough to risk clipping when copy changes.
- Deterministic smoke coverage now exists for the lived player loop, but browser-level UI checks are still the main guardrail for visual regressions.
- The learning loop is strongest at isolated facts and still needs deeper ecosystem relationship teaching over time.
- Future coastal additions must preserve the new Pacific beach-to-forest alignment so mixed Atlantic/Pacific species do not creep back into the ecotone chain.
- Multi-biome sightings now surface in the journal detail pane, but the list view still stays intentionally calm, so cross-habitat overlap remains easy to miss unless players open an entry.
- The journal now has explicit dense-page windowing, but the notebook shell is still compact enough that future content or copy growth needs browser-level layout checks instead of assuming the current safe areas will hold forever.
- The notebook prompt refit is live, but the journal shell at `256x160` is still compact enough that future prompt, note, or companion-copy changes need seeded browser checks instead of trusting runtime truncation alone.
- The partner strip is intentionally tiny and quiet, so future cue-copy growth or delivery tweaks need seeded browser checks to avoid turning it into a second HUD bar.
- The authored field-partner follow-up now reviews cleanly, but the strip is still tiny enough that future cue-copy or cadence growth needs seeded browser checks before the lane moves on to heavier companion behavior.
- The living-world lane can now move on to `main-37`, with `main-44` still reserved as the tiny beach-only reinforcement pass if the first phenology rollout leaves the coast thinner than the inland and alpine branches.
- The world-continuity preproduction pack is now complete and points future implementation toward one narrow first bundle: corridor proof first, then broader audio, then chain expansion, then map-return posts.
- The beach branch remains the weakest phenology anchor in the live `early` / `peak` / `late` pass; it has good bloom cues, but its late-phase support is still thinner than forest, treeline, and tundra and now has an explicit tiny reinforcement follow-on in `main-44`.
- The first live phenology rollout now reads clearly in forest, treeline, tundra, and coastal scrub, while beach stays intentionally subtler and should only use the tiny `main-44` reinforcement pass if critique still finds the coast too thin.

## Current Key References

- `.agents/critic-brief.md`
- `.agents/work-queue.md`
- `docs/reports/2026-03-27-initial-critique.md`
- `docs/reports/2026-03-27-post-travel-queue-pass.md`
- `docs/reports/2026-03-27-world-travel-scout.md`
- `docs/reports/2026-03-28-current-state-review.md`
- `docs/reports/2026-03-28-readability-pass-review.md`
- `docs/reports/2026-03-28-five-biome-journal-selector-handoff.md`
- `docs/reports/2026-03-28-compact-ui-handoff.md`
- `docs/reports/2026-03-28-coastal-branch-geography-handoff.md`
- `docs/reports/2026-03-28-coastal-scrub-review.md`
- `docs/reports/2026-03-28-shared-species-handoff.md`
- `docs/reports/2026-03-28-multi-biome-sightings-handoff.md`
- `docs/reports/2026-03-28-treeline-review.md`
- `docs/reports/2026-03-28-five-biome-chain-review.md`
- `docs/reports/2026-03-28-live-biome-science-audit.md`
- `docs/reports/2026-03-28-post-28-roadmap.md`
- `docs/reports/2026-03-28-lightweight-progression-handoff.md`
- `docs/reports/2026-03-28-content-density-review.md`
- `docs/reports/2026-03-28-lightweight-progression-review.md`
- `docs/reports/2026-03-28-local-sighting-progression-fix-review.md`
- `docs/reports/2026-03-28-dense-journal-navigation-review.md`
- `docs/reports/2026-03-28-depth-and-game-feel-sequence.md`
- `docs/reports/2026-03-28-phenology-grounding-handoff.md`
- `docs/reports/2026-03-28-living-world-preproduction-sequence.md`
- `docs/reports/2026-03-28-day-part-mood-matrix-handoff.md`
- `docs/reports/2026-03-28-first-day-part-review.md`
- `docs/reports/2026-03-28-day-part-ordering-follow-up-review.md`
- `docs/reports/2026-03-28-weather-readability-matrix-handoff.md`
- `docs/reports/2026-03-29-weather-pass-review.md`
- `docs/reports/2026-03-29-notebook-prompt-review.md`
- `docs/reports/2026-03-29-notebook-prompt-follow-up-review.md`
- `docs/reports/2026-03-29-field-partner-cue-bank-handoff.md`
- `docs/reports/2026-03-29-field-partner-review.md`
- `docs/reports/2026-03-29-authored-field-partner-follow-up-review.md`
- `docs/reports/2026-03-29-world-continuity-preproduction-sequence.md`
- `docs/reports/2026-03-29-world-continuity-preproduction-pack.md`
- `docs/reports/2026-03-29-continuous-corridor-travel-sequence.md`
- `docs/reports/2026-03-29-hybrid-corridor-travel-handoff.md`
- `docs/reports/2026-03-29-corridor-edge-content-matrix-handoff.md`
- `docs/reports/2026-03-29-corridor-threshold-state-audit.md`
- `docs/reports/2026-03-29-beach-orientation-fix-options.md`
- `docs/reports/2026-03-29-first-corridor-proof-review.md`
- `docs/reports/2026-03-29-corridor-stabilization-follow-up-review.md`
- `docs/reports/2026-03-29-next-high-leverage-phase.md`
- `docs/reports/2026-03-30-field-season-routes-phase.md`
- `docs/reports/2026-03-30-inland-route-phase.md`
- `docs/reports/2026-03-29-functional-gameplay-sequence.md`
- `docs/reports/2026-03-29-functional-gameplay-loop-handoff.md`
- `docs/reports/2026-03-29-forest-traversal-proof-handoff.md`
- `docs/reports/2026-03-29-forest-traversal-proof-review.md`
- `docs/reports/2026-03-29-field-request-layer-review.md`
- `docs/reports/2026-03-29-field-station-credit-handoff.md`
- `docs/reports/2026-03-29-field-station-loop-review.md`
- `docs/reports/2026-03-29-first-phenology-review.md`
- `docs/reports/2026-03-28-phenology-readiness-audit.md`
- `docs/reports/2026-03-28-beach-phenology-support-handoff.md`
- `docs/reports/2026-03-28-notebook-prompt-handoff.md`
- `docs/reports/2026-03-28-weather-aware-notebook-prompts-handoff.md`
- `docs/reports/2026-03-28-field-partner-tone-boundaries-handoff.md`
- `docs/reports/2026-03-28-prompt-partner-surface-handoff.md`
- `docs/reports/2026-03-28-shared-species-comparison-handoff.md`
- `docs/reports/2026-03-28-shared-species-comparison-review.md`
- `docs/reports/2026-03-28-comparison-layout-follow-up-review.md`
- `docs/reports/2026-03-28-sketchbook-v1-handoff.md`
- `docs/reports/2026-03-29-sketchbook-v1-review.md`
- `docs/reports/2026-03-28-soundscape-direction-handoff.md`
- `docs/reports/2026-03-29-soundscape-v1-review.md`
- `docs/reports/2026-03-28-close-look-handoff.md`
- `docs/reports/2026-03-29-close-look-v1-review.md`
- `docs/reports/2026-03-28-living-world-sequence.md`
- `docs/reports/2026-03-28-living-world-grounding-handoff.md`
- `docs/reports/2026-03-28-ecosystem-relationship-scout.md`
- `docs/reports/2026-03-28-ecosystem-note-review.md`
- `docs/reports/2026-03-28-field-guide-review.md`
- `docs/reports/2026-03-28-external-pack-reconciliation.md`
- `docs/science-source-ledger.md`
- `docs/ai-naturalist-design.md`
- `docs/ecotone-design.md`
- `docs/architecture.md`
- `docs/content-authoring.md`
- `docs/world-travel.md`

## Update Notes

When changing this file:

- keep statements durable
- avoid session-level chatter
- replace stale decisions instead of stacking contradictions
