# Steady Beta Full-Arc Signoff Handoff

Date: 2026-04-28
Role: scout-agent
Lane: lane-1
Packet: `.agents/packets/175-steady-beta-full-arc-signoff.json`

## Gate Status

The final signoff checklist is ready, but the signoff implementation is not ready to run yet.

Clean gates so far:

- Packet `168`: steady beta surface triage
- Packet `169`: Source to Shore station container

Still required before promoting `ECO-20260428-main-456`:

- Packet `170`: Source to Shore route-flow consolidation, through `ECO-20260428-critic-451`
- Packet `171`: route catalog extraction, through `ECO-20260428-critic-452`
- Packet `172`: game coordinator controller split, through `ECO-20260428-critic-453`
- Packet `173`: Source to Shore filed-memory payoff, through `ECO-20260428-critic-454`
- Packet `174`: Source to Shore spatial playthrough polish, through `ECO-20260428-critic-455`

Do not promote `ECO-20260428-main-456` until all of those are clean.

## Required End-To-End Proof Path

Use the existing debug-save snapshots as the spine. The final report should prove each state through station, journal, atlas, map, support, and debug surfaces where applicable.

1. `high-pass-filed`
   - Station opens to `SEASON -> ROUTES`.
   - Routes board is `SOURCE TO SHORE`, active `Source Shelter`, three beats only.
   - Archive strip and atlas preserve first-season history.
   - Journal shows `source-to-shore-source-shelter`.
   - World map focuses Treeline/Source Shelter when appropriate.
   - Route-marker support, when selected, points to Treeline and does not imply extra breadth.
2. `source-to-shore-ready-to-file`
   - Station shows `NOTEBOOK READY` for Source Shelter.
   - Route marker and active outing target are calm while filing is pending.
   - One station action files the note with the expected notice text.
3. `source-to-shore-filed`
   - Source Shelter is done, Forest Release is active, Dune Catch is upcoming.
   - Station, journal, atlas, and world map all point to Forest Trail / Forest Release.
4. `source-to-shore-forest-release-ready-to-file`
   - Station filing state is ready for Forest Release.
   - Map/journal/support states remain consistent with ready-to-file behavior.
5. `source-to-shore-forest-release-filed`
   - Source Shelter and Forest Release are done, Dune Catch is active.
   - Station, journal, atlas, and world map all point to Coastal Scrub / Dune Catch.
6. `source-to-shore-dune-catch-ready-to-file`
   - Station filing state is ready for Dune Catch.
   - No hidden fourth beat appears.
7. `source-to-shore-dune-catch-filed`
   - Source to Shore is filed.
   - All three beats are done.
   - No active outing, route marker, or journal task remains.
   - Filed atlas/payoff copy reinforces high source -> forest release -> coastal catch.
   - Revisit memory surfaces stay quiet, existing, and science-safe.

## Required Verification

Run these after packets `170` through `174` are complete:

```bash
npm run validate:agents
npm test -- --run src/test/field-season-board.test.ts src/test/field-requests.test.ts src/test/field-request-controller.test.ts src/test/runtime-smoke.test.ts src/test/save-snapshots.test.ts -t 'Source to Shore|High Pass|Source Shelter|Forest Release|Dune Catch|route-marker|journal|debug save snapshots|field station'
npm test
npm run science:check
npm run build
```

If those pass and no blocker remains, run the release-style check:

```bash
npm run alpha:rc
```

`npm run alpha:rc` already runs agent validation, science check, full tests, build, review-drop packing, and review-drop verification. Record the archive path that it prints.

## Required Browser Proof

Capture fresh native `256x160` browser proof after the final dependent changes land. Use a new folder such as:

- `output/lane-1-main-456-full-arc/`

Minimum proof set:

- post-High-Pass active Source Shelter station routes board
- Source Shelter ready-to-file station routes board
- filed Source to Shore station routes board
- one world-map frame with route-marker support selected during an active Source to Shore beat
- one final filed world-map frame showing no route-marker/active outing task
- one in-field Source Shelter high-source frame after spatial polish
- one in-field Forest Release frame
- one in-field Coastal Catch frame

Each proof folder should include screenshots, paired `render_game_to_text()` JSON/state captures, and an empty browser-errors file.

## Final Report Shape

`ECO-20260428-main-456` should create:

- `docs/reports/2026-04-28-steady-beta-full-arc-signoff.md`

The report should include:

- gate table for packets `168` through `174`
- exact command results and dates
- `alpha:rc` archive path if run
- browser proof artifact paths
- pass/fail matrix for the seven debug-save states above
- any remaining risks or blockers

If any proof fails, open the smallest explicit queue item needed to fix that blocker. Do not open a broad new beta wave and do not hide the issue in prose.
