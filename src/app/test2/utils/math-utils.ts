interface Bounds {
  left: number;
  top: number;
  width: number;
  height: number;
}

export function inBounds(rect: Bounds, bounds: Bounds): boolean {
  return (
    rect.left + rect.width >= bounds.left &&
    rect.left <= bounds.left + bounds.width &&
    rect.top + rect.height >= bounds.top &&
    rect.top <= bounds.top + bounds.height
  );
}
