import { describe, expect, it } from 'vitest';
import { beachBiome } from '../content/biomes/beach';
import { coastalScrubBiome } from '../content/biomes/coastal-scrub';
import { ecoWorldMap } from '../content/world-map';
import { createDoorTransitionPlan, sampleDoorTransition } from '../engine/door-transition';
import {
  beginWorldMapWalk,
  createWorldMapState,
  getWorldMapLocation,
  moveWorldMapFocus,
  stepWorldMapState,
} from '../engine/world-map';

describe('world map travel scaffold', () => {
  it('moves focus between locations using direction input', () => {
    const state = createWorldMapState(ecoWorldMap, 'beach');

    expect(moveWorldMapFocus(ecoWorldMap, state, 'right')).toBe('coastal-scrub');
    expect(moveWorldMapFocus(ecoWorldMap, state, 'right')).toBe('forest');
    expect(moveWorldMapFocus(ecoWorldMap, state, 'up')).toBe('treeline');
    expect(moveWorldMapFocus(ecoWorldMap, state, 'right')).toBe('tundra');
    expect(moveWorldMapFocus(ecoWorldMap, state, 'left')).toBe('treeline');
    expect(moveWorldMapFocus(ecoWorldMap, state, 'down')).toBe('forest');
  });

  it('can open on the current location while focusing a later destination', () => {
    const state = createWorldMapState(ecoWorldMap, 'forest', 'treeline');

    expect(state.currentLocationId).toBe('forest');
    expect(state.focusedLocationId).toBe('treeline');
    expect(state.avatarX).toBe(getWorldMapLocation(ecoWorldMap, 'forest').node.x);
    expect(state.avatarY).toBe(getWorldMapLocation(ecoWorldMap, 'forest').node.y);
  });

  it('walks the avatar to the next ecotone in the chain', () => {
    const state = createWorldMapState(ecoWorldMap, 'beach');
    expect(beginWorldMapWalk(ecoWorldMap, state, 'coastal-scrub')).toBe(true);

    let arrived = false;
    for (let index = 0; index < 240; index += 1) {
      const result = stepWorldMapState(ecoWorldMap, state, 1 / 60);
      if (result.arrived) {
        arrived = true;
        break;
      }
    }

    expect(arrived).toBe(true);
    expect(state.currentLocationId).toBe('coastal-scrub');
    expect(state.focusedLocationId).toBe('coastal-scrub');
    expect(state.mode).toBe('idle');
  });

  it('walks the full five-biome route through both ecotones to reach the tundra', () => {
    const state = createWorldMapState(ecoWorldMap, 'beach');

    expect(beginWorldMapWalk(ecoWorldMap, state, 'tundra')).toBe(true);
    expect(state.activeRoute?.locationIds).toEqual([
      'beach',
      'coastal-scrub',
      'forest',
      'treeline',
      'tundra',
    ]);

    let arrived = false;
    for (let index = 0; index < 720; index += 1) {
      const result = stepWorldMapState(ecoWorldMap, state, 1 / 60);
      if (result.arrived) {
        arrived = true;
        break;
      }
    }

    expect(arrived).toBe(true);
    expect(state.currentLocationId).toBe('tundra');
    expect(state.focusedLocationId).toBe('tundra');
  });

  it('authors one map-return post per corridor-enabled biome with interior clearance from corridor doors', () => {
    for (const location of ecoWorldMap.locations) {
      if (!location.corridorDoors?.length) {
        expect(location.mapReturnPost).toBeUndefined();
        continue;
      }

      expect(location.mapReturnPost).toBeDefined();
      expect(location.mapReturnPost?.spriteId).toBe('map-post');

      const nearestDoorGap = Math.min(
        ...location.corridorDoors.map((door) => Math.abs(door.x - (location.mapReturnPost?.x ?? door.x))),
      );
      expect(nearestDoorGap).toBeGreaterThanOrEqual(96);
    }
  });

  it('keeps the beach map-return post clear of the dune-crest reward family', () => {
    const beachLocation = getWorldMapLocation(ecoWorldMap, 'beach');
    const duneCrestView = beachBiome.terrainRules.authoredPlatforms?.find(
      (platform) => platform.id === 'dune-crest-view',
    );

    expect(beachLocation.mapReturnPost).toBeDefined();
    expect(duneCrestView).toBeDefined();
    if (!beachLocation.mapReturnPost || !duneCrestView) {
      throw new Error('expected beach map-return post and dune-crest-view to exist');
    }

    expect(duneCrestView.x - (beachLocation.mapReturnPost.x + 4)).toBeGreaterThan(28);
  });

  it('keeps the coastal-scrub map-return post clear of the new gather family', () => {
    const coastalScrubLocation = getWorldMapLocation(ecoWorldMap, 'coastal-scrub');
    const gatherLog = coastalScrubBiome.terrainRules.authoredPlatforms?.find(
      (platform) => platform.id === 'windbreak-gather-log',
    );

    expect(coastalScrubLocation.mapReturnPost).toBeDefined();
    expect(gatherLog).toBeDefined();
    if (!coastalScrubLocation.mapReturnPost || !gatherLog) {
      throw new Error('expected coastal-scrub map-return post and windbreak gather log to exist');
    }

    expect(gatherLog.x - (coastalScrubLocation.mapReturnPost.x + 4)).toBeGreaterThan(28);
  });

  it('authors compact regional labels for map-return posts and walking approaches', () => {
    expect(
      ecoWorldMap.locations.map((location) => ({
        id: location.id,
        mapReturnLabel: location.mapReturnLabel,
        approachLabel: location.approachLabel,
      })),
    ).toEqual([
      { id: 'beach', mapReturnLabel: 'COAST MAP', approachLabel: 'COAST APPROACH' },
      { id: 'coastal-scrub', mapReturnLabel: 'COAST MAP', approachLabel: 'COAST APPROACH' },
      { id: 'forest', mapReturnLabel: 'INLAND MAP', approachLabel: 'INLAND APPROACH' },
      { id: 'treeline', mapReturnLabel: 'HIGH PASS MAP', approachLabel: 'HIGH PASS' },
      { id: 'tundra', mapReturnLabel: 'HIGH COUNTRY MAP', approachLabel: 'HIGH COUNTRY' },
    ]);
  });

  it('uses direction-first footer summaries across the biome chain', () => {
    expect(ecoWorldMap.locations.map((location) => location.summary)).toEqual([
      'Ocean edge. Inland path leads to scrub.',
      'Between beach dunes and forest shade.',
      'Middle woods between scrub and treeline.',
      'High pass between forest and tundra.',
      'Highest reach beyond treeline.',
    ]);
  });
});

describe('door transition planning', () => {
  it('creates a staged route from one ecosystem door to another', () => {
    const plan = createDoorTransitionPlan(ecoWorldMap, 'beach', 'coastal-scrub');

    expect(plan.phases.map((phase) => phase.id)).toEqual([
      'biome-exit',
      'fade-out',
      'map-emerge',
      'map-walk',
      'map-enter',
      'fade-in',
      'biome-emerge',
    ]);
    expect(plan.totalDuration).toBeGreaterThan(2);
  });

  it('supports same-location transition plans for doorway-to-map exits and returns', () => {
    const plan = createDoorTransitionPlan(ecoWorldMap, 'beach', 'beach');

    expect(plan.routePoints).toEqual([getWorldMapLocation(ecoWorldMap, 'beach').node]);
    expect(plan.routeDistance).toBe(0);
  });

  it('builds multi-hop transition plans across the full biome chain', () => {
    const plan = createDoorTransitionPlan(ecoWorldMap, 'forest', 'tundra');
    const forestNode = getWorldMapLocation(ecoWorldMap, 'forest').node;
    const tundraNode = getWorldMapLocation(ecoWorldMap, 'tundra').node;

    expect(plan.fromLocationId).toBe('forest');
    expect(plan.toLocationId).toBe('tundra');
    expect(plan.routePoints[0]).toEqual(forestNode);
    expect(plan.routePoints.at(-1)).toEqual(tundraNode);
    expect(plan.routeDistance).toBeGreaterThan(0);
    expect(plan.totalDuration).toBeGreaterThan(2);
  });

  it('samples the map-walk phase with a world-map avatar position', () => {
    const plan = createDoorTransitionPlan(ecoWorldMap, 'beach', 'coastal-scrub');
    const mapWalkStart =
      plan.phases[0].duration + plan.phases[1].duration + plan.phases[2].duration;
    const snapshot = sampleDoorTransition(
      ecoWorldMap,
      plan,
      mapWalkStart + plan.phases[3].duration * 0.5,
    );

    expect(snapshot.phaseId).toBe('map-walk');
    expect(snapshot.scene).toBe('world-map');
    expect(snapshot.avatar).not.toBeNull();
    expect(snapshot.avatar?.space).toBe('world-map');
  });

  it('supports custom biome-door anchors for authored map-return posts', () => {
    const customDoor = { x: 236, y: 92, facing: 'right' as const, spriteId: 'map-post' };
    const plan = createDoorTransitionPlan(ecoWorldMap, 'forest', 'forest', {
      fromBiomeDoor: customDoor,
      toBiomeDoor: customDoor,
    });
    const exitSnapshot = sampleDoorTransition(ecoWorldMap, plan, 0);
    const finalSnapshot = sampleDoorTransition(ecoWorldMap, plan, plan.totalDuration);

    expect(plan.fromBiomeDoor).toEqual(customDoor);
    expect(plan.toBiomeDoor).toEqual(customDoor);
    expect(exitSnapshot.activeBiomeId).toBe('forest');
    expect(exitSnapshot.avatar?.space).toBe('biome');
    expect(exitSnapshot.avatar?.x ?? 0).toBeGreaterThan(200);
    expect(finalSnapshot.activeBiomeId).toBe('forest');
    expect(finalSnapshot.avatar?.space).toBe('biome');
    expect(finalSnapshot.avatar?.x ?? 0).toBeGreaterThan(200);
  });
});
