# Direct API Mode Feasibility

Date: 2026-03-29
Owner: main-agent
Related queue item: `ECO-20260328-main-13`

## Summary

The live repo is still a browser-only Vite game. That means the old parked idea of storing an OpenAI API key in local settings and calling the API directly from the field-guide UI is no longer a safe next step.

## Why It Stays Blocked

- The current runtime has no server-side relay, session broker, or secret storage boundary.
- Official OpenAI API authentication guidance says API keys are secrets, should not be exposed in client-side code, and should instead be loaded from environment variables or a server-side key-management path.
- The current parked note for `main-13` assumed a local optional key in settings. In this repo that would mean browser-local storage plus client-side requests, which conflicts with the current official guidance and would force a larger architecture decision than the queue item describes.

Reference:

- OpenAI API authentication docs: [developers.openai.com/api/reference/overview#authentication](https://developers.openai.com/api/reference/overview#authentication)

## Safe Future Path

If direct field-guide mode is revived later, it should start with a minimal server-backed seam:

- keep Clipboard Mode A as the default and fallback
- send only the already-sanitized field-guide context to a server endpoint
- keep `OPENAI_API_KEY` on the server, never in save data or browser settings
- return one short, notebook-toned response that fits the existing handheld overlay budget
- keep prompts, raw responses, and secret-bearing config out of `render_game_to_text()`

## Recommendation

Do not unpark `main-13` into implementation until the project explicitly adds a server-side boundary for OpenAI calls. The better next queue item, if this lane matters again, is a scout or critic pass that defines the smallest acceptable relay architecture and UI budget before any runtime wiring starts.
