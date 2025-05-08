import {Path} from '../shapes/types';

export function PenDraw(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  path: Path[]
) {
  if (!path || path.length === 0) return;

  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // Enable line smoothing
  ctx.imageSmoothingEnabled = true;

  // Start from the initial point
  ctx.moveTo(x, y);

  // Use quadratic curves for smoother lines
  for (let i = 0; i < path.length - 1; i++) {
    const current = path[i];
    const next = path[i + 1];

    // Calculate control point (midpoint between current and next point)
    const cpX = (current.x + next.x) / 2;
    const cpY = (current.y + next.y) / 2;

    // Draw quadratic curve to the next point
    ctx.quadraticCurveTo(current.x, current.y, cpX, cpY);
  }

  // If there are points, draw to the last point
  if (path.length > 0) {
    const lastPoint = path[path.length - 1];
    ctx.lineTo(lastPoint.x, lastPoint.y);
  }

  ctx.stroke();
}
