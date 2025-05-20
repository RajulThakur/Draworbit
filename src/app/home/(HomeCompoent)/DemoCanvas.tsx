'use client';

import {useEffect, useRef} from 'react';

export default function DemoCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({x: 0, y: 0});
  const prevMousePos = useRef({x: 0, y: 0});
  const trailRef = useRef<{x: number; y: number; alpha: number}[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', {alpha: false});
    if (!ctx) return;

    // Set canvas size to match its display size with higher resolution
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      prevMousePos.current = {...mousePos.current};
      mousePos.current = {x: e.clientX - rect.left, y: e.clientY - rect.top};

      // Add new point to trail
      trailRef.current.push({
        x: mousePos.current.x,
        y: mousePos.current.y,
        alpha: 1,
      });

      // Keep trail length manageable
      if (trailRef.current.length > 15) {
        trailRef.current.shift();
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      // Clear canvas with slight fade effect
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw trail with Bezier curves
      if (trailRef.current.length > 2) {
        ctx.beginPath();
        ctx.moveTo(trailRef.current[0].x, trailRef.current[0].y);

        for (let i = 0; i < trailRef.current.length - 2; i++) {
          const xc = (trailRef.current[i].x + trailRef.current[i + 1].x) / 2;
          const yc = (trailRef.current[i].y + trailRef.current[i + 1].y) / 2;

          // Create gradient for this segment
          const gradient = ctx.createLinearGradient(
            trailRef.current[i].x,
            trailRef.current[i].y,
            trailRef.current[i + 1].x,
            trailRef.current[i + 1].y
          );
          gradient.addColorStop(
            0,
            `rgba(79, 70, 229, ${trailRef.current[i].alpha})`
          );
          gradient.addColorStop(
            1,
            `rgba(79, 70, 229, ${trailRef.current[i + 1].alpha})`
          );

          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2.5;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';

          // Draw quadratic curve
          ctx.quadraticCurveTo(
            trailRef.current[i].x,
            trailRef.current[i].y,
            xc,
            yc
          );
        }

        // Draw the last segment
        const lastPoint = trailRef.current[trailRef.current.length - 1];
        const secondLastPoint = trailRef.current[trailRef.current.length - 2];

        const gradient = ctx.createLinearGradient(
          secondLastPoint.x,
          secondLastPoint.y,
          lastPoint.x,
          lastPoint.y
        );
        gradient.addColorStop(0, `rgba(79, 70, 229, ${secondLastPoint.alpha})`);
        gradient.addColorStop(1, `rgba(79, 70, 229, ${lastPoint.alpha})`);

        ctx.strokeStyle = gradient;
        ctx.lineTo(lastPoint.x, lastPoint.y);
        ctx.stroke();
      }

      // Fade out the points
      trailRef.current.forEach((point) => {
        point.alpha *= 0.92;
      });

      // Remove faded points
      trailRef.current = trailRef.current.filter((point) => point.alpha > 0.02);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full cursor-crosshair rounded-xl bg-white"
    />
  );
}
