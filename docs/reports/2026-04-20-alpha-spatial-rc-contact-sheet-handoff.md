# Alpha Spatial RC Contact Sheet Handoff

Date: 2026-04-20
Queue: `ECO-20260420-scout-436`
Packet: `.agents/packets/157-alpha-release-candidate-and-scope-gate.json`
Lane: `lane-3`

## Scout Result

Implementation-ready.

Packet `157` asks lane 3 to own final screenshot/contact-sheet proof plus a post-alpha spatial opportunity list. The right RC-sized move is not another geometry pass and not a new committed screenshot system. The source-tracked `docs/alpha-screenshot-proof-manifest.md` already names the representative five-biome contact-sheet recipe, capture rules, pass criteria, state fields, and non-goals. Recent lane-3 proof also gives fresh, clean browser artifacts for the first-session beach objective, the Coastal Scrub `Open To Shelter` opener, and representative seeded spatial frames.

The main pass should therefore create a final lane-3 signoff report and an ignored visual contact sheet artifact, using existing proof screenshots where possible and recapturing only if a required local artifact is missing or clearly stale.

## Evidence

- `docs/alpha-screenshot-proof-manifest.md` has a `Representative Five-Biome Contact Sheet` section covering beach/coast, coastal scrub handoff, forest/Root Hollow, Treeline/High Pass, and tundra relief.
- The manifest quick-path check currently finds all listed existing reference screenshots/state pairs that it names.
- `docs/reports/2026-04-20-alpha-contact-sheet-review.md` already cleared the source-tracked manifest/contact-sheet index as docs-only and free of runtime drift.
- `docs/reports/2026-04-20-spatial-browser-proof-review.md` cleared packet `154` representative browser proof with `20` passing assertions and empty console errors.
- `docs/reports/2026-04-20-spatial-feedback-batch-one-review.md` cleared the first-session beach objective proof.
- `docs/reports/2026-04-20-spatial-feedback-batch-two-review.md` cleared the Coastal Scrub `Open To Shelter` back-dune and windbreak proof.

Useful ignored proof sources already present locally:

- `output/lane-3-main-424-spatial-proof/first-session-beach-field.png`
- `output/lane-3-main-424-spatial-proof/forest-moisture-holders-field.png`
- `output/lane-3-main-424-spatial-proof/high-pass-active-treeline-field.png`
- `output/lane-3-main-424-spatial-proof/tundra-thaw-window-field.png`
- `output/lane-3-main-428-spatial-feedback/first-session-beach-objective.png`
- `output/lane-3-main-432-spatial-feedback/open-to-shelter-back-dune-shelf.png`
- `output/lane-3-main-432-spatial-feedback/open-to-shelter-windbreak-swale.png`

Useful older manifest reference frames are also present under `output/main-*` and `output/web-game/*`; use them only as reference inputs for the ignored contact sheet, not as a new source-tracked baseline.

## Recommended Main Scope

Create:

- `docs/reports/2026-04-20-alpha-spatial-rc-contact-sheet.md`
- ignored artifacts under `output/lane-3-main-436-alpha-contact-sheet/`

The report should include:

- a small table mapping the final RC spatial rows to artifact paths;
- whether each row is fresh proof, current reference proof, or older manifest reference;
- a short verdict on RC readiness for lane-3 spatial readability;
- a compact post-alpha spatial opportunity list, explicitly deferred until after RC.

Suggested contact-sheet rows:

- Beach opener: use the freshest first-session beach objective or beach field proof.
- Coastal Scrub handoff: use `open-to-shelter-back-dune-shelf` and optionally `open-to-shelter-windbreak-swale`.
- Forest / Root Hollow: use existing manifest reference frames for cave/trunk/upper-return if possible; if a quick fresh capture is attempted, keep it optional because packet `154` already noted exact deeper-frame timing can be brittle.
- Treeline / High Pass: use the existing High Pass proof family, prioritizing `stone-shelter`, `rime-brow`, and `talus-hold` references.
- Tundra relief: use the existing `tundra-drift-hold` / `thaw-bench` references or the packet `154` fresh tundra field frame as a fallback.

If building a visual sheet, prefer an ignored one-off HTML/Playwright or browser-local composition under `output/` instead of adding a committed image-processing dependency or source script.

## Post-Alpha Opportunity List

Keep this list short and deferred. Recommended items:

- Add a dedicated post-RC fresh recapture pass for every manifest frame if reviewers need a full visual bundle, because some older beach/corridor/forest references still have state gaps.
- Add debug save snapshots for exact Root Hollow `forest-cave-trunk` and `forest-upper-return` camera bands if repeated screenshot recapture remains brittle.
- Consider lightweight contact-sheet tooling only after the RC, and only if reviewers repeatedly ask for regenerated visual bundles.
- If the next expansion starts, deepen current five-biome spatial memory before opening a new biome: forest cave/canopy and high-country relief remain the strongest lane-3 candidates.

## Non-Goals

- No runtime source changes unless a required proof artifact is missing and a tiny local capture helper is absolutely necessary.
- No new geometry, route objectives, station UI, route/support behavior, save schema, science copy, journal copy, new biome, screenshot baseline system, committed generated images, or new npm dependency.
- Do not run or unblock lane-1 `alpha:rc`; lane 1 owns that gate after cross-lane blockers clear.
- Do not turn older manifest references into hard regression baselines without fresh paired state.

## Suggested Verification

For a report/contact-sheet-only main pass:

```bash
rg -n "Representative Five-Biome Contact Sheet|alpha-spatial|post-alpha|output/lane-3-main-436-alpha-contact-sheet" docs/alpha-screenshot-proof-manifest.md docs/reports/2026-04-20-alpha-spatial-rc-contact-sheet.md
npm run validate:agents
node -e "JSON.parse(require('fs').readFileSync('.agents/packets/157-alpha-release-candidate-and-scope-gate.json','utf8')); console.log('packet 157 ok')"
git diff --check
```

If the main pass performs fresh browser captures, also run the shared web-game client boot against the active production preview and inspect the screenshots visually.
