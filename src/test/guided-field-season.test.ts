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
      nextBiomeId: 'forest',
      promptNotice: {
        title: 'NOTEBOOK TASK',
        text: 'Menu to World map, then Forest Trail.',
      },
    });
  });

  it('stays in the forest-study stage until the survey beat is logged', () => {
    const save = createNewSaveState('guided-field-season-study-seed');
    save.completedFieldRequestIds = ['forest-hidden-hollow'];

    expect(resolveGuidedFieldSeasonState(biomeRegistry, save)).toMatchObject({
      stage: 'forest-study',
      stationNote: {
        title: 'MOISTURE CLUES',
      },
    });

    save.completedFieldRequestIds = ['forest-hidden-hollow', 'forest-moisture-holders'];
    expect(resolveGuidedFieldSeasonState(biomeRegistry, save)).toMatchObject({
      stage: 'forest-study',
      stationNote: {
        title: 'FOREST SURVEY',
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
        text: 'Forest Trail is logged. Use the menu for World map, then stop at the field station for Trail Stride.',
      },
      promptNotice: {
        title: 'FIELD STATION',
        text: 'Menu to World map, then Field station.',
      },
    });
  });

  it('points to coastal scrub after trail stride is owned and settles after the next visit', () => {
    const save = createNewSaveState('guided-field-season-next-stop-seed');
    save.purchasedUpgradeIds = ['trail-stride'];

    expect(resolveGuidedFieldSeasonState(biomeRegistry, save)).toMatchObject({
      stage: 'next-habitat',
      nextBiomeId: 'coastal-scrub',
      stationNote: {
        title: 'NEXT STOP',
      },
    });

    save.biomeVisits['coastal-scrub'] = 1;
    expect(resolveGuidedFieldSeasonState(biomeRegistry, save)).toMatchObject({
      stage: 'settled',
      nextBiomeId: null,
      stationNote: {
        title: 'FIELD SEASON OPEN',
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
        text: 'High Pass opens next from Treeline Pass when you are ready.',
      },
      promptNotice: null,
    });
  });
});
