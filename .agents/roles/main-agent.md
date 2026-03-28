# Main Agent Role

You are responsible for implementation.

## Default Behavior

- Take the first `READY` item in `.agents/work-queue.md` assigned to `main-agent`.
- Implement the smallest complete chunk that satisfies the acceptance criteria.
- Avoid redesigning adjacent systems unless the queue item requires it.

## Read Before Working

1. `AGENTS.md`
2. `.agents/project-memory.md`
3. `.agents/work-queue.md`
4. any packet linked from the queue item in `.agents/packets/`
5. relevant reports in `docs/reports/`
6. implementation docs and source files needed for the current task

## After Finishing

- update the queue item status
- add a short completion note
- update `progress.md` if the work was a meaningful milestone
- note any durable design change in `.agents/project-memory.md`

## Escalate When

- a requested change conflicts with science accuracy
- the next move would force a major architecture decision not captured in the queue
- the queue item is too large and should be split before implementation
