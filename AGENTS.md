# Agent Operating Guide

This project is set up so new agents can plug in without needing prior chat context.

## Start Here

Read these files in order before doing work:

1. `AGENTS.md`
2. `.agents/project-memory.md`
3. `.agents/work-queue.md`
4. Any packet linked from your queue item in `.agents/packets/`
5. Your role file in `.agents/roles/`
6. `.agents/critic-brief.md` if you are reviewing, refining, or planning
7. The latest relevant report in `docs/reports/`
8. `progress.md`
9. Product and system docs as needed:
   - `docs/architecture.md`
   - `docs/content-authoring.md`
   - `README.md`

## Agent Roles

Current active roles:

- `main-agent`: implements the next approved chunk of work
- `critic-agent`: stress-tests direction, flags risks, and writes review reports
- `scout-agent`: explores, audits, and prepares small next chunks for the queue

Role details live in:

- `.agents/roles/main-agent.md`
- `.agents/roles/critic-agent.md`
- `.agents/roles/scout-agent.md`

## Shared Sources Of Truth

- `.agents/project-memory.md`: durable product and process decisions
- `.agents/work-queue.md`: shared task queue across agents
- `.agents/packets/`: structured handoff packets that add machine-friendly context to queue work
- `.agents/critic-brief.md`: standing critique lens and guardrails
- `docs/reports/`: dated reports and handoff memos
- `progress.md`: chronological project history

## Work Queue Rules

The queue is the main handoff surface between agents.

- The main agent should take the first `READY` item assigned to `main-agent`.
- The scout agent should take the first `READY` item assigned to `scout-agent`, or add new items if it discovers missing work.
- The critic agent should take the first `READY` or `BLOCKED-BY-IMPLEMENTATION` item assigned to `critic-agent`.

When updating the queue:

- Keep entries append-friendly and easy to scan.
- Use a unique ID in the format `ECO-YYYYMMDD-role-##`.
- Keep one owner per queue item.
- Prefer small chunks with clear acceptance criteria.
- Move completed items to the `Done` section instead of deleting them.

Queue items remain the source of truth for priority, owner, and status. Packets add structured context, ordering, and guardrails when a short queue item is not enough.

## Packet Rules

- Store packets in `.agents/packets/`.
- Use filenames in the form `NNN-short-slug.json`.
- Link the packet from every queue item that depends on it.
- Create a packet when work spans multiple queue items, carries important guardrails, or needs to be consumed by another agent system.
- Do not let packets replace the queue. If priority or ownership changes, update `.agents/work-queue.md` first.
- If a packet is superseded, create a new packet and mark the old one as superseded instead of silently repurposing it.

## Required Agent Hygiene

After finishing a task, update the relevant shared surfaces:

- `.agents/work-queue.md`: status, notes, next handoff
- `.agents/project-memory.md`: only if a durable decision changed
- `progress.md`: only for meaningful project milestones
- `docs/reports/`: when a review or decision memo would help future agents

## Current Product Direction

The current direction is:

- make the experience feel like a game-first handheld screen
- reduce outer webpage chrome
- keep guidance and controls inside the in-game UI where possible
- protect science accuracy as a hard gate
- preserve modular content, deterministic hooks, and save behavior

## Fast Prompt For Future Agents

You can point any future agent at the project with:

```text
Read AGENTS.md, then read .agents/project-memory.md and .agents/work-queue.md. Read any packet linked from your queue item in .agents/packets/. Take the next READY item assigned to your role, follow the role guide in .agents/roles, and update the queue and memory when you finish.
```
