import {
  HANDLE_SIZE,
  LINE_WIDTH,
  SELECTION_COLOR,
  SELECTION_GAP,
} from '@/constants/shape';

export default function drawSelectedHelper(
  ctx: CanvasRenderingContext2D,
  alignedX: number,
  alignedY: number,
  alignedWidth: number,
  alignedHeight: number,
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
