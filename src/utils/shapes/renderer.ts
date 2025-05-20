import {Point, Shape} from './types';
import {drawLine} from './line';
import {drawArrow} from './line';
import {drawRectangle} from './rectangle';
import {drawEllipse} from './ellipse';
import {drawImage} from './image';
import {drawText} from './text';
// import {drawSelection} from './selection';
import {drawSquare} from './square';
import {drawDiamond} from './diamond';
import {PenDraw} from './penDraw';

export function renderShape(ctx: CanvasRenderingContext2D, shape: Shape) {
  const {type, x, y, height, width, isSelected} = shape;
  const path = shape?.path;
  const text = shape?.text;

  // Save the current context state
  ctx.save();

  switch (type) {
    case 'line':
      drawLine(ctx, x, y, height, width, isSelected);
      break;
    case 'arrow':
      drawArrow(ctx, x, y, height, width, isSelected);
      break;
    case 'rectangle':
      drawRectangle(ctx, x, y, height, width, isSelected);
      break;
    case 'circle':
      drawEllipse(ctx, x, y, width, height, isSelected);
      break;
    case 'square':
      drawSquare(ctx, x, y, width, height, isSelected);
      break;
    case 'picture':
      drawImage(ctx, shape.data.src, x, y, width, height, isSelected);
      break;
    case 'text':
      if (text) {
        drawText(ctx, text, x, y, isSelected, height, width);
      }
      break;
    case 'diamond':
      drawDiamond(ctx, x, y, width, height, isSelected);
      break;
    case 'draw':
      if (path) {
        PenDraw(ctx, x, y, path);
      }
      break;
    case 'eraser':
      // Implement eraser functionality
      break;
    default:
      console.warn(`Unsupported shape type: ${type}`);
      break;
  }

  ctx.restore();
}

export interface Transform {
  x: number;
  y: number;
  scale: number;
}

export function renderCanvas(
  canvas: HTMLCanvasElement,
  shapes: Shape[],
  ctx: CanvasRenderingContext2D,
  transform: Transform
): number {
  if (!canvas || !ctx) return 0;
  const {x, y, scale} = transform;
  // Clear the entire canvas
  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.setTransform(scale, 0, 0, scale, x, y);

  shapes.forEach((shape) => renderShape(ctx, shape));
  ctx.restore();
  return requestAnimationFrame(() => {
    renderCanvas(canvas, shapes, ctx, transform);
  });
}

export function isPointInShape(
  point: Point,
  shape: Shape,
  padding = 5
): boolean {
  const px = point.x;
  const py = point.y;
  const Type = shape.type;
  console.log('Type send', Type);
  if (Type === 'arrow' || Type === 'line') {
    console.log('line');
    const padding = 2;
    const x1 = shape.x;
    const y1 = shape.y;
    const x2 = shape.x + shape.width;
    const y2 = shape.y + shape.height;

    const distToLine = pointLineDistance(px, py, x1, y1, x2, y2);
    return distToLine <= padding;
  } else if (Type === 'circle') {
    const cx = shape.x + shape.width / 2;
    const cy = shape.y + shape.height / 2;
    const a = shape.width / 2 + padding;
    const b = shape.height / 2 + padding;
    const dx = px - cx;
    const dy = py - cy;
    return (dx * dx) / (a * a) + (dy * dy) / (b * b) <= 1;
  } else if (Type === 'diamond') {
    const cx = shape.x + shape.width / 2;
    const cy = shape.y + shape.height / 2;
    const dx = Math.abs(px - cx);
    const dy = Math.abs(py - cy);
    return dx + dy <= shape.width / 2 + padding;
  } else if (Type === 'rectangle' || Type === 'square') {
    console.log('rectangle');
    // Check if the point is within the rectangle's bounds with padding
    return (
      px >= shape.x - padding &&
      px <= shape.x + shape.width + padding &&
      py >= shape.y - padding &&
      py <= shape.y + shape.height + padding
    );
  } else if (Type === 'text') {
    return (
      px >= shape.x - padding &&
      px <= shape.x + shape.width + padding &&
      py >= shape.y - padding &&
      py <= shape.y + shape.height + padding
    );
  }

  return false;
}
function pointLineDistance(
  px: number,
  py: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number
) {
  const A = px - x1;
  const B = py - y1;
  const C = x2 - x1;
  const D = y2 - y1;

  const dot = A * C + B * D;
  const len_sq = C * C + D * D;
  const param = len_sq !== 0 ? dot / len_sq : -1;

  let xx, yy;

  if (param < 0) {
    xx = x1;
    yy = y1;
  } else if (param > 1) {
    xx = x2;
    yy = y2;
  } else {
    xx = x1 + param * C;
    yy = y1 + param * D;
  }

  const dx = px - xx;
  const dy = py - yy;
  return Math.sqrt(dx * dx + dy * dy);
}
