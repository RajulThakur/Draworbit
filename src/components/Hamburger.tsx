'use client';
import Button from '@/ui/Button';
import {AlignJustify, FileDown, ShieldQuestion, Trash} from 'lucide-react';
import {useState} from 'react';

function Hamburger() {
  const hamBurgerMenu = [
    {title: 'Reset the canvas', icon: <Trash size={18} />},
    {title: 'Help', icon: <ShieldQuestion size={18} />},
    {title: 'Export', icon: <FileDown size={18} />},
  ];
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <>
      {/* Hamburger Button */}
      <Button
        className="text-foreground fixed top-4 right-4 bg-purple-500 hover:bg-purple-600"
        onClick={() => setIsExpanded(!isExpanded)}>
        <AlignJustify />
      </Button>

      {/* Menu */}
      {isExpanded && (
        <div className="fixed top-16 right-4 flex w-54 flex-col space-y-2 rounded-md bg-white px-2 py-4 shadow-lg transition-all dark:bg-slate-800">
          {hamBurgerMenu.map((menu, index) => (
            <div
              key={index}
              className="flex cursor-pointer items-center space-x-2 rounded-md px-3 py-1 hover:bg-gray-100 dark:hover:bg-slate-700">
              <span className="dark:text-foreground text-purple-500">
                {menu.icon}
              </span>
              <span className="text-gray-700 dark:text-slate-200">
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
