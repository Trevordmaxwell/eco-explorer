import { describe, expect, it } from 'vitest';

import { beachBiome } from '../content/biomes/beach';
import { coastalScrubBiome } from '../content/biomes/coastal-scrub';
import { forestBiome } from '../content/biomes/forest';
import { treelineBiome } from '../content/biomes/treeline';
import { tundraBiome } from '../content/biomes/tundra';
import {
  getActiveHabitatProcessMoments,
  resolveHabitatProcessMomentForEntity,
} from '../engine/habitat-process';
import type { BiomeDefinition, HabitatProcessMoment } from '../engine/types';

const PROCESS_BIOMES = [beachBiome, coastalScrubBiome, forestBiome, treelineBiome, tundraBiome];

function getZoneIdForX(definition: BiomeDefinition, x: number): string | null {
  return definition.terrainRules.zones.find((zone) => x >= zone.start && x <= zone.end)?.id ?? null;
}

function getProcessCarrierZones(
  definition: BiomeDefinition,
  processMoment: HabitatProcessMoment,
): Map<string, Set<string>> {
  const processEntryIds = new Set(processMoment.entryIds);
  const allowedZoneIds = new Set(processMoment.zoneIds ?? definition.terrainRules.zones.map((zone) => zone.id));
  const carrierZones = new Map<string, Set<string>>();
  const addCarrierZone = (entryId: string, zoneId: string): void => {
    if (!processEntryIds.has(entryId) || !allowedZoneIds.has(zoneId)) {
      return;
    }

    const zones = carrierZones.get(entryId) ?? new Set<string>();
    zones.add(zoneId);
    carrierZones.set(entryId, zones);
  };

  for (const table of definition.spawnTables) {
    for (const entry of table.entries) {
      addCarrierZone(entry.entryId, table.zoneId);
    }
  }

  for (const placement of definition.terrainRules.authoredEntities ?? []) {
    const zoneId = getZoneIdForX(definition, placement.x);
    if (zoneId !== null) {
      addCarrierZone(placement.entryId, zoneId);
    }
  }

  return carrierZones;
}

describe('habitat process moments', () => {
  it('keeps every live process carrier physically authored in a matching habitat zone', () => {
    expect(
      PROCESS_BIOMES.flatMap((biome) => biome.processMoments ?? []).map((processMoment) => processMoment.id),
    ).toEqual(['wrack-hold', 'sand-capture', 'moisture-hold', 'frost-rime', 'thaw-fringe']);

    for (const biome of PROCESS_BIOMES) {
      for (const processMoment of biome.processMoments ?? []) {
        const carrierZones = getProcessCarrierZones(biome, processMoment);

        for (const entryId of processMoment.entryIds) {
          expect(
            carrierZones.get(entryId)?.size ?? 0,
            `${biome.id}/${processMoment.id}/${entryId} needs a spawn table or authored placement in ${processMoment.zoneIds?.join(', ') ?? 'any zone'}.`,
          ).toBeGreaterThan(0);
        }
      }
    }
  });

  it('activates the beach wrack-hold moment only on late marine-haze revisits', () => {
    expect(
      getActiveHabitatProcessMoments(beachBiome, 1, {
        worldAge: 6,
        dayPart: 'day',
        weather: 'marine-haze',
        phenologyPhase: 'late',
      }),
    ).toEqual([]);

    expect(
      getActiveHabitatProcessMoments(beachBiome, 2, {
        worldAge: 6,
        dayPart: 'day',
        weather: 'marine-haze',
        phenologyPhase: 'late',
      }).map((moment) => moment.id),
    ).toEqual(['wrack-hold']);

    expect(
      getActiveHabitatProcessMoments(beachBiome, 2, {
        worldAge: 6,
        dayPart: 'day',
        weather: 'clear',
        phenologyPhase: 'late',
      }),
    ).toEqual([]);
  });

  it('only applies the wrack-hold moment to the authored wrack carriers in the tide line', () => {
    const worldState = {
      worldAge: 6,
      dayPart: 'day' as const,
      weather: 'marine-haze' as const,
      phenologyPhase: 'late' as const,
    };

    expect(
      resolveHabitatProcessMomentForEntity(
        beachBiome,
        2,
        worldState,
        'bull-kelp-wrack',
        456,
      )?.id,
    ).toBe('wrack-hold');
    expect(
      resolveHabitatProcessMomentForEntity(
        beachBiome,
        2,
        worldState,
        'beach-hopper',
        476,
      )?.id,
    ).toBe('wrack-hold');
    expect(
      resolveHabitatProcessMomentForEntity(
        beachBiome,
        2,
        worldState,
        'sand-verbena',
        236,
      ),
    ).toBeNull();
    expect(
      resolveHabitatProcessMomentForEntity(
        beachBiome,
        2,
        worldState,
        'pacific-sand-crab',
        538,
      ),
    ).toBeNull();
  });

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
