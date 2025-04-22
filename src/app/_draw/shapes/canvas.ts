import {CanvasRenderingContext2D} from 'canvas';
import {Shape} from './types';
import {drawLine} from './line';
import {drawArrow} from './line';
import {drawRectangle} from './rectangle';
import {drawEllipse} from './ellipse';
import {drawImage} from './image';
import {drawText} from './text';
import {drawDiamond} from './diamond';
import {drawSquare} from './square';

export function renderShape(ctx: CanvasRenderingContext2D, shape: Shape) {
  const {type, x, y, height, width} = shape;

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
    case 'square':
      drawSquare(ctx, x, y, height, width);
      break;
    case 'circle':
      drawEllipse(ctx, x, y, width, height);
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
}

export function clearAndRedrawCanvas(
  canvas: HTMLCanvasElement,
  shapes: Shape[],
  ctx: CanvasRenderingContext2D
) {
  if (!canvas || !ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  shapes.forEach((shape) => renderShape(ctx, shape));
}
