'use client';
import {useRef, useState, useEffect} from 'react';
import type {MouseEvent} from 'react';

interface Element {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function InfiniteCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [elements, setElements] = useState<Element[]>([]);
  const isDragging = useRef(false);
  const lastPos = useRef({x: 0, y: 0});
  const dpr = useRef(1);
  const [dim, setDim] = useState({width: 0, height: 0});
  const transformRef = useRef({x: 0, y: 0, scale: 1});
  const animationFrameRef = useRef<number>(0);

  const screenToWorld = (
    screenX: number,
    screenY: number,
    offsetX: number,
    offsetY: number,
    scale: number
  ) => {
    // Convert screen coordinates to world coordinates
    const x = (screenX - offsetX) / scale;
    const y = (screenY - offsetY) / scale;
    return {x, y};
  };
  // const worldToScreen = (
  //   worldX: number,
  //   worldY: number,
  //   offsetX: number,
  //   offsetY: number,
  //   scale: number
  // ) => {
  //   // Convert world coordinates to screen coordinates
  //   const screenX = worldX * scale + offsetX;
  //   const screenY = worldY * scale + offsetY;
  //   console.log(`worldX: ${worldX}, worldY: ${worldY}`);
  //   console.log(`offsetX: ${offsetX}, offsetY: ${offsetY}`);
  //   console.log(`scale: ${scale}`);
  //   console.log(`screenX: ${screenX}, screenY: ${screenY}`);
  //   // Return the screen coordinates
  //   return {x: (screenX - offsetX) / scale, y: (screenY - offsetY) / scale};
  // };

  useEffect(() => {
    const height = window.innerHeight;
    const width = window.innerWidth;
    setDim({width, height});

    // Add initial centered rectangle
    const centerX = width / 2;
    const centerY = height / 2;
    setElements([{x: centerX - 50, y: centerY - 30, width: 100, height: 60}]);

    const handleResize = () => {
      const height = window.innerHeight;
      const width = window.innerWidth;
      setDim({width, height});
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', {willReadFrequently: true});
    if (!ctx) return;

    dpr.current = window.devicePixelRatio || 1;
    const dprValue = dpr.current;
    canvas.width = dim.width * dprValue;
    canvas.height = dim.height * dprValue;
    ctx.scale(dprValue, dprValue);

    ctx.imageSmoothingEnabled = false;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 2;

    const render = () => {
      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const {x, y, scale} = transformRef.current;
      ctx.setTransform(scale, 0, 0, scale, x, y);

      elements.forEach((el) => {
        ctx.beginPath();
        ctx.strokeStyle = 'red';
        ctx.rect(el.x, el.y, el.width, el.height);
        ctx.stroke();
      });

      ctx.restore();
      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [elements, dim]);

  const handleMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
    isDragging.current = true;
    lastPos.current = {x: e.clientX, y: e.clientY};
  };

  const handleMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging.current) return;

    const dx = (e.clientX - lastPos.current.x) * dpr.current;
    const dy = (e.clientY - lastPos.current.y) * dpr.current;
    lastPos.current = {x: e.clientX, y: e.clientY};

    transformRef.current.x += dx;
    transformRef.current.y += dy;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();

    // Get mouse position on screen
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Get current transform values
    const {x: offsetX, y: offsetY, scale: currentScale} = transformRef.current;

    // Calculate the world position of the mouse
    const worldPos = screenToWorld(
      mouseX,
      mouseY,
      offsetX,
      offsetY,
      currentScale
    );

    // Calculate zoom factor based on scroll delta
    const zoomFactor = Math.pow(1.01, -e.deltaY);
    const newScale = currentScale * zoomFactor;

    // Limit scale range
    transformRef.current.scale = Math.min(Math.max(newScale, 0.1), 10);

    // Calculate new offset to keep mouse position fixed
    const newOffsetX = mouseX - worldPos.x * transformRef.current.scale;
    const newOffsetY = mouseY - worldPos.y * transformRef.current.scale;

    // Update transform
    transformRef.current.x = newOffsetX;
    transformRef.current.y = newOffsetY;
  };

  return (
    <canvas
      style={{
        width: `${dim.width}px`,
        height: `${dim.height}px`,
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0,
      }}
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
    />
  );
}
