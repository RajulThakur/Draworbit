'use client';
import {useCursor} from '@/context/cursorContext';
import {useData} from '@/context/dataContext';
import {NavOptions} from '@/Type/navbarType';
import {
  ArrowRight,
  Circle,
  Diamond,
  Eraser,
  Hand,
  LetterText,
  Pencil,
  RectangleHorizontal,
  Slash,
  Square,
  Trash2,
} from 'lucide-react';
import {ChangeEvent, useRef} from 'react';

function MainNav() {
  const iconStyle = 'size-4 md:size-5';
  const options: NavOptions[] = [
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
      name: 'eraser',
      icon: (
        <Eraser
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
  const {setCursor, cursor} = useCursor();
  const {setData} = useData();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handlePictureClick = () => {
    setCursor('picture');
    // Trigger the hidden file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      // Create URL for preview
      const imageUrl = URL.createObjectURL(file);
      setData({src: imageUrl});
    }
  };
  return (
    <div className="fixed top-4 right-2 left-2 z-10 mx-auto grid w-auto max-w-100 grid-cols-6 items-center justify-between gap-x-0.5 gap-y-1 rounded-xl bg-slate-100 p-2 md:flex md:max-w-screen-sm md:p-1.5 dark:bg-slate-800">
      {options.map((option) => (
        <button
          onClick={
            option.name === 'picture'
              ? handlePictureClick
              : () => setCursor(option.name)
          }
          key={option.name}
          className={`flex w-full flex-col items-center justify-center gap-0.5 rounded-md p-0.5 hover:bg-blue-100 md:size-12 dark:hover:bg-slate-700 ${
            option.name === cursor ? 'bg-blue-200 dark:bg-slate-700' : ''
          }`}>
          {option.icon}
          <span className="max-w-full overflow-hidden text-center text-[0.60em] text-ellipsis whitespace-nowrap capitalize">
            {option.name}
          </span>
        </button>
      ))}
      {/* Hidden file input outside of the button map */}
      <input
        ref={fileInputRef}
        className="hidden"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
}

export default MainNav;
