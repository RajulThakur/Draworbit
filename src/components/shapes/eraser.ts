export function drawEraser(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number
) {
  if (!ctx) return;

  const size = 20; // Size of the eraser
  ctx.fillStyle = 'white'; // Eraser color
  ctx.fillRect(x - size / 2, y - size / 2, size, size);
}