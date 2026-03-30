import { describe, expect, it } from 'vitest';

import {
  insetRect,
  makeRect,
  maxLinesForHeight,
  splitRectColumns,
  takeBottom,
  wrapTextLines,
} from '../engine/ui-layout';

function createMockContext(): CanvasRenderingContext2D {
  return {
    measureText(text: string) {
      return { width: text.length * 4 } as TextMetrics;
    },
  } as CanvasRenderingContext2D;
}

describe('ui-layout helpers', () => {
  it('insets rectangles without going negative', () => {
    expect(insetRect(makeRect(10, 12, 40, 30), { top: 4, right: 6, bottom: 8, left: 2 })).toEqual({
      x: 12,
      y: 16,
      w: 32,
      h: 18,
    });

    expect(insetRect(makeRect(0, 0, 6, 6), 8)).toEqual({ x: 8, y: 8, w: 0, h: 0 });
  });

  it('splits columns and bottom strips predictably', () => {
    expect(splitRectColumns(makeRect(10, 20, 100, 40), 36, 8)).toEqual([
      { x: 10, y: 20, w: 36, h: 40 },
      { x: 54, y: 20, w: 56, h: 40 },
    ]);

    expect(takeBottom(makeRect(8, 8, 50, 30), 10, 4)).toEqual({
      top: { x: 8, y: 8, w: 50, h: 16 },
      bottom: { x: 8, y: 28, w: 50, h: 10 },
    });
  });

  it('wraps text into a bounded number of lines', () => {
    const context = createMockContext();

    expect(wrapTextLines(context, 'tiny field notes for kids', 20)).toEqual([
      'tiny',
      'field',
      'notes',
      'for',
      'kids',
    ]);

    expect(wrapTextLines(context, 'tiny field notes for kids', 40, 2)).toEqual(['tiny field', 'notes for']);
    expect(maxLinesForHeight(23, 6)).toBe(4);
  });
});
