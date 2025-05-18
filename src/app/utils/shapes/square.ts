export function drawSquare(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  height: number,
  width: number,
  isSelected: boolean = false
) {
  if (!ctx) return;

  const SELECTION_GAP = 10; // Gap between shape and selection border
  const HANDLE_SIZE = 8; // Size of selection handles

  ctx.beginPath();
  const alignedX = Math.round(x);
  const alignedY = Math.round(y);
  const alignedWidth = Math.round(width);
  const alignedHeight = Math.round(height);
  const side = Math.min(alignedWidth, alignedHeight);

  if (isSelected) {
    // Draw outer selection rectangle (blue)
    ctx.save();
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;

    // Draw selection border
    ctx.rect(
      alignedX - SELECTION_GAP,
      alignedY - SELECTION_GAP,
      side + SELECTION_GAP * 2,
      side + SELECTION_GAP * 2
    );
    ctx.stroke();

    // Draw corner handles
    ctx.fillStyle = '#ffffff'; // White fill
    ctx.strokeStyle = '#3b82f6'; // Blue border
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
      alignedX + side + SELECTION_GAP - HANDLE_SIZE / 2,
      alignedY - SELECTION_GAP - HANDLE_SIZE / 2,
      HANDLE_SIZE,
      HANDLE_SIZE
    );
    ctx.strokeRect(
      alignedX + side + SELECTION_GAP - HANDLE_SIZE / 2,
      alignedY - SELECTION_GAP - HANDLE_SIZE / 2,
      HANDLE_SIZE,
      HANDLE_SIZE
    );

    // Bottom-left handle
    ctx.fillRect(
      alignedX - SELECTION_GAP - HANDLE_SIZE / 2,
      alignedY + side + SELECTION_GAP - HANDLE_SIZE / 2,
      HANDLE_SIZE,
      HANDLE_SIZE
    );
    ctx.strokeRect(
      alignedX - SELECTION_GAP - HANDLE_SIZE / 2,
      alignedY + side + SELECTION_GAP - HANDLE_SIZE / 2,
      HANDLE_SIZE,
      HANDLE_SIZE
    );

    // Bottom-right handle
    ctx.fillRect(
      alignedX + side + SELECTION_GAP - HANDLE_SIZE / 2,
      alignedY + side + SELECTION_GAP - HANDLE_SIZE / 2,
      HANDLE_SIZE,
      HANDLE_SIZE
    );
    ctx.strokeRect(
      alignedX + side + SELECTION_GAP - HANDLE_SIZE / 2,
      alignedY + side + SELECTION_GAP - HANDLE_SIZE / 2,
      HANDLE_SIZE,
      HANDLE_SIZE
    );

    ctx.restore();
  }

  // Draw the main square with original stroke color
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.rect(alignedX, alignedY, side, side);
  ctx.stroke();
}
