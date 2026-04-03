# 2026-04-03 Beach Crest Spacing Fix Review

Reviewed `ECO-20260403-critic-208` against packet `087`, the lane-3 brief, `docs/reports/2026-04-03-beach-crest-spacing-fix-implementation.md`, the focused world-map and runtime-smoke proofs, the shared-client artifact in `output/main-207-client/`, and the deterministic crest proof in `output/main-207-browser/`.

## Result

No blocking issues found.

## What Improved

- The dune-crest reward state now clears the beach map-return radius. In `output/main-207-browser/dune-crest-fixed.json`, the crest state at `x: 268`, `y: 102` has `nearbyTravelTarget: null`, so the new front-half rise reads as a quiet view beat again.
- The beach map-return post still works as a reachable interior anchor. The shorter approach capture in `output/main-207-client/state-0.json` still finds `nearbyTravelTarget.kind = map-return`, so the post remains usable without retaking the crest.
- The lee-pocket and tidepool approach continue to read as distinct follow-on beats, so the beach now holds the intended `dune rise -> lee pocket -> tidepool approach` sequence cleanly.

## Follow-On Read

This fix is narrow enough to close packet `087` cleanly. Lane 3 can promote `ECO-20260402-scout-155` and return to the queued tundra spatial-depth handoff.
