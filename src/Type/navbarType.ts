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
  | 'eraser';
export interface NavOptions {
  name: NavbarType;
  icon: ReactNode;
}
