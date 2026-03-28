export interface SpriteSource {
  id: string;
  palette: Record<string, string>;
  frames: string[][];
}

export interface SpriteFrame {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
}

export type SpriteRegistry = Record<string, SpriteFrame[]>;

function createSpriteCanvas(width: number, height: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

function buildFrame(source: SpriteSource, frame: string[]): SpriteFrame {
  const width = frame[0]?.length ?? 0;
  const height = frame.length;
  const canvas = createSpriteCanvas(width, height);
  const context = canvas.getContext('2d');

  if (!context) {
    throw new Error(`Unable to create sprite context for ${source.id}.`);
  }

  context.imageSmoothingEnabled = false;

  for (let y = 0; y < frame.length; y += 1) {
    const row = frame[y];
    for (let x = 0; x < row.length; x += 1) {
      const key = row[x];
      if (key === '.' || key === ' ') {
        continue;
      }

      const color = source.palette[key];
      if (!color) {
        throw new Error(`Missing palette color "${key}" in sprite ${source.id}.`);
      }

      context.fillStyle = color;
      context.fillRect(x, y, 1, 1);
    }
  }

  return { canvas, width, height };
}

export function createSpriteRegistry(sources: SpriteSource[]): SpriteRegistry {
  return Object.fromEntries(
    sources.map((source) => [source.id, source.frames.map((frame) => buildFrame(source, frame))]),
  );
}

export function drawSprite(
  context: CanvasRenderingContext2D,
  sprites: SpriteRegistry,
  id: string,
  x: number,
  y: number,
  frameIndex = 0,
  flip = false,
): void {
  const frames = sprites[id];
  if (!frames?.length) {
    return;
  }

  const frame = frames[frameIndex % frames.length];
  context.save();
  context.imageSmoothingEnabled = false;

  if (flip) {
    context.scale(-1, 1);
    context.drawImage(frame.canvas, -Math.round(x) - frame.width, Math.round(y));
  } else {
    context.drawImage(frame.canvas, Math.round(x), Math.round(y));
  }

  context.restore();
}
