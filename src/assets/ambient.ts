import type { SpriteSource } from '../engine/sprites';
import { masterPalette } from './palette';

export const ambientSprites: SpriteSource[] = [
  {
    id: 'pacific-sand-crab',
    palette: {
      a: masterPalette.crabRed,
      b: masterPalette.shellCream,
      c: masterPalette.ink,
    },
    frames: [
      [
        '........',
        '..aaaa..',
        '.abbcca.',
        'aabcccca',
        '..a..a..',
        '.a....a.',
      ],
      [
        '........',
        '..aaaa..',
        '.accbba.',
        'aaccccca',
        '.a....a.',
        '..a..a..',
      ],
    ],
  },
  {
    id: 'sanderling',
    palette: {
      a: masterPalette.birdCream,
      b: masterPalette.birdBrown,
      c: masterPalette.ink,
      d: masterPalette.sandDark,
    },
    frames: [
      [
        '....aa..',
        '...abca.',
        '..abbbaa',
        '..abb...',
        '...dd...',
        '..d..d..',
      ],
      [
        '....aa..',
        '...abca.',
        '..abbbba',
        '..abb...',
        '..d.d...',
        '...d.d..',
      ],
    ],
  },
  {
    id: 'driftwood-log',
    palette: {
      a: masterPalette.woodLight,
      b: masterPalette.woodDark,
      c: masterPalette.cloud,
    },
    frames: [[
      '..............',
      '..aaaabbaaa...',
      '.aabbbbbbbba..',
      '.abbcbbbcbba..',
      '..bbbbbbbb....',
      '...abbaaa.....',
    ]],
  },
  {
    id: 'western-snowy-plover',
    palette: {
      a: masterPalette.cloud,
      b: masterPalette.birdCream,
      c: masterPalette.rockDark,
      d: masterPalette.ink,
    },
    frames: [
      [
        '....aa..',
        '...abcd.',
        '..abbbaa',
        '..abbb..',
        '...c.c..',
        '..d...d.',
      ],
      [
        '....aa..',
        '...abcd.',
        '..abbbaa',
        '..abbb..',
        '..d.c...',
        '...d...d',
      ],
    ],
  },
  {
    id: 'bull-kelp-wrack',
    palette: {
      a: masterPalette.leafDark,
      b: masterPalette.leafLight,
      c: masterPalette.seaDark,
    },
    frames: [[
      '..............',
      '...a...a......',
      '..ab..aba.....',
      '.abbcabbba....',
      '..bbcbbba.....',
      '...ccccc......',
    ]],
  },
];
