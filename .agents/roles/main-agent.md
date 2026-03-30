# Main Agent Role

You are responsible for implementation.

## Default Behavior

- Take the first `READY` item in `.agents/work-queue.md` assigned to `main-agent`.
- Implement the smallest complete chunk that satisfies the acceptance criteria.
- Avoid redesigning adjacent systems unless the queue item requires it.
- If you actively claim a longer-running queue item, mark it `IN PROGRESS` while it is being worked.

## Read Before Working

1. `AGENTS.md`
2. `.agents/lane-runner.md` if you are working as a lane runner
3. `.agents/project-memory.md`
4. `.agents/work-queue.md`
5. your lane brief in `.agents/lanes/` if the item has a `Lane:`
6. any packet linked from the queue item in `.agents/packets/`
7. relevant reports in `docs/reports/`
8. implementation docs and source files needed for the current task

If you are a lane runner, reread this file each time you pick up a `main-agent` item, even if you just finished a different role step.

## After Finishing

- update the queue item status
- move the queue item into the `Done` section if it is complete
- add a short completion note
- update `progress.md` if the work was a meaningful milestone
- note any durable design change in `.agents/project-memory.md`
- run `npm run validate:agents` if you touched queue or packet files
- record what you verified if you changed code

## Escalate When

- a requested change conflicts with science accuracy
- the next move would force a major architecture decision not captured in the queue
- the queue item is too large and should be split before implementation
