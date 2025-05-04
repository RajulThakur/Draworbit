import {Shape} from './types';

const RESIZE_HANDLE_SIZE = 8;

export interface SelectionState {
  selectedShape: Shape | null;
  isResizing: boolean;
  resizeHandle: 'nw' | 'ne' | 'sw' | 'se' | null;
  startX: number;
  startY: number;
}

export function drawSelection(
  ctx: CanvasRenderingContext2D,
  shape: Shape,
  isSelected: boolean
) {
  if (!isSelected) return;

  // Draw selection rectangle
  ctx.strokeStyle = '#4A90E2';
  ctx.lineWidth = 1;
  ctx.setLineDash([5, 5]);
  ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
  ctx.setLineDash([]);

  // Draw resize handles
  const handles = [
    {x: shape.x, y: shape.y}, // NW
    {x: shape.x + shape.width, y: shape.y}, // NE
    {x: shape.x, y: shape.y + shape.height}, // SW
    {x: shape.x + shape.width, y: shape.y + shape.height}, // SE
  ];

  ctx.fillStyle = '#FFFFFF';
  ctx.strokeStyle = '#4A90E2';
  ctx.lineWidth = 1;

  handles.forEach((handle) => {
    ctx.beginPath();
    ctx.rect(
      handle.x - RESIZE_HANDLE_SIZE / 2,
      handle.y - RESIZE_HANDLE_SIZE / 2,
      RESIZE_HANDLE_SIZE,
      RESIZE_HANDLE_SIZE
    );
    ctx.fill();
    ctx.stroke();
  });
}

export function isPointInShape(x: number, y: number, shape: Shape): boolean {
  return (
    x >= shape.x &&
    x <= shape.x + shape.width &&
    y >= shape.y &&
    y <= shape.y + shape.height
  );
}

export function getResizeHandle(
  x: number,
  y: number,
  shape: Shape
): 'nw' | 'ne' | 'sw' | 'se' | null {
  const handles = [
    {type: 'nw' as const, x: shape.x, y: shape.y},
    {type: 'ne' as const, x: shape.x + shape.width, y: shape.y},
    {type: 'sw' as const, x: shape.x, y: shape.y + shape.height},
    {type: 'se' as const, x: shape.x + shape.width, y: shape.y + shape.height},
  ];

  for (const handle of handles) {
    if (
      Math.abs(x - handle.x) <= RESIZE_HANDLE_SIZE &&
      Math.abs(y - handle.y) <= RESIZE_HANDLE_SIZE
    ) {
      return handle.type;
    }
  }

  return null;
}

export function resizeShape(
  shape: Shape,
  handle: 'nw' | 'ne' | 'sw' | 'se',
  newX: number,
  newY: number
): Shape {
  const newShape = {...shape};

  switch (handle) {
    case 'nw':
      newShape.width = shape.width + (shape.x - newX);
      newShape.height = shape.height + (shape.y - newY);
      newShape.x = newX;
      newShape.y = newY;
      break;
    case 'ne':
      newShape.width = newX - shape.x;
      newShape.height = shape.height + (shape.y - newY);
      newShape.y = newY;
      break;
    case 'sw':
      newShape.width = shape.width + (shape.x - newX);
      newShape.height = newY - shape.y;
      newShape.x = newX;
      break;
    case 'se':
      newShape.width = newX - shape.x;
      newShape.height = newY - shape.y;
      break;
  }

  return newShape;
}
