import type { FieldSeasonExpeditionState } from './field-season-board';
import {
  drawUiText,
  drawWrappedTextInRect,
  fillPixelPanel,
} from './pixel-ui';
import { makeRect, rightAlignTextX, type UiRect } from './ui-layout';
import type { BiomeDefinition } from './types';

interface FieldStationExpeditionPageOptions {
  context: CanvasRenderingContext2D;
  palette: BiomeDefinition['palette'];
  contentRect: UiRect;
  seasonBodyTop: number;
  expedition: FieldSeasonExpeditionState;
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

export function drawFieldStationExpeditionPage({
  context,
  palette,
  contentRect,
  seasonBodyTop,
  expedition,
}: FieldStationExpeditionPageOptions): void {
  const cardRect = makeRect(contentRect.x, seasonBodyTop, contentRect.w, 72);
  const expeditionStatusColor = expedition.status === 'locked' ? palette.text : palette.accent;

  fillPixelPanel(context, cardRect.x, cardRect.y, cardRect.w, cardRect.h, palette.journalPage, palette.accent);
  drawUiText(context, expedition.title, cardRect.x + 4, cardRect.y + 5, palette.text);
  drawUiText(
    context,
    expedition.statusLabel,
    rightAlignTextX(context, expedition.statusLabel, cardRect, 4),
    cardRect.y + 5,
    expeditionStatusColor,
  );
  drawWrappedTextInRect(
    context,
    expedition.summary,
    makeRect(cardRect.x + 4, cardRect.y + 14, cardRect.w - 8, 18),
    6,
    palette.text,
    3,
  );
  drawUiText(context, 'STARTS', cardRect.x + 4, cardRect.y + 36, palette.accent);
  drawUiText(
    context,
    fitTextToWidth(context, expedition.startText, cardRect.w - 46),
    cardRect.x + 40,
    cardRect.y + 36,
    palette.text,
  );
  drawWrappedTextInRect(
    context,
    expedition.note,
    makeRect(cardRect.x + 4, cardRect.y + 46, cardRect.w - 8, 18),
    6,
    expeditionStatusColor,
    3,
  );
  if (expedition.teaser) {
    const teaserRect = makeRect(contentRect.x, cardRect.y + cardRect.h + 2, contentRect.w, 13);
    fillPixelPanel(
      context,
      teaserRect.x,
      teaserRect.y,
      teaserRect.w,
      teaserRect.h,
      palette.journalSelected,
      palette.cardShadow,
    );
    drawUiText(context, expedition.teaser.label, teaserRect.x + 4, teaserRect.y + 2, palette.accent);
    drawUiText(
      context,
      fitTextToWidth(context, expedition.teaser.text, teaserRect.w - 8),
      teaserRect.x + 4,
      teaserRect.y + 8,
      palette.text,
    );
  }
}
