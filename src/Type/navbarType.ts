import {ReactNode} from 'react';

export type NavbarType =
  | 'hand'
  | 'arrow'
  | 'circle'
  | 'rectangle'
  | 'line'
  | 'draw'
  | 'picture'
  | 'text'
  | 'diamond'
  | 'eraser'
  | 'square';
export interface NavOptions {
  name: NavbarType;
  icon: ReactNode;
}
