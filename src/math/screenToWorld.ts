export function screenToWorld(
  screenX: number,
  screenY: number,
  offsetX: number,
  offsetY: number,
  scale: number
) {
  // Convert screen coordinates to Infinite world coordinates
  const x = (screenX - offsetX) / scale;
  const y = (screenY - offsetY) / scale;
  return { x, y };
}
