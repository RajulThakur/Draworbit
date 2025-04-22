import {Data} from '@/context/dataContext';
import {NavbarType} from '@/Type/navbarType';

export interface Shape {
  type: NavbarType;
  x: number;
  y: number;
  width: number;
  path?: string;
  height: number;
  fontSize?: number;
  color?: string;
  data: Data;
}
