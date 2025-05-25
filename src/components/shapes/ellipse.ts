import drawSelectedHelper from './transform/selectedHelper';

export function drawEllipse(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radiusX: number,
  radiusY: number,
  isSelected: boolean = false
) {
  if (!ctx) return;

  radiusX = Math.abs(radiusX);
  radiusY = Math.abs(radiusY);
  const centerX = Math.round(x + radiusX / 2);
  const centerY = Math.round(y + radiusY / 2);

  ctx.beginPath();
  if (isSelected) {
    drawSelectedHelper(
      ctx,
      centerX - radiusX,
      centerY - radiusY,
      radiusX * 2,
      radiusY * 2
    );
  }
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
  ctx.stroke();
}
