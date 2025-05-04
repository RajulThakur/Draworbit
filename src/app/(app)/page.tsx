'use client';
import Image from 'next/image';
import Link from 'next/link';

function Home() {
  return (
    <Link href="/app">
      <div className="dark:bg-background relative h-dvh w-dvw bg-slate-200">
        <div className="absolute top-15 left-5 size-24">
          <Image
            fill
            className="object-contain dark:invert"
            alt="arrow"
            src={'/arrow/share.png'}
          />
        </div>
        <div className="absolute top-15 right-5 size-24">
          <Image
            fill
            className="object-contain dark:invert"
            alt="menu"
            src={'/arrow/menu.png'}
          />
        </div>
        <div className="absolute bottom-15 left-15 size-24">
          <Image
            fill
            className="object-contain dark:invert"
            alt="zoom"
            src={'/arrow/zoom.png'}
          />
        </div>
        <div className="absolute bottom-15 left-35 size-24">
          <Image
            fill
            className="object-contain dark:invert"
            alt="undo"
            src={'/arrow/undo.png'}
          />
        </div>
        <div className="absolute bottom-5 left-80 size-24">
          <Image
            fill
            className="object-contain dark:invert"
            alt="redo"
            src={'/arrow/redo.png'}
          />
        </div>
        <div className="absolute right-15 bottom-7 size-24">
          <Image
            fill
            className="object-contain dark:invert"
            alt="arrow"
            src={'/arrow/help.png'}
          />
        </div>
      </div>
    </Link>
  );
}

export default Home;
