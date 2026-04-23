import { describe, expect, it } from 'vitest';
import gitignore from '../../.gitignore?raw';
import createReviewDropScript from '../../scripts/create-review-drop.mjs?raw';
import verifyReviewDropScript from '../../scripts/verify-review-drop.mjs?raw';

function readGitIgnoreEntries(): Set<string> {
  return new Set(
    gitignore
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0 && !line.startsWith('#')),
  );
}

describe('review-drop hygiene', () => {
  it('keeps generated and clean-extract review folders ignored by the repo', () => {
    const ignoredEntries = readGitIgnoreEntries();
    const generatedPaths = ['node_modules', 'dist', 'dist-ssr', '.tmp', 'output', 'test-results'];

    for (const generatedPath of generatedPaths) {
      expect(ignoredEntries.has(generatedPath)).toBe(true);
    }
  });

  it('filters macOS metadata from review-drop archives and verification', () => {
    for (const scriptText of [createReviewDropScript, verifyReviewDropScript]) {
      expect(scriptText).toContain("'.DS_Store'");
      expect(scriptText).toContain("'__MACOSX'");
      expect(scriptText).toContain("name.startsWith('._')");
    }

    expect(createReviewDropScript).toContain('COPYFILE_DISABLE');
  });
});
