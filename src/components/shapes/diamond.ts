import {drawSelectedHelper} from './transform/selectionHelper';

export function drawDiamond(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  isSelected: boolean = false
) {
  if (!ctx) return;

  // Calculate the center point
  const centerX = x + width / 2;
  const centerY = y + height / 2;

  // Calculate the four vertices of the diamond
  const vertices = [
    {x: centerX, y: y}, // Top
    {x: x + width, y: centerY}, // Right
    {x: centerX, y: y + height}, // Bottom
    {x: x, y: centerY}, // Left
  ];

  ctx.beginPath();
  if (isSelected) {
    drawSelectedHelper(ctx, x, y, width, height);
  }
  ctx.closePath();

  ctx.beginPath();
  // Move to the first vertex
  ctx.moveTo(vertices[0].x, vertices[0].y);

  // Draw lines to the remaining vertices
  for (let i = 1; i < vertices.length; i++) {
    ctx.lineTo(vertices[i].x, vertices[i].y);
  }
  // Close the path to complete the diamond
  ctx.closePath();
  ctx.stroke();
}
