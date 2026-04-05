import type {
  FieldAtlasState,
  FieldSeasonBoardState,
  FieldSeasonWrapState,
} from './field-season-board';
import type { FieldUpgradeState } from './field-station';
import {
  drawUiText,
  drawUiTextInRect,
  drawWrappedTextInRect,
  fillPixelPanel,
} from './pixel-ui';
import { makeRect, rightAlignTextX, type UiRect } from './ui-layout';
import type { BiomeDefinition, OutingSupportId } from './types';

interface FieldStationRoutesPageOptions {
  context: CanvasRenderingContext2D;
  palette: BiomeDefinition['palette'];
  contentRect: UiRect;
  seasonBodyTop: number;
  seasonWrap: FieldSeasonWrapState;
  routeBoard: FieldSeasonBoardState;
  atlas: FieldAtlasState | null;
  upgrades: FieldUpgradeState[];
  selectedUpgradeId: string | null;
  selectedOutingSupportId: OutingSupportId;
  outingSupportSelected: boolean;
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

function getSelectedOutingSupportLabel(selectedOutingSupportId: OutingSupportId): string {
  switch (selectedOutingSupportId) {
    case 'route-marker':
      return 'ROUTE MARKER';
    case 'place-tab':
      return 'PLACE TAB';
    case 'note-tabs':
      return 'NOTE TABS';
    default:
      return 'HAND LENS';
  }
}

function getRouteBeatPrefix(status: FieldSeasonBoardState['beats'][number]['status']): string {
  switch (status) {
    case 'done':
      return 'DONE';
    case 'ready':
      return 'FILE';
    case 'active':
      return 'NOW';
    default:
      return 'NEXT';
  }
}

export function drawFieldStationRoutesPage({
  context,
  palette,
  contentRect,
  seasonBodyTop,
  seasonWrap,
  routeBoard,
  atlas,
  upgrades,
  selectedUpgradeId,
  selectedOutingSupportId,
  outingSupportSelected,
}: FieldStationRoutesPageOptions): void {
  const boardProgressLabel = routeBoard.launchCard
    ? routeBoard.launchCard.progressLabel
    : routeBoard.complete
      ? 'LOGGED'
      : routeBoard.progressLabel;
  const boardProgressText = fitTextToWidth(context, boardProgressLabel, 44);
  const stripRect = makeRect(contentRect.x, seasonBodyTop, contentRect.w, 12);
  const boardRect = makeRect(contentRect.x, stripRect.y + stripRect.h + 2, contentRect.w, atlas ? 30 : 32);
  const atlasRect = atlas ? makeRect(contentRect.x, boardRect.y + boardRect.h + 2, contentRect.w, 14) : null;
  const upgradesRect = makeRect(
    contentRect.x,
    (atlasRect ? atlasRect.y + atlasRect.h : boardRect.y + boardRect.h) + 2,
    contentRect.w,
    Math.max(18, contentRect.y + contentRect.h - ((atlasRect ? atlasRect.y + atlasRect.h : boardRect.y + boardRect.h) + 2)),
  );

  fillPixelPanel(context, stripRect.x, stripRect.y, stripRect.w, stripRect.h, palette.journalPage, palette.accent);
  drawUiText(
    context,
    fitTextToWidth(context, seasonWrap.label, stripRect.w - 8),
    stripRect.x + 4,
    stripRect.y + 1,
    palette.accent,
  );
  drawUiText(
    context,
    fitTextToWidth(context, seasonWrap.text, stripRect.w - 8),
    stripRect.x + 4,
    stripRect.y + 6,
    palette.text,
  );

  fillPixelPanel(context, boardRect.x, boardRect.y, boardRect.w, boardRect.h, palette.journalPage, palette.accent);
  const routeTitleText = fitTextToWidth(
    context,
    routeBoard.launchCard?.title ?? routeBoard.routeTitle,
    boardRect.w - 56,
  );
  drawUiText(
    context,
    routeTitleText,
    boardRect.x + 4,
    boardRect.y + 7,
    palette.text,
  );
  drawUiText(
    context,
    boardProgressText,
    rightAlignTextX(context, boardProgressText, boardRect, 4),
    boardRect.y + 5,
    palette.accent,
  );

  if (routeBoard.launchCard) {
    drawWrappedTextInRect(
      context,
      routeBoard.launchCard.summary,
      makeRect(boardRect.x + 4, boardRect.y + 14, boardRect.w - 8, 12),
      6,
      palette.text,
      2,
    );
    if (routeBoard.launchCard.detail) {
      drawUiText(
        context,
        fitTextToWidth(context, routeBoard.launchCard.detail, boardRect.w - 8),
        boardRect.x + 4,
        boardRect.y + 25,
        palette.accent,
      );
    }
  } else if (!atlas) {
    drawUiText(
      context,
      fitTextToWidth(context, routeBoard.summary, boardRect.w - 8),
      boardRect.x + 4,
      boardRect.y + 13,
      palette.text,
    );
  }

  if (!routeBoard.launchCard) {
    routeBoard.beats.forEach((beat, index) => {
      const beatY = atlas ? boardRect.y + 13 + index * 6 : boardRect.y + 21 + index * 7;
      drawUiText(
        context,
        fitTextToWidth(context, `${getRouteBeatPrefix(beat.status)} ${beat.title}`, boardRect.w - 8),
        boardRect.x + 4,
        beatY,
        beat.status === 'active' || beat.status === 'ready' ? palette.accent : palette.text,
      );
    });
  }

  if (atlasRect && atlas) {
    fillPixelPanel(context, atlasRect.x, atlasRect.y, atlasRect.w, atlasRect.h, palette.journalPage, palette.accent);
    const atlasDetail = atlas.note ?? `${atlas.loggedRoutes.length} route${atlas.loggedRoutes.length === 1 ? '' : 's'} logged`;
    drawUiText(
      context,
      atlas.title,
      atlasRect.x + 4,
      atlasRect.y + 2,
      palette.accent,
    );
    drawUiText(
      context,
      fitTextToWidth(context, atlasDetail, atlasRect.w - 8),
      atlasRect.x + 4,
      atlasRect.y + 8,
      palette.text,
    );
  }

  drawUiText(context, 'SUPPORT', upgradesRect.x, upgradesRect.y, palette.accent);
  let upgradeCardY = upgradesRect.y + 6;
  const outingSupportRowRect = makeRect(upgradesRect.x, upgradeCardY, upgradesRect.w, 6);
  if (outingSupportSelected) {
    context.fillStyle = palette.journalSelected;
    context.fillRect(outingSupportRowRect.x, outingSupportRowRect.y, outingSupportRowRect.w, outingSupportRowRect.h);
    context.fillStyle = palette.accent;
    context.fillRect(outingSupportRowRect.x + 2, outingSupportRowRect.y + 1, 2, outingSupportRowRect.h - 2);
  }
  drawUiTextInRect(
    context,
    'OUTING SUPPORT',
    makeRect(outingSupportRowRect.x + 8, outingSupportRowRect.y, outingSupportRowRect.w - 72, outingSupportRowRect.h),
    palette.text,
  );
  drawUiTextInRect(
    context,
    getSelectedOutingSupportLabel(selectedOutingSupportId),
    makeRect(outingSupportRowRect.x, outingSupportRowRect.y, outingSupportRowRect.w - 4, outingSupportRowRect.h),
    selectedOutingSupportId === 'hand-lens' ? palette.text : palette.accent,
    { align: 'right' },
  );
  upgradeCardY += 7;

  upgrades.forEach((upgrade) => {
    const selected = upgrade.id === selectedUpgradeId;
    const rowHeight = 6;
    const rowRect = makeRect(upgradesRect.x, upgradeCardY, upgradesRect.w, rowHeight);
    if (selected) {
      context.fillStyle = palette.journalSelected;
      context.fillRect(rowRect.x, rowRect.y, rowRect.w, rowRect.h);
      context.fillStyle = palette.accent;
      context.fillRect(rowRect.x + 2, rowRect.y + 1, 2, rowRect.h - 2);
    }
    const status = upgrade.owned ? 'OWNED' : `${upgrade.cost}C`;
    drawUiTextInRect(
      context,
      fitTextToWidth(context, upgrade.title, rowRect.w - 52),
      makeRect(rowRect.x + 8, rowRect.y, rowRect.w - 52, rowRect.h),
      palette.text,
    );
    drawUiTextInRect(
      context,
      status,
      makeRect(rowRect.x, rowRect.y, rowRect.w - 4, rowRect.h),
      upgrade.owned ? palette.accent : palette.text,
      { align: 'right' },
    );
    upgradeCardY += rowHeight + 1;
  });
}
