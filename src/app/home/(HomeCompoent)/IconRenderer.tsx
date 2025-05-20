import ChevronDown from '../../components/icons/Chevron-Down';
import ChevronLeft from '../../components/icons/Chevron-Left';
import ChevronRight from '../../components/icons/Chevron-Right';
import ChevronUp from '../../components/icons/Chevron-Up';
import Command from '../../components/icons/Command';
import Option from '../../components/icons/Option';
import {IconProps} from '../../components/icons/Types';

type IconName =
  | 'chevron-up'
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-right'
  | 'command'
  | 'option'
  | 'control';
type IconPosition = 'top' | 'bottom' | 'left' | 'right' | 'center';

interface IconRendererProps extends IconProps {
  name: IconName;
  position?: IconPosition;
}

const iconComponents = {
  'chevron-up': ChevronUp,
  'chevron-down': ChevronDown,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  command: Command,
  option: Option,
  control: ChevronUp,
};

const getPositionClasses = (position: IconPosition = 'center') => {
  const positions = {
    top: 'items-start justify-center',
    bottom: 'items-end justify-center',
    left: 'items-center justify-start',
    right: 'items-center justify-end',
    center: 'items-center justify-center',
  };
  return positions[position];
};

export default function IconRenderer({name, position}: IconRendererProps) {
  const IconComponent = iconComponents[name];
  if (!IconComponent) return null;
  return (
    <div className={`flex ${getPositionClasses(position)}`}>
      <div
        className={`flex size-[calc(100dvw/70)] ${getPositionClasses(position)}`}>
        <IconComponent />
      </div>
    </div>
  );
}
