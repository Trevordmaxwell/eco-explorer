import { describe, expect, it } from 'vitest';

import { beachBiome, coastalScrubBiome, forestBiome, treelineBiome, tundraBiome } from '../content/biomes';
import { resolveEcosystemNoteForEntry } from '../engine/ecosystem-notes';
import { resolveObservationPrompt } from '../engine/observation-prompts';

describe('observation prompt resolution', () => {
  it('selects a weather-aware authored seed when the current habitat evidence matches', () => {
    const prompt = resolveObservationPrompt({
      biome: beachBiome,
      zoneId: 'dune-edge',
      nearbyDiscoveredEntryIds: ['beach-grass'],
      worldState: {
        worldAge: 2,
        dayPart: 'dusk',
        weather: 'marine-haze',
        phenologyPhase: 'early',
      },
    });

    expect(prompt).toMatchObject({
      id: 'beach-soft-wind',
      family: 'shelter',
      source: 'seed',
      text: 'Which plants still hold the sand in this soft coast wind?',
    });
    expect(prompt?.evidenceKey).toContain('marine-haze');
  });

  it('prefers an unlocked authored seed before falling back to the ecosystem-note cue', () => {
    const ecosystemNote = resolveEcosystemNoteForEntry(
      beachBiome,
      'beach-grass',
      ['beach-grass', 'driftwood-log'],
    );

    const prompt = resolveObservationPrompt({
      biome: beachBiome,
      zoneId: 'dune-edge',
      nearbyDiscoveredEntryIds: ['beach-grass'],
      selectedEntryId: 'beach-grass',
      ecosystemNote,
      worldState: {
        worldAge: 1,
        dayPart: 'day',
        weather: 'clear',
        phenologyPhase: 'early',
      },
    });

    expect(prompt).toEqual({
      id: 'beach-low-bloom',
      family: 'comparison',
      source: 'seed',
      text: 'Which bloom stays lowest where the wind still hits hard?',
      evidenceKey: 'beach-low-bloom|dune-edge|day|clear|beach-grass',
    });
  });

  it('keeps comparison-family prompts hidden until note-backed or cross-habitat evidence exists', () => {
    const withoutEvidence = resolveObservationPrompt({
      biome: treelineBiome,
      zoneId: 'krummholz-belt',
      nearbyDiscoveredEntryIds: ['mountain-hemlock'],
      selectedEntryId: 'mountain-hemlock',
      worldState: {
        worldAge: 5,
        dayPart: 'dusk',
        weather: 'clear',
        phenologyPhase: 'peak',
      },
    });

    expect(withoutEvidence).toBeNull();

    const ecosystemNote = resolveEcosystemNoteForEntry(
      treelineBiome,
      'mountain-hemlock',
      ['mountain-hemlock', 'krummholz-spruce'],
    );
    const withUnlockedNote = resolveObservationPrompt({
      biome: treelineBiome,
      zoneId: 'krummholz-belt',
      nearbyDiscoveredEntryIds: ['mountain-hemlock'],
      selectedEntryId: 'mountain-hemlock',
      ecosystemNote,
      worldState: {
        worldAge: 5,
        dayPart: 'dusk',
        weather: 'clear',
        phenologyPhase: 'peak',
      },
    });

    expect(withUnlockedNote).toMatchObject({
      id: 'treeline-protected-shapes',
      family: 'comparison',
      source: 'seed',
    });
  });

  it('uses the new dune-bloom comparison seed when coast evidence and comparison support exist', () => {
    const ecosystemNote = resolveEcosystemNoteForEntry(
      beachBiome,
      'sand-verbena',
      ['sand-verbena', 'beach-grass'],
    );

    const prompt = resolveObservationPrompt({
      biome: beachBiome,
      zoneId: 'dune-edge',
      nearbyDiscoveredEntryIds: ['sand-verbena', 'beach-grass'],
      selectedEntryId: 'sand-verbena',
      ecosystemNote,
      comparisonAvailable: true,
      worldState: {
        worldAge: 3,
        dayPart: 'day',
        weather: 'marine-haze',
        phenologyPhase: 'peak',
      },
    });

    expect(prompt).toMatchObject({
      id: 'beach-low-bloom',
      family: 'comparison',
      source: 'seed',
    });
  });

  it('uses the new coastal forest-edge seed when the scrub starts reading wetter', () => {
    const prompt = resolveObservationPrompt({
      biome: coastalScrubBiome,
      zoneId: 'forest-edge',
      nearbyDiscoveredEntryIds: ['sword-fern', 'nurse-log'],
      worldState: {
        worldAge: 4,
        dayPart: 'day',
        weather: 'marine-haze',
        phenologyPhase: 'peak',
      },
    });

    expect(prompt).toMatchObject({
      id: 'coastal-edge-shade',
      family: 'neighbors',
      source: 'seed',
    });
  });

  it('uses the new treeline shelter seed when stone cover and lee-side life are both present', () => {
    const prompt = resolveObservationPrompt({
      biome: treelineBiome,
      zoneId: 'dwarf-shrub',
      nearbyDiscoveredEntryIds: ['frost-heave-boulder', 'hoary-marmot'],
      worldState: {
        worldAge: 5,
        dayPart: 'day',
        weather: 'ridge-wind',
        phenologyPhase: 'peak',
      },
    });

    expect(prompt).toMatchObject({
      id: 'treeline-stone-shelter',
      family: 'shelter',
      source: 'seed',
    });
  });

  it('uses the short-season thaw-edge seed once thaw-edge bloom and tuft clues are present', () => {
    const prompt = resolveObservationPrompt({
      biome: tundraBiome,
      zoneId: 'thaw-skirt',
      nearbyDiscoveredEntryIds: ['purple-saxifrage', 'cottongrass', 'arctic-willow'],
      worldState: {
        worldAge: 5,
        dayPart: 'day',
        weather: 'clear',
        phenologyPhase: 'peak',
      },
    });

    expect(prompt).toMatchObject({
      id: 'tundra-short-season',
      family: 'timing',
      source: 'seed',
      text: 'What here marks the short season at the thaw edge?',
    });
  });

  it('uses the new windbreak-swale shelter seed when runner cover and shrubs are both present', () => {
    const prompt = resolveObservationPrompt({
      biome: coastalScrubBiome,
      zoneId: 'windbreak-swale',
      nearbyDiscoveredEntryIds: ['beach-strawberry', 'pacific-wax-myrtle'],
      worldState: {
        worldAge: 4,
        dayPart: 'day',
        weather: 'marine-haze',
        phenologyPhase: 'peak',
      },
    });

    expect(prompt).toMatchObject({
      id: 'coastal-swale-shelter',
      family: 'shelter',
      source: 'seed',
    });
  });

  it('uses the new forest route-support seed when moist cover still dominates the inland trail', () => {
    const prompt = resolveObservationPrompt({
      biome: forestBiome,
      zoneId: 'creek-bend',
      nearbyDiscoveredEntryIds: ['salmonberry', 'sword-fern'],
      worldState: {
        worldAge: 6,
        dayPart: 'day',
        weather: 'clear',
        phenologyPhase: 'peak',
      },
    });

    expect(prompt).toMatchObject({
      id: 'forest-cover-loosens',
      family: 'shelter',
      source: 'seed',
    });
  });

  it('uses the new root-hollow moisture seed during the expedition climb pocket', () => {
    const prompt = resolveObservationPrompt({
      biome: forestBiome,
      zoneId: 'root-hollow',
      nearbyDiscoveredEntryIds: ['tree-lungwort', 'ensatina'],
      worldState: {
        worldAge: 6,
        dayPart: 'day',
        weather: 'clear',
        phenologyPhase: 'peak',
      },
    });

    expect(prompt).toMatchObject({
      id: 'forest-hollow-moisture',
      family: 'neighbors',
      source: 'seed',
    });
  });

  it('lets the upper-run seed-travel prompt appear in clear daytime conditions', () => {
    const prompt = resolveObservationPrompt({
      biome: forestBiome,
      zoneId: 'log-run',
      nearbyDiscoveredEntryIds: ['fir-cone'],
      worldState: {
        worldAge: 6,
        dayPart: 'day',
        weather: 'clear',
        phenologyPhase: 'peak',
      },
    });

    expect(prompt).toMatchObject({
      id: 'forest-seed-travel',
      family: 'timing',
      source: 'seed',
    });
  });

  it('uses the new forest middle-edge comparison seed once route evidence is unlocked', () => {
    const ecosystemNote = resolveEcosystemNoteForEntry(
      forestBiome,
      'salmonberry',
      ['salmonberry', 'sword-fern', 'redwood-sorrel'],
    );

    const prompt = resolveObservationPrompt({
      biome: forestBiome,
      zoneId: 'creek-bend',
      nearbyDiscoveredEntryIds: ['salmonberry', 'sword-fern', 'redwood-sorrel'],
      selectedEntryId: 'salmonberry',
      ecosystemNote,
      worldState: {
        worldAge: 6,
        dayPart: 'day',
        weather: 'clear',
        phenologyPhase: 'peak',
      },
    });

    expect(prompt).toMatchObject({
      id: 'forest-middle-edge',
      family: 'comparison',
      source: 'seed',
    });
  });

  it('uses the new treeline fell-bloom comparison seed once local note context is unlocked', () => {
    const ecosystemNote = resolveEcosystemNoteForEntry(
      treelineBiome,
      'mountain-avens',
      ['mountain-avens', 'moss-campion'],
    );

    const prompt = resolveObservationPrompt({
      biome: treelineBiome,
      zoneId: 'lichen-fell',
      nearbyDiscoveredEntryIds: ['mountain-avens', 'moss-campion'],
      selectedEntryId: 'mountain-avens',
      ecosystemNote,
      worldState: {
        worldAge: 6,
        dayPart: 'day',
        weather: 'ridge-wind',
        phenologyPhase: 'peak',
      },
    });

    expect(prompt).toMatchObject({
      id: 'treeline-fell-bloom',
      family: 'comparison',
      source: 'seed',
    });
  });

  it('uses the new tundra thaw-timing seed once ridge flower evidence is present', () => {
    const prompt = resolveObservationPrompt({
      biome: tundraBiome,
      zoneId: 'frost-ridge',
      nearbyDiscoveredEntryIds: ['mountain-avens', 'woolly-lousewort'],
      worldState: {
        worldAge: 6,
        dayPart: 'day',
        weather: 'light-flurry',
        phenologyPhase: 'peak',
      },
    });

    expect(prompt).toMatchObject({
      id: 'tundra-brief-thaw',
      family: 'timing',
      source: 'seed',
    });
  });

  it('uses the new tundra low-shelter seed once open-ground cover starts reading calmer', () => {
    const prompt = resolveObservationPrompt({
      biome: tundraBiome,
      zoneId: 'wind-bluff',
      nearbyDiscoveredEntryIds: ['arctic-willow', 'purple-saxifrage'],
      worldState: {
        worldAge: 6,
        dayPart: 'day',
        weather: 'light-flurry',
        phenologyPhase: 'peak',
      },
    });

    expect(prompt).toMatchObject({
      id: 'tundra-low-shelter',
      family: 'shelter',
      source: 'seed',
    });
  });
});
