import {FontSize} from '@/components/shapes/types';

export function SizeToPx(size: FontSize): string {
  switch (size) {
    case 'xs':
      return '16px';
    case 'sm':
      return '18px';
    case 'base':
      return '20px';
    case 'md':
      return '22px';
    case 'lg':
      return '24px';
    case 'xl':
      return '26px';
    case '2xl':
      return '30px';
    default:
      return '20px';
  }
}
