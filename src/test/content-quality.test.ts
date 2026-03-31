import { describe, expect, it } from 'vitest';
import scienceLedgerMarkdown from '../../docs/science-source-ledger.md?raw';

import { beachBiome } from '../content/biomes/beach';
import { coastalScrubBiome } from '../content/biomes/coastal-scrub';
import { forestBiome } from '../content/biomes/forest';
import { treelineBiome } from '../content/biomes/treeline';
import { tundraBiome } from '../content/biomes/tundra';
import { CLOSE_LOOK_ENTRY_IDS } from '../engine/close-look';
import { FIELD_REQUEST_DEFINITIONS } from '../engine/field-requests';
import { OBSERVATION_PROMPT_SEEDS } from '../engine/observation-prompts';

const authoredBiomes = [beachBiome, coastalScrubBiome, forestBiome, treelineBiome, tundraBiome];

const SHORT_FACT_MAX = 100;
const NOTE_TITLE_MAX = 20;
const NOTE_SUMMARY_MAX = 110;
const NOTE_PROMPT_MAX = 52;
const OBSERVATION_PROMPT_MAX = 60;
const FIELD_REQUEST_TITLE_MAX = 18;
const FIELD_REQUEST_SUMMARY_MAX = 96;
const SKETCHBOOK_NOTE_MAX = 56;
const SCIENCE_LEDGER_MARKERS = ['seep-stone', 'root-curtain', 'woodpecker-cavity'] as const;

function countSentences(text: string): number {
  return text
    .split(/[.!?]+/)
    .map((chunk) => chunk.trim())
    .filter(Boolean).length;
}

describe('content quality guardrails', () => {
  it('keeps short facts within the one-sentence reading budget', () => {
    for (const biome of authoredBiomes) {
      for (const entry of Object.values(biome.entries)) {
        expect(entry.shortFact.length).toBeLessThanOrEqual(SHORT_FACT_MAX);
        expect(countSentences(entry.shortFact)).toBe(1);
      }
    }
  });

  it('keeps ecosystem-note copy within the journal layout budget', () => {
    for (const biome of authoredBiomes) {
      for (const note of biome.ecosystemNotes) {
        expect(note.title.length).toBeLessThanOrEqual(NOTE_TITLE_MAX);
        expect(note.summary.length).toBeLessThanOrEqual(NOTE_SUMMARY_MAX);
        expect(note.observationPrompt.length).toBeLessThanOrEqual(NOTE_PROMPT_MAX);
        expect(note.observationPrompt.endsWith('?')).toBe(true);
      }
    }
  });

  it('keeps authored notebook prompts within the compact journal budget', () => {
    expect(OBSERVATION_PROMPT_SEEDS).toHaveLength(18);

    for (const seed of OBSERVATION_PROMPT_SEEDS) {
      expect(seed.text.length).toBeLessThanOrEqual(OBSERVATION_PROMPT_MAX);
      expect(countSentences(seed.text)).toBe(1);
      expect(seed.text.endsWith('?')).toBe(true);
    }
  });

  it('keeps field-request copy within the compact notebook budget', () => {
    expect(FIELD_REQUEST_DEFINITIONS).toHaveLength(13);

    for (const request of FIELD_REQUEST_DEFINITIONS) {
      expect(request.title.length).toBeLessThanOrEqual(FIELD_REQUEST_TITLE_MAX);
      expect(request.summary.length).toBeLessThanOrEqual(FIELD_REQUEST_SUMMARY_MAX);
      expect(countSentences(request.summary)).toBe(1);
    }
  });

  it('keeps authored sketchbook notes within the compact source-strip budget', () => {
    for (const biome of authoredBiomes) {
      for (const entry of Object.values(biome.entries)) {
        if (!entry.sketchbookNote) {
          continue;
        }

        expect(entry.sketchbookNote.length).toBeLessThanOrEqual(SKETCHBOOK_NOTE_MAX);
        expect(countSentences(entry.sketchbookNote)).toBe(1);
      }
    }
  });

  it('keeps landmark metadata separate from organism scientific names', () => {
    for (const biome of authoredBiomes) {
      for (const entry of Object.values(biome.entries)) {
        if (entry.category === 'landmark') {
          expect('scientificName' in entry).toBe(false);
          continue;
        }

        expect(entry.scientificName.length).toBeGreaterThan(0);
      }
    }
  });

  it('links ecosystem notes only to real local entries and zones', () => {
    for (const biome of authoredBiomes) {
      const entryIds = new Set(Object.keys(biome.entries));
      const zoneIds = new Set(biome.terrainRules.zones.map((zone) => zone.id));

      for (const note of biome.ecosystemNotes) {
        expect(note.entryIds.length).toBeGreaterThanOrEqual(2);
        expect(new Set(note.entryIds).size).toBe(note.entryIds.length);

        for (const entryId of note.entryIds) {
          expect(entryIds.has(entryId)).toBe(true);
        }

        if (note.zoneId) {
          expect(zoneIds.has(note.zoneId)).toBe(true);
        }

        if (note.minimumDiscoveries !== undefined) {
          expect(note.minimumDiscoveries).toBeGreaterThanOrEqual(1);
          expect(note.minimumDiscoveries).toBeLessThanOrEqual(note.entryIds.length);
        }
      }
    }
  });

  it('keeps the close-look allowlist backed by the science source ledger', () => {
    for (const entryId of CLOSE_LOOK_ENTRY_IDS) {
      expect(scienceLedgerMarkdown).toContain(`| \`${entryId}\` |`);
    }
  });

  it('keeps recent landmark teaching anchors backed by the science source ledger', () => {
    for (const entryId of SCIENCE_LEDGER_MARKERS) {
      expect(scienceLedgerMarkdown).toContain(`| \`${entryId}\` |`);
    }
  });
});
