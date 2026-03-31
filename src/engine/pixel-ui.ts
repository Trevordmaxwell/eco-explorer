import { maxLinesForHeight, type UiRect, wrapTextLines } from './ui-layout';
import type { VerticalCueStyle } from './types';

export const UI_FONT_SMALL = 'bold 7px Verdana, Geneva, sans-serif';
export const UI_FONT_MEDIUM = 'bold 8px Verdana, Geneva, sans-serif';

function getFontPixelHeight(font: string): number {
  const match = font.match(/(\d+)px/);
  return match ? Number.parseInt(match[1], 10) : 8;
}

export function fillPixelPanel(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  fill: string,
  border: string,
): void {
  context.fillStyle = border;
  context.fillRect(x, y, w, h);
  context.fillStyle = fill;
  context.fillRect(x + 2, y + 2, w - 4, h - 4);
}

export function fillLeafGreenPanel(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
): void {
  context.fillStyle = '#395f56';
  context.fillRect(x, y, w, h);
  context.fillStyle = '#b8d0c6';
  context.fillRect(x + 2, y + 2, w - 4, h - 4);
  context.fillStyle = '#fff7de';
  context.fillRect(x + 4, y + 4, w - 8, h - 8);
}

export function drawWrappedText(
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  color: string,
  maxLines = 99,
): number {
  const lines = wrapTextLines(context, text, maxWidth, maxLines);

  context.fillStyle = color;

  for (let index = 0; index < lines.length; index += 1) {
    const lineY = y + index * lineHeight;
    context.fillStyle = 'rgba(255, 247, 222, 0.9)';
    context.fillText(lines[index], Math.round(x), Math.round(lineY) + 1);
    context.fillStyle = color;
    context.fillText(lines[index], Math.round(x), Math.round(lineY));
  }

  return y + lines.length * lineHeight;
}

export function drawUiText(
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  color: string,
): void {
  context.fillStyle = 'rgba(255, 247, 222, 0.9)';
  context.fillText(text, Math.round(x), Math.round(y) + 1);
  context.fillStyle = color;
  context.fillText(text, Math.round(x), Math.round(y));
}

export function drawUiTextInRect(
  context: CanvasRenderingContext2D,
  text: string,
  rect: UiRect,
  color: string,
  options?: {
    align?: 'left' | 'center' | 'right';
    padding?: number;
    yOffset?: number;
  },
): void {
  const padding = options?.padding ?? 0;
  const fontHeight = getFontPixelHeight(context.font);
  const y = rect.y + Math.floor((rect.h + fontHeight) / 2) - 1 + (options?.yOffset ?? 0);
  let x = rect.x + padding;

  if (options?.align === 'center') {
    x = rect.x + Math.floor((rect.w - context.measureText(text).width) / 2);
  } else if (options?.align === 'right') {
    x = rect.x + rect.w - context.measureText(text).width - padding;
  }

  drawUiText(context, text, x, y, color);
}

export function drawWrappedTextInRect(
  context: CanvasRenderingContext2D,
  text: string,
  rect: UiRect,
  lineHeight: number,
  color: string,
  maxLines = maxLinesForHeight(rect.h, lineHeight),
): number {
  return drawWrappedText(context, text, rect.x, rect.y, rect.w, lineHeight, color, maxLines);
}

export function drawInteractMarker(
  context: CanvasRenderingContext2D,
  centerX: number,
  topY: number,
  minX: number,
  maxX: number,
): void {
  const width = 9;
  const x = Math.max(minX, Math.min(Math.round(centerX - width / 2), maxX - width));

  context.fillStyle = '#c98a4f';
  context.fillRect(x + 3, topY, 3, 2);
  context.fillRect(x + 2, topY + 2, 5, 2);
  context.fillRect(x + 1, topY + 4, 7, 2);
  context.fillRect(x + 4, topY + 6, 1, 3);
  context.fillStyle = '#fff7de';
  context.fillRect(x + 3, topY + 1, 3, 1);
  context.fillRect(x + 2, topY + 3, 5, 1);
  context.fillRect(x + 1, topY + 5, 7, 1);
}

export function drawTravelCue(
  context: CanvasRenderingContext2D,
  label: string,
  centerX: number,
  markerTopY: number,
  minX: number,
  maxX: number,
): void {
  const previousFont = context.font;
  context.font = UI_FONT_SMALL;

  const panelWidth = Math.max(28, Math.ceil(context.measureText(label).width) + 8);
  const panelX = Math.max(minX, Math.min(Math.round(centerX - panelWidth / 2), maxX - panelWidth));
  const panelY = Math.max(4, markerTopY - 14);

  fillPixelPanel(context, panelX, panelY, panelWidth, 10, '#fff7de', '#395f56');
  drawUiText(context, label, panelX + 4, panelY + 7, '#395f56');
  context.font = previousFont;

  drawInteractMarker(context, centerX, markerTopY, minX, maxX);
}

export function drawClimbHint(
  context: CanvasRenderingContext2D,
  centerX: number,
  topY: number,
  minX: number,
  maxX: number,
): void {
  const width = 7;
  const x = Math.max(minX, Math.min(Math.round(centerX - width / 2), maxX - width));

  context.fillStyle = '#c98a4f';
  context.fillRect(x + 3, topY, 1, 1);
  context.fillRect(x + 2, topY + 1, 3, 1);
  context.fillRect(x + 1, topY + 2, 5, 1);
  context.fillRect(x + 2, topY + 3, 1, 5);
  context.fillRect(x + 4, topY + 3, 1, 5);
  context.fillRect(x + 2, topY + 4, 3, 1);
  context.fillRect(x + 2, topY + 6, 3, 1);

  context.fillStyle = '#fff7de';
  context.fillRect(x + 3, topY + 1, 1, 1);
  context.fillRect(x + 2, topY + 2, 3, 1);
  context.fillRect(x + 3, topY + 4, 1, 1);
  context.fillRect(x + 3, topY + 6, 1, 1);
}

export function drawVerticalCue(
  context: CanvasRenderingContext2D,
  style: VerticalCueStyle,
  x: number,
  y: number,
): void {
  if (style === 'recovery-light') {
    context.fillStyle = '#c98a4f';
    context.fillRect(x + 2, y, 2, 1);
    context.fillRect(x + 1, y + 1, 4, 1);
    context.fillStyle = '#fff7de';
    context.fillRect(x + 2, y + 2, 2, 5);
    context.fillRect(x + 1, y + 4, 4, 1);
    return;
  }

  context.fillStyle = '#c98a4f';
  context.fillRect(x + 1, y, 4, 1);
  context.fillRect(x, y + 1, 1, 2);
  context.fillRect(x + 5, y + 1, 1, 2);
  context.fillRect(x + 1, y + 3, 4, 1);
  context.fillStyle = '#fff7de';
  context.fillRect(x + 1, y + 1, 4, 2);
  context.fillRect(x + 2, y + 2, 2, 1);
}

export function drawPanelButton(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  label: string,
  options: {
    fill: string;
    border: string;
    text: string;
    selected?: boolean;
  },
): void {
  const fill = options.selected ? options.border : options.fill;
  const border = options.selected ? options.text : options.border;
  const text = options.selected ? '#fff7de' : options.text;

  fillPixelPanel(context, x, y, w, h, fill, border);
  drawUiTextInRect(context, label, { x, y, w, h }, text, { align: 'center' });
}
