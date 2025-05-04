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
  Image,
  LetterText,
  Pencil,
  RectangleHorizontal,
  Slash,
  Square,
} from 'lucide-react';
import {ChangeEvent, useRef} from 'react';
function MainNav() {
  const options: NavOptions[] = [
    {name: 'hand', icon: <Hand strokeWidth={1.69} />},
    {name: 'rectangle', icon: <RectangleHorizontal strokeWidth={1.69} />},
    {name: 'square', icon: <Square strokeWidth={1.69} />},
    {name: 'diamond', icon: <Diamond strokeWidth={1.69} />},
    {name: 'circle', icon: <Circle strokeWidth={1.69} />},
    {name: 'line', icon: <Slash strokeWidth={1.7} />},
    {name: 'arrow', icon: <ArrowRight strokeWidth={1.69} />},
    {name: 'draw', icon: <Pencil strokeWidth={1.69} />},
    {name: 'picture', icon: <Image strokeWidth={1.69} />},
    {name: 'text', icon: <LetterText strokeWidth={1.69} />},
    {name: 'eraser', icon: <Eraser strokeWidth={1.69} />},
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

      console.log('Selected file:', file);
      console.log('Image URL for preview:', imageUrl);
    }
  };
  return (
    <div className="fixed top-4 right-0 left-0 z-10 mx-auto flex max-w-screen-sm items-center justify-evenly space-x-2 rounded-xl bg-gray-100 px-6 py-1 dark:bg-slate-800">
      {options.map((option) => (
        <button
          onClick={
            option.name === 'picture'
              ? handlePictureClick
              : () => setCursor(option.name)
          }
          key={option.name}
          className={`flex size-13 flex-col items-center justify-between rounded-md p-2 text-[0.69em] hover:bg-blue-100 dark:hover:bg-slate-700 ${option.name === cursor ? 'bg-blue-200 dark:bg-slate-700' : ''}`}>
          {option.icon}
          <span className="capitalize">{option.name}</span>
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
