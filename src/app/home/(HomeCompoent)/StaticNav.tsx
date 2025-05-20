import {
  ArrowRight,
  Circle,
  Diamond,
  Hand,
  LetterText,
  Pencil,
  RectangleHorizontal,
  Slash,
  Square,
  Trash2,
} from 'lucide-react';

function StaticNav() {
  const iconStyle = 'size-4 md:size-5';
  const options = [
    {
      name: 'hand',
      icon: (
        <Hand
          strokeWidth={1.69}
          className={`${iconStyle}`}
        />
      ),
    },
    {
      name: 'rectangle',
      icon: (
        <RectangleHorizontal
          className={`${iconStyle}`}
          strokeWidth={1.69}
        />
      ),
    },
    {
      name: 'square',
      icon: (
        <Square
          className={`${iconStyle}`}
          strokeWidth={1.69}
        />
      ),
    },
    {
      name: 'diamond',
      icon: (
        <Diamond
          className={`${iconStyle}`}
          strokeWidth={1.69}
        />
      ),
    },
    {
      name: 'circle',
      icon: (
        <Circle
          className={`${iconStyle}`}
          strokeWidth={1.69}
        />
      ),
    },
    {
      name: 'line',
      icon: (
        <Slash
          className={`${iconStyle}`}
          strokeWidth={1.7}
        />
      ),
    },
    {
      name: 'arrow',
      icon: (
        <ArrowRight
          className={`${iconStyle}`}
          strokeWidth={1.69}
        />
      ),
    },
    {
      name: 'draw',
      icon: (
        <Pencil
          className={`${iconStyle}`}
          strokeWidth={1.69}
        />
      ),
    },
    {
      name: 'text',
      icon: (
        <LetterText
          className={`${iconStyle}`}
          strokeWidth={1.69}
        />
      ),
    },
    {
      name: 'clear all',
      icon: (
        <Trash2
          className={`${iconStyle}`}
          strokeWidth={1.69}
        />
      ),
    },
  ];

  return (
    <div className="absolute top-4 right-2 left-2 z-10 mx-auto grid w-auto max-w-100 grid-cols-6 items-center justify-between gap-x-0.5 gap-y-1 rounded-xl bg-slate-100/80 p-2  duration-300 md:flex md:max-w-screen-sm md:p-1.5 dark:bg-slate-800/80">
      {options.map((option) => (
        <div
          key={option.name}
          className="flex w-full flex-col items-center justify-center gap-0.5 rounded-md p-0.5 md:size-12">
          {option.icon}
          <span className="max-w-full overflow-hidden text-center text-[0.60em] text-ellipsis whitespace-nowrap capitalize">
            {option.name}
          </span>
        </div>
      ))}
    </div>
  );
}

export default StaticNav;
