import { describe, expect, it } from 'vitest';

import {
  canShowGuidedFieldSeasonNotice,
  createNotebookReadyFieldNotice,
  isGuidedFieldSeasonNoticeTitle,
  resolveRecordedFieldRequestNotice,
  shouldAdvanceFieldRequestNoticeTimer,
  shouldClearFieldNoticeForHomecoming,
  shouldReplaceFieldNotice,
} from '../engine/field-notices';

describe('field-notices', () => {
  it('resolves route-backed recorded notices with route styling', () => {
    expect(
      resolveRecordedFieldRequestNotice(
        'beach-shore-shelter',
        'American Dunegrass, Driftwood, and Bull Kelp Wrack mark how shelter grows from dune edge to tide line.',
      ),
    ).toEqual({
      title: 'SHORE SHELTER',
      text: 'American Dunegrass, Driftwood, and Bull Kelp Wrack mark how shelter grows from dune edge to tide line.',
      variant: 'filed-route',
    });
  });

  it('keeps non-route recorded notices on the default styling', () => {
    expect(resolveRecordedFieldRequestNotice('forest-survey-slice')).toEqual({
      title: 'TASK RECORDED',
      text: 'Forest Survey',
      variant: 'default',
    });
  });

  it('creates notebook-ready notices with fallback copy', () => {
    expect(createNotebookReadyFieldNotice(null, null)).toEqual({
      title: 'NOTEBOOK READY',
      text: 'Return to the field station and file this note.',
      variant: 'notebook-ready',
    });
  });

  it('recognizes only guided field-season notice titles', () => {
    expect(isGuidedFieldSeasonNoticeTitle('NOTEBOOK TASK')).toBe(true);
    expect(isGuidedFieldSeasonNoticeTitle('FIELD STATION')).toBe(true);
    expect(isGuidedFieldSeasonNoticeTitle('NEXT STOP')).toBe(true);
    expect(isGuidedFieldSeasonNoticeTitle('SEASON THREADS')).toBe(true);
    expect(isGuidedFieldSeasonNoticeTitle('NOTEBOOK READY')).toBe(false);
    expect(isGuidedFieldSeasonNoticeTitle('HIGH PASS')).toBe(false);
  });

  it('allows guided notices to stack only across guided notice titles', () => {
    const guidedNotice = {
      title: 'FIELD STATION',
      text: 'Return to the field station.',
      variant: 'default' as const,
    };
    const filedNotice = {
      title: 'HIGH PASS',
      text: 'High Pass filed from Treeline Pass.',
      variant: 'filed-route' as const,
    };
    const notebookReadyNotice = {
      title: 'NOTEBOOK READY',
      text: 'Return to the field station and file this note.',
      variant: 'notebook-ready' as const,
    };

    expect(canShowGuidedFieldSeasonNotice(null, 'NOTEBOOK TASK')).toBe(true);
    expect(canShowGuidedFieldSeasonNotice(guidedNotice, 'NEXT STOP')).toBe(true);
    expect(canShowGuidedFieldSeasonNotice(guidedNotice, 'NOTEBOOK READY')).toBe(false);
    expect(canShowGuidedFieldSeasonNotice(filedNotice, 'FIELD STATION')).toBe(false);
    expect(canShowGuidedFieldSeasonNotice(notebookReadyNotice, 'SEASON THREADS')).toBe(false);
  });

  it('keeps route-critical notices ahead of guided and station support defaults', () => {
    const guidedNotice = {
      title: 'FIELD STATION',
      text: 'Return to the field station.',
      variant: 'default' as const,
    };
    const notebookReadyNotice = {
      title: 'NOTEBOOK READY',
      text: 'Return to the field station and file this note.',
      variant: 'notebook-ready' as const,
    };
    const filedNotice = {
      title: 'HIGH PASS',
      text: 'High Pass filed from Treeline Pass.',
      variant: 'filed-route' as const,
    };
    const supportNotice = {
      title: 'OUTING SUPPORT',
      text: 'Note Tabs keeps the notebook preview handy.',
      variant: 'default' as const,
    };

    expect(canShowGuidedFieldSeasonNotice(guidedNotice, 'SEASON THREADS')).toBe(true);
    expect(canShowGuidedFieldSeasonNotice(notebookReadyNotice, 'FIELD STATION')).toBe(false);
    expect(canShowGuidedFieldSeasonNotice(filedNotice, 'SEASON THREADS')).toBe(false);
    expect(shouldReplaceFieldNotice(notebookReadyNotice, supportNotice, { overlayMode: 'field-station' })).toBe(
      false,
    );
    expect(shouldReplaceFieldNotice(filedNotice, supportNotice, { overlayMode: 'field-station' })).toBe(false);
    expect(shouldReplaceFieldNotice(notebookReadyNotice, filedNotice, { overlayMode: 'field-station' })).toBe(
      true,
    );
  });

  it('clears only non-filed notices when earned homecoming opens', () => {
    expect(shouldClearFieldNoticeForHomecoming(null)).toBe(false);
    expect(
      shouldClearFieldNoticeForHomecoming({
        title: 'FIELD STATION',
        text: 'Field station next.',
        variant: 'default',
      }),
    ).toBe(true);
    expect(
      shouldClearFieldNoticeForHomecoming({
        title: 'NOTEBOOK READY',
        text: 'Return to the field station and file this note.',
        variant: 'notebook-ready',
      }),
    ).toBe(true);
    expect(
      shouldClearFieldNoticeForHomecoming({
        title: 'HIGH PASS',
        text: 'High Pass filed from Treeline Pass.',
        variant: 'filed-route',
      }),
    ).toBe(false);
  });

  it('keeps route filing notices from being replaced by station support toasts', () => {
    const notebookReadyNotice = {
      title: 'NOTEBOOK READY',
      text: 'Return to the field station and file this note.',
      variant: 'notebook-ready' as const,
    };
    const filedNotice = {
      title: 'HIGH PASS',
      text: 'High Pass filed from Treeline Pass.',
      variant: 'filed-route' as const,
    };
    const supportNotice = {
      title: 'OUTING SUPPORT',
      text: 'Note Tabs keeps the notebook preview handy.',
      variant: 'default' as const,
    };

    expect(shouldReplaceFieldNotice(null, supportNotice, { overlayMode: 'field-station' })).toBe(true);
    expect(shouldReplaceFieldNotice(notebookReadyNotice, supportNotice, { overlayMode: 'field-station' })).toBe(
      false,
    );
    expect(shouldReplaceFieldNotice(filedNotice, supportNotice, { overlayMode: 'field-station' })).toBe(false);
    expect(shouldReplaceFieldNotice(notebookReadyNotice, supportNotice, { overlayMode: 'playing' })).toBe(true);
    expect(shouldReplaceFieldNotice(filedNotice, supportNotice, { overlayMode: 'playing' })).toBe(true);
    expect(shouldReplaceFieldNotice(notebookReadyNotice, filedNotice, { overlayMode: 'field-station' })).toBe(
      true,
    );
    expect(shouldReplaceFieldNotice(supportNotice, filedNotice, { overlayMode: 'field-station' })).toBe(true);
  });

  it('advances field-request notice timers only while the notice can be seen', () => {
    expect(
      shouldAdvanceFieldRequestNoticeTimer({
        overlayMode: 'playing',
        sceneMode: 'biome',
        hasVisibleFieldGuideNotice: false,
      }),
    ).toBe(true);
    expect(
      shouldAdvanceFieldRequestNoticeTimer({
        overlayMode: 'playing',
        sceneMode: 'world-map',
        hasVisibleFieldGuideNotice: false,
      }),
    ).toBe(true);
    expect(
      shouldAdvanceFieldRequestNoticeTimer({
        overlayMode: 'menu',
        sceneMode: 'biome',
        hasVisibleFieldGuideNotice: false,
      }),
    ).toBe(false);
    expect(
      shouldAdvanceFieldRequestNoticeTimer({
        overlayMode: 'field-station',
        sceneMode: 'world-map',
        hasVisibleFieldGuideNotice: false,
      }),
    ).toBe(false);
    expect(
      shouldAdvanceFieldRequestNoticeTimer({
        overlayMode: 'playing',
        sceneMode: 'transition',
        hasVisibleFieldGuideNotice: false,
      }),
    ).toBe(false);
    expect(
      shouldAdvanceFieldRequestNoticeTimer({
        overlayMode: 'playing',
        sceneMode: 'biome',
        hasVisibleFieldGuideNotice: true,
      }),
    ).toBe(false);
  });
});
