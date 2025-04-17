import Button from '@/ui/Button';
import {Minus, Plus, Redo, Undo} from 'lucide-react';

function Zoom_Undo() {
  return (
    <div className="fixed bottom-4 left-4 flex items-center gap-3">
      <div className="flex items-center justify-center rounded-xl bg-purple-300">
        <span className="p-3 hover:bg-purple-400 rounded-l-xl transition-all">
          <Plus />
        </span>
        <span className='px-4'>100%</span>
        <span className="p-3 hover:bg-purple-400 rounded-r-xl transition-all">
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
