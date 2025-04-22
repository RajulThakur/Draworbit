import {Data} from '@/context/dataContext';
import {NavbarType} from '@/Type/navbarType';
import {Shape} from './shapes/types';
import {renderShape, clearAndRedrawCanvas} from './shapes/canvas';
import {setShapes} from './shapes/text';

const shapes: Shape[] = [];

export function Draw(
  canvas: HTMLCanvasElement,
  cursor: NavbarType,
  setCursor: (cursor: NavbarType) => void,
  strokeColor: string,
  data: Data
) {
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.strokeStyle = strokeColor;

  const currentShape: Shape = {
    x: 0,
    y: 0,
    height: 0,
    width: 0,
    type: 'hand',
    data: data,
  };

  setShapes(shapes);

  const handleMouseDown = (event: MouseEvent) => {
    if (!ctx) return;
    currentShape.type = cursor;
    currentShape.x = event.clientX;
    currentShape.y = event.clientY;
    renderShape(ctx, currentShape);
    canvas.addEventListener('mousemove', handleMouseMove);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!ctx) return;
    clearAndRedrawCanvas(canvas, shapes, ctx);

    currentShape.width = event.clientX - currentShape.x;
    currentShape.height = event.clientY - currentShape.y;
    renderShape(ctx, currentShape);
  };

  const handleMouseUp = (event: MouseEvent) => {
    if (!ctx) return;

    currentShape.width = event.clientX - currentShape.x;
    currentShape.height = event.clientY - currentShape.y;
    renderShape(ctx, currentShape);

    shapes.push({...currentShape});
    canvas.removeEventListener('mousemove', handleMouseMove);
  };

  const cleanup = () => {
    canvas.removeEventListener('mousedown', handleMouseDown);
    canvas.removeEventListener('mouseup', handleMouseUp);
  };

  cleanup();
  canvas.addEventListener('mousedown', handleMouseDown);
  canvas.addEventListener('mouseup', handleMouseUp);

  return cleanup;
}
