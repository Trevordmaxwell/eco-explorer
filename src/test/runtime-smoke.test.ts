import { afterEach, describe, expect, it } from 'vitest';

import { beachBiome, coastalScrubBiome, forestBiome, treelineBiome, tundraBiome } from '../content/biomes';
import { createGame } from '../engine/game';
import { createNewSaveState, loadOrCreateSave, persistSave, recordDiscovery } from '../engine/save';

class FakeEventTarget {
  private listeners = new Map<string, Set<(event: any) => void>>();

  addEventListener(type: string, listener: (event: any) => void): void {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }
    this.listeners.get(type)?.add(listener);
  }

  removeEventListener(type: string, listener: (event: any) => void): void {
    this.listeners.get(type)?.delete(listener);
  }

  dispatchEvent(event: { type: string; [key: string]: unknown }): boolean {
    this.listeners.get(event.type)?.forEach((listener) => listener(event));
    return true;
  }
}

class FakeLocalStorage {
  private values = new Map<string, string>();

  getItem(key: string): string | null {
    return this.values.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    this.values.set(key, value);
  }

  removeItem(key: string): void {
    this.values.delete(key);
  }

  clear(): void {
    this.values.clear();
  }
}

class FakeCanvasContext {
  fillStyle = '#000000';
  font = '10px sans-serif';
  imageSmoothingEnabled = false;
  textBaseline: CanvasTextBaseline = 'alphabetic';

  clearRect(): void {}
  fillRect(): void {}
  fillText(): void {}
  drawImage(): void {}
  save(): void {}
  restore(): void {}
  scale(): void {}

  createLinearGradient(): CanvasGradient {
    return {
      addColorStop() {},
    } as CanvasGradient;
  }

  measureText(text: string): TextMetrics {
    return { width: text.length * 4 } as TextMetrics;
  }
}

class FakeCanvas extends FakeEventTarget {
  width = 256;
  height = 160;
  clientWidth = 256;
  clientHeight = 160;
  private readonly context = new FakeCanvasContext();

  getContext(type: string): CanvasRenderingContext2D | null {
    return type === '2d' ? (this.context as unknown as CanvasRenderingContext2D) : null;
  }

  getBoundingClientRect(): DOMRect {
    return {
      left: 0,
      top: 0,
      width: this.clientWidth,
      height: this.clientHeight,
      right: this.clientWidth,
      bottom: this.clientHeight,
      x: 0,
      y: 0,
      toJSON() {
        return {};
      },
    } as DOMRect;
  }
}

class FakeDocument {
  createElement(tagName: string): HTMLElement {
    if (tagName === 'canvas') {
      return new FakeCanvas() as unknown as HTMLElement;
    }

    return {} as HTMLElement;
  }
}

class FakeWindow extends FakeEventTarget {
  readonly localStorage = new FakeLocalStorage();
  readonly document = new FakeDocument();
  advanceTime?: (ms: number) => void;
  render_game_to_text?: () => string;
}

const originalWindow = globalThis.window;
const originalDocument = globalThis.document;
const originalRequestAnimationFrame = globalThis.requestAnimationFrame;
const originalCancelAnimationFrame = globalThis.cancelAnimationFrame;
const originalNavigator = Object.getOwnPropertyDescriptor(globalThis, 'navigator');

function installFakeDom(): { window: FakeWindow; document: FakeDocument; copiedTexts: string[] } {
  const fakeWindow = new FakeWindow();
  const fakeDocument = fakeWindow.document;
  const copiedTexts: string[] = [];

  Object.assign(globalThis, {
    window: fakeWindow,
    document: fakeDocument,
    requestAnimationFrame: () => 1,
    cancelAnimationFrame: () => {},
  });
  Object.defineProperty(globalThis, 'navigator', {
    configurable: true,
    value: {
      clipboard: {
        writeText: async (text: string) => {
          copiedTexts.push(text);
        },
      },
    },
  });

  return { window: fakeWindow, document: fakeDocument, copiedTexts };
}

function readState(fakeWindow: FakeWindow): any {
  const raw = fakeWindow.render_game_to_text?.();
  if (!raw) {
    throw new Error('Expected render_game_to_text to be available.');
  }
  return JSON.parse(raw);
}

function tapKey(fakeWindow: FakeWindow, key: string): void {
  fakeWindow.dispatchEvent({ type: 'keydown', key, preventDefault() {} });
  fakeWindow.advanceTime?.(16);
  fakeWindow.dispatchEvent({ type: 'keyup', key, preventDefault() {} });
  fakeWindow.advanceTime?.(16);
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

function tapCanvas(canvas: FakeCanvas, x: number, y: number): void {
  canvas.dispatchEvent({ type: 'pointerdown', clientX: x, clientY: y });
}

function holdKey(fakeWindow: FakeWindow, key: string, frames: number): void {
  fakeWindow.dispatchEvent({ type: 'keydown', key, preventDefault() {} });
  for (let index = 0; index < frames; index += 1) {
    fakeWindow.advanceTime?.(16);
  }
  fakeWindow.dispatchEvent({ type: 'keyup', key, preventDefault() {} });
  fakeWindow.advanceTime?.(16);
}

function advanceWhileHoldingKeyUntil(
  fakeWindow: FakeWindow,
  key: string,
  predicate: (state: any) => boolean,
  maxSteps = 120,
): any {
  fakeWindow.dispatchEvent({ type: 'keydown', key, preventDefault() {} });

  try {
    for (let index = 0; index < maxSteps; index += 1) {
      fakeWindow.advanceTime?.(16);
      const state = readState(fakeWindow);
      if (predicate(state)) {
        return state;
      }
    }
  } finally {
    fakeWindow.dispatchEvent({ type: 'keyup', key, preventDefault() {} });
    fakeWindow.advanceTime?.(16);
  }

  throw new Error(`Timed out waiting while holding ${key}.`);
}

function advanceWhileHoldingKeysUntil(
  fakeWindow: FakeWindow,
  keys: string[],
  predicate: (state: any) => boolean,
  maxSteps = 120,
): any {
  for (const key of keys) {
    fakeWindow.dispatchEvent({ type: 'keydown', key, preventDefault() {} });
  }

  try {
    for (let index = 0; index < maxSteps; index += 1) {
      fakeWindow.advanceTime?.(16);
      const state = readState(fakeWindow);
      if (predicate(state)) {
        return state;
      }
    }
  } finally {
    for (const key of keys) {
      fakeWindow.dispatchEvent({ type: 'keyup', key, preventDefault() {} });
    }
    fakeWindow.advanceTime?.(16);
  }

  throw new Error(`Timed out waiting while holding ${keys.join(' + ')}.`);
}

function advanceUntil(
  fakeWindow: FakeWindow,
  predicate: (state: any) => boolean,
  maxSteps = 80,
): any {
  for (let index = 0; index < maxSteps; index += 1) {
    const state = readState(fakeWindow);
    if (predicate(state)) {
      return state;
    }

    fakeWindow.advanceTime?.(100);
  }

  throw new Error('Timed out waiting for runtime state.');
}

afterEach(() => {
  Object.assign(globalThis, {
    window: originalWindow,
    document: originalDocument,
    requestAnimationFrame: originalRequestAnimationFrame,
    cancelAnimationFrame: originalCancelAnimationFrame,
  });
  if (originalNavigator) {
    Object.defineProperty(globalThis, 'navigator', originalNavigator);
  } else {
    // @ts-expect-error test cleanup for environments without navigator
    delete globalThis.navigator;
  }
});

describe('runtime smoke loop', () => {
  it('covers title, play, inspect, menu, world-map travel, journal, and reload persistence', async () => {
    const { window: fakeWindow, document, copiedTexts } = installFakeDom();
    const seedSave = createNewSaveState('runtime-smoke-seed');
    persistSave(seedSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seedSave);

    expect(readState(fakeWindow).mode).toBe('title');

    tapKey(fakeWindow, 'm');
    let state = readState(fakeWindow);
    expect(state.mode).toBe('menu');
    expect(state.menu?.availableActions).not.toContain('field-guide');
    tapKey(fakeWindow, 'm');
    expect(readState(fakeWindow).mode).toBe('title');

    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.mode).toBe('playing');

    const beachGrass = state.nearbyInspectables.find((entity: any) => entity.entryId === 'beach-grass');
    if (!beachGrass) {
      throw new Error('Expected beach grass to be near the player at the beach start.');
    }

    game.inspectEntity(beachGrass.entityId);
    fakeWindow.advanceTime?.(16);
    state = readState(fakeWindow);
    expect(state.openBubble?.title).toBeTruthy();
    expect(state.discoveredJournalCount).toBe(1);

    tapKey(fakeWindow, 'j');
    state = readState(fakeWindow);
    expect(state.mode).toBe('journal');
    expect(state.journal?.selectedBiomeId).toBe('beach');
    expect(state.journal?.selectedSurveyState).toBe('none');
    expect(state.journal?.biomeProgress).toHaveLength(5);
    expect(state.journal?.biomeProgress[0]?.surveyState).toBe('none');
    expect(state.journal?.ecosystemNote?.state).toBe('locked');
    expect(state.journal?.ecosystemNote?.title).toBeNull();

    tapKey(fakeWindow, 'ArrowRight');
    state = readState(fakeWindow);
    expect(state.journal?.selectedBiomeId).toBe('coastal-scrub');
    expect(state.journal?.selectedEntryId).toBeNull();
    expect(state.journal?.selectedSurveyState).toBe('none');

    tapKey(fakeWindow, 'ArrowRight');
    state = readState(fakeWindow);
    expect(state.journal?.selectedBiomeId).toBe('forest');

    tapKey(fakeWindow, 'ArrowLeft');
    state = readState(fakeWindow);
    expect(state.journal?.selectedBiomeId).toBe('coastal-scrub');

    tapKey(fakeWindow, 'ArrowLeft');
    state = readState(fakeWindow);
    expect(state.journal?.selectedBiomeId).toBe('beach');

    tapKey(fakeWindow, 'Escape');
    expect(readState(fakeWindow).mode).toBe('playing');

    tapKey(fakeWindow, 'm');
    state = readState(fakeWindow);
    expect(state.mode).toBe('menu');
    expect(state.menu?.availableActions).toContain('field-guide');
    expect(state.menu?.selectedAction).toBe('world-map');

    tapKey(fakeWindow, 'ArrowDown');
    state = readState(fakeWindow);
    expect(state.menu?.selectedAction).toBe('field-guide');

    tapKey(fakeWindow, 'Enter');
    await Promise.resolve();
    await Promise.resolve();
    fakeWindow.advanceTime?.(16);
    state = readState(fakeWindow);
    expect(state.mode).toBe('playing');
    expect(state.fieldGuideNotice?.state).toBe('copied');
    expect(copiedTexts).toHaveLength(1);
    expect(copiedTexts[0]).toContain('"Sunny Beach" biome');
    expect(copiedTexts[0]).toContain('NEARBY ORGANISMS AND FEATURES');
    expect(copiedTexts[0]).toContain('STILL HIDDEN IN THIS BIOME');
    expect(copiedTexts[0]).toContain('CURRENT WORLD STATE');
    expect(copiedTexts[0]).toContain('Day part: day');
    expect(copiedTexts[0]).toContain('Weather: clear');
    expect(copiedTexts[0]).not.toContain('Ghost Crab');
    expect(copiedTexts[0]).toContain('If a food web,');
    expect(fakeWindow.render_game_to_text?.()).not.toContain('NEARBY ORGANISMS AND FEATURES');

    game.enterBiome('forest');
    state = readState(fakeWindow);
    expect(state.biomeId).toBe('forest');
    expect(state.nearbyDoor?.inRange).toBe(true);

    tapKey(fakeWindow, 'm');
    state = readState(fakeWindow);
    expect(state.menu?.selectedAction).toBe('world-map');

    tapKey(fakeWindow, 'Enter');
    state = advanceUntil(fakeWindow, (nextState) => nextState.scene === 'world-map');
    expect(state.worldMap?.currentLocationId).toBe('forest');
    expect(state.worldMap?.focusedLocationId).toBe('forest');
    expect(state.worldMap?.originLabel).toBeNull();

    tapKey(fakeWindow, 'ArrowRight');
    state = readState(fakeWindow);
    expect(state.worldMap?.focusedLocationId).toBe('treeline');
    expect(state.worldMap?.focusedSurveyState).toBe('none');
    expect(state.worldMap?.originLabel).toBe('FROM FOREST TRAIL');

    tapKey(fakeWindow, 'j');
    state = readState(fakeWindow);
    expect(state.mode).toBe('journal');
    expect(state.scene).toBe('world-map');
    expect(state.journal?.selectedBiomeId).toBe('treeline');

    tapKey(fakeWindow, 'Escape');
    state = readState(fakeWindow);
    expect(state.mode).toBe('playing');
    expect(state.scene).toBe('world-map');

    tapKey(fakeWindow, 'ArrowRight');
    state = readState(fakeWindow);
    expect(state.worldMap?.focusedLocationId).toBe('tundra');

    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.worldMap?.mode).toBe('walking');
    expect(state.worldMap?.walkingLabel).toBe('HIGH COUNTRY');

    state = advanceUntil(
      fakeWindow,
      (nextState) =>
        nextState.transition?.kind === 'map-to-biome' && nextState.transition?.toBiomeId === 'tundra',
      120,
    );
    expect(state.transition?.scene).toBe('world-map');
    expect(state.transition?.toBiomeId).toBe('tundra');

    state = advanceUntil(
      fakeWindow,
      (nextState) => nextState.scene === 'biome' && nextState.biomeId === 'tundra',
      120,
    );
    expect(state.biomeId).toBe('tundra');
    expect(state.player?.space).toBe('biome');

    game.enterBiome('coastal-scrub');
    state = readState(fakeWindow);
    expect(state.biomeId).toBe('coastal-scrub');
    expect(state.visitCount).toBe(1);

    const scrubGrass = state.nearbyInspectables.find((entity: any) => entity.entryId === 'beach-grass');
    if (!scrubGrass) {
      throw new Error('Expected beach grass to be near the player at the coastal scrub start.');
    }

    game.inspectEntity(scrubGrass.entityId);
    fakeWindow.advanceTime?.(16);
    state = readState(fakeWindow);
    expect(state.openBubble?.isNewEntry).toBe(false);
    expect(state.discoveredJournalCount).toBe(1);

    tapKey(fakeWindow, 'j');
    state = readState(fakeWindow);
    expect(state.mode).toBe('journal');
    expect(state.journal?.selectedBiomeId).toBe('coastal-scrub');
    expect(state.journal?.selectedEntryId).toBe('beach-grass');
    expect(state.journal?.selectedSurveyState).toBe('none');
    expect(state.journal?.selectedEntrySightings).toEqual(['beach', 'coastal-scrub']);

    tapKey(fakeWindow, 'Escape');
    expect(readState(fakeWindow).mode).toBe('playing');

    game.enterBiome('treeline');
    state = readState(fakeWindow);
    expect(state.biomeId).toBe('treeline');
    expect(state.visitCount).toBe(1);

    const reloadedSave = loadOrCreateSave();
    const reloadedCanvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    createGame(reloadedCanvas, reloadedSave);

    state = readState(fakeWindow);
    expect(state.mode).toBe('title');
    expect(state.biomeId).toBe('treeline');
    expect(state.discoveredJournalCount).toBe(1);
  });

  it('surfaces surveyed biome states in the journal and the world map debug state', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-survey-seed');
    for (const entryId of ['beach-grass', 'sand-verbena', 'native-littleneck-shell', 'western-snowy-plover']) {
      recordDiscovery(seededSave, beachBiome.entries[entryId], 'beach');
    }
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    tapKey(fakeWindow, 'j');

    let state = readState(fakeWindow);
    expect(state.journal?.selectedBiomeId).toBe('beach');
    expect(state.journal?.selectedSurveyState).toBe('surveyed');
    expect(state.journal?.biomeProgress.find((biome: any) => biome.biomeId === 'beach')?.surveyState).toBe('surveyed');

    tapKey(fakeWindow, 'Escape');
    game.enterBiome('forest');
    tapKey(fakeWindow, 'm');
    state = readState(fakeWindow);
    const biomeMenuActions = state.menu?.availableActions ?? [];
    for (let index = 0; state.menu?.selectedAction !== 'world-map' && index <= biomeMenuActions.length; index += 1) {
      tapKey(fakeWindow, 'ArrowDown');
      state = readState(fakeWindow);
    }
    expect(state.menu?.selectedAction).toBe('world-map');
    tapKey(fakeWindow, 'Enter');
    state = advanceUntil(fakeWindow, (nextState) => nextState.scene === 'world-map');
    expect(state.worldMap?.focusedLocationId).toBe('forest');
    expect(state.worldMap?.focusedSurveyState).toBe('none');

    tapKey(fakeWindow, 'ArrowLeft');
    tapKey(fakeWindow, 'ArrowLeft');
    state = readState(fakeWindow);
    expect(state.worldMap?.focusedLocationId).toBe('beach');
    expect(state.worldMap?.focusedSurveyState).toBe('surveyed');
  });

  it('opens the surveyed-biome sketchbook, places local stamps, and keeps them after reload', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-sketchbook-seed');
    for (const entryId of ['beach-grass', 'sand-verbena', 'native-littleneck-shell', 'western-snowy-plover']) {
      recordDiscovery(seededSave, beachBiome.entries[entryId], 'beach');
    }
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    tapKey(fakeWindow, 'j');

    let state = readState(fakeWindow);
    expect(state.journal?.selectedBiomeId).toBe('beach');
    expect(state.journal?.selectedSurveyState).toBe('surveyed');
    expect(state.journal?.sketchbook).toMatchObject({
      available: true,
      open: false,
    });

    const firstEntryId = state.journal?.selectedEntryId;
    tapKey(fakeWindow, 'x');
    state = readState(fakeWindow);
    expect(state.journal?.sketchbook).toMatchObject({
      available: true,
      open: true,
      selectedSlotId: 'top-left',
    });

    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.journal?.sketchbook?.slots.find((slot: any) => slot.slotId === 'top-left')).toMatchObject({
      entryId: firstEntryId,
    });

    tapKey(fakeWindow, 'ArrowRight');
    tapKey(fakeWindow, 'ArrowDown');
    state = readState(fakeWindow);
    const secondEntryId = state.journal?.selectedEntryId;
    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.journal?.sketchbook?.slots.find((slot: any) => slot.slotId === 'top-right')).toMatchObject({
      entryId: secondEntryId,
    });

    tapKey(fakeWindow, 'Backspace');
    state = readState(fakeWindow);
    expect(state.journal?.sketchbook?.slots.find((slot: any) => slot.slotId === 'top-right')).toMatchObject({
      entryId: null,
    });

    tapKey(fakeWindow, 'Escape');
    const reloadedSave = loadOrCreateSave();
    const reloadedCanvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    createGame(reloadedCanvas, reloadedSave);

    tapKey(fakeWindow, 'Enter');
    tapKey(fakeWindow, 'j');
    tapKey(fakeWindow, 'x');
    state = readState(fakeWindow);
    expect(state.journal?.sketchbook).toMatchObject({
      available: true,
      open: true,
    });
    expect(state.journal?.sketchbook?.slots.find((slot: any) => slot.slotId === 'top-left')).toMatchObject({
      entryId: firstEntryId,
    });
  });

  it('arms sound after input and lets the player toggle it from the menu', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-sound-seed');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    let state = readState(fakeWindow);
    expect(state.sound).toMatchObject({
      enabled: true,
      armed: true,
      ambientProfileId: 'shore',
    });
    expect(state.settings.soundEnabled).toBe(true);

    tapKey(fakeWindow, 'm');
    state = readState(fakeWindow);
    expect(state.menu?.availableActions).toContain('toggle-sound');
    expect(state.menu?.selectedAction).toBe('world-map');

    tapKey(fakeWindow, 'ArrowDown');
    tapKey(fakeWindow, 'ArrowDown');
    tapKey(fakeWindow, 'ArrowDown');
    state = readState(fakeWindow);
    expect(state.menu?.selectedAction).toBe('toggle-sound');

    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.settings.soundEnabled).toBe(false);
    expect(state.sound).toMatchObject({
      enabled: false,
      armed: true,
      ambientProfileId: 'shore',
    });
  });

  it('opens a close-look card from a supported inspect bubble and closes back to play', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-close-look-seed');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    const stateWithShell = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) =>
        nextState.nearbyInspectables.some((entity: any) =>
          ['moon-snail-shell', 'razor-clam-shell'].includes(entity.entryId),
        ),
      520,
    );
    const target = stateWithShell.nearbyInspectables.find((entity: any) =>
      ['moon-snail-shell', 'razor-clam-shell'].includes(entity.entryId),
    );
    if (!target) {
      throw new Error('Expected a supported beach shell to appear near the player.');
    }

    game.inspectEntity(target.entityId);
    fakeWindow.advanceTime?.(16);

    let state = readState(fakeWindow);
    expect(state.openBubble).toMatchObject({
      entryId: target.entryId,
      closeLookAvailable: true,
    });
    expect(state.closeLook).toBeNull();

    tapKey(fakeWindow, 'E');
    state = readState(fakeWindow);
    expect(state.mode).toBe('close-look');
    expect(state.closeLook).toMatchObject({
      entryId: target.entryId,
    });

    tapKey(fakeWindow, 'Escape');
    state = readState(fakeWindow);
    expect(state.mode).toBe('playing');
    expect(state.closeLook).toBeNull();
    expect(state.openBubble).toBeNull();
  });

  it('surfaces one active field request in the journal and turns Hidden Hollow notebook-ready after the seep-stone confirm', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-field-request-seed');
    seededSave.completedFieldRequestIds = ['beach-shore-shelter'];
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('forest');

    tapKey(fakeWindow, 'j');
    let state = readState(fakeWindow);
    expect(state.journal?.selectedBiomeId).toBe('forest');
    expect(state.journal?.fieldRequest).toMatchObject({
      id: 'forest-hidden-hollow',
      progressLabel: 'Return To Root Hollow',
      routeV2: {
        status: 'gathering',
      },
    });

    tapKey(fakeWindow, 'Escape');
    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) =>
        nextState.zoneId === 'seep-pocket' &&
        nextState.nearbyInspectables.some((entity: any) => entity.entryId === 'seep-stone'),
      640,
    );
    expect(state.zoneId).toBe('seep-pocket');

    const seepStone = state.nearbyInspectables.find((entity: any) => entity.entryId === 'seep-stone');
    if (!seepStone) {
      throw new Error('Expected seep stone to be available in the lower hollow pocket.');
    }

    game.inspectEntity(seepStone.entityId);
    fakeWindow.advanceTime?.(16);
    state = readState(fakeWindow);
    expect(seededSave.completedFieldRequestIds).not.toContain('forest-hidden-hollow');
    expect(seededSave.routeV2Progress).toMatchObject({
      requestId: 'forest-hidden-hollow',
      status: 'ready-to-synthesize',
      landmarkEntryIds: ['seep-stone'],
    });
    expect(state.activeFieldRequest).toMatchObject({
      id: 'forest-hidden-hollow',
      progressLabel: 'Ready To File',
      routeV2: {
        status: 'ready-to-synthesize',
      },
    });
    expect(state.fieldRequestNotice).toMatchObject({
      title: 'NOTEBOOK READY',
      text: 'Return to the field station and file the Hidden Hollow note.',
    });
    fakeWindow.advanceTime?.(5200);
    state = readState(fakeWindow);
    expect(state.fieldRequestNotice).toBeNull();
    expect(state.fieldRequestHint).toMatchObject({
      label: 'NOTEBOOK J',
      title: 'Hidden Hollow',
    });

    tapKey(fakeWindow, 'j');
    state = readState(fakeWindow);
    expect(state.journal?.fieldRequest).toMatchObject({
      id: 'forest-hidden-hollow',
      progressLabel: 'Ready To File',
    });
  });

  it('turns the beach start into a notebook-ready Shore Shelter outing and files it at the station', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-shore-shelter-seed');
    seededSave.selectedOutingSupportId = 'note-tabs';
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    let state = readState(fakeWindow);
    expect(state.activeFieldRequest).toMatchObject({
      id: 'beach-shore-shelter',
      progressLabel: '0/3 stages',
    });

    const beachGrass = state.nearbyInspectables.find((entity: any) => entity.entryId === 'beach-grass');
    if (!beachGrass) {
      throw new Error('Expected beach grass near the beach start.');
    }

    game.inspectEntity(beachGrass.entityId);
    fakeWindow.advanceTime?.(16);
    state = readState(fakeWindow);
    expect(seededSave.routeV2Progress).toMatchObject({
      requestId: 'beach-shore-shelter',
      status: 'gathering',
      evidenceSlots: [{ slotId: 'dune-grass', entryId: 'beach-grass' }],
    });

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) =>
        nextState.zoneId === 'lee-pocket'
        && nextState.nearbyInspectables.some((entity: any) => entity.entryId === 'driftwood-log'),
      520,
    );
    const driftwoodLog = state.nearbyInspectables.find((entity: any) => entity.entryId === 'driftwood-log');
    if (!driftwoodLog) {
      throw new Error('Expected driftwood log in the beach lee pocket.');
    }

    game.inspectEntity(driftwoodLog.entityId);
    fakeWindow.advanceTime?.(16);
    state = readState(fakeWindow);
    expect(seededSave.routeV2Progress).toMatchObject({
      requestId: 'beach-shore-shelter',
      status: 'gathering',
      evidenceSlots: [
        { slotId: 'dune-grass', entryId: 'beach-grass' },
        { slotId: 'lee-cover', entryId: 'driftwood-log' },
      ],
    });

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) =>
        nextState.zoneId === 'tide-line'
        && nextState.nearbyInspectables.some((entity: any) => entity.entryId === 'bull-kelp-wrack'),
      520,
    );
    const bullKelpWrack = state.nearbyInspectables.find((entity: any) => entity.entryId === 'bull-kelp-wrack');
    if (!bullKelpWrack) {
      throw new Error('Expected bull kelp wrack along the tide line.');
    }

    game.inspectEntity(bullKelpWrack.entityId);
    fakeWindow.advanceTime?.(16);
    state = readState(fakeWindow);
    expect(seededSave.routeV2Progress).toMatchObject({
      requestId: 'beach-shore-shelter',
      status: 'ready-to-synthesize',
      evidenceSlots: [
        { slotId: 'dune-grass', entryId: 'beach-grass' },
        { slotId: 'lee-cover', entryId: 'driftwood-log' },
        { slotId: 'wrack-line', entryId: 'bull-kelp-wrack' },
      ],
    });
    expect(state.fieldRequestNotice).toMatchObject({
      title: 'NOTEBOOK READY',
      text: 'Return to the field station and file the Shore Shelter note.',
    });

    tapKey(fakeWindow, 'm');
    state = readState(fakeWindow);
    const biomeMenuActions = state.menu?.availableActions ?? [];
    for (let index = 0; state.menu?.selectedAction !== 'world-map' && index <= biomeMenuActions.length; index += 1) {
      tapKey(fakeWindow, 'ArrowDown');
      state = readState(fakeWindow);
    }
    expect(state.menu?.selectedAction).toBe('world-map');
    tapKey(fakeWindow, 'Enter');
    state = advanceUntil(fakeWindow, (nextState) => nextState.scene === 'world-map');
    expect(state.worldMap?.focusedLocationId).toBe('beach');

    tapKey(fakeWindow, 'm');
    tapKey(fakeWindow, 'ArrowUp');
    state = readState(fakeWindow);
    expect(state.menu?.selectedAction).toBe('field-station');
    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.mode).toBe('field-station');
    expect(state.fieldStation?.routeBoard).toMatchObject({
      targetBiomeId: null,
      notebookReady: {
        requestId: 'beach-shore-shelter',
      },
      beats: [
        { id: 'forest-study', status: 'ready' },
        { id: 'station-return', status: 'upcoming' },
        { id: 'coastal-comparison', status: 'upcoming' },
      ],
    });
    expect(state.fieldStation?.seasonWrap).toMatchObject({
      label: 'SHORE SHELTER',
      text: 'American Dunegrass, Driftwood, and Bull Kelp Wrack mark how shelter grows from dune edge to tide line.',
    });

    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(seededSave.routeV2Progress).toBeNull();
    expect(seededSave.completedFieldRequestIds).toContain('beach-shore-shelter');
    expect(state.fieldRequestNotice).toMatchObject({
      title: 'SHORE SHELTER',
      text: 'American Dunegrass, Driftwood, and Bull Kelp Wrack mark how shelter grows from dune edge to tide line.',
    });
    expect(state.fieldStation?.seasonWrap).toEqual({
      label: 'SHORE SHELTER LOGGED',
      text: 'Sunny Beach closes the shore shelter line. Hidden Hollow waits inland.',
    });
    expect(state.activeFieldRequest).toMatchObject({
      id: 'forest-hidden-hollow',
      progressLabel: 'Go To Forest Trail',
    });
  });

  it('turns the coastal front-half transition into a notebook-ready Open To Shelter outing and files it at the station', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-open-to-shelter-seed');
    seededSave.selectedOutingSupportId = 'note-tabs';
    seededSave.completedFieldRequestIds = [
      'forest-hidden-hollow',
      'forest-moisture-holders',
      'forest-survey-slice',
    ];
    seededSave.purchasedUpgradeIds = ['trail-stride'];
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('coastal-scrub');

    let state = readState(fakeWindow);
    expect(state.activeFieldRequest).toMatchObject({
      id: 'coastal-shelter-shift',
      title: 'Open To Shelter',
      progressLabel: '0/3 stages',
    });

    let sandVerbena = state.nearbyInspectables.find((entity: any) => entity.entryId === 'sand-verbena');
    if (!sandVerbena) {
      state = advanceWhileHoldingKeyUntil(
        fakeWindow,
        'ArrowRight',
        (nextState) =>
          nextState.zoneId === 'back-dune'
          && nextState.nearbyInspectables.some((entity: any) => entity.entryId === 'sand-verbena'),
        220,
      );
      sandVerbena = state.nearbyInspectables.find((entity: any) => entity.entryId === 'sand-verbena');
    }
    if (!sandVerbena) {
      throw new Error('Expected sand verbena near the coastal scrub start.');
    }

    game.inspectEntity(sandVerbena.entityId);
    fakeWindow.advanceTime?.(16);
    state = readState(fakeWindow);
    expect(seededSave.routeV2Progress).toMatchObject({
      requestId: 'coastal-shelter-shift',
      status: 'gathering',
      evidenceSlots: [{ slotId: 'open-bloom', entryId: 'sand-verbena' }],
    });
    expect(state.activeFieldRequest).toMatchObject({
      id: 'coastal-shelter-shift',
      progressLabel: 'Return To Shore Pine Stand',
    });

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) =>
        nextState.zoneId === 'windbreak-swale'
        && (nextState.player?.x ?? 0) >= 280
        && (nextState.player?.x ?? 999) <= 304
        && Math.abs(nextState.player?.vy ?? 999) <= 1,
      420,
    );
    expect(state.zoneId).toBe('windbreak-swale');

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) =>
        nextState.zoneId === 'shore-pine-stand'
        && nextState.nearbyInspectables.some((entity: any) => entity.entryId === 'shore-pine'),
      260,
    );
    const shorePine = state.nearbyInspectables.find((entity: any) => entity.entryId === 'shore-pine');
    if (!shorePine) {
      throw new Error('Expected shore pine in the coastal transition stand.');
    }

    game.inspectEntity(shorePine.entityId);
    fakeWindow.advanceTime?.(16);
    state = readState(fakeWindow);
    expect(seededSave.routeV2Progress).toMatchObject({
      requestId: 'coastal-shelter-shift',
      status: 'gathering',
      evidenceSlots: [
        { slotId: 'open-bloom', entryId: 'sand-verbena' },
        { slotId: 'pine-cover', entryId: 'shore-pine' },
      ],
    });
    expect(state.activeFieldRequest).toMatchObject({
      id: 'coastal-shelter-shift',
      progressLabel: 'Return To Forest Edge',
    });

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) =>
        nextState.zoneId === 'forest-edge'
        && nextState.nearbyInspectables.some((entity: any) => entity.entryId === 'nurse-log'),
      300,
    );
    const nurseLog = state.nearbyInspectables.find((entity: any) => entity.entryId === 'nurse-log');
    if (!nurseLog) {
      throw new Error('Expected nurse log along the forest edge.');
    }

    game.inspectEntity(nurseLog.entityId);
    fakeWindow.advanceTime?.(16);
    state = readState(fakeWindow);
    expect(seededSave.routeV2Progress).toMatchObject({
      requestId: 'coastal-shelter-shift',
      status: 'ready-to-synthesize',
      evidenceSlots: [
        { slotId: 'open-bloom', entryId: 'sand-verbena' },
        { slotId: 'pine-cover', entryId: 'shore-pine' },
        { slotId: 'edge-log', entryId: 'nurse-log' },
      ],
    });
    expect(state.activeFieldRequest).toMatchObject({
      id: 'coastal-shelter-shift',
      progressLabel: 'Ready To File',
    });
    expect(state.fieldRequestNotice).toMatchObject({
      title: 'NOTEBOOK READY',
      text: 'Return to the field station and file the Open To Shelter note.',
    });

    tapKey(fakeWindow, 'm');
    state = readState(fakeWindow);
    const openToShelterMenuActions = state.menu?.availableActions ?? [];
    for (
      let index = 0;
      state.menu?.selectedAction !== 'world-map' && index <= openToShelterMenuActions.length;
      index += 1
    ) {
      tapKey(fakeWindow, 'ArrowDown');
      state = readState(fakeWindow);
    }
    expect(state.menu?.selectedAction).toBe('world-map');
    tapKey(fakeWindow, 'Enter');
    state = advanceUntil(fakeWindow, (nextState) => nextState.scene === 'world-map');
    expect(state.worldMap?.focusedLocationId).toBe('coastal-scrub');

    tapKey(fakeWindow, 'm');
    state = readState(fakeWindow);
    const stationMenuActions = state.menu?.availableActions ?? [];
    for (let index = 0; state.menu?.selectedAction !== 'field-station' && index <= stationMenuActions.length; index += 1) {
      tapKey(fakeWindow, 'ArrowDown');
      state = readState(fakeWindow);
    }
    expect(state.menu?.selectedAction).toBe('field-station');
    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.mode).toBe('field-station');
    expect(state.fieldStation?.routeBoard).toMatchObject({
      targetBiomeId: null,
      notebookReady: {
        requestId: 'coastal-shelter-shift',
        previewLabel: 'OPEN TO SHELTER',
      },
      beats: [
        { id: 'forest-study', status: 'done' },
        { id: 'station-return', status: 'done' },
        { id: 'coastal-comparison', status: 'ready' },
      ],
    });
    expect(state.fieldStation?.seasonWrap).toEqual({
      label: 'OPEN TO SHELTER',
      text: 'Yellow Sand Verbena, Shore Pine, and Nurse Log show the coast settling into forest-edge shelter.',
    });

    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(seededSave.routeV2Progress).toBeNull();
    expect(seededSave.completedFieldRequestIds).toContain('coastal-shelter-shift');
    expect(state.fieldRequestNotice).toMatchObject({
      title: 'OPEN TO SHELTER',
      text: 'Yellow Sand Verbena, Shore Pine, and Nurse Log show the coast settling into forest-edge shelter.',
    });
    expect(state.fieldStation?.seasonWrap).toEqual({
      label: 'OPEN TO SHELTER LOGGED',
      text: 'Coastal Scrub closes the shelter chapter. Edge Moisture waits at the forest edge.',
    });
    expect(state.fieldStation?.routeBoard).toMatchObject({
      nextDirection: 'Next: return to Coastal Scrub and log the cooler, wetter edge at forest side.',
      targetBiomeId: 'coastal-scrub',
      beats: [
        { id: 'forest-study', status: 'done' },
        { id: 'station-return', status: 'done' },
        { id: 'coastal-comparison', status: 'active' },
      ],
    });
    expect(state.activeFieldRequest).toMatchObject({
      id: 'coastal-edge-moisture',
      progressLabel: 'Return To Forest Edge',
    });
  });

  it('files a notebook-ready route from the routes page with one Enter press', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-route-v2-file-seed');
    seededSave.selectedOutingSupportId = 'note-tabs';
    seededSave.routeV2Progress = {
      requestId: 'forest-hidden-hollow',
      status: 'ready-to-synthesize',
      landmarkEntryIds: ['seep-stone'],
      evidenceSlots: [],
    };
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('forest');
    tapKey(fakeWindow, 'm');
    tapKey(fakeWindow, 'Enter');
    let state = advanceUntil(fakeWindow, (nextState) => nextState.scene === 'world-map');
    expect(state.worldMap?.focusedLocationId).toBe('forest');

    tapKey(fakeWindow, 'm');
    tapKey(fakeWindow, 'ArrowUp');
    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.mode).toBe('field-station');
    expect(state.fieldStation?.routeBoard).toMatchObject({
      targetBiomeId: null,
      notebookReady: {
        requestId: 'forest-hidden-hollow',
      },
      beats: [
        { id: 'forest-study', status: 'ready' },
        { id: 'station-return', status: 'upcoming' },
        { id: 'coastal-comparison', status: 'upcoming' },
      ],
    });
    expect(state.fieldStation?.seasonWrap).toMatchObject({
      label: 'HIDDEN HOLLOW',
      text: 'Seep stone confirms the damp lower hollow under the roots.',
    });

    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(seededSave.routeV2Progress).toBeNull();
    expect(seededSave.completedFieldRequestIds).toContain('forest-hidden-hollow');
    expect(state.fieldRequestNotice).toMatchObject({
      title: 'HIDDEN HOLLOW',
      text: 'Seep stone confirms the damp lower hollow under the roots.',
    });
    expect(state.activeFieldRequest).toMatchObject({
      id: 'forest-moisture-holders',
      progressLabel: 'Return To Root Hollow',
    });
  });

  it('uses the gathered clue names when note tabs previews and files a ready evidence route', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-route-v2-clue-backed-file-seed');
    seededSave.selectedOutingSupportId = 'note-tabs';
    seededSave.completedFieldRequestIds = ['forest-hidden-hollow'];
    seededSave.routeV2Progress = {
      requestId: 'forest-moisture-holders',
      status: 'ready-to-synthesize',
      landmarkEntryIds: [],
      evidenceSlots: [
        { slotId: 'shelter', entryId: 'licorice-fern' },
        { slotId: 'ground', entryId: 'seep-stone' },
        { slotId: 'living', entryId: 'banana-slug' },
      ],
    };
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('forest');
    tapKey(fakeWindow, 'm');
    let state = readState(fakeWindow);
    const firstMenuActions = state.menu?.availableActions ?? [];
    for (let index = 0; state.menu?.selectedAction !== 'world-map' && index <= firstMenuActions.length; index += 1) {
      tapKey(fakeWindow, 'ArrowDown');
      state = readState(fakeWindow);
    }
    expect(state.menu?.selectedAction).toBe('world-map');
    tapKey(fakeWindow, 'Enter');
    state = advanceUntil(fakeWindow, (nextState) => nextState.scene === 'world-map');
    expect(state.worldMap?.focusedLocationId).toBe('forest');

    tapKey(fakeWindow, 'm');
    state = readState(fakeWindow);
    const stationMenuActions = state.menu?.availableActions ?? [];
    for (let index = 0; state.menu?.selectedAction !== 'field-station' && index <= stationMenuActions.length; index += 1) {
      tapKey(fakeWindow, 'ArrowDown');
      state = readState(fakeWindow);
    }
    expect(state.menu?.selectedAction).toBe('field-station');
    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.fieldStation?.seasonWrap).toMatchObject({
      label: 'MOISTURE HOLDERS',
      text: 'Licorice Fern, Seep Stone, and Banana Slug show the hollow holding moisture.',
    });

    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.fieldRequestNotice).toMatchObject({
      title: 'MOISTURE HOLDERS',
      text: 'Licorice Fern, Seep Stone, and Banana Slug show the hollow holding moisture.',
    });
    expect(state.activeFieldRequest).toMatchObject({
      id: 'forest-survey-slice',
      progressLabel: '0/4 clues',
    });
  });

  it('keeps Short Season as the title while note tabs files a thaw-window page stamp', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-thaw-window-file-display-seed');
    seededSave.selectedOutingSupportId = 'note-tabs';
    seededSave.completedFieldRequestIds = [
      'forest-hidden-hollow',
      'forest-moisture-holders',
      'forest-survey-slice',
      'coastal-shelter-shift',
      'coastal-edge-moisture',
      'treeline-stone-shelter',
    ];
    seededSave.routeV2Progress = {
      requestId: 'tundra-short-season',
      status: 'ready-to-synthesize',
      landmarkEntryIds: [],
      evidenceSlots: [
        { slotId: 'first-bloom', entryId: 'purple-saxifrage' },
        { slotId: 'wet-tuft', entryId: 'cottongrass' },
        { slotId: 'brief-fruit', entryId: 'cloudberry' },
      ],
    };
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('tundra');
    tapKey(fakeWindow, 'm');
    tapKey(fakeWindow, 'Enter');
    let state = advanceUntil(fakeWindow, (nextState) => nextState.scene === 'world-map');
    expect(state.worldMap?.focusedLocationId).toBe('tundra');

    tapKey(fakeWindow, 'm');
    state = readState(fakeWindow);
    const stationMenuActions = state.menu?.availableActions ?? [];
    for (let index = 0; state.menu?.selectedAction !== 'field-station' && index <= stationMenuActions.length; index += 1) {
      tapKey(fakeWindow, 'ArrowDown');
      state = readState(fakeWindow);
    }
    expect(state.menu?.selectedAction).toBe('field-station');
    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.mode).toBe('field-station');
    expect(state.fieldStation?.seasonWrap).toMatchObject({
      label: 'SHORT SEASON',
      text: 'Thaw Window. Purple Saxifrage, Cottongrass, and Cloudberry trace the tundra\'s short thaw window.',
    });

    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(seededSave.routeV2Progress).toBeNull();
    expect(state.fieldRequestNotice).toMatchObject({
      title: 'SHORT SEASON',
      text: 'Thaw Window. Purple Saxifrage, Cottongrass, and Cloudberry trace the tundra\'s short thaw window.',
    });
    expect(state.activeFieldRequest).toMatchObject({
      id: 'tundra-survey-slice',
      progressLabel: '0/4 clues',
    });
  });

  it('uses the four-leg Low Fell note when note tabs previews and files the edge-line close', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-low-fell-four-leg-file-seed');
    seededSave.selectedOutingSupportId = 'note-tabs';
    seededSave.completedFieldRequestIds = [
      'forest-hidden-hollow',
      'forest-moisture-holders',
      'forest-survey-slice',
      'coastal-shelter-shift',
      'coastal-edge-moisture',
      'treeline-stone-shelter',
      'tundra-short-season',
      'tundra-survey-slice',
      'scrub-edge-pattern',
      'forest-cool-edge',
    ];
    seededSave.routeV2Progress = {
      requestId: 'treeline-low-fell',
      status: 'ready-to-synthesize',
      landmarkEntryIds: [],
      evidenceSlots: [
        { slotId: 'last-tree-shape', entryId: 'krummholz-spruce' },
        { slotId: 'low-wood', entryId: 'dwarf-birch' },
        { slotId: 'fell-bloom', entryId: 'mountain-avens' },
        { slotId: 'low-rest', entryId: 'arctic-willow' },
      ],
    };
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('treeline');
    tapKey(fakeWindow, 'm');
    tapKey(fakeWindow, 'Enter');
    let state = advanceUntil(fakeWindow, (nextState) => nextState.scene === 'world-map');
    expect(state.worldMap?.focusedLocationId).toBe('treeline');

    tapKey(fakeWindow, 'm');
    state = readState(fakeWindow);
    const stationMenuActions = state.menu?.availableActions ?? [];
    for (let index = 0; state.menu?.selectedAction !== 'field-station' && index <= stationMenuActions.length; index += 1) {
      tapKey(fakeWindow, 'ArrowDown');
      state = readState(fakeWindow);
    }
    expect(state.menu?.selectedAction).toBe('field-station');
    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.mode).toBe('field-station');
    expect(state.fieldStation?.seasonWrap).toMatchObject({
      label: 'LOW FELL',
      text: 'Krummholz Spruce, Dwarf Birch, Mountain Avens, and Arctic Willow now trace the full drop from treeline shelter into open fell.',
    });

    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(seededSave.routeV2Progress).toBeNull();
    expect(state.fieldRequestNotice).toMatchObject({
      title: 'LOW FELL',
      text: 'Krummholz Spruce, Dwarf Birch, Mountain Avens, and Arctic Willow now trace the full drop from treeline shelter into open fell.',
    });
    expect(state.activeFieldRequest).toMatchObject({
      id: 'forest-expedition-upper-run',
      progressLabel: 'Go To Forest Trail',
    });
  });

  it('lets the player follow the new beach lee pocket and reach its shelter carriers', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-lee-pocket-seed');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');

    const state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) =>
        nextState.zoneId === 'lee-pocket' &&
        nextState.player?.x >= 308 &&
        (nextState.nearbyInspectables.some((entity: any) => entity.entryId === 'driftwood-log') ||
          nextState.nearbyInspectables.some((entity: any) => entity.entryId === 'bull-kelp-wrack') ||
          nextState.nearbyInspectables.some((entity: any) => entity.entryId === 'pacific-sand-crab')),
      520,
    );

    expect(state.zoneId).toBe('lee-pocket');
    expect(state.player?.y).toBeGreaterThanOrEqual(111);
    expect(
      state.nearbyInspectables.some((entity: any) =>
        ['driftwood-log', 'bull-kelp-wrack', 'pacific-sand-crab'].includes(entity.entryId),
      ),
    ).toBe(true);
  });

  it('lets the player climb the new dune crest without colliding with the inland beach door', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-dune-crest-seed');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');

    advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) => nextState.zoneId === 'dry-sand' && nextState.player?.x >= 188,
      360,
    );

    fakeWindow.dispatchEvent({ type: 'keydown', key: 'ArrowRight', preventDefault() {} });
    fakeWindow.dispatchEvent({ type: 'keydown', key: 'Space', preventDefault() {} });
    fakeWindow.advanceTime?.(16);
    fakeWindow.dispatchEvent({ type: 'keyup', key: 'Space', preventDefault() {} });

    let crestState: any = null;
    for (let index = 0; index < 120; index += 1) {
      fakeWindow.advanceTime?.(16);
      const nextState = readState(fakeWindow);
      if (
          Math.abs(nextState.player?.vy ?? 999) <= 6 &&
          (nextState.player?.x ?? 0) >= 268 &&
          (nextState.player?.x ?? 999) <= 308 &&
          (nextState.player?.y ?? 0) >= 99 &&
          (nextState.player?.y ?? 999) <= 104
        ) {
          crestState = nextState;
          break;
      }
    }

    if (!crestState) {
      throw new Error(`beach-dune-crest ${JSON.stringify(readState(fakeWindow))}`);
    }

    expect(crestState.zoneId).toBe('dry-sand');
    expect(crestState.nearbyDoor?.inRange).toBe(false);
    expect(crestState.nearbyTravelTarget ?? null).toBeNull();
    expect(
      crestState.nearbyInspectables.some((entity: any) =>
        ['dune-lupine', 'sand-verbena', 'beach-pea'].includes(entity.entryId),
      ),
    ).toBe(true);

    fakeWindow.dispatchEvent({ type: 'keyup', key: 'ArrowRight', preventDefault() {} });
    fakeWindow.advanceTime?.(16);
    holdKey(fakeWindow, 'ArrowRight', 40);
    const recoveredState = readState(fakeWindow);
    expect(['dry-sand', 'lee-pocket']).toContain(recoveredState.zoneId);
    expect(recoveredState.player?.x).toBeGreaterThan(crestState.player?.x ?? 0);
    expect(recoveredState.player?.y).toBeGreaterThan(crestState.player?.y ?? 0);
  });

  it('lets the player follow the new tidepool approach and recover back into the shoreline flow', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-tidepool-approach-seed');
    persistSave(seededSave);
    const originalStartPosition = { ...beachBiome.startPosition };
    beachBiome.startPosition = { x: 448, y: 92 };

    try {
      const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
      createGame(canvas, seededSave);

      tapKey(fakeWindow, 'Enter');

      for (let index = 0; index < 20; index += 1) {
        fakeWindow.advanceTime?.(16);
      }

      fakeWindow.dispatchEvent({ type: 'keydown', key: 'ArrowRight', preventDefault() {} });
      fakeWindow.dispatchEvent({ type: 'keydown', key: 'Space', preventDefault() {} });
      fakeWindow.advanceTime?.(16);
      fakeWindow.dispatchEvent({ type: 'keyup', key: 'Space', preventDefault() {} });

      let overlookState: any = null;
      for (let index = 0; index < 150; index += 1) {
        fakeWindow.advanceTime?.(16);
        const nextState = readState(fakeWindow);
        if (
          Math.abs(nextState.player?.vy ?? 999) <= 1 &&
          (nextState.player?.x ?? 0) >= 498 &&
          (nextState.player?.x ?? 999) <= 562 &&
          (nextState.player?.y ?? 0) >= 100 &&
          (nextState.player?.y ?? 999) <= 108
        ) {
          overlookState = nextState;
          break;
        }
      }

      if (!overlookState) {
        throw new Error(`beach-tidepool-overlook ${JSON.stringify(readState(fakeWindow))}`);
      }

      expect(['tide-line', 'tidepool']).toContain(overlookState.zoneId);
      expect(
        overlookState.nearbyInspectables.some((entity: any) =>
          ['bull-kelp-wrack', 'pacific-sand-crab', 'sand-dollar-test'].includes(entity.entryId),
        ),
      ).toBe(true);

      fakeWindow.dispatchEvent({ type: 'keyup', key: 'ArrowRight', preventDefault() {} });
      fakeWindow.advanceTime?.(16);
      holdKey(fakeWindow, 'ArrowLeft', 70);
      const recoveredState = readState(fakeWindow);
      expect(['tide-line', 'tidepool']).toContain(recoveredState.zoneId);
      expect(recoveredState.player?.x).toBeLessThan(overlookState.player?.x ?? 0);
    } finally {
      beachBiome.startPosition = originalStartPosition;
    }
  });

  it('shows climb hints and lets the player follow the deeper root-hollow cave route', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-tree-climb-seed');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('forest');

    let state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) => nextState.zoneId === 'root-hollow' && nextState.player?.x >= 326,
      520,
    );
    expect(state.zoneId).toBe('root-hollow');
    expect(state.camera?.y).toBeGreaterThan(0);
    expect(state.nearbyClimbable).toMatchObject({
      id: 'root-hollow-fir-trunk',
      inRange: true,
    });

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowUp',
      (nextState) => nextState.player?.climbing && nextState.player?.activeClimbableId === 'root-hollow-fir-trunk',
      80,
    );
    expect(state.player).toMatchObject({
      climbing: true,
      activeClimbableId: 'root-hollow-fir-trunk',
    });

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowUp',
      (nextState) => nextState.player?.climbing && nextState.player?.y <= 98,
      80,
    );
    expect(state.player?.y).toBeLessThanOrEqual(98);

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) => !nextState.player?.climbing && nextState.player?.y <= 98 && nextState.player?.x >= 340,
      80,
    );
    expect(state.player).toMatchObject({
      climbing: false,
    });
    expect(state.player?.y).toBeLessThanOrEqual(98);
    expect(
      state.nearbyInspectables.some((entity: any) =>
        ['licorice-fern', 'tree-lungwort'].includes(entity.entryId),
      ),
    ).toBe(true);

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) =>
        nextState.player?.y <= 98 &&
        nextState.nearbyClimbable?.id === 'root-hollow-cave-trunk',
      120,
    );
    expect(state.nearbyClimbable).toMatchObject({
      id: 'root-hollow-cave-trunk',
      inRange: true,
    });

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowUp',
      (nextState) => nextState.player?.climbing && nextState.player?.activeClimbableId === 'root-hollow-cave-trunk',
      80,
    );
    expect(state.player).toMatchObject({
      climbing: true,
      activeClimbableId: 'root-hollow-cave-trunk',
    });

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowUp',
      (nextState) => nextState.player?.climbing && nextState.player?.y <= 80,
      80,
    );
    expect(state.player?.y).toBeLessThanOrEqual(80);

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) => !nextState.player?.climbing && nextState.player?.y <= 84 && nextState.player?.x >= 406,
      120,
    );
    expect(state.player).toMatchObject({
      climbing: false,
    });
    expect(state.player?.y).toBeLessThanOrEqual(84);
    expect(
      state.nearbyInspectables.some((entity: any) =>
        ['licorice-fern', 'tree-lungwort', 'ensatina'].includes(entity.entryId),
      ),
    ).toBe(true);
  });

  it('lets the player descend through the seep pocket into a tucked lower basin pocket and recover through the brighter return', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-seep-pocket-seed');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('forest');

    let state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) => nextState.zoneId === 'seep-pocket' && nextState.player?.x >= 356,
      640,
    );
    expect(state.zoneId).toBe('seep-pocket');
    expect(state.player?.y).toBeGreaterThanOrEqual(168);
    expect(state.camera?.y).toBeGreaterThanOrEqual(48);
    expect(
      state.nearbyInspectables.some((entity: any) =>
        ['seep-stone', 'tree-lungwort', 'banana-slug'].includes(entity.entryId),
      ),
    ).toBe(true);

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) =>
        nextState.zoneId === 'stone-basin' &&
        nextState.player?.x >= 366 &&
        nextState.player?.y >= 208,
      320,
    );
    expect(state.zoneId).toBe('stone-basin');
    expect(state.player?.y).toBeGreaterThanOrEqual(208);
    expect(state.visibleVerticalCueIds).toContain('stone-basin-return-light');
    expect(
      state.nearbyInspectables.some((entity: any) =>
        ['tree-lungwort', 'banana-slug', 'ensatina'].includes(entity.entryId),
      ),
    ).toBe(true);

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) =>
        ['stone-basin', 'filtered-return'].includes(nextState.zoneId ?? '') &&
        nextState.player?.x >= 390 &&
        nextState.nearbyClimbable?.id === 'root-hollow-cave-trunk',
      180,
    );
    expect(state.nearbyClimbable).toMatchObject({
      id: 'root-hollow-cave-trunk',
      inRange: true,
    });

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) => nextState.zoneId === 'filtered-return' && nextState.player?.x >= 402,
      220,
    );
    expect(state.zoneId).toBe('filtered-return');
    expect(state.player?.y).toBeLessThanOrEqual(182);
    expect(
      state.nearbyInspectables.some((entity: any) =>
        ['redwood-sorrel', 'sword-fern', 'tree-lungwort'].includes(entity.entryId),
      ),
    ).toBe(true);

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) => nextState.zoneId === 'log-run' && nextState.player?.x >= 438,
      220,
    );
    expect(state.zoneId).toBe('log-run');
    expect(state.player?.y).toBeLessThanOrEqual(126);
  });

  it('lets the player catch the cave trunk from a slightly offset recovery position', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-cave-trunk-catch-seed');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('forest');

    let state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) =>
        nextState.zoneId === 'stone-basin' &&
        nextState.player?.x >= 382 &&
        nextState.nearbyClimbable?.id === 'root-hollow-cave-trunk',
      860,
    );
    expect(state.zoneId).toBe('stone-basin');
    expect(state.player?.x).toBeLessThanOrEqual(395);
    expect(state.nearbyClimbable).toMatchObject({
      id: 'root-hollow-cave-trunk',
      inRange: true,
    });

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowUp',
      (nextState) => nextState.player?.climbing && nextState.player?.activeClimbableId === 'root-hollow-cave-trunk',
      80,
    );
    expect(state.player).toMatchObject({
      climbing: true,
      activeClimbableId: 'root-hollow-cave-trunk',
    });
  });

  it('adds a calmer upper-return nook so the cave family reads like a loop instead of a one-way corridor', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-cave-loop-seed');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('forest');

    let state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) =>
        nextState.zoneId === 'stone-basin' &&
        nextState.player?.x >= 382 &&
        nextState.nearbyClimbable?.id === 'root-hollow-cave-trunk',
      860,
    );
    expect(state.zoneId).toBe('stone-basin');
    expect(state.visibleVerticalCueIds).toContain('stone-basin-return-light');
    expect(state.nearbyClimbable).toMatchObject({
      id: 'root-hollow-cave-trunk',
      inRange: true,
    });

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowUp',
      (nextState) => nextState.player?.climbing && nextState.player?.activeClimbableId === 'root-hollow-cave-trunk',
      120,
    );
    expect(state.player).toMatchObject({
      climbing: true,
      activeClimbableId: 'root-hollow-cave-trunk',
    });

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowUp',
      (nextState) => nextState.player?.climbing && nextState.player?.y <= 80,
      220,
    );
    expect(state.player?.y).toBeLessThanOrEqual(80);

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowLeft',
      (nextState) =>
        !nextState.player?.climbing &&
        nextState.zoneId === 'stone-basin' &&
        nextState.player?.x <= 396 &&
        nextState.player?.y <= 98,
      100,
    );
    expect(state.player?.y).toBeLessThanOrEqual(98);
    expect(
      state.nearbyInspectables.some((entity: any) => entity.entryId === 'tree-lungwort'),
    ).toBe(true);
    expect(state.visibleVerticalCueIds).toContain('stone-basin-return-light');

    state = advanceWhileHoldingKeysUntil(
      fakeWindow,
      ['ArrowLeft'],
      (nextState) =>
        !nextState.player?.climbing &&
        nextState.zoneId === 'root-hollow' &&
        nextState.player?.x <= 338 &&
        nextState.player?.y <= 128,
      180,
    );
    expect(state.zoneId).toBe('root-hollow');
    expect(state.player?.y).toBeLessThanOrEqual(128);
  });

  it('adds a tiny cave-mouth observation sill and keeps the exit carry clean', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-cave-mouth-sill-seed');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('forest');

    let state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) =>
        nextState.zoneId === 'stone-basin' &&
        nextState.player?.x >= 382 &&
        nextState.nearbyClimbable?.id === 'root-hollow-cave-trunk',
      860,
    );
    expect(state.zoneId).toBe('stone-basin');
    expect(state.visibleVerticalCueIds).toContain('stone-basin-return-light');

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowUp',
      (nextState) => nextState.player?.climbing && nextState.player?.activeClimbableId === 'root-hollow-cave-trunk',
      120,
    );
    expect(state.player).toMatchObject({
      climbing: true,
      activeClimbableId: 'root-hollow-cave-trunk',
    });

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowUp',
      (nextState) => nextState.player?.climbing && nextState.player?.y <= 80,
      220,
    );
    expect(state.player?.y).toBeLessThanOrEqual(80);

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) =>
        !nextState.player?.climbing &&
        nextState.zoneId === 'filtered-return' &&
        (nextState.player?.x ?? 0) >= 426 &&
        (nextState.player?.x ?? 999) <= 432 &&
        (nextState.player?.y ?? 0) >= 96 &&
        (nextState.player?.y ?? 999) <= 106,
      180,
    );
    expect(state.zoneId).toBe('filtered-return');
    expect(state.visibleVerticalCueIds).toContain('stone-basin-return-light');
    expect(
      state.nearbyInspectables.some((entity: any) => entity.entryId === 'seep-moss-mat'),
    ).toBe(true);

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) =>
        !nextState.player?.climbing &&
        nextState.zoneId === 'log-run' &&
        (nextState.player?.x ?? 0) >= 434 &&
        (nextState.player?.y ?? 999) <= 120,
      120,
    );
    expect(state.zoneId).toBe('log-run');
    expect(state.player?.y).toBeLessThanOrEqual(120);
  });

  it('hides the tiny vertical cues when hint markers are turned off', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-vertical-cues-hidden-seed');
    seededSave.settings.showInspectHints = false;
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('forest');

    const state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) => nextState.zoneId === 'stone-basin' && nextState.player?.x >= 382,
      820,
    );

    expect(state.zoneId).toBe('stone-basin');
    expect(state.visibleVerticalCueIds).toEqual([]);
  });

  it('turns the treeline lee pocket into a compact crest-and-notch loop', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-treeline-lee-lift-seed');
    persistSave(seededSave);
    const originalTreelineStartPosition = { ...treelineBiome.startPosition };
    treelineBiome.startPosition = { x: 352, y: 128 };

    try {
      const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
      const game = createGame(canvas, seededSave);

      tapKey(fakeWindow, 'Enter');
      game.enterBiome('treeline');

      let state = readState(fakeWindow);
      expect(state.zoneId).toBe('dwarf-shrub');
      expect(state.player?.x).toBeGreaterThanOrEqual(344);
      expect(state.player?.x).toBeLessThanOrEqual(352);
      expect(state.player?.y).toBeGreaterThanOrEqual(110);

      fakeWindow.dispatchEvent({ type: 'keydown', key: 'ArrowRight', preventDefault() {} });
      for (let index = 0; index < 30; index += 1) {
        fakeWindow.advanceTime?.(16);
      }
      fakeWindow.dispatchEvent({ type: 'keyup', key: 'ArrowRight', preventDefault() {} });
      fakeWindow.advanceTime?.(16);

      fakeWindow.dispatchEvent({ type: 'keydown', key: 'ArrowRight', preventDefault() {} });
      fakeWindow.dispatchEvent({ type: 'keydown', key: 'Space', preventDefault() {} });
      fakeWindow.advanceTime?.(16);
      fakeWindow.dispatchEvent({ type: 'keyup', key: 'Space', preventDefault() {} });

      let foundState: any = null;
      for (let index = 0; index < 90; index += 1) {
        fakeWindow.advanceTime?.(16);
        const nextState = readState(fakeWindow);
        if (
          !nextState.player?.climbing &&
          (nextState.player?.x ?? 0) >= 398 &&
          (nextState.player?.x ?? 999) <= 430 &&
          (nextState.player?.y ?? 999) <= 104
        ) {
          foundState = nextState;
        }
      }
      expect(foundState).not.toBeNull();
      state = foundState;
      expect(state.zoneId).toBe('dwarf-shrub');

      fakeWindow.dispatchEvent({ type: 'keyup', key: 'ArrowRight', preventDefault() {} });
      fakeWindow.advanceTime?.(16);

      for (let index = 0; index < 12; index += 1) {
        fakeWindow.advanceTime?.(16);
      }

      fakeWindow.dispatchEvent({ type: 'keydown', key: 'ArrowRight', preventDefault() {} });
      for (let index = 0; index < 8; index += 1) {
        fakeWindow.advanceTime?.(16);
      }
      fakeWindow.dispatchEvent({ type: 'keydown', key: 'Space', preventDefault() {} });
      fakeWindow.advanceTime?.(16);
      fakeWindow.dispatchEvent({ type: 'keyup', key: 'Space', preventDefault() {} });

      foundState = null;
      for (let index = 0; index < 60; index += 1) {
        fakeWindow.advanceTime?.(16);
        const nextState = readState(fakeWindow);
        if (
          !nextState.player?.climbing &&
          (nextState.player?.x ?? 0) >= 453 &&
          (nextState.player?.x ?? 999) <= 460 &&
          (nextState.player?.y ?? 999) <= 95
        ) {
          foundState = nextState;
          break;
        }
      }
      expect(foundState).not.toBeNull();
      state = foundState;
      expect(state.zoneId).toBe('dwarf-shrub');
      expect(state.visibleVerticalCueIds).toContain('lee-pocket-rime-light');
      expect(
        state.nearbyInspectables.some((entity: any) => entity.entryId === 'moss-campion'),
      ).toBe(true);

      fakeWindow.dispatchEvent({ type: 'keyup', key: 'ArrowRight', preventDefault() {} });
      fakeWindow.advanceTime?.(16);

      foundState = null;
      fakeWindow.dispatchEvent({ type: 'keydown', key: 'ArrowRight', preventDefault() {} });
      for (let index = 0; index < 60; index += 1) {
        fakeWindow.advanceTime?.(16);
        const nextState = readState(fakeWindow);
        if (
          !nextState.player?.climbing &&
          Math.abs(nextState.player?.vy ?? 999) <= 1 &&
          (nextState.player?.x ?? 0) >= 468 &&
          (nextState.player?.x ?? 999) <= 490 &&
          (nextState.player?.y ?? 0) >= 99 &&
          (nextState.player?.y ?? 999) <= 101
        ) {
          foundState = nextState;
          break;
        }
      }
      expect(foundState).not.toBeNull();
      state = foundState;
      expect(state.zoneId).toBe('dwarf-shrub');
      expect(state.visibleVerticalCueIds).toContain('lee-pocket-rime-light');

      fakeWindow.dispatchEvent({ type: 'keyup', key: 'ArrowRight', preventDefault() {} });
      fakeWindow.advanceTime?.(16);

      fakeWindow.dispatchEvent({ type: 'keydown', key: 'ArrowRight', preventDefault() {} });
      fakeWindow.dispatchEvent({ type: 'keydown', key: 'Space', preventDefault() {} });
      fakeWindow.advanceTime?.(16);
      fakeWindow.dispatchEvent({ type: 'keyup', key: 'Space', preventDefault() {} });

      foundState = null;
      for (let index = 0; index < 90; index += 1) {
        fakeWindow.advanceTime?.(16);
        const nextState = readState(fakeWindow);
        if (
          !nextState.player?.climbing &&
          (nextState.player?.x ?? 0) >= 506 &&
          (nextState.player?.x ?? 999) <= 520 &&
          (nextState.player?.y ?? 999) <= 89
        ) {
          foundState = nextState;
          break;
        }
      }
      expect(foundState).not.toBeNull();
      state = foundState;
      expect(state.zoneId).toBe('lichen-fell');
      expect(
        state.nearbyInspectables.some(
          (entity: any) => entity.entryId === 'mountain-avens' && entity.x >= 510 && entity.y <= 80,
        ),
      ).toBe(true);

      fakeWindow.dispatchEvent({ type: 'keyup', key: 'ArrowRight', preventDefault() {} });
      fakeWindow.advanceTime?.(16);

      state = advanceWhileHoldingKeyUntil(
        fakeWindow,
        'ArrowRight',
        (nextState) =>
          !nextState.player?.climbing &&
          nextState.zoneId === 'lichen-fell' &&
          Math.abs(nextState.player?.vy ?? 999) <= 1 &&
          (nextState.player?.x ?? 0) >= 540 &&
          (nextState.player?.x ?? 999) <= 556 &&
          (nextState.player?.y ?? 0) >= 100 &&
          (nextState.player?.y ?? 999) <= 104,
        160,
      );
      expect(state.zoneId).toBe('lichen-fell');
      expect(state.player?.y).toBeGreaterThanOrEqual(100);
      expect(state.player?.y).toBeLessThanOrEqual(104);

      state = advanceWhileHoldingKeyUntil(
        fakeWindow,
        'ArrowRight',
        (nextState) =>
          !nextState.player?.climbing &&
          nextState.zoneId === 'lichen-fell' &&
          (nextState.player?.x ?? 0) >= 560 &&
          (nextState.player?.y ?? 999) <= 112,
        160,
      );
      expect(state.zoneId).toBe('lichen-fell');
      expect(state.player?.y).toBeLessThanOrEqual(112);
    } finally {
      treelineBiome.startPosition = originalTreelineStartPosition;
    }
  });

  it('turns the tundra thaw-skirt route into one fuller inland relief and snow-edge family', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-tundra-relief-seed');
    persistSave(seededSave);
    const originalTundraStartPosition = { ...tundraBiome.startPosition };
    tundraBiome.startPosition = { x: 332, y: 120 };

    try {
      const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
      const game = createGame(canvas, seededSave);

      tapKey(fakeWindow, 'Enter');
      game.enterBiome('tundra');

      let state = readState(fakeWindow);
      expect(state.zoneId).toBe('thaw-skirt');
      expect(state.player?.x).toBeGreaterThanOrEqual(324);
      expect(state.player?.x).toBeLessThanOrEqual(340);

      fakeWindow.dispatchEvent({ type: 'keydown', key: 'ArrowRight', preventDefault() {} });
      for (let index = 0; index < 22; index += 1) {
        fakeWindow.advanceTime?.(16);
      }
      fakeWindow.dispatchEvent({ type: 'keydown', key: 'Space', preventDefault() {} });
      fakeWindow.advanceTime?.(16);
      fakeWindow.dispatchEvent({ type: 'keyup', key: 'Space', preventDefault() {} });

      let foundState: any = null;
      for (let index = 0; index < 90; index += 1) {
        fakeWindow.advanceTime?.(16);
        const nextState = readState(fakeWindow);
        if (
          !nextState.player?.climbing &&
          (nextState.player?.x ?? 0) >= 352 &&
          (nextState.player?.x ?? 999) <= 430 &&
          (nextState.player?.y ?? 999) <= 94
        ) {
          foundState = nextState;
          break;
        }
      }
      expect(foundState).not.toBeNull();
      state = foundState;
      expect(state.zoneId).toBe('thaw-skirt');

      foundState = null;
      for (let index = 0; index < 140; index += 1) {
        fakeWindow.advanceTime?.(16);
        const nextState = readState(fakeWindow);
        if (
          !nextState.player?.climbing &&
          Math.abs(nextState.player?.vy ?? 999) <= 1 &&
          (nextState.player?.x ?? 0) >= 420 &&
          (nextState.player?.x ?? 999) <= 444 &&
          (nextState.player?.y ?? 0) >= 94 &&
          (nextState.player?.y ?? 999) <= 102
        ) {
          foundState = nextState;
          break;
        }
      }
      expect(foundState).not.toBeNull();
      state = foundState;
      expect(state.zoneId).toBe('frost-ridge');

      state = advanceWhileHoldingKeyUntil(
        fakeWindow,
        'ArrowRight',
        (nextState) =>
          !nextState.player?.climbing &&
          nextState.zoneId === 'frost-ridge' &&
          (nextState.player?.x ?? 0) >= 448 &&
          (nextState.player?.y ?? 999) <= 102,
        90,
      );
      expect(state.zoneId).toBe('frost-ridge');
      expect(state.player?.y).toBeLessThanOrEqual(102);

      state = advanceWhileHoldingKeyUntil(
        fakeWindow,
        'ArrowRight',
        (nextState) =>
          !nextState.player?.climbing &&
          nextState.zoneId === 'frost-ridge' &&
          (nextState.player?.x ?? 0) >= 500 &&
          (nextState.player?.x ?? 999) <= 522 &&
          (nextState.player?.y ?? 999) <= 100,
        120,
      );
      expect(state.zoneId).toBe('frost-ridge');
      expect(state.player?.x).toBeGreaterThanOrEqual(500);
      expect(state.player?.x).toBeLessThanOrEqual(522);
      expect(state.player?.y).toBeLessThanOrEqual(100);

      state = advanceWhileHoldingKeyUntil(
        fakeWindow,
        'ArrowRight',
        (nextState) =>
          !nextState.player?.climbing &&
          nextState.zoneId === 'meltwater-edge' &&
          (nextState.player?.x ?? 0) >= 538 &&
          (nextState.player?.x ?? 999) <= 560 &&
          (nextState.player?.y ?? 999) <= 108,
        120,
      );
      expect(state.zoneId).toBe('meltwater-edge');
      expect(state.player?.x).toBeGreaterThanOrEqual(538);
      expect(state.player?.x).toBeLessThanOrEqual(560);
      expect(state.player?.y).toBeLessThanOrEqual(108);
      expect(
        state.nearbyInspectables.some((entity: any) => entity.entryId === 'tussock-thaw-channel'),
      ).toBe(true);

      state = advanceWhileHoldingKeyUntil(
        fakeWindow,
        'ArrowRight',
        (nextState) =>
          !nextState.player?.climbing &&
          nextState.zoneId === 'meltwater-edge' &&
          (nextState.player?.x ?? 0) >= 576 &&
          (nextState.player?.x ?? 999) <= 600 &&
          (nextState.player?.y ?? 999) <= 112,
        120,
      );
      expect(state.zoneId).toBe('meltwater-edge');
      expect(state.player?.x).toBeGreaterThanOrEqual(576);
      expect(state.player?.x).toBeLessThanOrEqual(600);
      expect(state.player?.y).toBeLessThanOrEqual(112);
      expect(
        state.nearbyInspectables.some((entity: any) =>
          entity.entryId === 'arctic-willow' || entity.entryId === 'cottongrass',
        ),
      ).toBe(true);

      state = advanceWhileHoldingKeyUntil(
        fakeWindow,
        'ArrowRight',
        (nextState) =>
          !nextState.player?.climbing &&
          nextState.zoneId === 'meltwater-edge' &&
          (nextState.player?.x ?? 0) >= 606 &&
          (nextState.player?.y ?? 999) <= 116,
        120,
      );
      expect(state.zoneId).toBe('meltwater-edge');
      expect(state.player?.x).toBeGreaterThanOrEqual(606);
      expect(state.player?.y).toBeLessThanOrEqual(116);
    } finally {
      tundraBiome.startPosition = originalTundraStartPosition;
    }
  });

  it('shows the new exposed tundra anchors near the wind-bluff start', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-tundra-exposed-seed');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('tundra');

    const state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) =>
        nextState.zoneId === 'wind-bluff' &&
        nextState.nearbyInspectables.some((entity: any) => entity.entryId === 'frost-heave-hummock') &&
        nextState.nearbyInspectables.some((entity: any) => ['reindeer-lichen', 'moss-campion'].includes(entity.entryId)),
      60,
    );

    expect(state.zoneId).toBe('wind-bluff');
    expect(state.nearbyInspectables.some((entity: any) => entity.entryId === 'frost-heave-hummock')).toBe(true);
    expect(state.nearbyInspectables.some((entity: any) => ['reindeer-lichen', 'moss-campion'].includes(entity.entryId))).toBe(true);
  });

  it('threads the cave-return route past a fallen old-wood bridge before old-growth', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-old-wood-bridge-seed');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('forest');

    let state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) => nextState.zoneId === 'creek-bend' && nextState.player?.x >= 600,
      1200,
    );
    expect(state.zoneId).toBe('creek-bend');
    expect(
      state.nearbyInspectables.some((entity: any) =>
        ['fallen-giant-log', 'tree-lungwort'].includes(entity.entryId),
      ),
    ).toBe(true);

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) => nextState.zoneId === 'old-growth-pocket' && nextState.player?.x >= 640,
      260,
    );
    expect(state.zoneId).toBe('old-growth-pocket');
    expect(state.camera?.y).toBeGreaterThanOrEqual(18);
  });

  it('keeps one optional elevated crossover from the cave-return side into the old-growth climb', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-cave-canopy-crossover-seed');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('forest');

    let state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) => nextState.zoneId === 'creek-bend' && nextState.player?.x >= 586,
      1200,
    );
    expect(state.zoneId).toBe('creek-bend');
    expect(state.player?.y).toBeGreaterThanOrEqual(100);

    fakeWindow.dispatchEvent({ type: 'keydown', key: 'ArrowRight', preventDefault() {} });
    fakeWindow.dispatchEvent({ type: 'keydown', key: ' ', preventDefault() {} });
    for (let index = 0; index < 24; index += 1) {
      fakeWindow.advanceTime?.(16);
    }
    fakeWindow.dispatchEvent({ type: 'keyup', key: ' ', preventDefault() {} });

    state = advanceUntil(
      fakeWindow,
      (nextState) =>
        nextState.zoneId === 'old-growth-pocket' &&
        nextState.player?.x >= 694 &&
        nextState.player?.y <= 108 &&
        nextState.nearbyClimbable?.id === 'old-growth-main-trunk',
      140,
    );
    fakeWindow.dispatchEvent({ type: 'keyup', key: 'ArrowRight', preventDefault() {} });
    fakeWindow.advanceTime?.(16);

    expect(state.zoneId).toBe('old-growth-pocket');
    expect(state.player?.y).toBeLessThanOrEqual(108);
    expect(state.nearbyClimbable).toMatchObject({
      id: 'old-growth-main-trunk',
      inRange: true,
    });
  });

  it('turns the cave-return high run into one carry from log-run through the bridge, hinge light, and giant tree', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-forest-high-run-carry-seed');
    persistSave(seededSave);
    const originalForestStartPosition = { ...forestBiome.startPosition };
    forestBiome.startPosition = { x: 452, y: 90 };

    try {
      const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
      const game = createGame(canvas, seededSave);

      tapKey(fakeWindow, 'Enter');
      game.enterBiome('forest');

      let state = readState(fakeWindow);
      expect(state.zoneId).toBe('log-run');
      expect(state.player?.x).toBeGreaterThanOrEqual(448);
      expect(state.player?.y).toBeLessThanOrEqual(104);

      state = advanceWhileHoldingKeyUntil(
        fakeWindow,
        'ArrowRight',
        (nextState) =>
          nextState.zoneId === 'creek-bend' &&
          (nextState.player?.x ?? 0) >= 580,
        240,
      );
      expect(state.zoneId).toBe('creek-bend');

      state = advanceWhileHoldingKeyUntil(
        fakeWindow,
        'ArrowRight',
        (nextState) =>
          nextState.zoneId === 'old-growth-pocket' &&
          (nextState.player?.x ?? 0) >= 640 &&
          (nextState.player?.x ?? 0) <= 656,
        180,
      );
      expect(state.zoneId).toBe('old-growth-pocket');
      expect(state.player?.x).toBeGreaterThanOrEqual(640);
      expect(state.player?.x).toBeLessThanOrEqual(656);
      expect(state.visibleVerticalCueIds).toContain('old-wood-hinge-light');

      state = advanceWhileHoldingKeyUntil(
        fakeWindow,
        'ArrowRight',
        (nextState) =>
          nextState.zoneId === 'old-growth-pocket' &&
          (nextState.player?.x ?? 0) >= 688 &&
          nextState.nearbyClimbable?.id === 'old-growth-main-trunk',
        280,
      );
      expect(state.zoneId).toBe('old-growth-pocket');
      expect(state.nearbyClimbable).toMatchObject({
        id: 'old-growth-main-trunk',
        inRange: true,
      });
    } finally {
      forestBiome.startPosition = originalForestStartPosition;
    }
  });

  it('adds one tucked trunk-foot nook at the giant-tree arrival and keeps the trunk rejoin clean', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-old-growth-trunk-foot-nook-seed');
    persistSave(seededSave);
    const originalForestStartPosition = { ...forestBiome.startPosition };
    forestBiome.startPosition = { x: 640, y: 142 };

    try {
      const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
      const game = createGame(canvas, seededSave);

      tapKey(fakeWindow, 'Enter');
      game.enterBiome('forest');

      let state = readState(fakeWindow);
      expect(state.zoneId).toBe('old-growth-pocket');
      expect(state.player?.x).toBeGreaterThanOrEqual(640);
      expect(state.player?.x).toBeLessThanOrEqual(648);
      expect(state.player?.y).toBeLessThanOrEqual(146);

      state = advanceWhileHoldingKeyUntil(
        fakeWindow,
        'ArrowRight',
        (nextState) =>
          nextState.zoneId === 'old-growth-pocket' &&
          (nextState.player?.x ?? 0) >= 656,
        40,
      );
      expect(state.zoneId).toBe('old-growth-pocket');

      fakeWindow.dispatchEvent({ type: 'keydown', key: 'ArrowRight', preventDefault() {} });
      fakeWindow.dispatchEvent({ type: 'keydown', key: ' ', preventDefault() {} });
      for (let index = 0; index < 20; index += 1) {
        fakeWindow.advanceTime?.(16);
      }
      fakeWindow.dispatchEvent({ type: 'keyup', key: ' ', preventDefault() {} });

      state = advanceUntil(
        fakeWindow,
        (nextState) =>
          nextState.zoneId === 'old-growth-pocket' &&
          (nextState.player?.x ?? 0) >= 668 &&
          (nextState.player?.x ?? 999) <= 684 &&
          (nextState.player?.y ?? 999) <= 140 &&
          nextState.nearbyInspectables.some((entity: any) => entity.entryId === 'western-hemlock-seedling'),
        80,
      );
      fakeWindow.dispatchEvent({ type: 'keyup', key: 'ArrowRight', preventDefault() {} });
      fakeWindow.advanceTime?.(16);

      expect(
        state.nearbyInspectables.some((entity: any) => entity.entryId === 'western-hemlock-seedling'),
      ).toBe(true);
      expect(state.player?.y).toBeLessThanOrEqual(140);

      state = advanceWhileHoldingKeyUntil(
        fakeWindow,
        'ArrowRight',
        (nextState) =>
          nextState.zoneId === 'old-growth-pocket' &&
          (nextState.player?.x ?? 0) >= 682 &&
          nextState.nearbyClimbable?.id === 'old-growth-main-trunk',
        80,
      );
      expect(state.nearbyClimbable).toMatchObject({
        id: 'old-growth-main-trunk',
        inRange: true,
      });
    } finally {
      forestBiome.startPosition = originalForestStartPosition;
    }
  });

  it('adds an optional old-growth giant-tree climb with a sheltered upper-canopy pocket', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-old-growth-tree-seed');
    persistSave(seededSave);
    const originalForestStartPosition = { ...forestBiome.startPosition };
    forestBiome.startPosition = { x: 700, y: 26 };

    try {
      const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
      const game = createGame(canvas, seededSave);

      tapKey(fakeWindow, 'Enter');
      game.enterBiome('forest');

      let state = readState(fakeWindow);
      expect(state.zoneId).toBe('old-growth-pocket');
      expect(state.player).toMatchObject({
        climbing: false,
      });
      expect(state.player?.x).toBeGreaterThanOrEqual(696);
      expect(state.player?.x).toBeLessThanOrEqual(704);
      expect(state.player?.y).toBeLessThanOrEqual(32);
      expect(state.visibleVerticalCueIds).toContain('old-growth-inner-rest-light');
      expect(
        state.nearbyInspectables.some((entity: any) =>
          ['licorice-fern', 'tree-lungwort'].includes(entity.entryId),
        ),
      ).toBe(true);
    } finally {
      forestBiome.startPosition = originalForestStartPosition;
    }
  });

  it('adds a tucked canopy crook around the inner-rest cue and keeps the return seam readable', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-old-growth-inner-rest-crook-seed');
    persistSave(seededSave);
    const originalForestStartPosition = { ...forestBiome.startPosition };
    forestBiome.startPosition = { x: 652, y: 4 };

    try {
      const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
      const game = createGame(canvas, seededSave);

      tapKey(fakeWindow, 'Enter');
      game.enterBiome('forest');

      let state = readState(fakeWindow);
      expect(state.zoneId).toBe('old-growth-pocket');
      expect(state.visibleVerticalCueIds).toContain('old-growth-inner-rest-light');

      state = advanceWhileHoldingKeyUntil(
        fakeWindow,
        'ArrowRight',
        (nextState) =>
          !nextState.player?.climbing &&
          (nextState.player?.x ?? 0) >= 688 &&
          (nextState.player?.x ?? 999) <= 708 &&
          (nextState.player?.y ?? 0) >= 12 &&
          (nextState.player?.y ?? 999) <= 18,
        80,
      );

      state = advanceWhileHoldingKeyUntil(
        fakeWindow,
        'ArrowLeft',
        (nextState) =>
          !nextState.player?.climbing &&
          (nextState.player?.x ?? 999) <= 686 &&
          (nextState.player?.y ?? 0) >= 12 &&
          (nextState.player?.y ?? 999) <= 18 &&
          nextState.nearbyClimbable?.id === 'old-growth-inner-bark-snag',
        60,
      );

      state = advanceWhileHoldingKeyUntil(
        fakeWindow,
        'ArrowDown',
        (nextState) =>
          nextState.player?.climbing &&
          nextState.player?.activeClimbableId === 'old-growth-inner-bark-snag' &&
          (nextState.player?.y ?? 0) >= 34,
        80,
      );

      state = advanceWhileHoldingKeyUntil(
        fakeWindow,
        'ArrowRight',
        (nextState) =>
          !nextState.player?.climbing &&
          nextState.zoneId === 'old-growth-pocket' &&
          (nextState.player?.x ?? 0) >= 722 &&
          (nextState.player?.x ?? 999) <= 728 &&
          (nextState.player?.y ?? 0) >= 46 &&
          (nextState.player?.y ?? 999) <= 52,
        100,
      );
      expect(state.zoneId).toBe('old-growth-pocket');
      expect(
        state.nearbyInspectables.some((entity: any) =>
          ['canopy-moss-bed', 'old-mans-beard', 'tree-lungwort'].includes(entity.entryId),
        ),
      ).toBe(true);

      state = advanceWhileHoldingKeyUntil(
        fakeWindow,
        'ArrowLeft',
        (nextState) =>
          !nextState.player?.climbing &&
          (nextState.player?.x ?? 999) <= 694 &&
          (nextState.player?.y ?? 0) >= 44 &&
          (nextState.player?.y ?? 999) <= 58 &&
          nextState.nearbyClimbable?.id === 'old-growth-inner-bark-snag',
        140,
      );
      expect(state.nearbyClimbable).toMatchObject({
        id: 'old-growth-inner-bark-snag',
        inRange: true,
      });
    } finally {
      forestBiome.startPosition = originalForestStartPosition;
    }
  });

  it('continues the upper canopy into a tiny bark-window nook and keeps the return snag readable', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-old-growth-bark-window-seed');
    persistSave(seededSave);
    const originalForestStartPosition = { ...forestBiome.startPosition };
    forestBiome.startPosition = { x: 666, y: 14 };

    try {
      const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
      const game = createGame(canvas, seededSave);

      tapKey(fakeWindow, 'Enter');
      game.enterBiome('forest');

      let state = readState(fakeWindow);
      expect(state.zoneId).toBe('old-growth-pocket');
      expect(state.player).toMatchObject({
        climbing: false,
      });
      expect(state.player?.x).toBeGreaterThanOrEqual(662);
      expect(state.player?.x).toBeLessThanOrEqual(670);
      expect(state.player?.y).toBeLessThanOrEqual(20);
      expect(
        state.nearbyInspectables.some((entity: any) => entity.entryId === 'tree-lungwort'),
      ).toBe(true);

      state = advanceWhileHoldingKeyUntil(
        fakeWindow,
        'ArrowRight',
        (nextState) =>
          !nextState.player?.climbing &&
          (nextState.player?.x ?? 0) >= 674 &&
          nextState.nearbyClimbable?.id === 'old-growth-inner-bark-snag',
        80,
      );
      expect(state.nearbyClimbable).toMatchObject({
        id: 'old-growth-inner-bark-snag',
        inRange: true,
      });
    } finally {
      forestBiome.startPosition = originalForestStartPosition;
    }
  });

  it('turns the old-growth top route into a crown-rest destination loop and keeps the inner return seam catchable', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-old-growth-crown-rest-seed');
    persistSave(seededSave);
    const originalForestStartPosition = { ...forestBiome.startPosition };
    forestBiome.startPosition = { x: 652, y: 4 };

    try {
      const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
      const game = createGame(canvas, seededSave);

      tapKey(fakeWindow, 'Enter');
      game.enterBiome('forest');

      let state = readState(fakeWindow);
      expect(state.zoneId).toBe('old-growth-pocket');
      expect(state.player).toMatchObject({
        climbing: false,
      });
      expect(state.player?.x).toBeGreaterThanOrEqual(648);
      expect(state.player?.x).toBeLessThanOrEqual(662);
      expect(state.player?.y).toBeLessThanOrEqual(18);
      expect(
        state.nearbyInspectables.some((entity: any) => entity.entryId === 'tree-lungwort'),
      ).toBe(true);

      state = advanceWhileHoldingKeyUntil(
        fakeWindow,
        'ArrowRight',
        (nextState) =>
          !nextState.player?.climbing &&
          (nextState.player?.x ?? 0) >= 688 &&
          (nextState.player?.x ?? 999) <= 708 &&
          (nextState.player?.y ?? 0) >= 12 &&
          (nextState.player?.y ?? 999) <= 18,
        80,
      );
      expect(state.player).toMatchObject({
        climbing: false,
      });
      expect(state.player?.y).toBeGreaterThanOrEqual(12);
      expect(state.player?.y).toBeLessThanOrEqual(18);

      state = advanceWhileHoldingKeyUntil(
        fakeWindow,
        'ArrowLeft',
        (nextState) =>
          !nextState.player?.climbing &&
          (nextState.player?.x ?? 999) <= 686 &&
          (nextState.player?.y ?? 0) >= 12 &&
          (nextState.player?.y ?? 999) <= 18 &&
          nextState.nearbyClimbable?.id === 'old-growth-inner-bark-snag',
        40,
      );
      expect(state.nearbyClimbable).toMatchObject({
        id: 'old-growth-inner-bark-snag',
        inRange: true,
      });

      state = advanceWhileHoldingKeyUntil(
        fakeWindow,
        'ArrowDown',
        (nextState) =>
          nextState.player?.climbing &&
          nextState.player?.activeClimbableId === 'old-growth-inner-bark-snag' &&
          (nextState.player?.y ?? 0) >= 34,
        80,
      );
      expect(state.player).toMatchObject({
        climbing: true,
        activeClimbableId: 'old-growth-inner-bark-snag',
      });
      expect(state.player?.y).toBeGreaterThanOrEqual(34);
      expect(state.player?.y).toBeLessThanOrEqual(38);

      state = advanceWhileHoldingKeyUntil(
        fakeWindow,
        'ArrowRight',
        (nextState) =>
          !nextState.player?.climbing &&
          (nextState.player?.x ?? 0) >= 690 &&
          (nextState.player?.x ?? 999) <= 724 &&
          (nextState.player?.y ?? 0) >= 44 &&
          (nextState.player?.y ?? 999) <= 50,
        120,
      );
      expect(state.player?.y).toBeGreaterThanOrEqual(44);
      expect(state.player?.y).toBeLessThanOrEqual(50);

      state = advanceWhileHoldingKeyUntil(
        fakeWindow,
        'ArrowLeft',
        (nextState) =>
          !nextState.player?.climbing &&
          nextState.player?.x <= 694 &&
          nextState.nearbyClimbable?.id === 'old-growth-inner-bark-snag',
        120,
      );
      expect(state.nearbyClimbable).toMatchObject({
        id: 'old-growth-inner-bark-snag',
        inRange: true,
      });
    } finally {
      forestBiome.startPosition = originalForestStartPosition;
    }
  });

  it('opens the world-map field station, claims field credit, and buys trail stride', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-field-station-seed');
    for (const entryId of ['beach-grass', 'sand-verbena', 'native-littleneck-shell', 'western-snowy-plover']) {
      recordDiscovery(seededSave, beachBiome.entries[entryId], 'beach');
    }
    for (const entryId of ['banana-slug', 'sword-fern', 'redwood-sorrel', 'fir-cone']) {
      recordDiscovery(seededSave, forestBiome.entries[entryId], 'forest');
    }
    seededSave.completedFieldRequestIds = ['forest-hidden-hollow', 'forest-moisture-holders'];
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('forest');
    tapKey(fakeWindow, 'm');
    tapKey(fakeWindow, 'Enter');
    let state = advanceUntil(fakeWindow, (nextState) => nextState.scene === 'world-map');
    expect(state.worldMap?.focusedLocationId).toBe('forest');

    tapKey(fakeWindow, 'm');
    state = readState(fakeWindow);
    expect(state.menu?.availableActions).toContain('field-station');
    expect(state.menu?.selectedAction).toBe('field-station');

    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.mode).toBe('field-station');
    expect(state.fieldStation).toMatchObject({
      credits: 5,
      purchasedUpgradeIds: [],
      selectedUpgradeId: 'trail-stride',
    });
    expect(state.fieldStation?.routeBoard).toMatchObject({
      routeTitle: 'COASTAL SHELTER LINE',
      progressLabel: '1/3 logged',
      beats: [
        { id: 'forest-study', status: 'done' },
        { id: 'station-return', status: 'active' },
        { id: 'coastal-comparison', status: 'upcoming' },
      ],
    });
    expect(state.fieldStation?.upgrades.map((upgrade: any) => upgrade.id)).toEqual(['trail-stride']);
    expect(state.fieldStation?.recentSources.map((source: any) => source.id)).toEqual([
      'request:forest-survey-slice',
      'request:forest-moisture-holders',
    ]);

    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.fieldStation).toMatchObject({
      credits: 2,
      purchasedUpgradeIds: ['trail-stride'],
    });
    expect(state.fieldStation?.upgrades[0]).toMatchObject({
      id: 'trail-stride',
      owned: true,
    });
    expect(state.fieldStation?.upgrades[1]).toMatchObject({
      id: 'field-step',
      owned: false,
      affordable: false,
    });
    expect(state.fieldStation?.routeBoard).toMatchObject({
      progressLabel: '2/3 logged',
      beats: [
        { id: 'forest-study', status: 'done' },
        { id: 'station-return', status: 'done' },
        { id: 'coastal-comparison', status: 'active' },
      ],
    });
    expect(state.movement?.walkSpeed).toBe(46);
    expect(state.movement?.jumpSpeed).toBe(118);

    tapKey(fakeWindow, 'Escape');
    state = readState(fakeWindow);
    expect(state.mode).toBe('playing');
    expect(state.scene).toBe('world-map');
  });

  it('opens the nursery tab and starts one teaching-bed project from the field station', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-nursery-station-seed');
    recordDiscovery(seededSave, coastalScrubBiome.entries['sand-verbena'], 'coastal-scrub');
    seededSave.completedFieldRequestIds = ['coastal-shelter-shift'];
    seededSave.nurseryResources.cuttings = 1;
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('forest');
    tapKey(fakeWindow, 'm');
    tapKey(fakeWindow, 'Enter');
    advanceUntil(fakeWindow, (nextState) => nextState.scene === 'world-map');

    tapKey(fakeWindow, 'm');
    tapKey(fakeWindow, 'ArrowUp');
    tapKey(fakeWindow, 'Enter');
    tapKey(fakeWindow, 'ArrowRight');
    tapKey(fakeWindow, 'ArrowRight');
    let state = readState(fakeWindow);
    expect(state.mode).toBe('field-station');
    expect(state.fieldStation?.view).toBe('nursery');
    expect(state.fieldStation?.nursery.selectedProject).toMatchObject({
      id: 'sand-verbena-bed',
      affordable: true,
    });
    expect(state.fieldStation?.selectedNurseryCardId).toBe('bench');

    tapKey(fakeWindow, 'ArrowDown');
    tapKey(fakeWindow, 'ArrowDown');
    state = readState(fakeWindow);
    expect(state.fieldStation?.selectedNurseryCardId).toBe('bed');

    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.fieldStation?.nursery.activeProject).toMatchObject({
      id: 'sand-verbena-bed',
      stage: 'stocked',
    });
    expect(state.fieldStation?.nursery.resources.cuttings).toBe(0);
  });

  it('adds a season expedition page that becomes ready after the three live routes are logged', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-expedition-slot-ready-seed');
    seededSave.completedFieldRequestIds = ['coastal-edge-moisture', 'tundra-survey-slice', 'treeline-low-fell'];
    seededSave.nurseryClaimedRewardIds = ['nursery:salmonberry-support'];
    seededSave.purchasedUpgradeIds = ['trail-stride', 'field-step', 'route-marker'];
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    tapKey(fakeWindow, 'm');
    selectMenuAction(fakeWindow, 'world-map');
    tapKey(fakeWindow, 'Enter');
    let state = advanceUntil(fakeWindow, (nextState) => nextState.scene === 'world-map');
    expect(state.worldMap?.routeMarkerLocationId).toBeNull();

    tapKey(fakeWindow, 'm');
    selectMenuAction(fakeWindow, 'field-station');
    tapKey(fakeWindow, 'Enter');

    state = readState(fakeWindow);
    expect(state.mode).toBe('field-station');
    expect(state.fieldStation?.view).toBe('season');
    expect(state.fieldStation?.seasonPage).toBe('routes');

    tapKey(fakeWindow, 'ArrowRight');
    state = readState(fakeWindow);
    expect(state.fieldStation?.view).toBe('season');
    expect(state.fieldStation?.seasonPage).toBe('expedition');
    expect(state.fieldStation?.expedition).toMatchObject({
      id: 'root-hollow-expedition',
      status: 'ready',
      title: 'ROOT HOLLOW',
    });

    tapKey(fakeWindow, 'ArrowRight');
    state = readState(fakeWindow);
    expect(state.fieldStation?.view).toBe('nursery');
    expect(state.fieldStation?.nursery.routeSupportHint).toBe(
      'Salmonberry still marks the cooler forest return near Root Hollow.',
    );
  });

  it('turns the forest expedition slot into a single notebook-led chapter', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-expedition-chapter-seed');
    seededSave.completedFieldRequestIds = ['coastal-edge-moisture', 'tundra-survey-slice', 'treeline-low-fell'];
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('forest');

    let state = readState(fakeWindow);
    expect(state.activeFieldRequest).toMatchObject({
      id: 'forest-expedition-upper-run',
      title: 'Root Hollow',
      progressLabel: 'Return To Root Hollow',
    });
    expect(state.fieldStation?.expedition).toMatchObject({
      status: 'ready',
      statusLabel: 'READY',
    });

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) =>
        nextState.zoneId === 'seep-pocket' &&
        nextState.nearbyInspectables.some((entity: any) => entity.entryId === 'seep-stone'),
      520,
    );
    const seepStone = state.nearbyInspectables.find((entity: any) => entity.entryId === 'seep-stone');
    if (!seepStone) {
      throw new Error('Expected seep stone to anchor the Root Hollow chapter.');
    }

    game.inspectEntity(seepStone.entityId);
    fakeWindow.advanceTime?.(16);
    state = readState(fakeWindow);
    expect(seededSave.routeV2Progress).toMatchObject({
      requestId: 'forest-expedition-upper-run',
      status: 'gathering',
      evidenceSlots: [{ slotId: 'seep-mark', entryId: 'seep-stone' }],
    });
    expect(state.fieldStation?.expedition).toMatchObject({
      status: 'active',
      statusLabel: '1/4',
    });

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) =>
        nextState.zoneId === 'stone-basin' &&
        nextState.nearbyInspectables.some((entity: any) => entity.entryId === 'banana-slug'),
      180,
    );
    const stonePocketClue = state.nearbyInspectables.find((entity: any) => entity.entryId === 'banana-slug');
    if (!stonePocketClue) {
      throw new Error('Expected stone-basin life to anchor the Root Hollow middle leg.');
    }

    game.inspectEntity(stonePocketClue.entityId);
    fakeWindow.advanceTime?.(16);
    state = readState(fakeWindow);
    expect(seededSave.routeV2Progress).toMatchObject({
      requestId: 'forest-expedition-upper-run',
      status: 'gathering',
      evidenceSlots: [
        { slotId: 'seep-mark', entryId: 'seep-stone' },
        { slotId: 'stone-pocket', entryId: 'banana-slug' },
      ],
    });
    expect(state.fieldStation?.expedition).toMatchObject({
      status: 'active',
      statusLabel: '2/4',
    });

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) =>
        nextState.zoneId === 'stone-basin' &&
        nextState.nearbyClimbable?.id === 'root-hollow-cave-trunk',
      120,
    );
    expect(state.nearbyClimbable).toMatchObject({
      id: 'root-hollow-cave-trunk',
      inRange: true,
    });

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowUp',
      (nextState) =>
        nextState.player?.climbing &&
        nextState.player?.activeClimbableId === 'root-hollow-cave-trunk',
      80,
    );
    expect(state.player).toMatchObject({
      climbing: true,
      activeClimbableId: 'root-hollow-cave-trunk',
    });

    advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowUp',
      (nextState) => nextState.player?.climbing && nextState.player?.y <= 80,
      220,
    );

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) =>
        nextState.zoneId === 'filtered-return' &&
        nextState.nearbyInspectables.some((entity: any) => entity.entryId === 'root-curtain'),
      80,
    );
    const rootCurtain = state.nearbyInspectables.find((entity: any) => entity.entryId === 'root-curtain');
    if (!rootCurtain) {
      throw new Error('Expected root curtain to anchor the climb return clue.');
    }

    game.inspectEntity(rootCurtain.entityId);
    fakeWindow.advanceTime?.(16);
    state = readState(fakeWindow);
    expect(seededSave.routeV2Progress).toMatchObject({
      requestId: 'forest-expedition-upper-run',
      status: 'gathering',
      evidenceSlots: [
        { slotId: 'seep-mark', entryId: 'seep-stone' },
        { slotId: 'stone-pocket', entryId: 'banana-slug' },
        { slotId: 'root-held', entryId: 'root-curtain' },
      ],
    });
    expect(state.fieldStation?.expedition).toMatchObject({
      status: 'active',
      statusLabel: '3/4',
    });

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) =>
        nextState.zoneId === 'log-run' &&
        nextState.nearbyInspectables.some((entity: any) => entity.entryId === 'fir-cone'),
      160,
    );
    const firCone = state.nearbyInspectables.find((entity: any) => entity.entryId === 'fir-cone');
    if (!firCone) {
      throw new Error('Expected fir cone to anchor the high-run clue.');
    }

    game.inspectEntity(firCone.entityId);
    fakeWindow.advanceTime?.(16);
    state = readState(fakeWindow);
    expect(seededSave.completedFieldRequestIds).not.toContain('forest-expedition-upper-run');
    expect(seededSave.routeV2Progress).toMatchObject({
      requestId: 'forest-expedition-upper-run',
      status: 'ready-to-synthesize',
      evidenceSlots: [
        { slotId: 'seep-mark', entryId: 'seep-stone' },
        { slotId: 'stone-pocket', entryId: 'banana-slug' },
        { slotId: 'root-held', entryId: 'root-curtain' },
        { slotId: 'high-run', entryId: 'fir-cone' },
      ],
    });
    expect(state.activeFieldRequest).toMatchObject({
      id: 'forest-expedition-upper-run',
      progressLabel: 'Ready To File',
    });
    expect(state.fieldStation?.expedition).toMatchObject({
      status: 'active',
      statusLabel: 'NOTE READY',
    });

    tapKey(fakeWindow, 'm');
    tapKey(fakeWindow, 'Enter');
    state = advanceUntil(fakeWindow, (nextState) => nextState.scene === 'world-map');

    tapKey(fakeWindow, 'm');
    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.mode).toBe('field-station');

    tapKey(fakeWindow, 'ArrowRight');
    state = readState(fakeWindow);
    expect(state.fieldStation?.seasonPage).toBe('expedition');
    expect(state.fieldStation?.expedition).toMatchObject({
      status: 'active',
      statusLabel: 'NOTE READY',
    });

    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(seededSave.completedFieldRequestIds).toContain('forest-expedition-upper-run');
    expect(seededSave.routeV2Progress).toBeNull();
    expect(state.activeFieldRequest).toMatchObject({
      id: 'forest-season-threads',
      progressLabel: '0/3 signs',
    });
    expect(state.fieldRequestNotice).toMatchObject({
      title: 'ROOT HOLLOW',
      text: 'Seep Stone, Banana Slug, Root Curtain, and Douglas-fir Cone now map the whole hollow return.',
    });
    expect(state.fieldStation?.expedition).toMatchObject({
      status: 'logged',
      statusLabel: 'LOGGED',
      teaser: {
        label: 'NEXT EXPEDITION',
        text: 'Treeline Pass waits beyond Root Hollow.',
      },
    });
  });

  it('buys route marker after the movement pair and lets the support row activate it on the world map', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-route-marker-seed');
    for (const entryId of ['banana-slug', 'sword-fern', 'redwood-sorrel', 'fir-cone']) {
      recordDiscovery(seededSave, forestBiome.entries[entryId], 'forest');
    }
    seededSave.completedFieldRequestIds = [
      'forest-hidden-hollow',
      'forest-moisture-holders',
      'forest-survey-slice',
    ];
    seededSave.purchasedUpgradeIds = ['trail-stride', 'field-step'];
    seededSave.fieldCredits = 7;
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('forest');
    tapKey(fakeWindow, 'm');
    selectMenuAction(fakeWindow, 'world-map');
    tapKey(fakeWindow, 'Enter');
    let state = advanceUntil(fakeWindow, (nextState) => nextState.scene === 'world-map');
    expect(state.worldMap?.focusedLocationId).toBe('forest');

    tapKey(fakeWindow, 'm');
    selectMenuAction(fakeWindow, 'field-station');
    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.mode).toBe('field-station');
    expect(state.fieldStation?.upgrades.map((upgrade: any) => upgrade.id)).toEqual([
      'trail-stride',
      'field-step',
      'route-marker',
    ]);

    tapKey(fakeWindow, 'ArrowDown');
    tapKey(fakeWindow, 'ArrowDown');
    state = readState(fakeWindow);
    expect(state.fieldStation?.selectedUpgradeId).toBe('route-marker');

    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.fieldStation?.purchasedUpgradeIds).toEqual([
      'trail-stride',
      'field-step',
      'route-marker',
    ]);
    expect(state.fieldStation?.selectedOutingSupportId).toBe('hand-lens');

    tapKey(fakeWindow, 'ArrowUp');
    tapKey(fakeWindow, 'ArrowUp');
    tapKey(fakeWindow, 'ArrowUp');
    state = readState(fakeWindow);
    expect(state.fieldStation?.outingSupportSelected).toBe(true);

    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.fieldStation?.selectedOutingSupportId).toBe('note-tabs');

    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.fieldStation?.selectedOutingSupportId).toBe('route-marker');

    tapKey(fakeWindow, 'Escape');
    state = readState(fakeWindow);
    expect(state.scene).toBe('world-map');
    expect(state.worldMap?.routeMarkerLocationId).toBe('coastal-scrub');
  });

  it('switches the route board to treeline and can hand the outing guide to route marker', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-inland-route-board-seed');
    seededSave.completedFieldRequestIds = [
      'forest-hidden-hollow',
      'forest-moisture-holders',
      'forest-survey-slice',
      'coastal-shelter-shift',
      'coastal-edge-moisture',
    ];
    seededSave.purchasedUpgradeIds = ['trail-stride', 'field-step', 'route-marker'];
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('forest');
    tapKey(fakeWindow, 'm');
    selectMenuAction(fakeWindow, 'world-map');
    tapKey(fakeWindow, 'Enter');
    let state = advanceUntil(fakeWindow, (nextState) => nextState.scene === 'world-map');
    expect(state.worldMap?.focusedLocationId).toBe('forest');

    tapKey(fakeWindow, 'm');
    selectMenuAction(fakeWindow, 'field-station');
    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.mode).toBe('field-station');
    expect(state.fieldStation?.routeBoard).toMatchObject({
      routeId: 'treeline-shelter-line',
      routeTitle: 'TREELINE SHELTER LINE',
      summary: 'Leave canopy cover. Follow the last sheltered treeline pocket before the thaw edge.',
      nextDirection: 'Next: travel to Treeline Pass and log bent cover first, then stone break, then lee life.',
      targetBiomeId: 'treeline',
      beats: [
        { id: 'treeline-shelter', status: 'active' },
        { id: 'tundra-short-season', status: 'upcoming' },
        { id: 'tundra-survey', status: 'upcoming' },
      ],
    });
    expect(state.fieldStation?.atlas).toEqual({
      title: 'FIELD ATLAS',
      loggedRoutes: ['COASTAL SHELTER LINE logged'],
      note: 'Coast filed. Inland shelter next.',
    });
    expect(state.fieldStation?.selectedOutingSupportId).toBe('hand-lens');

    tapKey(fakeWindow, 'ArrowUp');
    state = readState(fakeWindow);
    expect(state.fieldStation?.outingSupportSelected).toBe(true);

    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.fieldStation?.selectedOutingSupportId).toBe('note-tabs');

    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.fieldStation?.selectedOutingSupportId).toBe('route-marker');

    tapKey(fakeWindow, 'Escape');
    const mapState = readState(fakeWindow);
    expect(mapState.scene).toBe('world-map');
    expect(mapState.worldMap?.routeMarkerLocationId).toBe('treeline');
  });

  it('switches the route board to tundra and can hand the outing guide to route marker', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-high-country-route-board-seed');
    seededSave.completedFieldRequestIds = [
      'forest-hidden-hollow',
      'forest-moisture-holders',
      'forest-survey-slice',
      'coastal-shelter-shift',
      'coastal-edge-moisture',
      'treeline-stone-shelter',
    ];
    seededSave.purchasedUpgradeIds = ['trail-stride', 'field-step', 'route-marker'];
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('forest');
    tapKey(fakeWindow, 'm');
    selectMenuAction(fakeWindow, 'world-map');
    tapKey(fakeWindow, 'Enter');
    let state = advanceUntil(fakeWindow, (nextState) => nextState.scene === 'world-map');
    expect(state.worldMap?.focusedLocationId).toBe('forest');

    tapKey(fakeWindow, 'm');
    selectMenuAction(fakeWindow, 'field-station');
    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.mode).toBe('field-station');
    expect(state.fieldStation?.routeBoard).toMatchObject({
      routeId: 'treeline-shelter-line',
      routeTitle: 'TREELINE SHELTER LINE',
      summary: 'Sheltered treeline pocket logged. Follow the tundra thaw window out and back.',
      nextDirection: 'Next: travel to Tundra Reach and log first bloom, then wet tuft, then brief fruit.',
      targetBiomeId: 'tundra',
      beats: [
        { id: 'treeline-shelter', status: 'done' },
        { id: 'tundra-short-season', status: 'active' },
        { id: 'tundra-survey', status: 'upcoming' },
      ],
    });
    expect(state.fieldStation?.selectedOutingSupportId).toBe('hand-lens');

    tapKey(fakeWindow, 'ArrowUp');
    state = readState(fakeWindow);
    expect(state.fieldStation?.outingSupportSelected).toBe(true);

    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.fieldStation?.selectedOutingSupportId).toBe('note-tabs');

    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.fieldStation?.selectedOutingSupportId).toBe('place-tab');
    expect(state.fieldStation?.seasonWrap).toEqual({
      label: 'TODAY',
      text: 'What here marks the wet edge of thaw?',
    });

    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.fieldStation?.selectedOutingSupportId).toBe('route-marker');

    tapKey(fakeWindow, 'Escape');
    const mapState = readState(fakeWindow);
    expect(mapState.scene).toBe('world-map');
    expect(mapState.worldMap?.routeMarkerLocationId).toBe('tundra');
  });

  it('switches the route board to coastal scrub and can hand the outing guide to route marker', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-edge-route-board-seed');
    seededSave.completedFieldRequestIds = [
      'forest-hidden-hollow',
      'forest-moisture-holders',
      'forest-survey-slice',
      'coastal-shelter-shift',
      'coastal-edge-moisture',
      'treeline-stone-shelter',
      'tundra-short-season',
      'tundra-survey-slice',
    ];
    seededSave.purchasedUpgradeIds = ['trail-stride', 'field-step', 'route-marker'];
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('tundra');
    tapKey(fakeWindow, 'm');
    selectMenuAction(fakeWindow, 'world-map');
    tapKey(fakeWindow, 'Enter');
    let state = advanceUntil(fakeWindow, (nextState) => nextState.scene === 'world-map');
    expect(state.worldMap?.focusedLocationId).toBe('tundra');

    tapKey(fakeWindow, 'm');
    selectMenuAction(fakeWindow, 'field-station');
    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.mode).toBe('field-station');
    expect(state.fieldStation?.routeBoard).toMatchObject({
      routeId: 'edge-pattern-line',
      routeTitle: 'EDGE PATTERN LINE',
      nextDirection: 'Next: travel to Coastal Scrub and walk Back Dune -> Windbreak Swale -> Forest Edge.',
      targetBiomeId: 'coastal-scrub',
      beats: [
        { id: 'scrub-edge-pattern', status: 'active' },
        { id: 'forest-cool-edge', status: 'upcoming' },
        { id: 'treeline-low-fell', status: 'upcoming' },
      ],
    });
    expect(state.fieldStation?.atlas).toEqual({
      title: 'FIELD ATLAS',
      loggedRoutes: ['COASTAL SHELTER LINE logged', 'TREELINE SHELTER LINE logged'],
      note: 'Coast and ridge filed. Low-fell edge next.',
    });
    expect(state.fieldStation?.selectedOutingSupportId).toBe('hand-lens');

    tapKey(fakeWindow, 'ArrowUp');
    state = readState(fakeWindow);
    expect(state.fieldStation?.outingSupportSelected).toBe(true);

    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.fieldStation?.selectedOutingSupportId).toBe('note-tabs');

    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.fieldStation?.selectedOutingSupportId).toBe('place-tab');
    expect(state.fieldStation?.seasonWrap).toEqual({
      label: 'TODAY',
      text: 'Where does the scrub start looking calmer?',
    });

    tapKey(fakeWindow, 'Enter');

    tapKey(fakeWindow, 'Escape');
    const mapState = readState(fakeWindow);
    expect(mapState.scene).toBe('world-map');
    expect(mapState.worldMap?.routeMarkerLocationId).toBe('coastal-scrub');
  });

  it('shows the thaw-window route replay note when re-entering tundra during the active process window', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-thaw-window-route-replay-seed');
    seededSave.completedFieldRequestIds = [
      'forest-hidden-hollow',
      'forest-moisture-holders',
      'forest-survey-slice',
      'coastal-shelter-shift',
      'coastal-edge-moisture',
      'treeline-stone-shelter',
    ];
    seededSave.worldStep = 4;
    seededSave.biomeVisits.tundra = 2;
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('tundra');

    const state = readState(fakeWindow);
    expect(state.scene).toBe('biome');
    expect(state.biomeId).toBe('tundra');
    expect(state.activeFieldRequest).toMatchObject({
      id: 'tundra-short-season',
      title: 'Thaw Window',
      summary: 'Peak thaw makes first bloom, wet tuft, and brief fruit easiest to follow today.',
    });
    expect(state.fieldRequestNotice).toMatchObject({
      title: 'Thaw Window',
      text: 'Peak thaw makes first bloom, wet tuft, and brief fruit easiest to follow today.',
    });
    expect(state.fieldStation?.routeBoard).toMatchObject({
      routeId: 'treeline-shelter-line',
      summary: 'Peak thaw makes first bloom, wet tuft, and brief fruit easiest to follow today.',
      replayNote: {
        id: 'tundra-thaw-window',
        title: 'Thaw Window',
      },
    });
    expect(state.fieldStation?.routeBoard?.beats).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 'tundra-short-season', status: 'active', title: 'Thaw Window' }),
      ]),
    );
    expect(state.fieldStation?.seasonWrap).toEqual({
      label: 'TODAY',
      text: 'Peak thaw makes first bloom, wet tuft, and brief fruit easiest to follow today.',
    });
  });

  it('shows the wrack-shelter route replay note when re-entering beach during the active process window', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-wrack-shelter-route-replay-seed');
    seededSave.lastBiomeId = 'beach';
    seededSave.worldStep = 6;
    seededSave.biomeVisits.beach = 2;
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    fakeWindow.advanceTime?.(5200);
    game.enterBiome('beach');

    const state = readState(fakeWindow);
    expect(state.scene).toBe('biome');
    expect(state.biomeId).toBe('beach');
    expect(state.activeFieldRequest).toMatchObject({
      id: 'beach-shore-shelter',
      title: 'Wrack Shelter',
      summary: 'Fresh wrack makes the beach shelter line easier to follow today.',
    });
    expect(state.fieldRequestNotice).toMatchObject({
      title: 'Wrack Shelter',
      text: 'Fresh wrack makes the beach shelter line easier to follow today.',
    });
    expect(state.fieldStation?.routeBoard).toMatchObject({
      routeId: 'coastal-shelter-line',
      summary: 'Fresh wrack makes the beach shelter line easier to follow today.',
      replayNote: {
        id: 'beach-wrack-shelter',
        title: 'Wrack Shelter',
      },
    });
    expect(state.fieldStation?.routeBoard?.beats).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 'forest-study', status: 'active', title: 'Wrack Shelter' }),
      ]),
    );
    expect(state.fieldStation?.seasonWrap).toEqual({
      label: 'TODAY',
      text: 'Fresh wrack makes the beach shelter line easier to follow today.',
    });
  });

  it('shows one route replay note when re-entering the active route biome during a live replay window', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-route-replay-note-seed');
    seededSave.completedFieldRequestIds = [
      'forest-hidden-hollow',
      'forest-moisture-holders',
      'forest-survey-slice',
      'coastal-shelter-shift',
      'coastal-edge-moisture',
      'treeline-stone-shelter',
      'tundra-short-season',
      'tundra-survey-slice',
      'scrub-edge-pattern',
    ];
    seededSave.purchasedUpgradeIds = ['trail-stride', 'field-step', 'route-marker'];
    seededSave.worldStep = 5;
    seededSave.biomeVisits['coastal-scrub'] = 1;
    seededSave.biomeVisits.forest = 1;
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('forest');

    const state = readState(fakeWindow);
    expect(state.scene).toBe('biome');
    expect(state.biomeId).toBe('forest');
    expect(state.activeFieldRequest).toMatchObject({
      id: 'forest-cool-edge',
      title: 'Moist Edge',
      summary: 'At Creek Bend, read which carrier, floor, and shade still hold moisture on the forest side.',
    });
    expect(state.fieldRequestNotice).toMatchObject({
      title: 'Moist Edge',
      text: 'At Creek Bend, read which carrier, floor, and shade still hold moisture on the forest side.',
    });
    expect(state.fieldStation?.routeBoard).toMatchObject({
      routeId: 'edge-pattern-line',
      replayNote: {
        id: 'edge-moist-edge',
        title: 'Moist Edge',
      },
    });
    expect(state.fieldStation?.routeBoard?.beats).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 'scrub-edge-pattern', status: 'done' }),
        expect.objectContaining({ id: 'forest-cool-edge', status: 'active', title: 'Moist Edge' }),
      ]),
    );
    expect(state.fieldStation?.seasonWrap).toEqual({
      label: 'TODAY',
      text: 'At Creek Bend, read which carrier, floor, and shade still hold moisture on the forest side.',
    });
  });

  it('shows the route replay notice when resuming from title into a saved forest replay state', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-route-replay-resume-forest-seed');
    seededSave.completedFieldRequestIds = [
      'forest-hidden-hollow',
      'forest-moisture-holders',
      'forest-survey-slice',
      'coastal-shelter-shift',
      'coastal-edge-moisture',
      'treeline-stone-shelter',
      'tundra-short-season',
      'tundra-survey-slice',
      'scrub-edge-pattern',
    ];
    seededSave.worldStep = 6;
    seededSave.biomeVisits.forest = 2;
    seededSave.lastBiomeId = 'forest';
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    createGame(canvas, seededSave);

    let state = readState(fakeWindow);
    expect(state.mode).toBe('title');
    expect(state.biomeId).toBe('forest');
    expect(state.fieldStation?.routeBoard?.replayNote).toMatchObject({
      id: 'edge-moist-edge',
      title: 'Moist Edge',
    });
    expect(state.fieldRequestNotice).toBeNull();

    tapKey(fakeWindow, 'Enter');

    state = readState(fakeWindow);
    expect(state.mode).toBe('playing');
    expect(state.biomeId).toBe('forest');
    expect(state.fieldRequestNotice).toMatchObject({
      title: 'Moist Edge',
      text: 'At Creek Bend, read which carrier, floor, and shade still hold moisture on the forest side.',
    });
  });

  it('shows the route replay notice when resuming from title into a saved tundra replay state', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-route-replay-resume-tundra-seed');
    seededSave.completedFieldRequestIds = [
      'forest-hidden-hollow',
      'forest-moisture-holders',
      'forest-survey-slice',
      'coastal-shelter-shift',
      'coastal-edge-moisture',
      'treeline-stone-shelter',
    ];
    seededSave.worldStep = 4;
    seededSave.biomeVisits.tundra = 2;
    seededSave.lastBiomeId = 'tundra';
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    createGame(canvas, seededSave);

    let state = readState(fakeWindow);
    expect(state.mode).toBe('title');
    expect(state.biomeId).toBe('tundra');
    expect(state.fieldStation?.routeBoard?.replayNote).toMatchObject({
      id: 'tundra-thaw-window',
      title: 'Thaw Window',
    });
    expect(state.fieldRequestNotice).toBeNull();

    tapKey(fakeWindow, 'Enter');

    state = readState(fakeWindow);
    expect(state.mode).toBe('playing');
    expect(state.biomeId).toBe('tundra');
    expect(state.fieldRequestNotice).toMatchObject({
      title: 'Thaw Window',
      text: 'Peak thaw makes first bloom, wet tuft, and brief fruit easiest to follow today.',
    });
  });

  it('surfaces the live replay note in the world-map footer when the route target is focused', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-route-replay-map-seed');
    seededSave.completedFieldRequestIds = [
      'forest-hidden-hollow',
      'forest-moisture-holders',
      'forest-survey-slice',
      'coastal-shelter-shift',
      'coastal-edge-moisture',
      'treeline-stone-shelter',
      'tundra-short-season',
      'tundra-survey-slice',
      'scrub-edge-pattern',
    ];
    seededSave.purchasedUpgradeIds = ['trail-stride', 'field-step', 'route-marker'];
    seededSave.worldStep = 6;
    seededSave.biomeVisits.forest = 2;
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    tapKey(fakeWindow, 'm');
    selectMenuAction(fakeWindow, 'world-map');
    tapKey(fakeWindow, 'Enter');
    let state = advanceUntil(fakeWindow, (nextState) => nextState.scene === 'world-map');
    expect(state.worldMap?.routeMarkerLocationId).toBeNull();

    tapKey(fakeWindow, 'ArrowRight');
    tapKey(fakeWindow, 'ArrowRight');
    state = readState(fakeWindow);
    expect(state.worldMap?.focusedLocationId).toBe('forest');
    expect(state.worldMap?.routeReplayLabel).toBe('Today: Moist Edge');
  });

  it('shows a route-logged stop cue in the field station once the live route is complete', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-season-wrap-logged-seed');
    seededSave.completedFieldRequestIds = [
      'forest-hidden-hollow',
      'forest-moisture-holders',
      'forest-survey-slice',
      'coastal-shelter-shift',
      'coastal-edge-moisture',
      'treeline-stone-shelter',
      'tundra-short-season',
      'tundra-survey-slice',
      'scrub-edge-pattern',
      'forest-cool-edge',
      'treeline-low-fell',
    ];
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    tapKey(fakeWindow, 'm');
    tapKey(fakeWindow, 'Enter');
    advanceUntil(fakeWindow, (nextState) => nextState.scene === 'world-map');

    tapKey(fakeWindow, 'm');
    tapKey(fakeWindow, 'Enter');

    const state = readState(fakeWindow);
    expect(state.mode).toBe('field-station');
    expect(state.fieldStation?.routeBoard).toMatchObject({
      routeId: 'edge-pattern-line',
      complete: true,
    });
    expect(state.fieldStation?.atlas).toEqual({
      title: 'FIELD ATLAS',
      loggedRoutes: [
        'COASTAL SHELTER LINE logged',
        'TREELINE SHELTER LINE logged',
        'EDGE PATTERN LINE logged',
      ],
      note: 'Coast, ridge, edge filed. Root Hollow next.',
    });
    expect(state.fieldStation?.seasonWrap).toEqual({
      label: 'ROUTE LOGGED',
      text: 'Good stopping point. Root Hollow waits below.',
    });
  });

  it('uses a note-tabs chapter-close line once the edge line is logged', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-note-tabs-edge-line-close-seed');
    seededSave.selectedOutingSupportId = 'note-tabs';
    seededSave.completedFieldRequestIds = [
      'forest-hidden-hollow',
      'forest-moisture-holders',
      'forest-survey-slice',
      'coastal-shelter-shift',
      'coastal-edge-moisture',
      'treeline-stone-shelter',
      'tundra-short-season',
      'tundra-survey-slice',
      'scrub-edge-pattern',
      'forest-cool-edge',
      'treeline-low-fell',
    ];
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    tapKey(fakeWindow, 'm');
    tapKey(fakeWindow, 'Enter');
    advanceUntil(fakeWindow, (nextState) => nextState.scene === 'world-map');

    tapKey(fakeWindow, 'm');
    tapKey(fakeWindow, 'Enter');

    const state = readState(fakeWindow);
    expect(state.mode).toBe('field-station');
    expect(state.fieldStation?.selectedOutingSupportId).toBe('note-tabs');
    expect(state.fieldStation?.seasonWrap).toEqual({
      label: 'EDGE LINE LOGGED',
      text: 'Low Fell closes the edge line. Root Hollow waits below.',
    });
  });

  it('uses a calmer stop cue once Root Hollow is ready to file', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-root-hollow-stop-cue-seed');
    seededSave.completedFieldRequestIds = [
      'forest-hidden-hollow',
      'forest-moisture-holders',
      'forest-survey-slice',
      'coastal-shelter-shift',
      'coastal-edge-moisture',
      'treeline-stone-shelter',
      'tundra-short-season',
      'tundra-survey-slice',
      'scrub-edge-pattern',
      'forest-cool-edge',
      'treeline-low-fell',
    ];
    seededSave.routeV2Progress = {
      requestId: 'forest-expedition-upper-run',
      status: 'ready-to-synthesize',
      landmarkEntryIds: [],
      evidenceSlots: [
        { slotId: 'seep-mark', entryId: 'seep-stone' },
        { slotId: 'stone-pocket', entryId: 'banana-slug' },
        { slotId: 'root-held', entryId: 'root-curtain' },
        { slotId: 'high-run', entryId: 'fir-cone' },
      ],
    };
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    tapKey(fakeWindow, 'm');
    tapKey(fakeWindow, 'Enter');
    advanceUntil(fakeWindow, (nextState) => nextState.scene === 'world-map');

    tapKey(fakeWindow, 'm');
    tapKey(fakeWindow, 'Enter');

    const state = readState(fakeWindow);
    expect(state.mode).toBe('field-station');
    expect(state.fieldStation?.routeBoard).toMatchObject({
      routeId: 'edge-pattern-line',
      complete: true,
      summary: 'Root Hollow is ready to file. Return to the field station and log the chapter.',
    });
    expect(state.fieldStation?.seasonWrap).toEqual({
      label: 'ROUTE LOGGED',
      text: 'Good stopping point. The note is ready.',
    });
  });

  it('surfaces the first field-season guidance from starter note to next habitat pointer', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-guided-field-season-seed');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    let state = readState(fakeWindow);
    expect(state.guidedFieldSeason).toMatchObject({
      stage: 'starter',
      nextBiomeId: 'beach',
      stationNote: {
        title: 'FIRST FIELD SEASON',
        text: 'Start with Shore Shelter on Sunny Beach, then carry shelter inland through Hidden Hollow before returning to the field station.',
      },
    });
    expect(state.fieldRequestNotice).toMatchObject({
      title: 'NOTEBOOK TASK',
      text: 'Shore Shelter first. Stay on Sunny Beach and log dune grass to wrack line.',
    });

    tapKey(fakeWindow, 'm');
    state = readState(fakeWindow);
    expect(state.menu?.selectedAction).toBe('world-map');
    tapKey(fakeWindow, 'Escape');

    seededSave.completedFieldRequestIds = ['beach-shore-shelter'];
    state = readState(fakeWindow);
    expect(state.guidedFieldSeason).toMatchObject({
      stage: 'starter',
      nextBiomeId: 'forest',
      stationNote: {
        title: 'HIDDEN HOLLOW',
        text: 'Hidden Hollow is next in Forest Trail. Follow shelter inland and confirm the seep stone.',
      },
    });

    tapKey(fakeWindow, 'm');
    state = readState(fakeWindow);
    expect(state.menu?.selectedAction).toBe('world-map');
    tapKey(fakeWindow, 'Escape');

    seededSave.completedFieldRequestIds = [
      'beach-shore-shelter',
      'forest-hidden-hollow',
      'forest-moisture-holders',
      'forest-survey-slice',
    ];
    for (const entryId of ['banana-slug', 'sword-fern', 'redwood-sorrel', 'fir-cone']) {
      recordDiscovery(seededSave, forestBiome.entries[entryId], 'forest');
    }

    tapKey(fakeWindow, 'm');
    state = readState(fakeWindow);
    expect(state.menu?.selectedAction).toBe('world-map');
    tapKey(fakeWindow, 'Enter');
    state = advanceUntil(fakeWindow, (nextState) => nextState.scene === 'world-map');
    expect(state.guidedFieldSeason).toMatchObject({
      stage: 'station-return',
    });
    expect(state.fieldRequestNotice).toMatchObject({
      title: 'FIELD STATION',
      text: 'Field station next for Trail Stride.',
    });

    tapKey(fakeWindow, 'm');
    state = readState(fakeWindow);
    expect(state.menu?.selectedAction).toBe('field-station');
    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.mode).toBe('field-station');
    expect(state.fieldStation?.seasonNote).toMatchObject({
      title: 'RETURN TO STATION',
      text: 'Shore Shelter, Hidden Hollow, and Forest Survey logged. Field station next for Trail Stride.',
    });
    expect(state.fieldStation?.seasonWrap).toEqual({
      label: 'RETURN TO STATION',
      text: 'Shore Shelter, Hidden Hollow, and Forest Survey logged. Field station next for Trail Stride.',
    });

    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.guidedFieldSeason).toMatchObject({
      stage: 'next-habitat',
      nextBiomeId: 'coastal-scrub',
      stationNote: {
        title: 'NEXT STOP',
        text: 'Open To Shelter is next in Coastal Scrub. Walk open bloom to shore pine to edge log.',
      },
    });
    expect(state.fieldStation?.seasonNote).toMatchObject({
      title: 'NEXT STOP',
    });
    expect(state.fieldStation?.seasonWrap).toEqual({
      label: 'TODAY',
      text: 'Walk open bloom, shore pine, and edge log in order through the scrub-to-woods shelter change.',
    });

    tapKey(fakeWindow, 'Escape');
    state = readState(fakeWindow);
    expect(state.scene).toBe('world-map');
    expect(state.fieldRequestNotice).toMatchObject({
      title: 'NEXT STOP',
      text: 'Open To Shelter next. Follow open bloom to edge log.',
    });
  });

  it('surfaces the season capstone, then opens the next field season on the routes shell', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-season-capstone-seed');
    seededSave.completedFieldRequestIds = [
      'forest-hidden-hollow',
      'forest-moisture-holders',
      'forest-survey-slice',
      'coastal-shelter-shift',
      'coastal-edge-moisture',
      'treeline-stone-shelter',
      'tundra-short-season',
      'tundra-survey-slice',
      'scrub-edge-pattern',
      'forest-cool-edge',
      'treeline-low-fell',
      'forest-expedition-upper-run',
    ];
    seededSave.nurseryClaimedRewardIds = ['nursery:salmonberry-support'];
    seededSave.purchasedUpgradeIds = ['trail-stride', 'field-step', 'route-marker'];
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('forest');

    let state = readState(fakeWindow);
    expect(state.guidedFieldSeason).toMatchObject({
      stage: 'season-capstone',
      nextBiomeId: 'forest',
    });
    expect(state.activeFieldRequest).toMatchObject({
      id: 'forest-season-threads',
      title: 'Season Threads',
    });
    expect(state.fieldRequestNotice).toMatchObject({
      title: 'SEASON THREADS',
    });

    tapKey(fakeWindow, 'm');
    selectMenuAction(fakeWindow, 'world-map');
    tapKey(fakeWindow, 'Enter');
    state = advanceUntil(fakeWindow, (nextState) => nextState.scene === 'world-map');
    expect(state.worldMap?.routeMarkerLocationId).toBeNull();

    tapKey(fakeWindow, 'm');
    selectMenuAction(fakeWindow, 'field-station');
    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.mode).toBe('field-station');
    expect(state.fieldStation?.seasonNote).toMatchObject({
      title: 'SEASON THREADS',
    });
    expect(state.fieldStation?.atlas).toEqual({
      title: 'FIELD ATLAS',
      loggedRoutes: [
        'COASTAL SHELTER LINE logged',
        'TREELINE SHELTER LINE logged',
        'EDGE PATTERN LINE logged',
      ],
      note: 'Next: tie coast and hollow in Forest Trail.',
    });
    expect(state.fieldStation?.seasonWrap).toEqual({
      label: 'ROUTE LOGGED',
      text: 'Good stopping point. Season Threads waits in Forest Trail.',
    });

    seededSave.completedFieldRequestIds = [...seededSave.completedFieldRequestIds, 'forest-season-threads'];
    seededSave.seasonCloseReturnPending = true;
    tapKey(fakeWindow, 'Escape');
    tapKey(fakeWindow, 'Enter');
    advanceUntil(
      fakeWindow,
      (nextState) => nextState.scene === 'biome' && nextState.biomeId === 'forest',
      120,
    );
    fakeWindow.advanceTime?.(4000);
    tapKey(fakeWindow, 'j');
    state = readState(fakeWindow);
    expect(state.journal?.fieldRequest).toMatchObject({
      id: 'route-locator:treeline',
      biomeId: 'treeline',
      title: 'High Pass',
      summary: 'Treeline Pass carries the season toward High Pass.',
      progressLabel: 'NEXT',
    });
    tapKey(fakeWindow, 'Escape');
    tapKey(fakeWindow, 'm');
    tapKey(fakeWindow, 'Enter');
    state = advanceUntil(fakeWindow, (nextState) => nextState.scene === 'world-map');
    expect(state.guidedFieldSeason).toMatchObject({
      stage: 'season-close-return',
      nextBiomeId: null,
      stationNote: {
        title: 'RETURN TO STATION',
        text: 'Season Threads logged. Return to the field station for a calm season close.',
      },
    });
    expect(state.fieldRequestNotice).toMatchObject({
      title: 'FIELD STATION',
      text: 'Season Threads logged. Field station next.',
    });
    expect(state.worldMap?.routeMarkerLocationId).toBeNull();

    tapKey(fakeWindow, 'm');
    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.mode).toBe('field-station');
    expect(seededSave.seasonCloseReturnPending).toBe(false);
    expect(state.fieldStation?.seasonNote).toMatchObject({
      title: 'NEXT FIELD SEASON',
    });
    expect(state.fieldStation?.seasonPage).toBe('routes');
    expect(state.fieldStation?.subtitle).toBe('High Pass starts at Treeline Pass.');
    expect(state.fieldStation?.seasonWrap).toEqual({
      label: 'SEASON ARCHIVE',
      text: 'Root Hollow now leads to High Pass.',
    });
    expect(state.fieldStation?.atlas?.note).toBe('Filed season: High Pass from Treeline Pass.');
    expect(state.fieldStation?.routeBoard).toMatchObject({
      targetBiomeId: 'treeline',
      launchCard: {
        title: 'HIGH PASS',
        progressLabel: 'NEXT',
        summary: 'Treeline Pass carries the season toward High Pass.',
      },
    });

    tapKey(fakeWindow, 'ArrowRight');
    state = readState(fakeWindow);
    expect(state.fieldStation?.seasonPage).toBe('expedition');
    expect(state.fieldStation?.subtitle).toBe('High Pass opens the next field season.');
    expect(state.fieldStation?.expedition).toMatchObject({
      teaser: {
        label: 'NEXT FIELD SEASON',
        text: 'High Pass waits beyond Root Hollow.',
      },
    });

    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.scene).toBe('world-map');
    expect(state.worldMap?.focusedLocationId).toBe('treeline');
    expect(state.worldMap?.routeMarkerLocationId).toBeNull();
    expect(state.worldMap?.routeReplayLabel).toBe('Today: High Pass');
    expect(state.worldMap?.originLabel).toBe('FROM FOREST TRAIL');

    tapKey(fakeWindow, 'm');
    tapKey(fakeWindow, 'ArrowUp');
    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.fieldStation?.seasonPage).toBe('routes');
    expect(state.fieldStation?.subtitle).toBe('High Pass starts at Treeline Pass.');
    expect(state.fieldStation?.seasonWrap).toEqual({
      label: 'SEASON ARCHIVE',
      text: 'Root Hollow now leads to High Pass.',
    });
    expect(state.fieldStation?.atlas?.note).toBe('Filed season: High Pass from Treeline Pass.');
    expect(state.fieldStation?.routeBoard).toMatchObject({
      targetBiomeId: 'treeline',
      launchCard: {
        title: 'HIGH PASS',
        progressLabel: 'NEXT',
        summary: 'Treeline Pass carries the season toward High Pass.',
      },
    });

    tapKey(fakeWindow, 'ArrowUp');
    state = readState(fakeWindow);
    expect(state.fieldStation?.outingSupportSelected).toBe(true);

    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.fieldStation?.selectedOutingSupportId).toBe('note-tabs');

    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.fieldStation?.selectedOutingSupportId).toBe('place-tab');

    tapKey(fakeWindow, 'Enter');
    tapKey(fakeWindow, 'Escape');
    state = readState(fakeWindow);
    expect(state.scene).toBe('world-map');
    expect(state.worldMap?.focusedLocationId).toBe('treeline');
    expect(state.worldMap?.routeMarkerLocationId).toBe('treeline');
    expect(state.worldMap?.routeReplayLabel).toBe('Today: High Pass');
    expect(state.worldMap?.originLabel).toBe('FROM FOREST TRAIL');

    tapKey(fakeWindow, 'm');
    tapKey(fakeWindow, 'ArrowUp');
    tapKey(fakeWindow, 'Enter');
    tapKey(fakeWindow, 'ArrowRight');
    tapKey(fakeWindow, 'ArrowRight');
    state = readState(fakeWindow);
    expect(state.fieldStation?.view).toBe('nursery');
    expect(state.fieldStation?.nursery.routeSupportHint).toBe(
      'Salmonberry still marks the cooler forest return tying the season together.',
    );
  });

  it('shows the treeline place-tab question once the edge line reaches Low Fell', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-place-tab-low-fell-seed');
    seededSave.completedFieldRequestIds = [
      'forest-hidden-hollow',
      'forest-moisture-holders',
      'forest-survey-slice',
      'coastal-shelter-shift',
      'coastal-edge-moisture',
      'treeline-stone-shelter',
      'tundra-short-season',
      'tundra-survey-slice',
      'scrub-edge-pattern',
      'forest-cool-edge',
    ];
    seededSave.purchasedUpgradeIds = ['trail-stride', 'field-step', 'route-marker'];
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('forest');
    tapKey(fakeWindow, 'm');
    selectMenuAction(fakeWindow, 'world-map');
    tapKey(fakeWindow, 'Enter');
    advanceUntil(fakeWindow, (nextState) => nextState.scene === 'world-map');

    tapKey(fakeWindow, 'm');
    selectMenuAction(fakeWindow, 'field-station');
    tapKey(fakeWindow, 'Enter');
    let state = readState(fakeWindow);
    expect(state.fieldStation?.routeBoard).toMatchObject({
      routeId: 'edge-pattern-line',
      targetBiomeId: 'treeline',
      beats: [
        { id: 'scrub-edge-pattern', status: 'done' },
        { id: 'forest-cool-edge', status: 'done' },
        { id: 'treeline-low-fell', status: 'active' },
      ],
    });

    tapKey(fakeWindow, 'ArrowUp');
    tapKey(fakeWindow, 'Enter');
    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.fieldStation?.selectedOutingSupportId).toBe('place-tab');
    expect(state.fieldStation?.seasonWrap).toEqual({
      label: 'TODAY',
      text: 'Where does tree cover drop into low fell here?',
    });
  });

  it('reports the deterministic day-part cycle through the debug hook as biomes change', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-world-state-seed');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');

    let state = readState(fakeWindow);
    expect(state.biomeId).toBe('beach');
    expect(state.worldState).toEqual({
      worldAge: 1,
      dayPart: 'day',
      weather: 'clear',
      phenologyPhase: 'early',
    });

    game.enterBiome('forest');
    state = readState(fakeWindow);
    expect(state.worldState).toEqual({
      worldAge: 2,
      dayPart: 'dusk',
      weather: 'mist-drip',
      phenologyPhase: 'early',
    });

    game.enterBiome('treeline');
    state = readState(fakeWindow);
    expect(state.worldState).toEqual({
      worldAge: 3,
      dayPart: 'dawn',
      weather: 'clear',
      phenologyPhase: 'peak',
    });

    game.enterBiome('treeline');
    state = readState(fakeWindow);
    expect(state.worldState).toEqual({
      worldAge: 3,
      dayPart: 'dawn',
      weather: 'clear',
      phenologyPhase: 'peak',
    });
  });

  it('exposes active habitat-process moments when a late coastal revisit starts trapping sand', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-habitat-process-seed');
    seededSave.worldStep = 6;
    seededSave.lastBiomeId = 'coastal-scrub';
    seededSave.biomeVisits['coastal-scrub'] = 2;
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    const state = readState(fakeWindow);

    expect(state.biomeId).toBe('coastal-scrub');
    expect(state.worldState).toMatchObject({
      weather: 'marine-haze',
      phenologyPhase: 'late',
    });
    expect(state.habitatProcesses).toEqual(['sand-capture']);
  });

  it('exposes the beach wrack-hold process during a late marine-haze revisit', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-beach-process-seed');
    seededSave.worldStep = 6;
    seededSave.lastBiomeId = 'beach';
    seededSave.biomeVisits.beach = 2;
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    const state = readState(fakeWindow);

    expect(state.biomeId).toBe('beach');
    expect(state.worldState).toMatchObject({
      weather: 'marine-haze',
      phenologyPhase: 'late',
    });
    expect(state.habitatProcesses).toEqual(['wrack-hold']);
  });

  it('exposes the forest moisture-hold process during a late wet revisit', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-forest-process-seed');
    seededSave.worldStep = 6;
    seededSave.lastBiomeId = 'forest';
    seededSave.biomeVisits.forest = 2;
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    const state = readState(fakeWindow);

    expect(state.biomeId).toBe('forest');
    expect(state.worldState).toMatchObject({
      weather: 'mist-drip',
      phenologyPhase: 'late',
    });
    expect(state.habitatProcesses).toEqual(['moisture-hold']);
  });

  it('exposes the treeline frost-rime process during a late windy revisit', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-treeline-process-seed');
    seededSave.worldStep = 6;
    seededSave.lastBiomeId = 'treeline';
    seededSave.biomeVisits.treeline = 2;
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    const state = readState(fakeWindow);

    expect(state.biomeId).toBe('treeline');
    expect(state.worldState).toMatchObject({
      weather: 'ridge-wind',
      phenologyPhase: 'late',
    });
    expect(state.habitatProcesses).toEqual(['frost-rime']);
  });

  it('exposes the tundra thaw fringe on a revisited peak-season meadow', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-tundra-process-seed');
    seededSave.worldStep = 4;
    seededSave.lastBiomeId = 'tundra';
    seededSave.biomeVisits.tundra = 2;
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    const state = readState(fakeWindow);

    expect(state.biomeId).toBe('tundra');
    expect(state.worldState).toMatchObject({
      weather: 'clear',
      phenologyPhase: 'peak',
    });
    expect(state.habitatProcesses).toEqual(['thaw-fringe']);
  });

  it('surfaces the current habitat zone in a tiny chip during coastal traversal', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-habitat-chip-seed');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('coastal-scrub');

    let state = readState(fakeWindow);
    expect(state.zoneId).toBe('back-dune');
    expect(state.habitatChipLabel).toBe('Back Dune');

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) => nextState.zoneId === 'windbreak-swale',
      420,
    );
    expect(state.habitatChipLabel).toBe('Windbreak Swale');
  });

  it('turns the coastal-scrub swale into one optional bluff shoulder and keeps the low route recoverable', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-coastal-bluff-seed');
    persistSave(seededSave);
    const originalStartPosition = { ...coastalScrubBiome.startPosition };
    coastalScrubBiome.startPosition = { x: 280, y: 82 };

    try {
      const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
      const game = createGame(canvas, seededSave);

      tapKey(fakeWindow, 'Enter');
      game.enterBiome('coastal-scrub');

      for (let index = 0; index < 20; index += 1) {
        fakeWindow.advanceTime?.(16);
      }

      let state = readState(fakeWindow);
      expect(state.zoneId).toBe('windbreak-swale');

      fakeWindow.dispatchEvent({ type: 'keydown', key: 'ArrowRight', preventDefault() {} });
      fakeWindow.dispatchEvent({ type: 'keydown', key: 'Space', preventDefault() {} });
      fakeWindow.advanceTime?.(16);
      fakeWindow.dispatchEvent({ type: 'keyup', key: 'Space', preventDefault() {} });

      let foundState: any = null;
      for (let index = 0; index < 90; index += 1) {
        fakeWindow.advanceTime?.(16);
        const nextState = readState(fakeWindow);
        if (
          Math.abs(nextState.player?.vy ?? 999) <= 1 &&
          (nextState.player?.x ?? 0) >= 286 &&
          (nextState.player?.x ?? 999) <= 332 &&
          (nextState.player?.y ?? 0) >= 84 &&
          (nextState.player?.y ?? 999) <= 90
        ) {
          foundState = nextState;
          break;
        }
      }
      if (!foundState) {
        throw new Error(`coastal-bluff-crest ${JSON.stringify(readState(fakeWindow))}`);
      }
      state = foundState;
      expect(state.zoneId).toBe('windbreak-swale');
      expect(state.habitatChipLabel).toBe('Windbreak Swale');
      expect(
        state.nearbyInspectables.some((entity: any) =>
          ['dune-lupine', 'pacific-wax-myrtle', 'coyote-brush', 'beach-strawberry'].includes(entity.entryId),
        ),
      ).toBe(true);

      fakeWindow.dispatchEvent({ type: 'keyup', key: 'ArrowRight', preventDefault() {} });
      fakeWindow.advanceTime?.(16);

      holdKey(fakeWindow, 'ArrowRight', 90);
      foundState = readState(fakeWindow);
      expect(['windbreak-swale', 'shore-pine-stand']).toContain(foundState.zoneId);
      expect(foundState.player?.y).toBeGreaterThan(state.player?.y ?? 0);
      expect(foundState.player?.x).toBeGreaterThan(state.player?.x ?? 0);
    } finally {
      coastalScrubBiome.startPosition = originalStartPosition;
    }
  });

  it('builds the coastal-scrub family from the normal entry into the bluff and back to the low route', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-coastal-family-seed');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('coastal-scrub');

    let state = readState(fakeWindow);
    expect(state.zoneId).toBe('back-dune');

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) =>
        ['shrub-thicket', 'windbreak-swale'].includes(nextState.zoneId ?? '') &&
        (nextState.player?.x ?? 0) >= 206 &&
        (nextState.player?.x ?? 999) <= 246 &&
        nextState.nearbyInspectables.some((entity: any) =>
          ['nootka-rose', 'dune-lupine', 'pacific-wax-myrtle'].includes(entity.entryId),
        ),
      420,
    );
    expect(['shrub-thicket', 'windbreak-swale']).toContain(state.zoneId);
    expect(
      state.nearbyInspectables.some((entity: any) =>
        ['nootka-rose', 'dune-lupine', 'pacific-wax-myrtle'].includes(entity.entryId),
      ),
    ).toBe(true);
    expect(state.nearbyTravelTarget ?? null).toBeNull();

    fakeWindow.dispatchEvent({ type: 'keydown', key: 'ArrowRight', preventDefault() {} });
    fakeWindow.dispatchEvent({ type: 'keydown', key: 'Space', preventDefault() {} });
    fakeWindow.advanceTime?.(16);
    fakeWindow.dispatchEvent({ type: 'keyup', key: 'Space', preventDefault() {} });

    let foundState: any = null;
    for (let index = 0; index < 120; index += 1) {
      fakeWindow.advanceTime?.(16);
      const nextState = readState(fakeWindow);
      if (
        Math.abs(nextState.player?.vy ?? 999) <= 1 &&
        (nextState.player?.x ?? 0) >= 280 &&
        (nextState.player?.x ?? 999) <= 304 &&
        (nextState.player?.y ?? 0) >= 106 &&
        (nextState.player?.y ?? 999) <= 112
      ) {
        foundState = nextState;
        break;
      }
    }
    if (!foundState) {
      throw new Error(`coastal-family-upper-log ${JSON.stringify(readState(fakeWindow))}`);
    }
    state = foundState;
    expect(state.zoneId).toBe('windbreak-swale');
    expect(
      state.nearbyInspectables.some((entity: any) =>
        ['dune-lupine', 'pacific-wax-myrtle', 'beach-strawberry'].includes(entity.entryId),
      ),
    ).toBe(true);

    fakeWindow.dispatchEvent({ type: 'keydown', key: 'Space', preventDefault() {} });
    fakeWindow.advanceTime?.(16);
    fakeWindow.dispatchEvent({ type: 'keyup', key: 'Space', preventDefault() {} });

    foundState = null;
    for (let index = 0; index < 90; index += 1) {
      fakeWindow.advanceTime?.(16);
      const nextState = readState(fakeWindow);
      if (
        Math.abs(nextState.player?.vy ?? 999) <= 1 &&
        (nextState.player?.x ?? 0) >= 286 &&
        (nextState.player?.x ?? 999) <= 332 &&
        (nextState.player?.y ?? 0) >= 84 &&
        (nextState.player?.y ?? 999) <= 90
      ) {
        foundState = nextState;
        break;
      }
    }
    if (!foundState) {
      throw new Error(`coastal-family-crest ${JSON.stringify(readState(fakeWindow))}`);
    }
    state = foundState;
    expect(state.zoneId).toBe('windbreak-swale');

    fakeWindow.dispatchEvent({ type: 'keyup', key: 'ArrowRight', preventDefault() {} });
    fakeWindow.advanceTime?.(16);

    const recoveredState = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) =>
        ['windbreak-swale', 'shore-pine-stand'].includes(nextState.zoneId ?? '') &&
        !nextState.player?.climbing &&
        Math.abs(nextState.player?.vy ?? 999) <= 1 &&
        (nextState.player?.x ?? 0) >= 336 &&
        (nextState.player?.y ?? 0) >= 90,
      120,
    );
    expect(['windbreak-swale', 'shore-pine-stand']).toContain(recoveredState.zoneId);
    expect(recoveredState.player?.y).toBeGreaterThanOrEqual(state.player?.y ?? 0);
    expect(recoveredState.player?.x).toBeGreaterThan(state.player?.x ?? 0);
  });

  it('adds one quiet shore-pine rest after the swale family and keeps the forestward release open', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-coastal-shore-pine-rest-seed');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('coastal-scrub');

    let state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) =>
        nextState.zoneId === 'windbreak-swale' &&
        (nextState.player?.x ?? 0) >= 280 &&
        (nextState.player?.x ?? 999) <= 304 &&
        Math.abs(nextState.player?.vy ?? 999) <= 1,
      420,
    );
    expect(state.zoneId).toBe('windbreak-swale');

    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) =>
        nextState.zoneId === 'shore-pine-stand' &&
        (nextState.player?.x ?? 0) >= 430 &&
        (nextState.player?.x ?? 999) <= 476 &&
        Math.abs(nextState.player?.vy ?? 999) <= 1 &&
        nextState.nearbyInspectables.some((entity: any) =>
          ['kinnikinnick', 'song-sparrow', 'shore-pine'].includes(entity.entryId),
        ),
      220,
    );
    expect(state.zoneId).toBe('shore-pine-stand');
    expect(state.habitatChipLabel).toBe('Shore Pine Stand');
    expect(
      state.nearbyInspectables.some((entity: any) =>
        ['kinnikinnick', 'song-sparrow', 'shore-pine'].includes(entity.entryId),
      ),
    ).toBe(true);
    expect(state.nearbyTravelTarget ?? null).toBeNull();
    expect(state.nearbyDoor?.inRange ?? false).toBe(false);

    const releasedState = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) =>
        ['shore-pine-stand', 'forest-edge'].includes(nextState.zoneId ?? '') &&
        (nextState.player?.x ?? 0) >= 516 &&
        !nextState.player?.climbing &&
        Math.abs(nextState.player?.vy ?? 999) <= 1,
      220,
    );
    expect(['shore-pine-stand', 'forest-edge']).toContain(releasedState.zoneId);
    expect(releasedState.player?.x).toBeGreaterThan(state.player?.x ?? 0);
    expect(releasedState.nearbyDoor?.inRange ?? false).toBe(false);
  });

  it('lets the coastal door enter the first corridor proof, switches ownership at the threshold, and keeps the map alive from the menu', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-corridor-proof-seed');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('coastal-scrub');

    let state = readState(fakeWindow);
    expect(state.biomeId).toBe('coastal-scrub');
    expect(state.nearbyDoor?.inRange).toBe(true);

    tapKey(fakeWindow, 'e');
    state = readState(fakeWindow);
    expect(state.sceneBiomeId).toBe('beach-coastal-corridor');
    expect(state.corridor?.ownerBiomeId).toBe('coastal-scrub');
    expect(state.corridor?.zoneId).toBe('back-dune');
    expect(state.worldState.weather).toBe('marine-haze');
    expect(state.nearbyDoor).toBeNull();

    holdKey(fakeWindow, 'ArrowLeft', 170);
    state = readState(fakeWindow);
    expect(state.sceneBiomeId).toBe('beach-coastal-corridor');
    expect(state.corridor?.ownerBiomeId).toBe('beach');
    expect(state.corridor?.zoneId).toBe('dune-edge');
    expect(state.worldState.dayPart).toBe('dusk');
    expect(state.worldState.weather).toBe('marine-haze');
    expect(state.worldState.phenologyPhase).toBe('early');

    tapKey(fakeWindow, 'j');
    state = readState(fakeWindow);
    expect(state.mode).toBe('journal');
    expect(state.journal?.selectedBiomeId).toBe('beach');

    tapKey(fakeWindow, 'Escape');
    tapKey(fakeWindow, 'm');
    state = readState(fakeWindow);
    expect(state.menu?.availableActions).toContain('world-map');

    state = readState(fakeWindow);
    expect(state.menu?.selectedAction).toBe('world-map');

    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.scene).toBe('world-map');
    expect(state.transition).toBeNull();
    expect(state.corridor).toBeNull();
    expect(state.worldMap?.currentLocationId).toBe('beach');
    expect(state.worldMap?.focusedLocationId).toBe('beach');
    expect(state.worldMap?.originLabel).toBeNull();

    tapKey(fakeWindow, 'Escape');
    state = advanceUntil(
      fakeWindow,
      (nextState) => nextState.scene === 'biome' && nextState.biomeId === 'beach',
      120,
    );
    expect(state.sceneBiomeId).toBe('beach');
    expect(state.corridor).toBeNull();
  });

  it('does not treat corridor threshold pacing as repeated visits or world-state skips', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-corridor-stability-seed');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('coastal-scrub');

    tapKey(fakeWindow, 'e');
    let state = readState(fakeWindow);
    expect(state.sceneBiomeId).toBe('beach-coastal-corridor');
    expect(state.corridor?.ownerBiomeId).toBe('coastal-scrub');

    const corridorEntryWorldState = state.worldState;
    const corridorEntryWorldStep = seededSave.worldStep;
    const corridorEntryBeachVisits = seededSave.biomeVisits.beach ?? 0;
    const corridorEntryScrubVisits = seededSave.biomeVisits['coastal-scrub'] ?? 0;

    holdKey(fakeWindow, 'ArrowLeft', 170);
    state = readState(fakeWindow);
    expect(state.corridor?.ownerBiomeId).toBe('beach');
    expect(seededSave.worldStep).toBe(corridorEntryWorldStep);
    expect(seededSave.biomeVisits.beach ?? 0).toBe(corridorEntryBeachVisits);
    expect(seededSave.biomeVisits['coastal-scrub'] ?? 0).toBe(corridorEntryScrubVisits);

    holdKey(fakeWindow, 'ArrowRight', 170);
    state = readState(fakeWindow);
    expect(state.corridor?.ownerBiomeId).toBe('coastal-scrub');
    expect(state.worldState).toEqual(corridorEntryWorldState);
    expect(seededSave.worldStep).toBe(corridorEntryWorldStep);
    expect(seededSave.biomeVisits.beach ?? 0).toBe(corridorEntryBeachVisits);
    expect(seededSave.biomeVisits['coastal-scrub'] ?? 0).toBe(corridorEntryScrubVisits);
  });

  it('counts a corridor traversal only when the player fully exits into the neighboring biome', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-corridor-exit-count-seed');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('coastal-scrub');

    const worldStepBeforeCorridor = seededSave.worldStep;
    const beachVisitsBeforeCorridor = seededSave.biomeVisits.beach ?? 0;
    const scrubVisitsBeforeCorridor = seededSave.biomeVisits['coastal-scrub'] ?? 0;

    tapKey(fakeWindow, 'e');
    const exitedState = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowLeft',
      (nextState) => nextState.scene === 'biome' && nextState.sceneBiomeId === 'beach',
      360,
    );

    expect(exitedState.biomeId).toBe('beach');
    expect(exitedState.corridor).toBeNull();
    expect(seededSave.worldStep).toBe(worldStepBeforeCorridor + 1);
    expect(seededSave.biomeVisits.beach ?? 0).toBe(beachVisitsBeforeCorridor + 1);
    expect(seededSave.biomeVisits['coastal-scrub'] ?? 0).toBe(scrubVisitsBeforeCorridor);
  });

  it('reaches the beach corridor door from the inland dune side instead of the tide edge', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-beach-corridor-door-seed');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');

    const nearDoorState = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) => Boolean(nextState.nearbyDoor?.inRange),
      120,
    );
    expect(nearDoorState.scene).toBe('biome');
    expect(nearDoorState.biomeId).toBe('beach');
    expect(nearDoorState.player.x).toBeLessThan(220);

    tapKey(fakeWindow, 'e');
    const corridorState = readState(fakeWindow);
    expect(corridorState.sceneBiomeId).toBe('beach-coastal-corridor');
    expect(corridorState.corridor?.ownerBiomeId).toBe('beach');
  });

  it('uses an authored map-return post to open the map and return to the same interior anchor', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-map-return-post-seed');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('forest');

    const nearPostState = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) => nextState.nearbyTravelTarget?.kind === 'map-return',
      420,
    );
    expect(nearPostState.sceneBiomeId).toBe('forest');
    expect(nearPostState.nearbyDoor?.targetBiomeId).toBeNull();
    expect(nearPostState.nearbyTravelTarget).toEqual({
      kind: 'map-return',
      inRange: true,
      targetBiomeId: null,
      label: 'INLAND MAP',
    });

    const postApproachX = nearPostState.player.x;

    tapKey(fakeWindow, 'e');
    let state = readState(fakeWindow);
    expect(state.transition?.kind).toBe('biome-to-map');
    expect(state.scene).toBe('transition');

    state = advanceUntil(fakeWindow, (nextState) => nextState.scene === 'world-map', 120);
    expect(state.worldMap?.currentLocationId).toBe('forest');
    expect(state.worldMap?.focusedLocationId).toBe('forest');

    tapKey(fakeWindow, 'Escape');
    state = advanceUntil(
      fakeWindow,
      (nextState) => nextState.scene === 'biome' && nextState.sceneBiomeId === 'forest',
      120,
    );
    expect(state.nearbyTravelTarget).toEqual({
      kind: 'map-return',
      inRange: true,
      targetBiomeId: null,
      label: 'INLAND MAP',
    });
    expect(Math.abs(state.player.x - postApproachX)).toBeLessThanOrEqual(24);
  });

  it('keeps the coastal-scrub map-return post reachable before the new gather band', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-coastal-map-return-post-seed');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('coastal-scrub');

    const nearPostState = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) => nextState.nearbyTravelTarget?.kind === 'map-return',
      360,
    );
    expect(nearPostState.sceneBiomeId).toBe('coastal-scrub');
    expect(nearPostState.nearbyTravelTarget).toEqual({
      kind: 'map-return',
      inRange: true,
      targetBiomeId: null,
      label: 'COAST MAP',
    });
    expect(nearPostState.player.x).toBeGreaterThanOrEqual(130);
    expect(nearPostState.player.x).toBeLessThan(206);

    const postApproachX = nearPostState.player.x;

    tapKey(fakeWindow, 'e');
    let state = readState(fakeWindow);
    expect(state.transition?.kind).toBe('biome-to-map');

    state = advanceUntil(fakeWindow, (nextState) => nextState.scene === 'world-map', 120);
    expect(state.worldMap?.currentLocationId).toBe('coastal-scrub');
    expect(state.worldMap?.focusedLocationId).toBe('coastal-scrub');

    tapKey(fakeWindow, 'Escape');
    state = advanceUntil(
      fakeWindow,
      (nextState) => nextState.scene === 'biome' && nextState.sceneBiomeId === 'coastal-scrub',
      120,
    );
    expect(state.nearbyTravelTarget).toEqual({
      kind: 'map-return',
      inRange: true,
      targetBiomeId: null,
      label: 'COAST MAP',
    });
    expect(Math.abs(state.player.x - postApproachX)).toBeLessThanOrEqual(24);
    expect(state.player.x).toBeLessThan(206);
  });

  it('uses the authored map-return post as the same-biome anchor when the map opens from the field menu', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-direct-map-return-anchor-seed');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('forest');

    let state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) => nextState.player.x >= 110,
      240,
    );
    expect(state.player.x).toBeGreaterThanOrEqual(110);
    expect(state.player.x).toBeLessThan(180);

    tapKey(fakeWindow, 'm');
    state = readState(fakeWindow);
    expect(state.menu?.selectedAction).toBe('world-map');

    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.transition?.kind).toBe('biome-to-map');
    expect(state.scene).toBe('transition');

    state = advanceUntil(fakeWindow, (nextState) => nextState.scene === 'world-map', 120);
    expect(state.worldMap?.currentLocationId).toBe('forest');
    expect(state.worldMap?.focusedLocationId).toBe('forest');
    expect(state.worldMap?.originLabel).toBeNull();

    tapKey(fakeWindow, 'Escape');
    state = advanceUntil(
      fakeWindow,
      (nextState) => nextState.scene === 'biome' && nextState.sceneBiomeId === 'forest',
      120,
    );

    expect(state.nearbyTravelTarget).toEqual({
      kind: 'map-return',
      inRange: true,
      targetBiomeId: null,
      label: 'INLAND MAP',
    });
    expect(state.player.x).toBeGreaterThanOrEqual(212);
  });

  it('warms the forest-side departure cues once High Pass is live', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-high-pass-travel-warmth-seed');
    seededSave.completedFieldRequestIds = [
      'forest-hidden-hollow',
      'forest-moisture-holders',
      'forest-survey-slice',
      'coastal-shelter-shift',
      'coastal-edge-moisture',
      'treeline-stone-shelter',
      'tundra-short-season',
      'tundra-survey-slice',
      'scrub-edge-pattern',
      'forest-cool-edge',
      'treeline-low-fell',
      'forest-expedition-upper-run',
      'forest-season-threads',
    ];
    seededSave.nurseryClaimedRewardIds = ['nursery:salmonberry-support'];
    seededSave.purchasedUpgradeIds = ['trail-stride', 'field-step', 'route-marker'];
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('forest');

    let state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) => nextState.nearbyTravelTarget?.kind === 'map-return',
      420,
    );
    expect(state.nearbyTravelTarget).toEqual({
      kind: 'map-return',
      inRange: true,
      targetBiomeId: null,
      label: 'HIGH PASS MAP',
    });

    tapKey(fakeWindow, 'e');
    state = advanceUntil(fakeWindow, (nextState) => nextState.scene === 'world-map', 120);
    expect(state.worldMap?.currentLocationId).toBe('forest');
    expect(state.worldMap?.focusedLocationId).toBe('forest');
    expect(state.worldMap?.routeReplayLabel).toBeNull();
    expect(state.worldMap?.originLabel).toBeNull();
    expect(state.worldMap?.focusedSummaryLabel).toBe('Last woods before High Pass.');

    tapKey(fakeWindow, 'ArrowUp');
    state = readState(fakeWindow);
    expect(state.worldMap?.focusedLocationId).toBe('treeline');
    expect(state.worldMap?.routeReplayLabel).toBe('Today: High Pass');
    expect(state.worldMap?.originLabel).toBe('FROM FOREST TRAIL');

    tapKey(fakeWindow, 'Enter');
    state = advanceUntil(fakeWindow, (nextState) => nextState.worldMap?.mode === 'walking', 120);
    expect(state.worldMap?.walkingLabel).toBe('HIGH PASS');
  });

  it('keeps the current origin readable on the world map when focus moves away', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-world-map-origin-label-seed');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');

    tapKey(fakeWindow, 'm');
    tapKey(fakeWindow, 'Enter');

    let state = advanceUntil(fakeWindow, (nextState) => nextState.scene === 'world-map', 120);
    expect(state.worldMap?.currentLocationId).toBe('beach');
    expect(state.worldMap?.focusedLocationId).toBe('beach');
    expect(state.worldMap?.originLabel).toBeNull();

    tapKey(fakeWindow, 'ArrowRight');
    tapKey(fakeWindow, 'ArrowRight');
    state = readState(fakeWindow);

    expect(state.worldMap?.currentLocationId).toBe('beach');
    expect(state.worldMap?.focusedLocationId).toBe('forest');
    expect(state.worldMap?.originLabel).toBe('FROM SUNNY BEACH');
  });

  it('exposes destination-aware travel cue labels on corridor doors', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-travel-cue-label-seed');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('forest');

    const nearDoorState = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowLeft',
      (nextState) =>
        nextState.nearbyTravelTarget?.kind === 'corridor' &&
        nextState.nearbyTravelTarget?.targetBiomeId === 'coastal-scrub',
      120,
    );

    expect(nearDoorState.nearbyTravelTarget).toEqual({
      kind: 'corridor',
      inRange: true,
      targetBiomeId: 'coastal-scrub',
      label: 'TO COASTAL SCRUB',
    });
  });

  it('walks the full adjacent corridor chain from beach to tundra', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-full-corridor-chain-seed');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');

    let state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) =>
        nextState.sceneBiomeId === 'beach' &&
        nextState.nearbyDoor?.inRange &&
        nextState.nearbyDoor?.targetBiomeId === 'coastal-scrub',
      220,
    );
    expect(state.biomeId).toBe('beach');

    tapKey(fakeWindow, 'e');
    state = advanceWhileHoldingKeyUntil(
      fakeWindow,
      'ArrowRight',
      (nextState) => nextState.scene === 'biome' && nextState.sceneBiomeId === 'coastal-scrub',
      420,
    );
    expect(state.biomeId).toBe('coastal-scrub');
    expect(seededSave.lastBiomeId).toBe('coastal-scrub');

    const remainingChain = [
      {
        currentBiomeId: 'coastal-scrub',
        nextBiomeId: 'forest',
        corridorId: 'coastal-forest-corridor',
      },
      {
        currentBiomeId: 'forest',
        nextBiomeId: 'treeline',
        corridorId: 'forest-treeline-corridor',
      },
      {
        currentBiomeId: 'treeline',
        nextBiomeId: 'tundra',
        corridorId: 'treeline-tundra-corridor',
      },
    ] as const;

    for (const leg of remainingChain) {
      state = advanceWhileHoldingKeyUntil(
        fakeWindow,
        'ArrowRight',
        (nextState) =>
          nextState.sceneBiomeId === leg.currentBiomeId &&
          nextState.nearbyDoor?.inRange &&
          nextState.nearbyDoor?.targetBiomeId === leg.nextBiomeId,
        1100,
      );
      expect(state.biomeId).toBe(leg.currentBiomeId);

      tapKey(fakeWindow, 'e');
      state = readState(fakeWindow);
      expect(state.sceneBiomeId).toBe(leg.corridorId);
      expect(state.corridor?.ownerBiomeId).toBe(leg.currentBiomeId);

      state = advanceWhileHoldingKeyUntil(
        fakeWindow,
        'ArrowRight',
        (nextState) => nextState.scene === 'biome' && nextState.sceneBiomeId === leg.nextBiomeId,
        420,
      );
      expect(state.biomeId).toBe(leg.nextBiomeId);
      expect(seededSave.lastBiomeId).toBe(leg.nextBiomeId);
      if (leg.nextBiomeId === 'treeline') {
        expect(state.camera?.y).toBe(0);
      }
    }

    expect(seededSave.worldStep).toBe(5);
    expect(seededSave.biomeVisits.beach ?? 0).toBeGreaterThanOrEqual(1);
    expect(seededSave.biomeVisits['coastal-scrub'] ?? 0).toBeGreaterThanOrEqual(1);
    expect(seededSave.biomeVisits.forest ?? 0).toBeGreaterThanOrEqual(1);
    expect(seededSave.biomeVisits.treeline ?? 0).toBeGreaterThanOrEqual(1);
    expect(seededSave.biomeVisits.tundra ?? 0).toBeGreaterThanOrEqual(1);
  });

  it('shows notebook prompts in the journal and reuses them in the copied field-guide prompt', async () => {
    const { window: fakeWindow, document, copiedTexts } = installFakeDom();
    const seededSave = createNewSaveState('runtime-notebook-prompt-seed');
    recordDiscovery(seededSave, beachBiome.entries['beach-grass'], 'beach');
    recordDiscovery(seededSave, beachBiome.entries['driftwood-log'], 'beach');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    tapKey(fakeWindow, 'j');

    let state = readState(fakeWindow);
    expect(state.journal?.selectedBiomeId).toBe('beach');
    expect(state.journal?.selectedEntryId).toBe('beach-grass');
    expect(state.journal?.observationPrompt).toEqual({
      family: 'comparison',
      text: 'Which bloom stays lowest where the wind still hits hard?',
      source: 'seed',
      evidenceKey: 'beach-low-bloom|dune-edge|day|clear|beach-grass',
    });

    tapKey(fakeWindow, 'Escape');
    tapKey(fakeWindow, 'm');
    tapKey(fakeWindow, 'ArrowDown');
    tapKey(fakeWindow, 'Enter');
    await Promise.resolve();
    await Promise.resolve();
    fakeWindow.advanceTime?.(16);

    state = readState(fakeWindow);
    expect(state.fieldGuideNotice?.state).toBe('copied');
    expect(copiedTexts).toHaveLength(1);
    expect(copiedTexts[0]).toContain('CURRENT NOTEBOOK LENS');
    expect(copiedTexts[0]).toContain('Prompt seed: Which bloom stays lowest where the wind still hits hard?');
  });

  it('keeps unlocked ecosystem-note teaching alongside a longer coastal notebook seed prompt', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-coastal-notebook-surface-seed');
    recordDiscovery(seededSave, coastalScrubBiome.entries['beach-grass'], 'coastal-scrub');
    recordDiscovery(seededSave, coastalScrubBiome.entries['sand-verbena'], 'coastal-scrub');
    recordDiscovery(seededSave, coastalScrubBiome.entries['dune-lupine'], 'coastal-scrub');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    const game = createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('coastal-scrub');
    tapKey(fakeWindow, 'j');

    const state = readState(fakeWindow);
    expect(state.journal?.selectedBiomeId).toBe('coastal-scrub');
    expect(state.journal?.selectedEntryId).toBe('beach-grass');
    expect(state.journal?.ecosystemNote).toEqual({
      state: 'unlocked',
      discoveredCount: 3,
      requiredCount: 2,
      title: 'Shelter Builds Here',
      summary: 'Dune plants slow wind and help harsh sand start holding more life.',
    });
    expect(state.journal?.observationPrompt).toMatchObject({
      family: 'timing',
      text: 'Which patch looks ready for flowers, fruit, or seed here?',
      source: 'seed',
    });
    expect(state.journal?.observationPrompt?.evidenceKey).toContain('coastal-ready-patch|back-dune|');
    expect(state.journal?.observationPrompt?.evidenceKey).toContain('|marine-haze|dune-lupine');
  });

  it('shows a sparse field-partner strip only during calm biome play', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-field-partner-seed');
    seededSave.lastBiomeId = 'coastal-scrub';
    seededSave.biomeVisits['coastal-scrub'] = 1;
    recordDiscovery(seededSave, coastalScrubBiome.entries['beach-grass'], 'coastal-scrub');
    recordDiscovery(seededSave, coastalScrubBiome.entries['sand-verbena'], 'coastal-scrub');
    recordDiscovery(seededSave, coastalScrubBiome.entries['dune-lupine'], 'coastal-scrub');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');
    tapKey(fakeWindow, 'j');

    let state = readState(fakeWindow);
    expect(state.mode).toBe('journal');
    expect(state.fieldPartner?.active).toBeNull();

    tapKey(fakeWindow, 'j');
    state = advanceUntil(fakeWindow, (nextState) => Boolean(nextState.fieldPartner?.active), 40);
    expect(state.mode).toBe('playing');
    expect(state.fieldPartner?.active).toMatchObject({
      cueId: 'scrub-back-dune-timing',
      text: 'This patch already feels halfway between dune and scrub.',
      family: 'timing',
      source: 'seed',
      trigger: 'biome-enter',
    });
    expect(state.fieldPartner?.active?.evidenceKey).toContain('coastal-ready-patch|back-dune|');
    expect(state.fieldPartner?.globalCooldownRemaining).toBeGreaterThan(19);

    tapKey(fakeWindow, 'j');
    state = readState(fakeWindow);
    expect(state.mode).toBe('journal');
    expect(state.fieldPartner?.active).toBeNull();

    tapKey(fakeWindow, 'j');
    fakeWindow.advanceTime?.(600);
    state = readState(fakeWindow);
    expect(state.mode).toBe('playing');
    expect(state.fieldPartner?.active).toBeNull();
    expect(state.fieldPartner?.globalCooldownRemaining).toBeGreaterThan(18);

    tapKey(fakeWindow, 'e');
    state = readState(fakeWindow);
    expect(state.fieldPartner?.active).toBeNull();
    expect(state.scene).toBe('biome');
    expect(state.sceneBiomeId).toBe('beach-coastal-corridor');
    expect(state.corridor?.ownerBiomeId).toBe('coastal-scrub');
  });

  it('shows the new windbreak-swale partner cue when the sheltered middle prompt is active', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-field-partner-swale-seed');
    seededSave.lastBiomeId = 'coastal-scrub';
    seededSave.biomeVisits['coastal-scrub'] = 1;
    recordDiscovery(seededSave, coastalScrubBiome.entries['beach-strawberry'], 'coastal-scrub');
    recordDiscovery(seededSave, coastalScrubBiome.entries['pacific-wax-myrtle'], 'coastal-scrub');
    persistSave(seededSave);

    const originalStartPosition = { ...coastalScrubBiome.startPosition };
    coastalScrubBiome.startPosition = { x: 280, y: 82 };

    try {
      const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
      createGame(canvas, seededSave);

      tapKey(fakeWindow, 'Enter');

      const state = advanceUntil(fakeWindow, (nextState) => Boolean(nextState.fieldPartner?.active), 90);
      expect(state.mode).toBe('playing');
      expect(state.zoneId).toBe('windbreak-swale');
      expect(state.fieldPartner?.active).toMatchObject({
        cueId: 'scrub-swale-shelter',
        text: 'This swale turns low cover into shelter.',
        family: 'shelter',
        source: 'seed',
        trigger: 'biome-enter',
      });
      expect(state.fieldPartner?.active?.evidenceKey).toContain('coastal-swale-shelter|windbreak-swale|');
    } finally {
      coastalScrubBiome.startPosition = originalStartPosition;
    }
  });

  it('shows the new lee-pocket partner cue after a tucked-sand discovery unlocks the note', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-field-partner-lee-pocket-seed');
    seededSave.lastBiomeId = 'beach';
    seededSave.biomeVisits.beach = 1;
    recordDiscovery(seededSave, beachBiome.entries['driftwood-log'], 'beach');
    persistSave(seededSave);

    const originalStartPosition = { ...beachBiome.startPosition };
    beachBiome.startPosition = { x: 350, y: 82 };

    try {
      const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
      const game = createGame(canvas, seededSave);

      tapKey(fakeWindow, 'Enter');

      let state = advanceUntil(
        fakeWindow,
        (nextState) =>
          nextState.zoneId === 'lee-pocket' &&
          nextState.nearbyInspectables.some((entity: any) => entity.entryId === 'beach-strawberry'),
        60,
      );
      expect(state.zoneId).toBe('lee-pocket');

      const strawberry = state.nearbyInspectables.find((entity: any) => entity.entryId === 'beach-strawberry');
      if (!strawberry) {
        throw new Error('Expected beach strawberry to be near the player in the lee pocket.');
      }

      game.inspectEntity(strawberry.entityId);
      fakeWindow.advanceTime?.(16);
      state = readState(fakeWindow);
      expect(state.openBubble).toMatchObject({
        entryId: 'beach-strawberry',
      });

      tapKey(fakeWindow, 'Escape');
      state = advanceUntil(fakeWindow, (nextState) => Boolean(nextState.fieldPartner?.active), 180);
      expect(state.mode).toBe('playing');
      expect(state.zoneId).toBe('lee-pocket');
      expect(state.fieldPartner?.active).toMatchObject({
        cueId: 'beach-lee-pocket-hold',
        text: 'Driftwood keeps this tucked sand calmer.',
        family: 'shelter',
        source: 'ecosystem-note',
        trigger: 'discovery',
      });
      expect(state.fieldPartner?.active?.evidenceKey).toContain('lee-pocket-hold|lee-pocket|');
    } finally {
      beachBiome.startPosition = originalStartPosition;
    }
  });

  it('shows a no-prompt fallback cue when weather is carrying the observation alone', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-field-partner-fallback-seed');
    seededSave.lastBiomeId = 'forest';
    seededSave.biomeVisits.forest = 1;
    seededSave.worldStep = 2;
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as HTMLCanvasElement;
    createGame(canvas, seededSave);

    tapKey(fakeWindow, 'Enter');

    const state = advanceUntil(fakeWindow, (nextState) => Boolean(nextState.fieldPartner?.active), 40);
    expect(state.mode).toBe('playing');
    expect(state.scene).toBe('biome');
    expect(state.worldState).toMatchObject({
      dayPart: 'dusk',
      weather: 'mist-drip',
    });
    expect(state.observationPrompt).toBeNull();
    expect(state.fieldPartner?.active).toMatchObject({
      cueId: 'forest-drip',
      text: 'The air here is carrying water almost as much as the ground is.',
      family: 'neighbors',
      source: 'fallback',
      trigger: 'biome-enter',
      evidenceKey: 'no-prompt',
    });
  });

  it('keeps dense journal selections visible for keyboard and pointer navigation', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-journal-scroll-seed');
    for (const entryId of [
      'moon-snail-shell',
      'native-littleneck-shell',
      'razor-clam-shell',
      'beach-grass',
      'sand-verbena',
      'sea-rocket',
    ]) {
      recordDiscovery(seededSave, beachBiome.entries[entryId], 'beach');
    }
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as FakeCanvas;
    createGame(canvas as unknown as HTMLCanvasElement, seededSave);

    tapKey(fakeWindow, 'Enter');
    tapKey(fakeWindow, 'j');

    let state = readState(fakeWindow);
    expect(state.journal?.selectedEntryId).toBe('moon-snail-shell');
    expect(state.journal?.visibleEntryIds).toContain('moon-snail-shell');
    expect(state.journal?.visibleEntryIds).toContain('native-littleneck-shell');
    expect(state.journal?.canScrollUp).toBe(false);
    expect(state.journal?.canScrollDown).toBe(true);
    expect(state.journal?.scrollTargets).toHaveLength(1);
    expect(state.journal?.scrollTargets[0]?.direction).toBe(1);

    tapKey(fakeWindow, 'ArrowDown');
    tapKey(fakeWindow, 'ArrowDown');
    tapKey(fakeWindow, 'ArrowDown');
    state = readState(fakeWindow);
    expect(state.journal?.selectedEntryId).toBe('beach-grass');
    expect(state.journal?.visibleEntryIds).toContain('razor-clam-shell');
    expect(state.journal?.visibleEntryIds).toContain('beach-grass');
    expect(state.journal?.canScrollUp).toBe(true);
    expect(state.journal?.canScrollDown).toBe(true);

    const downTarget = state.journal?.scrollTargets.find((target: any) => target.direction === 1);
    if (!downTarget) {
      throw new Error('Expected a down scroll target for the dense journal page.');
    }

    tapCanvas(canvas, downTarget.x + Math.floor(downTarget.w / 2), downTarget.y + Math.floor(downTarget.h / 2));
    fakeWindow.advanceTime?.(16);

    state = readState(fakeWindow);
    expect(state.journal?.selectedEntryId).toBe('sea-rocket');
    expect(state.journal?.visibleEntryIds).toContain('beach-grass');
    expect(state.journal?.visibleEntryIds).toContain('sea-rocket');

    const upTarget = state.journal?.scrollTargets.find((target: any) => target.direction === -1);
    if (!upTarget) {
      throw new Error('Expected an up scroll target after scrolling down the dense journal page.');
    }

    tapCanvas(canvas, upTarget.x + Math.floor(upTarget.w / 2), upTarget.y + Math.floor(upTarget.h / 2));
    fakeWindow.advanceTime?.(16);

    state = readState(fakeWindow);
    expect(state.journal?.selectedEntryId).toBe('beach-grass');
    expect(state.journal?.visibleEntryIds).toContain('razor-clam-shell');
    expect(state.journal?.visibleEntryIds).toContain('beach-grass');
  });

  it('opens same-pane habitat comparison cards only after local note context exists in both seen biomes', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-comparison-seed');
    recordDiscovery(seededSave, beachBiome.entries['beach-grass'], 'beach');
    recordDiscovery(seededSave, coastalScrubBiome.entries['beach-grass'], 'coastal-scrub');
    recordDiscovery(seededSave, beachBiome.entries['pacific-sand-crab'], 'beach');
    recordDiscovery(seededSave, coastalScrubBiome.entries['dune-lupine'], 'coastal-scrub');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as FakeCanvas;
    const game = createGame(canvas as unknown as HTMLCanvasElement, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('coastal-scrub');
    tapKey(fakeWindow, 'j');

    let state = readState(fakeWindow);
    expect(state.journal?.selectedBiomeId).toBe('coastal-scrub');
    expect(state.journal?.selectedEntryId).toBe('beach-grass');
    expect(state.journal?.comparison?.available).toBe(true);
    expect(state.journal?.comparison?.open).toBe(false);
    expect(state.journal?.comparison?.cards.map((card: any) => card.biomeId)).toEqual(['beach', 'coastal-scrub']);
    expect(state.journal?.actionTargets.map((target: any) => target.id)).toContain('toggle-comparison');

    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.journal?.comparison?.open).toBe(true);
    expect(state.journal?.selectedEntryId).toBe('beach-grass');
    expect(state.journal?.comparison?.cards.map((card: any) => card.noteTitle)).toEqual([
      'Shore Shelter',
      'Shelter Builds Here',
    ]);

    const toggleTarget = state.journal?.actionTargets.find((target: any) => target.id === 'toggle-comparison');
    if (!toggleTarget) {
      throw new Error('Expected a comparison toggle target in the journal detail pane.');
    }

    tapCanvas(canvas, toggleTarget.x + Math.floor(toggleTarget.w / 2), toggleTarget.y + Math.floor(toggleTarget.h / 2));
    fakeWindow.advanceTime?.(16);

    state = readState(fakeWindow);
    expect(state.journal?.comparison?.open).toBe(false);
  });

  it('surfaces the new nootka-rose comparison once scrub and forest notes are both unlocked', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-nootka-rose-comparison-seed');
    recordDiscovery(seededSave, coastalScrubBiome.entries['nootka-rose'], 'coastal-scrub');
    recordDiscovery(seededSave, forestBiome.entries['nootka-rose'], 'forest');
    recordDiscovery(seededSave, coastalScrubBiome.entries['song-sparrow'], 'coastal-scrub');
    recordDiscovery(seededSave, forestBiome.entries['red-huckleberry'], 'forest');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as FakeCanvas;
    const game = createGame(canvas as unknown as HTMLCanvasElement, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('forest');
    tapKey(fakeWindow, 'j');

    let state = readState(fakeWindow);
    expect(state.journal?.selectedBiomeId).toBe('forest');
    expect(state.journal?.selectedEntryId).toBe('nootka-rose');
    expect(state.journal?.comparison?.available).toBe(true);
    expect(state.journal?.comparison?.open).toBe(false);
    expect(state.journal?.comparison?.cards.map((card: any) => card.biomeId)).toEqual(['coastal-scrub', 'forest']);

    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.journal?.comparison?.open).toBe(true);
    expect(state.journal?.comparison?.cards.map((card: any) => card.noteTitle)).toEqual([
      'Thorny Cover',
      'Edge Berry Thicket',
    ]);
  });

  it('surfaces the new beach-pea comparison once both front-half runner notes are unlocked', () => {
    const { window: fakeWindow, document } = installFakeDom();
    const seededSave = createNewSaveState('runtime-beach-pea-comparison-seed');
    recordDiscovery(seededSave, beachBiome.entries['beach-pea'], 'beach');
    recordDiscovery(seededSave, coastalScrubBiome.entries['beach-pea'], 'coastal-scrub');
    recordDiscovery(seededSave, beachBiome.entries['sand-verbena'], 'beach');
    recordDiscovery(seededSave, coastalScrubBiome.entries['dune-lupine'], 'coastal-scrub');
    persistSave(seededSave);

    const canvas = document.createElement('canvas') as unknown as FakeCanvas;
    const game = createGame(canvas as unknown as HTMLCanvasElement, seededSave);

    tapKey(fakeWindow, 'Enter');
    game.enterBiome('beach');
    tapKey(fakeWindow, 'j');

    let state = readState(fakeWindow);
    expect(state.journal?.selectedBiomeId).toBe('beach');
    expect(state.journal?.selectedEntryId).toBe('beach-pea');
    expect(state.journal?.comparison?.available).toBe(true);
    expect(state.journal?.comparison?.open).toBe(false);
    expect(state.journal?.comparison?.cards.map((card: any) => card.biomeId)).toEqual(['beach', 'coastal-scrub']);

    tapKey(fakeWindow, 'Enter');
    state = readState(fakeWindow);
    expect(state.journal?.comparison?.open).toBe(true);
    expect(state.journal?.comparison?.cards.map((card: any) => card.noteTitle)).toEqual([
      'Low Runner Band',
      'Runner Hold',
    ]);
  });
});
