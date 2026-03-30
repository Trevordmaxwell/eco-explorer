import { describe, expect, it } from 'vitest';

import {
  TITLE_FLAVOR_LINES,
  TITLE_FLAVOR_MAX_CHARS,
  TITLE_SUBTITLE_LINES,
  TITLE_SUBTITLE_MAX_CHARS,
} from '../engine/title-copy';

describe('title copy budgets', () => {
  it('keeps the subtitle within the safe line budget and preserves the field journal promise', () => {
    expect(TITLE_SUBTITLE_LINES.join(' ')).toContain('field journal');

    for (const line of TITLE_SUBTITLE_LINES) {
      expect(line.length).toBeLessThanOrEqual(TITLE_SUBTITLE_MAX_CHARS);
    }
  });

  it('keeps the flavor lines within their budgeted width', () => {
    for (const line of TITLE_FLAVOR_LINES) {
      expect(line.length).toBeLessThanOrEqual(TITLE_FLAVOR_MAX_CHARS);
    }
  });
});
