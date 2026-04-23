# Alpha Playtest Kit

Use this kit to run the current Eco Explorer alpha with a child player and one adult observer. The goal is not to prove the game is finished. The goal is to record what players understand, remember, enjoy, and struggle with in the completed five-biome alpha arc.

Keep sessions warm, short, and repeatable. Do not collect identifying child data in this repo.

## Session Shape

Run `6-10` sessions when possible. A good session is `20-35` minutes, or one focused slice if the player is younger or time is tight.

Recommended slices:

| Slice | Start State | Best For |
| --- | --- | --- |
| Fresh start | New save | First purpose, controls, beach opener, first station return |
| Station return | `station-return` snapshot | Field station, support choice, route launch clarity |
| Root Hollow / season close | `season-close-return` snapshot | Expedition memory, season closure, return-to-station clarity |
| High Pass active | `high-pass-active` snapshot | High Pass route, route support, active outing clarity |
| High Pass filed | `high-pass-filed` snapshot | Post-filed settling, replay labels, whether the arc feels complete |

Do not try to force every player through every slice. It is better to capture one clean observed slice than to rush the whole arc.

## Materials

- A verified alpha RC source archive, or the local repo with dependencies installed.
- A browser window with the game open.
- The observer checklist in [playtest-comprehension-rubric.md](/Users/trevormaxwell/Desktop/game/docs/playtest-comprehension-rubric.md).
- Optional: a paper note sheet or a local text file outside the repo for raw notes.

Privacy rule: record only session labels such as `Session 01`, broad age band, and observer notes. Do not record a child's full name, school, voice, face, contact info, or other identifying details in this repo.

## Run The Alpha

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
const snapshot = snapshots.find(({ id }) => id === 'high-pass-active');
localStorage.setItem(snapshot.localStorageKey, snapshot.localStorageValue);
location.reload();
```

Replace `high-pass-active` with any snapshot id in [save-snapshot-states.md](/Users/trevormaxwell/Desktop/game/docs/save-snapshot-states.md).

Useful packet `159` snapshot ids:

- `first-session`
- `station-return`
- `season-close-return`
- `high-pass-active`
- `high-pass-ready-to-file`
- `high-pass-filed`

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

Record short notes in four lanes.

| Lane | Watch For | Evidence To Capture |
| --- | --- | --- |
| lane 1 | Run/install issues, save reset trouble, station return, map/station state changes | Exact moment, command used, error text, whether reload fixed it |
| lane 2 | Science comprehension, reading load, child explanation of ecosystem relationships | Player's own words, misunderstood terms, lines they reread |
| lane 3 | Place memory, spatial hesitation, visual clutter, traversal readability | Where they paused, what place they named later, what hid the player or clue |
| lane 4 | Active route, notebook-ready, filed state, support choice, replay motivation | Whether they knew the current goal, when to return, what support did, whether filed meant settled |

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
# Alpha Playtest Session

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

## Route And Support Notes

- Active goal clarity:
- Notebook-ready / return clarity:
- Filed-state clarity:
- Support choice clarity:
- Motivation or replay note:

## Spatial Notes

- Place remembered:
- Place missed or confused:
- Traversal hesitation:
- Visual overlap or readability issue:

## Follow-Up

- Strongest win:
- Most repeated confusion:
- Science concern:
- One thing to leave alone:
```

## Packet 160 Handoff

After `6-10` sessions, packet `160` should triage repeated patterns into one of these decisions:

- `harden alpha`
- `onboarding pass`
- `Source to Shore beta`
- `new direction needed`

Do not start Source to Shore implementation from one exciting comment. Promote it only if the alpha arc is understandable, motivating, and stable across repeated sessions.
