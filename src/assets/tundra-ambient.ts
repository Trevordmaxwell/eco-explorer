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
];
