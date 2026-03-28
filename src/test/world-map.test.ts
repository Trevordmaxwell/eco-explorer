import { describe, expect, it } from 'vitest';
import { ecoWorldMap } from '../content/world-map';
import { createDoorTransitionPlan, sampleDoorTransition } from '../engine/door-transition';
import {
  beginWorldMapWalk,
  createWorldMapState,
  moveWorldMapFocus,
  stepWorldMapState,
} from '../engine/world-map';

describe('world map travel scaffold', () => {
  it('moves focus between locations using direction input', () => {
    const state = createWorldMapState(ecoWorldMap, 'beach');

    expect(moveWorldMapFocus(ecoWorldMap, state, 'right')).toBe('forest');
    expect(moveWorldMapFocus(ecoWorldMap, state, 'up')).toBe('tundra');
    expect(moveWorldMapFocus(ecoWorldMap, state, 'down')).toBe('forest');
  });

  it('walks the avatar along the route to a target ecosystem', () => {
    const state = createWorldMapState(ecoWorldMap, 'beach');
    expect(beginWorldMapWalk(ecoWorldMap, state, 'forest')).toBe(true);

    let arrived = false;
    for (let index = 0; index < 240; index += 1) {
      const result = stepWorldMapState(ecoWorldMap, state, 1 / 60);
      if (result.arrived) {
        arrived = true;
        break;
      }
    }

    expect(arrived).toBe(true);
    expect(state.currentLocationId).toBe('forest');
    expect(state.focusedLocationId).toBe('forest');
    expect(state.mode).toBe('idle');
  });

  it('walks a multi-hop route through forest to reach the tundra', () => {
    const state = createWorldMapState(ecoWorldMap, 'beach');

    expect(beginWorldMapWalk(ecoWorldMap, state, 'tundra')).toBe(true);

    let arrived = false;
    for (let index = 0; index < 480; index += 1) {
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
});

describe('door transition planning', () => {
  it('creates a staged route from one ecosystem door to another', () => {
    const plan = createDoorTransitionPlan(ecoWorldMap, 'beach', 'forest');

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

    expect(plan.routePoints).toEqual([{ x: 40, y: 97 }]);
    expect(plan.routeDistance).toBe(0);
  });

  it('samples the map-walk phase with a world-map avatar position', () => {
    const plan = createDoorTransitionPlan(ecoWorldMap, 'beach', 'forest');
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
});
