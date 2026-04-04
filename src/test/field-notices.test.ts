import { describe, expect, it } from 'vitest';

import {
  createNotebookReadyFieldNotice,
  resolveRecordedFieldRequestNotice,
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
});
