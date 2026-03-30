export interface UiRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface UiPadding {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

type UiPaddingInput = number | Partial<UiPadding>;

function normalizePadding(input: UiPaddingInput): UiPadding {
  if (typeof input === 'number') {
    return { top: input, right: input, bottom: input, left: input };
  }

  return {
    top: input.top ?? 0,
    right: input.right ?? 0,
    bottom: input.bottom ?? 0,
    left: input.left ?? 0,
  };
}

export function makeRect(x: number, y: number, w: number, h: number): UiRect {
  return {
    x,
    y,
    w: Math.max(0, w),
    h: Math.max(0, h),
  };
}

export function insetRect(rect: UiRect, padding: UiPaddingInput): UiRect {
  const safe = normalizePadding(padding);

  return makeRect(
    rect.x + safe.left,
    rect.y + safe.top,
    rect.w - safe.left - safe.right,
    rect.h - safe.top - safe.bottom,
  );
}

export function splitRectColumns(rect: UiRect, leftWidth: number, gap: number): [UiRect, UiRect] {
  const safeGap = Math.max(0, gap);
  const clampedLeftWidth = Math.max(0, Math.min(leftWidth, rect.w - safeGap));
  const rightWidth = Math.max(0, rect.w - clampedLeftWidth - safeGap);

  return [
    makeRect(rect.x, rect.y, clampedLeftWidth, rect.h),
    makeRect(rect.x + clampedLeftWidth + safeGap, rect.y, rightWidth, rect.h),
  ];
}

export function takeBottom(
  rect: UiRect,
  bottomHeight: number,
  gap = 0,
): { top: UiRect; bottom: UiRect } {
  const safeBottomHeight = Math.max(0, Math.min(bottomHeight, rect.h));
  const safeGap = Math.max(0, Math.min(gap, Math.max(0, rect.h - safeBottomHeight)));
  const topHeight = Math.max(0, rect.h - safeBottomHeight - safeGap);

  return {
    top: makeRect(rect.x, rect.y, rect.w, topHeight),
    bottom: makeRect(rect.x, rect.y + rect.h - safeBottomHeight, rect.w, safeBottomHeight),
  };
}

export function maxLinesForHeight(height: number, lineHeight: number): number {
  if (height <= 0 || lineHeight <= 0) {
    return 0;
  }

  return Math.max(1, Math.floor((height + 1) / lineHeight));
}

export function rightAlignTextX(
  context: CanvasRenderingContext2D,
  text: string,
  rect: UiRect,
  padding = 0,
): number {
  return rect.x + Math.max(padding, rect.w - context.measureText(text).width - padding);
}

export function wrapTextLines(
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines = 99,
): string[] {
  if (!text) {
    return [];
  }

  const words = text.split(' ');
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (context.measureText(candidate).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }

    if (lines.length >= maxLines) {
      return lines.slice(0, maxLines);
    }
  }

  if (current && lines.length < maxLines) {
    lines.push(current);
  }

  return lines;
}
