import { describe, expect, it } from 'vitest';

import { coastalScrubBiome } from '../content/biomes/coastal-scrub';
import { forestBiome } from '../content/biomes/forest';
import { treelineBiome } from '../content/biomes/treeline';
import { tundraBiome } from '../content/biomes/tundra';
import {
  getActiveHabitatProcessMoments,
  resolveHabitatProcessMomentForEntity,
} from '../engine/habitat-process';

describe('habitat process moments', () => {
  it('keeps coastal sand capture hidden until the habitat has been revisited late enough in the season', () => {
    expect(
      getActiveHabitatProcessMoments(coastalScrubBiome, 1, {
        worldAge: 4,
        dayPart: 'day',
        weather: 'clear',
        phenologyPhase: 'late',
      }),
    ).toEqual([]);

    expect(
      getActiveHabitatProcessMoments(coastalScrubBiome, 3, {
        worldAge: 4,
        dayPart: 'day',
        weather: 'clear',
        phenologyPhase: 'late',
      }).map((moment) => moment.id),
    ).toEqual(['sand-capture']);
  });

  it('only applies the sand-capture moment to the authored coastal entries and zones', () => {
    const worldState = {
      worldAge: 6,
      dayPart: 'day' as const,
      weather: 'clear' as const,
      phenologyPhase: 'late' as const,
    };

    expect(
      resolveHabitatProcessMomentForEntity(
        coastalScrubBiome,
        3,
        worldState,
        'dune-lupine',
        120,
      )?.id,
    ).toBe('sand-capture');
    expect(
      resolveHabitatProcessMomentForEntity(
        coastalScrubBiome,
        3,
        worldState,
        'pacific-wax-myrtle',
        320,
      )?.id,
    ).toBe('sand-capture');
    expect(
      resolveHabitatProcessMomentForEntity(
        coastalScrubBiome,
        3,
        worldState,
        'shore-pine',
        430,
      ),
    ).toBeNull();
  });

  it('activates forest, treeline, and tundra process moments only when revisit and season conditions line up', () => {
    expect(
      getActiveHabitatProcessMoments(forestBiome, 1, {
        worldAge: 6,
        dayPart: 'day',
        weather: 'mist-drip',
        phenologyPhase: 'late',
      }),
    ).toEqual([]);

    expect(
      getActiveHabitatProcessMoments(forestBiome, 2, {
        worldAge: 6,
        dayPart: 'day',
        weather: 'mist-drip',
        phenologyPhase: 'late',
      }).map((moment) => moment.id),
    ).toEqual(['moisture-hold']);

    expect(
      getActiveHabitatProcessMoments(treelineBiome, 2, {
        worldAge: 6,
        dayPart: 'day',
        weather: 'ridge-wind',
        phenologyPhase: 'late',
      }).map((moment) => moment.id),
    ).toEqual(['frost-rime']);

    expect(
      getActiveHabitatProcessMoments(tundraBiome, 2, {
        worldAge: 4,
        dayPart: 'day',
        weather: 'clear',
        phenologyPhase: 'peak',
      }).map((moment) => moment.id),
    ).toEqual(['thaw-fringe']);
  });

  it('only applies inland process moments to the authored entries and zones for each biome', () => {
    const lateForestState = {
      worldAge: 6,
      dayPart: 'day' as const,
      weather: 'mist-drip' as const,
      phenologyPhase: 'late' as const,
    };
    const lateTreelineState = {
      worldAge: 6,
      dayPart: 'day' as const,
      weather: 'ridge-wind' as const,
      phenologyPhase: 'late' as const,
    };
    const peakTundraState = {
      worldAge: 4,
      dayPart: 'day' as const,
      weather: 'clear' as const,
      phenologyPhase: 'peak' as const,
    };

    expect(
      resolveHabitatProcessMomentForEntity(
        forestBiome,
        2,
        lateForestState,
        'sword-fern',
        320,
      )?.id,
    ).toBe('moisture-hold');
    expect(
      resolveHabitatProcessMomentForEntity(
        forestBiome,
        2,
        lateForestState,
        'douglas-fir-sapling',
        80,
      ),
    ).toBeNull();

    expect(
      resolveHabitatProcessMomentForEntity(
        treelineBiome,
        2,
        lateTreelineState,
        'dwarf-birch',
        360,
      )?.id,
    ).toBe('frost-rime');
    expect(
      resolveHabitatProcessMomentForEntity(
        treelineBiome,
        2,
        lateTreelineState,
        'mountain-hemlock',
        80,
      ),
    ).toBeNull();

    expect(
      resolveHabitatProcessMomentForEntity(
        tundraBiome,
        2,
        peakTundraState,
        'purple-saxifrage',
        220,
      )?.id,
    ).toBe('thaw-fringe');
    expect(
      resolveHabitatProcessMomentForEntity(
        tundraBiome,
        2,
        peakTundraState,
        'woolly-lousewort',
        420,
      ),
    ).toBeNull();
  });
});
