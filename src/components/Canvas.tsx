'use client';

import { isPointInShape, renderCanvas } from '@/components/shapes/renderer';
import { useColor } from '@/context/colorContext';
import { useCursor } from '@/context/cursorContext';
import { useSelection } from '@/context/selectionContext';

import type { FocusEvent, MouseEvent, TouchEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import Input from './Input';
import {
  appendShapes,
  clearStorage,
  getShapes,
  updateShapes,
} from '@/helper/storage';
import { Shape } from '@/types/shape';
import { screenToWorld } from '@/math/screenToWorld';
import { worldToScreen } from '@/math/worldToScreen';

export default function Canvas() {
  const c = useRef<HTMLCanvasElement | null>(null);
  const [dim, setDim] = useState({ width: 0, height: 0 });
  const { cursor, setCursor, setScale, scale } = useCursor();
  const { strokeColor } = useColor();
  const { setSelectedShape, setShowOptionMenu } = useSelection();
  const transformRef = useRef({ x: 0, y: 0, scale: scale });
  const dpr = useRef(1);
  const isDrawing = useRef(false);
  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>(0);
  const ShapesRef = useRef<Shape[]>(getShapes() || []);
  const lastPinchDistance = useRef<number>(0);
  const selectedShape = useRef<Shape | null>(null);
  const [textInput, setTextInput] = useState({
    x: 0,
    y: 0,
    show: false,
    value: '',
  });
  useEffect(() => {
    // Update transform scale when scale changes
    transformRef.current.scale = scale;
  }, [scale]);

  useEffect(() => {
    const height = window.innerHeight;
    const width = window.innerWidth;
    setDim({ width, height });

    // Handle window resize
    const handleResize = () => {
      const height = window.innerHeight;
      const width = window.innerWidth;
      setDim({ width, height });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const canvas = c.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
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
    ctx.strokeStyle = strokeColor;

    //clearing canvas
    if (cursor === 'clear all') {
      ShapesRef.current = [];
      setCursor('hand');
      clearStorage();
    }

    //rendering loop
    animationFrameRef.current = renderCanvas(
      canvas,
      ShapesRef.current,
      ctx,
      transformRef.current
    );
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [dim, strokeColor, cursor, setCursor]);

  // Listen for shapesUpdated events to refresh ShapesRef for live updates
  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent<Shape[]>;
      console.log('[Canvas.shapesUpdated] event received', custom.detail?.length);
      if (Array.isArray(custom.detail)) {
        // mutate in place so the render loop's captured array sees updates
        ShapesRef.current.splice(0, ShapesRef.current.length, ...custom.detail);
        // keep selected shape in sync
        if (selectedShape.current) {
          const match = custom.detail.find(s => s.id === selectedShape.current?.id) || null;
          console.log('[Canvas.syncSelected]', { before: selectedShape.current, after: match });
          selectedShape.current = match;
          setSelectedShape(match || null);
          setShowOptionMenu(!!match);
        }
      } else {
        const latest = getShapes();
        ShapesRef.current.splice(0, ShapesRef.current.length, ...latest);
      }
    };
    window.addEventListener('shapesUpdated', handler as EventListener);
    return () => window.removeEventListener('shapesUpdated', handler as EventListener);
  }, [setSelectedShape, setShowOptionMenu]);

  const handleMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
    if (cursor !== 'hand') {
      isDrawing.current = true;
      const { x: offSetX, y: offSetY, scale } = transformRef.current;
      const adjustedX = e.clientX * dpr.current;
      const adjustedY = e.clientY * dpr.current;
      const { x, y } = screenToWorld(
        adjustedX,
        adjustedY,
        offSetX,
        offSetY,
        scale
      );

      //Adding to local storage
      const newShape = {
        id: crypto.randomUUID(),
        x,
        y,
        isSelected: false,
        width: 0,
        height: 0,
        type: cursor,
        data: { src: '' },
        path: cursor === 'draw' ? [{ x, y }] : undefined,
        color: strokeColor,
        opacity: 100,
        strokeWidth: 2,
      };
      ShapesRef.current.push(newShape);
      lastPos.current = {
        x: e.clientX * dpr.current,
        y: e.clientY * dpr.current,
      };
    } else {
      isDragging.current = true;
      lastPos.current = {
        x: e.clientX * dpr.current,
        y: e.clientY * dpr.current,
      };
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging.current && !isDrawing.current) return;

    // ... rest of your existing handleMouseMove code ...
    const dx = e.clientX * dpr.current - lastPos.current.x;
    const dy = e.clientY * dpr.current - lastPos.current.y;
    lastPos.current = {
      x: e.clientX * dpr.current,
      y: e.clientY * dpr.current,
    };
    if (isDrawing.current) {
      const shape = ShapesRef.current;
      const len = shape.length;
      const { x: offSetX, y: offSetY, scale } = transformRef.current;
      const adjustedX = e.clientX * dpr.current;
      const adjustedY = e.clientY * dpr.current;
      const { x, y } = screenToWorld(
        adjustedX,
        adjustedY,
        offSetX,
        offSetY,
        scale
      );
      // Calculate dimensions from initial position
      if (cursor === 'draw') {
        shape[len - 1].path?.push({ x, y });
      } else {
        shape[len - 1].width = x - shape[len - 1].x;
        shape[len - 1].height = y - shape[len - 1].y;
      }
    } else {
      // Update transform without DPR multiplication since transform is in screen coordinates
      transformRef.current.x += dx;
      transformRef.current.y += dy;
    }
  };

  const handleMouseUp = (e: MouseEvent<HTMLCanvasElement>) => {
    if (cursor === 'text') {
      setTextInput({ x: e.clientX, y: e.clientY, show: true, value: '' });
      return;
    }
    if (isDrawing.current) {
      //Updating position in local storage
      const shapes = ShapesRef.current;
      updateShapes(shapes);

      //resetting hand
      setCursor('hand');
      isDrawing.current = false;
    } else {
      isDragging.current = false;
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    // e.preventDefault();

    // Get mouse position on screen
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Get current transform values
    const {
      x: offsetX,
      y: offsetY,
      scale: currentScale,
    } = transformRef.current;

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
    const newScale = Math.min(Math.max(currentScale * zoomFactor, 0.1), 10);

    // Limit scale range
    transformRef.current.scale = newScale;
    // Update cursor scale
    setScale(Math.abs(newScale));

    // Calculate new offset to keep mouse position fixed
    const newOffsetX = mouseX - worldPos.x * transformRef.current.scale;
    const newOffsetY = mouseY - worldPos.y * transformRef.current.scale;

    // Update transform
    transformRef.current.x = newOffsetX;
    transformRef.current.y = newOffsetY;
  };

  const handlePinchZoom = (e: TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (e.touches.length !== 2) return;

    const touch1 = e.touches[0];
    const touch2 = e.touches[1];

    // Calculate distance between two touches
    const currentDistance = Math.hypot(
      touch2.clientX - touch1.clientX,
      touch2.clientY - touch1.clientY
    );

    if (lastPinchDistance.current === 0) {
      lastPinchDistance.current = currentDistance;
      return;
    }

    // Calculate zoom factor
    const zoomFactor = currentDistance / lastPinchDistance.current;
    const newScale = transformRef.current.scale * zoomFactor;

    // Limit scale range
    transformRef.current.scale = Math.min(Math.max(newScale, 0.5), 10);

    // Calculate center point of pinch
    const centerX = (touch1.clientX + touch2.clientX) / 2;
    const centerY = (touch1.clientY + touch2.clientY) / 2;

    // Update transform to zoom towards pinch center
    const {
      x: offsetX,
      y: offsetY,
      scale: currentScale,
    } = transformRef.current;
    const worldPos = screenToWorld(
      centerX,
      centerY,
      offsetX,
      offsetY,
      currentScale
    );

    const newOffsetX = centerX - worldPos.x * transformRef.current.scale;
    const newOffsetY = centerY - worldPos.y * transformRef.current.scale;

    transformRef.current.x = newOffsetX;
    transformRef.current.y = newOffsetY;

    lastPinchDistance.current = currentDistance;
  };

  const handleTouchStart = (e: TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (e.touches.length === 2) {
      lastPinchDistance.current = 0;
      return;
    }
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousedown', {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });
    handleMouseDown(mouseEvent as unknown as MouseEvent<HTMLCanvasElement>);
  };

  const handleTouchMove = (e: TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (e.touches.length === 2) {
      handlePinchZoom(e);
      return;
    }
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousemove', {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });
    handleMouseMove(mouseEvent as unknown as MouseEvent<HTMLCanvasElement>);
  };

  const handleTouchEnd = (e: TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    lastPinchDistance.current = 0;
    const mouseEvent = new MouseEvent('mouseup', { clientX: 0, clientY: 0 });
    handleMouseUp(mouseEvent as unknown as MouseEvent<HTMLCanvasElement>);
  };

  const handleTextInputBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
    if (textInput.value.trim()) {
      const { x: offSetX, y: offSetY, scale } = transformRef.current;
      const { x, y } = screenToWorld(
        textInput.x * dpr.current,
        textInput.y * dpr.current,
        offSetX,
        offSetY,
        scale
      );
      const height = e.target.scrollHeight;
      const width = e.target.scrollWidth;
      console.log(`h-${height} w-${width}`);

      const real = worldToScreen(x, y, offSetX, offSetY, scale);
      console.log(real);

      const newShape: Shape = {
        id: crypto.randomUUID(),
        x,
        y,
        isSelected: false,
        width,
        height,
        type: 'text' as Shape['type'], // Ensure 'text' matches the expected type
        text: {
          value: textInput.value,
          fontSize: 'md',
          fontFamily: 'Arial',
          fontStyle: 'normal',
        },
        data: { src: '' },
      };
      appendShapes([newShape]);
      ShapesRef.current.push(newShape);
      // select the new text and show option menu
      ShapesRef.current.forEach(s => (s.isSelected = s.id === newShape.id));
      selectedShape.current = newShape;
      setSelectedShape(newShape);
      setShowOptionMenu(true);
    }
    setTextInput({ x: 0, y: 0, show: false, value: '' });
    setCursor('hand');
  };
  function handleClick(e: MouseEvent<HTMLCanvasElement>) {
    const point = { x: e.clientX * dpr.current, y: e.clientY * dpr.current };
    const updatedPoints = screenToWorld(
      point.x,
      point.y,
      transformRef.current.x,
      transformRef.current.y,
      transformRef.current.scale
    );

    let clickedShape: Shape | null = null;

    // Check if any shape was clicked
    for (const shape of ShapesRef.current) {
      const isPointing = isPointInShape(updatedPoints, shape);
      if (isPointing) {
        clickedShape = shape;
        break;
      }
    }
    if (clickedShape) {
      // Deselect all other shapes
      ShapesRef.current.forEach(shape => {
        shape.isSelected = false;
      });

      // Select the clicked shape
      clickedShape.isSelected = true;
      selectedShape.current = clickedShape;
      setSelectedShape(clickedShape);
      setShowOptionMenu(true);
    } else {
      // Clicked on empty space - deselect all
      ShapesRef.current.forEach(shape => {
        shape.isSelected = false;
      });
      selectedShape.current = null;
      setSelectedShape(null);
      setShowOptionMenu(false);
    }
  }

  return (
    <>
      <canvas
        id='canvas'
        ref={c}
        style={{
          width: `${dim.width}px`,
          height: `${dim.height}px`,
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 0,
          touchAction: 'none', // Prevent default touch actions
        }}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className='dark:bg-background bg-white'
      />
      {textInput.show && (
        <Input
          handleTextInputBlur={handleTextInputBlur}
          transformRef={transformRef}
          textInput={textInput}
          setTextInput={setTextInput}
        />
      )}
    </>
  );
}
