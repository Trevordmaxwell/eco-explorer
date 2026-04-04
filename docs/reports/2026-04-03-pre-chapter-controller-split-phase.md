# Pre-Chapter Controller Split Phase

## Summary

Before the next big chapter-scale expansion, lane 1 should protect the codebase.

The review called out a real risk:

- `game.ts` is huge
- `overlay-render.ts` is huge
- `field-season-board.ts` is getting large

That is workable now, but it gets riskier every time the season and chapter logic grows.

## Goals

- split the most concentrated coordinator responsibilities before season-three-scale work
- keep behavior stable while reducing future change cost

## Guardrails

- no large product redesign during the split
- preserve saves, route state, and current UI behavior
- prefer targeted domain extraction over broad rewrites
