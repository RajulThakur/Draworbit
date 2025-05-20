import {Data} from '@/context/dataContext';
import {NavbarType} from '@/Type/navbarType';

export interface Shape {
  id: string;
  type: NavbarType;
  x: number;
  y: number;
  width: number;
  path?: Path[];
  height: number;
  text?: string;
  color?: string;
  data: Data;
  isSelected: boolean;
}

export interface Path {
  x: number;
  y: number;
}
export interface Point{
  x: number;
  y: number;
}