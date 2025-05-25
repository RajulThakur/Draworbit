import drawSelectedHelper from './transform/selectedHelper';

export function drawImage(
  ctx: CanvasRenderingContext2D,
  src: string,
  x: number,
  y: number,
  width: number,
  height: number,
  isSelected: boolean = false
) {
  if (!ctx) return;
  if (isSelected) {
    drawSelectedHelper(ctx, x, y, width, height);
  }
  const img = new Image();
  img.src = src;
  img.onload = () => {
    ctx.drawImage(img, x, y, width, height);
  };
}
