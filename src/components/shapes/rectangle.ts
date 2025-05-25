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
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;
    ctx.rect(x - 4, y - 4, width + 4, height + 4);
    ctx.stroke();
  }

  ctx.lineWidth = 2;
  ctx.rect(alignedX, alignedY, alignedWidth, alignedHeight);
  ctx.stroke();
}
