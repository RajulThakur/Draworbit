import {Data} from '@/context/dataContext';
import {NavbarType} from '@/Type/navbarType';
import {Shape} from './shapes/types';
import {
  renderShape,
  clearAndRedrawCanvas,
  setSelectedShape,
} from './shapes/canvas';
import {setShapes} from './shapes/text';
import {
  SelectionState,
  isPointInShape,
  getResizeHandle,
  resizeShape,
} from './shapes/selection';

const shapes: Shape[] = [];
const selectionState: SelectionState = {
  selectedShape: null,
  isResizing: false,
  resizeHandle: null,
  startX: 0,
  startY: 0,
};

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

  let isDrawing = false;

  setShapes(shapes);

  const handleMouseDown = (event: MouseEvent) => {
    if (!ctx) return;

    if (cursor === 'hand') {
      // Check if clicking on a shape
      const clickedShape = shapes.find((shape) =>
        isPointInShape(event.clientX, event.clientY, shape)
      );

      if (clickedShape) {
        selectionState.selectedShape = clickedShape;
        setSelectedShape(clickedShape);
        const handle = getResizeHandle(
          event.clientX,
          event.clientY,
          clickedShape
        );

        if (handle) {
          selectionState.isResizing = true;
          selectionState.resizeHandle = handle;
        } else {
          selectionState.isResizing = false;
          selectionState.resizeHandle = null;
        }

        selectionState.startX = event.clientX;
        selectionState.startY = event.clientY;
        return;
      } else {
        selectionState.selectedShape = null;
        setSelectedShape(null);
      }
    }

    isDrawing = true;
    currentShape.type = cursor;
    currentShape.x = event.clientX;
    currentShape.y = event.clientY;
    renderShape(ctx, currentShape);
    canvas.addEventListener('mousemove', handleMouseMove);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!ctx) return;

    if (cursor === 'hand' && selectionState.selectedShape) {
      clearAndRedrawCanvas(canvas, shapes, ctx);

      if (selectionState.isResizing && selectionState.resizeHandle) {
        // Resize the shape
        const newShape = resizeShape(
          selectionState.selectedShape,
          selectionState.resizeHandle,
          event.clientX,
          event.clientY
        );

        const index = shapes.indexOf(selectionState.selectedShape);
        if (index !== -1) {
          shapes[index] = newShape;
          selectionState.selectedShape = newShape;
          setSelectedShape(newShape);
        }
      } else {
        // Move the shape
        const dx = event.clientX - selectionState.startX;
        const dy = event.clientY - selectionState.startY;

        const index = shapes.indexOf(selectionState.selectedShape);
        if (index !== -1) {
          shapes[index] = {
            ...selectionState.selectedShape,
            x: selectionState.selectedShape.x + dx,
            y: selectionState.selectedShape.y + dy,
          };
          selectionState.selectedShape = shapes[index];
          setSelectedShape(shapes[index]);
        }

        selectionState.startX = event.clientX;
        selectionState.startY = event.clientY;
      }
    } else if (isDrawing) {
      clearAndRedrawCanvas(canvas, shapes, ctx);
      currentShape.width = event.clientX - currentShape.x;
      currentShape.height = event.clientY - currentShape.y;
      renderShape(ctx, currentShape);
    }
  };

  const handleMouseUp = (event: MouseEvent) => {
    if (!ctx) return;

    if (isDrawing && cursor !== 'hand') {
      currentShape.width = event.clientX - currentShape.x;
      currentShape.height = event.clientY - currentShape.y;
      renderShape(ctx, currentShape);
      shapes.push({...currentShape});
      isDrawing = false;
    }

    selectionState.isResizing = false;
    selectionState.resizeHandle = null;
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
