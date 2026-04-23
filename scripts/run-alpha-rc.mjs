import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function fail(message) {
  console.error(`alpha:rc failed: ${message}`);
  process.exit(1);
}

function run(command, args) {
  console.log(`\n$ ${[command, ...args].join(' ')}`);
  execFileSync(command, args, {
    cwd: rootDir,
    stdio: 'inherit',
  });
}

run('npm', ['run', 'validate:agents']);
run('npm', ['run', 'science:check']);
run('npm', ['test']);
run('npm', ['run', 'build']);

console.log('\n$ npm run review:pack');
const packOutput = execFileSync('npm', ['run', 'review:pack'], {
  cwd: rootDir,
  encoding: 'utf8',
  stdio: ['inherit', 'pipe', 'inherit'],
});
process.stdout.write(packOutput);

const archivePath = packOutput
  .trim()
  .split('\n')
  .map((line) => line.trim())
  .filter(Boolean)
  .at(-1);

if (!archivePath || !archivePath.endsWith('.tgz')) {
  fail('review:pack did not print a review-drop archive path');
}

run('npm', ['run', 'review:verify', '--', archivePath]);

console.log(`\nalpha:rc passed with ${archivePath}`);
