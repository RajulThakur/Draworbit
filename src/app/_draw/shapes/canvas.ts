import {Shape} from './types';
import {drawLine} from './line';
import {drawArrow} from './line';
import {drawRectangle} from './rectangle';
import {drawEllipse} from './ellipse';
import {drawImage} from './image';
import {drawText} from './text';
import {drawDiamond} from './diamond';
// import {drawSelection} from './selection';
import {drawSquare} from './square';

export function renderShape(ctx: CanvasRenderingContext2D, shape: Shape) {
  const {type, x, y, height, width} = shape;

  // Save the current context state
  ctx.save();

  switch (type) {
    case 'line':
      drawLine(ctx, x, y, height, width);
      break;
    case 'arrow':
      drawArrow(ctx, x, y, height, width);
      break;
    case 'rectangle':
      drawRectangle(ctx, x, y, height, width);
      break;
    case 'circle':
      drawEllipse(ctx, x, y, width, height);
      break;
    case 'square':
      drawSquare(ctx, x, y, width, height);
      break;
    case 'picture':
      drawImage(ctx, shape.data.src, x, y, width, height);
      break;
    case 'text':
      drawText(ctx, x, y, 20, ctx.strokeStyle as string);
      break;
    case 'diamond':
      drawDiamond(ctx, x, y, width, height);
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
