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
  return {x, y};
}

export function worldToScreen(
  worldX: number,
  worldY: number,
  offsetX: number,
  offsetY: number,
  scale: number
) {
  // Convert Infinite world coordinates to screen coordinates
  const x = (worldX * scale + offsetX) / 2;
  const y = (worldY * scale + offsetY) / 2;
  return {x, y};
}

export function isInsideHandle(
  mouseX: number,
  mouseY: number,
  handle: {x: number; y: number; width: number; height: number}
) {
  return (
    mouseX >= handle.x &&
    mouseX <= handle.x + handle.width &&
    mouseY >= handle.y &&
    mouseY <= handle.y + handle.height
  );
}
