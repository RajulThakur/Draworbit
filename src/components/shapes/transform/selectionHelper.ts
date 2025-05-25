import {Shape} from '../types';
import {
  HANDLE_SIZE,
  LINE_WIDTH,
  SELECTION_COLOR,
  SELECTION_GAP,
} from '@/constants/shape';
const RESIZE_HANDLE_SIZE = 8;

export interface SelectionState {
  selectedShape: Shape | null;
  isResizing: boolean;
  resizeHandle: 'nw' | 'ne' | 'sw' | 'se' | null;
  startX: number;
  startY: number;
}

export function drawSelectedHelper(
  ctx: CanvasRenderingContext2D,
  alignedX: number,
  alignedY: number,
  alignedWidth: number,
  alignedHeight: number
) {
  if (!ctx) return;
  // Draw outer selection rectangle (blue)
  ctx.save();
  ctx.strokeStyle = SELECTION_COLOR;
  ctx.lineWidth = LINE_WIDTH;

  // Draw selection border
  ctx.rect(
    alignedX - SELECTION_GAP,
    alignedY - SELECTION_GAP,
    alignedWidth + SELECTION_GAP * 2,
    alignedHeight + SELECTION_GAP * 2
  );
  ctx.stroke();

  // Draw corner handles
  ctx.fillStyle = '#ffffff'; // White fill
  ctx.strokeStyle = SELECTION_COLOR; // Blue border
  ctx.lineWidth = 1;

  // Top-left handle
  ctx.fillRect(
    alignedX - SELECTION_GAP - HANDLE_SIZE / 2,
    alignedY - SELECTION_GAP - HANDLE_SIZE / 2,
    HANDLE_SIZE,
    HANDLE_SIZE
  );
  ctx.strokeRect(
    alignedX - SELECTION_GAP - HANDLE_SIZE / 2,
    alignedY - SELECTION_GAP - HANDLE_SIZE / 2,
    HANDLE_SIZE,
    HANDLE_SIZE
  );

  // Top-right handle
  ctx.fillRect(
    alignedX + alignedWidth + SELECTION_GAP - HANDLE_SIZE / 2,
    alignedY - SELECTION_GAP - HANDLE_SIZE / 2,
    HANDLE_SIZE,
    HANDLE_SIZE
  );
  ctx.strokeRect(
    alignedX + alignedWidth + SELECTION_GAP - HANDLE_SIZE / 2,
    alignedY - SELECTION_GAP - HANDLE_SIZE / 2,
    HANDLE_SIZE,
    HANDLE_SIZE
  );

  // Bottom-left handle
  ctx.fillRect(
    alignedX - SELECTION_GAP - HANDLE_SIZE / 2,
    alignedY + alignedHeight + SELECTION_GAP - HANDLE_SIZE / 2,
    HANDLE_SIZE,
    HANDLE_SIZE
  );
  ctx.strokeRect(
    alignedX - SELECTION_GAP - HANDLE_SIZE / 2,
    alignedY + alignedHeight + SELECTION_GAP - HANDLE_SIZE / 2,
    HANDLE_SIZE,
    HANDLE_SIZE
  );

  // Bottom-right handle
  ctx.fillRect(
    alignedX + alignedWidth + SELECTION_GAP - HANDLE_SIZE / 2,
    alignedY + alignedHeight + SELECTION_GAP - HANDLE_SIZE / 2,
    HANDLE_SIZE,
    HANDLE_SIZE
  );
  ctx.strokeRect(
    alignedX + alignedWidth + SELECTION_GAP - HANDLE_SIZE / 2,
    alignedY + alignedHeight + SELECTION_GAP - HANDLE_SIZE / 2,
    HANDLE_SIZE,
    HANDLE_SIZE
  );

  ctx.restore();
}

export function isPointInShape(x: number, y: number, shape: Shape): boolean {
  if (shape.type === 'circle') {
    return true;
  } else {
    return (
      x >= shape.x &&
      x <= shape.x + shape.width &&
      y >= shape.y &&
      y <= shape.y + shape.height
    );
  }
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
