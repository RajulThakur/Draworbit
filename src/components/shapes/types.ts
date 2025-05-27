import {Data} from '@/context/dataContext';
import {NavbarType} from '@/Type/navbarType';

export interface Shape {
  id: string;
  type: NavbarType;
  x: number;
  y: number;
  width: number;
  height: number;
  path?: Path[];
  text?: Text;
  color?: string;
  data: Data;
  isSelected: boolean;
}

export interface Path {
  x: number;
  y: number;
}
export interface Point {
  x: number;
  y: number;
}
export interface Text {
  value: string;
  fontSize: FontSize;
  fontFamily: string;
  fontStyle: FontStyle;
}
export type FontSize = 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl';
export type FontStyle = 'bold' | 'italic' | 'semibold';
