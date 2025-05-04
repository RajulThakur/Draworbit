export interface Shape {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  text: string;
  type: 'block' | 'circle';
}

export interface EventHandlers {
  onPointerMove: (e: React.PointerEvent) => void;
  onPointerUp: () => void;
  onPointerDown: (e: React.PointerEvent, index: number) => void;
}

export interface RendererProps {
  shape: Shape;
  index: number;
  handleEvent: EventHandlers;
}

export interface BlockRendererProps extends RendererProps {
  shape: Shape & {type: 'block'};
}

export interface CircleRendererProps extends RendererProps {
  shape: Shape & {type: 'circle'};
}
