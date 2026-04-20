import type { FieldPartnerNotice } from './field-partner';
import {
  drawUiText,
  drawUiTextInRect,
  fillLeafGreenPanel,
  fillPixelPanel,
  UI_FONT_SMALL,
} from './pixel-ui';
import { makeRect, wrapTextLines } from './ui-layout';
import type { BiomeDefinition } from './types';

interface NoticeSurfaceOptions {
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  palette: BiomeDefinition['palette'];
}

interface FieldGuideNoticeOptions extends NoticeSurfaceOptions {
  state: 'copied' | 'failed';
}

interface FieldRequestNoticeOptions extends NoticeSurfaceOptions {
  frameCount: number;
  title: string;
  text: string;
  variant: 'default' | 'notebook-ready' | 'filed-route';
}

interface FieldRequestHintOptions extends NoticeSurfaceOptions {
  title: string | null;
  isVisible: boolean;
  variant: 'default' | 'support-biased';
}

interface FieldPartnerNoticeOptions extends NoticeSurfaceOptions {
  notice: FieldPartnerNotice;
}

function fitTextToWidth(
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string {
  if (context.measureText(text).width <= maxWidth) {
    return text;
  }

  let trimmed = text;
  while (trimmed.length > 1 && context.measureText(`${trimmed}…`).width > maxWidth) {
    trimmed = trimmed.slice(0, -1);
  }

  return `${trimmed}…`;
}

export function drawFieldGuideNotice({
  context,
  width,
  height,
  state,
}: FieldGuideNoticeOptions): void {
  const failed = state === 'failed';
  const rect = failed
    ? makeRect(Math.round((width - 136) / 2), height - 32, 136, 28)
    : makeRect(Math.round((width - 128) / 2), height - 26, 128, 22);

  fillLeafGreenPanel(context, rect.x, rect.y, rect.w, rect.h);
  context.font = UI_FONT_SMALL;
  if (failed) {
    drawUiTextInRect(context, "COPY DIDN'T WORK", makeRect(rect.x + 6, rect.y + 4, rect.w - 12, 8), '#395f56', { align: 'center' });
    drawUiTextInRect(context, 'ALLOW COPY, TRY AGAIN', makeRect(rect.x + 6, rect.y + 12, rect.w - 12, 8), '#395f56', { align: 'center' });
    return;
  }

  drawUiTextInRect(context, 'FIELD GUIDE COPIED', makeRect(rect.x + 6, rect.y + 6, rect.w - 12, 8), '#395f56', { align: 'center' });
}

export function drawFieldRequestNotice({
  context,
  width,
  height,
  frameCount,
  title,
  text,
  variant,
}: FieldRequestNoticeOptions): void {
  const rect = makeRect(Math.round((width - 154) / 2), height - 36, 154, 32);
  const pulseOn = Math.floor(frameCount / 8) % 2 === 0;

  fillLeafGreenPanel(context, rect.x, rect.y, rect.w, rect.h);
  context.font = UI_FONT_SMALL;

  if (variant !== 'default') {
    const badgeRect = makeRect(rect.x + rect.w - 18, rect.y + 5, 10, 10);
    fillPixelPanel(context, badgeRect.x, badgeRect.y, badgeRect.w, badgeRect.h, '#fff7de', '#395f56');
    context.fillStyle = '#395f56';
    if (variant === 'notebook-ready') {
      context.fillRect(badgeRect.x + 3, badgeRect.y + 2, 4, 1);
      context.fillRect(badgeRect.x + 3, badgeRect.y + 4, 3, 1);
      context.fillRect(badgeRect.x + 3, badgeRect.y + 6, 4, 1);
      if (pulseOn) {
        context.fillRect(badgeRect.x + 7, badgeRect.y + 2, 1, 1);
        context.fillRect(badgeRect.x + 8, badgeRect.y + 3, 1, 1);
      }
    } else {
      context.fillRect(badgeRect.x + 2, badgeRect.y + 3, 4, 3);
      context.fillRect(badgeRect.x + 4, badgeRect.y + 1, 4, 3);
      if (pulseOn) {
        context.fillRect(badgeRect.x + 2, badgeRect.y + 7, 5, 1);
      }
    }

    context.fillStyle = pulseOn ? '#395f56' : '#8aa295';
    context.fillRect(rect.x + 10, rect.y + rect.h - 6, rect.w - 20, 1);
  }

  drawUiTextInRect(
    context,
    fitTextToWidth(context, title.toUpperCase(), rect.w - (variant === 'default' ? 8 : 26)),
    makeRect(rect.x + 4, rect.y + 2, rect.w - (variant === 'default' ? 8 : 26), 8),
    '#395f56',
    { align: 'center' },
  );
  drawUiTextInRect(context, fitTextToWidth(context, text, rect.w - 8), makeRect(rect.x + 4, rect.y + 10, rect.w - 8, 8), '#395f56', { align: 'center' });
  drawUiTextInRect(context, 'DETAILS IN JOURNAL (J)', makeRect(rect.x + 4, rect.y + 19, rect.w - 8, 8), '#395f56', { align: 'center' });
}

export function drawFieldRequestHintChip({
  context,
  width,
  palette,
  title,
  isVisible,
  variant,
}: FieldRequestHintOptions): void {
  if (!isVisible || !title) {
    return;
  }

  const rect = makeRect(width - 86, 24, 78, 18);
  fillPixelPanel(context, rect.x, rect.y, rect.w, rect.h, palette.journalPage, palette.cardShadow);
  drawUiTextInRect(context, 'NOTEBOOK J', makeRect(rect.x + 4, rect.y + 2, rect.w - 8, 8), palette.accent, {
    align: 'center',
  });
  if (variant === 'support-biased') {
    const badgeX = rect.x + rect.w - 12;
    const badgeY = rect.y + 3;
    context.fillStyle = palette.accent;
    context.fillRect(badgeX + 1, badgeY + 1, 3, 3);
    context.fillRect(badgeX + 3, badgeY + 3, 1, 1);
    context.fillRect(badgeX + 4, badgeY + 4, 2, 1);
    context.fillRect(badgeX + 5, badgeY + 5, 1, 1);
  }
  drawUiTextInRect(
    context,
    fitTextToWidth(context, title.toUpperCase(), rect.w - 8),
    makeRect(rect.x + 4, rect.y + 9, rect.w - 8, 8),
    palette.text,
    { align: 'center' },
  );
}

export function drawFieldPartnerNotice({
  context,
  width,
  height,
  palette,
  notice,
}: FieldPartnerNoticeOptions): void {
  const rect = makeRect(Math.round((width - 148) / 2), height - 24, 148, 18);
  const textRect = makeRect(rect.x + 6, rect.y + 4, rect.w - 12, rect.h - 6);

  fillPixelPanel(context, rect.x, rect.y, rect.w, rect.h, palette.journalPage, palette.accent);
  context.font = UI_FONT_SMALL;
  const lines = wrapTextLines(context, notice.text, textRect.w, 2);
  if (lines.length <= 1) {
    drawUiTextInRect(context, lines[0] ?? '', textRect, palette.text);
    return;
  }

  drawUiText(context, lines[0], textRect.x, rect.y + 9, palette.text);
  drawUiText(context, lines[1], textRect.x, rect.y + 15, palette.text);
}
