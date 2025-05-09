export function drawText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number
) {
  ctx.font = '50px Arial';
  ctx.fillText(text, x, y);
}
