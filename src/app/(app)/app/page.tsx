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
    window.addEventListener('resize', () => {
      const height = window.innerHeight;
      const width = window.innerWidth;
      setDim({width, height});
    });
  }, []);

  useEffect(() => {
    if (c.current) {
      let cleanup;
      if (cursor === 'draw') {
        cleanup = PenDraw(c.current, strokeColor);
      } else {
        cleanup = Draw(c.current, cursor, setCursor, strokeColor, data);
      }
      return cleanup;
    }
  }, [cursor, strokeColor, setCursor, data]);

  return (
    <canvas
      id="canvas"
      width={dim.width}
      height={dim.height}
      ref={c}
      className="dark:bg-background bg-slate-300"
    />
  );
}
