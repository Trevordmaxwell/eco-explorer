import { describe, expect, it } from 'vitest';

import { biomeRegistry } from '../content/biomes';
import {
  FIELD_REQUEST_DEFINITIONS,
  type EvidenceRouteV2FieldRequest,
  type FieldRequestDefinition,
  type FieldRequestWorldStateFocus,
  type RouteV2FieldRequestDefinition,
  type RouteV2ProcessFocus,
} from '../engine/field-request-catalog';
import type { BiomeDefinition } from '../engine/types';

function isRouteV2Definition(definition: FieldRequestDefinition): definition is RouteV2FieldRequestDefinition {
  return 'routeV2Note' in definition;
}

function isEvidenceRouteDefinition(
  definition: RouteV2FieldRequestDefinition,
): definition is EvidenceRouteV2FieldRequest {
  return definition.type === 'assemble-evidence' || definition.type === 'transect-evidence';
}

function getEvidenceSlotIds(definition: RouteV2FieldRequestDefinition): string[] {
  return isEvidenceRouteDefinition(definition)
    ? definition.evidenceSlots.map((slot) => slot.id)
    : [];
}

function getActiveFocuses(
  definition: RouteV2FieldRequestDefinition,
): Array<RouteV2ProcessFocus | FieldRequestWorldStateFocus> {
  return [definition.processFocus, definition.worldStateFocus].filter(
    (focus): focus is RouteV2ProcessFocus | FieldRequestWorldStateFocus => Boolean(focus),
  );
}

const routeDefinitions = FIELD_REQUEST_DEFINITIONS.filter(isRouteV2Definition);
const biomes = biomeRegistry as Record<string, BiomeDefinition>;

describe('field request catalog route authoring guardrails', () => {
  it('keeps route ids unique and notebook-ready copy canonical', () => {
    const routeIds = routeDefinitions.map((definition) => definition.id);
    expect(new Set(routeIds).size).toBe(routeIds.length);

    for (const definition of routeDefinitions) {
      expect(definition.routeV2Note.readyTitle).toBe('NOTEBOOK READY');
      expect(definition.routeV2Note.readyText).toContain(definition.title);
    }
  });

  it('keeps evidence route slot authoring internally consistent', () => {
    for (const definition of routeDefinitions) {
      if (!isEvidenceRouteDefinition(definition)) {
        continue;
      }

      const evidenceSlotIds = getEvidenceSlotIds(definition);
      expect(new Set(evidenceSlotIds).size).toBe(evidenceSlotIds.length);
      expect(definition.routeV2Note.clueBackedTail).toBeTruthy();

      if (!('slotOrder' in definition) || !definition.slotOrder) {
        continue;
      }

      expect(new Set(definition.slotOrder).size).toBe(definition.slotOrder.length);
      expect([...definition.slotOrder].sort()).toEqual([...evidenceSlotIds].sort());
    }
  });

  it('keeps active replay labels out of canonical filed route text', () => {
    for (const definition of routeDefinitions) {
      const canonicalFiledText = definition.routeV2Note.filedText;
      const displayPrefix = definition.routeV2Note.displayPrefix;
      if (displayPrefix) {
        expect(canonicalFiledText).not.toContain(displayPrefix);
      }

      for (const focus of getActiveFocuses(definition)) {
        if (focus.activeTitle) {
          expect(canonicalFiledText).not.toContain(focus.activeTitle);
        }
      }
    }
  });

  it('keeps active alternate clue references on real route slots and biome entries', () => {
    for (const definition of routeDefinitions) {
      const biome = biomes[definition.biomeId];
      expect(biome, `${definition.id} biome ${definition.biomeId}`).toBeTruthy();

      const slotIds = new Set(getEvidenceSlotIds(definition));

      for (const focus of getActiveFocuses(definition)) {
        const alternateEntriesBySlotId = focus.activeSlotEntryIdsBySlotId;
        if (!alternateEntriesBySlotId) {
          continue;
        }

        for (const [slotId, entryIds] of Object.entries(alternateEntriesBySlotId)) {
          expect(slotIds.has(slotId), `${definition.id} alternate slot ${slotId}`).toBe(true);

          for (const entryId of entryIds) {
            expect(entryId in biome.entries, `${definition.id} alternate entry ${entryId}`).toBe(true);
          }
        }
      }
    }
  });
});
