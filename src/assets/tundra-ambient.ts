import type { SpriteSource } from '../engine/sprites';
import { masterPalette } from './palette';

export const tundraAmbientSprites: SpriteSource[] = [
  {
    id: 'arctic-hare',
    palette: {
      a: masterPalette.cloud,
      b: masterPalette.snowMid,
      c: masterPalette.iceDark,
      d: masterPalette.ink,
    },
    frames: [
      [
        '....aa..',
        '...abca.',
        '..abbbba',
        '..abb...',
        '.bb..b..',
        'd......d',
      ],
      [
        '....aa..',
        '...abca.',
        '..abbbba',
        '..abb...',
        '..b..bb.',
        '.d......',
      ],
    ],
  },
  {
    id: 'snow-bunting',
    palette: {
      a: masterPalette.cloud,
      b: masterPalette.iceDark,
      c: masterPalette.permafrost,
      d: masterPalette.ink,
    },
    frames: [
      [
        '....aa..',
        '...abda.',
        '..abbbaa',
        '..abcc..',
        '...b.b..',
        '..d...d.',
      ],
      [
        '....aa..',
        '...abda.',
        '..abbbaa',
        '..abcc..',
        '..d.b...',
        '...d...d',
      ],
    ],
  },
  {
    id: 'white-tailed-ptarmigan',
    palette: {
      a: masterPalette.cloud,
      b: masterPalette.ptarmiganBrown,
      c: masterPalette.iceDark,
      d: masterPalette.ink,
    },
    frames: [
      [
        '....aa..',
        '...abda.',
        '..abbbaa',
        '..abcc..',
        '...c.b..',
        '..d...d.',
      ],
      [
        '....aa..',
        '...abda.',
        '..abbbaa',
        '..abcc..',
        '..d.c...',
        '...d...d',
      ],
    ],
  },
  {
    id: 'northern-collared-lemming',
    palette: {
      a: '#8d7862',
      b: '#e5d5be',
      c: masterPalette.ink,
    },
    frames: [
      [
        '........',
        '...aaa..',
        '..abbbca',
        '..abbbb.',
        '.a....a.',
        '..c..c..',
      ],
      [
        '........',
        '...aaa..',
        '..abbbca',
        '..abbbb.',
        '..a..a..',
        '.c....c.',
      ],
    ],
  },
  {
    id: 'tussock-thaw-channel',
    palette: {
      a: masterPalette.tundraGreen,
      b: masterPalette.alpineMoss,
      c: masterPalette.iceDark,
      d: masterPalette.frostBlue,
      e: masterPalette.snowMid,
    },
    frames: [[
      '..............',
      '..aa....aa....',
      '.abca..acba...',
      '.abddccddba...',
      '..bcdddccb....',
      '...eeeeee.....',
    ]],
  },
  {
    id: 'frost-heave-hummock',
    palette: {
      a: masterPalette.permafrost,
      b: masterPalette.iceDark,
      c: masterPalette.tundraGreen,
      d: masterPalette.snowMid,
    },
    frames: [[
      '..............',
      '.....aa.......',
      '...aabbaa.....',
      '..abbcccbba...',
      '...bccddcb....',
      '....dddddd....',
    ]],
  },
];
