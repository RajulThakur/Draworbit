import {SizeToPx} from '../../helper/sizeToPx';
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
  ctx.font = `${SizeToPx(text.fontSize)}px ${text.fontFamily}`;
  // ctx.font = `24px ${text.fontFamily}'`;
  ctx.fillStyle = ctx.strokeStyle; // Use the same color as other shapes
  ctx.textBaseline = 'middle';
  if (isSelected) {
    drawSelectedHelper(ctx, x, y, width, height);
  }
  ctx.beginPath();
  text.value.split('\n').forEach((line, index) => {
    const lineHeight = SizeToPx(text.fontSize) * 1.2; // Adjust line height as needed
    ctx.fillText(line, x, y + index * lineHeight);
  });
  ctx.closePath();
}
