# Eco Explorer Alpha Runway Mega-Push

Created: 2026-04-20

## Decision

Packet 129 closed the current alpha arc: High Pass has filed-state closure, route-loop proof, and settled station/map/journal/request behavior. The next push should therefore be much larger, but it should not be broader in fantasy scope. It should be a long-running alpha runway: playthrough proof, feedback capture, tactile payoff, route/support clarity, science/copy audit, maintainability, and release-candidate packaging.

## Snapshot Findings

- The uploaded review archive is not source-complete: most `src/engine`, `src/content`, `src/assets`, `src/test`, and `docs/reports` files are absent from the working tree, so `npm run validate:agents` fails in this copy on missing paths.
- The bundled `.agents` state says packet `129` is `DONE`, all packet-129 queue items are in `Done`, and `High Pass` now has a filed phase that suppresses active route cues after completion.
- The queue has no active `Ready` items before this package is applied.
- The next durable risk is not lack of content breadth; it is whether the finished arc is easy to play, easy to review, science-safe, regression-proof, and maintainable enough for outside feedback.

## Campaign Shape

This package adds 28 packets, 336 queue items, and four independent lane chains. Only the first four scout items are `READY`; everything else is dependency-gated so the lanes can run for a long time without stepping on each other.

### A / Preflight

- **130 — Alpha runway setup and review-drop hygiene:** Repair the handoff surface, review archive shape, and alpha-runway operating model before a long campaign starts.
- **131 — Playthrough instrumentation and save snapshots:** Add deterministic internal playthrough observability without creating a player-facing telemetry or dashboard system.
- **132 — First-session onboarding and wayfinding proof:** Harden the first ten minutes so new players find the notebook, map, station, and first purpose without a tutorial panel.
- **133 — Full-arc deterministic smoke matrix:** Turn the completed alpha arc into a reliable internal regression target before expanding polish breadth.

### B / Home loop

- **134 — Station homecoming evolution pass:** Make return-to-station feel more earned through calm visible changes instead of a larger dashboard or copy stack.
- **135 — Nursery memory and teaching-bed readability:** Use the nursery as a quiet memory of places visited, not a chore loop or base-building system.
- **136 — Support choice in-field differentiation:** Make support choice felt during outings rather than mostly visible on map/station chrome.
- **137 — Filed arc epilogue and replay intent:** After High Pass is filed, give the player a calm reason to revisit without undoing the completed-arc feeling.

### C / World feel

- **138 — Front-half tactile identity pass:** Strengthen the first beach-to-coastal half with memorable physical beats rather than more notebook volume.
- **139 — Forest tactile identity pass:** Make the forest middle feel as memorable as High Pass through place, shelter, moisture, and root/wood relationships.
- **140 — Treeline shelter and exposure pass:** Reinforce Treeline identity below High Pass so the completed proof chapter does not carry all alpine memory alone.
- **141 — Tundra thaw-window payoff pass:** Make Tundra short-season play feel observable and consequential after the late-season north-end pass.
- **142 — Single adjacent-corridor prototype:** Prototype one richer adjacent-pair corridor read without rewriting the whole continuous chain.
- **143 — Map and station travel clarity pass:** Reduce friction between world map, field station, adjacent walking, and route markers now that the alpha arc is closed.

### D / Notebook and content

- **144 — Journal and atlas copy-budget sweep:** Keep the notebook rich but below the handheld text ceiling by pruning, not adding panels.
- **145 — Science source-ledger audit:** Turn science accuracy into a documented alpha gate for all live organisms, landmarks, and relationship claims.
- **146 — Close-look and sketchbook selected refresh:** Refresh only the highest-value visual-authoring surfaces so they support memory, not breadth.
- **147 — Kid readability and input accessibility:** Make controls, focus, copy, and readable pixels friendlier without changing the core handheld identity.
- **148 — Sound, feedback, and subtle juice:** Use small feedback moments to make discoveries and filing feel good without music-system or particle-system sprawl.
- **149 — Alpha content parity and dead-copy prune:** Prune stale promises and align all live content surfaces with the completed alpha arc.

### E / Maintainability

- **150 — Game controller extraction wave:** Reduce the biggest coordinator risk without changing player-facing scope.
- **151 — Overlay render extraction wave:** Continue slimming overlay-render through page-local helpers and screenshot-stable contracts.
- **152 — Field-season-board splitting wave:** Move another chunk of season/route/station composition out of the large board resolver.
- **153 — Save schema and migration hardening:** Protect old saves and review snapshots before alpha feedback creates more states.
- **154 — Performance, bundle, and error hardening:** Make the source-complete alpha build resilient on fresh machines and browsers.

### F / Feedback

- **155 — External playtest feedback batch one:** Use the completed alpha arc to absorb real feedback without thrashing the architecture.
- **156 — External playtest feedback batch two:** Second feedback pass, focused on repeated observations rather than one-off preferences.
- **157 — Alpha release candidate and post-alpha scope gate:** Package an alpha release candidate and make a disciplined evidence-based decision about the next expansion.

## Lane Treaty

### lane-1: Systems / station / progression / tooling

Owns: runtime state, station surfaces, save safety, validation, packaging, and release tooling.

Avoids: authored science copy, biome geometry density, and route prose unless a packet explicitly calls for a systems seam.

Preferred paths: `src/engine/game.ts`, `src/engine/field-season-board.ts`, `src/engine/overlay-render.ts`, `src/engine/field-station*.ts`, `src/engine/save.ts`, `scripts/`, `src/test/runtime-smoke.test.ts`.

### lane-2: Content / journal / science / copy budgets

Owns: science-safe content, notebook/atlas language, source-ledger coverage, content-quality tests, and kid-readable synthesis.

Avoids: movement geometry, station state machines, and route controller behavior.

Preferred paths: `src/content/`, `src/engine/ecosystem-notes.ts`, `src/engine/observation-prompts.ts`, `src/engine/field-requests.ts copy-only sections`, `src/test/content-quality.test.ts`, `docs/science-source-ledger.md`.

### lane-3: Spatial / traversal / visual-place feel

Owns: world-space readability, traversal beats, environmental silhouettes, screenshot proof, and biome physical memory.

Avoids: route state, copy-heavy notebook changes, station chrome, and save schema changes.

Preferred paths: `src/content/biomes/* spatial bands`, `src/assets/*`, `src/engine/biome-scene-render.ts`, `src/test/*-biome.test.ts`, `output/ browser proofs`.

### lane-4: Route loop / support / replay / full-arc proof

Owns: Route v2 behavior, support differentiation, notebook filing loops, route notices, replay windows, and deterministic route smoke tests.

Avoids: new station pages, broad copy rewrites, raw biome geometry, and new route frameworks.

Preferred paths: `src/engine/field-request-controller.ts`, `src/engine/field-request-state.ts`, `src/engine/field-notices.ts`, `src/engine/field-requests.ts route-structure only`, `src/test/field-request*.test.ts`.

## First Ready Items

- ECO-20260420-scout-326 — L1 scout: Alpha runway setup and review-drop hygiene
- ECO-20260420-scout-327 — L2 scout: Alpha runway setup and review-drop hygiene
- ECO-20260420-scout-328 — L3 scout: Alpha runway setup and review-drop hygiene
- ECO-20260420-scout-329 — L4 scout: Alpha runway setup and review-drop hygiene

## Validation Note

This package is designed to validate on the source-complete repo. In the uploaded review archive, validation still fails before these additions because the archive is missing source and report paths. Packet 130 starts by fixing that packaging/review-drop problem.

## Generated Files

- `.agents/work-queue.md` updated with packet 130-157 queue chains
- `.agents/project-memory.md` updated with alpha-runway strategic priority and lane-collision treaty
- `.agents/packets/130-*.json` through `.agents/packets/157-*.json`
- `docs/reports/2026-04-20-alpha-runway-megapush.md`
- `work-queue.additions-130-157.md` for review-only queue insertion