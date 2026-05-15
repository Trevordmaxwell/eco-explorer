# RC Playtest Kit

Use this kit to run the current Eco Explorer release-candidate build with a child player and one adult observer. The goal is not to prove the game is finished. The goal is to record what players understand, remember, enjoy, and struggle with across the filed High Pass alpha arc and the current Source to Shore beta arc.

Keep sessions warm, short, and repeatable. Do not collect identifying child data in this repo.

## Session Shape

Run `6-10` sessions when possible. A good session is `20-35` minutes, or one focused slice if the player is younger or time is tight.

Recommended slices:

| Slice | Start State | Best For |
| --- | --- | --- |
| Fresh start | New save or `first-session` | First purpose, controls, beach opener, first station return |
| Station return | `station-return` | Field station, support choice, route launch clarity |
| Root Hollow / season close | `season-close-return` | Expedition memory, season closure, return-to-station clarity |
| High Pass active | `high-pass-active` | High Pass route, route support, active outing clarity |
| High Pass filed | `high-pass-filed` | Post-filed settling, replay labels, whether the alpha arc feels complete |
| Source Shelter active | `source-to-shore-active` | Source to Shore opening, Treeline source memory, beta route-board clarity |
| Forest Release active | `source-to-shore-filed` | Downstream handoff from Source Shelter into Forest Trail |
| Dune Catch active | `source-to-shore-forest-release-filed` | Coastward handoff from Forest Release into Coastal Scrub |
| Dune Catch closure | `source-to-shore-dune-catch-ready-to-file` or `source-to-shore-dune-catch-filed` | Notebook-ready return, filed Source to Shore closure, no-replay settled state |

Do not try to force every player through every slice. It is better to capture one clean observed slice than to rush the whole arc.

## Materials

- A verified RC source archive, or the local repo with dependencies installed.
- A browser window with the game open.
- The observer checklist in [playtest-comprehension-rubric.md](/Users/trevormaxwell/Desktop/game/docs/playtest-comprehension-rubric.md).
- Optional: a paper note sheet or a local text file outside the repo for raw notes.

Privacy rule: record only session labels such as `Session 01`, broad age band, and observer notes. Do not record a child's full name, school, voice, face, contact info, or other identifying details in this repo.

## Run The Current RC

Preferred RC proof before sharing:

```bash
npm run alpha:rc
```

Local observer run:

```bash
npm install
npm run dev
```

Open the local URL shown by the dev server. If an observer is using a verified extracted review drop instead of the live repo, use:

```bash
npm ci
npm run build
npm run preview
```

Before the child starts, confirm the title screen opens, keyboard input works, and the game is not showing a browser console error.

## Save Setup

For a fresh session, clear the local save from the browser console:

```js
localStorage.removeItem('eco-explorer-save-v1');
location.reload();
```

For a focused slice, open the game once, then paste this in the browser console:

```js
const snapshots = JSON.parse(window.get_debug_save_snapshots()).snapshots;
const snapshot = snapshots.find(({ id }) => id === 'source-to-shore-active');
localStorage.setItem(snapshot.localStorageKey, snapshot.localStorageValue);
location.reload();
```

Replace `source-to-shore-active` with any snapshot id in [save-snapshot-states.md](/Users/trevormaxwell/Desktop/game/docs/save-snapshot-states.md).

Useful current snapshot ids:

- `first-session`
- `forest-moisture-holders`
- `station-return`
- `front-half-open-to-shelter`
- `treeline-stone-shelter`
- `tundra-thaw-window`
- `season-close-return`
- `high-pass-active`
- `high-pass-ready-to-file`
- `high-pass-filed`
- `source-to-shore-active`
- `source-to-shore-ready-to-file`
- `source-to-shore-filed`
- `source-to-shore-forest-release-ready-to-file`
- `source-to-shore-forest-release-filed`
- `source-to-shore-dune-catch-ready-to-file`
- `source-to-shore-dune-catch-filed`

## Observer Ground Rules

- Tell the player: "Please explore, notice things, and say what you are wondering about. There are no wrong answers."
- Let the player try first. If they pause, wait a few seconds before nudging.
- Use this nudge ladder:
  1. Ask what they think the game wants next.
  2. Ask what on-screen clue they notice.
  3. Remind them of a control only if needed.
  4. Show the action only after repeated confusion.
- Mark every adult nudge in the notes.
- Do not turn feature ideas into approved work during the session. Park them until repeated evidence appears.

## What To Watch

Record short notes in two active lanes.

| Lane | Watch For | Evidence To Capture |
| --- | --- | --- |
| lane 1 | Run/install issues, save reset trouble, station return, map/station state changes, active routes, notebook-ready return, filed state, support choice, replay motivation | Exact moment, command used, error text, snapshot id, last player action, whether reload fixed it |
| lane 2 | Science comprehension, reading load, journal/atlas payoff, place memory, visual clutter, traversal readability, close-look or sketchbook curiosity | Player's own words, misunderstood terms, lines they reread, where they paused, what place they named later, what hid the player or clue |

## Crash Or Console Checklist

If something breaks:

1. Note the slice and snapshot id.
2. Note the last player action.
3. Copy any browser console error text.
4. Record whether a page reload recovers the session.
5. If the save seems broken, try a fresh save before continuing.

Do not edit source or hand-modify save JSON during an observed session.

## Session Note Template

```md
# RC Playtest Session

- Session label:
- Date:
- Broad age band:
- Observer:
- Build or archive:
- Slice / snapshot:
- Duration:

## Setup Notes

- Install/run:
- Save setup:
- Console or crash issues:

## Green / Yellow / Red Summary

- Green:
- Yellow:
- Red:

## Child's Words

- Ecosystem relationship they explained:
- Place they remembered:
- What they wanted to show someone:
- What made them curious:

## Observer Notes

| Moment | What happened | Triage | Likely lane |
| --- | --- | --- | --- |
|  |  |  |  |

## Lane 1 Playability Notes

- Active goal clarity:
- Notebook-ready / return clarity:
- Filed-state clarity:
- Station, map, route, support, or replay clarity:
- Save, install, crash, or console issue:

## Lane 2 World And Science Notes

- Ecosystem relationship understood:
- Science term or relationship missed:
- Place remembered:
- Place missed or confused:
- Traversal hesitation or visual overlap:
- Journal, atlas, close-look, or sketchbook payoff:
- Reading load:

## Follow-Up

- Strongest win:
- Most repeated confusion:
- Science concern:
- One thing to leave alone:
- Possible lane-1 follow-up:
- Possible lane-2 follow-up:
```

## Post-Session Feedback Triage

After `6-10` sessions, synthesize repeated patterns into the smallest next decision. Useful buckets are:

- `ready for broader observed sessions`
- `fix a playability blocker`
- `tighten observer or comprehension docs`
- `queue a scoped Source to Shore follow-up`
- `new director decision needed`

Do not start Source to Shore expansion, old external-feedback packet tails, or a new feature from one exciting comment. Promote new work only from repeated evidence, a concrete science misunderstanding, a repeated readability friction, or a clear current-build blocker.
