import { expect } from 'vitest';

import {
  buildDebugSaveSnapshot,
  type DebugSaveSnapshotId,
} from '../engine/debug-save-snapshots';
import { createGame } from '../engine/game';
import type { SaveState } from '../engine/types';
import {
  advanceUntil,
  type FakeWindow,
  installFakeDom,
  readState,
  tapKey,
} from './test-helpers';

export function bootDebugSnapshotSave(save: SaveState): FakeWindow {
  const { window: fakeWindow, document } = installFakeDom();
  const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
  createGame(canvas, save);

  tapKey(fakeWindow, 'Enter');

  return fakeWindow;
}

export function bootDebugSnapshot(id: DebugSaveSnapshotId): FakeWindow {
  return bootDebugSnapshotSave(buildDebugSaveSnapshot(id).save);
}

function selectMenuAction(fakeWindow: FakeWindow, actionId: string): any {
  let state = readState(fakeWindow);
  const availableActions = state.menu?.availableActions ?? [];

  for (let index = 0; state.menu?.selectedAction !== actionId && index <= availableActions.length; index += 1) {
    tapKey(fakeWindow, 'ArrowDown');
    state = readState(fakeWindow);
  }

  expect(state.menu?.selectedAction).toBe(actionId);
  return state;
}

export function openWorldMapFromMenu(fakeWindow: FakeWindow): any {
  tapKey(fakeWindow, 'm');

  let state = readState(fakeWindow);
  expect(state.mode).toBe('menu');
  selectMenuAction(fakeWindow, 'world-map');

  tapKey(fakeWindow, 'Enter');
  state = advanceUntil(fakeWindow, (nextState) => nextState.scene === 'world-map');
  expect(state.scene).toBe('world-map');

  return state;
}

export function openFieldStationFromMenu(fakeWindow: FakeWindow): any {
  tapKey(fakeWindow, 'm');

  let state = readState(fakeWindow);
  expect(state.mode).toBe('menu');
  selectMenuAction(fakeWindow, 'field-station');

  tapKey(fakeWindow, 'Enter');
  state = readState(fakeWindow);
  expect(state.mode).toBe('field-station');

  return state;
}

export function openFieldStationViaWorldMap(fakeWindow: FakeWindow): any {
  openWorldMapFromMenu(fakeWindow);
  return openFieldStationFromMenu(fakeWindow);
}

export function openJournal(fakeWindow: FakeWindow): any {
  tapKey(fakeWindow, 'j');

  const state = readState(fakeWindow);
  expect(state.mode).toBe('journal');

  return state;
}
