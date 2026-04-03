import { describe, expect, it } from 'vitest';

import { buildFieldPartnerNotice, shouldDeliverFieldPartnerNotice } from '../engine/field-partner';

describe('field partner helper', () => {
  it('builds an authored prompt-linked cue from the live biome and prompt family', () => {
    const notice = buildFieldPartnerNotice({
      biomeId: 'coastal-scrub',
      zoneId: 'back-dune',
      worldState: {
        dayPart: 'day',
        weather: 'marine-haze',
      },
      observationPrompt: {
        id: 'coastal-ready-patch',
        family: 'timing',
        text: 'Which patch looks ready for flowers, fruit, or seed here?',
        source: 'seed',
        evidenceKey: 'coastal-ready-patch|back-dune|day|marine-haze|dune-lupine',
      },
      trigger: 'biome-enter',
    });

    expect(notice).toEqual({
      cueId: 'scrub-back-dune-timing',
      text: 'This patch already feels halfway between dune and scrub.',
      family: 'timing',
      source: 'seed',
      trigger: 'biome-enter',
      evidenceKey: 'coastal-ready-patch|back-dune|day|marine-haze|dune-lupine',
      stateKey:
        'coastal-scrub|back-dune|day|marine-haze|coastal-ready-patch|back-dune|day|marine-haze|dune-lupine|scrub-back-dune-timing',
    });
  });

  it('matches note-backed partner cues without falling back to the generic note family', () => {
    const notice = buildFieldPartnerNotice({
      biomeId: 'beach',
      zoneId: 'dune-edge',
      worldState: {
        dayPart: 'day',
        weather: 'marine-haze',
      },
      observationPrompt: {
        id: 'shore-shelter',
        family: 'neighbors',
        text: 'Where looks safer by grass or wood?',
        source: 'ecosystem-note',
        evidenceKey: 'shore-shelter|dune-edge|day|marine-haze',
      },
      trigger: 'discovery',
    });

    expect(notice).toEqual({
      cueId: 'beach-dune-shelter',
      text: 'The first grass line is doing more work than it looks.',
      family: 'shelter',
      source: 'ecosystem-note',
      trigger: 'discovery',
      evidenceKey: 'shore-shelter|dune-edge|day|marine-haze',
      stateKey:
        'beach|dune-edge|day|marine-haze|shore-shelter|dune-edge|day|marine-haze|beach-dune-shelter',
    });
  });

  it('uses the new lee-pocket cue when tucked beach cover becomes the note-backed lens', () => {
    const notice = buildFieldPartnerNotice({
      biomeId: 'beach',
      zoneId: 'lee-pocket',
      worldState: {
        dayPart: 'day',
        weather: 'marine-haze',
      },
      observationPrompt: {
        id: 'lee-pocket-hold',
        family: 'neighbors',
        text: 'Which plants look tucked into calmer sand?',
        source: 'ecosystem-note',
        evidenceKey: 'lee-pocket-hold|lee-pocket|day|marine-haze',
      },
      trigger: 'discovery',
    });

    expect(notice).toEqual({
      cueId: 'beach-lee-pocket-hold',
      text: 'Driftwood keeps this tucked sand calmer.',
      family: 'shelter',
      source: 'ecosystem-note',
      trigger: 'discovery',
      evidenceKey: 'lee-pocket-hold|lee-pocket|day|marine-haze',
      stateKey:
        'beach|lee-pocket|day|marine-haze|lee-pocket-hold|lee-pocket|day|marine-haze|beach-lee-pocket-hold',
    });
  });

  it('builds a no-prompt fallback cue only when the world state is strong enough', () => {
    const notice = buildFieldPartnerNotice({
      biomeId: 'forest',
      zoneId: 'fern-hollow',
      worldState: {
        dayPart: 'dusk',
        weather: 'mist-drip',
      },
      observationPrompt: null,
      trigger: 'state-change',
    });

    expect(notice).toEqual({
      cueId: 'forest-drip',
      text: 'The air here is carrying water almost as much as the ground is.',
      family: 'neighbors',
      source: 'fallback',
      trigger: 'state-change',
      evidenceKey: 'no-prompt',
      stateKey: 'forest|fern-hollow|dusk|mist-drip|no-prompt|forest-drip',
    });
  });

  it('uses the coastal edge-shade cue when the first scrub-made shade prompt is active', () => {
    const notice = buildFieldPartnerNotice({
      biomeId: 'coastal-scrub',
      zoneId: 'forest-edge',
      worldState: {
        dayPart: 'day',
        weather: 'marine-haze',
      },
      observationPrompt: {
        id: 'coastal-edge-shade',
        family: 'neighbors',
        text: 'Where does the scrub start holding forest-like shade?',
        source: 'seed',
        evidenceKey: 'coastal-edge-shade|forest-edge|day|marine-haze|sword-fern,salmonberry',
      },
      trigger: 'state-change',
    });

    expect(notice).toEqual({
      cueId: 'scrub-edge-shade',
      text: 'The first shade here is still scrub-made, not full forest yet.',
      family: 'neighbors',
      source: 'seed',
      trigger: 'state-change',
      evidenceKey: 'coastal-edge-shade|forest-edge|day|marine-haze|sword-fern,salmonberry',
      stateKey:
        'coastal-scrub|forest-edge|day|marine-haze|coastal-edge-shade|forest-edge|day|marine-haze|sword-fern,salmonberry|scrub-edge-shade',
    });
  });

  it('uses the new swale shelter cue when the sheltered middle scrub prompt is active', () => {
    const notice = buildFieldPartnerNotice({
      biomeId: 'coastal-scrub',
      zoneId: 'windbreak-swale',
      worldState: {
        dayPart: 'day',
        weather: 'marine-haze',
      },
      observationPrompt: {
        id: 'coastal-swale-shelter',
        family: 'shelter',
        text: 'Which plants make this swale feel calmer now?',
        source: 'seed',
        evidenceKey: 'coastal-swale-shelter|windbreak-swale|day|marine-haze|beach-strawberry,pacific-wax-myrtle',
      },
      trigger: 'biome-enter',
    });

    expect(notice).toEqual({
      cueId: 'scrub-swale-shelter',
      text: 'This swale turns low cover into shelter.',
      family: 'shelter',
      source: 'seed',
      trigger: 'biome-enter',
      evidenceKey: 'coastal-swale-shelter|windbreak-swale|day|marine-haze|beach-strawberry,pacific-wax-myrtle',
      stateKey:
        'coastal-scrub|windbreak-swale|day|marine-haze|coastal-swale-shelter|windbreak-swale|day|marine-haze|beach-strawberry,pacific-wax-myrtle|scrub-swale-shelter',
    });
  });

  it('uses the new root-hollow cue when bark-held moisture becomes the notebook lens', () => {
    const notice = buildFieldPartnerNotice({
      biomeId: 'forest',
      zoneId: 'root-hollow',
      worldState: {
        dayPart: 'day',
        weather: 'clear',
      },
      observationPrompt: {
        id: 'forest-hollow-moisture',
        family: 'neighbors',
        text: 'What here keeps moisture on bark or stone above the soil?',
        source: 'seed',
        evidenceKey: 'forest-hollow-moisture|root-hollow|day|clear|tree-lungwort',
      },
      trigger: 'state-change',
    });

    expect(notice).toEqual({
      cueId: 'forest-hollow-moisture',
      text: 'The hollow keeps making wet places even above the floor.',
      family: 'neighbors',
      source: 'seed',
      trigger: 'state-change',
      evidenceKey: 'forest-hollow-moisture|root-hollow|day|clear|tree-lungwort',
      stateKey:
        'forest|root-hollow|day|clear|forest-hollow-moisture|root-hollow|day|clear|tree-lungwort|forest-hollow-moisture',
    });
  });

  it('uses the tundra shelter cue when the open-ground prompt is active', () => {
    const notice = buildFieldPartnerNotice({
      biomeId: 'tundra',
      zoneId: 'wind-bluff',
      worldState: {
        dayPart: 'day',
        weather: 'light-flurry',
      },
      observationPrompt: {
        id: 'tundra-low-shelter',
        family: 'shelter',
        text: 'What still makes a calmer pocket close to the ground here?',
        source: 'seed',
        evidenceKey: 'tundra-low-shelter|wind-bluff|day|light-flurry|arctic-willow',
      },
      trigger: 'state-change',
    });

    expect(notice).toEqual({
      cueId: 'tundra-low-shelter',
      text: 'Out here, staying low is almost the whole plan.',
      family: 'shelter',
      source: 'seed',
      trigger: 'state-change',
      evidenceKey: 'tundra-low-shelter|wind-bluff|day|light-flurry|arctic-willow',
      stateKey:
        'tundra|wind-bluff|day|light-flurry|tundra-low-shelter|wind-bluff|day|light-flurry|arctic-willow|tundra-low-shelter',
    });
  });

  it('allows one first line plus one changed follow-up, but blocks repeats, extra biome-enter lines, and cooldown skips', () => {
    expect(
      shouldDeliverFieldPartnerNotice({
        trigger: 'biome-enter',
        deliveredThisVisit: 0,
        lastStateKey: null,
        candidateStateKey: 'first',
        globalCooldownRemainingSeconds: 0,
      }),
    ).toBe(true);

    expect(
      shouldDeliverFieldPartnerNotice({
        trigger: 'biome-enter',
        deliveredThisVisit: 1,
        lastStateKey: 'first',
        candidateStateKey: 'second',
        globalCooldownRemainingSeconds: 0,
      }),
    ).toBe(false);

    expect(
      shouldDeliverFieldPartnerNotice({
        trigger: 'state-change',
        deliveredThisVisit: 1,
        lastStateKey: 'first',
        candidateStateKey: 'second',
        globalCooldownRemainingSeconds: 6,
      }),
    ).toBe(false);

    expect(
      shouldDeliverFieldPartnerNotice({
        trigger: 'discovery',
        deliveredThisVisit: 1,
        lastStateKey: 'first',
        candidateStateKey: 'second',
        globalCooldownRemainingSeconds: 0,
      }),
    ).toBe(true);

    expect(
      shouldDeliverFieldPartnerNotice({
        trigger: 'state-change',
        deliveredThisVisit: 2,
        lastStateKey: 'second',
        candidateStateKey: 'third',
        globalCooldownRemainingSeconds: 0,
      }),
    ).toBe(false);

    expect(
      shouldDeliverFieldPartnerNotice({
        trigger: 'discovery',
        deliveredThisVisit: 1,
        lastStateKey: 'same',
        candidateStateKey: 'same',
        globalCooldownRemainingSeconds: 0,
      }),
    ).toBe(false);
  });
});
