import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const verifyRoot = path.join(rootDir, '.tmp', 'review-drop-verify');

const requiredPaths = [
  'AGENTS.md',
  'README.md',
  'index.html',
  'package.json',
  'package-lock.json',
  'tsconfig.json',
  'vitest.config.ts',
  'progress.md',
  '.agents/work-queue.md',
  '.agents/packets/130-alpha-runway-setup-and-review-hygiene.json',
  'docs/review-drop-checklist.md',
  'docs/science-source-ledger.md',
  'docs/reports/2026-04-20-alpha-runway-megapush.md',
  'scripts/create-review-drop.mjs',
  'scripts/run-alpha-rc.mjs',
  'scripts/verify-review-drop.mjs',
  'src/main.ts',
  'src/test/content-quality.test.ts',
];

const forbiddenNames = new Set([
  '.DS_Store',
  '.git',
  '.tmp',
  '__MACOSX',
  'dist',
  'dist-ssr',
  'node_modules',
  'output',
  'test-results',
  'work-queue.additions-130-157.md',
]);

function fail(message) {
  console.error(`review:verify failed: ${message}`);
  process.exit(1);
}

function run(command, args, cwd) {
  console.log(`\n$ ${[command, ...args].join(' ')}`);
  execFileSync(command, args, {
    cwd,
    stdio: 'inherit',
  });
}

function findForbiddenPaths(startPath) {
  const found = [];

  function visit(currentPath) {
    const name = path.basename(currentPath);

    if (name.startsWith('._')) {
      found.push(path.relative(startPath, currentPath) || name);
      return;
    }

    if (forbiddenNames.has(name)) {
      found.push(path.relative(startPath, currentPath) || name);
      return;
    }

    const stats = fs.lstatSync(currentPath);

    if (!stats.isDirectory()) {
      return;
    }

    for (const childName of fs.readdirSync(currentPath)) {
      visit(path.join(currentPath, childName));
    }
  }

  visit(startPath);
  return found;
}

const archiveArg = process.argv[2];

if (!archiveArg) {
  fail('usage: npm run review:verify -- <archive.tgz>');
}

const archivePath = path.resolve(rootDir, archiveArg);

if (!fs.existsSync(archivePath)) {
  fail(`archive does not exist: ${archiveArg}`);
}

fs.rmSync(verifyRoot, { recursive: true, force: true });
fs.mkdirSync(verifyRoot, { recursive: true });

execFileSync('tar', ['-xzf', archivePath, '-C', verifyRoot], {
  stdio: 'inherit',
});

const extractedRoots = fs
  .readdirSync(verifyRoot)
  .map((name) => path.join(verifyRoot, name))
  .filter((entryPath) => fs.lstatSync(entryPath).isDirectory());

if (extractedRoots.length !== 1) {
  fail(`expected one extracted root, found ${extractedRoots.length}`);
}

const extractedRoot = extractedRoots[0];

for (const requiredPath of requiredPaths) {
  if (!fs.existsSync(path.join(extractedRoot, requiredPath))) {
    fail(`archive is missing required path: ${requiredPath}`);
  }
}

const forbiddenPaths = findForbiddenPaths(extractedRoot);

if (forbiddenPaths.length > 0) {
  fail(`archive contains forbidden paths before install/build: ${forbiddenPaths.join(', ')}`);
}

run('npm', ['ci'], extractedRoot);
run('npm', ['run', 'validate:agents'], extractedRoot);
run('npm', ['run', 'science:check'], extractedRoot);
run('npm', ['test'], extractedRoot);
run('npm', ['run', 'build'], extractedRoot);

console.log(`\nreview:verify passed for ${path.relative(rootDir, archivePath)}`);
console.log(`Extracted workspace kept at ${path.relative(rootDir, extractedRoot)}`);
