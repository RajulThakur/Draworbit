import {FontSize} from '@/components/shapes/types';

export function SizeToPx(size: FontSize): string {
  switch (size) {
    case 'sm':
      return '30px';
    case 'base':
      return '45px';
    case 'md':
      return '66px';
    case 'lg':
      return '75px';
    default:
      return '45px';
  }
}
