export interface SeededRandom {
  next: () => number;
  nextRange: (min: number, max: number) => number;
  nextInt: (min: number, max: number) => number;
  pickWeighted: <T>(items: Array<{ weight: number; value: T }>) => T;
}

function hashString(input: string): number {
  let hash = 2166136261;

  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function mulberry32(seed: number): () => number {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let t = value;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function createSeededRandom(seedSource: string): SeededRandom {
  const nextFloat = mulberry32(hashString(seedSource));

  return {
    next: () => nextFloat(),
    nextRange: (min, max) => min + (max - min) * nextFloat(),
    nextInt: (min, max) => Math.floor(min + (max - min + 1) * nextFloat()),
    pickWeighted: (items) => {
      const total = items.reduce((sum, item) => sum + item.weight, 0);
      let cursor = nextFloat() * total;

      for (const item of items) {
        cursor -= item.weight;
        if (cursor <= 0) {
          return item.value;
        }
      }

      return items[items.length - 1].value;
    },
  };
}

export function createRandomSeed(): string {
  const raw = `${Date.now()}-${Math.random()}`;
  return hashString(raw).toString(36);
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function lerp(start: number, end: number, amount: number): number {
  return start + (end - start) * amount;
}
