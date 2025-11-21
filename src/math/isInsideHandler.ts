export function isInsideHandle(
  mouseX: number,
  mouseY: number,
  handle: { x: number; y: number; width: number; height: number }
) {
  return (
    mouseX >= handle.x &&
    mouseX <= handle.x + handle.width &&
    mouseY >= handle.y &&
    mouseY <= handle.y + handle.height
  );
}
