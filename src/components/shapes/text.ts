import {SizeToPx} from '@/utils/helper/sizeToPx';
import {drawSelectedHelper} from './transform/selectionHelper';
import {Text} from './types';

export function drawText(
  ctx: CanvasRenderingContext2D,
  text: Text,
  x: number,
  y: number,
  isSelected: boolean = false,
  width: number,
  height: number
) {
  ctx.font = `${SizeToPx(text.fontSize)} ${text.fontFamily}'`;
  ctx.fillStyle = ctx.strokeStyle; // Use the same color as other shapes
  ctx.textBaseline = 'top';
  if (isSelected) {
    drawSelectedHelper(ctx, x, y, width, height);
  }
  ctx.beginPath();
  ctx.fillText(text.value, x, y);
}
