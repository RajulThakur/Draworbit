'use client';
import {useColor} from '@/context/colorContext';
import {useCursor} from '@/context/cursorContext';
import {useEffect, useRef, useState} from 'react';
import {Draw} from '../../_draw/draw';

export default function Dashboard() {
  const c = useRef<HTMLCanvasElement | null>(null);
  const [dim, setDim] = useState({width: 0, height: 0});
  const {cursor, setCursor} = useCursor();
  const {strokeColor} = useColor();

  useEffect(() => {
    const height = window.innerHeight;
    const width = window.innerWidth;
    setDim({width, height});
    window.addEventListener('resize', () => {
      const height = window.innerHeight;
      const width = window.innerWidth;
      setDim({width, height});
    });
  }, []);

  useEffect(() => {
    if (c.current) {
      const cleanup = Draw(c.current, cursor, setCursor, strokeColor);
      return cleanup;
    }
  }, [cursor, strokeColor, setCursor]);

  return (
    <canvas
      id="canvas"
      width={dim.width}
      height={dim.height}
      ref={c}
      className="dark:bg-background bg-slate-200"
    />
  );
}
