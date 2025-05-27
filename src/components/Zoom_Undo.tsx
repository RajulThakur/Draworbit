'use client';
import {useCursor} from '@/context/cursorContext';
import Button from '@/ui/Button';
import {Minus, Plus, Redo, Undo} from 'lucide-react';

function Zoom_Undo() {
  const {setScale, scale} = useCursor();

  function handlePlusScale() {
    setScale((prev) => Math.round((prev + 0.1) * 10) / 10);
  }

  function handleMinusScale() {
    setScale((prev) => Math.round((prev - 0.1) * 10) / 10);
  }

  return (
    <div className="fixed bottom-4 left-4 flex items-center gap-2 md:gap-3">
      <div className="flex items-center justify-center rounded-xl bg-purple-300 dark:bg-slate-800">
        <span
          onClick={handlePlusScale}
          className="rounded-l-xl p-1.5 transition-all hover:bg-purple-400 md:p-2 lg:p-3 dark:hover:bg-slate-700">
          <Plus className="size-3.5 md:size-4 lg:size-6" />
        </span>
        <span className="px-2 text-sm select-none md:px-4 md:text-base">
          {Math.trunc(scale * 100)}%
        </span>
        <span
          onClick={handleMinusScale}
          className="rounded-r-xl p-1.5 transition-all hover:bg-purple-400 md:p-2 lg:p-3 dark:hover:bg-slate-700">
          <Minus className="size-3.5 md:size-4 lg:size-6" />
        </span>
      </div>

      {/* Todo */}
      <div className="hidden h-full gap-1 md:gap-2">
        <Button className="p-1.5 md:p-2 lg:p-3">
          <Undo className="size-3.5 md:size-4 lg:size-6" />
        </Button>
        <Button className="p-1.5 md:p-2 lg:p-3">
          <Redo className="size-3.5 md:size-4 lg:size-6" />
        </Button>
      </div>
    </div>
  );
}

export default Zoom_Undo;
