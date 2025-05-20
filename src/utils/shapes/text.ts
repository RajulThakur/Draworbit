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
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;
    ctx.rect(x - 4, y - 4, width + 4, height + 4);
    ctx.stroke();
  }
  ctx.fillText(text, x, y);
}
