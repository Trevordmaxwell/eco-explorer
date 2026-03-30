import { describe, expect, it } from 'vitest';

import { beachBiome } from '../content/biomes/beach';
import { coastalScrubBiome } from '../content/biomes/coastal-scrub';
import { forestBiome } from '../content/biomes/forest';
import { treelineBiome } from '../content/biomes/treeline';
import { tundraBiome } from '../content/biomes/tundra';
import {
  arcticWillowEntry,
  beachGrassEntry,
  crowberryEntry,
  lingonberryEntry,
  mountainAvensEntry,
  nootkaRoseEntry,
  salmonberryEntry,
  sandVerbenaEntry,
  seaRocketEntry,
  swordFernEntry,
} from '../content/shared-entries';

describe('shared entries', () => {
  it('uses one canonical coastal entry source across parent biome and ecotone', () => {
    expect(beachBiome.entries['beach-grass']).toBe(beachGrassEntry);
    expect(coastalScrubBiome.entries['beach-grass']).toBe(beachGrassEntry);

    expect(beachBiome.entries['sand-verbena']).toBe(sandVerbenaEntry);
    expect(coastalScrubBiome.entries['sand-verbena']).toBe(sandVerbenaEntry);

    expect(beachBiome.entries['sea-rocket']).toBe(seaRocketEntry);
    expect(coastalScrubBiome.entries['sea-rocket']).toBe(seaRocketEntry);

    expect(forestBiome.entries['sword-fern']).toBe(swordFernEntry);
    expect(coastalScrubBiome.entries['sword-fern']).toBe(swordFernEntry);

    expect(forestBiome.entries.salmonberry).toBe(salmonberryEntry);
    expect(coastalScrubBiome.entries.salmonberry).toBe(salmonberryEntry);

    expect(forestBiome.entries['nootka-rose']).toBe(nootkaRoseEntry);
    expect(coastalScrubBiome.entries['nootka-rose']).toBe(nootkaRoseEntry);
  });

  it('uses one canonical alpine entry source across parent biome and ecotone', () => {
    expect(tundraBiome.entries['arctic-willow']).toBe(arcticWillowEntry);
    expect(treelineBiome.entries['arctic-willow']).toBe(arcticWillowEntry);

    expect(tundraBiome.entries.crowberry).toBe(crowberryEntry);
    expect(treelineBiome.entries.crowberry).toBe(crowberryEntry);

    expect(tundraBiome.entries['mountain-avens']).toBe(mountainAvensEntry);
    expect(treelineBiome.entries['mountain-avens']).toBe(mountainAvensEntry);

    expect(tundraBiome.entries.lingonberry).toBe(lingonberryEntry);
    expect(treelineBiome.entries.lingonberry).toBe(lingonberryEntry);
  });
});
