'use client';

import {useEffect, useRef, useState} from 'react';
import {useRenderLoop} from './hooks/useRenderLoop';
import {useSize} from './hooks/useSize';
import CanvasStore from './store/CanvasStore';
import {Position} from './components/Position';
import {Shape, BlockRendererProps, CircleRendererProps} from './types';

const InfiniteCanvas = ({frame}: {frame: number}) => {
  const scale = CanvasStore.scale;
  const [blocks, setBlocks] = useState<Shape[]>(() =>
    Array.from({length: 9}).map((_, i) => {
      const row = Math.floor(i / 3);
      const col = i % 3;
      return {
        x: col * 400,
        y: row * 400,
        width: 300,
        height: 300,
        color: `hsl(${i * 40}, 70%, 50%)`,
        text: `Block ${i + 1}`,
        type: 'block' as const,
      };
    })
  );

  const [dragging, setDragging] = useState<{
    blockIndex: number;
    startX: number;
    startY: number;
    originalX: number;
    originalY: number;
  } | null>(null);

  const handlePointerDown = (e: React.PointerEvent, index: number) => {
    const block = blocks[index];
    setDragging({
      blockIndex: index,
      startX: e.clientX,
      startY: e.clientY,
      originalX: block.x,
      originalY: block.y,
    });
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;

    const deltaX = (e.clientX - dragging.startX) / scale.x;
    const deltaY = (e.clientY - dragging.startY) / scale.y;

    setBlocks((prevBlocks) => {
      const newBlocks = [...prevBlocks];
      newBlocks[dragging.blockIndex] = {
        ...newBlocks[dragging.blockIndex],
        x: dragging.originalX + deltaX,
        y: dragging.originalY + deltaY,
      };
      return newBlocks;
    });
  };

  const handlePointerUp = () => {
    setDragging(null);
  };

  const eventHandlers = {
    onPointerMove: handlePointerMove,
    onPointerUp: handlePointerUp,
    onPointerDown: handlePointerDown,
  };

  return (
    <div
      className="absolute inset-0"
      style={{
        transform: `scale(${scale.x}, ${scale.y})`,
        transformOrigin: 'top left',
      }}>
      {blocks.map((block, i) => (
        <Position
          key={i}
          left={block.x}
          top={block.y}
          width={block.width}
          height={block.height}>
          {block.type === 'block' ? (
            <BlockRenderer
              shape={block as Shape & {type: 'block'}}
              index={i}
              handleEvent={eventHandlers}
            />
          ) : (
            <CircleRenderer
              shape={block as Shape & {type: 'circle'}}
              index={i}
              handleEvent={eventHandlers}
            />
          )}
        </Position>
      ))}
    </div>
  );
};

const BlockRenderer = ({shape, index, handleEvent}: BlockRendererProps) => {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <div className="relative">
      {isClicked && (
        <div className="absolute inset-0 border-2 border-blue-500">
          <button className="absolute top-0 left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-blue-500 bg-white"></button>
          <button className="absolute bottom-0 left-1/2 h-4 w-4 -translate-x-1/2 translate-y-1/2 rounded-full border-2 border-blue-500 bg-white"></button>
          <button className="absolute top-1/2 left-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-blue-500 bg-white"></button>
          <button className="absolute top-1/2 right-0 h-4 w-4 translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-blue-500 bg-white"></button>
        </div>
      )}
      <div
        className="flex cursor-move items-center justify-center text-xl font-bold text-white select-none"
        style={{
          width: shape.width,
          height: shape.height,
          backgroundColor: shape.color,
          touchAction: 'none',
        }}
        onPointerDown={(e) => {
          setIsClicked((current) => !current);
          handleEvent.onPointerDown(e, index);
        }}
        onPointerMove={handleEvent.onPointerMove}
        onPointerUp={handleEvent.onPointerUp}
        onPointerCancel={handleEvent.onPointerUp}>
        {shape.text}
      </div>
    </div>
  );
};

const CircleRenderer = ({shape, index, handleEvent}: CircleRendererProps) => {
  return (
    <div
      className="flex cursor-move items-center justify-center rounded-full text-xl font-bold text-white select-none"
      style={{
        width: shape.width,
        height: shape.height,
        backgroundColor: shape.color,
        touchAction: 'none',
      }}
      onPointerDown={(e) => handleEvent.onPointerDown(e, index)}
      onPointerMove={handleEvent.onPointerMove}
      onPointerUp={handleEvent.onPointerUp}
      onPointerCancel={handleEvent.onPointerUp}>
      {shape.text}
    </div>
  );
};

const CanvasRoot = () => {
  const canvas = useRef<HTMLDivElement>(null);
  const [width, height] = useSize(canvas);

  useEffect(() => {
    if (width === 0 || height === 0) return;
    CanvasStore.initialize(width, height);
  }, [width, height]);

  const frame = useRenderLoop(100);

  const handleWheel = (event: React.WheelEvent) => {
    const friction = 0.5;
    const deltaX = event.deltaX * friction;
    const deltaY = event.deltaY * friction;

    if (!event.ctrlKey) {
      CanvasStore.moveCamera(deltaX, deltaY);
    } else {
      CanvasStore.zoomCamera(deltaX, deltaY);
    }
  };

  const handlePointerMove = (event: React.PointerEvent) => {
    CanvasStore.movePointer(event.clientX, event.clientY);
  };

  return (
    <div className="h-full w-full">
      <div
        className="relative h-full w-full overflow-hidden overscroll-none"
        ref={canvas}
        onWheel={handleWheel}
        onPointerMove={handlePointerMove}>
        <InfiniteCanvas frame={frame} />
      </div>
    </div>
  );
};

export default CanvasRoot;
