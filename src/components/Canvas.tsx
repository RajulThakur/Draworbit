'use client';
import {useColor} from '@/context/colorContext';
import {useCursor} from '@/context/cursorContext';
import {MouseEvent, useEffect, useRef, useState} from 'react';
import {useData} from '@/context/dataContext';
import {PenDraw} from '@/app/_draw/penDraw';
import {Draw} from '@/app/_draw/draw';

export default function Canvas() {
  const c = useRef<HTMLCanvasElement | null>(null);
  const [dim, setDim] = useState({width: 0, height: 0});
  const {cursor, setCursor, scale} = useCursor();
  const {data} = useData();
  const {strokeColor} = useColor();
  const isDragging = useRef(false);
  const lastPos = useRef({x: 0, y: 0});

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
    if (cursor === 'hand') {
      return;
    }
    if (c.current) {
      const canvas = c.current;
      const ctx = canvas.getContext('2d', {willReadFrequently: true});

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
        let cleanup;
        if (cursor === 'draw') {
          cleanup = PenDraw(canvas, strokeColor);
        } else {
          cleanup = Draw(canvas, cursor, setCursor, strokeColor, data);
        }
        return cleanup;
      }
    }
  }, [cursor, strokeColor, setCursor, data, dim, scale]);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging.current) return;
    console.log('initial pos', lastPos.current);
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    lastPos.current = {x: e.clientX, y: e.clientY};
  };

  const handleMouseUp = () => {
    console.log('mouse up');
    console.log('last pos', lastPos.current);
    isDragging.current = false;
  };

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
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className="dark:bg-background bg-slate-300"
    />
  );
}
