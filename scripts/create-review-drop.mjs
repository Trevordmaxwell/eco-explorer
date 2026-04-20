import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const archiveRootName = 'eco-explorer-review-drop';
const outputDir = path.join(rootDir, 'output', 'review-drops');
const stageParent = path.join(rootDir, '.tmp', `review-drop-pack-${process.pid}-${Date.now()}`);
const stageRoot = path.join(stageParent, archiveRootName);

const includeRootFiles = [
  'AGENTS.md',
  'README.md',
  'index.html',
  'package.json',
  'package-lock.json',
  'tsconfig.json',
  'vitest.config.ts',
  'progress.md',
  '.gitignore',
];

const includeRootDirs = [
  '.agents',
  'docs',
  'public',
  'scripts',
  'src',
];

const excludedNames = new Set([
  '.DS_Store',
  '.git',
  '.tmp',
  '.vscode',
  '.idea',
  'dist',
  'dist-ssr',
  'node_modules',
  'output',
  'test-results',
  'work-queue.additions-130-157.md',
]);

function formatTimestamp(date) {
  const pad = (value) => String(value).padStart(2, '0');

  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate()),
    '-',
    pad(date.getHours()),
    pad(date.getMinutes()),
    pad(date.getSeconds()),
  ].join('');
}

function fail(message) {
  console.error(`review:pack failed: ${message}`);
  process.exit(1);
}

function shouldCopy(sourcePath) {
  const name = path.basename(sourcePath);

  if (excludedNames.has(name)) {
    return false;
  }

  if (name.endsWith('.tgz') && sourcePath.includes(`${path.sep}review-drops${path.sep}`)) {
    return false;
  }

  return true;
}

function copyPath(relativePath) {
  const sourcePath = path.join(rootDir, relativePath);
  const destinationPath = path.join(stageRoot, relativePath);

  if (!fs.existsSync(sourcePath)) {
    fail(`required path is missing: ${relativePath}`);
  }

  fs.cpSync(sourcePath, destinationPath, {
    dereference: false,
    errorOnExist: false,
    filter: shouldCopy,
    force: true,
    preserveTimestamps: true,
    recursive: true,
  });
}

fs.rmSync(stageParent, { recursive: true, force: true });
fs.mkdirSync(stageRoot, { recursive: true });
fs.mkdirSync(outputDir, { recursive: true });

for (const filePath of includeRootFiles) {
  copyPath(filePath);
}

for (const directoryPath of includeRootDirs) {
  copyPath(directoryPath);
}

const archiveName = `${archiveRootName}-${formatTimestamp(new Date())}.tgz`;
const archivePath = path.join(outputDir, archiveName);

execFileSync('tar', ['-czf', archivePath, '-C', stageParent, archiveRootName], {
  stdio: 'inherit',
});

fs.rmSync(stageParent, { recursive: true, force: true });

console.log(path.relative(rootDir, archivePath));
