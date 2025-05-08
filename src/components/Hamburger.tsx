'use client';
import Button from '@/ui/Button';
import {AlignJustify, FileDown, ShieldQuestion} from 'lucide-react';
import {useState} from 'react';

function Hamburger() {
  const hamBurgerMenu = [
    {title: 'Help', icon: <ShieldQuestion size={18} />},
    {title: 'Export', icon: <FileDown size={18} />},
  ];
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <>
      {/* Hamburger Button */}
      <Button
        className="fixed right-4 bottom-4 md:top-4"
        onClick={() => setIsExpanded(!isExpanded)}>
        <AlignJustify className="size-4 md:size-5 lg:size-6" />
      </Button>

      {/* Menu */}
      {isExpanded && (
        <div className="fixed right-4 bottom-14 flex max-w-32 flex-col space-y-1 rounded-md bg-white p-1.5 shadow-lg transition-all md:top-16 md:w-54 md:p-2 dark:bg-slate-800">
          {hamBurgerMenu.map((menu, index) => (
            <div
              key={index}
              className="flex cursor-pointer items-center space-x-2 rounded-md px-2 py-1.5 hover:bg-gray-100 md:px-3 md:py-2 dark:hover:bg-slate-700">
              <span className="dark:text-foreground size-4 text-purple-500 md:size-5">
                {menu.icon}
              </span>
              <span className="text-xs text-gray-700 md:text-sm dark:text-slate-200">
                {menu.title}
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Hamburger;
