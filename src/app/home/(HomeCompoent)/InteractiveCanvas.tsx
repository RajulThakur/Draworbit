import Button from '@/ui/Button';
import StaticNav from './StaticNav';
import DemoCanvas from './DemoCanvas';
import {
  Minus,
  Undo,
  Plus,
  Redo,
  Share,
  AlignJustify,
  ShieldQuestion,
} from 'lucide-react';

export default function InteractiveCanvas() {
  return (
    <div className="group relative isolate h-full w-full rounded-xl bg-white shadow-lg transition-all duration-300 sm:shadow-xl lg:shadow-2xl">
      <DemoCanvas />
      <StaticNav />
      <ZoomBtn />
      <ShareBtn />
      <Hamburger />
      <HelpBtn />
    </div>
  );
}

function ZoomBtn() {
  return (
    <div className="bottom-4 left-4 flex items-center gap-2 md:absolute md:flex md:gap-3">
      <div className="flex items-center justify-center rounded-xl bg-purple-300 dark:bg-slate-800">
        <span className="rounded-l-xl p-1.5 transition-all hover:bg-purple-400 md:p-2 lg:p-3 dark:hover:bg-slate-700">
          <Plus className="size-3.5 md:size-4 lg:size-6" />
        </span>
        <span className="px-2 text-sm select-none md:px-4 md:text-base">
          100%
        </span>
        <span className="rounded-r-xl p-1.5 transition-all hover:bg-purple-400 md:p-2 lg:p-3 dark:hover:bg-slate-700">
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

function ShareBtn() {
  return (
    <Button className="top-4 left-4 hidden md:absolute md:flex">
      <Share className="stroke-foreground size-2 md:size-3 lg:size-4 dark:stroke-white" />
    </Button>
  );
}

function Hamburger() {
  return (
    <Button className="top-4 right-4 md:absolute md:flex">
      <AlignJustify className="stroke-foreground size-4 md:size-5 lg:size-6 dark:stroke-white" />
    </Button>
  );
}

function HelpBtn() {
  return (
    <Button className="right-14 bottom-4 md:absolute md:right-4 md:flex">
      <ShieldQuestion className="stroke-foreground size-4 md:size-5 lg:size-6 dark:stroke-white" />
    </Button>
  );
}
