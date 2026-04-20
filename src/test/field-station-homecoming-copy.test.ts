import { describe, expect, it } from 'vitest';

import {
  FIELD_STATION_HOMECOMING_COPY_LABEL,
  FIELD_STATION_HOMECOMING_COPY_LABEL_MAX,
  FIELD_STATION_HOMECOMING_COPY_MILESTONES,
  FIELD_STATION_HOMECOMING_COPY_TEXT_MAX,
  resolveFieldStationHomecomingCopy,
  type FieldStationHomecomingCopyRequestId,
} from '../engine/field-station-homecoming-copy';

const CHRONOLOGICAL_HOMECOMING_CASES: Array<{
  requestId: FieldStationHomecomingCopyRequestId;
  text: string;
}> = [
  {
    requestId: 'coastal-edge-moisture',
    text: 'Coast line filed. The station holds one shore-to-forest thread.',
  },
  {
    requestId: 'tundra-survey-slice',
    text: 'Coast and ridge filed. The board reads like one longer path.',
  },
  {
    requestId: 'treeline-low-fell',
    text: 'Edge line filed. Coast, ridge, and low fell now connect.',
  },
  {
    requestId: 'forest-expedition-upper-run',
    text: 'Root Hollow filed. The season reaches from shore to upper run.',
  },
  {
    requestId: 'forest-season-threads',
    text: 'Season Threads filed. The station can rest before High Pass.',
  },
  {
    requestId: 'treeline-high-pass',
    text: 'High Pass filed. Revisit how stone, shelter, and talus connect.',
  },
];

function countSentences(text: string): number {
  return text.split(/[.!?]+/).filter((sentence) => sentence.trim()).length;
}

describe('field station homecoming copy', () => {
  it('stays silent before the first filed-progress homecoming milestone', () => {
    expect(
      resolveFieldStationHomecomingCopy({
        completedFieldRequestIds: ['beach-shore-shelter', 'forest-hidden-hollow'],
      }),
    ).toBeNull();
  });

  it('resolves the strongest applicable filed-progress homecoming line', () => {
    const completedFieldRequestIds: string[] = [];

    for (const { requestId, text } of CHRONOLOGICAL_HOMECOMING_CASES) {
      completedFieldRequestIds.push(requestId);

      expect(resolveFieldStationHomecomingCopy({ completedFieldRequestIds })).toEqual({
        label: FIELD_STATION_HOMECOMING_COPY_LABEL,
        requestId,
        text,
      });
    }
  });

  it('keeps every line compact and free of route clue-list repetition', () => {
    const repeatedClueListWords =
      /dune grass|lee cover|wrack line|bent cover|stone break|first bloom|wet tuft|brief fruit|seep mark|stone pocket|root-held|high run|last tree shape|low wood|fell bloom|low rest/i;

    expect(FIELD_STATION_HOMECOMING_COPY_LABEL.length).toBeLessThanOrEqual(
      FIELD_STATION_HOMECOMING_COPY_LABEL_MAX,
    );

    for (const { requestId, text } of FIELD_STATION_HOMECOMING_COPY_MILESTONES) {
      const copy = resolveFieldStationHomecomingCopy({ completedFieldRequestIds: [requestId] });

      expect(copy).toMatchObject({
        label: FIELD_STATION_HOMECOMING_COPY_LABEL,
        requestId,
        text,
      });
      expect(text.length).toBeLessThanOrEqual(FIELD_STATION_HOMECOMING_COPY_TEXT_MAX);
      expect(countSentences(text)).toBeLessThanOrEqual(2);
      expect(text).not.toMatch(repeatedClueListWords);
    }
  });
});
