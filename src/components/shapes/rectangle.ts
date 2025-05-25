import { drawSelectedHelper } from "./transform/selectionHelper";

export function drawRectangle(
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
  if (isSelected) {
    drawSelectedHelper(ctx, alignedX, alignedY, alignedWidth, alignedHeight);
  }
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.rect(alignedX, alignedY, alignedWidth, alignedHeight);
  ctx.stroke();
}
