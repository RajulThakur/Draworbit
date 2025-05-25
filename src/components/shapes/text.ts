import {drawSelectedHelper} from './transform/selectionHelper';

export function drawText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  isSelected: boolean = false,
  width: number,
  height: number
) {
  ctx.font = '16px Arial';
  ctx.fillStyle = ctx.strokeStyle; // Use the same color as other shapes
  ctx.textBaseline = 'top';
  if (isSelected) {
    drawSelectedHelper(ctx, x, y, width, height);
  }
  ctx.fillText(text, x, y);
}
