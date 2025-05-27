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
        <AlignJustify className="stroke-foreground size-4 md:size-5 lg:size-6 dark:stroke-white" />
      </Button>

      {/* Menu */}
      {isExpanded && (
        <div className="fixed right-6 flex max-w-34 top-[calc(100%-8rem)] md:top-20 flex-col space-y-1 rounded-md bg-slate-100 p-1.5 shadow-lg transition-all md:w-54 md:p-2 dark:bg-slate-800">
          {hamBurgerMenu.map((menu, index) => (
            <div
              key={index}
              className="flex cursor-pointer items-center space-x-2 rounded-md px-2 py-1.5 hover:bg-purple-100 md:px-3 md:py-2 dark:hover:bg-slate-700">
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
