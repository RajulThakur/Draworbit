import { drawSelectedHelper } from "./transform/selectionHelper";

export function drawSquare(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  height: number,
  width: number,
  isSelected: boolean = false
) {
  if (!ctx) return;

  ctx.beginPath();
  const alignedX = Math.round(x);
  const alignedY = Math.round(y);
  const alignedWidth = Math.round(width);
  const alignedHeight = Math.round(height);
  const side = Math.min(alignedWidth, alignedHeight);

  if (isSelected) {
    drawSelectedHelper(ctx, alignedX, alignedY, side, side);
  }

  // Draw the main square with original stroke color
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.rect(alignedX, alignedY, side, side);
  ctx.stroke();
}
