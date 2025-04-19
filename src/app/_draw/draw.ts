import {NavbarType} from '@/Type/navbarType';
interface Shape {
  type: NavbarType;
  x: number;
  y: number;
  width: number;
  height: number;
}
const shape: Shape[] = [];

export function Draw(
  c: HTMLCanvasElement,
  cursor: NavbarType,
  setCursor: (cursor: NavbarType) => void,
  strokeColor: string
) {
  if (!c) return;
  const ctx = c.getContext('2d');
  if (!ctx) return;
  ctx.strokeStyle = strokeColor;
  const element: Shape = {x: 0, y: 0, height: 0, width: 0, type: 'hand'};
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
      // DrawLine(e, c);
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
      // DrawCircle(e, c);
      break;
    case 'picture':
      console.log('picture');
      break;
    case 'text':
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
  ctx.beginPath(); // Add this
  ctx.rect(x, y, width, height); // Note: switched height and width order
  ctx.stroke(); // Add this
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

// function DrawCircle(e: MouseEvent, c: HTMLCanvasElement) {
//   const ctx = c.getContext('2d');
//   const {PI} = Math;
//   if (!ctx) return;

//   // Persist the circle object across function calls
//   const circleObj = DrawCircle.circleObj || {id: 45, x: 0, y: 0, radius: 0};

//   if (e.type === 'mousedown') {
//     DrawCircle.circleObj = circleObj; // Save the updated circleObj
//   } else if (e.type === 'mousemove') {
//     const radiusX = e.clientX - circleObj.x;
//     const radiusY = e.clientY - circleObj.y;
//     circleObj.radius = Math.sqrt(radiusX * radiusX + radiusY * radiusY);
//     DrawCircle.circleObj = circleObj; // Save the updated circleObj

//     // Clear the canvas before redrawing
//     ctx.clearRect(circleObj.x, circleObj.x, c.width, c.height);

//     // Draw the circle
//     ctx.beginPath();
//     ctx.arc(circleObj.x, circleObj.y, circleObj.radius, 0, 2 * PI);
//     ctx.stroke();
//   } else if (e.type === 'mouseup') {
//     console.log('mouseup');

//     // Finalize the circle
//     ctx.beginPath();
//     ctx.arc(circleObj.x, circleObj.y, circleObj.radius, 0, 2 * PI);
//     ctx.stroke();

//     // Clear the temporary circleObj
//     delete DrawCircle.circleObj;
//   }
// }
// function DrawLine(e: MouseEvent, c: HTMLCanvasElement) {
//   const ctx = c.getContext('2d');
//   if (!ctx) return;
//   const lineObj = DrawLine.lineObj || {id: 45, x: 0, y: 0, x1: 0, y1: 0};
//   if (e.type === 'mousedown') {
//     lineObj.x = e.clientX - c.getBoundingClientRect().left;
//     lineObj.y = e.clientY - c.getBoundingClientRect().top;
//     DrawLine.lineObj = lineObj; // Save the updated lineObj
//   } else if (e.type === 'mousemove') {
//     lineObj.x1 = e.clientX - c.getBoundingClientRect().left;
//     lineObj.y1 = e.clientY - c.getBoundingClientRect().top;
//     // Clear the canvas before redrawing
//     ctx.clearRect(0, 0, c.width, c.height);
//     // Draw the line
//     ctx.beginPath();
//     ctx.moveTo(lineObj.x, lineObj.y);
//     ctx.lineTo(lineObj.x1, lineObj.y1);
//     ctx.stroke();
//   } else if (e.type === 'mouseup') {
//     console.log('mouseup');
//     // Finalize the line
//     ctx.beginPath();
//     ctx.moveTo(lineObj.x, lineObj.y);
//     ctx.lineTo(lineObj.x1, lineObj.y1);
//     ctx.stroke();
//     // Clear the temporary lineObj
//     delete DrawLine.lineObj;
//   }
// }
