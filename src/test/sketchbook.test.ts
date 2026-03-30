import { describe, expect, it } from 'vitest';

import { beachBiome, coastalScrubBiome } from '../content/biomes';
import { createNewSaveState, recordDiscovery } from '../engine/save';
import {
  buildSketchbookPageView,
  clearSketchbookSlot,
  isSketchbookUnlocked,
  placeSketchbookEntry,
} from '../engine/sketchbook';

describe('sketchbook helpers', () => {
  it('unlocks only once a biome is surveyed or complete', () => {
    expect(isSketchbookUnlocked('none')).toBe(false);
    expect(isSketchbookUnlocked('surveyed')).toBe(true);
    expect(isSketchbookUnlocked('complete')).toBe(true);
  });

  it('only places entries that were actually discovered in the current biome', () => {
    const save = createNewSaveState('sketchbook-local-seed');
    recordDiscovery(save, beachBiome.entries['beach-grass'], 'beach');

    expect(
      placeSketchbookEntry(save, coastalScrubBiome, 'top-left', 'beach-grass'),
    ).toBe(false);

    recordDiscovery(save, coastalScrubBiome.entries['beach-grass'], 'coastal-scrub');

    expect(
      placeSketchbookEntry(save, coastalScrubBiome, 'top-left', 'beach-grass'),
    ).toBe(true);
    expect(save.sketchbookPages['coastal-scrub']?.slots['top-left']).toBe('beach-grass');
  });

  it('clears the last placed slot by removing the stored page record', () => {
    const save = createNewSaveState('sketchbook-clear-seed');
    recordDiscovery(save, beachBiome.entries['sand-verbena'], 'beach');
    placeSketchbookEntry(save, beachBiome, 'top-left', 'sand-verbena');

    expect(clearSketchbookSlot(save, 'beach', 'top-left')).toBe(true);
    expect(save.sketchbookPages).toEqual({});
  });

  it('builds page views with entry names for occupied slots', () => {
    const save = createNewSaveState('sketchbook-view-seed');
    recordDiscovery(save, beachBiome.entries['sand-verbena'], 'beach');
    placeSketchbookEntry(save, beachBiome, 'top-left', 'sand-verbena');

    const page = buildSketchbookPageView(
      beachBiome,
      beachBiome.entries,
      save,
    );

    expect(page.slots.find((slot) => slot.slotId === 'top-left')).toMatchObject({
      entryId: 'sand-verbena',
      entry: {
        commonName: 'Yellow Sand Verbena',
      },
    });
  });
});
