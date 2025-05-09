import {Data} from '@/context/dataContext';
import {NavbarType} from '@/Type/navbarType';

export interface Shape {
  type: NavbarType;
  x: number;
  y: number;
  width: number;
  path?: Path[];
  height: number;
  text?: string;
  color?: string;
  data: Data;
}

export interface Path {
  x: number;
  y: number;
}