import { clamp } from './random';

export interface PointerState {
  x: number;
  y: number;
  inside: boolean;
}

export class InputController {
  private readonly canvas: HTMLCanvasElement;
  private readonly pressed = new Set<string>();
  private readonly justPressed = new Set<string>();
  private readonly pointer: PointerState = { x: 0, y: 0, inside: false };
  private click = false;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
    canvas.addEventListener('pointermove', this.onPointerMove);
    canvas.addEventListener('pointerleave', this.onPointerLeave);
    canvas.addEventListener('pointerdown', this.onPointerDown);
  }

  destroy(): void {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
    this.canvas.removeEventListener('pointermove', this.onPointerMove);
    this.canvas.removeEventListener('pointerleave', this.onPointerLeave);
    this.canvas.removeEventListener('pointerdown', this.onPointerDown);
  }

  isDown(key: string): boolean {
    return this.pressed.has(key);
  }

  consumePressed(key: string): boolean {
    if (!this.justPressed.has(key)) {
      return false;
    }

    this.justPressed.delete(key);
    return true;
  }

  consumeClick(): PointerState | null {
    if (!this.click) {
      return null;
    }

    this.click = false;
    return { ...this.pointer };
  }

  getPointer(): PointerState {
    return { ...this.pointer };
  }

  flushFrame(): void {
    this.justPressed.clear();
    this.click = false;
  }

  private onKeyDown = (event: KeyboardEvent) => {
    if (!this.pressed.has(event.key)) {
      this.justPressed.add(event.key);
    }
    this.pressed.add(event.key);

    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'f'].includes(event.key)) {
      event.preventDefault();
    }
  };

  private onKeyUp = (event: KeyboardEvent) => {
    this.pressed.delete(event.key);
  };

  private updatePointerPosition(event: PointerEvent): void {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;

    this.pointer.x = clamp((event.clientX - rect.left) * scaleX, 0, this.canvas.width);
    this.pointer.y = clamp((event.clientY - rect.top) * scaleY, 0, this.canvas.height);
    this.pointer.inside = true;
  }

  private onPointerMove = (event: PointerEvent) => {
    this.updatePointerPosition(event);
  };

  private onPointerLeave = () => {
    this.pointer.inside = false;
  };

  private onPointerDown = (event: PointerEvent) => {
    this.updatePointerPosition(event);
    this.click = true;
  };
}
