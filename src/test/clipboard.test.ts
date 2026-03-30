import { afterEach, describe, expect, it } from 'vitest';

import { copyTextToClipboard } from '../engine/clipboard';

const originalNavigator = Object.getOwnPropertyDescriptor(globalThis, 'navigator');

afterEach(() => {
  if (originalNavigator) {
    Object.defineProperty(globalThis, 'navigator', originalNavigator);
  } else {
    // @ts-expect-error test cleanup for environments without navigator
    delete globalThis.navigator;
  }
});

describe('clipboard helper', () => {
  it('returns true when navigator.clipboard.writeText succeeds', async () => {
    const writes: string[] = [];
    Object.defineProperty(globalThis, 'navigator', {
      configurable: true,
      value: {
        clipboard: {
          writeText: async (text: string) => {
            writes.push(text);
          },
        },
      },
    });

    await expect(copyTextToClipboard('hello field guide')).resolves.toBe(true);
    expect(writes).toEqual(['hello field guide']);
  });

  it('returns false when clipboard access is unavailable', async () => {
    Object.defineProperty(globalThis, 'navigator', {
      configurable: true,
      value: {},
    });

    await expect(copyTextToClipboard('hello field guide')).resolves.toBe(false);
  });
});
