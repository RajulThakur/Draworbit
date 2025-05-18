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
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;
    ctx.rect(x - 4, y - 4, width + 4, height + 4);
    ctx.stroke();
  }
  const img = new Image();
  img.src = src;
  img.onload = () => {
    ctx.drawImage(img, x, y, width, height);
  };
}
