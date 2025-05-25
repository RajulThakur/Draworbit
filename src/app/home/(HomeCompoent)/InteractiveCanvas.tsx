import Button from '@/ui/Button';
import {
  AlignJustify,
  Minus,
  Plus,
  Share,
  ShieldQuestion
} from 'lucide-react';
import DemoCanvas from './DemoCanvas';
import StaticNav from './StaticNav';

export default function InteractiveCanvas() {
  return (
    <div className="group relative isolate h-full w-full rounded-xl bg-black dark:bg-black shadow-lg transition-all duration-300 sm:shadow-xl lg:shadow-2xl">
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
      <div className="flex items-center justify-center rounded-md bg-purple-300 dark:bg-slate-800">
        <span className="rounded-l-md p-1 transition-all hover:bg-purple-400 md:p-2 lg:p-3 dark:hover:bg-slate-700">
          <Plus className="size-2 md:size-3 lg:size-4" />
        </span>
        <span className="px-2 text-sm select-none md:px-4 md:text-base">
          100%
        </span>
        <span className="rounded-r-md p-1 transition-all hover:bg-purple-400 md:p-2 lg:p-3 dark:hover:bg-slate-700">
          <Minus className="size-2 md:size-3 lg:size-4" />
        </span>
      </div>

    </div>
  );
}

function ShareBtn() {
  return (
    <Button size='sm' className="top-4 left-4 hidden md:absolute md:flex">
      <Share className="stroke-foreground size-2 md:size-3 lg:size-4 dark:stroke-white" />
    </Button>
  );
}

function Hamburger() {
  return (
    <Button size='sm' className="top-4 right-4 md:absolute md:flex">
      <AlignJustify className="stroke-foreground size-2 md:size-3 lg:size-4 dark:stroke-white" />
    </Button>
  );
}

function HelpBtn() {
  return (
    <Button size='sm' className="right-14 bottom-4 md:absolute md:right-4 md:flex">
      <ShieldQuestion className="stroke-foreground size-2 md:size-3 lg:size-4 dark:stroke-white" />
    </Button>
  );
}
