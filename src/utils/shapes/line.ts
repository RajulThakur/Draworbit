export function drawLine(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  height: number,
  width: number,
  isSelected: boolean = false
) {
  if (!ctx) return;

  const startX = Math.round(x);
  const startY = Math.round(y);
  const endX = Math.round(x + width);
  const endY = Math.round(y + height);

  if (isSelected) {
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;
    ctx.rect(startX - 2, startY - 2, width + 4, height + 4);
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
}

export function drawArrow(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  height: number,
  width: number,
  isSelected: boolean = false
) {
  if (!ctx) return;

  const headLength = 10;
  const dx = x + width - x;
  const dy = y + height - y;
  const angle = Math.atan2(dy, dx);

  const startX = Math.round(x);
  const startY = Math.round(y);
  const endX = Math.round(x + width);
  const endY = Math.round(y + height);

  ctx.beginPath();
  if (isSelected) {
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;
    ctx.rect(startX - 2, startY - 2, width + 4, height + 4);
    ctx.stroke();
  }
  ctx.lineWidth = 2;
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);

  ctx.moveTo(endX, endY);
  ctx.lineTo(
    Math.round(endX - headLength * Math.cos(angle - Math.PI / 6)),
    Math.round(endY - headLength * Math.sin(angle - Math.PI / 6))
  );
  ctx.moveTo(endX, endY);
  ctx.lineTo(
    Math.round(endX - headLength * Math.cos(angle + Math.PI / 6)),
    Math.round(endY - headLength * Math.sin(angle + Math.PI / 6))
  );

  ctx.stroke();
}
