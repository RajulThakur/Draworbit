import {STORE_KEY} from '../const/const';
import {Shape} from '../../components/shapes/types';

const isBrowser = typeof window !== 'undefined';

export function getShapes(): Shape[] {
  if (!isBrowser) return [];
  const shapes = localStorage.getItem(`${STORE_KEY}`);
  return shapes ? JSON.parse(shapes) : [];
}

export function saveShapes(shapes: Shape[]) {
  if (!isBrowser) return;
  localStorage.setItem(`${STORE_KEY}`, JSON.stringify(shapes));
}

export function updateShapes(updatedShapes: Shape[]) {
  saveShapes(updatedShapes);
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
}
