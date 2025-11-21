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
  return { x, y };
}
