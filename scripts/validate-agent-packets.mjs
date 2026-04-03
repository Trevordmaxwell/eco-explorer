import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const packetsDir = path.join(rootDir, '.agents', 'packets');
const queuePath = path.join(rootDir, '.agents', 'work-queue.md');

const allowedPacketStatuses = new Set(['READY', 'SUPERSEDED', 'DONE']);
const allowedQueueStatuses = new Set(['READY', 'IN PROGRESS', 'BLOCKED', 'BLOCKED-BY-IMPLEMENTATION', 'PARKED', 'DONE']);
const allowedQueueOwners = new Set(['main-agent', 'scout-agent', 'critic-agent']);
const sectionStatusMap = new Map([
  ['Ready', new Set(['READY', 'IN PROGRESS'])],
  ['Blocked', new Set(['BLOCKED', 'BLOCKED-BY-IMPLEMENTATION'])],
  ['Parked', new Set(['PARKED'])],
  ['Done', new Set(['DONE'])],
]);
const requiredPacketFields = [
  'packet_id',
  'version',
  'created_at',
  'created_by_role',
  'status',
  'title',
  'summary',
  'queue_refs',
  'execution_order',
  'guardrails',
];

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function findDuplicates(values) {
  const seen = new Set();
  const duplicates = new Set();

  for (const value of values) {
    if (seen.has(value)) {
      duplicates.add(value);
      continue;
    }

    seen.add(value);
  }

  return [...duplicates];
}

function pushError(errors, scope, message) {
  errors.push(`${scope}: ${message}`);
}

function getQueueIndex() {
  const queueText = fs.readFileSync(queuePath, 'utf8');
  const queueIds = [...queueText.matchAll(/^###\s+(ECO-[A-Za-z0-9-]+)\s*$/gm)].map((match) => match[1]);
  const queuePacketRefs = new Map();
  const queueEntries = [];

  let currentSection = null;
  let currentEntry = null;

  for (const line of queueText.split('\n')) {
    const sectionMatch = line.match(/^##\s+(.+?)\s*$/);
    if (sectionMatch) {
      if (currentEntry) {
        queueEntries.push(currentEntry);
        currentEntry = null;
      }
      currentSection = sectionMatch[1];
      continue;
    }

    const queueMatch = line.match(/^###\s+(ECO-[A-Za-z0-9-]+)\s*$/);
    if (queueMatch) {
      if (currentEntry) {
        queueEntries.push(currentEntry);
      }
      currentEntry = {
        queueId: queueMatch[1],
        section: currentSection,
        lines: [line],
      };
      continue;
    }

    if (currentEntry) {
      currentEntry.lines.push(line);
    }
  }

  if (currentEntry) {
    queueEntries.push(currentEntry);
  }

  for (const block of queueText.split(/^###\s+/m).slice(1)) {
    const [queueIdLine] = block.split('\n');
    const queueId = queueIdLine.trim();
    const packetMatch = block.match(/^- Packet: `([^`]+)`/m);

    if (packetMatch) {
      queuePacketRefs.set(queueId, packetMatch[1]);
    }
  }

  return {
    queueIds,
    queueIdSet: new Set(queueIds),
    duplicateQueueIds: findDuplicates(queueIds),
    queuePacketRefs,
    queueEntries,
  };
}

function validateQueueEntries(queueEntries, errors) {
  for (const entry of queueEntries) {
    const blockText = entry.lines.join('\n');
    const scope = `work-queue ${entry.queueId}`;
    const statusMatch = blockText.match(/^- Status: `([^`]+)`/m);
    const ownerMatch = blockText.match(/^- Owner: `([^`]+)`/m);
    const priorityMatch = blockText.match(/^- Priority: `([^`]+)`/m);
    const titleMatch = blockText.match(/^- Title: `([^`]+)`/m);

    if (!statusMatch) {
      pushError(errors, scope, 'is missing a `- Status:` line.');
    } else if (!allowedQueueStatuses.has(statusMatch[1])) {
      pushError(errors, scope, `uses unknown status "${statusMatch[1]}".`);
    } else {
      const allowedStatusesForSection = entry.section ? sectionStatusMap.get(entry.section) : null;
      if (allowedStatusesForSection && !allowedStatusesForSection.has(statusMatch[1])) {
        pushError(
          errors,
          scope,
          `has status "${statusMatch[1]}", which does not belong in the "${entry.section}" section.`,
        );
      }
    }

    if (!ownerMatch) {
      pushError(errors, scope, 'is missing a `- Owner:` line.');
    } else if (!allowedQueueOwners.has(ownerMatch[1])) {
      pushError(errors, scope, `uses unknown owner "${ownerMatch[1]}".`);
    }

    if (!priorityMatch) {
      pushError(errors, scope, 'is missing a `- Priority:` line.');
    } else if (!/^P\d+$/.test(priorityMatch[1])) {
      pushError(errors, scope, `uses invalid priority "${priorityMatch[1]}".`);
    }

    if (!titleMatch || !isNonEmptyString(titleMatch[1])) {
      pushError(errors, scope, 'is missing a non-empty `- Title:` line.');
    }
  }
}

function validateStringArray(packet, fieldName, packetLabel, errors) {
  const value = packet[fieldName];

  if (!Array.isArray(value) || value.length === 0) {
    pushError(errors, packetLabel, `"${fieldName}" must be a non-empty array.`);
    return [];
  }

  if (!value.every(isNonEmptyString)) {
    pushError(errors, packetLabel, `"${fieldName}" must contain only non-empty strings.`);
    return [];
  }

  return value;
}

function validateOptionalStringArray(packet, fieldName, packetLabel, errors) {
  const value = packet[fieldName];

  if (value === undefined) {
    return [];
  }

  if (!Array.isArray(value) || !value.every(isNonEmptyString)) {
    pushError(errors, packetLabel, `"${fieldName}" must contain only non-empty strings when present.`);
    return [];
  }

  return value;
}

function validatePathExists(relativePath, scope, errors) {
  const absolutePath = path.join(rootDir, relativePath);

  if (!fs.existsSync(absolutePath)) {
    pushError(errors, scope, `references missing path "${relativePath}".`);
  }
}

function validatePacketShape(packet, packetLabel, errors) {
  for (const fieldName of requiredPacketFields) {
    if (!(fieldName in packet)) {
      pushError(errors, packetLabel, `is missing required field "${fieldName}".`);
    }
  }

  if (!isNonEmptyString(packet.packet_id)) {
    pushError(errors, packetLabel, '"packet_id" must be a non-empty string.');
  }

  if (!Number.isInteger(packet.version) || packet.version < 1) {
    pushError(errors, packetLabel, '"version" must be a positive integer.');
  }

  for (const fieldName of ['created_at', 'created_by_role', 'title', 'summary']) {
    if (!isNonEmptyString(packet[fieldName])) {
      pushError(errors, packetLabel, `"${fieldName}" must be a non-empty string.`);
    }
  }

  if (!allowedPacketStatuses.has(packet.status)) {
    pushError(errors, packetLabel, `"status" must be one of ${[...allowedPacketStatuses].join(', ')}.`);
  }

  if (!('file_targets' in packet) && !('implementation_targets' in packet)) {
    pushError(errors, packetLabel, 'must include "file_targets" or legacy "implementation_targets".');
  }
}

function validateExecutionOrder(packet, packetLabel, queueIdSet, errors) {
  if (!Array.isArray(packet.execution_order) || packet.execution_order.length === 0) {
    pushError(errors, packetLabel, '"execution_order" must be a non-empty array.');
    return;
  }

  const seenSteps = [];

  for (const [index, item] of packet.execution_order.entries()) {
    const scope = `${packetLabel} execution_order[${index}]`;

    if (typeof item !== 'object' || item === null) {
      pushError(errors, scope, 'must be an object.');
      continue;
    }

    if (!Number.isInteger(item.step) || item.step < 1) {
      pushError(errors, scope, '"step" must be a positive integer.');
    } else {
      seenSteps.push(item.step);
    }

    if ('queue_id' in item && item.queue_id !== undefined && !isNonEmptyString(item.queue_id)) {
      pushError(errors, scope, '"queue_id" must be a non-empty string when present.');
    } else if (isNonEmptyString(item.queue_id) && !queueIdSet.has(item.queue_id)) {
      pushError(errors, scope, `references unknown queue id "${item.queue_id}".`);
    }

    for (const fieldName of ['goal', 'why_now']) {
      if (!isNonEmptyString(item[fieldName])) {
        pushError(errors, scope, `"${fieldName}" must be a non-empty string.`);
      }
    }
  }

  const expectedSteps = Array.from({ length: packet.execution_order.length }, (_, index) => index + 1);
  const normalizedSteps = [...seenSteps].sort((left, right) => left - right);

  if (JSON.stringify(normalizedSteps) !== JSON.stringify(expectedSteps)) {
    pushError(errors, packetLabel, '"execution_order" steps must form a contiguous sequence starting at 1.');
  }
}

const QUEUE_SIZE_WARN_KB = 200;
const QUEUE_SIZE_ERROR_KB = 500;

function validateQueueHealth(queueEntries, errors, warnings) {
  const queueSizeBytes = fs.statSync(queuePath).size;
  const queueSizeKb = queueSizeBytes / 1024;

  if (queueSizeKb > QUEUE_SIZE_ERROR_KB) {
    pushError(
      errors,
      'work-queue',
      `file is ${queueSizeKb.toFixed(0)}KB (>${QUEUE_SIZE_ERROR_KB}KB). Run "node scripts/archive-done-queue.mjs" to move completed items to the archive.`,
    );
  } else if (queueSizeKb > QUEUE_SIZE_WARN_KB) {
    warnings.push(
      `work-queue: file is ${queueSizeKb.toFixed(0)}KB (>${QUEUE_SIZE_WARN_KB}KB). Consider running "node scripts/archive-done-queue.mjs" soon.`,
    );
  }

  // Check for items with mismatched Lane fields across linked packets
  const laneCounts = new Map();
  for (const entry of queueEntries) {
    const blockText = entry.lines.join('\n');
    const laneMatch = blockText.match(/^- Lane: `([^`]+)`/m);
    if (laneMatch && entry.section !== 'Done') {
      const lane = laneMatch[1];
      laneCounts.set(lane, (laneCounts.get(lane) || 0) + 1);
    }
  }

  // Count active (non-Done) items per section
  const sectionCounts = new Map();
  for (const entry of queueEntries) {
    if (entry.section && entry.section !== 'Done') {
      sectionCounts.set(entry.section, (sectionCounts.get(entry.section) || 0) + 1);
    }
  }

  const readyCount = sectionCounts.get('Ready') || 0;
  if (readyCount > 40) {
    warnings.push(
      `work-queue: ${readyCount} items in Ready section. Consider prioritizing or parking lower-priority items.`,
    );
  }
}

function main() {
  const errors = [];
  const warnings = [];
  const queueIndex = getQueueIndex();
  const packetFiles = fs
    .readdirSync(packetsDir)
    .filter((fileName) => fileName.endsWith('.json'))
    .sort((left, right) => left.localeCompare(right));
  const packetIds = [];
  const packetQueueRefs = new Map();

  if (queueIndex.duplicateQueueIds.length > 0) {
    pushError(errors, 'work-queue', `contains duplicate queue ids: ${queueIndex.duplicateQueueIds.join(', ')}.`);
  }

  validateQueueEntries(queueIndex.queueEntries, errors);
  validateQueueHealth(queueIndex.queueEntries, errors, warnings);

  for (const [queueId, packetPath] of queueIndex.queuePacketRefs.entries()) {
    validatePathExists(packetPath, `work-queue ${queueId}`, errors);
  }

  for (const fileName of packetFiles) {
    const packetPath = path.join(packetsDir, fileName);
    const packetLabel = `.agents/packets/${fileName}`;

    if (!/^\d{3}-[a-z0-9-]+\.json$/.test(fileName)) {
      pushError(errors, packetLabel, 'filename must match NNN-short-slug.json.');
    }

    let packet;
    try {
      packet = JSON.parse(fs.readFileSync(packetPath, 'utf8'));
    } catch (error) {
      pushError(errors, packetLabel, `failed to parse JSON: ${error instanceof Error ? error.message : String(error)}.`);
      continue;
    }

    if (typeof packet !== 'object' || packet === null || Array.isArray(packet)) {
      pushError(errors, packetLabel, 'must contain a top-level JSON object.');
      continue;
    }

    validatePacketShape(packet, packetLabel, errors);
    validateExecutionOrder(packet, packetLabel, queueIndex.queueIdSet, errors);

    const queueRefs = validateStringArray(packet, 'queue_refs', packetLabel, errors);
    const guardrails = validateStringArray(packet, 'guardrails', packetLabel, errors);
    const fileTargets =
      packet.file_targets !== undefined
        ? validateStringArray(packet, 'file_targets', packetLabel, errors)
        : validateStringArray(packet, 'implementation_targets', packetLabel, errors);
    const sourceReports = validateOptionalStringArray(packet, 'source_reports', packetLabel, errors);
    const dependsOn = validateOptionalStringArray(packet, 'depends_on', packetLabel, errors);

    if (queueRefs.length > 0) {
      const duplicateQueueRefs = findDuplicates(queueRefs);

      if (duplicateQueueRefs.length > 0) {
        pushError(errors, packetLabel, `"queue_refs" contains duplicates: ${duplicateQueueRefs.join(', ')}.`);
      }

      for (const queueId of queueRefs) {
        if (!queueIndex.queueIdSet.has(queueId)) {
          pushError(errors, packetLabel, `references unknown queue id "${queueId}" in "queue_refs".`);
        }
      }
    }

    if (guardrails.length === 0) {
      pushError(errors, packetLabel, '"guardrails" must include at least one rule.');
    }

    for (const targetPath of [...fileTargets, ...sourceReports]) {
      validatePathExists(targetPath, packetLabel, errors);
    }

    for (const queueId of dependsOn) {
      if (!queueIndex.queueIdSet.has(queueId)) {
        pushError(errors, packetLabel, `references unknown queue id "${queueId}" in "depends_on".`);
      }
    }

    for (const item of Array.isArray(packet.execution_order) ? packet.execution_order : []) {
      if (isNonEmptyString(item?.queue_id) && Array.isArray(packet.queue_refs) && !packet.queue_refs.includes(item.queue_id)) {
        pushError(errors, packetLabel, `execution step queue id "${item.queue_id}" is missing from "queue_refs".`);
      }
    }

    if (isNonEmptyString(packet.packet_id)) {
      packetIds.push(packet.packet_id);
    }

    packetQueueRefs.set(`.agents/packets/${fileName}`, new Set(queueRefs));
  }

  const duplicatePacketIds = findDuplicates(packetIds);

  if (duplicatePacketIds.length > 0) {
    pushError(errors, 'packets', `contain duplicate packet ids: ${duplicatePacketIds.join(', ')}.`);
  }

  for (const [queueId, packetPath] of queueIndex.queuePacketRefs.entries()) {
    const queueRefs = packetQueueRefs.get(packetPath);

    if (queueRefs && !queueRefs.has(queueId)) {
      pushError(
        errors,
        `work-queue ${queueId}`,
        `references ${packetPath}, but that packet does not include the queue id in "queue_refs".`,
      );
    }
  }

  if (errors.length > 0) {
    console.error(`Agent packet validation failed with ${errors.length} issue(s):`);
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exitCode = 1;
    return;
  }

  if (warnings.length > 0) {
    console.warn(`Validated with ${warnings.length} warning(s):`);
    for (const warning of warnings) {
      console.warn(`⚠ ${warning}`);
    }
  }

  console.log(`Validated ${packetFiles.length} packet files against ${queueIndex.queueIds.length} queue items with no errors.`);
}

main();
