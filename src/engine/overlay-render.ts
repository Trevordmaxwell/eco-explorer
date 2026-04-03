import type { ResolvedEcosystemNote } from './ecosystem-notes';
import type {
  FieldAtlasState,
  FieldSeasonBoardState,
  FieldSeasonExpeditionState,
  FieldSeasonWrapState,
} from './field-season-board';
import type { FieldUpgradeState } from './field-station';
import type { ActiveFieldRequest } from './field-requests';
import type { FieldPartnerNotice } from './field-partner';
import type { JournalComparison } from './journal-comparison';
import type { JournalBiomeProgress } from './journal';
import type { NurseryCardId, NurseryStateView } from './nursery';
import type { SketchbookPageView } from './sketchbook';
import { buildJournalListRows, buildJournalListWindow } from './journal-list';
import { formatBiomeSurveyStateLabel, type BiomeSurveyState } from './progression';
import {
  buildJournalBiomeSelectorLayout,
  buildJournalBiomeSelectorState,
  formatJournalBiomeLabel,
} from './journal-selector';
import {
  drawPanelButton,
  drawUiText,
  drawUiTextInRect,
  drawWrappedTextInRect,
  fillLeafGreenPanel,
  fillPixelPanel,
  UI_FONT_MEDIUM,
  UI_FONT_SMALL,
} from './pixel-ui';
import { TITLE_FLAVOR_LINES, TITLE_SUBTITLE_LINES } from './title-copy';
import { insetRect, makeRect, maxLinesForHeight, rightAlignTextX, splitRectColumns, takeBottom, type UiRect } from './ui-layout';
import { drawSprite, type SpriteRegistry } from './sprites';
import type {
  BiomeDefinition,
  CloseLookPayload,
  FieldStationView,
  FieldStationSeasonPage,
  FactBubblePayload,
  InspectableEntry,
  ObservationPrompt,
  OutingSupportId,
  SketchbookSlotId,
} from './types';

export type MenuActionId =
  | 'world-map'
  | 'field-station'
  | 'field-guide'
  | 'toggle-fullscreen'
  | 'toggle-sound'
  | 'toggle-inspect-hints'
  | 'reset-save'
  | 'close-menu'
  | 'cancel-reset'
  | 'confirm-reset';

export type UiActionId = 'start-game' | 'open-menu' | MenuActionId;

export const TITLE_ACTION_ROWS = [
  ['MOVE', 'A / D'],
  ['', 'ARROWS'],
  ['JUMP', 'SPACE'],
  ['LOOK', 'E / CLICK'],
  ['BOOK', 'J'],
  ['MENU', 'M'],
  ['PICK', 'ENTER'],
] as const;

export const TITLE_START_HINT = 'START, THEN OPEN MENU FOR MAP OR STATION.';

export interface ButtonHitTarget {
  id: UiActionId;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface JournalHitTarget {
  entryId: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface JournalScrollHitTarget {
  direction: -1 | 1;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface JournalBiomeHitTarget {
  biomeId: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface JournalActionHitTarget {
  id: 'toggle-comparison' | 'toggle-sketchbook' | 'place-sketch-entry' | 'clear-sketch-slot';
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface JournalSketchSlotHitTarget {
  slotId: SketchbookSlotId;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface BubbleActionHitTarget {
  id: 'open-close-look';
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface CloseLookActionHitTarget {
  id: 'close-close-look';
  x: number;
  y: number;
  w: number;
  h: number;
}

interface OverlaySurfaceOptions {
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  palette: BiomeDefinition['palette'];
}

interface BubbleRenderOptions extends OverlaySurfaceOptions {
  bubble: FactBubblePayload | null;
}

interface CloseLookOverlayOptions extends OverlaySurfaceOptions {
  sprites: SpriteRegistry;
  closeLook: CloseLookPayload | null;
}

export interface MenuOverlayCopyOptions {
  showWorldMapAction: boolean;
  showFieldStationAction: boolean;
  showFieldGuideAction: boolean;
}

export function getMenuOverlayIntroText({
  showWorldMapAction,
  showFieldStationAction,
  showFieldGuideAction,
}: MenuOverlayCopyOptions): string {
  if (showWorldMapAction && showFieldStationAction) {
    return 'World map handles travel. Field station handles support.';
  }

  if (showWorldMapAction) {
    return 'World map handles travel. Journal stays on J.';
  }

  if (showFieldStationAction) {
    return 'Field station handles support and route upgrades.';
  }

  if (showFieldGuideAction) {
    return 'Field guide, helpers, and save options stay here.';
  }

  return 'Change helper settings or reset your save.';
}

export function getMenuOverlayHelperText({
  showWorldMapAction,
  showFieldStationAction,
  showFieldGuideAction,
}: MenuOverlayCopyOptions): string {
  if (showWorldMapAction && showFieldStationAction) {
    return 'Pick a stop, then press Enter to open it.';
  }

  if (showWorldMapAction) {
    return 'Pick World map for routes. Sound wakes after your first key or click.';
  }

  if (showFieldStationAction) {
    return 'Trail Stride, credits, and season notes live here.';
  }

  if (showFieldGuideAction) {
    return 'Sound wakes after your first key or click.';
  }

  return 'Sound wakes after your first key or click.';
}

interface TitleOverlayOptions extends OverlaySurfaceOptions {}

interface WorldMapHudOptions extends OverlaySurfaceOptions {
  mapMode: 'idle' | 'walking';
  walkingLabel?: string | null;
}

interface MenuChipOptions extends OverlaySurfaceOptions {
  isVisible: boolean;
}

interface HabitatChipOptions extends OverlaySurfaceOptions {
  label: string | null;
  isVisible: boolean;
}

interface MenuOverlayOptions extends OverlaySurfaceOptions {
  selectedMenuActionId: MenuActionId;
  showResetConfirmation: boolean;
  isFullscreen: boolean;
  soundEnabled: boolean;
  showInspectHints: boolean;
  showWorldMapAction: boolean;
  showFieldStationAction: boolean;
  showFieldGuideAction: boolean;
  menuReturnMode: 'title' | 'playing' | 'journal';
}

interface FieldStationOverlayOptions extends OverlaySurfaceOptions {
  view: FieldStationView;
  seasonPage: FieldStationSeasonPage;
  subtitle: string;
  credits: number;
  selectedOutingSupportId: OutingSupportId;
  outingSupportSelected: boolean;
  upgrades: FieldUpgradeState[];
  selectedUpgradeId: string | null;
  atlas: FieldAtlasState | null;
  routeBoard: FieldSeasonBoardState;
  expedition: FieldSeasonExpeditionState;
  seasonWrap: FieldSeasonWrapState;
  selectedNurseryCardId: NurseryCardId;
  nursery: NurseryStateView;
}

interface FieldGuideNoticeOptions extends OverlaySurfaceOptions {
  state: 'copied' | 'failed';
}

interface FieldRequestNoticeOptions extends OverlaySurfaceOptions {
  title: string;
  text: string;
}

interface FieldRequestHintOptions extends OverlaySurfaceOptions {
  title: string | null;
  isVisible: boolean;
}

interface FieldPartnerNoticeOptions extends OverlaySurfaceOptions {
  notice: FieldPartnerNotice;
}

interface JournalOverlayOptions extends OverlaySurfaceOptions {
  sprites: SpriteRegistry;
  totalDiscoveredCount: number;
  biomeProgress: JournalBiomeProgress[];
  selectedBiomeProgress: JournalBiomeProgress;
  selectedBiomeSurveyState: BiomeSurveyState;
  discoveredEntries: InspectableEntry[];
  selectedEntryId: string | null;
  selectedEntry: InspectableEntry | null;
  selectedEntryDetailText: string | null;
  selectedEntrySightings: string[];
  ecosystemNote: ResolvedEcosystemNote;
  observationPrompt: ObservationPrompt | null;
  fieldRequest: ActiveFieldRequest | null;
  comparison: JournalComparison | null;
  isComparisonOpen: boolean;
  sketchbook: SketchbookPageView | null;
  isSketchbookOpen: boolean;
  selectedSketchbookSlotId: SketchbookSlotId | null;
}

function formatLockedNoteText(ecosystemNote: ResolvedEcosystemNote): string {
  const remaining = Math.max(ecosystemNote.requiredCount - ecosystemNote.discoveredCount, 1);
  if (remaining === 1) {
    return 'One more linked find opens this.';
  }

  return `${remaining} more linked finds open this.`;
}

function formatUnlockedNoteText(ecosystemNote: ResolvedEcosystemNote): string {
  if (!ecosystemNote.note) {
    return '';
  }

  return ecosystemNote.note.summary;
}

function formatNoteHeading(ecosystemNote: ResolvedEcosystemNote): string {
  if (ecosystemNote.state === 'unlocked' && ecosystemNote.note) {
    return ecosystemNote.note.title;
  }

  return 'SHARED NOTE';
}

function formatObservationHeading(
  ecosystemNote: ResolvedEcosystemNote,
  observationPrompt: ObservationPrompt | null,
): string {
  if (!observationPrompt) {
    return formatNoteHeading(ecosystemNote);
  }

  if (ecosystemNote.state === 'unlocked' && ecosystemNote.note) {
    return ecosystemNote.note.title;
  }

  return 'NOTEBOOK LENS';
}

function formatPromptHeading(ecosystemNote: ResolvedEcosystemNote): string {
  return ecosystemNote.state === 'unlocked' ? 'LOOK AGAIN' : 'NOTEBOOK LENS';
}

const compactSightingBiomeLabels: Record<string, string> = {
  beach: 'Beach',
  'coastal-scrub': 'Scrub',
  forest: 'Forest',
  treeline: 'Treeline',
  tundra: 'Tundra',
};

function formatCompactSightingBiomeLabel(biomeId: string): string {
  return compactSightingBiomeLabels[biomeId] ?? formatJournalBiomeLabel(biomeId);
}

function formatSightingSummary(biomeIds: string[]): string {
  const labels = biomeIds.map((biomeId) => formatCompactSightingBiomeLabel(biomeId));
  if (labels.length <= 2) {
    return `Seen in: ${labels.join('/')}`;
  }

  return `Seen in: ${labels.slice(0, 2).join('/')} +${labels.length - 2}`;
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

function drawComparisonCard(
  context: CanvasRenderingContext2D,
  palette: BiomeDefinition['palette'],
  rect: UiRect,
  title: string,
  summary: string,
  highlighted: boolean,
): void {
  fillPixelPanel(
    context,
    rect.x,
    rect.y,
    rect.w,
    rect.h,
    palette.journalPage,
    highlighted ? palette.accent : palette.cardShadow,
  );
  drawUiText(
    context,
    fitTextToWidth(context, title, rect.w - 8),
    rect.x + 4,
    rect.y + 3,
    highlighted ? palette.accent : palette.text,
  );
  drawWrappedTextInRect(
    context,
    summary,
    makeRect(rect.x + 4, rect.y + 10, rect.w - 8, rect.h - 12),
    6,
    palette.text,
    rect.h >= 22 ? 2 : 1,
  );
}

function drawFieldRequestCard(
  context: CanvasRenderingContext2D,
  palette: BiomeDefinition['palette'],
  rect: UiRect,
  fieldRequest: ActiveFieldRequest,
): void {
  fillPixelPanel(context, rect.x, rect.y, rect.w, rect.h, palette.journalPage, palette.accent);

  context.font = UI_FONT_MEDIUM;
  drawUiText(
    context,
    fitTextToWidth(context, fieldRequest.title, rect.w - 40),
    rect.x + 4,
    rect.y + 3,
    palette.accent,
  );

  context.font = UI_FONT_SMALL;
  drawUiText(
    context,
    fitTextToWidth(context, fieldRequest.progressLabel, 36),
    rightAlignTextX(context, fieldRequest.progressLabel, rect, 4),
    rect.y + 3,
    palette.text,
  );

  drawWrappedTextInRect(
    context,
    fieldRequest.summary,
    makeRect(rect.x + 4, rect.y + 11, rect.w - 8, rect.h - 13),
    6,
    palette.text,
    2,
  );
}

function drawMenuRow(
  context: CanvasRenderingContext2D,
  palette: BiomeDefinition['palette'],
  rect: UiRect,
  actionId: MenuActionId,
  selectedMenuActionId: MenuActionId,
  hitTargets: ButtonHitTarget[],
  label: string,
  value?: string,
): void {
  const selected = selectedMenuActionId === actionId;
  const fill = selected ? palette.journalPage : palette.journalSelected;
  const border = selected ? palette.accent : palette.cardShadow;

  fillPixelPanel(context, rect.x, rect.y, rect.w, rect.h, fill, border);
  if (selected) {
    context.fillStyle = palette.accent;
    context.fillRect(rect.x + 4, rect.y + 3, 2, rect.h - 6);
  }
  drawUiTextInRect(context, label, rect, palette.text, { padding: 7 });
  hitTargets.push({ id: actionId, x: rect.x, y: rect.y, w: rect.w, h: rect.h });

  if (!value) {
    return;
  }

  drawUiTextInRect(context, value, rect, palette.accent, { align: 'right', padding: 8 });
}

function drawScaledSprite(
  context: CanvasRenderingContext2D,
  sprites: SpriteRegistry,
  id: string,
  rect: UiRect,
  preferredScale: number,
): void {
  const frame = sprites[id]?.[0];
  if (!frame) {
    return;
  }

  const maxScale = Math.max(1, Math.min(
    preferredScale,
    Math.floor((rect.w - 12) / frame.width),
    Math.floor((rect.h - 12) / frame.height),
  ));
  const drawWidth = frame.width * maxScale;
  const drawHeight = frame.height * maxScale;
  const drawX = rect.x + Math.floor((rect.w - drawWidth) / 2);
  const drawY = rect.y + Math.floor((rect.h - drawHeight) / 2);

  context.imageSmoothingEnabled = false;
  context.drawImage(frame.canvas, drawX, drawY, drawWidth, drawHeight);
}

export function drawBubbleOverlay({ context, width, height, palette, bubble }: BubbleRenderOptions): BubbleActionHitTarget[] {
  const hitTargets: BubbleActionHitTarget[] = [];
  if (!bubble) {
    return hitTargets;
  }

  const bubbleRect = makeRect(6, height - 48, width - 12, 44);
  const contentRect = insetRect(bubbleRect, 6);
  const badgeRect = bubble.isNewEntry ? makeRect(contentRect.x + contentRect.w - 34, contentRect.y, 30, 10) : null;
  fillLeafGreenPanel(context, bubbleRect.x, bubbleRect.y, bubbleRect.w, bubbleRect.h);
  context.font = UI_FONT_MEDIUM;
  drawUiText(context, bubble.title, contentRect.x, contentRect.y, palette.text);
  if (badgeRect) {
    fillPixelPanel(context, badgeRect.x, badgeRect.y, badgeRect.w, badgeRect.h, palette.journalSelected, palette.accent);
    drawUiTextInRect(context, 'NEW', badgeRect, palette.text, { align: 'center' });
  }
  context.font = UI_FONT_SMALL;
  const factRect = bubble.resourceNote
    ? makeRect(contentRect.x, contentRect.y + 23, contentRect.w - 2, 8)
    : makeRect(contentRect.x, contentRect.y + 23, contentRect.w - 2, contentRect.h - 23);
  drawWrappedTextInRect(
    context,
    bubble.detailText,
    makeRect(contentRect.x, contentRect.y + 12, (badgeRect?.x ?? contentRect.x + contentRect.w) - contentRect.x - 4, 8),
    7,
    palette.accent,
    1,
  );
  drawWrappedTextInRect(
    context,
    bubble.fact,
    factRect,
    7,
    palette.text,
    bubble.resourceNote ? 1 : 2,
  );
  if (bubble.resourceNote) {
    drawUiText(
      context,
      fitTextToWidth(context, bubble.resourceNote, contentRect.w - 2),
      contentRect.x,
      contentRect.y + 33,
      palette.accent,
    );
  }

  if (bubble.closeLookAvailable) {
    const cueRect = makeRect(bubbleRect.x + bubbleRect.w - 72, bubbleRect.y - 11, 68, 10);
    drawPanelButton(context, cueRect.x, cueRect.y, cueRect.w, cueRect.h, 'LOOK CLOSE', {
      fill: palette.journalPage,
      border: palette.accent,
      text: palette.text,
    });
    hitTargets.push({
      id: 'open-close-look',
      x: cueRect.x,
      y: cueRect.y,
      w: cueRect.w,
      h: cueRect.h,
    });
  }

  return hitTargets;
}

export function drawCloseLookOverlay({
  context,
  width,
  height,
  palette,
  sprites,
  closeLook,
}: CloseLookOverlayOptions): CloseLookActionHitTarget[] {
  const hitTargets: CloseLookActionHitTarget[] = [];
  if (!closeLook) {
    return hitTargets;
  }

  context.save();
  context.fillStyle = 'rgba(18, 14, 12, 0.72)';
  context.fillRect(0, 0, width, height);
  context.restore();

  const cardRect = makeRect(22, 16, width - 44, height - 32);
  const contentRect = insetRect(cardRect, 10);
  const closeButtonRect = makeRect(cardRect.x + cardRect.w - 44, cardRect.y + 4, 40, 10);
  const footerRect = makeRect(contentRect.x, cardRect.y + cardRect.h - 12, contentRect.w, 8);
  const bodyRect = makeRect(contentRect.x, contentRect.y + 14, contentRect.w, footerRect.y - (contentRect.y + 16));
  const artWidth = Math.max(62, Math.min(74, Math.floor(bodyRect.w * 0.4)));
  const [artRect, infoRect] = splitRectColumns(bodyRect, artWidth, 10);

  fillLeafGreenPanel(context, cardRect.x, cardRect.y, cardRect.w, cardRect.h);
  drawUiText(context, 'LOOK CLOSE', contentRect.x, contentRect.y, palette.accent);
  drawPanelButton(context, closeButtonRect.x, closeButtonRect.y, closeButtonRect.w, closeButtonRect.h, 'BACK', {
    fill: palette.journalPage,
    border: palette.accent,
    text: palette.text,
  });
  hitTargets.push({
    id: 'close-close-look',
    x: closeButtonRect.x,
    y: closeButtonRect.y,
    w: closeButtonRect.w,
    h: closeButtonRect.h,
  });

  context.font = UI_FONT_MEDIUM;
  drawUiText(context, fitTextToWidth(context, closeLook.title, contentRect.w - 52), contentRect.x, contentRect.y + 8, palette.text);

  fillPixelPanel(context, artRect.x, artRect.y, artRect.w, artRect.h, '#fff7ea', palette.cardShadow);
  drawScaledSprite(context, sprites, closeLook.spriteId, artRect, closeLook.spriteScale);

  context.font = UI_FONT_SMALL;
  closeLook.callouts.slice(0, 2).forEach((callout, index) => {
    const chipRect = makeRect(infoRect.x, infoRect.y + index * 18, infoRect.w, 15);
    fillPixelPanel(context, chipRect.x, chipRect.y, chipRect.w, chipRect.h, palette.journalPage, palette.accent);
    drawUiTextInRect(context, fitTextToWidth(context, callout, chipRect.w - 8), chipRect, palette.text, { padding: 4 });
  });

  drawWrappedTextInRect(
    context,
    closeLook.sentence,
    makeRect(infoRect.x, infoRect.y + 46, infoRect.w, infoRect.h - 48),
    7,
    palette.text,
    3,
  );
  drawUiText(context, fitTextToWidth(context, 'E OR ESC BACK', footerRect.w), footerRect.x, footerRect.y, palette.text);

  return hitTargets;
}

export function drawTitleOverlay({ context, width, height, palette }: TitleOverlayOptions): ButtonHitTarget[] {
  const titleHitTargets: ButtonHitTarget[] = [];
  const panelRect = makeRect(8, 8, width - 16, height - 16);
  const contentRect = insetRect(panelRect, 10);
  const { top: bodyRect, bottom: ctaRect } = takeBottom(contentRect, 24, 6);
  const leftColumnWidth = Math.max(96, Math.min(Math.floor(bodyRect.w * 0.46), bodyRect.w - 92));
  const [leftColumnRect, rightColumnRect] = splitRectColumns(bodyRect, leftColumnWidth, 10);

  fillLeafGreenPanel(context, panelRect.x, panelRect.y, panelRect.w, panelRect.h);
  context.font = UI_FONT_MEDIUM;
  drawUiText(context, 'ECO EXPLORER', leftColumnRect.x, leftColumnRect.y, palette.text);
  let subtitleBottom = leftColumnRect.y + 14;
  for (const line of TITLE_SUBTITLE_LINES) {
    drawUiText(context, line, leftColumnRect.x, subtitleBottom, palette.text);
    subtitleBottom += 7;
  }
  context.fillStyle = palette.accent;
  context.fillRect(leftColumnRect.x, subtitleBottom + 2, leftColumnRect.w - 6, 2);
  context.font = UI_FONT_SMALL;
  let flavorY = subtitleBottom + 8;
  for (const line of TITLE_FLAVOR_LINES) {
    drawUiText(context, line, leftColumnRect.x, flavorY, palette.text);
    flavorY += 8;
  }

  drawUiText(context, 'HOW TO PLAY', rightColumnRect.x, rightColumnRect.y, palette.text);
  let rowY = rightColumnRect.y + 12;
  for (const [label, value] of TITLE_ACTION_ROWS) {
    if (label) {
      drawUiText(context, label, rightColumnRect.x, rowY, palette.text);
    }
    drawUiText(context, value, rightColumnRect.x + 28, rowY, palette.accent);
    rowY += 8;
  }

  context.fillStyle = palette.accent;
  context.fillRect(ctaRect.x, ctaRect.y - 2, ctaRect.w, 2);

  const startButtonRect = makeRect(ctaRect.x + ctaRect.w - 72, ctaRect.y + 6, 34, 11);
  const menuButtonRect = makeRect(startButtonRect.x + startButtonRect.w + 4, startButtonRect.y, 34, 11);
  drawWrappedTextInRect(
    context,
    TITLE_START_HINT,
    makeRect(ctaRect.x, ctaRect.y + 5, startButtonRect.x - ctaRect.x - 8, ctaRect.h - 6),
    7,
    palette.accent,
    2,
  );
  drawPanelButton(context, startButtonRect.x, startButtonRect.y, startButtonRect.w, startButtonRect.h, 'START', {
    fill: palette.journalSelected,
    border: palette.cardShadow,
    text: palette.text,
    selected: false,
  });
  titleHitTargets.push({ id: 'start-game', x: startButtonRect.x, y: startButtonRect.y, w: startButtonRect.w, h: startButtonRect.h });
  drawPanelButton(context, menuButtonRect.x, menuButtonRect.y, menuButtonRect.w, menuButtonRect.h, 'MENU', {
    fill: palette.journalPage,
    border: palette.cardShadow,
    text: palette.text,
    selected: false,
  });
  titleHitTargets.push({ id: 'open-menu', x: menuButtonRect.x, y: menuButtonRect.y, w: menuButtonRect.w, h: menuButtonRect.h });

  return titleHitTargets;
}

export function drawWorldMapHud({ context, width, palette, mapMode, walkingLabel }: WorldMapHudOptions): void {
  context.font = UI_FONT_SMALL;
  if (mapMode === 'walking') {
    fillLeafGreenPanel(context, 8, 8, 116, 14);
    drawUiTextInRect(
      context,
      fitTextToWidth(context, walkingLabel ?? 'TRAVELING TO NEXT STOP', 108),
      makeRect(12, 10, 108, 10),
      palette.text,
    );
    return;
  }

  fillLeafGreenPanel(context, 8, 8, 86, 20);
  drawUiTextInRect(context, 'ARROWS MOVE', makeRect(12, 10, 78, 8), palette.text);
  drawUiTextInRect(context, 'ENTER TRAVEL', makeRect(12, 18, 78, 8), palette.text);

  fillLeafGreenPanel(context, width - 90, 8, 48, 12);
  drawUiTextInRect(context, 'ESC BACK', makeRect(width - 86, 10, 40, 8), palette.text);
}

export function drawMenuChip({ context, width, palette, isVisible }: MenuChipOptions): ButtonHitTarget[] {
  if (!isVisible) {
    return [];
  }

  const x = width - 42;
  const y = 10;
  drawPanelButton(context, x, y, 34, 11, 'MENU', {
    fill: palette.journalPage,
    border: palette.cardShadow,
    text: palette.text,
  });

  return [{ id: 'open-menu', x, y, w: 34, h: 11 }];
}

export function drawHabitatChip({ context, width, palette, label, isVisible }: HabitatChipOptions): void {
  if (!isVisible || !label) {
    return;
  }

  context.font = UI_FONT_SMALL;
  const maxTextWidth = Math.max(36, width - 62);
  const chipLabel = fitTextToWidth(context, label.toUpperCase(), maxTextWidth);
  const chipWidth = Math.min(maxTextWidth + 8, Math.max(44, Math.round(context.measureText(chipLabel).width) + 10));
  const chipRect = makeRect(8, 10, chipWidth, 11);

  fillPixelPanel(context, chipRect.x, chipRect.y, chipRect.w, chipRect.h, palette.journalPage, palette.cardShadow);
  drawUiTextInRect(context, chipLabel, chipRect, palette.accent, { padding: 4 });
}

export function drawMenuOverlay({
  context,
  width,
  height,
  palette,
  selectedMenuActionId,
  showResetConfirmation,
  isFullscreen,
  soundEnabled,
  showInspectHints,
  showWorldMapAction,
  showFieldStationAction,
  showFieldGuideAction,
  menuReturnMode,
}: MenuOverlayOptions): ButtonHitTarget[] {
  const hitTargets: ButtonHitTarget[] = [];
  const copyOptions = {
    showWorldMapAction,
    showFieldStationAction,
    showFieldGuideAction,
  };
  const panelWidth = Math.min(width - 28, 188);
  const panelRect = makeRect(Math.floor((width - panelWidth) / 2), 10, panelWidth, height - 20);
  const contentRect = insetRect(panelRect, 10);
  const rowHeight = 12;
  const rowGap = 2;
  const rowWidth = contentRect.w;
  const rowX = contentRect.x;
  const firstRowY = contentRect.y + 20;
  const menuRows: Array<{ id: MenuActionId; label: string; value?: string }> = [];

  context.fillStyle = 'rgba(32, 25, 20, 0.55)';
  context.fillRect(0, 0, width, height);
  fillLeafGreenPanel(context, panelRect.x, panelRect.y, panelRect.w, panelRect.h);

  context.font = UI_FONT_MEDIUM;
  drawUiText(context, 'FIELD MENU', contentRect.x, contentRect.y, palette.text);
  context.font = UI_FONT_SMALL;
  drawWrappedTextInRect(
    context,
    getMenuOverlayIntroText(copyOptions),
    makeRect(contentRect.x, contentRect.y + 12, contentRect.w, 16),
    6,
    palette.text,
    2,
  );

  if (showWorldMapAction) {
    menuRows.push({ id: 'world-map', label: 'World map', value: 'OPEN' });
  }
  if (showFieldStationAction) {
    menuRows.push({ id: 'field-station', label: 'Field station', value: 'OPEN' });
  }
  if (showFieldGuideAction) {
    menuRows.push({ id: 'field-guide', label: 'Field guide', value: 'COPY' });
  }
  menuRows.push({ id: 'toggle-fullscreen', label: 'Big screen', value: isFullscreen ? 'ON' : 'OFF' });
  menuRows.push({ id: 'toggle-sound', label: 'Sound', value: soundEnabled ? 'ON' : 'OFF' });
  menuRows.push({ id: 'toggle-inspect-hints', label: 'Hint markers', value: showInspectHints ? 'ON' : 'OFF' });
  menuRows.push({ id: 'reset-save', label: 'Reset save' });
  menuRows.push({ id: 'close-menu', label: menuReturnMode === 'title' ? 'Back to title' : 'Back to game' });

  for (const [index, row] of menuRows.entries()) {
    drawMenuRow(
      context,
      palette,
      makeRect(rowX, firstRowY + (rowHeight + rowGap) * index, rowWidth, rowHeight),
      row.id,
      selectedMenuActionId,
      hitTargets,
      row.label,
      row.value,
    );
  }

  const helperRect = makeRect(
    contentRect.x,
    firstRowY + (rowHeight + rowGap) * menuRows.length + 6,
    contentRect.w,
    14,
  );

  if (!showResetConfirmation) {
    drawWrappedTextInRect(
      context,
      getMenuOverlayHelperText(copyOptions),
      helperRect,
      6,
      palette.accent,
      2,
    );
    return hitTargets;
  }

  hitTargets.length = 0;
  const confirmRect = makeRect(contentRect.x + 4, contentRect.y + 66, contentRect.w - 8, 42);
  fillPixelPanel(context, confirmRect.x, confirmRect.y, confirmRect.w, confirmRect.h, palette.card, palette.cardShadow);
  drawUiTextInRect(context, 'RESET SAVE?', makeRect(confirmRect.x + 10, confirmRect.y + 2, confirmRect.w - 20, 10), palette.text);
  drawWrappedTextInRect(
    context,
    'Journal and visits go back to the start.',
    makeRect(confirmRect.x + 10, confirmRect.y + 14, confirmRect.w - 20, 14),
    6,
    palette.text,
    2,
  );

  const keepSelected = selectedMenuActionId === 'cancel-reset';
  const keepButtonRect = makeRect(confirmRect.x + 10, confirmRect.y + confirmRect.h - 13, 48, 10);
  drawPanelButton(context, keepButtonRect.x, keepButtonRect.y, keepButtonRect.w, keepButtonRect.h, 'KEEP IT', {
    fill: keepSelected ? palette.journalPage : palette.journalSelected,
    border: keepSelected ? palette.accent : palette.cardShadow,
    text: palette.text,
    selected: false,
  });
  if (keepSelected) {
    context.fillStyle = palette.accent;
    context.fillRect(keepButtonRect.x + 4, keepButtonRect.y + 2, 2, 6);
  }
  hitTargets.push({ id: 'cancel-reset', x: keepButtonRect.x, y: keepButtonRect.y, w: keepButtonRect.w, h: keepButtonRect.h });

  const resetSelected = selectedMenuActionId === 'confirm-reset';
  const resetButtonRect = makeRect(confirmRect.x + confirmRect.w - 58, keepButtonRect.y, 48, 10);
  drawPanelButton(context, resetButtonRect.x, resetButtonRect.y, resetButtonRect.w, resetButtonRect.h, 'RESET', {
    fill: resetSelected ? '#fde7d8' : '#f0c6a8',
    border: resetSelected ? '#7d2919' : palette.cardShadow,
    text: '#7d2919',
    selected: false,
  });
  if (resetSelected) {
    context.fillStyle = '#7d2919';
    context.fillRect(resetButtonRect.x + 4, resetButtonRect.y + 2, 2, 6);
  }
  hitTargets.push({ id: 'confirm-reset', x: resetButtonRect.x, y: resetButtonRect.y, w: resetButtonRect.w, h: resetButtonRect.h });

  return hitTargets;
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
  title,
  text,
}: FieldRequestNoticeOptions): void {
  const rect = makeRect(Math.round((width - 154) / 2), height - 36, 154, 32);

  fillLeafGreenPanel(context, rect.x, rect.y, rect.w, rect.h);
  context.font = UI_FONT_SMALL;
  drawUiTextInRect(context, fitTextToWidth(context, title.toUpperCase(), rect.w - 8), makeRect(rect.x + 4, rect.y + 2, rect.w - 8, 8), '#395f56', { align: 'center' });
  drawUiTextInRect(context, fitTextToWidth(context, text, rect.w - 8), makeRect(rect.x + 4, rect.y + 10, rect.w - 8, 8), '#395f56', { align: 'center' });
  drawUiTextInRect(context, 'DETAILS IN JOURNAL (J)', makeRect(rect.x + 4, rect.y + 19, rect.w - 8, 8), '#395f56', { align: 'center' });
}

export function drawFieldRequestHintChip({
  context,
  width,
  palette,
  title,
  isVisible,
}: FieldRequestHintOptions): void {
  if (!isVisible || !title) {
    return;
  }

  const rect = makeRect(width - 86, 24, 78, 18);
  fillPixelPanel(context, rect.x, rect.y, rect.w, rect.h, palette.journalPage, palette.cardShadow);
  drawUiTextInRect(context, 'NOTEBOOK J', makeRect(rect.x + 4, rect.y + 2, rect.w - 8, 8), palette.accent, {
    align: 'center',
  });
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

  fillPixelPanel(context, rect.x, rect.y, rect.w, rect.h, palette.journalPage, palette.accent);
  context.font = UI_FONT_SMALL;
  drawWrappedTextInRect(
    context,
    notice.text,
    makeRect(rect.x + 6, rect.y + 4, rect.w - 12, rect.h - 6),
    6,
    palette.text,
    2,
  );
}

export function drawFieldStationOverlay({
  context,
  width,
  height,
  palette,
  view,
  seasonPage,
  subtitle,
  credits,
  selectedOutingSupportId,
  outingSupportSelected,
  upgrades,
  selectedUpgradeId,
  atlas,
  routeBoard,
  expedition,
  seasonWrap,
  selectedNurseryCardId,
  nursery,
}: FieldStationOverlayOptions): void {
  const panelWidth = Math.min(width - 24, 204);
  const panelRect = makeRect(Math.floor((width - panelWidth) / 2), 8, panelWidth, height - 16);
  const contentRect = insetRect(panelRect, 10);
  const creditLabel = `${credits}C`;
  const tabY = contentRect.y + 12;
  const tabGap = 4;
  const tabWidth = Math.floor((contentRect.w - tabGap) / 2);
  const seasonTabRect = makeRect(contentRect.x, tabY, tabWidth, 10);
  const nurseryTabRect = makeRect(contentRect.x + tabWidth + tabGap, tabY, contentRect.w - tabWidth - tabGap, 10);
  const bodyTop = tabY + 14;

  context.fillStyle = 'rgba(32, 25, 20, 0.55)';
  context.fillRect(0, 0, width, height);
  fillLeafGreenPanel(context, panelRect.x, panelRect.y, panelRect.w, panelRect.h);

  context.font = UI_FONT_MEDIUM;
  drawUiText(context, 'FIELD STATION', contentRect.x, contentRect.y, palette.text);
  drawUiText(context, creditLabel, rightAlignTextX(context, creditLabel, contentRect, 2), contentRect.y, palette.accent);
  context.font = UI_FONT_SMALL;
  drawUiText(context, fitTextToWidth(context, subtitle, contentRect.w), contentRect.x, contentRect.y + 8, palette.text);

  drawPanelButton(context, seasonTabRect.x, seasonTabRect.y, seasonTabRect.w, seasonTabRect.h, 'SEASON', {
    fill: view === 'season' ? palette.journalPage : palette.journalSelected,
    border: view === 'season' ? palette.accent : palette.cardShadow,
    text: palette.text,
  });
  drawPanelButton(context, nurseryTabRect.x, nurseryTabRect.y, nurseryTabRect.w, nurseryTabRect.h, 'NURSERY', {
    fill: view === 'nursery' ? palette.journalPage : palette.journalSelected,
    border: view === 'nursery' ? palette.accent : palette.cardShadow,
    text: palette.text,
  });

  if (view === 'season') {
    const pageGap = 4;
    const pageWidth = Math.floor((contentRect.w - pageGap) / 2);
    const routesPageRect = makeRect(contentRect.x, bodyTop, pageWidth, 9);
    const expeditionPageRect = makeRect(
      contentRect.x + pageWidth + pageGap,
      bodyTop,
      contentRect.w - pageWidth - pageGap,
      9,
    );
    const seasonBodyTop = bodyTop + 11;

    drawPanelButton(context, routesPageRect.x, routesPageRect.y, routesPageRect.w, routesPageRect.h, 'ROUTES', {
      fill: seasonPage === 'routes' ? palette.journalPage : palette.journalSelected,
      border: seasonPage === 'routes' ? palette.accent : palette.cardShadow,
      text: palette.text,
    });
    drawPanelButton(
      context,
      expeditionPageRect.x,
      expeditionPageRect.y,
      expeditionPageRect.w,
      expeditionPageRect.h,
      'EXPEDITION',
      {
        fill: seasonPage === 'expedition' ? palette.journalPage : palette.journalSelected,
        border: seasonPage === 'expedition' ? palette.accent : palette.cardShadow,
        text: palette.text,
      },
    );

    if (seasonPage === 'expedition') {
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
      return;
    }

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
        const prefix =
          beat.status === 'done'
            ? 'DONE'
            : beat.status === 'ready'
            ? 'FILE'
            : beat.status === 'active'
            ? 'NOW'
            : 'NEXT';
        const beatY = atlas ? boardRect.y + 13 + index * 6 : boardRect.y + 21 + index * 7;
        drawUiText(
          context,
          fitTextToWidth(context, `${prefix} ${beat.title}`, boardRect.w - 8),
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
      selectedOutingSupportId === 'route-marker'
        ? 'ROUTE MARKER'
        : selectedOutingSupportId === 'place-tab'
          ? 'PLACE TAB'
        : selectedOutingSupportId === 'note-tabs'
          ? 'NOTE TABS'
          : 'HAND LENS',
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

    return;
  }

  const benchRect = makeRect(contentRect.x, bodyTop, contentRect.w, 28);
  const compostRect = makeRect(contentRect.x, benchRect.y + benchRect.h + 4, contentRect.w, 18);
  const bedRect = makeRect(
    contentRect.x,
    compostRect.y + compostRect.h + 4,
    contentRect.w,
    Math.max(30, contentRect.y + contentRect.h - (compostRect.y + compostRect.h + 4)),
  );
  const selectedProject = nursery.selectedProject;
  const activeProject = nursery.activeProject;
  const extrasLabel = nursery.extras.filter((extra) => extra.unlocked).map((extra) => extra.title).join(' / ');

  const cards = [
    { id: 'bench' as const, rect: benchRect, title: 'PROPAGATION BENCH' },
    { id: 'compost' as const, rect: compostRect, title: 'COMPOST HEAP' },
    { id: 'bed' as const, rect: bedRect, title: 'TEACHING BED' },
  ];

  for (const card of cards) {
    const selected = selectedNurseryCardId === card.id;
    fillPixelPanel(
      context,
      card.rect.x,
      card.rect.y,
      card.rect.w,
      card.rect.h,
      selected ? palette.journalPage : palette.journalSelected,
      selected ? palette.accent : palette.cardShadow,
    );
    drawUiTextInRect(context, card.title, makeRect(card.rect.x + 4, card.rect.y, card.rect.w - 8, 10), selected ? palette.accent : palette.text);
  }

  if (!selectedProject) {
    drawWrappedTextInRect(
      context,
      'Log more route clues to open the first nursery project.',
      makeRect(benchRect.x + 4, benchRect.y + 11, benchRect.w - 8, benchRect.h - 10),
      6,
      palette.text,
      2,
    );
  } else {
    const sourceMode = selectedProject.definition.sourceModes[0] === 'cutting' ? 'cuttings' : 'seed-stock';
    const starterCost = selectedProject.definition.starterCost?.[sourceMode === 'cuttings' ? 'cuttings' : 'seed-stock'] ?? 1;
    drawUiText(
      context,
      fitTextToWidth(context, selectedProject.definition.title, benchRect.w - 8),
      benchRect.x + 4,
      benchRect.y + 10,
      palette.text,
    );
    drawUiText(
      context,
      `Have ${nursery.resources[sourceMode === 'cuttings' ? 'cuttings' : 'seed-stock']} ${sourceMode}`,
      benchRect.x + 4,
      benchRect.y + 17,
      palette.text,
    );
    drawUiText(
      context,
      fitTextToWidth(context, `ENTER cycles • Start cost ${starterCost}`, benchRect.w - 8),
      benchRect.x + 4,
      benchRect.y + 24,
      selectedProject.affordable ? palette.accent : palette.text,
    );
  }

  drawUiText(
    context,
    `Litter ${nursery.resources.litter} -> Compost ${nursery.resources.compost}`,
    compostRect.x + 4,
    compostRect.y + 10,
    palette.text,
  );
  drawUiText(
    context,
    fitTextToWidth(context, `Auto ${nursery.compostRate}/step`, compostRect.w - 8),
    rightAlignTextX(context, `Auto ${nursery.compostRate}/step`, compostRect, 4),
    compostRect.y + 10,
    palette.accent,
  );

  if (activeProject) {
    drawUiText(
      context,
      fitTextToWidth(context, `${activeProject.definition.title} • ${activeProject.state.stage.toUpperCase()}`, bedRect.w - 8),
      bedRect.x + 4,
      bedRect.y + 10,
      palette.text,
    );
    drawWrappedTextInRect(
      context,
      activeProject.state.stage === 'mature'
        ? activeProject.definition.rewardSummary
        : `Compost and route steps will carry this bed toward ${activeProject.definition.rewardTitle}.`,
      makeRect(bedRect.x + 4, bedRect.y + 17, bedRect.w - 8, 16),
      6,
      activeProject.state.stage === 'mature' ? palette.accent : palette.text,
      2,
    );
    drawUiText(
      context,
      fitTextToWidth(
        context,
        activeProject.state.stage === 'mature'
          ? activeProject.definition.memorySummary ?? 'ENTER clears the bed'
          : 'The bed grows between route steps.',
        bedRect.w - 8,
      ),
      bedRect.x + 4,
      bedRect.y + bedRect.h - 16,
      palette.text,
    );
  } else if (selectedProject) {
    drawWrappedTextInRect(
      context,
      selectedProject.affordable
        ? `Ready to start ${selectedProject.definition.title}. ENTER plants the bed.`
        : selectedProject.definition.unlockSummary ?? 'Bring back a few more field materials before planting.',
      makeRect(bedRect.x + 4, bedRect.y + 10, bedRect.w - 8, 18),
      6,
      palette.text,
      2,
    );
  }

  if (nursery.routeSupportHint) {
    drawWrappedTextInRect(
      context,
      `Route clue: ${nursery.routeSupportHint}`,
      makeRect(bedRect.x + 4, bedRect.y + bedRect.h - 28, bedRect.w - 8, 12),
      6,
      palette.accent,
      2,
    );
  } else if (nursery.utilityNote) {
    drawWrappedTextInRect(
      context,
      nursery.utilityNote,
      makeRect(bedRect.x + 4, bedRect.y + bedRect.h - 28, bedRect.w - 8, 12),
      6,
      palette.accent,
      2,
    );
  }

  if (extrasLabel) {
    drawUiText(
      context,
      fitTextToWidth(context, `Extras: ${extrasLabel}`, bedRect.w - 8),
      bedRect.x + 4,
      bedRect.y + bedRect.h - 9,
      palette.text,
    );
  }
}

function drawSketchbookDetail(
  context: CanvasRenderingContext2D,
  palette: BiomeDefinition['palette'],
  sprites: SpriteRegistry,
  rect: UiRect,
  sketchbook: SketchbookPageView,
  selectedEntry: InspectableEntry | null,
  selectedSketchbookSlotId: SketchbookSlotId | null,
  actionTargets: JournalActionHitTarget[],
  slotTargets: JournalSketchSlotHitTarget[],
): void {
  const closeButtonRect = makeRect(rect.x + rect.w - 40, rect.y, 40, 10);
  const sourceRect = makeRect(rect.x, rect.y + 11, rect.w, 18);
  const pageRect = makeRect(rect.x, rect.y + 30, rect.w, Math.max(24, rect.h - 44));
  const topSlotGap = 4;
  const topSlotWidth = Math.max(26, Math.floor((pageRect.w - topSlotGap) / 2));
  const topSlotHeight = Math.max(14, Math.floor(pageRect.h * 0.36));
  const lowerSlotWidth = Math.max(34, Math.min(pageRect.w - 20, 54));
  const lowerSlotHeight = Math.max(14, pageRect.h - topSlotHeight - 9);
  const slotRects: Record<SketchbookSlotId, UiRect> = {
    'top-left': makeRect(pageRect.x + 4, pageRect.y + 4, topSlotWidth - 4, topSlotHeight),
    'top-right': makeRect(pageRect.x + pageRect.w - topSlotWidth, pageRect.y + 4, topSlotWidth - 4, topSlotHeight),
    'lower-center': makeRect(
      pageRect.x + Math.floor((pageRect.w - lowerSlotWidth) / 2),
      pageRect.y + topSlotHeight + 8,
      lowerSlotWidth,
      lowerSlotHeight,
    ),
  };
  const buttonY = rect.y + rect.h - 10;
  const placeButtonRect = makeRect(rect.x, buttonY, 38, 10);
  const clearButtonRect = makeRect(placeButtonRect.x + placeButtonRect.w + 4, buttonY, 38, 10);
  const selectedSlot =
    sketchbook.slots.find((slot) => slot.slotId === selectedSketchbookSlotId) ?? sketchbook.slots[0] ?? null;
  const noteEntry = selectedSlot?.entry ?? selectedEntry;
  const noteText =
    selectedSlot?.note ??
    noteEntry?.sketchbookNote ??
    noteEntry?.shortFact ??
    'Pick one from the list.';

  drawUiText(context, 'SKETCHBOOK', rect.x, rect.y + 1, palette.accent);
  drawPanelButton(
    context,
    closeButtonRect.x,
    closeButtonRect.y,
    closeButtonRect.w,
    closeButtonRect.h,
    'DETAIL',
    {
      fill: palette.journalPage,
      border: palette.accent,
      text: palette.text,
    },
  );
  actionTargets.push({
    id: 'toggle-sketchbook',
    x: closeButtonRect.x,
    y: closeButtonRect.y,
    w: closeButtonRect.w,
    h: closeButtonRect.h,
  });

  fillPixelPanel(context, sourceRect.x, sourceRect.y, sourceRect.w, sourceRect.h, palette.journalPage, palette.accent);
  drawUiTextInRect(
    context,
    noteEntry ? 'FIELD NOTE' : 'SOURCE',
    makeRect(sourceRect.x + 4, sourceRect.y, sourceRect.w - 8, 10),
    palette.accent,
  );
  drawUiText(
    context,
    fitTextToWidth(context, noteText, sourceRect.w - 8),
    sourceRect.x + 4,
    sourceRect.y + 10,
    palette.text,
  );

  fillPixelPanel(context, pageRect.x, pageRect.y, pageRect.w, pageRect.h, '#f2ead8', palette.cardShadow);

  for (const slot of sketchbook.slots) {
    const slotRect = slotRects[slot.slotId];
    const selected = slot.slotId === selectedSketchbookSlotId;
    fillPixelPanel(
      context,
      slotRect.x,
      slotRect.y,
      slotRect.w,
      slotRect.h,
      selected ? palette.journalPage : '#fff7ea',
      selected ? palette.accent : palette.cardShadow,
    );
    slotTargets.push({
      slotId: slot.slotId,
      x: slotRect.x,
      y: slotRect.y,
      w: slotRect.w,
      h: slotRect.h,
    });

    if (!slot.entry) {
      drawUiText(
        context,
        fitTextToWidth(context, slot.label, slotRect.w - 8),
        slotRect.x + 4,
        slotRect.y + Math.max(3, Math.floor((slotRect.h - 6) / 2)),
        selected ? palette.accent : palette.text,
      );
      continue;
    }

    const spriteFrame = sprites[slot.entry.spriteId][0];
    const spriteScale = slot.slotId === 'lower-center' ? 3 : 2;
    const spriteWidth = spriteFrame.width * spriteScale;
    const spriteHeight = spriteFrame.height * spriteScale;
    const spriteX = slotRect.x + 3;
    const spriteY = slotRect.y + Math.max(1, Math.floor((slotRect.h - spriteHeight) / 2));
    context.drawImage(spriteFrame.canvas, spriteX, spriteY, spriteWidth, spriteHeight);
    drawUiText(
      context,
      fitTextToWidth(context, slot.entry.commonName, slotRect.w - spriteWidth - 8),
      spriteX + spriteWidth + 2,
      slotRect.y + 3,
      palette.text,
    );
  }

  drawPanelButton(context, placeButtonRect.x, placeButtonRect.y, placeButtonRect.w, placeButtonRect.h, 'PLACE', {
    fill: palette.journalPage,
    border: palette.accent,
    text: palette.text,
  });
  actionTargets.push({
    id: 'place-sketch-entry',
    x: placeButtonRect.x,
    y: placeButtonRect.y,
    w: placeButtonRect.w,
    h: placeButtonRect.h,
  });
  drawPanelButton(context, clearButtonRect.x, clearButtonRect.y, clearButtonRect.w, clearButtonRect.h, 'CLEAR', {
    fill: palette.journalSelected,
    border: palette.cardShadow,
    text: palette.text,
  });
  actionTargets.push({
    id: 'clear-sketch-slot',
    x: clearButtonRect.x,
    y: clearButtonRect.y,
    w: clearButtonRect.w,
    h: clearButtonRect.h,
  });

  drawUiText(
    context,
    fitTextToWidth(context, 'X BACK  L/R SLOT', rect.w - 84),
    clearButtonRect.x + clearButtonRect.w + 4,
    buttonY + 2,
    palette.text,
  );
}

export function drawJournalOverlay({
  context,
  width,
  height,
  palette,
  sprites,
  totalDiscoveredCount,
  biomeProgress,
  selectedBiomeProgress,
  selectedBiomeSurveyState,
  discoveredEntries,
  selectedEntryId,
  selectedEntry,
  selectedEntryDetailText,
  selectedEntrySightings,
  ecosystemNote,
  observationPrompt,
  fieldRequest,
  comparison,
  isComparisonOpen,
  sketchbook,
  isSketchbookOpen,
  selectedSketchbookSlotId,
}: JournalOverlayOptions): {
  entryTargets: JournalHitTarget[];
  scrollTargets: JournalScrollHitTarget[];
  biomeTargets: JournalBiomeHitTarget[];
  actionTargets: JournalActionHitTarget[];
  sketchSlotTargets: JournalSketchSlotHitTarget[];
  visibleEntryIds: string[];
  canScrollUp: boolean;
  canScrollDown: boolean;
} {
  const entryTargets: JournalHitTarget[] = [];
  const scrollTargets: JournalScrollHitTarget[] = [];
  const biomeTargets: JournalBiomeHitTarget[] = [];
  const actionTargets: JournalActionHitTarget[] = [];
  const sketchSlotTargets: JournalSketchSlotHitTarget[] = [];
  const panelRect = makeRect(8, 8, width - 16, height - 16);
  const contentRect = insetRect(panelRect, 6);
  const selectorRect = makeRect(contentRect.x, contentRect.y + 14, contentRect.w, 12);
  const progressRect = makeRect(contentRect.x, contentRect.y + 28, contentRect.w, 12);
  const bodyRect = makeRect(contentRect.x, contentRect.y + 44, contentRect.w, contentRect.h - 44);
  const hasPromptWithUnlockedNote = ecosystemNote.state === 'unlocked' && Boolean(observationPrompt);
  const listWidth = isComparisonOpen ? 52 : isSketchbookOpen ? 56 : hasPromptWithUnlockedNote ? 56 : 64;
  const [listRect, detailRect] = splitRectColumns(bodyRect, listWidth, 4);
  const listContentRect = insetRect(listRect, 4);
  const detailContentRect = insetRect(detailRect, 4);
  const detailLayout = fieldRequest && !isSketchbookOpen ? takeBottom(detailContentRect, 24, 3) : null;
  const detailMainRect = detailLayout?.top ?? detailContentRect;
  const requestRect = detailLayout?.bottom ?? null;
  const selectorState = buildJournalBiomeSelectorState(biomeProgress, selectedBiomeProgress.biomeId);
  const selectorLayout = buildJournalBiomeSelectorLayout(selectorRect, selectorState.indicators.length);

  context.fillStyle = 'rgba(32, 25, 20, 0.45)';
  context.fillRect(0, 0, width, height);
  fillPixelPanel(context, panelRect.x, panelRect.y, panelRect.w, panelRect.h, palette.journalPage, palette.cardShadow);

  context.font = UI_FONT_MEDIUM;
  drawUiText(context, 'FIELD JOURNAL', contentRect.x + 4, contentRect.y - 1, palette.text);
  context.font = UI_FONT_SMALL;
  const totalLabel = `${totalDiscoveredCount} total`;
  drawUiText(context, totalLabel, rightAlignTextX(context, totalLabel, makeRect(contentRect.x, contentRect.y, contentRect.w, 8), 4), contentRect.y, palette.text);

  drawPanelButton(
    context,
    selectorLayout.previousRect.x,
    selectorLayout.previousRect.y,
    selectorLayout.previousRect.w,
    selectorLayout.previousRect.h,
    '<',
    {
      fill: palette.journalSelected,
      border: palette.cardShadow,
      text: palette.text,
      selected: false,
    },
  );
  biomeTargets.push({
    biomeId: selectorState.previousBiomeId,
    x: selectorLayout.previousRect.x,
    y: selectorLayout.previousRect.y,
    w: selectorLayout.previousRect.w,
    h: selectorLayout.previousRect.h,
  });
  drawPanelButton(
    context,
    selectorLayout.nextRect.x,
    selectorLayout.nextRect.y,
    selectorLayout.nextRect.w,
    selectorLayout.nextRect.h,
    '>',
    {
      fill: palette.journalSelected,
      border: palette.cardShadow,
      text: palette.text,
      selected: false,
    },
  );
  biomeTargets.push({
    biomeId: selectorState.nextBiomeId,
    x: selectorLayout.nextRect.x,
    y: selectorLayout.nextRect.y,
    w: selectorLayout.nextRect.w,
    h: selectorLayout.nextRect.h,
  });

  fillPixelPanel(
    context,
    selectorLayout.labelRect.x,
    selectorLayout.labelRect.y,
    selectorLayout.labelRect.w,
    selectorLayout.labelRect.h,
    palette.journalPage,
    palette.accent,
  );
  const selectedLabelText = selectorState.selectedLabel.toUpperCase();
  drawUiText(
    context,
    selectedLabelText,
    selectorLayout.labelRect.x + Math.max(6, Math.floor((selectorLayout.labelRect.w - context.measureText(selectedLabelText).width) / 2)),
    selectorLayout.labelRect.y + selectorLayout.labelRect.h - 3,
    palette.text,
  );

  for (const [index, indicator] of selectorState.indicators.entries()) {
    const rect = selectorLayout.indicatorRects[index];
    context.fillStyle = indicator.selected ? palette.accent : palette.cardShadow;
    context.fillRect(rect.x, rect.y, rect.w, rect.h);
    biomeTargets.push({ biomeId: indicator.biomeId, x: rect.x, y: rect.y - 2, w: rect.w, h: rect.h + 4 });
  }

  fillPixelPanel(context, progressRect.x, progressRect.y, progressRect.w, progressRect.h, palette.journalSelected, palette.cardShadow);
  const surveyLabel = formatBiomeSurveyStateLabel(selectedBiomeSurveyState);
  drawUiText(
    context,
    `${selectedBiomeProgress.name} ${selectedBiomeProgress.discoveredCount}/${selectedBiomeProgress.totalCount}`,
    progressRect.x + 4,
    progressRect.y + progressRect.h - 3,
    palette.text,
  );
  if (surveyLabel) {
    drawUiText(
      context,
      surveyLabel,
      rightAlignTextX(context, surveyLabel, progressRect, 6),
      progressRect.y + progressRect.h - 3,
      palette.accent,
    );
  }

  fillPixelPanel(context, listRect.x, listRect.y, listRect.w, listRect.h, palette.journalSelected, palette.card);
  fillPixelPanel(context, detailRect.x, detailRect.y, detailRect.w, detailRect.h, palette.journalSelected, palette.cardShadow);

  const listRows = buildJournalListRows(selectedBiomeProgress, discoveredEntries);
  const totalListHeight = listRows.reduce((sum, row) => sum + row.height, 0);
  const hasOverflow = totalListHeight > listContentRect.h;
  const listViewportRect = hasOverflow
    ? makeRect(listContentRect.x, listContentRect.y + 10, listContentRect.w, listContentRect.h - 20)
    : listContentRect;
  const listWindow = buildJournalListWindow(listRows, selectedEntryId, listViewportRect.h);

  if (hasOverflow) {
    const upRect = makeRect(listContentRect.x, listContentRect.y, listContentRect.w, 8);
    const downRect = makeRect(listContentRect.x, listContentRect.y + listContentRect.h - 8, listContentRect.w, 8);

    if (listWindow.hasHiddenAbove) {
      drawPanelButton(context, upRect.x, upRect.y, upRect.w, upRect.h, 'UP', {
        fill: palette.journalSelected,
        border: palette.cardShadow,
        text: palette.accent,
      });
      scrollTargets.push({ direction: -1, x: upRect.x, y: upRect.y, w: upRect.w, h: upRect.h });
    }

    if (listWindow.hasHiddenBelow) {
      drawPanelButton(context, downRect.x, downRect.y, downRect.w, downRect.h, 'DOWN', {
        fill: palette.journalSelected,
        border: palette.cardShadow,
        text: palette.accent,
      });
      scrollTargets.push({ direction: 1, x: downRect.x, y: downRect.y, w: downRect.w, h: downRect.h });
    }
  }

  let listY = listViewportRect.y;
  for (const row of listWindow.visibleRows) {
    if (row.type === 'category') {
      drawUiText(context, row.label, listViewportRect.x, listY, palette.accent);
      listY += row.height;
      continue;
    }

    const isSelected = row.entryId === selectedEntryId;
    if (isSelected) {
      fillPixelPanel(context, listViewportRect.x - 2, listY - 1, listViewportRect.w + 1, 10, palette.journalPage, palette.accent);
    }

    drawUiText(
      context,
      fitTextToWidth(context, row.label, listViewportRect.w - 6),
      listViewportRect.x + 2,
      listY + 1,
      palette.text,
    );
    entryTargets.push({ entryId: row.entryId, x: listViewportRect.x - 2, y: listY - 1, w: listViewportRect.w + 1, h: 10 });
    listY += row.height;
  }

  if (!discoveredEntries.length || !selectedEntry || !selectedEntryDetailText) {
    drawWrappedTextInRect(
      context,
      `This ${formatJournalBiomeLabel(selectedBiomeProgress.biomeId).toLowerCase()} page is still empty. Explore and inspect nature to fill it in.`,
      detailMainRect,
      7,
      palette.text,
      maxLinesForHeight(detailMainRect.h, 7),
    );
    if (requestRect && fieldRequest) {
      drawFieldRequestCard(context, palette, requestRect, fieldRequest);
    }
    return {
      entryTargets,
      scrollTargets,
      biomeTargets,
      actionTargets,
      sketchSlotTargets,
      visibleEntryIds: listWindow.visibleEntryIds,
      canScrollUp: listWindow.hasHiddenAbove,
      canScrollDown: listWindow.hasHiddenBelow,
    };
  }

  if (isSketchbookOpen && sketchbook) {
    drawSketchbookDetail(
      context,
      palette,
      sprites,
      detailMainRect,
      sketchbook,
      selectedEntry,
      selectedSketchbookSlotId,
      actionTargets,
      sketchSlotTargets,
    );

    return {
      entryTargets,
      scrollTargets,
      biomeTargets,
      actionTargets,
      sketchSlotTargets,
      visibleEntryIds: listWindow.visibleEntryIds,
      canScrollUp: listWindow.hasHiddenAbove,
      canScrollDown: listWindow.hasHiddenBelow,
    };
  }

  const sightingsText =
    selectedEntrySightings.length > 1
      ? formatSightingSummary(selectedEntrySightings)
      : null;
  const comparisonAvailable = Boolean(comparison);
  const hasNote = ecosystemNote.state !== 'none';
  const visibleObservationPrompt = ecosystemNote.state === 'locked' ? null : observationPrompt;
  const showUnlockedNoteSummary = ecosystemNote.state === 'unlocked' && Boolean(ecosystemNote.note);
  const showSplitCompanion = showUnlockedNoteSummary && Boolean(visibleObservationPrompt);
  const sketchbookButtonRect = sketchbook
    ? makeRect(detailMainRect.x + detailMainRect.w - 42, detailMainRect.y - 1, 42, 10)
    : null;
  if (isComparisonOpen && comparison) {
    const comparisonButtonRect = makeRect(detailMainRect.x + detailMainRect.w - 28, detailMainRect.y - 1, 28, 10);
    const headerTextWidth = detailMainRect.w - comparisonButtonRect.w - 4;
    const scientificY = detailMainRect.y + 8;
    const cardsRect = makeRect(
      detailMainRect.x,
      detailMainRect.y + 14,
      detailMainRect.w,
      detailMainRect.h - 14,
    );
    const gap = 2;
    const cardHeight = Math.max(18, Math.floor((cardsRect.h - gap * (comparison.cards.length - 1)) / comparison.cards.length));

    context.font = UI_FONT_MEDIUM;
    drawUiText(
      context,
      fitTextToWidth(context, selectedEntry.commonName, headerTextWidth),
      detailMainRect.x,
      detailMainRect.y,
      palette.text,
    );
    context.font = UI_FONT_SMALL;
    drawUiText(
      context,
      fitTextToWidth(context, selectedEntryDetailText, headerTextWidth),
      detailMainRect.x,
      scientificY,
      palette.accent,
    );

    drawPanelButton(
      context,
      comparisonButtonRect.x,
      comparisonButtonRect.y,
      comparisonButtonRect.w,
      comparisonButtonRect.h,
      'BACK',
      {
        fill: palette.journalPage,
        border: palette.accent,
        text: palette.text,
      },
    );
    actionTargets.push({
      id: 'toggle-comparison',
      x: comparisonButtonRect.x,
      y: comparisonButtonRect.y,
      w: comparisonButtonRect.w,
      h: comparisonButtonRect.h,
    });

    context.fillStyle = palette.cardShadow;
    context.fillRect(detailMainRect.x, detailMainRect.y + 11, detailMainRect.w, 2);

    let cardY = cardsRect.y;
    for (const card of comparison.cards) {
      drawComparisonCard(
        context,
        palette,
        makeRect(cardsRect.x, cardY, cardsRect.w, cardHeight),
        `${formatCompactSightingBiomeLabel(card.biomeId)}: ${card.noteTitle}`,
        card.noteSummary,
        card.biomeId === selectedBiomeProgress.biomeId,
      );
      cardY += cardHeight + gap;
    }

    return {
      entryTargets,
      scrollTargets,
      biomeTargets,
      actionTargets,
      sketchSlotTargets,
      visibleEntryIds: listWindow.visibleEntryIds,
      canScrollUp: listWindow.hasHiddenAbove,
      canScrollDown: listWindow.hasHiddenBelow,
    };
  }

  const spriteFrame = sprites[selectedEntry.spriteId][0];
  const spriteScale = 2;
  const spriteWidth = spriteFrame.width * spriteScale;
  const spriteHeight = spriteFrame.height * spriteScale;
  const spriteX = detailMainRect.x;
  const spriteY = detailMainRect.y;
  const textStartX = detailMainRect.x + 20;
  const textWidth = detailMainRect.w - 20 - (sketchbookButtonRect ? sketchbookButtonRect.w + 4 : 0);
  const nameRect = makeRect(textStartX, detailMainRect.y, textWidth, 8);
  const detailTextRect = makeRect(nameRect.x, nameRect.y + 8, nameRect.w, showSplitCompanion ? 8 : 12);
  const showSightingsLine = Boolean(sightingsText) && !showSplitCompanion;
  const sightingsRect = showSightingsLine
    ? makeRect(detailMainRect.x, detailMainRect.y + 18, detailMainRect.w, 8)
    : null;
  const detailBodyOffset = showSplitCompanion ? 16 : showSightingsLine ? 24 : 18;
  const detailBodyRect = makeRect(
    detailMainRect.x,
    detailMainRect.y + detailBodyOffset,
    detailMainRect.w,
    detailMainRect.h - detailBodyOffset,
  );
  const comparisonButtonRect =
    comparisonAvailable && hasNote
      ? makeRect(
          detailBodyRect.x + detailBodyRect.w - 40,
          detailBodyRect.y + (showSplitCompanion ? 13 : showSightingsLine ? 13 : 15),
          40,
          10,
        )
      : null;
  const hasCompanionPanel = hasNote || Boolean(visibleObservationPrompt);
  const journalTextRect = hasCompanionPanel
    ? makeRect(detailBodyRect.x, detailBodyRect.y, detailBodyRect.w, showSplitCompanion ? 6 : showSightingsLine ? 12 : 14)
    : detailBodyRect;
  const noteHeadingY = journalTextRect.y + journalTextRect.h + (showSplitCompanion ? 1 : 3);
  const noteRect = hasCompanionPanel && !showSplitCompanion
    ? makeRect(detailBodyRect.x, noteHeadingY + 7, detailBodyRect.w, detailBodyRect.y + detailBodyRect.h - (noteHeadingY + 7))
    : null;
  const noteSummaryWidth =
    showSplitCompanion && comparisonButtonRect ? detailBodyRect.w - comparisonButtonRect.w - 4 : detailBodyRect.w;
  const noteSummaryText = showUnlockedNoteSummary ? fitTextToWidth(context, formatUnlockedNoteText(ecosystemNote), noteSummaryWidth) : '';
  const promptHeadingY = showSplitCompanion ? detailBodyRect.y + 20 : 0;
  const promptRect = showSplitCompanion && visibleObservationPrompt
    ? makeRect(detailBodyRect.x, detailBodyRect.y + 25, detailBodyRect.w, detailBodyRect.y + detailBodyRect.h - (detailBodyRect.y + 25))
    : null;

  if (sketchbookButtonRect) {
    drawPanelButton(
      context,
      sketchbookButtonRect.x,
      sketchbookButtonRect.y,
      sketchbookButtonRect.w,
      sketchbookButtonRect.h,
      'SKETCH',
      {
        fill: palette.journalPage,
        border: palette.accent,
        text: palette.text,
      },
    );
    actionTargets.push({
      id: 'toggle-sketchbook',
      x: sketchbookButtonRect.x,
      y: sketchbookButtonRect.y,
      w: sketchbookButtonRect.w,
      h: sketchbookButtonRect.h,
    });
  }

  drawSprite(context, sprites, selectedEntry.spriteId, spriteX, spriteY, 0);
  context.drawImage(
    spriteFrame.canvas,
    spriteX,
    spriteY,
    spriteWidth,
    spriteHeight,
  );

  context.font = UI_FONT_MEDIUM;
  drawWrappedTextInRect(context, selectedEntry.commonName, nameRect, 7, palette.text, 1);
  context.font = UI_FONT_SMALL;
  drawWrappedTextInRect(context, selectedEntryDetailText, detailTextRect, 6, palette.accent, showSplitCompanion ? 1 : 2);
  if (showSightingsLine && sightingsText && sightingsRect) {
    drawWrappedTextInRect(context, sightingsText, sightingsRect, 6, palette.accent, 1);
  }

  if (comparisonButtonRect) {
    drawPanelButton(
      context,
      comparisonButtonRect.x,
      comparisonButtonRect.y,
      comparisonButtonRect.w,
      comparisonButtonRect.h,
      'COMPARE',
      {
        fill: palette.journalPage,
        border: palette.accent,
        text: palette.text,
      },
    );
    actionTargets.push({
      id: 'toggle-comparison',
      x: comparisonButtonRect.x,
      y: comparisonButtonRect.y,
      w: comparisonButtonRect.w,
      h: comparisonButtonRect.h,
    });
  }

  if (showSplitCompanion) {
    drawUiText(
      context,
      fitTextToWidth(context, selectedEntry.journalText, journalTextRect.w),
      journalTextRect.x,
      journalTextRect.y,
      palette.text,
    );
  } else {
    drawWrappedTextInRect(
      context,
      selectedEntry.journalText,
      journalTextRect,
      6,
      palette.text,
      maxLinesForHeight(journalTextRect.h, 6),
    );
  }

  if (showSplitCompanion) {
    drawUiText(
      context,
      formatNoteHeading(ecosystemNote),
      detailBodyRect.x,
      noteHeadingY,
      palette.accent,
    );
    drawUiText(
      context,
      noteSummaryText,
      detailBodyRect.x,
      detailBodyRect.y + 14,
      palette.text,
    );
    drawUiText(
      context,
      formatPromptHeading(ecosystemNote),
      detailBodyRect.x,
      promptHeadingY,
      palette.accent,
    );
  } else if (hasCompanionPanel) {
    drawUiText(
      context,
      formatObservationHeading(ecosystemNote, visibleObservationPrompt),
      detailBodyRect.x,
      noteHeadingY,
      visibleObservationPrompt || ecosystemNote.state === 'unlocked' ? palette.accent : palette.text,
    );
  }

  if (promptRect && visibleObservationPrompt) {
    fillPixelPanel(
      context,
      promptRect.x,
      promptRect.y,
      promptRect.w,
      promptRect.h,
      palette.journalPage,
      palette.accent,
    );
    drawWrappedTextInRect(
      context,
      visibleObservationPrompt.text,
      makeRect(promptRect.x + 4, promptRect.y + 4, promptRect.w - 8, promptRect.h - 6),
      6,
      palette.text,
      3,
    );
  }

  if (noteRect) {
    fillPixelPanel(
      context,
      noteRect.x,
      noteRect.y,
      noteRect.w,
      noteRect.h,
      palette.journalPage,
      visibleObservationPrompt || ecosystemNote.state === 'unlocked' ? palette.accent : palette.cardShadow,
    );
    drawWrappedTextInRect(
      context,
      visibleObservationPrompt
        ? visibleObservationPrompt.text
        : ecosystemNote.state === 'unlocked'
        ? formatUnlockedNoteText(ecosystemNote)
        : formatLockedNoteText(ecosystemNote),
      makeRect(noteRect.x + 4, noteRect.y + 4, noteRect.w - 8, noteRect.h - 6),
      6,
      palette.text,
      2,
    );
  }

  if (requestRect && fieldRequest) {
    drawFieldRequestCard(context, palette, requestRect, fieldRequest);
  }

  return {
    entryTargets,
    scrollTargets,
    biomeTargets,
    actionTargets,
    sketchSlotTargets,
    visibleEntryIds: listWindow.visibleEntryIds,
    canScrollUp: listWindow.hasHiddenAbove,
    canScrollDown: listWindow.hasHiddenBelow,
  };
}
