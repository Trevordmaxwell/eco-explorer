# Packets

Packets are structured handoff artifacts that sit beside the queue.

Use the queue for priority, ownership, and status.
Use packets for machine-friendly context when a queue item needs more than a short title, scope, and acceptance block.

## When To Create A Packet

- a handoff spans multiple queue items
- another agent or queue system will consume the handoff programmatically
- the work has important ordering, guardrails, or file targets that should survive context loss

## File Rules

- Store packets in `.agents/packets/`.
- Use filenames in the form `NNN-short-slug.json`.
- Link the packet from every queue item that depends on it.
- Keep the JSON shallow and easy to parse.

## Minimal Fields

- `packet_id`
- `version`
- `created_at`
- `created_by_role`
- `status`
- `title`
- `summary`
- `queue_refs`
- `execution_order`
- `guardrails`
- `file_targets`

## Lifecycle

- `READY`: safe to consume
- `SUPERSEDED`: replaced by a newer packet
- `DONE`: packet sequence is complete

## Template

```json
{
  "packet_id": "ECO-PACKET-001",
  "version": 1,
  "created_at": "2026-03-27",
  "created_by_role": "scout-agent",
  "status": "READY",
  "title": "Short packet title",
  "summary": "One-paragraph summary of the handoff.",
  "queue_refs": ["ECO-20260327-main-01"],
  "execution_order": [
    {
      "step": 1,
      "queue_id": "ECO-20260327-main-01",
      "goal": "Do the next concrete thing.",
      "why_now": "Explain why this step comes first."
    }
  ],
  "guardrails": ["Keep the queue authoritative."],
  "file_targets": ["src/example.ts"]
}
```
