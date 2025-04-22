import {CanvasRenderingContext2D} from 'canvas';
import {Shape} from './types';

let shapes: Shape[] = [];

export function setShapes(newShapes: Shape[]) {
  shapes = newShapes;
}

export function drawText(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  fontSize: number,
  color: string
) {
  const input = document.createElement('input');
  input.type = 'text';

  const inputStyles = {
    fontSize: `${fontSize}px`,
    color: color,
    backgroundColor: 'transparent',
    border: `solid 1px ${color}`,
    borderRadius: '5px',
    minWidth: '10rem',
    outline: 'none',
    padding: '0.3rem 1rem',
    position: 'absolute',
    left: `${x}px`,
    top: `${y}px`,
    width: 'auto',
  };

  Object.assign(input.style, inputStyles);

  document.body.appendChild(input);

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      if (!ctx) return;

      ctx.font = `${fontSize}px Arial`;
      ctx.fillStyle = color;
      ctx.fillText(input.value, x, y);

      shapes.push({
        type: 'text',
        x,
        y,
        fontSize,
        color,
        width: input.value.length * fontSize,
        height: fontSize,
        data: {src: input.value},
      });

      document.body.removeChild(input);
    }
  });
}
