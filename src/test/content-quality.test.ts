import { describe, expect, it } from 'vitest';
import scienceLedgerMarkdown from '../../docs/science-source-ledger.md?raw';

import { beachBiome } from '../content/biomes/beach';
import { coastalScrubBiome } from '../content/biomes/coastal-scrub';
import { forestBiome } from '../content/biomes/forest';
import { treelineBiome } from '../content/biomes/treeline';
import { tundraBiome } from '../content/biomes/tundra';
import { CLOSE_LOOK_ENTRY_IDS } from '../engine/close-look';
import { FIELD_REQUEST_DEFINITIONS } from '../engine/field-requests';
import { getNurseryProjectDefinitions } from '../engine/nursery';
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
const NURSERY_SUMMARY_MAX = 56;
const NURSERY_STAGE_SUMMARY_MAX = 56;
const NURSERY_MEMORY_SUMMARY_MAX = 56;
const NURSERY_REWARD_SUMMARY_MAX = 72;
const NURSERY_UNLOCK_SUMMARY_MAX = 72;
const SCIENCE_LEDGER_MARKERS = ['seep-stone', 'root-curtain', 'woodpecker-cavity'] as const;
const MICROHABITAT_LEDGER_MARKERS = ['old-mans-beard', 'western-hemlock-seedling'] as const;
const CANOPY_CAVERN_LEDGER_MARKERS = ['canopy-moss-bed', 'seep-moss-mat'] as const;
const ALPINE_MICROHABITAT_LEDGER_MARKERS = ['talus-cushion-pocket', 'tussock-thaw-channel'] as const;
const FRONT_HALF_LEDGER_MARKERS = ['beach-pea', 'dune-lupine', 'beach-strawberry', 'beach-hopper', 'kinnikinnick'] as const;
const MIDDLE_COMPARISON_LEDGER_MARKERS = ['bunchberry'] as const;
const TUNDRA_PARITY_LEDGER_MARKERS = ['moss-campion', 'reindeer-lichen', 'white-tailed-ptarmigan', 'frost-heave-hummock'] as const;

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
    expect(OBSERVATION_PROMPT_SEEDS).toHaveLength(20);

    for (const seed of OBSERVATION_PROMPT_SEEDS) {
      expect(seed.text.length).toBeLessThanOrEqual(OBSERVATION_PROMPT_MAX);
      expect(countSentences(seed.text)).toBe(1);
      expect(seed.text.endsWith('?')).toBe(true);
    }
  });

  it('keeps field-request copy within the compact notebook budget', () => {
    expect(FIELD_REQUEST_DEFINITIONS).toHaveLength(15);

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

  it('keeps nursery project copy within the teaching-bed budget', () => {
    for (const definition of getNurseryProjectDefinitions()) {
      expect(definition.summary.length).toBeLessThanOrEqual(NURSERY_SUMMARY_MAX);
      expect(countSentences(definition.summary)).toBe(1);

      for (const stage of definition.growthStages) {
        const stageSummary = definition.stageSummaryByStage[stage];
        expect(stageSummary.length).toBeLessThanOrEqual(NURSERY_STAGE_SUMMARY_MAX);
        expect(countSentences(stageSummary)).toBe(1);
      }

      expect(definition.rewardSummary.length).toBeLessThanOrEqual(NURSERY_REWARD_SUMMARY_MAX);
      expect(countSentences(definition.rewardSummary)).toBe(1);

      if (definition.memorySummary) {
        expect(definition.memorySummary.length).toBeLessThanOrEqual(NURSERY_MEMORY_SUMMARY_MAX);
        expect(countSentences(definition.memorySummary)).toBe(1);
      }

      if (definition.unlockSummary) {
        expect(definition.unlockSummary.length).toBeLessThanOrEqual(NURSERY_UNLOCK_SUMMARY_MAX);
        expect(countSentences(definition.unlockSummary)).toBe(1);
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

  it('keeps the active microhabitat additions backed by the science source ledger', () => {
    for (const entryId of MICROHABITAT_LEDGER_MARKERS) {
      expect(scienceLedgerMarkdown).toContain(`| \`${entryId}\` |`);
    }
  });

  it('keeps the canopy-and-cavern habitat additions backed by the science source ledger', () => {
    for (const entryId of CANOPY_CAVERN_LEDGER_MARKERS) {
      expect(scienceLedgerMarkdown).toContain(`| \`${entryId}\` |`);
    }
  });

  it('keeps the alpine microhabitat additions backed by the science source ledger', () => {
    for (const entryId of ALPINE_MICROHABITAT_LEDGER_MARKERS) {
      expect(scienceLedgerMarkdown).toContain(`| \`${entryId}\` |`);
    }
  });

  it('keeps the front-half richness additions backed by the science source ledger', () => {
    for (const entryId of FRONT_HALF_LEDGER_MARKERS) {
      expect(scienceLedgerMarkdown).toContain(`| \`${entryId}\` |`);
    }
  });

  it('keeps the middle comparison bridge backed by the science source ledger', () => {
    for (const entryId of MIDDLE_COMPARISON_LEDGER_MARKERS) {
      expect(scienceLedgerMarkdown).toContain(`| \`${entryId}\` |`);
    }
  });

  it('keeps the tundra parity additions backed by the science source ledger', () => {
    for (const entryId of TUNDRA_PARITY_LEDGER_MARKERS) {
      expect(scienceLedgerMarkdown).toContain(`| \`${entryId}\` |`);
    }
  });
});
