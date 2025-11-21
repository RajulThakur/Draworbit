import { STORE_KEY } from '@/const/const';
import { Shape } from '@/types/shape';

const isBrowser = typeof window !== 'undefined';

export function getShapes(): Shape[] {
  if (!isBrowser) return [];
  const shapes = localStorage.getItem(`${STORE_KEY}`);
  return shapes ? JSON.parse(shapes) : [];
}

export function saveShapes(shapes: Shape[]) {
  if (!isBrowser) return;
  localStorage.setItem(`${STORE_KEY}`, JSON.stringify(shapes));
  try {
    // debug
    console.log('[storage.saveShapes] count=', shapes.length);
    window.dispatchEvent(new CustomEvent('shapesUpdated', { detail: shapes }));
  } catch {}
}

export function updateShapes(updatedShapes: Shape[]) {
  saveShapes(updatedShapes);
}

export function updateShape(shapeId: string, updates: Partial<Shape>) {
  const shapes = getShapes();
  const updatedShapes = shapes.map(shape =>
    shape.id === shapeId ? { ...shape, ...updates } : shape
  );
  // debug
  console.log('[storage.updateShape]', { shapeId, updates });
  saveShapes(updatedShapes);
  return updatedShapes;
}

export function mutateShape(
  shapeId: string,
  updater: (shape: Shape) => Shape
): Shape[] {
  const shapes = getShapes();
  const updatedShapes = shapes.map(shape =>
    shape.id === shapeId ? updater(shape) : shape
  );
  // debug
  console.log('[storage.mutateShape]', { shapeId, before: shapes.find(s => s.id === shapeId), after: updatedShapes.find(s => s.id === shapeId) });
  saveShapes(updatedShapes);
  return updatedShapes;
}

export function appendShapes(newShapes: Shape[]) {
  const currentShapes = getShapes();
  const updatedShapes = [...currentShapes, ...newShapes];
  saveShapes(updatedShapes);
  return updatedShapes;
}

export function clearStorage() {
  if (!isBrowser) return;
  localStorage.removeItem(`${STORE_KEY}`);
  try {
    window.dispatchEvent(new CustomEvent('shapesUpdated', { detail: [] }));
  } catch {}
}
