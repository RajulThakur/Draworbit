import drawSelectedHelper from './transform/selectedHelper';

export function drawEllipse(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  isSelected: boolean = false
) {
  if (!ctx) return;
  const ROOT_2 = 1.4142;

  width = Math.abs(width);
  height = Math.abs(height);
  const centerX = Math.round(x + width / 2);
  const centerY = Math.round(y + height / 2);
  // Points of rect
  const radiusX = width / ROOT_2;
  const radiusY = height / ROOT_2;
  const Px = Math.round(centerX - width / ROOT_2);
  const Py = Math.round(centerY - height / ROOT_2);

  if (isSelected) {
    drawSelectedHelper(ctx, Px, Py, radiusX * 2, radiusY * 2);
  }

  // Save the current context state
  ctx.save();
  ctx.lineWidth = 2;

  // Draw the ellipse
  ctx.beginPath();
  ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
  ctx.stroke();

  // Restore the context state
  ctx.restore();
}
