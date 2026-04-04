import { describe, expect, it } from 'vitest';

import { biomeRegistry } from '../content/biomes';
import { forestBiome } from '../content/biomes/forest';
import { resolveGuidedFieldSeasonState } from '../engine/guided-field-season';
import { createNewSaveState, recordDiscovery } from '../engine/save';

describe('guided field season', () => {
  it('starts with a forest-directed notebook task on a fresh save', () => {
    const save = createNewSaveState('guided-field-season-seed');

    expect(resolveGuidedFieldSeasonState(biomeRegistry, save)).toMatchObject({
      stage: 'starter',
      nextBiomeId: 'beach',
      stationNote: {
        title: 'FIRST FIELD SEASON',
        text: 'Start with Shore Shelter on Sunny Beach, then carry shelter inland through Hidden Hollow before returning to the field station.',
      },
      promptNotice: {
        title: 'NOTEBOOK TASK',
        text: 'Shore Shelter first. Stay on Sunny Beach and log dune grass to wrack line.',
      },
    });
  });

  it('points to Hidden Hollow once Shore Shelter is logged', () => {
    const save = createNewSaveState('guided-field-season-hidden-hollow-seed');
    save.completedFieldRequestIds = ['beach-shore-shelter'];

    expect(resolveGuidedFieldSeasonState(biomeRegistry, save)).toMatchObject({
      stage: 'starter',
      nextBiomeId: 'forest',
      stationNote: {
        title: 'HIDDEN HOLLOW',
        text: 'Hidden Hollow is next in Forest Trail. Follow shelter inland and confirm the seep stone.',
      },
      promptNotice: {
        title: 'NOTEBOOK TASK',
        text: 'World map to Forest Trail. Hidden Hollow is next.',
      },
    });
  });

  it('stays in the forest-study stage until the survey beat is logged', () => {
    const save = createNewSaveState('guided-field-season-study-seed');
    save.completedFieldRequestIds = ['forest-hidden-hollow'];

    expect(resolveGuidedFieldSeasonState(biomeRegistry, save)).toMatchObject({
      stage: 'forest-study',
      stationNote: {
        title: 'MOISTURE HOLDERS',
        text: 'Moisture Holders is next in Root Hollow. Compare one shelter, one ground, and one living clue before heading back.',
      },
    });

    save.completedFieldRequestIds = ['forest-hidden-hollow', 'forest-moisture-holders'];
    expect(resolveGuidedFieldSeasonState(biomeRegistry, save)).toMatchObject({
      stage: 'forest-study',
      stationNote: {
        title: 'FOREST SURVEY',
        text: 'Forest Survey is next. Stay with Forest Trail a little longer and log four clues before heading back.',
      },
    });
  });

  it('switches to station-return after the forest survey beat', () => {
    const save = createNewSaveState('guided-field-season-station-seed');
    save.completedFieldRequestIds = [
      'forest-hidden-hollow',
      'forest-moisture-holders',
      'forest-survey-slice',
    ];

    for (const entryId of ['banana-slug', 'sword-fern', 'redwood-sorrel', 'fir-cone']) {
      recordDiscovery(save, forestBiome.entries[entryId], 'forest');
    }

    expect(resolveGuidedFieldSeasonState(biomeRegistry, save)).toMatchObject({
      stage: 'station-return',
      stationNote: {
        title: 'RETURN TO STATION',
        text: 'Shore Shelter, Hidden Hollow, and Forest Survey logged. Field station next for Trail Stride.',
      },
      promptNotice: {
        title: 'FIELD STATION',
        text: 'Field station next for Trail Stride.',
      },
    });
  });

  it('points through the coastal opener and inland second-act chapter ladder', () => {
    const save = createNewSaveState('guided-field-season-next-stop-seed');
    save.purchasedUpgradeIds = ['trail-stride'];

    expect(resolveGuidedFieldSeasonState(biomeRegistry, save)).toMatchObject({
      stage: 'next-habitat',
      nextBiomeId: 'coastal-scrub',
      stationNote: {
        title: 'NEXT STOP',
        text: 'Open To Shelter is next in Coastal Scrub. Walk open bloom to shore pine to edge log.',
      },
      promptNotice: {
        title: 'NEXT STOP',
        text: 'Open To Shelter next. Follow open bloom to edge log.',
      },
    });

    save.biomeVisits['coastal-scrub'] = 1;
    expect(resolveGuidedFieldSeasonState(biomeRegistry, save)).toMatchObject({
      stage: 'settled',
      nextBiomeId: null,
      stationNote: {
        title: 'FIELD SEASON OPEN',
        text: 'Shore Shelter, Hidden Hollow, and Open To Shelter now read like one coast-to-forest chapter.',
      },
    });

    save.completedFieldRequestIds = ['coastal-edge-moisture'];
    expect(resolveGuidedFieldSeasonState(biomeRegistry, save)).toMatchObject({
      stage: 'settled',
      nextBiomeId: 'treeline',
      stationNote: {
        title: 'STONE SHELTER',
        text: 'Stone Shelter is next at Treeline Pass. Read bent cover, stone break, and lee life before the thaw edge.',
      },
      promptNotice: {
        title: 'STONE SHELTER',
        text: 'Treeline Pass next. Read Stone Shelter from bent cover to lee life.',
      },
    });

    save.completedFieldRequestIds = ['coastal-edge-moisture', 'treeline-stone-shelter'];
    expect(resolveGuidedFieldSeasonState(biomeRegistry, save)).toMatchObject({
      stage: 'settled',
      nextBiomeId: 'tundra',
      stationNote: {
        title: 'THAW WINDOW',
        text: 'Thaw Window is next in Tundra Reach. Follow first bloom, wet tuft, and brief fruit through the brief thaw.',
      },
      promptNotice: {
        title: 'THAW WINDOW',
        text: 'Tundra Reach next. Follow Thaw Window from first bloom to brief fruit.',
      },
    });

    save.completedFieldRequestIds = ['coastal-edge-moisture', 'treeline-stone-shelter', 'tundra-short-season'];
    expect(resolveGuidedFieldSeasonState(biomeRegistry, save)).toMatchObject({
      stage: 'settled',
      nextBiomeId: 'tundra',
      stationNote: {
        title: 'TUNDRA SURVEY',
        text: 'Tundra Survey closes the inland chapter. Stay in Tundra Reach and finish the broader fieldwork before turning downslope.',
      },
      promptNotice: {
        title: 'TUNDRA SURVEY',
        text: 'Stay in Tundra Reach. Finish Tundra Survey before the route turns back downslope.',
      },
    });
  });

  it('turns the filed season into a calm next-field-season state', () => {
    const save = createNewSaveState('guided-field-season-next-season-seed');
    save.completedFieldRequestIds = ['forest-expedition-upper-run', 'forest-season-threads'];

    expect(resolveGuidedFieldSeasonState(biomeRegistry, save)).toMatchObject({
      stage: 'next-season-open',
      nextBiomeId: 'treeline',
      stationNote: {
        title: 'NEXT FIELD SEASON',
        text: 'High Pass starts at Treeline Pass when you are ready.',
      },
      promptNotice: null,
    });
  });

  it('holds one return-to-station close beat after season threads are logged', () => {
    const save = createNewSaveState('guided-field-season-close-return-seed');
    save.completedFieldRequestIds = ['forest-expedition-upper-run', 'forest-season-threads'];
    save.seasonCloseReturnPending = true;

    expect(resolveGuidedFieldSeasonState(biomeRegistry, save)).toMatchObject({
      stage: 'season-close-return',
      nextBiomeId: null,
      stationNote: {
        title: 'RETURN TO STATION',
        text: 'Season Threads logged. Return to the field station for a calm season close.',
      },
      promptNotice: {
        title: 'FIELD STATION',
        text: 'Season Threads logged. Field station next.',
      },
    });
  });
});
