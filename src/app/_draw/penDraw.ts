'use client';
import {useRef} from 'react';
export function PenDraw(canvas: HTMLCanvasElement, strokeColor: string) {
  const startX = useRef(0);
  const startY = useRef(0);
  if (!canvas || !strokeColor) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const canvasOffsetX = canvas.offsetLeft;
  const canvasOffsetY = canvas.offsetTop;

  canvas.width = window.innerWidth - canvasOffsetX;
  canvas.height = window.innerHeight - canvasOffsetY;

  let isPainting = false;
  const lineWidth = 2;
  ctx.strokeStyle = strokeColor;

  const draw = (e: MouseEvent) => {
    if (!ctx) return;
    if (!isPainting) {
      return;
    }

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    ctx.lineTo(e.clientX - canvasOffsetX, e.clientY);
    ctx.stroke();
  };

  canvas.addEventListener('mousedown', (e) => {
    isPainting = true;
    startX.current = e.clientX;
    startY.current = e.clientY;
  });

  canvas.addEventListener('mouseup', () => {
    if (!ctx) return;
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
  });

  canvas.addEventListener('mousemove', draw);
}
