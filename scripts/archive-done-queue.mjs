/**
 * Moves completed (Done) queue items from .agents/work-queue.md into
 * .agents/done-archive.md, keeping only the N most recent Done items
 * inline for quick reference.
 *
 * Usage:
 *   node scripts/archive-done-queue.mjs [--keep N]
 *
 * Defaults to keeping the 20 most recent Done items in work-queue.md.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const queuePath = path.join(rootDir, '.agents', 'work-queue.md');
const archivePath = path.join(rootDir, '.agents', 'done-archive.md');

const DEFAULT_KEEP = 20;

function parseArgs() {
  const args = process.argv.slice(2);
  let keep = DEFAULT_KEEP;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--keep' && args[i + 1]) {
      keep = parseInt(args[i + 1], 10);
      if (!Number.isFinite(keep) || keep < 0) {
        console.error(`Invalid --keep value: ${args[i + 1]}`);
        process.exit(1);
      }
    }
  }

  return { keep };
}

function splitQueueSections(text) {
  const lines = text.split('\n');
  const sections = [];
  let current = { header: '', lines: [] };

  for (const line of lines) {
    const sectionMatch = line.match(/^## (.+?)\s*$/);
    if (sectionMatch) {
      if (current.header || current.lines.length > 0) {
        sections.push(current);
      }
      current = { header: sectionMatch[1], lines: [line] };
    } else {
      current.lines.push(line);
    }
  }

  if (current.header || current.lines.length > 0) {
    sections.push(current);
  }

  return sections;
}

function extractDoneItems(doneLines) {
  const items = [];
  let current = null;

  for (const line of doneLines) {
    const itemMatch = line.match(/^### (ECO-[A-Za-z0-9-]+)\s*$/);
    if (itemMatch) {
      if (current) items.push(current);
      current = { id: itemMatch[1], lines: [line] };
    } else if (current) {
      current.lines.push(line);
    }
  }

  if (current) items.push(current);
  return items;
}

function main() {
  const { keep } = parseArgs();

  if (!fs.existsSync(queuePath)) {
    console.error(`Queue file not found: ${queuePath}`);
    process.exit(1);
  }

  const queueText = fs.readFileSync(queuePath, 'utf8');
  const sections = splitQueueSections(queueText);

  const doneIndex = sections.findIndex((s) => s.header === 'Done');
  if (doneIndex === -1) {
    console.log('No Done section found. Nothing to archive.');
    return;
  }

  const doneSection = sections[doneIndex];
  const doneItems = extractDoneItems(doneSection.lines.slice(1)); // skip the ## Done line

  if (doneItems.length <= keep) {
    console.log(`Only ${doneItems.length} Done items found (keep=${keep}). Nothing to archive.`);
    return;
  }

  // Items to archive (oldest first — they appear first in the file)
  const toArchive = doneItems.slice(0, doneItems.length - keep);
  const toKeep = doneItems.slice(doneItems.length - keep);

  // Build archive content
  const archiveBlock = toArchive.map((item) => item.lines.join('\n')).join('\n\n');
  const timestamp = new Date().toISOString().slice(0, 10);

  let existingArchive = '';
  if (fs.existsSync(archivePath)) {
    existingArchive = fs.readFileSync(archivePath, 'utf8');
  }

  const archiveHeader = existingArchive
    ? ''
    : '# Done Archive\n\nCompleted work-queue items moved here to keep the active queue scannable.\n\n';

  const newArchiveEntry = `## Archived ${timestamp}\n\n${archiveBlock}\n\n`;

  fs.writeFileSync(archivePath, archiveHeader + existingArchive.replace(/^# Done Archive\n\n[^\n]*\n\n/, '') + newArchiveEntry);

  // Rebuild the Done section with only kept items
  const newDoneLines = ['## Done', ''];
  if (toKeep.length > 0) {
    newDoneLines.push(toKeep.map((item) => item.lines.join('\n')).join('\n\n'));
  }

  sections[doneIndex] = { header: 'Done', lines: newDoneLines };

  // Rebuild queue file
  const newQueue = sections.map((s) => s.lines.join('\n')).join('\n');
  fs.writeFileSync(queuePath, newQueue);

  console.log(`Archived ${toArchive.length} Done items to ${path.relative(rootDir, archivePath)}.`);
  console.log(`Kept ${toKeep.length} most recent Done items in the queue.`);

  const beforeSize = Buffer.byteLength(queueText, 'utf8');
  const afterSize = Buffer.byteLength(newQueue, 'utf8');
  const saved = beforeSize - afterSize;
  console.log(`Queue reduced from ${(beforeSize / 1024).toFixed(1)}KB to ${(afterSize / 1024).toFixed(1)}KB (saved ${(saved / 1024).toFixed(1)}KB).`);
}

main();
