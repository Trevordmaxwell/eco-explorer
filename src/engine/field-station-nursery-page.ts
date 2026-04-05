import type { NurseryCardId, NurseryStateView } from './nursery';
import {
  drawUiText,
  drawWrappedTextInRect,
  fillPixelPanel,
} from './pixel-ui';
import { makeRect, rightAlignTextX, takeBottom, type UiRect } from './ui-layout';
import type { BiomeDefinition } from './types';

export type FieldStationNurseryPageLayoutKind = 'locked' | 'ready' | 'active-growth' | 'mature';

export interface FieldStationNurseryPageLayout {
  kind: FieldStationNurseryPageLayoutKind;
  benchRect: UiRect;
  compostRect: UiRect;
  bedRect: UiRect;
  showRouteSupportHint: boolean;
  showHomePlaceStrip: boolean;
}

interface FieldStationNurseryPageOptions {
  context: CanvasRenderingContext2D;
  palette: BiomeDefinition['palette'];
  pageRect: UiRect;
  selectedNurseryCardId: NurseryCardId;
  nursery: NurseryStateView;
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

function getNurseryStageProgress(stage: string): number {
  switch (stage) {
    case 'stocked':
      return 1;
    case 'rooting':
      return 2;
    case 'growing':
      return 3;
    case 'mature':
      return 4;
    default:
      return 0;
  }
}

function drawNurseryCardFrame(
  context: CanvasRenderingContext2D,
  rect: UiRect,
  palette: BiomeDefinition['palette'],
  title: string,
  selected: boolean,
): UiRect {
  fillPixelPanel(
    context,
    rect.x,
    rect.y,
    rect.w,
    rect.h,
    selected ? palette.journalPage : palette.journalSelected,
    selected ? palette.accent : palette.cardShadow,
  );
  drawUiText(
    context,
    fitTextToWidth(context, title, rect.w - 8),
    rect.x + 4,
    rect.y + 7,
    selected ? palette.accent : palette.text,
  );
  context.fillStyle = selected ? palette.accent : palette.cardShadow;
  context.fillRect(rect.x + 4, rect.y + 9, rect.w - 8, 1);
  return makeRect(rect.x + 4, rect.y + 12, rect.w - 8, Math.max(0, rect.h - 15));
}

function drawNurseryCompostAccent(
  context: CanvasRenderingContext2D,
  rect: UiRect,
  palette: BiomeDefinition['palette'],
  compostRate: number,
): number {
  if (compostRate <= 1) {
    return 0;
  }

  const accentRect = makeRect(rect.x + 4, rect.y + 3, 14, 7);
  fillPixelPanel(
    context,
    accentRect.x,
    accentRect.y,
    accentRect.w,
    accentRect.h,
    palette.journalSelected,
    palette.accent,
  );

  context.fillStyle = palette.cardShadow;
  context.fillRect(accentRect.x + 2, accentRect.y + 4, 10, 1);
  context.fillRect(accentRect.x + 4, accentRect.y + 2, 2, 2);
  context.fillRect(accentRect.x + 7, accentRect.y + 1, 2, 3);
  context.fillRect(accentRect.x + 10, accentRect.y + 3, 1, 2);

  return accentRect.w + 4;
}

function drawNurseryHomePlaceStrip(
  context: CanvasRenderingContext2D,
  rect: UiRect,
  palette: BiomeDefinition['palette'],
  stageProgress: number,
  hasLogPile: boolean,
  hasPollinatorPatch: boolean,
): void {
  fillPixelPanel(
    context,
    rect.x,
    rect.y,
    rect.w,
    rect.h,
    palette.journalSelected,
    palette.cardShadow,
  );

  if (hasLogPile) {
    context.fillStyle = palette.cardShadow;
    context.fillRect(rect.x + 3, rect.y + 4, 6, 1);
    context.fillRect(rect.x + 3, rect.y + 2, 4, 1);
    context.fillRect(rect.x + 5, rect.y + 1, 3, 1);
    context.fillStyle = palette.accent;
    context.fillRect(rect.x + 4, rect.y + 4, 1, 1);
    context.fillRect(rect.x + 6, rect.y + 2, 1, 1);
  }

  const pipSize = 2;
  const pipGap = 2;
  const pipCount = 4;
  const totalPipWidth = pipCount * pipSize + (pipCount - 1) * pipGap;
  const pipStartX = rect.x + Math.floor((rect.w - totalPipWidth) / 2);
  for (let index = 0; index < pipCount; index += 1) {
    context.fillStyle = index < stageProgress ? palette.accent : palette.cardShadow;
    context.fillRect(pipStartX + index * (pipSize + pipGap), rect.y + 3, pipSize, pipSize);
  }

  if (hasPollinatorPatch) {
    const bloomX = rect.x + rect.w - 11;
    context.fillStyle = palette.accent;
    context.fillRect(bloomX + 1, rect.y + 1, 2, 2);
    context.fillRect(bloomX + 4, rect.y + 3, 2, 2);
    context.fillRect(bloomX + 2, rect.y + 5, 2, 1);
    context.fillStyle = palette.text;
    context.fillRect(bloomX + 3, rect.y + 3, 1, 1);
  }
}

function getBenchSupplyLine(nursery: NurseryStateView): string | null {
  const selectedProject = nursery.selectedProject;
  if (!selectedProject) {
    return null;
  }

  const sourceKind = selectedProject.definition.sourceModes[0] === 'cutting' ? 'cuttings' : 'seed-stock';
  const cost = selectedProject.definition.starterCost?.[sourceKind] ?? 1;
  return `${nursery.resources[sourceKind]} ${sourceKind} • cost ${cost}`;
}

function getBenchFallbackLine(nursery: NurseryStateView): string | null {
  if (!nursery.activeProject) {
    return null;
  }

  return nursery.activeProject.state.stage === 'mature'
    ? 'Bed ready to clear.'
    : 'Bed already planted.';
}

export function resolveReadyBedCopy(nursery: NurseryStateView): string {
  const selectedProject = nursery.selectedProject;
  if (!selectedProject) {
    return 'Log more route clues to open the first nursery project.';
  }

  if (selectedProject.affordable) {
    return selectedProject.definition.summary;
  }

  const sourceKind = selectedProject.definition.sourceModes[0] === 'cutting' ? 'cuttings' : 'seed-stock';
  return selectedProject.definition.unlockSummary ?? `Need more ${sourceKind} before planting this bed.`;
}

export function resolveActiveBedBodyCopy(nursery: NurseryStateView): string {
  const activeProject = nursery.activeProject;
  if (!activeProject) {
    return '';
  }

  return activeProject.definition.stageSummaryByStage[activeProject.state.stage]
    ?? activeProject.definition.summary;
}

export function resolveMatureBedFooterCopy(nursery: NurseryStateView): string {
  const activeProject = nursery.activeProject;
  if (!activeProject) {
    return 'ENTER clears the bed.';
  }

  return activeProject.definition.memorySummary ?? 'ENTER clears the bed.';
}

function drawBedTitleRow(
  context: CanvasRenderingContext2D,
  rect: UiRect,
  palette: BiomeDefinition['palette'],
  title: string,
  statusLabel: string | null,
  statusColor: string,
): void {
  if (!statusLabel) {
    drawUiText(
      context,
      fitTextToWidth(context, title, rect.w),
      rect.x,
      rect.y + 5,
      palette.text,
    );
    return;
  }

  const safeStatus = fitTextToWidth(context, statusLabel, Math.min(52, rect.w));
  const safeTitle = fitTextToWidth(context, title, rect.w - context.measureText(safeStatus).width - 8);
  drawUiText(context, safeTitle, rect.x, rect.y + 5, palette.text);
  drawUiText(
    context,
    safeStatus,
    rightAlignTextX(context, safeStatus, rect),
    rect.y + 5,
    statusColor,
  );
}

export function resolveFieldStationNurseryPageLayout(
  pageRect: UiRect,
  nursery: NurseryStateView,
): FieldStationNurseryPageLayout {
  const denseBedLayout = Boolean(nursery.activeProject || nursery.selectedProject);
  const gap = denseBedLayout ? 3 : 4;
  const benchHeight = denseBedLayout ? 24 : 26;
  const compostHeight = denseBedLayout ? 12 : 14;
  const benchRect = makeRect(pageRect.x, pageRect.y, pageRect.w, benchHeight);
  const compostRect = makeRect(pageRect.x, benchRect.y + benchRect.h + gap, pageRect.w, compostHeight);
  const bedRect = makeRect(
    pageRect.x,
    compostRect.y + compostRect.h + gap,
    pageRect.w,
    Math.max(46, pageRect.y + pageRect.h - (compostRect.y + compostRect.h + gap)),
  );
  const activeProject = nursery.activeProject;
  const showRouteSupportHint = nursery.showRouteSupportHint;
  const showHomePlaceStrip = Boolean(activeProject);

  return {
    kind:
      activeProject?.state.stage === 'mature'
        ? 'mature'
        : activeProject
          ? 'active-growth'
          : nursery.selectedProject
            ? 'ready'
            : 'locked',
    benchRect,
    compostRect,
    bedRect,
    showRouteSupportHint,
    showHomePlaceStrip,
  };
}

export function drawFieldStationNurseryPage({
  context,
  palette,
  pageRect,
  selectedNurseryCardId,
  nursery,
}: FieldStationNurseryPageOptions): void {
  const layout = resolveFieldStationNurseryPageLayout(pageRect, nursery);
  const selectedProject = nursery.selectedProject;
  const activeProject = nursery.activeProject;
  const hasLogPile = nursery.extras.some((extra) => extra.id === 'log-pile' && extra.unlocked);
  const hasPollinatorPatch = nursery.extras.some(
    (extra) => extra.id === 'pollinator-patch' && extra.unlocked,
  );

  const benchBodyRect = drawNurseryCardFrame(
    context,
    layout.benchRect,
    palette,
    'PROPAGATION BENCH',
    selectedNurseryCardId === 'bench',
  );
  const benchTextColor =
    selectedProject && selectedProject.affordable ? palette.accent : palette.text;
  if (!selectedProject) {
    if (activeProject) {
      drawUiText(context, activeProject.definition.title, benchBodyRect.x, benchBodyRect.y + 5, palette.text);
      drawUiText(
        context,
        getBenchFallbackLine(nursery) ?? '',
        benchBodyRect.x,
        benchBodyRect.y + 11,
        palette.text,
      );
    } else {
      drawWrappedTextInRect(
        context,
        'Log more route clues to open the first nursery bed.',
        makeRect(benchBodyRect.x, benchBodyRect.y, benchBodyRect.w, benchBodyRect.h),
        6,
        palette.text,
        2,
      );
    }
  } else {
    const showCycleHint = selectedNurseryCardId === 'bench' && nursery.projects.filter((project) => project.unlocked).length > 1;
    const cycleHint = showCycleHint ? 'ENTER cycles' : null;
    const cycleWidth = cycleHint ? context.measureText(cycleHint).width + 6 : 0;
    const projectTitle = fitTextToWidth(context, selectedProject.definition.title, benchBodyRect.w - cycleWidth);
    drawUiText(context, projectTitle, benchBodyRect.x, benchBodyRect.y + 5, palette.text);
    if (cycleHint) {
      drawUiText(
        context,
        cycleHint,
        rightAlignTextX(context, cycleHint, benchBodyRect),
        benchBodyRect.y + 5,
        palette.accent,
      );
    }
    drawUiText(
      context,
      fitTextToWidth(context, getBenchSupplyLine(nursery) ?? '', benchBodyRect.w),
      benchBodyRect.x,
      benchBodyRect.y + 11,
      benchTextColor,
    );
  }

  fillPixelPanel(
    context,
    layout.compostRect.x,
    layout.compostRect.y,
    layout.compostRect.w,
    layout.compostRect.h,
    selectedNurseryCardId === 'compost' ? palette.journalPage : palette.journalSelected,
    selectedNurseryCardId === 'compost' ? palette.accent : palette.cardShadow,
  );
  const compostAccentOffset = drawNurseryCompostAccent(context, layout.compostRect, palette, nursery.compostRate);
  drawUiText(
    context,
    'COMPOST HEAP',
    layout.compostRect.x + 4 + compostAccentOffset,
    layout.compostRect.y + 6,
    selectedNurseryCardId === 'compost' ? palette.accent : palette.text,
  );
  drawUiText(
    context,
    fitTextToWidth(context, `Auto ${nursery.compostRate}/step`, 56),
    rightAlignTextX(context, `Auto ${nursery.compostRate}/step`, layout.compostRect, 4),
    layout.compostRect.y + 6,
    palette.accent,
  );
  drawUiText(
    context,
    fitTextToWidth(
      context,
      `Litter ${nursery.resources.litter} -> Compost ${nursery.resources.compost}`,
      layout.compostRect.w - 8,
    ),
    layout.compostRect.x + 4,
    layout.compostRect.y + 12,
    palette.text,
  );

  const bedBodyRect = drawNurseryCardFrame(
    context,
    layout.bedRect,
    palette,
    'TEACHING BED',
    selectedNurseryCardId === 'bed',
  );
  const footerRect = layout.showHomePlaceStrip
    ? makeRect(layout.bedRect.x + 4, layout.bedRect.y + layout.bedRect.h - 8, layout.bedRect.w - 8, 6)
    : null;
  const contentBottom = footerRect ? footerRect.y - 1 : bedBodyRect.y + bedBodyRect.h;
  const bedContentRect = makeRect(
    bedBodyRect.x,
    bedBodyRect.y,
    bedBodyRect.w,
    Math.max(0, contentBottom - bedBodyRect.y),
  );

  if (layout.kind === 'locked') {
    drawWrappedTextInRect(
      context,
      'Log more route clues to open the first nursery project.',
      makeRect(
        bedContentRect.x,
        bedContentRect.y + 2,
        bedContentRect.w,
        Math.max(12, bedContentRect.h - 2),
      ),
      6,
      palette.text,
      3,
    );
  } else if (layout.kind === 'ready') {
    drawBedTitleRow(
      context,
      bedBodyRect,
      palette,
      selectedProject?.definition.title ?? 'FIRST BED',
      selectedProject?.affordable ? 'READY' : 'NEED SUPPLIES',
      selectedProject?.affordable ? palette.accent : palette.text,
    );
    drawWrappedTextInRect(
      context,
      resolveReadyBedCopy(nursery),
      makeRect(
        bedContentRect.x,
        bedContentRect.y + 12,
        bedContentRect.w,
        Math.max(12, bedContentRect.h - 12),
      ),
      6,
      palette.text,
      3,
    );
  } else if (activeProject) {
    drawBedTitleRow(
      context,
      bedBodyRect,
      palette,
      activeProject.definition.title,
      activeProject.state.stage.toUpperCase(),
      activeProject.state.stage === 'mature' ? palette.accent : palette.text,
    );

    const detailRect = makeRect(
      bedContentRect.x,
      bedContentRect.y + 12,
      bedContentRect.w,
      Math.max(0, bedContentRect.h - 12),
    );

    if (layout.kind === 'mature') {
      const { top: rewardRect, bottom: matureFooterRect } = takeBottom(detailRect, 8, 1);
      const matureBody = resolveActiveBedBodyCopy(nursery);
      const matureFooter = resolveMatureBedFooterCopy(nursery);
      drawWrappedTextInRect(
        context,
        matureBody,
        rewardRect,
        6,
        palette.text,
        3,
      );
      drawWrappedTextInRect(
        context,
        matureFooter,
        matureFooterRect,
        6,
        activeProject.definition.memorySummary ? palette.text : palette.accent,
        1,
      );
    } else {
      const growthSummary = resolveActiveBedBodyCopy(nursery);
      if (layout.showRouteSupportHint && nursery.routeSupportHint) {
        const { top: summaryRect, bottom: clueRect } = takeBottom(detailRect, 12, 1);
        drawWrappedTextInRect(
          context,
          growthSummary,
          summaryRect,
          6,
          palette.text,
          2,
        );
        drawWrappedTextInRect(
          context,
          nursery.routeSupportHint,
          clueRect,
          6,
          palette.accent,
          2,
        );
      } else {
        drawWrappedTextInRect(
          context,
          growthSummary,
          detailRect,
          6,
          palette.text,
          2,
        );
      }
    }
  }

  if (footerRect && activeProject) {
    drawNurseryHomePlaceStrip(
      context,
      footerRect,
      palette,
      getNurseryStageProgress(activeProject.state.stage),
      hasLogPile,
      hasPollinatorPatch,
    );
  }
}
