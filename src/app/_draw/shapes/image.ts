import {CanvasRenderingContext2D} from 'canvas';

export function drawImage(
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
