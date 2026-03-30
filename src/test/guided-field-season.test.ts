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
      },
      promptNotice: {
        title: 'FIELD STATION',
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
});
