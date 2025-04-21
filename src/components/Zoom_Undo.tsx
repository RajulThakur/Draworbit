'use client';
import {useCursor} from '@/context/cursorContext';
import Button from '@/ui/Button';
import {Minus, Plus, Redo, Undo} from 'lucide-react';

function Zoom_Undo() {
  const {setScale} = useCursor();
  function handlePlusScale() {
    setScale((prev) => prev + 10);
  }
  function handleMinusScale() {
    setScale((prev) => prev - 10);
  }
  return (
    <div className="fixed bottom-4 left-4 flex items-center gap-3">
      <div className="flex items-center justify-center rounded-xl bg-purple-300 dark:bg-slate-800">
        <span
          onClick={handlePlusScale}
          className="rounded-l-xl p-3 transition-all hover:bg-purple-400 dark:hover:bg-slate-700">
          <Plus />
        </span>
        <span className="px-4">100%</span>
        <span
          onClick={handleMinusScale}
          className="rounded-r-xl p-3 transition-all hover:bg-purple-400 dark:hover:bg-slate-700">
          <Minus />
        </span>
      </div>
      <div className="flex h-full gap-2">
        <Button>
          <Undo />
        </Button>
        <Button>
          <Redo />
        </Button>
      </div>
    </div>
  );
}

export default Zoom_Undo;
