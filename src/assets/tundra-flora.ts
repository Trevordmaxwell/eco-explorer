import type { SpriteSource } from '../engine/sprites';
import { masterPalette } from './palette';

export const tundraFloraSprites: SpriteSource[] = [
  {
    id: 'arctic-willow',
    palette: {
      a: masterPalette.willowRed,
      b: masterPalette.tundraGreen,
      c: masterPalette.snowMid,
    },
    frames: [[
      '........',
      '........',
      '..b.b...',
      '.bbabb..',
      '..aba...',
      '.bbabb..',
      '...a....',
      '..aaa...',
      '.aacaa..',
      '.aacaa..',
      '..ccc...',
      '........',
    ]],
  },
  {
    id: 'purple-saxifrage',
    palette: {
      a: '#a16fd4',
      b: '#d6b3f6',
      c: masterPalette.tundraGreen,
      d: masterPalette.snowMid,
    },
    frames: [[
      '...a....',
      '..aba...',
      '.abbb...',
      '..aba.a.',
      '...caba.',
      '..acab..',
      '.acab...',
      '..ac....',
      '.acca...',
      '..dd....',
      '.dddd...',
      '........',
    ]],
  },
  {
    id: 'cottongrass',
    palette: {
      a: masterPalette.cloud,
      b: masterPalette.frostBlue,
      c: masterPalette.tundraGreen,
    },
    frames: [[
      '..aa....',
      '.aaba...',
      '..aa....',
      '....aa..',
      '...aaba.',
      '....aa..',
      '..a.a...',
      '.a.c.a..',
      '..ccc...',
      '.ccccc..',
      '...c....',
      '........',
    ]],
  },
];
