# Two-Lane Operating Model

Date: 2026-05-14
Role: director

## Decision

The project is moving from four active implementation lanes to a two-lane model plus a director.

This is a process change, not a product pivot. The existing lane history remains useful, but new active work should route through:

- `lane-1`: playability, systems, station, progression, routes, support, replay, and integration proof
- `lane-2`: world richness, science content, atlas/journal payoff, close-look, sketchbook, spatial readability, vertical traversal, and sub-ecosystem spaces

The director owns priority, gatekeeping, integration judgment, lane-boundary calls, and final sprint sequencing.

## Why

Four lanes were useful for the beta expansion push, but the current work is tightly coupled around a small handheld screen. Route clarity, station density, journal text, spatial cues, and content payoff all meet in the same player experience. Two lanes should keep useful parallelism while reducing coordination overhead and accidental cross-lane edits.

## Active Responsibilities

Lane 1 should ask:

- Is the player clear on what to do next?
- Are station, route, map, journal, support, and replay states coherent together?
- Does the game stay readable at native `256x160`?
- Are route identities, save behavior, and progression gates stable?

Lane 2 should ask:

- Is the world richer, more memorable, and more science-safe?
- Do content additions create real ecosystem understanding instead of label sprawl?
- Are spatial pockets readable, recoverable, and worth exploring?
- Do atlas, sketchbook, close-look, and journal payoffs stay compact?

## Retired Lanes

Former lane 3 work now routes through lane 2.

Former lane 4 work now routes through lane 1.

Old packets, reports, and done queue items may still say lane 3 or lane 4. Treat those as historical labels unless a director explicitly reactivates them.

## Current Gate

Packet `182` is still the gate before packet `192` begins. Lane 1 is currently at the final beta expansion signoff review, `ECO-20260428-critic-489`.

After packet `182` closes, start only two fresh agents:

- lane 1 for handheld playability plus route/station/replay work
- lane 2 for content, science, journal/atlas, close-look, spatial, and vertical work

## Reasoning Effort

- Director: `xhigh`
- Lane 1: `xhigh` while packet `182` or handheld-readability repair is active, otherwise `high`
- Lane 2: `high`

Use `xhigh` for lane 2 only if the task touches shared engine traversal/camera behavior, save schema, station/route surfaces, or a cross-lane blocker.
