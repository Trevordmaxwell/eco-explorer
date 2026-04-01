# 2026-03-31 Second-Season Opening Review

## Scope

Review `ECO-20260331-main-123` in packet `040` and decide whether the new second-season opening is clear, compact, and calm enough to keep moving.

## Verdict

No blocking issue.

The core opener now works the right way:

- the archived season no longer feels like a dead end
- the station defaults to `SEASON -> EXPEDITION`
- `Enter` on the logged `ROOT HOLLOW` card hands off straight into the `Treeline Pass` / `High Pass` map focus
- selected `Route Marker` support points to that same node

That is the singular, reuse-the-existing-seams outcome this wave wanted.

## What Landed Well

### 1. The opener is now singular instead of hidden

The strongest improvement is simple: the player no longer has to guess that the expedition tab contains the real next-season cue.

In the seeded archived-season state, the field station now opens directly on the logged expedition card with:

- `NEXT FIELD SEASON`
- `High Pass opens the next field season.`
- `Take the High Pass next.`

That keeps the season-two pull compact and legible.

### 2. The map handoff feels authored without a new planner shell

The `Enter` handoff from the logged expedition card now lands on the world map focused on `treeline`, and the existing origin/footer framing still keeps the location readable.

That means the change adds momentum without widening the UI model.

### 3. Route Marker now reinforces the same destination

After the archive state is live, enabling `Route Marker` correctly points at `treeline` instead of going quiet.

That keeps the support slot aligned with the same next outing and avoids splitting guidance across two destinations.

## Follow-On Watch Item

### The archive routes tab still carries stale season-close language

This is not a blocker for `main-123`, because the default opener is now the expedition tab and that path is clear.

But once the player flips left to `SEASON -> ROUTES`, the archive-facing surfaces still talk like the season-close step has not happened yet:

- `fieldStation.atlas.note` still resolves to `Next: file the season at the station.`
- the logged edge-line board still says `Return to the field station for a calm season close.`

In the seeded browser capture at `output/lane-1-main-123-browser/routes-archive-page.png`, that leaves the archive tab feeling one step behind the new opener.

This is the right thing for the next lane-1 follow-on to tighten while it improves active-outing rediscoverability across station, journal, and map surfaces.

## Verification Used

- focused `guided-field-season`, `field-season-board`, `world-map`, and targeted `runtime-smoke` coverage already landed green for `main-123`
- `npm run build`
- `npm run validate:agents`
- required web-game client pass in `output/lane-1-main-123-client/`
- seeded browser artifacts in `output/lane-1-main-123-browser/`
- zero captured browser console errors

## Queue Recommendation

- close `ECO-20260331-critic-96`
- promote `ECO-20260331-scout-86` to `READY`
- let the scout follow-on target the stale archive/routes-page guidance as part of the broader active-route discoverability pass
