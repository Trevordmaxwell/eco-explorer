import type { SpriteSource } from '../engine/sprites';
import { masterPalette } from './palette';

export const floraSprites: SpriteSource[] = [
  {
    id: 'beach-grass',
    palette: {
      a: masterPalette.leafDark,
      b: masterPalette.leafLight,
      c: masterPalette.stem,
    },
    frames: [[
      '....a...',
      '...ab...',
      '..abb...',
      '..abc...',
      '.abcbc..',
      '.abbcb..',
      '..cbc...',
      '...c....',
      '...c....',
      '..ccc...',
      '.ccccc..',
      '........',
    ]],
  },
  {
    id: 'sea-rocket',
    palette: {
      a: masterPalette.stem,
      b: masterPalette.leafLight,
      c: masterPalette.shellPink,
      d: masterPalette.shellCream,
    },
    frames: [[
      '....c...',
      '...cdc..',
      '..bbd...',
      '...ba...',
      '..bbba..',
      '.babb...',
      '...a....',
      '..bab...',
      '..aaa...',
      '.aaaaa..',
      '...a....',
      '........',
    ]],
  },
  {
    id: 'pickleweed',
    palette: {
      a: masterPalette.leafDark,
      b: masterPalette.leafLight,
      c: masterPalette.stem,
    },
    frames: [[
      '..ab....',
      '..bb....',
      '.abb.a..',
      '.bbb.bb.',
      '..cb.bc.',
      '.cbbbc..',
      '.cbbbc..',
      '..ccc...',
      '..ccc...',
      '.ccccc..',
      '........',
      '........',
    ]],
  },
];
