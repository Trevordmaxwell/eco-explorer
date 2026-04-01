import { describe, expect, it } from 'vitest';

import { beachBiome, coastalScrubBiome, forestBiome, tundraBiome } from '../content/biomes';
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
      note: 'Low bloom on bright shifting dunes.',
      entry: {
        commonName: 'Yellow Sand Verbena',
      },
    });
  });

  it('prefers authored sketchbook notes over the default short fact', () => {
    const save = createNewSaveState('sketchbook-note-seed');
    recordDiscovery(save, beachBiome.entries['sand-dollar-test'], 'beach');
    placeSketchbookEntry(save, beachBiome, 'top-left', 'sand-dollar-test');

    const page = buildSketchbookPageView(
      beachBiome,
      beachBiome.entries,
      save,
    );

    expect(page.slots.find((slot) => slot.slotId === 'top-left')).toMatchObject({
      entryId: 'sand-dollar-test',
      note: 'A pale shore clue washed from sandy shallows.',
    });
  });

  it('surfaces new landmark notes for route-defining forest memory anchors', () => {
    const save = createNewSaveState('sketchbook-forest-landmark-note-seed');
    const entry = forestBiome.entries['root-curtain'];
    recordDiscovery(save, entry, 'forest');
    placeSketchbookEntry(save, forestBiome, 'top-left', 'root-curtain');

    const page = buildSketchbookPageView(
      forestBiome,
      forestBiome.entries,
      save,
    );

    expect(page.slots.find((slot) => slot.slotId === 'top-left')).toMatchObject({
      entryId: 'root-curtain',
      note: 'Dim root shelter catching drips above the cave.',
    });
  });

  it('surfaces the thaw-band note for the new tundra process carrier', () => {
    const save = createNewSaveState('sketchbook-tundra-process-note-seed');
    const entry = tundraBiome.entries.cottongrass;
    recordDiscovery(save, entry, 'tundra');
    placeSketchbookEntry(save, tundraBiome, 'top-left', 'cottongrass');

    const page = buildSketchbookPageView(
      tundraBiome,
      tundraBiome.entries,
      save,
    );

    expect(page.slots.find((slot) => slot.slotId === 'top-left')).toMatchObject({
      entryId: 'cottongrass',
      note: 'White tufts marking a brief wet thaw band.',
    });
  });

  it('surfaces compact forest microhabitat notes for the archive payoff trio', () => {
    const save = createNewSaveState('sketchbook-forest-microhabitat-note-seed');

    recordDiscovery(save, forestBiome.entries['western-hemlock-seedling'], 'forest');
    recordDiscovery(save, forestBiome.entries['old-mans-beard'], 'forest');
    recordDiscovery(save, forestBiome.entries.ensatina, 'forest');

    placeSketchbookEntry(save, forestBiome, 'top-left', 'western-hemlock-seedling');
    placeSketchbookEntry(save, forestBiome, 'top-right', 'old-mans-beard');
    placeSketchbookEntry(save, forestBiome, 'lower-center', 'ensatina');

    const page = buildSketchbookPageView(
      forestBiome,
      forestBiome.entries,
      save,
    );

    expect(page.slots.find((slot) => slot.slotId === 'top-left')).toMatchObject({
      entryId: 'western-hemlock-seedling',
      note: 'Tiny hemlock starting from damp old wood.',
    });
    expect(page.slots.find((slot) => slot.slotId === 'top-right')).toMatchObject({
      entryId: 'old-mans-beard',
      note: 'Pale lichen trailing from the giant crown.',
    });
    expect(page.slots.find((slot) => slot.slotId === 'lower-center')).toMatchObject({
      entryId: 'ensatina',
      note: 'Small salamander hiding in cool wet bark.',
    });
  });
});
