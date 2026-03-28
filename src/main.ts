import './style.css';
import { createGame } from './engine/game';
import { loadOrCreateSave } from './engine/save';

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('App root not found.');
}

app.innerHTML = `
  <main class="shell">
    <section class="viewport" aria-label="Eco Explorer game viewport">
      <div class="frame">
        <canvas
          id="game-canvas"
          width="192"
          height="144"
          aria-label="Eco Explorer game canvas"
        ></canvas>
      </div>
    </section>
  </main>
`;

const canvas = document.querySelector<HTMLCanvasElement>('#game-canvas');

if (!canvas) {
  throw new Error('Game canvas not found.');
}

createGame(canvas, loadOrCreateSave());
