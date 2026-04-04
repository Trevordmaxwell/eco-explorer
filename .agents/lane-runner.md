# Lane Runner Guide

Use this when one agent is wearing all three hats inside one lane.

## Core Rule

Do not keep rolling forward from short-term memory alone.

Before every new queue item, restart the read chain so you re-enter the right role, lane scope, and packet context.

Also verify the current branch before editing. The active shared branch is `main`; if `git branch --show-current` says otherwise, switch before you start the item unless the user explicitly changed the branch plan.

## Read Chain Before Every Item

1. `AGENTS.md`
2. `.agents/lane-runner.md`
3. `.agents/project-memory.md`
4. `.agents/work-queue.md`
5. verify `git branch --show-current` is `main`
6. your lane brief in `.agents/lanes/`
7. the queue item's packet in `.agents/packets/`, if present
8. the matching role file in `.agents/roles/`
9. `.agents/critic-brief.md` if the item owner is `critic-agent` or the item is review-heavy
10. the latest relevant report in `docs/reports/`
11. any code or docs needed for the actual task

## How To Pick The Next Item

- Work in one lane only.
- Ignore actionable items from other lanes unless explicitly reassigned.
- Walk the queue top to bottom.
- Take the first item in your lane that is actionable for its current status:
  - `READY`
  - `IN PROGRESS` if you already claimed it
  - `BLOCKED-BY-IMPLEMENTATION` only when its implementation dependency has now landed and it is the rightful next critique step

## Role Switching

The queue item's `Owner` decides which hat you wear for that step.

- `main-agent`: implement only the approved chunk
- `critic-agent`: review, stress-test, and decide whether the next gated step can move
- `scout-agent`: prepare findings, packets, and the next chunk without overbuilding

Do not blend the hats at the same time. Finish the current role step, update the shared surfaces, then restart the chain before switching to the next role.

## Promotion Rules

- If you finish a `scout-agent` item and its dependent item is now unblocked, update the queue accordingly.
- If you finish a clean `critic-agent` gate and the queue item explicitly says to promote the next step, you may do so.
- If a dependency is still uncertain, leave the next step blocked and document why.

## Parallel Lane Rules

- One agent should normally own one lane.
- Different lanes should minimize file overlap.
- If your task would cross heavily into another lane's scope, split it, queue it, or escalate instead of freelancing across both lanes.

## Completion Loop

After every item:

- update `.agents/work-queue.md`
- update `.agents/project-memory.md` only if a durable rule changed
- update `progress.md` only for real milestones
- add a report or packet when future agents will need it
- run `npm run validate:agents` after queue or packet edits
- run tests and `npm run build` when runtime code changes

Then restart the read chain before choosing the next item.

## Optional Lane-Clear Push

If you finish the last actionable item in your lane, you may commit and push to `main`, but only if:

- `git branch --show-current` is `main`
- your lane truly has no remaining actionable queue item
- `git status --short` contains only the files you intentionally changed for that lane, or the tree is clean
- there are no unrelated dirty files from another live lane in the same workspace
- you already ran the required verification for the touched files

If any of those checks fail, stop at queue/report updates and leave the push for the coordinator or for a cleaner later turn.
