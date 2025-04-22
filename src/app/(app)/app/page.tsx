'use client';
import {useColor} from '@/context/colorContext';
import {useCursor} from '@/context/cursorContext';
import {useEffect, useRef, useState} from 'react';
import {Draw} from '../../_draw/draw';
import {useData} from '@/context/dataContext';
import {PenDraw} from '@/app/_draw/penDraw';

export default function Dashboard() {
  const c = useRef<HTMLCanvasElement | null>(null);
  const [dim, setDim] = useState({width: 0, height: 0});
  const {cursor, setCursor} = useCursor();
  const {data} = useData();
  const {strokeColor} = useColor();

  useEffect(() => {
    const height = window.innerHeight;
    const width = window.innerWidth;
    setDim({width, height});

    // Handle window resize
    const handleResize = () => {
      const height = window.innerHeight;
      const width = window.innerWidth;
      setDim({width, height});
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (c.current) {
      const canvas = c.current;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        // Get device pixel ratio
        const dpr = window.devicePixelRatio || 1;

        // Set canvas size accounting for DPR
        canvas.width = dim.width * dpr;
        canvas.height = dim.height * dpr;

        // Scale context to match DPR
        ctx.scale(dpr, dpr);

        // Set crisp stroke settings
        ctx.imageSmoothingEnabled = false;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = 2; // Set default line width

        // Only initialize drawing if not in hand mode
        if (cursor !== 'hand') {
          let cleanup;
          if (cursor === 'draw') {
            cleanup = PenDraw(canvas, strokeColor);
          } else {
            cleanup = Draw(canvas, cursor, setCursor, strokeColor, data);
          }
          return cleanup;
        }
      }
    }
  }, [cursor, strokeColor, setCursor, data, dim]);

  return (
    <canvas
      id="canvas"
      ref={c}
      style={{
        width: `${dim.width}px`,
        height: `${dim.height}px`,
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0,
      }}
      className="dark:bg-background bg-slate-300"
    />
  );
}
