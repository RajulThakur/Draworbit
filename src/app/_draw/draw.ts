import { Data } from '@/context/dataContext';
import {NavbarType} from '@/Type/navbarType';
interface Shape {
  type: NavbarType;
  x: number;
  y: number;
  width: number;
  path?: string;
  height: number;
  fontSize?: number;
  color?: string;
  Data: Data;
}
const shape: Shape[] = [];

export function Draw(
  c: HTMLCanvasElement,
  cursor: NavbarType,
  setCursor: (cursor: NavbarType) => void,
  strokeColor: string,
  data:Data,

) {
  if (!c) return;
  const ctx = c.getContext('2d');
  if (!ctx) return;
  ctx.strokeStyle = strokeColor;
  const element: Shape = {x: 0, y: 0, height: 0, width: 0, type: 'hand', Data:data};
  function handleMouseDown(event: MouseEvent) {
    if (!ctx) return;
    element.type = cursor;
    element.x = event.clientX;
    element.y = event.clientY;
    console.log('Mouse down at', element);
    ShapeRenderer(ctx, element);
    c.addEventListener('mousemove', handleMouseMove);
  }
  function handleMouseMove(event: MouseEvent) {
    if (!ctx) return;
    ClearCanvas(c, shape, ctx);
    // Calculate dimensions from initial point
    element.width = event.clientX - element.x;
    element.height = event.clientY - element.y;
    ShapeRenderer(ctx, element);
  }
  function handleMouseUp(event: MouseEvent) {
    if (!ctx) return;
    ClearCanvas(c, shape, ctx);
    // Calculate final dimensions
    element.width = event.clientX - element.x;
    element.height = event.clientY - element.y;
    ShapeRenderer(ctx, element);
    // Create a new object to avoid reference issues
    shape.push({...element});
    console.log('Mouse up at', element);
    c.removeEventListener('mousemove', handleMouseMove);
    setCursor('hand');
  }

  // Add cleanup function to remove event listeners
  const cleanup = () => {
    c.removeEventListener('mousedown', handleMouseDown);
    c.removeEventListener('mouseup', handleMouseUp);
  };

  cleanup(); // Remove any existing listeners
  c.addEventListener('mousedown', handleMouseDown);
  c.addEventListener('mouseup', handleMouseUp);

  return cleanup; // Return cleanup function
}

function ShapeRenderer(ctx: CanvasRenderingContext2D, shape: Shape) {
  const {type, x, y, height, width} = shape;
  switch (type) {
    case 'line':
      DrawLine(ctx, x, y, height, width);
      console.log('line');
      break;
    case 'arrow':
      console.log('arrow');
      break;
    case 'rectangle':
      DrawRectangle(ctx, x, y, height, width);
      console.log('rectangle');
      break;
    case 'circle':
      console.log('circle');
      DrawEllipse(ctx, x, y, width, height);
      break;
    case 'picture':
      DrawImage(ctx, shape.Data?.src, x, y, width, height);
      console.log('picture');
      break;
    case 'text':
      DrawText(ctx, 'Hello', x, y, 20, ctx.strokeStyle as string);
      console.log('text');
      break;
    case 'eraser':
      console.log('eraser');
      break;
    default:
      console.log('not in style');
      break;
  }
}
function DrawRectangle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  height: number,
  width: number
) {
  if (!ctx) return;
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.stroke();
}
function ClearCanvas(
  canvas: HTMLCanvasElement,
  shapes: Shape[],
  ctx: CanvasRenderingContext2D
) {
  if (!canvas || !ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  shapes.map((shape) => {
    ShapeRenderer(ctx, shape);
  });
}

function DrawEllipse(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radiusX: number,
  radiusY: number
) {
  if (!ctx) return;
  radiusX = Math.abs(radiusX);
  radiusY = Math.abs(radiusY);
  const centerX = x + radiusX/2;
   const centerY = y + radiusY/2;
  ctx.beginPath();
  ctx.ellipse(centerX,centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
  ctx.stroke();
}

function DrawText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number,
  color: string
) {
  if (!ctx) return;
  ctx.font = `${fontSize}px Arial`;
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}
function DrawImage(
  ctx: CanvasRenderingContext2D,
  src: string,
  x: number,
  y: number,
  width: number,
  height: number
) {
  if (!ctx) return;
  const img = new Image();
  img.src = src;
  img.onload = () => {
    ctx.drawImage(img, x, y, width, height);
  };
}
function DrawLine(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  height: number,
  width: number
) {
  if (!ctx) return;

  const headLength = 10; // Length of arrow head
  const dx = x + width - x;
  const dy = y + height - y;
  const angle = Math.atan2(dy, dx);

  // Draw the main line
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + width, y + height);

  // Draw the arrow head
  ctx.moveTo(x + width, y + height);
  ctx.lineTo(
    x + width - headLength * Math.cos(angle - Math.PI / 6),
    y + height - headLength * Math.sin(angle - Math.PI / 6)
  );
  ctx.moveTo(x + width, y + height);
  ctx.lineTo(
    x + width - headLength * Math.cos(angle + Math.PI / 6),
    y + height - headLength * Math.sin(angle + Math.PI / 6)
  );

  ctx.stroke();
}
