/**
 * Shared fake DOM and game-loop test utilities.
 *
 * These were extracted from runtime-smoke.test.ts so that other test files
 * can spin up a headless game instance without duplicating the fakes.
 */

export class FakeEventTarget {
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

export class FakeLocalStorage {
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

export class FakeCanvasContext {
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

export class FakeCanvas extends FakeEventTarget {
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

export class FakeDocument {
  createElement(tagName: string): HTMLElement {
    if (tagName === 'canvas') {
      return new FakeCanvas() as unknown as HTMLElement;
    }

    return {} as HTMLElement;
  }
}

export class FakeWindow extends FakeEventTarget {
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

/**
 * Installs a fake browser DOM on globalThis so that `createGame` can run
 * in a Vitest (Node) environment. Call `restoreDom()` in afterEach to clean up.
 */
export function installFakeDom(): { window: FakeWindow; document: FakeDocument; copiedTexts: string[] } {
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

/** Restores the real globalThis.window/document/etc. Call in afterEach. */
export function restoreDom(): void {
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
}

/** Parse the JSON state blob from the game's render_game_to_text hook. */
export function readState(fakeWindow: FakeWindow): any {
  const raw = fakeWindow.render_game_to_text?.();
  if (!raw) {
    throw new Error('Expected render_game_to_text to be available.');
  }
  return JSON.parse(raw);
}

/** Simulate a single key tap (keydown + one frame + keyup + one frame). */
export function tapKey(fakeWindow: FakeWindow, key: string): void {
  fakeWindow.dispatchEvent({ type: 'keydown', key, preventDefault() {} });
  fakeWindow.advanceTime?.(16);
  fakeWindow.dispatchEvent({ type: 'keyup', key, preventDefault() {} });
  fakeWindow.advanceTime?.(16);
}

/** Simulate a pointer tap on a canvas element. */
export function tapCanvas(canvas: FakeCanvas, x: number, y: number): void {
  canvas.dispatchEvent({ type: 'pointerdown', clientX: x, clientY: y });
}

/** Hold a key for N frames then release. */
export function holdKey(fakeWindow: FakeWindow, key: string, frames: number): void {
  fakeWindow.dispatchEvent({ type: 'keydown', key, preventDefault() {} });
  for (let index = 0; index < frames; index += 1) {
    fakeWindow.advanceTime?.(16);
  }
  fakeWindow.dispatchEvent({ type: 'keyup', key, preventDefault() {} });
  fakeWindow.advanceTime?.(16);
}

/** Hold a key and advance frames until a predicate is met. */
export function advanceWhileHoldingKeyUntil(
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

/** Hold multiple keys and advance frames until a predicate is met. */
export function advanceWhileHoldingKeysUntil(
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

/** Advance time (no keys held) until a predicate is met. */
export function advanceUntil(
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
